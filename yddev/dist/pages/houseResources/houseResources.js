const app=getApp();Page({data:{tabBarData:{show:!0,options:{current:3},items:[{label:"活动",key:"active"},{label:"圈子",key:"circle"},{label:"商城",key:"mall"},{label:"我的",key:"mine"}]},resourcesData:[]},ontabbarchange(e){const[t,a]=[e.detail.index,this.data.tabBarData];a.options.current=t,this.setData({tabBarData:a}),wx.reLaunch({url:`/pages/index/index?id=${t}`})},onpagescroll(e){},getCollenctedHouse(){app.request.getCollenctedHouse({params:{uid:wx.getStorageSync("u_id")},success:e=>{console.log(e),this.setData({resourcesData:e.result_data.result})}})},collect(e){const t=e.currentTarget.dataset,a={uid:wx.getStorageSync("u_id"),type:3,house_id:t.id};app.request.discollect({params:a,success:e=>{this.getCollenctedHouse()}})},onLoad:function(e){wx.setTopBarText({text:"收藏房源"})},onReady:function(){},onShow:function(){wx.setNavigationBarTitle({title:"收藏房源"}),this.getCollenctedHouse()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){}});