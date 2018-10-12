// pages/myOrder/paid/paid.js
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
        detailData: [{
            label: '公寓品牌',
            text: '公寓品牌'
        }, {
            label: '房间号',
            text: '公寓品牌'
        }, {
            label: '门店',
            text: '屋企坪洲旗舰店'
        }, {
            label: '签约方式',
            text: '管家线下签约'
        }, {
            label: '合约期限',
            text: '年签'
        }, {
            label: '合同编号',
            text: '555488745521'
        }, {
            label: '押付方式',
            text: '押一付一'
        }, {
            label: '起始日期',
            text: '2017-09-27'
        }, ],
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
                animation.height('336.2rpx').step()
                this.setData({
                    animationData: animation.export()
                })
            }

            this.setData({
                showDesc: !this.data.showDesc
            })
        },
        selectItem() {
            if (!this.data.isSelected) {
                this.triggerEvent('selectItem', {
                    id: 1
                })
            } else {
                this.triggerEvent('selectItem', null)
            }
            this.setData({
                isSelected: !this.data.isSelected
            })
        }
    }
})