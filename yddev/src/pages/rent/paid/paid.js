// pages/rent/paid/paid.js
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
                animation.height('150rpx').step()
                this.setData({
                    animationData: animation.export()
                })
            }

            this.setData({
                showDesc: !this.data.showDesc
            })
        }
    }
})