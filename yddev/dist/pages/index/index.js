const app=getApp();Page({data:{currentPage:"active",tabBarItems:[{label:"活动",key:"active",icon:"icon-huodong"},{label:"圈子",key:"circle",icon:"icon-quanzi"},{label:"商城",key:"mall",icon:"icon-shangcheng"},{label:"我的",key:"mine",icon:"icon-wode"}]},switchTabbar(a){this.setData({currentPage:a.detail.item.key})},hideTabbar(){app.animation.slideDown(a=>{this.setData({animationData:a})})},showTabbar(){app.animation.slideUp(a=>{this.setData({animationData:a})})},onLoad(a){},onReady(){},onShow(){},onHide(){},onUnload(){},onPullDownRefresh(){},onReachBottom(){},onShareAppMessage(){}});