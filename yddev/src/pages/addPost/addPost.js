// pages/addPost/addPost.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postImgList: [],
        postText: '',
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
            title: `发布帖子`
        })
    },
    //数据初始化
    initData() {
        this.setData({
            postImgList: [],
            postText: '',
        })
    },
    //更换单张图片
    changeThisImg(e) {
        const idx = e.currentTarget.dataset.index
        let postImgList = this.data.postImgList
        wx.chooseImage({
            count: 1,
            success: res => {
                postImgList[idx] = res.tempFiles[0]
                this.setData({
                    postImgList
                })

            },
        })
    },
    //选择图片
    onchooseimg() {
        let postImgList = this.data.postImgList
        wx.chooseImage({
            count: postImgList.length,
            success: res => {
                postImgList = [...postImgList, ...res.tempFiles]
                if (postImgList.length > 4) {
                    return
                } else {
                    this.setData({
                        postImgList
                    })
                }
            },
        })
    },
    //取消
    oncancel() {
        this.initData()
        wx.navigateBack({
            delta: 1
        })
    },
    //确认发布
    oncomfirm() {
        const imgArr = this.data.postImgList
        const postText = this.data.postText
        if (imgArr.length === 0 && postText.length === 0) {
            return
        } else {
            wx.showLoading({
                title: '发布中...',
                mask: true
            })
            if (imgArr.length === 0) {
                let params = {
                    content: this.data.postText,
                    uid: wx.getStorageSync('u_id'),
                    type: 1
                }
                this.publishPost(params)
            } else {
                let tempArr = [], params = {};
                for (let i = 0; i < imgArr.length; i++) {
                    const path = imgArr[i].path
                    this.uploadImageToQiniu(path, res => {
                        tempArr.push(res.key)
                        params = {
                            content: this.data.postText,
                            uid: wx.getStorageSync('u_id'),
                            type: 2,
                            image_url: tempArr[0],
                            image_key: tempArr.join(',')
                        }
                        if (tempArr.length == imgArr.length) {
                            this.publishPost(params)
                        }
                    })
                }
            }
        }
    },
    //发布帖子
    publishPost(params) {
        app.request.publishPost({
            params: params,
            success: res => {
                if (res.result_code == 1) {
                    wx.hideLoading()
                    this.oncancel()
                } else {
                    wx.hideLoading()
                    wx.showModal({
                        title: '发布失败',
                        content: `失败错误码${res.result_code}`,
                        showCancel: true
                    })
                }
            }
        })
    },
    //上传图片到七牛
    uploadImageToQiniu(path, success) {
        app.request.get7niuImageToken({
            success: res => {
                const token = res.result_data.up_token
                app.upload2Qiniu(token)
                app.qiniuSdk.upload(path, result => {
                    success(result)
                })
            }
        })
    },
    //输入文本
    oninputtext(e) {
        const postText = e.detail.value
        this.setData({
            postText
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.request.get7niuImageToken({
            success: res => {
                const token = res.result_data.up_token
                app.upload2Qiniu(token)
                app.qiniuSdk.upload()
            }
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