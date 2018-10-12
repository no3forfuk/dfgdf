// pages/rent/unpaid/unpaid.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        unpaidInfo: {
            type: Object,
            value: {}
        },
        selected: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        showDesc: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        ontoggledesc() {
            if (this.data.showDesc) {
                var animation = wx.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                animation.height('0').step()
                this.setData({
                    animationData: animation.export()
                })
            } else {
                var animation = wx.createAnimation({
                    duration: 500,
                    timingFunction: 'ease',
                })
                animation.height('178rpx').step()
                this.setData({
                    animationData: animation.export()
                })
            }

            this.setData({
                showDesc: !this.data.showDesc
            })
        },
        selectItem() {
            this.triggerEvent('selectItem', null)
        }
    }
})