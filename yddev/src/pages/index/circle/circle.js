const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},
    data: {
        postList: [],
        scrollViewHeight: 0,
        tabItems: [{
            label: '全部状态',
            key: 'all'
        }, {
            label: '我关注的',
            key: 'focused'
        }],
        unitWidth: 0,
        photoIndex: 0,
        floatIndex: 0,
        scrollLeft: 0,
        hotPeople: [],
        currentPeople: {},
        contactBottom: false,
        currentPage: 'all'
    },
    attached() {

    },
    ready() {
        //设置顶部标题
        wx.setNavigationBarTitle({
            title: '圈子·圆点社区'
        });
        //设置滚动区域高度
        app.tools.getViewHeight({
            target: '.circle-scroll-view',
            isComponent: true,
            component: this,
            success: height => {
                this.setData({scrollViewHeight: height})
            }
        })
        this.getPostList()
        this.getHotUser()
    },
    methods: {
        //页面上下滚动到底部
        scrolltolower() {
            this.setData({
                contactBottom: true
            })
        },
        //页面上下滚动
        circelScroll(e) {
            const detail = e.detail
            console.log(detail);
            console.log(detail.scrollHeight - detail.scrollTop);
            if (detail.deltaY < 0) {
                if (detail.scrollTop > 80) {
                    if (this.data.contactBottom) {
                        this.triggerEvent('showTabbar')
                    } else {
                        this.triggerEvent('hideTabbar')
                    }
                } else {
                    this.setData({
                        contactBottom: false
                    })
                    this.triggerEvent('showTabbar')
                }
            } else {
                this.setData({
                    contactBottom: false
                })
                this.triggerEvent('showTabbar')
            }
        },
        //左右滑动用户头像
        scrollUserPhoto(e) {
            const [detail, uw] = [e.detail, this.data.unitWidth]
            const left = detail.scrollLeft;
            let float = parseFloat(left / uw) - parseInt(left / uw)
            float = float.toFixed(2)
            this.setData({
                photoIndex: parseInt(left / uw),
                floatIndex: Number(float)
            })
        },
        //头像停止滑动
        scrollEnd() {
            setTimeout(() => {
                this.setData({
                    scrollLeft: this.data.photoIndex * this.data.unitWidth
                })
            }, 800)
        },
        //获取单个用户头像所占位置宽度
        getUnitWidth() {
            const query = wx.createSelectorQuery().in(this)
            query.select('.circle-header-right-scroll-box-item').boundingClientRect()
            query.exec(res => {
                const width = res[0].width + 10
                this.setData({
                    unitWidth: width
                })
            })
        },
        //跳转至用户详情
        go2Users(e) {
            const item = e.currentTarget.dataset.item
            wx.navigateTo({
                url: `/pages/user/user?oid=${item.uid}`
            })
        },
        //关注用户
        focusPeople(e) {
            const item = e.currentTarget.dataset.item
            app.request.collect({
                params: {
                    uid: wx.getStorageSync('u_id'),
                    to_uid: item.uid,
                    type: 1
                },
                success: res => {
                    this.getHotUser()
                }
            })
        },
        //获取帖子列表
        getPostList() {
            wx.getStorage({
                key: 'u_id',
                success: msg => {
                    if (this.data.currentPage == 'all') {
                        app.request.getCircelIndex({
                            params: {
                                uid: msg.data
                            },
                            success: res => {
                                let arr = res.result_data.result
                                arr = arr.filter(item => item.type == 1)
                                this.setData({postList: arr})
                            }
                        })
                    } else if (this.data.currentPage == 'focused') {
                        this.getFocusPeopleFeed()
                    }

                }
            });
        },
        //发布post
        addPost() {
            wx.navigateTo({
                url: `/pages/addPost/addPost`,
            })
        },
        //获取热门用户
        getHotUser() {
            app.request.getHotUser({
                params: {
                    uid: wx.getStorageSync('u_id'),
                },
                success: res => {
                    let arr = res.result_data
                    let obj = arr.shift()
                    this.setData({
                        hotPeople: arr,
                        currentPeople: obj
                    })
                    this.getUnitWidth()
                }
            })
        },
        //tab切换
        swithTab(e) {
            this.setData({currentPage: e.detail.item.key})
            this.getPostList()
        },
        //获取关注的人的动态
        getFocusPeopleFeed() {
            app.request.getFocusPeopleFeed({
                params: {
                    uid: wx.getStorageSync('u_id')
                },
                success: res => {
                    console.log(res);
                }
            })
        },
    }
})