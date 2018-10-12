// pages/houseResources/houseResources.js
const app = getApp()
const ajax = app.request
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
        const [detail, tabBarData] = [e.detail, this.data.tabBarData]
        const system = wx.getStorageSync('system')
        let Y = detail.scrollHeight - detail.scrollTop - system.windowHeight
        if (detail.deltaY < 0) { //向下
            tabBarData.show = Y > 50 ? false : true
        } else { //向上
            tabBarData.show = true
        }
        this.setData({
            tabBarData
        })
    },
    collect(e) {
        const dataset = e.currentTarget.dataset
        const params = {
            uid: wx.getStorageSync('u_id'),
            type: 3,
            house_id: dataset.id
        }
        if (dataset.cstatus == 1) {
            ajax.discollect({
                params: params,
                success: res => {
                    this.getHouseResource()
                }
            })
        } else {
            ajax.collect({
                params: params,
                success: res => {
                    this.getHouseResource()
                }
            })
        }
    },
    getHouseResource() {
        ajax.getHouseResourcesList({
            params: {
                uid: wx.getStorageSync('u_id')
            },
            success: res => {
                this.setData({
                    resourcesData: res.result_data.result
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '全部房源'
        })
        this.getHouseResource()
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