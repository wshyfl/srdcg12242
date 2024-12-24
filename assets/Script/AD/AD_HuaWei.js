


window.AD_HuaWei = {
    //**正式 */
    bannerID_ai: "k48558shm0",//矮benner 
    videoID: "g2gelymle5",//视频 //  
    yuanShengId: "c5zulz5lqs", //原生
    /**测试 */
    // bannerID_ai: "testw6vs28auh3",//矮benner 
    // videoID: "e7hm5vx799",//视频 //  
    // yuanShengId: "testu7m3hc4gvm", //原生

    phone: "null",

    videoBoo: false, //预加载是否成功
    videoNum: 0, //预加载次数

    bennerBoo: false, //benner开关

    reportBoo: false, //是否上报
    autoVideoBoo: false, //自动视频开关
    autoVideoNum: 0, //关卡通关次数
    chaPingViewBoo: false, //插屏界面当前是否展示
    bannerShowingBoo: false, //插屏界面当前是否展示
    rewardedVideoAdBoo: false,
    bennerViewBoo: false, //benner是否展示了
    isBanner: false,
    bannerAd: null,
    result: null,

    /**小程序启动参数*/
    getLaunchOptionsSync() {
        if (AD.chanelName != AD.chanelName1)
            return;
        // AD_HuaWei.chanPing();
    },
    /**插屏 */
    chaPing() {
        // if (AD.wuDianRate ==  0) return
        if (AD.chanelName != AD.chanelName1)
            return;
        console.log("显示插屏");
        // if (AD_HuaWei.chaPingViewBoo == true) return;
        AD_HuaWei.chaPingViewBoo = true;
        if (AD_HuaWei.bennerBoo == false) {
            AD_HuaWei.hideBanner();
        }
        AD_HuaWei.nativeAd = qg.createNativeAd({
            adUnitId: AD_HuaWei.yuanShengId, //正式
            success: (code) => {
                console.log("loadNativeAd loadNativeAd : success");
                AD_HuaWei.nativeAd.onError((e) => {
                    console.error('load ad error:' + JSON.stringify(e));
                    AD_HuaWei.nativeAd.offError();
                    AD_HuaWei.nativeAd.offLoad();
                    AD_HuaWei.chaPingViewBoo = false;
                })
                AD_HuaWei.nativeAd.load();
                AD_HuaWei.nativeAd.onLoad(function (res) {
                    console.log("ssss" + JSON.stringify(res) + "ssss");
                    if (res && res.adList) {
                        var data = res.adList;
                        var listData = JSON.stringify(data);// 转成JSON格式
                        var list = JSON.parse(listData);
                        AD_HuaWei.result = list[list.length - 1];
                        AD_HuaWei.reportBoo = false;

                        cc.director.emit("ChaPingShow");
                    }
                    AD_HuaWei.nativeAd.offError();
                    AD_HuaWei.nativeAd.offLoad();
                });

            },
            fail: (data, code) => {
                console.log("loadNativeAd loadNativeAd fail: " + data + "," + code);
            },
            complete: () => {
                console.log("loadNativeAd loadNativeAd : complete");
            }
        });
    },
    /**视频预加载 */
    yuShowVivoVideo() {
        if (AD.chanelName != AD.chanelName1)
            return;


        AD_HuaWei.rewardedVideoAd = qg.createRewardedVideoAd({

            adUnitId: AD_HuaWei.videoID,
            success: (code) => {
                console.log("AD demo : loadAndShowVideoAd createRewardedVideoAd: success");
                AD_HuaWei.rewardedVideoAd.load();
                AD_HuaWei.rewardedVideoAd.onLoad(() => {
                    console.log('AD --视频 加载成功')

                    if (!AD_HuaWei.videoBoo) {
                        AD_HuaWei.videoBoo = true;
                        // D_HuaWei.showVideo();
                        AD_HuaWei.rewardedVideoAd.show();
                    }
                });
                AD_HuaWei.rewardedVideoAd.onError((e) => {
                    console.error('load AD error + 加载失败:' + JSON.stringify(e));

                    AD_HuaWei.videoNum++;
                    if (AD_HuaWei.videoNum < 2 && AD_HuaWei.videoBoo == false) {
                        AD_HuaWei.rewardedVideoAd.load();
                    }
                    if (AD_HuaWei.videoNum >= 2 && AD_HuaWei.videoBoo == false) { //加载两次还是失败
                        AD.rootNode.timmerNow();
                    }
                });


                AD_HuaWei.rewardedVideoAd.onClose((res) => { //关闭监听
                    console.log("进入关闭监听。。。。。。。 " + res.isEnded);
                    AD_HuaWei.rewardedVideoAdBoo = false;
                    if (res.isEnded) {
                        console.log('AD --视频 播放完成，领取奖励');
                        AD.reward();

                    } else {
                        console.log('AD --视频 播放未完成，失败');

                    }
                    AD_HuaWei.rewardedVideoAd.load();
                })
            },
            fail: (data, code) => {
                console.log("AD demo : loadAndShowVideoAd createRewardedVideoAd fail: " + data + "," + code);
            },
            complete: () => {
                console.log("AD demo : loadAndShowVideoAd createRewardedVideoAd complete");
            }
        });
    },
    /**视频 
     * @method ： 成功方法
     * @method1 ：失败方法
     * @caller ：作用域
     * @data ：参数
     * */
    showVideo() {

        console.log("视频开关" + AD_HuaWei.rewardedVideoAdBoo);
        if (AD_HuaWei.rewardedVideoAdBoo) return;

        if (AD_HuaWei.videoBoo == true) {
            AD_HuaWei.rewardedVideoAd.show();
            AD_HuaWei.rewardedVideoAdBoo = true;
        } else {
            AD_HuaWei.yuShowVivoVideo();
            // qg.showToast({
            //     title: '暂无视频',
            //     icon: '',
            //     duration: 2000
            // })
        }



    },

    initBanner() {
        if (AD.chanelName != AD.chanelName1)
            return;
       
        //广告
        const {
            screenHeight,
            screenWidth,
            windowHeight,
            pixelRatio,
            safeArea,
        } = qg.getSystemInfoSync();


        console.log("进入banner初始化")
        AD_HuaWei.bannerAd = qg.createBannerAd({
            adUnitId: AD_HuaWei.bannerID_ai, //正式
            style: {
                // top:screenHeight / pixelRatio - 100,
                top: safeArea.height - 60,
                left: 0,
                height: 57,
                width: 360
            }
        })
        AD_HuaWei.bannerAd.onError(err => {
            console.log('bannerAd 广告加载出错', JSON.stringify(err));
            AD_HuaWei.bennerViewBoo = false;
            AD_HuaWei.bannerAd.offError();
        });
        AD_HuaWei.bannerAd.onLoad(() => {
            console.log("初始化banner调用show")
           
            AD_HuaWei.bannerAd.offLoad();
        });
        AD_HuaWei.bannerAd.onClose(() => {

            AD_HuaWei.bennerViewBoo = false;
            AD_HuaWei.bannerAd.offClose();

        });
    },
    /**显示banner */
    showBanner() {

        if (AD.chanelName != AD.chanelName1)
            return;
      
        if (AD_HuaWei.bennerViewBoo)
            return
        if (AD_HuaWei.chaPingViewBoo == true) return;

        if (AD_HuaWei.bannerAd == null){
            AD_HuaWei.initBanner();
            console.log("初始化banner")
            setTimeout(()=>{
                AD_HuaWei.bannerAd.show();
              
                AD_HuaWei.bennerViewBoo = true;
            },100)
        }
        else {
            console.log("banner 调用  show");
           
            AD_HuaWei.bannerAd.show();
            AD_HuaWei.bennerViewBoo = true;
        }
    },
    /**隐藏banner */
    hideBanner() {
        if (AD.chanelName != AD.chanelName1)
            return;
        if (AD_HuaWei.bennerViewBoo == true) {
            AD_HuaWei.bannerAd.hide();
            AD_HuaWei.bennerViewBoo = false;
            console.log("banner*************** 关闭");
        }
       
    },
    /**分享 */
    shareOver() {//
        if (AD.chanelName != AD.chanelName1)
            return;
    },
    /**添加到收藏 */
    addCollection() {
        if (AD.chanelName != AD.chanelName1)
            return;
    },
    /**添加到桌面 */
    addDesktop() {
        // if (globalData_taiQiu.showAddToDesk) return;
        // globalData_taiQiu.showAddToDesk = true;
        if (AD.chanelName != AD.chanelName1)
            return;
        qg.hasShortcutInstalled({
            success: function (ret) {
                console.log('hasInstalled success ret---' + ret);
                if (ret) {
                    // 桌面图标已创建    
                } else {
                    // 桌面图标未创建
                    qg.installShortcut({
                        message: '将快捷方式添加到桌面以便下次使用',
                        success: function (ret) {
                            console.log('handling createShortCut success');
                        },
                        fail: function (erromsg, errocode) {
                            console.log('handling createShortCut fail');
                        }.bind(this),
                    })
                }
            }.bind(this),
            fail: function (erromsg, errocode) {
                console.log('hasInstalled fail ret---' + erromsg);
            }.bind(this),
            complete: function () {
            }
        })
    },
    /**添加到小程序 */
    addShowFavoriteGuide() {

    },
    /**自定义事件 */
    TDEvent(_type, level) {
    },

}