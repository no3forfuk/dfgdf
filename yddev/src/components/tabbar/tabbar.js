const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items: {
            type: Array,
            value: []
        },
        current: {
            type: Number,
            value: 0,
            observer(n, o, c) {
                this.setData({
                    current: n
                })
            }
        }
    },
    data: {
        current: 0,
    },
    attached() {

    },
    methods: {
        ontapitem(e) {
            const [dataset, current] = [e.currentTarget.dataset, this.data.current]
            if (dataset.index === current) {
                return
            } else {
                this.setData({
                    current: dataset.index
                })
                this.triggerEvent('change', dataset)
            }
        }
    }
})