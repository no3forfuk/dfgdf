const app=getApp(),ajax=app.request;Page({data:{feeCurrent:0,scrollHeight:0,currentOrder:0,markStyle:{width:0,left:0},headerData:[{text:"待付费用"},{text:"已付费用"}],paidData:[],unpaidData:[]},onchangefeetype(t){this.setData({feeCurrent:t.currentTarget.dataset.index}),this.setFeeMarkPosition(),this.hidePayBtn()},setFeeMarkPosition(){const[t]=[this.data.feeCurrent],e=wx.createSelectorQuery();e.selectAll(".header-item-text").boundingClientRect(),e.exec(e=>{e[0]&&this.setData({markStyle:{width:e[0][t].width,left:e[0][t].left}})})},onselectunpaiditem(t){const e=t.currentTarget.dataset.index;this.setData({currentOrder:e})},hidePayBtn(){var t=wx.createAnimation({duration:500,timingFunction:"ease"});0==this.data.feeCurrent?t.translateY("0").step():t.translateY("100%").step(),this.setData({animationData:t.export()})},goapply(){wx.navigateTo({url:`/pages/rentOrder/rentOrder?index=${this.data.currentOrder}`})},oncloseselect(){},getPaidList(){app.request.getRentList({params:{uid:wx.getStorageSync("u_id")},success:t=>{this.setData({unpaidData:t.result_data.result.no_pay_list,paidData:t.result_data.result.pay_list})}})},onLoad:function(t){},onReady:function(){(()=>{const t=wx.getStorageSync("system"),e=wx.createSelectorQuery();e.select(".rent-body").boundingClientRect(),e.exec(e=>{if(e[0]){const[a,n]=[e[0].top,t.windowHeight];this.setData({scrollHeight:n-a})}})})()},onShow:function(){wx.setNavigationBarTitle({title:"房租水电"}),this.setFeeMarkPosition(),this.getPaidList()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){}});