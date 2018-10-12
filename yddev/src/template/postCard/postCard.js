// template/postCard/postCard.js

const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postInfo: {
            type: Object,
            value: null,
            observer(n, o, c) {
                if (n) {
                    this.setData({
                        info: n
                    })
                }
            }
        },
        toUser: {
            type: Boolean,
            value: false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        info: {}
    },
    ready() {

    },
    /**
     * 组件的方法列表
     */
    methods: {
        //跳转到post
        linkToPost(e) {
            const id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/post/post?postId=${id}`,
            })
        },
        //跳转到用户
        onlinktouser(e) {
            const len = getCurrentPages().length
            const currentPage = getCurrentPages()[len - 1]
            if (currentPage.route == 'pages/user/user') return
            const id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/user/user?oid=${id}`,
            })
        },
        //预览图片
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
        //添加点赞
        praiseAdd(id) {
            app.request.praiseAdd({
                params: {
                    uid: wx.getStorageSync('u_id'),
                    id: id,
                    type: 1
                },
                success: res => {
                    if (res.result_code == 1) {
                        this.triggerEvent('praiseConfirm')
                    } else {
                        wx.showToast({
                            title: res.result_msg,
                            icon: 'none',
                            mask: true,
                            duration: 1000
                        })
                    }
                }
            })
        },
        //取消点赞
        cancelPraise(id) {
            app.request.cancelPraise({
                params: {
                    uid: wx.getStorageSync('u_id'),
                    id: id,
                    type: 1
                },
                success: res => {
                    if (res.result_code == 1) {
                        this.triggerEvent('praiseConfirm')
                    } else {
                        wx.showToast({
                            title: res.result_msg,
                            icon: 'none',
                            mask: true,
                            duration: 1000
                        })
                    }
                }
            })
        },
        //点赞
        doLike(e) {
            const item = e.currentTarget.dataset.item
            if (item.praised == 0) {
                this.praiseAdd(item.feed_id)
            } else {
                this.cancelPraise(item.feed_id)
            }
        },
        onlinktouserFromComment(e) {
            if (this.properties.toUser) {
                const id = e.currentTarget.dataset.id
                wx.navigateTo({
                    url: `/pages/user/user?oid=${id}`
                })
            } else {
                return
            }
        },
    }
})