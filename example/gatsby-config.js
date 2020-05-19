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
        },
      },
    }
  ],
}
