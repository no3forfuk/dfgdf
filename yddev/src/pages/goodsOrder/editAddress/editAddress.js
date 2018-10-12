const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},
    data: {
        province: [],
        provinceIndex: [],
        regions: ['', '', ''],
        isSelectRegion: false,
        address: '',
        mobile: '',
        consignee: '',
        canAddAddress: false,
        addressList: [1, 1, 1],
        editType: 0,
        address_id: ''
    },
    ready() {
        this.getAddressList()
    },
    methods: {
        //获取收货地址列表
        getAddressList() {
            app.request.getReceiveAddress({
                params: {
                    user_id: wx.getStorageSync('u_id')
                },
                success: res => {
                    this.setData({
                        addressList: res.data
                    })
                }
            })
        },
        startEdit(e) {
            const item = e.currentTarget.dataset.item
            this.setData({
                regions: [item.province, item.city, item.area],
                isSelectRegion: false,
                address: item.address,
                mobile: item.consignee_mobile,
                consignee: item.consignee,
                canAddAddress: false,
                editType: 2,
                address_id: item.address_id
            })
        },
        startAdd() {
            this.setData({
                regions: ['', '', ''],
                isSelectRegion: false,
                address: '',
                mobile: '',
                consignee: '',
                canAddAddress: false,
                editType: 1
            })
        },
        //返回上一页
        backPrev() {
            this.triggerEvent('closeAddAddress')
        },
        //地区发生变化
        areaChange(e) {
            this.setData({
                isSelectRegion: true,
                regions: e.detail.value
            })
        },
        //新增收货地址
        addReceiveAddress() {
            this.assertParams();
            if (this.data.canAddAddress) {
                let params = {
                    type: this.data.editType,
                    user_id: wx.getStorageSync('u_id'),
                    province: this.data.regions[0],
                    city: this.data.regions[1],
                    area: this.data.regions[2],
                    address: this.data.address,
                    consignee_mobile: this.data.mobile,
                    consignee: this.data.consignee,
                    address_id: this.data.address_id
                }
                if (this.data.editType == 1) {
                    delete params.address_id
                }
                app.request.addReceiveAddress({
                    params: params,
                    success: res => {
                        if (res.code == 1) {
                            this.setData({
                                regions: ['', '', ''],
                                isSelectRegion: false,
                                address: '',
                                mobile: '',
                                consignee: '',
                                canAddAddress: false,
                                editType: 0
                            })
                        }
                        this.getAddressList()
                        this.triggerEvent('refreshAddressList')
                    }
                })
            } else {
                return
            }
        },
        //设置收货人
        setConsignee(e) {
            this.setData({
                consignee: e.detail.value
            })
        },
        //设置手机
        setMobilePhone(e) {
            this.setData({
                mobile: e.detail.value
            })
        },
        //设置详细地址
        setAddress(e) {
            this.setData({
                address: e.detail.value
            })
        },
        //判断参数
        assertParams() {
            let tips = '';
            if (this.data.address.length == 0) {
                tips = '请填写您的详细收货地址'
            } else if (this.data.mobile.length == 0) {
                tips = '请填写您的收货电话'
            } else if (this.data.consignee.length == 0) {
                tips = '请填写您的收货人姓名'
            } else if (!this.data.regions[0] || !this.data.regions[1] || !this.data.regions[2]) {
                tips = '请选择省，市，区'
            }
            if (tips) {
                wx.showModal({
                    title: '',
                    content: tips,
                    showCancel: false
                })
                this.setData({
                    canAddAddress: false
                })
            } else {
                this.setData({
                    canAddAddress: true
                })
            }
        }
    }
})