module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  features: {
    interactionsDebugger: true,
  },
    refs: {
      teamsManagement: {
        title: 'Team Activation',
        url: 'http://localhost:6001',
      },
      cloudCopy: {
        title: 'Team SGCC',
        url: 'http://localhost:6002',
      },
  },
};
