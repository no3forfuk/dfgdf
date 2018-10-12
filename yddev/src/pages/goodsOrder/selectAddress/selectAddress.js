const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        }
    },
    data: {
        selectIndex: 0
    },
    attached() {

    },
    methods: {
        //选择收货地址
        selectAddress(e) {
            this.triggerEvent('closeSelectAddress', {id: e.detail.value})
        },
        goEdit() {
            this.triggerEvent('goEdit')
        }
    }
})