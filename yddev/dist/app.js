"use strict";import api from"./utils/api.js";import tools from"./utils/tools.js";import animation from"./utils/animations.js";const qnSDK=require("./static/vonder/qiniuUploader.js");function initQiqiu(i){let t={uptoken:i,uploadURL:"https://up-z2.qbox.me",region:"SCN"};qnSDK.init(t)}App({onLaunch(){wx.getSetting({success:i=>{i.authSetting["scope.userInfo"]&&wx.getStorageSync("u_id")?wx.reLaunch({url:"/pages/index/index"}):wx.reLaunch({url:"/pages/login/login"})}})},upload2Qiniu:initQiqiu,qiniuSdk:qnSDK,request:api(),tools:tools,animation:animation});