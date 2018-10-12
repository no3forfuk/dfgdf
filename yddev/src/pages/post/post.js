// pages/post/post.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputPaddingLeft: '',
        commentText: '',
        info: {},
        toUser: '',
        commentList: [],
        pid: 0
    },
    //输入评论
    oninputcomment(e) {
        const commentText = e.detail.value
        this.setData({
            commentText
        })
    },
    //提交评论
    onsubmitcomment() {
        if (this.data.commentText.length > 0) {
            //提交评论
            app.request.addComment({
                params: {
                    uid: wx.getStorageSync('u_id'),
                    content: this.data.commentText,
                    id: this.data.info.feed_id,
                    type: 1,
                    pid: this.data.pid
                },
                success: res => {
                    this.setData({
                        commentText: '',
                        toUser: '',
                        pid: 0
                    })
                    this.getCommentList()
                }
            })
        } else {
            return
        }
    },
    //回复评论
    c2c(e) {
        const item = e.currentTarget.dataset.item
        if (item.uid == wx.getStorageSync('u_id')) {
            return
        }
        this.setData({
            toUser: item.nick,
            pid: item.id
        })
    },
    //评论POST
    commentPost() {
        this.setData({
            pid: 0,
            toUser: ''
        })
    },
    //获取评论列表
    getCommentList() {
        app.request.getCommentList({
            params: {
                uid: wx.getStorageSync('u_id'),
                id: this.options.postId
            },
            success: res => {
                this.setData({
                    commentList: res.result_data.result
                })
                console.log(res.result_data.result);
            }
        })
    },
    //获取动态详情
    getPostDetails(cb) {
        wx.getStorage({
            key: 'u_id',
            success: res => {
                app.request.getPostDetails({
                    params: {
                        feed_id: this.options.postId,
                        uid: res.data
                    },
                    success: res => {
                        console.log(res.result_data);
                        if (res.result_code == 1) {
                            cb(res)
                        }
                    }
                })
            }
        });
    },
    //图片预览
    onviewimg(e) {
        const [index, imgList] = [e.currentTarget.dataset.index, this.data.info.data.atlas_list]
        const arr = []
        for (var i = 0; i < imgList.length; i++) {
            arr.push(imgList[i].image_path)
        }
        wx.previewImage({
            current: arr[index],
            urls: arr
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
    onReady: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: `帖子详情`
        });
        this.getPostDetails(res => {
            this.setData({
                info: res.result_data,
                toUser: res.result_data.nick
            })
        })
        this.getCommentList()
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