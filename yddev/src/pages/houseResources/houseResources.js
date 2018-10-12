// pages/houseResources/houseResources.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabBarData: {
            show: true,
            options: {
                current: 3
            },
            items: [{
                label: '活动',
                key: 'active'
            }, {
                label: '圈子',
                key: 'circle'
            }, {
                label: '商城',
                key: 'mall'
            }, {
                label: '我的',
                key: 'mine'
            },]
        },
        resourcesData: []
    },
    /**
     * 切换tabbar
     */
    ontabbarchange(target) {
        const [index, tabBarData] = [target.detail.index, this.data.tabBarData]
        tabBarData.options.current = index
        this.setData({
            tabBarData
        })
        wx.reLaunch({
            url: `/pages/index/index?id=${index}`,
        })
    },
    onpagescroll(e) {

    },
    //获取收藏房源列表
    getCollenctedHouse() {
        app.request.getCollenctedHouse({
            params: {
                uid: wx.getStorageSync('u_id')
            },
            success: res => {
                console.log(res);
                this.setData({
                    resourcesData: res.result_data.result
                })
            }
        })
    },
    collect(e) {
        const dataset = e.currentTarget.dataset
        const params = {
            uid: wx.getStorageSync('u_id'),
            type: 3,
            house_id: dataset.id
        }
        app.request.discollect({
            params: params,
            success: res => {
                this.getCollenctedHouse()
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setTopBarText({
            text: '收藏房源',
        })
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
            title: '收藏房源'
        })
        this.getCollenctedHouse()
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