const app=getApp();Page({data:{openAddress:!1,hasAddress:!1,orderData:{},storeTips:["官方"],standardParams:[],messageTips:"欢迎光临圆点商城",selectAddress:!1,currentAddress:{},addressList:[],stockId:"",buyNum:1},getReceiveAddress(){app.request.getReceiveAddress({params:{user_id:wx.getStorageSync("u_id")},success:s=>{s.data.length>0?this.setData({hasAddress:!0,currentAddress:s.data[0],addressList:s.data}):this.setData({hasAddress:!1})}})},openEditAddress(){this.setData({openAddress:!0,selectAddress:!1}),this.slide2Left()},startAddress(){this.setData({openAddress:!0}),this.slide2Left()},closeAddAddress(){this.slide2Right(),setTimeout(()=>{this.setData({openAddress:!1})},300)},openSelectAddress(){this.setData({selectAddress:!0}),this.slide2Left()},closeSelectAddress(s){this.slide2Right();const t=s.detail.id,e=this.data.addressList.filter(s=>s.address_id==t);this.setData({currentAddress:e[0]}),setTimeout(()=>{this.setData({selectAddress:!1})},300)},comfirmBuildOrder(){const s={user_id:wx.getStorageSync("u_id"),commodity_id:this.options.id,stock_id:this.data.stockId,buy_num:this.data.buyNum,...this.data.currentAddress};delete s.add_time,delete s.address_id,app.request.createGoodsOrder({params:s,success:s=>{this.pay(s.data.pay)}})},pay(s){wx.requestPayment({...s,success:s=>{console.log(s)}})},getStockId(){wx.getStorage({key:"encodeStandard",success:s=>{let t=JSON.stringify(s.data);t=t.replace(/\\u/g,"u"),app.request.searchStock({params:{commodity_id:this.options.id,property_json:t},success:s=>{this.setData({stockId:s.data.stock_id})}})}})},setGoodsDetails(){app.request.getGoodsDetail({params:{commodity_id:this.options.id},success:s=>{this.setData({orderData:s.data.commodity})}})},onLoad(s){},onReady(){wx.setNavigationBarTitle({title:"订单确认"})},onShow(){this.setGoodsDetails(),wx.getStorage({key:"standardParams",success:s=>{this.setData({standardParams:s.data})}}),this.getReceiveAddress(),this.getStockId()},slide2Left(){const s=wx.createAnimation({duration:300,timingFunction:"ease"});s.translateX("0").step(),this.setData({animationData:s.export()})},slide2Right(){const s=wx.createAnimation({duration:300,timingFunction:"ease"});s.translateX("100%").step(),this.setData({animationData:s.export()})},onHide(){},onUnload(){},onPullDownRefresh(){},onReachBottom(){},onShareAppMessage(){}});