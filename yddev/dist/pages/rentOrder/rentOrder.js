const app=getApp();Page({data:{unpaidInfo:{}},getPaidList(){app.request.getRentList({params:{uid:wx.getStorageSync("u_id")},success:t=>{t.result_data.result.no_pay_list.length>0&&this.setData({unpaidInfo:t.result_data.result.no_pay_list[this.options.index]})}})},onLoad(t){},onReady(){},onShow(){this.getPaidList()},onHide(){},onUnload(){},onPullDownRefresh(){},onReachBottom(){},onShareAppMessage(){}});