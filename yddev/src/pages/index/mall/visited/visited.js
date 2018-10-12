// pages/index/mall/visited/visited.js\
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        lists: []
    },
    ready() {
        this.getGoodsHistory()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //获取浏览历史列表
        getGoodsHistory() {
            app.request.getGoodsHistory({
                success: res => {
                    this.setData({
                        lists: res.data
                    })
                }
            })
        },
    },
})
