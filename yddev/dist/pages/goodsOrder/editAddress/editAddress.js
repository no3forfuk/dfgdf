const app=getApp();Component({properties:{},data:{province:[],provinceIndex:[],regions:["","",""],isSelectRegion:!1,address:"",mobile:"",consignee:"",canAddAddress:!1,addressList:[1,1,1],editType:0,address_id:""},ready(){this.getAddressList()},methods:{getAddressList(){app.request.getReceiveAddress({params:{user_id:wx.getStorageSync("u_id")},success:e=>{this.setData({addressList:e.data})}})},startEdit(e){const s=e.currentTarget.dataset.item;this.setData({regions:[s.province,s.city,s.area],isSelectRegion:!1,address:s.address,mobile:s.consignee_mobile,consignee:s.consignee,canAddAddress:!1,editType:2,address_id:s.address_id})},startAdd(){this.setData({regions:["","",""],isSelectRegion:!1,address:"",mobile:"",consignee:"",canAddAddress:!1,editType:1})},backPrev(){this.triggerEvent("closeAddAddress")},areaChange(e){this.setData({isSelectRegion:!0,regions:e.detail.value})},addReceiveAddress(){if(this.assertParams(),this.data.canAddAddress){let e={type:this.data.editType,user_id:wx.getStorageSync("u_id"),province:this.data.regions[0],city:this.data.regions[1],area:this.data.regions[2],address:this.data.address,consignee_mobile:this.data.mobile,consignee:this.data.consignee,address_id:this.data.address_id};1==this.data.editType&&delete e.address_id,app.request.addReceiveAddress({params:e,success:e=>{1==e.code&&this.setData({regions:["","",""],isSelectRegion:!1,address:"",mobile:"",consignee:"",canAddAddress:!1,editType:0}),this.getAddressList(),this.triggerEvent("refreshAddressList")}})}},setConsignee(e){this.setData({consignee:e.detail.value})},setMobilePhone(e){this.setData({mobile:e.detail.value})},setAddress(e){this.setData({address:e.detail.value})},assertParams(){let e="";0==this.data.address.length?e="请填写您的详细收货地址":0==this.data.mobile.length?e="请填写您的收货电话":0==this.data.consignee.length?e="请填写您的收货人姓名":this.data.regions[0]&&this.data.regions[1]&&this.data.regions[2]||(e="请选择省，市，区"),e?(wx.showModal({title:"",content:e,showCancel:!1}),this.setData({canAddAddress:!1})):this.setData({canAddAddress:!0})}}});