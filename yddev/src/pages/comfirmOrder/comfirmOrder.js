// pages/comfirmOrder/comfirmOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailData: [{
            label: '公寓品牌',
            text: '公寓品牌'
        }, {
            label: '房间号',
            text: '公寓品牌'
        }, {
            label: '门店',
            text: '屋企坪洲旗舰店'
        }, {
            label: '签约方式',
            text: '管家线下签约'
        }, {
            label: '合约期限',
            text: '年签'
        }, {
            label: '合同编号',
            text: '555488745521'
        }, {
            label: '押付方式',
            text: '押一付一'
        }, {
            label: '起始日期',
            text: '2017-09-27'
        }, ],
        showDesc: false
    },
    ontoggledesc() {
        if (this.data.showDesc) {
            var animation = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
            })
            animation.height('0').step()
            this.setData({
                animationData: animation.export()
            })
        } else {
            var animation = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
            })
            animation.height('336.2rpx').step()
            this.setData({
                animationData: animation.export()
            })
        }

        this.setData({
            showDesc: !this.data.showDesc
        })
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