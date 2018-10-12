// pages/classify/classify.js
const _global = {
    quality: '房质保证',
    safe: '安全放心',
    secret: '信息保密',
    butler: '管家7*24',
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        const current = this.options.crtpage
        this.setData({
            current
        })
        wx.setNavigationBarTitle({
            title: _global[current]
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})