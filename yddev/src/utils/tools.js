/*Created By Jsir on 2018/9/27*/
'use strict'


function getViewHeight(data = {
    target: '#box',
    isComponent: false,
    component: {},
    success: res => {
    }
}) {
    let [query, top, height] = [null, 0, 0]
    if (data.isComponent) {
        query = wx.createSelectorQuery().in(data.component)
    } else {
        query = wx.createSelectorQuery()
    }
    const system = wx.getSystemInfo({
        success: result => {
            query.select(data.target).boundingClientRect()
            query.exec(res => {
                if (res[0]) {
                    top = res[0].top
                    height = result.windowHeight
                    const viewHeight = height - top
                    data.success(viewHeight)
                } else {
                    console.error('未获取到res[0]')
                }
            })
        }
    })
}


module.exports = {
    getViewHeight
}