// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require("expo/metro-config");

// module.exports = getDefaultConfig(__dirname);

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);

  return {
    resolver: {
      assetExts: [...assetExts, "db", "sql", "gz"], // Додати типи файлів, які ви використовуєте в своєму проекті
      sourceExts: [...sourceExts, "jsx"], // Додати розширення файлів, які ви використовуєте в своєму проекті
    },
  };
})();
