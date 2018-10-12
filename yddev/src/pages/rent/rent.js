// pages/rent/rent.js
const app = getApp()
const ajax = app.request
Page({

    /**
     * 页面的初始数据
     */
    data: {
        feeCurrent: 0,
        scrollHeight: 0,
        currentOrder: 0,
        markStyle: {
            width: 0,
            left: 0
        },
        headerData: [{
            text: '待付费用'
        }, {
            text: '已付费用'
        }],
        paidData: [],
        unpaidData: []
    },
    //改变支付类型
    onchangefeetype(e) {
        this.setData({
            feeCurrent: e.currentTarget.dataset.index
        })
        this.setFeeMarkPosition()
        this.hidePayBtn()
    },
    //设置tab位置
    setFeeMarkPosition() {
        const [idx] = [this.data.feeCurrent]
        const query = wx.createSelectorQuery()
        query.selectAll('.header-item-text').boundingClientRect()
        query.exec(res => {
            if (!res[0]) {
                return
            } else {
                this.setData({
                    markStyle: {
                        width: res[0][idx].width,
                        left: res[0][idx].left
                    }
                })
            }
        })
    },
    //选择未支付订单
    onselectunpaiditem(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            currentOrder: index
        })
    },
    //隐藏支付按钮
    hidePayBtn() {
        var animation = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease',
        })
        if (this.data.feeCurrent == 0) {
            animation.translateY('0').step()
        } else {
            animation.translateY('100%').step()
        }

        this.setData({
            animationData: animation.export()
        })
    },
    //打开支付窗口
    goapply() {
        wx.navigateTo({
            url: `/pages/rentOrder/rentOrder?index=${this.data.currentOrder}`
        })
    },
    //关闭支付窗口
    oncloseselect() {

    },
    //获取支付订单列表
    getPaidList() {
        app.request.getRentList({
            params: {
                uid: wx.getStorageSync('u_id')
            },
            success: res => {
                this.setData({
                    unpaidData: res.result_data.result.no_pay_list,
                    paidData: res.result_data.result.pay_list
                })
            }
        })
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
        (() => {
            //设置滚动区域高度
            const system = wx.getStorageSync('system')
            const query = wx.createSelectorQuery()
            query.select('.rent-body').boundingClientRect()
            query.exec(res => {
                if (!res[0]) {
                    return
                } else {
                    const [_top, wHeight] = [res[0].top, system.windowHeight]
                    this.setData({
                        scrollHeight: wHeight - _top
                    })
                }
            })
        })();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '房租水电'
        })
        this.setFeeMarkPosition()
        this.getPaidList()
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