module.exports = {
  presets: ["@vue/app"],
  plugins: [
    ["import", { libraryName: "antd", libraryDirectory: "lib" }, "ant"],
    [
      "import",
      { libraryName: "antd-mobile", libraryDirectory: "lib" },
      "antd-mobile"
    ]
  ]
};
