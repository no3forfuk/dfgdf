/*Created By Jsir on 2018/9/27*/
'use strict'
const api = function () {
    const o_uri = 'http://api.008yuandian.com'
    const n_uri = 'http://xcx.008yuandian.com'

    function apis(data) {
        wx.request({
            url: data.url,
            data: data.params,
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success(res) {
                if (!data.success) return
                data.success(res.data)
            },
            fail(res) {
                console.log(res)
            }
        })
    }

    return {
        //登陆
        login(data) {
            return apis({
                url: n_uri + '/Login/xcxLogin',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取商品列表
        getGoodsList(data) {
            return apis({
                url: n_uri + '/Commodity/getCommodityList',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取商品浏览历史
        getGoodsHistory(data) {
            return apis({
                url: n_uri + '/Commodity/getCommodityList',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取商品详情
        getGoodsDetail(data) {
            return apis({
                url: n_uri + '/Commodity/getCommodityInfo',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取圈子首页
        getCircelIndex(data) {
            return apis({
                url: o_uri + '/feed/index',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取post详情
        getPostDetails(data) {
            return apis({
                url: o_uri + '/feed/detail',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取个人信息
        getUserCenterInfo(data) {
            return apis({
                url: o_uri + '/user_info/get_user_detail',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //提交投诉建议
        submitComplain(data) {
            return apis({
                url: o_uri + '/feedback/add',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取家政服务类型
        getHouseWorkType(data) {
            return apis({
                url: o_uri + '/service/get_type',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //提交家政服务
        submitHouseWorkType(data) {
            return apis({
                url: o_uri + '/service/add',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取订单列表
        getOrderList(data) {
            return apis({
                url: o_uri + '/order/order_list',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取水电费列表
        getRentList(data) {
            return apis({
                url: o_uri + '/order/order_month_cost_list',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取房源浏览历史
        getHouseResouceViewHistory(data) {
            return apis({
                url: o_uri + '/house/get_view_log',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取房源列表
        getHouseResourcesList(data) {
            return apis({
                url: o_uri + '/house/get_list',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取收藏房源列表
        getCollenctedHouse(data) {
            return apis({
                url: o_uri + '/follow/house',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //收藏
        collect(data) {
            return apis({
                url: o_uri + '/common/with_focus',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //取消收藏
        discollect(data) {
            return apis({
                url: o_uri + '/common/cancel_focus',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取活动详情
        getActiveDetail(data) {
            return apis({
                url: n_uri + '/common/cancel_focus',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //发布动态
        publishPost(data) {
            return apis({
                url: o_uri + '/feed/add',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取七牛上传token--image
        get7niuImageToken(data) {
            return apis({
                url: o_uri + '/upload/get_image_token',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取七牛上传token--video
        get7niuVideoToken(data) {
            return apis({
                url: o_uri + '/upload/get_video_token',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //点赞
        praiseAdd(data) {
            return apis({
                url: o_uri + '/praise/add',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //取消点赞
        cancelPraise(data) {
            return apis({
                url: o_uri + '/praise/cancel',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //添加评论
        addComment(data) {
            return apis({
                url: o_uri + '/comment/add_comment',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取评论列表
        getCommentList(data) {
            return apis({
                url: o_uri + '/feed/get_comment',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取可开锁房间
        getLockRoom(data) {
            return apis({
                url: o_uri + '/lock/get_house_no_list',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //远程开锁
        remoteDelock(data) {
            return apis({
                url: o_uri + '/lock/open_lock',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取房源详情
        getHouseDetail(data) {
            return apis({
                url: o_uri + '/house/detail',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //生成商品订单
        createGoodsOrder(data) {
            return apis({
                url: n_uri + '/Commodity/generateOrder',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取商品规格
        getGoodsStandard(data) {
            return apis({
                url: n_uri + '/Commodity/getCommodityProperty',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取收货地址
        getReceiveAddress(data) {
            return apis({
                url: n_uri + '/Address/getUserAddress',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //新增收货地址
        addReceiveAddress(data) {
            return apis({
                url: n_uri + '/Address/saveUserAddress',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取省市区
        getRegion(data) {
            return apis({
                url: n_uri + '/Address/getAddressList',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //查询库存
        searchStock(data) {
            return apis({
                url: n_uri + '/Commodity/getRealStock/1',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取热门用户
        getHotUser(data) {
            return apis({
                url: o_uri + '/follow/getHotFocusUser',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取用户状态列表
        getUserPost(data) {
            return apis({
                url: o_uri + '/feed/userFeed',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        },
        //获取关注的人的状态
        getFocusPeopleFeed(data) {
            return apis({
                url: o_uri + '/feed/myFocusFeed',
                params: data.params,
                success: res => {
                    if (!data.success) return
                    data.success(res)
                }
            })
        }

    }
}


module.exports = api