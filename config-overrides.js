const {
    override,
    fixBabelImports,
    addLessLoader,
  } = require("customize-cra");
  
//const { darkTheme } = require('@ant-design/dark-theme');

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd", 
        libraryDirectory: "es", 
        style: true // change importing css to less
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {}
    })
);