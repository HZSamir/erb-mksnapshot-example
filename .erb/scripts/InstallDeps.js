var fs = require("fs");
var resolve = require("path").resolve;
var cp = require("child_process");
var os = require("os");

var srcFolder = resolve(__dirname, "..", "..", "release", "app");

var npmCmd = os.platform().startsWith("win") ? "npm.cmd" : "npm";
cp.spawn(npmCmd, ["install"], {
  env: { ...process.env, ELECTRON_CUSTOM_VERSION: "16.0.5" },
  cwd: srcFolder,
  stdio: "inherit",
});
