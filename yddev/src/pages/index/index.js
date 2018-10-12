//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentPage: 'active',
        //底部导航栏数据
        tabBarItems: [{
            label: '活动',
            key: 'active',
            icon: 'icon-huodong'
        }, {
            label: '圈子',
            key: 'circle',
            icon: 'icon-quanzi'
        }, {
            label: '商城',
            key: 'mall',
            icon: 'icon-shangcheng'
        }, {
            label: '我的',
            key: 'mine',
            icon: 'icon-wode'
        }]
    },
    //切换底部导航
    switchTabbar(e) {
        this.setData({
            currentPage: e.detail.item.key
        })
    },
    //隐藏底部导航
    hideTabbar() {
        app.animation.slideDown(animation => {
            this.setData({
                animationData: animation
            })
        })
    },
    //显示底部导航
    showTabbar() {
        app.animation.slideUp(animation => {
            this.setData({
                animationData: animation
            })
        })
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
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