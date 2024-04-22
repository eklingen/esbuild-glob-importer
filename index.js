import glob from 'fast-glob'

const onResolveHandler = ({ path, namespace, resolveDir, kind }) => {
  if (resolveDir === '' || namespace !== 'file' || (kind !== 'import-statement' && kind !== 'require-call' && kind !== 'dynamic-import' && kind !== 'require-resolve' && kind !== 'import-rule') || !glob.isDynamicPattern(path)) {
    return
  }

  return { path, namespace: 'import-glob', pluginData: { resolveDir } }
}

const onLoadHandler = async args => {
  const resolveDir = args.pluginData.resolveDir
  const files = (await glob(args.path, { cwd: resolveDir })).sort().sort((a, b) => a.localeCompare(b))
  const contents = files.map(module => `import('${module}');\n`).join('')

  return { contents, resolveDir }
}

export default function globImporterPlugin() {
  return {
    name: 'esbuild:glob-importer-plugin',
    setup: builder => {
      builder.onResolve({ filter: /\.((j|t)sx?)$/ }, args => onResolveHandler(args))
      builder.onLoad({ filter: /\.((j|t)sx?)$/, namespace: 'import-glob' }, args => onLoadHandler(args))
    },
  }
}
