import {devServer} from "vuetify-loader/dev/webpack.config";

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ]
}
devServer = {
  disableHostCheck: true,
}