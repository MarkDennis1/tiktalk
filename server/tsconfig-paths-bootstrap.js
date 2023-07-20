const tsConfigPaths = require("tsconfig-paths");

const baseUrl = "./"; // Specify the base URL of your project (the same as in tsconfig.json)
const { paths } = require("./tsconfig.json").compilerOptions;

tsConfigPaths.register({
  baseUrl,
  paths,
});
