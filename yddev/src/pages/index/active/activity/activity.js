// pages/index/active/activity/activity.js、
const app = getApp()
const request = app.request
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        classifyData: {
            items: [{
                label: '房质保证',
                icon: 'icon-xuanchuan3',
                color: '#F4AA6E',
                key: 'quality'
            }, {
                label: '安全放心',
                icon: 'icon-xuanchuan',
                color: '#B0D79D',
                key: 'safe'
            }, {
                label: '信息保密',
                icon: 'icon-xuanchuan1',
                color: '#F6B6AC',
                key: 'secret'
            }, {
                label: '管家7*24',
                icon: 'icon-xuanchuan2',
                color: '#D8EEF6',
                key: 'butler'
            },]
        },
        activing: []
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 获取进行中的活动列表

    },
    attached() {

    },
    ready() {

    },
})