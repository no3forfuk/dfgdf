//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openAddress: false,
        hasAddress: false,
        orderData: {},
        storeTips: ['官方'],
        standardParams: [],
        messageTips: '欢迎光临圆点商城',
        selectAddress: false,
        currentAddress: {},
        addressList: [],
        stockId: '',
        buyNum: 1
    },
    //获取收货地址列表
    getReceiveAddress() {
        app.request.getReceiveAddress({
            params: {
                user_id: wx.getStorageSync('u_id')
            },
            success: res => {
                if (res.data.length > 0) {
                    this.setData({
                        hasAddress: true,
                        currentAddress: res.data[0],
                        addressList: res.data
                    })
                } else {
                    this.setData({
                        hasAddress: false
                    })
                }
            }
        })
    },
    //打开编辑收货地址
    openEditAddress() {
        this.setData({
            openAddress: true,
            selectAddress: false
        })
        this.slide2Left()
    },
    //开始编辑收货地址
    startAddress() {
        this.setData({
            openAddress: true
        })
        this.slide2Left()
    },
    //关闭收货添加地址
    closeAddAddress() {
        this.slide2Right()
        setTimeout(() => {
            this.setData({
                openAddress: false
            })
        }, 300)
    },
    //开始选择收货地址
    openSelectAddress() {
        this.setData({
            selectAddress: true
        })
        this.slide2Left()
    },
    //关闭选择收货地址
    closeSelectAddress(e) {
        this.slide2Right()
        const id = e.detail.id
        const address = this.data.addressList.filter(item => {
            return item.address_id == id
        })
        this.setData({
            currentAddress: address[0]
        })
        setTimeout(() => {
            this.setData({
                selectAddress: false
            })
        }, 300)
    },
    //确认创建订单
    comfirmBuildOrder() {
        const params = {
            user_id: wx.getStorageSync('u_id'),
            commodity_id: this.options.id,
            stock_id: this.data.stockId,
            buy_num: this.data.buyNum,
            ...this.data.currentAddress
        }
        delete params.add_time
        delete params.address_id
        app.request.createGoodsOrder({
            params: params,
            success: res => {
                this.pay(res.data.pay)
            }
        })
    },
    //支付
    pay(e) {
        wx.requestPayment({
            ...e,
            success: res => {
                console.log(res);
            }
        })
    },
    //获取库存ID
    getStockId() {
        wx.getStorage({
            key: 'encodeStandard',
            success: res => {
                let str = JSON.stringify(res.data)
                str = str.replace(/\\u/g, 'u')
                app.request.searchStock({
                    params: {
                        commodity_id: this.options.id,
                        property_json: str
                    },
                    success: res => {
                        this.setData({
                            stockId: res.data.stock_id
                        })
                    }
                })
            }
        });
    },
    //查询商品信息
    setGoodsDetails() {
        app.request.getGoodsDetail({
            params: {
                commodity_id: this.options.id
            },
            success: res => {
                this.setData({
                    orderData: res.data.commodity
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: '订单确认'
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        //获取基本信息
        this.setGoodsDetails()
        //获取商品规格
        wx.getStorage({
            key: 'standardParams',
            success: res => {
                this.setData({
                    standardParams: res.data
                })
            }
        });
        //获取收货地址
        this.getReceiveAddress()
        //获取库存ID
        this.getStockId()
    },
    //动画slideToLeft
    slide2Left() {
        const animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease',
        })
        animation.translateX('0').step()
        this.setData({
            animationData: animation.export()
        })
    },
    //动画slideToRight
    slide2Right() {
        const animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease',
        })
        animation.translateX('100%').step()
        this.setData({
            animationData: animation.export()
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})