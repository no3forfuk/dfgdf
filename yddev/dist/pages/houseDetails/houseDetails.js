const app=getApp();Page({data:{baseInfo:{},detailSwiper:{dots:!0,autoplay:!0,circular:!0,duration:300,interval:5e3,activeColor:"#77D5F9",items:[]},houseContent:[{label:"位置:",text:"朝南"},{label:"户型:",text:"一室一厅"},{label:"面积:",text:"35.0平米"},{label:"层高:",text:"3/6层"}],roomConfig:[],hardwareData:[],likenessData:[],phone:"",isCollected:!1},onpagescroll(){},goHouserOrder(){wx.navigateTo({url:`/pages/houseOrder/houseOrder?id=${this.options.id}`})},toggleCollect(){const t={uid:wx.getStorageSync("u_id"),type:3,house_id:this.options.id};this.data.isCollected?app.request.discollect({params:t,success:t=>{this.setData({isCollected:!this.data.isCollected})}}):app.request.collect({params:t,success:t=>{this.setData({isCollected:!this.data.isCollected})}})},playCall(t){const e=t.currentTarget.dataset.phone;wx.makePhoneCall({phoneNumber:e})},getHouseDetail(){app.request.getHouseDetail({params:{house_id:this.options.id,uid:wx.getStorageSync("u_id")},success:t=>{this.setSwiperImage(t.result_data.atlas_list),this.setHouseContent(t.result_data),this.setRoomConfig(t.result_data),this.setHardwareData(t.result_data),this.setOtherData(t.result_data),wx.setNavigationBarTitle({title:`${t.result_data.apartment_title}-${t.result_data.apartment_store_title}`}),this.setData({phone:t.result_data.house_tel,isCollected:0!=t.result_data.focus_house_state,likenessData:t.result_data.like_house_list})}})},setSwiperImage(t){const e=t.map(function(t,e){return t.image_path});this.setData({detailSwiper:Object.assign(this.data.detailSwiper,{items:e})})},onviewswiper(t){const[e,a]=[t.currentTarget.dataset.index,this.data.detailSwiper];wx.previewImage({urls:a.items,current:a.items[e]})},setHouseContent(t){const e=[{label:"位置:",text:`朝${t.chaoxiang}`},{label:"户型:",text:t.house_type},{label:"面积:",text:t.acreage},{label:"层高:",text:t.fangceng}];this.setData({houseContent:e})},setRoomConfig(t){this.setData({roomConfig:t.facility_list})},setHardwareData(t){this.setData({hardwareData:t.service_intro_list})},setOtherData(t){this.setData({baseInfo:{price:t.price,recommend_reasons:t.recommend_reasons,address:t.address,rental_tips:t.rental_tips,name:`${t.apartment_title}-${t.apartment_store_title}`}})},onLoad:function(t){},onReady:function(){},onShow:function(){this.getHouseDetail()},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){}});