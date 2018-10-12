const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},
    data: {
        user: {},
        scrollViewHeight: 0,
        operateData: [{
            icon: 'icon-mima',
            label: '一键开锁',
            handle: 'deLock',
            fontSize: '30px'
        }, {
            icon: 'icon-tuichu',
            label: '退出登陆',
            handle: 'logout',
            fontSize: '28px'
        }],
        renterData: [{
            icon: 'icon-fangyuanweixuanzhong',
            label: '全部房源',
            href: '/pages/allResources/allResources'
        }, {
            icon: 'icon-wenjianjia',
            label: '收藏房源',
            href: '/pages/houseResources/houseResources'
        }, {
            icon: 'icon-danzi',
            label: '我的订单',
            href: '/pages/myOrder/myOrder'
        }, {
            icon: 'icon-lishijilu',
            label: '浏览历史',
            href: '/pages/viewHistory/viewHistory'
        }],
        landlordData: [{
            icon: 'icon-shuidian',
            label: '房租水电',
            href: '/pages/rent/rent',
            fontSize: '20px'
        }, {
            icon: 'icon-jiazheng',
            label: '家政服务',
            href: '/pages/homemaking/homemaking'
        }, {
            icon: 'icon-tousu',
            label: '投诉建议',
            href: '/pages/complain/complain',
            fontSize: '20px'
        }]
    },
    attached() {

    },
    ready() {
        //设置顶部标题
        wx.setNavigationBarTitle({
            title: '个人中心'
        });
        //设置滚动区域高度
        app.tools.getViewHeight({
            target: '.mine-scroll-view',
            isComponent: true,
            component: this,
            success: height => {
                this.setData({
                    scrollViewHeight: height
                })
            }
        });
        //获取用户信息
        // this.getUserInfo()
    },
    methods: {
        //获取用户信息
        getUserInfo() {
            app.request.getUserCenterInfo({
                params: {
                    get_uid: wx.getStorageSync('u_id')
                },
                success: res => {
                    // console.log(res);
                    // this.setData({})
                }
            })
        },
        //点击operateData的item
        clickExitItem(e) {
            const handle = e.currentTarget.dataset.item.handle
            this[handle]()
        },
        //一键解锁
        deLock() {
            app.request.getLockRoom({
                params: {
                    uid: wx.getStorageSync('u_id')
                },
                success: res => {
                    const roomId = res.result_data[0].house_id
                    app.request.remoteDelock({
                        params: {
                            uid: wx.getStorageSync('u_id'),
                            house_id: roomId
                        },
                        success: res => {
                            if (res.result_code == 1) {
                                wx.showModal({
                                    title: '',
                                    content: '开锁成功',
                                    showCancel: false
                                })
                            }
                        }
                    })
                }
            })
        },
        //退出登陆
        logout() {
            wx.navigateBack({
                delta: 1
            })
        },
    }
})