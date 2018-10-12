// pages/houseDetails/houseDetails.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseInfo: {},
        detailSwiper: {
            dots: true,
            autoplay: true,
            circular: true,
            duration: 300,
            interval: 5000,
            activeColor: '#77D5F9',
            items: []
        },
        houseContent: [{
            label: '位置:',
            text: '朝南'
        }, {
            label: '户型:',
            text: '一室一厅'
        }, {
            label: '面积:',
            text: '35.0平米'
        }, {
            label: '层高:',
            text: '3/6层'
        }],
        roomConfig: [],
        hardwareData: [],
        likenessData: [],
        phone: '',
        isCollected: false,
    },
    onpagescroll() {

    },
    //跳转至下单页面
    goHouserOrder() {
        wx.navigateTo({
            url: `/pages/houseOrder/houseOrder?id=${this.options.id}`
        })
    },
    //切换收藏状态
    toggleCollect() {
        const params = {
            uid: wx.getStorageSync('u_id'),
            type: 3,
            house_id: this.options.id
        }
        if (this.data.isCollected) {
            app.request.discollect({
                params: params,
                success: res => {
                    this.setData({
                        isCollected: !this.data.isCollected
                    })
                }
            })
        } else {
            app.request.collect({
                params: params,
                success: res => {
                    this.setData({
                        isCollected: !this.data.isCollected
                    })
                }
            })
        }

    },
    //拨打电话
    playCall(e) {
        const phone = e.currentTarget.dataset.phone
        wx.makePhoneCall({
            phoneNumber: phone
        })
    },
    //获取房源详情
    getHouseDetail() {
        app.request.getHouseDetail({
            params: {
                house_id: this.options.id,
                uid: wx.getStorageSync('u_id')
            },
            success: res => {
                this.setSwiperImage(res.result_data.atlas_list)
                this.setHouseContent(res.result_data)
                this.setRoomConfig(res.result_data)
                this.setHardwareData(res.result_data)
                this.setOtherData(res.result_data)
                wx.setNavigationBarTitle({
                    title: `${res.result_data.apartment_title}-${res.result_data.apartment_store_title}`
                })
                this.setData({
                    phone: res.result_data.house_tel,
                    isCollected: res.result_data.focus_house_state == 0 ? false : true,
                    likenessData: res.result_data.like_house_list
                })
            }
        })
    },
    //设置轮播图
    setSwiperImage(arr) {
        const imglist = arr.map(function (item, key) {
            return item.image_path
        })
        this.setData({
            detailSwiper: Object.assign(this.data.detailSwiper, {items: imglist})
        })
    },
    //预览轮播图
    onviewswiper(e) {
        const [index, swiper] = [e.currentTarget.dataset.index, this.data.detailSwiper];
        wx.previewImage({
            urls: swiper.items,
            current: swiper.items[index]
        })
    },
    //设置房源houseContent
    setHouseContent(res) {
        const houseContent = [{
            label: '位置:',
            text: `朝${res.chaoxiang}`
        }, {
            label: '户型:',
            text: res.house_type
        }, {
            label: '面积:',
            text: res.acreage
        }, {
            label: '层高:',
            text: res.fangceng
        }]
        this.setData({houseContent})
    },
    //设置房间配置
    setRoomConfig(res) {
        this.setData({
            roomConfig: res.facility_list
        })
    },
    //设置房间服务
    setHardwareData(res) {
        this.setData({
            hardwareData: res.service_intro_list
        })
    },
    //设置其他数据
    setOtherData(res) {
        this.setData({
            baseInfo: {
                price: res.price,
                recommend_reasons: res.recommend_reasons,
                address: res.address,
                rental_tips: res.rental_tips,
                name: `${res.apartment_title}-${res.apartment_store_title}`
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        this.getHouseDetail()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})