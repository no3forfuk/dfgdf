Component({properties:{},data:{detailData:[{label:"公寓品牌",text:"公寓品牌"},{label:"房间号",text:"公寓品牌"},{label:"门店",text:"屋企坪洲旗舰店"},{label:"签约方式",text:"管家线下签约"},{label:"合约期限",text:"年签"},{label:"合同编号",text:"555488745521"},{label:"押付方式",text:"押一付一"},{label:"起始日期",text:"2017-09-27"}],showDesc:!1},methods:{ontoggledesc(){var t;this.data.showDesc?((t=wx.createAnimation({duration:500,timingFunction:"ease"})).height("0").step(),this.setData({animationData:t.export()})):((t=wx.createAnimation({duration:500,timingFunction:"ease"})).height("336.2rpx").step(),this.setData({animationData:t.export()}));this.setData({showDesc:!this.data.showDesc})},selectItem(){this.data.isSelected?this.triggerEvent("selectItem",null):this.triggerEvent("selectItem",{id:1}),this.setData({isSelected:!this.data.isSelected})}}});