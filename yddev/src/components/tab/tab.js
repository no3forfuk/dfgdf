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
        tabHeaderArray: [],
        markStyle: {
            width: 0,
            left: 0
        }
    },
    ready() {
        (() => {
            //设置标记span位置及样式
            const query = wx.createSelectorQuery().in(this)
            query.selectAll('.tab-component-items-text').boundingClientRect()
            query.exec(res => {
                if (!res[0]) {
                    return
                } else {
                    this.setData({
                        tabHeaderArray: res[0]
                    })
                    this.setCurrentStyle(this.data.current)
                }
            })
        })();
    },
    methods: {
        ontapitem(e) {
            const dataset = e.currentTarget.dataset
            if (dataset.index === this.data.current) {
                return
            } else {
                this.setData({
                    current: dataset.index
                })
                this.setCurrentStyle(dataset.index)
                this.triggerEvent('change', dataset)
            }
        },
        setCurrentStyle(index) {
            if (this.data.tabHeaderArray.length <= 0) {
                return
            } else {
                const [crtIndex, allItem] = [index, this.data.tabHeaderArray]
                this.setData({
                    markStyle: allItem[crtIndex]
                })
            }

        }
    }
})