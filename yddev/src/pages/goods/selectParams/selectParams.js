// pages/goods/selectParams/selectParams.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        goodsId: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        paramData: [],
        defaultSelect: []
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //构建规格json
        setStandard() {
            const [v_arr, k_arr] = [this.data.defaultSelect, this.data.paramData]
            let obj = {};
            let standardParams = [];
            for (let i = 0; i < k_arr.length; i++) {
                let _obj = {};
                let key = k_arr[i].label
                let val = k_arr[i].items[v_arr[i]]
                _obj.label = key
                _obj.value = val
                standardParams.push(_obj)
                key = this.filterEnglishCode(key)
                val = this.filterEnglishCode(val)
                obj[key] = val
            }
            wx.setStorage({
                key: "standardParams",
                data: standardParams
            });
            wx.setStorage({
                key: "encodeStandard",
                data: obj
            });
            return obj
        },
        //过滤英文字符
        filterEnglishCode(str) {
            const reg = /[A-z]/
            var res = [];
            for (var i = 0; i < str.length; i++) {
                if (reg.test(str[i])) {
                    res[i] = str[i]
                } else {
                    res[i] = '\\u' + ("00" + str.charCodeAt(i).toString(16)).slice(-4);
                }
            }
            return res.join('')
        },
        emitclose() {
            const standardJson = this.setStandard()
            let str = JSON.stringify(standardJson)
            str = str.replace(/\\u/g, 'u')
            app.request.searchStock({
                params: {
                    commodity_id: this.properties.goodsId,
                    property_json: str
                },
                success: res => {
                    if (res.code == 0) {

                    } else {

                    }
                }
            })
            this.triggerEvent('emitcloseselect', {standardJson})
        },
        //选择型号
        onselected(e) {
            const dataset = e.currentTarget.dataset
            const [index, idx, defaultSelect] = [dataset.index, dataset.idx, this.data.defaultSelect]
            if (defaultSelect[index] == idx) {
                return
            } else {
                defaultSelect[index] = idx
                this.setData({
                    defaultSelect: defaultSelect
                })
            }
        },
        //获取商品规格
        getGoodsStandard() {
            app.request.getGoodsStandard({
                params: {
                    commodity_id: this.properties.goodsId
                },
                success: res => {
                    this.buildParamData(res)
                }
            })
        },
        //构建规格数据
        buildParamData(res) {
            const [standard, paramData, defaultSelect] = [res.data, this.data.paramData, this.data.defaultSelect]
            for (let k in standard) {
                let obj = {
                    label: k,
                    items: standard[k]
                }
                paramData.push(obj)
                defaultSelect.push(0)
            }
            this.setData({
                paramData,
                defaultSelect
            })
        },
    },
    detached() {
        wx.setNavigationBarTitle({
            title: `商品详情`
        });
    },
    ready() {
        wx.setNavigationBarTitle({
            title: `选择规格`
        });
        this.getGoodsStandard()
    }
})