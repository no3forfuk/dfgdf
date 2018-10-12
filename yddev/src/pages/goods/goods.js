// pages/goods/goods.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodSwiper: {
            dots: true,
            autoplay: true,
            circular: true,
            duration: 300,
            interval: 5000,
            activeColor: '#77D5F9',
            items: []
        },
        recommendGoods: [],
        goodsAppraise: [{}],
        goodsDetail: {},
        isSelectParams: false,
        openSelect: false
    },
    //轮播图预览
    onviewswiper(e) {
        const [index, swiper] = [e.currentTarget.dataset.index, this.data.goodSwiper];
        wx.previewImage({
            urls: swiper.items,
            current: swiper.items[index]
        })
    },
    //返回首页
    onbackhomepage() {
        wx.reLaunch({
            url: `/pages/index/index?id=2`,
        })
    },
    //选择商品参数
    onselectparams() {
        this.setData({
            openSelect: true
        })
        const animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease',
        })
        animation.translateX('0').step()
        this.setData({
            animationData: animation.export()
        })
    },
    //关闭选择popup
    oncloseselect(e) {
        console.log(e.detail);
        this.setData({
            isSelectParams: true
        })
        const animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease',
        })
        animation.translateX('100%').step()
        this.setData({
            animationData: animation.export()
        })
        this.setData({
            openSelect: false
        })
    },
    //跳转评价页
    onlinktoappriase() {
        wx.navigateTo({
            url: `/pages/goodsAppraise/goodsAppraise`,
        })
    },
    //拨打电话
    playCall(e) {
        const phone = e.currentTarget.dataset.phone
        wx.makePhoneCall({
            phoneNumber: phone
        })
    },
    //设置轮播图
    setSwiperImage(arr) {
        const imglist = arr.map(function (item, key) {
            return item.image_path
        })
        this.setData({
            goodSwiper: Object.assign(this.data.goodSwiper, {items: imglist})
        })
    },
    //获取商品详情
    getGoodsDetail() {
        app.request.getGoodsDetail({
            params: {
                commodity_id: this.options.goodsId
            },
            success: res => {
                this.setSwiperImage(res.data.commodity.img_atlas)
                this.setData({
                    goodsDetail: res.data.commodity,
                    recommendGoods: res.data.recommend
                })
            }
        })
    },
    //确认订单
    comfirmOrder() {
        if (!this.data.isSelectParams) {
            this.onselectparams()
        } else {
            wx.navigateTo({
                url: `/pages/goodsOrder/goodsOrder?id=${this.options.goodsId}`
            })
        }

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
        wx.setNavigationBarTitle({
            title: `商品详情`
        });

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        this.getGoodsDetail()
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