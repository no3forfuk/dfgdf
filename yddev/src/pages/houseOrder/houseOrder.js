//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderUser: [],
        houseInfo: {},
        orderPayType: ['季签', '半年签', '年签'],
        payTypeIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    //选择支付类型
    selectPayType(e) {
        this.setData({
            payTypeIndex: e.currentTarget.dataset.index
        })
    },
    //获取公寓信息
    getHouserInfo() {
        app.request.getHouseDetail({
            params: {
                house_id: this.options.id,
                uid: wx.getStorageSync('u_id')
            },
            success: res => {
                this.setData({
                    houseInfo: res.result_data
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.setNavigationBarTitle({
            title: '订单确认'
        })
        this.getHouserInfo()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})