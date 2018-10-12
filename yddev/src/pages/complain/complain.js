// pages/complain/complain.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        complainValue: ''
    },
    //设置投诉建议的值
    onsetcomplainvalue(e) {
        this.setData({
            complainValue: e.detail.value
        })
    },
    //提交投诉建议
    onsubmitcomplain() {
        let val = this.data.complainValue
        val = val.trim()
        if (val.length === 0) {
            wx.showModal({
                // title: '你不能提交一个空的投诉或建议',
                content: '你不能提交一个空的投诉或建议',
                showCancel: false
            })
        } else {
            app.request.submitComplain({
                params: {
                    content: val,
                    uid: wx.getStorageSync('u_id'),
                    type_id: 1
                },
                success: res => {
                    if (res.result_code == 1) {
                        wx.showModal({
                            // title: '',
                            content: '您的投诉或建议已成功提交，我们会尽快处理',
                            showCancel: false,
                            success: res => {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })
                    } else {
                        wx.showModal({
                            // title: '',
                            content: 'res',
                            showCancel: false,
                            success: res => {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '投诉建议'
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})