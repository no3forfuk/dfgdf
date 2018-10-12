const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},
    data: {
        currentPage: 'ydmall',
        scrollViewHeight: 0,
        tabItems: [{
            label: '圆点商城',
            key: 'ydmall'
        }, {
            label: '浏览过的',
            key: 'visited'
        }],
    },
    attached() {

    },
    ready() {
        //设置顶部标题
        wx.setNavigationBarTitle({
            title: '圆点商城'
        });
        //设置滚动区域高度
        app.tools.getViewHeight({
            target: '.mall-scroll-view',
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