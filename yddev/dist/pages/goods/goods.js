const app=getApp();Page({data:{goodSwiper:{dots:!0,autoplay:!0,circular:!0,duration:300,interval:5e3,activeColor:"#77D5F9",items:[]},recommendGoods:[],goodsAppraise:[{}],goodsDetail:{},isSelectParams:!1,openSelect:!1},onviewswiper(t){const[e,a]=[t.currentTarget.dataset.index,this.data.goodSwiper];wx.previewImage({urls:a.items,current:a.items[e]})},onbackhomepage(){wx.reLaunch({url:"/pages/index/index?id=2"})},onselectparams(){this.setData({openSelect:!0});const t=wx.createAnimation({duration:300,timingFunction:"ease"});t.translateX("0").step(),this.setData({animationData:t.export()})},oncloseselect(t){console.log(t.detail),this.setData({isSelectParams:!0});const e=wx.createAnimation({duration:300,timingFunction:"ease"});e.translateX("100%").step(),this.setData({animationData:e.export()}),this.setData({openSelect:!1})},onlinktoappriase(){wx.navigateTo({url:"/pages/goodsAppraise/goodsAppraise"})},playCall(t){const e=t.currentTarget.dataset.phone;wx.makePhoneCall({phoneNumber:e})},setSwiperImage(t){const e=t.map(function(t,e){return t.image_path});this.setData({goodSwiper:Object.assign(this.data.goodSwiper,{items:e})})},getGoodsDetail(){app.request.getGoodsDetail({params:{commodity_id:this.options.goodsId},success:t=>{this.setSwiperImage(t.data.commodity.img_atlas),this.setData({goodsDetail:t.data.commodity,recommendGoods:t.data.recommend})}})},comfirmOrder(){this.data.isSelectParams?wx.navigateTo({url:`/pages/goodsOrder/goodsOrder?id=${this.options.goodsId}`}):this.onselectparams()},onLoad:function(t){},onReady:function(){wx.setNavigationBarTitle({title:"商品详情"})},onShow:function(t){this.getGoodsDetail()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){}});