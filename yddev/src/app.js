/*Created By Jsir on 2018/7/26*/
'use strict'
import api from './utils/api.js'
import tools from './utils/tools.js'
import animation from './utils/animations.js'

const qnSDK = require('./static/vonder/qiniuUploader.js')

function initQiqiu(token) {
    let options = {
        uptoken: token,
        uploadURL: 'https://up-z2.qbox.me',
        region: 'SCN'
    }
    qnSDK.init(options)
}

App({
    onLaunch() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo'] && wx.getStorageSync('u_id')) {
                    wx.reLaunch({
                        url: '/pages/index/index',
                    })
                } else {
                    wx.reLaunch({
                        url: '/pages/login/login',
                    })
                }
            }
        })
    },
    upload2Qiniu: initQiqiu,
    qiniuSdk: qnSDK,
    request: api(),
    tools: tools,
    animation: animation
})