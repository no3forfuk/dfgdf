// pages/index/mall/ydmall/ydmall.js
const app = getApp()
const ajax = app.request
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        cellList: []
    },
    attached() {
        (() => {
            //获取商品列表
            this.getGoodsList()
        })();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getGoodsList() {
            ajax.getGoodsList({
                success: res => {
                    this.setData({
                        cellList: res.data
                    })
                }
            })
        }
    }
})