const app=getApp(),ajax=app.request;Component({properties:{},data:{cellList:[]},attached(){(()=>{this.getGoodsList()})()},methods:{getGoodsList(){ajax.getGoodsList({success:t=>{this.setData({cellList:t.data})}})}}});