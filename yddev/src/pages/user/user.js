// pages/user/user.js
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
                current: 1
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
        userInfo: {},
        userPost: []
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
    //获取用户post
    getUserPost() {
        app.request.getUserPost({
            params: {
                uid: this.options.oid,
                limit: 0
            },
            success: res => {
                let arr = res.result_data.result
                let userPost = []
                for (let i = 0; i < arr.length; i++) {
                    userPost.push({
                        data: {...arr[i]}
                    })
                }
                this.setData({
                    userPost: userPost
                })
            }
        })
    },
    //页面滚动
    emitpagescroll(e) {

    },
    //查看头像大图
    onviewavatar() {
        const img = this.data.userInfo.head_image_url
        wx.previewImage({
            current: img,
            urls: [img]
        })
    },
    //获取个人中心信息
    getUserInfo() {
        const oid = this.options.oid
        wx.getStorage({
            key: 'u_id',
            success: res => {
                ajax.getUserCenterInfo({
                    params: {
                        get_uid: oid,
                        uid: res.data
                    },
                    success: res => {
                        this.setData({
                            userInfo: res.result_data
                        })
                    }
                })
            }
        });
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
        wx.setNavigationBarTitle({
            title: `个人信息`
        });

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getUserPost()
        this.getUserInfo()
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