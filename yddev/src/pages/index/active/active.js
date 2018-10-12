const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},
    data: {
        currentPage: 'active',
        scrollViewHeight: 0,
        tabItems: [{
            label: '精选活动',
            key: 'active'
        }, {
            label: '免租抽奖',
            key: 'award'
        }],
    },
    attached() {

    },
    ready() {
        wx.setNavigationBarTitle({
            title: '圆点公寓'
        });
        app.tools.getViewHeight({
            target: '.tab-scroll-view',
            isComponent: true,
            component: this,
            success: height => {
                this.setData({scrollViewHeight: height})
            }
        })
    },
    methods: {
        //顶部tab切换
        swithTab(e) {
            this.setData({currentPage: e.detail.item.key})
        }
    }
})