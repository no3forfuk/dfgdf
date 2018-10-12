// template/goodsList/goodsList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goodsList: {
            type: Array,
            value: [],
            observer(n, o, c) {
                if (n.length > 0) {
                    this.setData({
                        cellList: n
                    })
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        cellList: []
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})