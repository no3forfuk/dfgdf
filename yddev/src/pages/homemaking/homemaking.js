// pages/homemaking/homemaking.js
const app = getApp()
const ajax = app.request
Page({

    /**
     * 页面的初始数据
     */
    data: {
        homemakingType: 'server',
        homemakingData: {},
        homemakingValue: '',
        serverData: {
            type: 1,
            name: '',
            tip: '公寓管家将根据您的需求，为您提供专业的服务人员',
            placeholder: '填写详细要求',
            successContent: '您的需求已提交，我们会尽快派人处理',
            failContent: '抱歉，我们无法为您空的需求进行服务'
        },
        suggestData: {
            type: 2,
            name: '',
            tip: '公寓管家将根据您的意见，做出合适的调整',
            placeholder: '详细描述您的意见',
            successContent: '您的意见已提交，我们会尽快改进',
            failContent: '抱歉，我们不太明白您需要我们改进哪里'
        }
    },
    onselecthomemaking(e) {
        const homemakingType = e.currentTarget.dataset.type
        this.setData({
            homemakingType
        })
        this.setCurrentData()
    },
    setCurrentData() {
        let [homemakingData, homemakingType, source] = [this.data.homemakingData, this.data.homemakingType, '']
        if (homemakingType == 'server') {
            source = this.data.serverData
        } else {
            source = this.data.suggestData
        }
        Object.assign(homemakingData, source)
        this.setData({
            homemakingData
        })
    },
    onsethomemakingvalue(e) {
        this.setData({
            homemakingValue: e.detail.value
        })
    },
    onsubmithomemaking() {
        let val = this.data.homemakingValue
        val = val.trim()
        if (val.length === 0) {
            wx.showModal({
                content: this.data.homemakingData.failContent,
                showCancel: false
            })
        } else {
            const makingType = this.data.homemakingType == 'server' ? '1' : '2'
            ajax.submitHouseWorkType({
                params: {
                    content: val,
                    uid: wx.getStorageSync('u_id'),
                    type_id: makingType
                },
                success: res => {
                    if (res.result_code == 1) {
                        wx.showModal({
                            content: this.data.homemakingData.successContent,
                            showCancel: false,
                            success: res => {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })
                    } else {
                        wx.showModal({
                            content: res,
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
            title: '家政服务'
        })
        this.setCurrentData()
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