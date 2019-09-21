const options = {
  entry: 'src/index.tsx',
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    name: 'alitaHooks',
    globals: {
      'react': 'React'
    }
  },
  doc: {
    title: '@alitajs/hooks',
    base: '/hooks/',
    repository: 'https://github.com/alitajs/hooks',
  },
  extraBabelPlugins: [[
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ]],
};

export default options;
