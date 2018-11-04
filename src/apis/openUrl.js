export default function (ctx) {
  /**
  * 跳出
  *
  * @memberof sncClass
  * @function
  * @param {Object} options
  * @param {String} options.url 链接，暂时不用
  * @param {successCallback} options.success
  * @param {errorCallback} options.error
  * @param {completeCallback} options.complete
  * @return {Promise<Object>}
  *
  * @example
  * SNC.openUrl({
  *   url: '',
  *   success(response) {}
  * })
  */
 ctx.openUrl = ctx.definedMethod('hb.core.openUrl')
}
