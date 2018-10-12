/*Created By Jsir on 2018/10/11*/
'use strict'
const slideUp = function (fn) {
    var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
    })
    animation.translateY(0).step()
    fn(animation)
}
const slideDown = function (fn) {
    var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
    })
    animation.translateY('100%').step()
    fn(animation)
}
module.exports = {
    slideUp,
    slideDown
}