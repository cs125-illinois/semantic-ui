const path = require("path")

module.exports = {
  pathPrefix: "/semantic-ui",
  plugins: [
    "@cs125/gatsby-theme-cs125-docs",
    {
      resolve: "gatsby-alias-imports",
      options: {
        aliases: {
          react: "./node_modules/react",
          "@cs125/semantic-ui": "..",
          "@cs125/react-google-login":
            "../node_modules/@cs125/react-google-login",
          "@cs125/element-tracker": "../node_modules/@cs125/element-tracker",
          "@components": "./src/components",
        },
      },
    },
  ],
}
