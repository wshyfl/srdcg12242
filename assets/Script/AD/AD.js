window.AD = {
    chanelName: "oppo", 
    chanelName1: "oppo",//QQ UC TT VIVO oppo BD WX HW
    delayTime: 0,
    wuDianRate: 0,
    wuDianRateChaPing: 0,
    btnCloseBig: 0,
    showShareViewAuto: false,//自动弹出分享二级框?
    getOnlineSwitch: true,//UC false---是否连接服务器 获取开关
    btnShareActive: true,//分享按钮是否显示
    luPingIsOver: false,
    chaPingOppo:false,
    couldZDJ() {
        if (Tools.random(1, 100) < AD.wuDianRate)
            return true;
        return false;
    },
    couldZJDChaPing() {
        if (Tools.random(1, 100) < AD.wuDianRateChaPing)
            return true;
        return false;
    },
    intAD() {
        
        if (AD.chanelName != AD.chanelName1) return
        switch (AD.chanelName1) {
            case "QQ":
                AD_QQ.initQQ();
                AD.btnCloseBig = false;
                AD.delayTime = 3;
                break;
            case "WX":
                AD_WX.initWX();
                AD.btnCloseBig = false;
                AD.delayTime = 3;
                break;
            case "UC":
                AD_UC.initUC();
                AD.btnCloseBig = false;
                AD.delayTime = 3;
                AD.getOnlineSwitch = false;
                break;
            case "TT":
                AD_TT.initTT();
                AD.showShareViewAuto = true;//自动弹窗
                AD.btnCloseBig = false;
                AD.delayTime = 3;
                break;
            case "oppo":
    
                AD.btnCloseBig = true;
                AD.btnShareActive = false;
                break;
            case "BD":
                AD_BD.initBD();
                AD.btnCloseBig = false;
                AD.delayTime = 3;
                break;
            case "VIVO":
                AD.btnShareActive = false;
                break;
            case "KS":
                kwaigame.readyGo()
                break;
            case "HW":
                AD.btnShareActive = false;
                AD_HuaWei.getLaunchOptionsSync()
                break;
        }
    },
    showAD(adType) {

        AD.adType = adType;
        if (AD.chanelName == AD.chanelName1)
            AD.showVideo();
        else
            AD.reward();
    },

    reward() {
        var adType = AD.adType;
        console.log("视屏奖励是 " + adType);
        switch (adType) {
            case "解锁模式":
                AD.Menu.onUnlockModuleCallBack();
                break
            case "蓝色解锁模式":
                AD.game.onBlueUnLockModeCallBack();
                break
            case "红色解锁模式":
                AD.game.onRedUnLockModeCallBack();
                break
        }
    },
    showVideo() {
        switch (AD.chanelName1) {
            case "QQ":
                AD_QQ.showVideo();
                break;
            case "WX":
                AD_WX.showVideo();
                break;
            case "UC":
                AD_UC.showVideo();
                break;
            case "TT":
                AD_TT.showVideo();
                break;
            case "oppo":
                AD_oppo.shiPin();
                break;
            case "VIVO":
                AD_VIVO.showVideo();
                break;
            case "BD":
                AD_BD.showVideo();
                break;
            case "Kwai":
                AD_KS.showVideo();
                break;
            case "HW":
                AD_HuaWei.showVideo();
                break;
        }
    },
    chaPing() {
        if (AD.chanelName != AD.chanelName1) return
        switch (AD.chanelName1) {
            case "QQ":
                AD_QQ.chaPing();
                break;
            case "WX":
                AD_WX.chaPing();
                break;
            case "UC":
                AD_UC.chaPing();
                break;
            case "TT":
                AD_TT.chaPing();
                break;
            case "oppo":
                AD_oppo.chaPing();
                break;
            case "VIVO":
                AD_VIVO.chaPing();
                break;
            case "HW":
                AD_HuaWei.chaPing();
                break;
        }
    },
    hideChaPing() {
        switch (AD.chanelName1) {
            case "oppo":
                
                break;
            case "VIVO":
                AD_VIVO.hideChaPing();
                break;
        }
    },
    showBanner() {
        console.log("banner 展示")
        if (AD.chanelName != AD.chanelName1) return
        switch (AD.chanelName1) {
            case "QQ":
                AD_QQ.showBanner();
                break;
            case "WX":
                AD_WX.showBanner();
                break;
            case "UC":
                AD_UC.showBanner();
                break;
            case "TT":
                if (AD.wuDianRate > 0)
                    AD_TT.showBanner();
                break;
            case "oppo":
                AD_oppo.showBanner();
                break;
            case "VIVO":
                AD_VIVO.showBanner();
                break;
            case "BD":
                AD_BD.showBanner();
                break;
            case "HW":
                // if (AD.wuDianRate > 0)
                    AD_HuaWei.showBanner();
                break;
        }
    },
    hideBanner() {
        if (AD.chanelName != AD.chanelName1) return
        switch (AD.chanelName1) {
            case "QQ":
                AD_QQ.hideBanner();
                break;
            case "WX":
                AD_WX.hideBanner();
                break;
            case "UC":
                AD_UC.hideBanner();
                break;
            case "TT":
                AD_TT.hideBanner();
                break;
            case "oppo":
                AD_oppo.hideBanner();
                break;
            case "VIVO":
                AD_VIVO.hideBanner();
                break;
            case "BD":
                AD_BD.hideBanner();
                break;
            case "HW":
                // AD_HuaWei.hideBanner();
                break;
        }
    },
    overNum: 0,
    overQQNum :0,
    /**游戏结束(添加到桌面,安卓全屏视频) */
    GameOver() {
        if (AD.chanelName != AD.chanelName1) return;
        AD.overNum++
        switch (AD.chanelName1) {
            case "QQ":
                if (this.overQQNum % 5 == 0)
                    AD_QQ.saveToDesktopQQ();
                if (this.overQQNum % 2 == 0) {
                    if (AD.wuDianRate > 0)
                        AD.showAD("");
                }
                break;
            case "UC":
                break;
            case "BD":
                if(AD.wuDianRate<=0) return
                if (this.overNum % 2 == 0)
                    AD.showAD("")
                break;
            case "oppo":
        
                break;
            case "VIVO":
                if (AD.wuDianRate == 0) return
                if (this.overNum % 5 == 0)
                    AD_VIVO.saveToDesktopVivo();
                break;
            case "HW":
                if (globalData.data.canSaveDesk) {
                    globalData.data.canSaveDesk = false
                    AD_HuaWei.addDesktop();
                }
                if (this.overNum % 2 == 0)
                    AD_HuaWei.chaPingVideo();
                break;
        }
    },
    share() {
        switch (AD.chanelName1) {
            case "QQ":
                AD_QQ.share("");
                break;
            case "WX":
                AD_WX.shareAndCallback("");
                break;
            case "UC":
                AD_UC.share();
                break;
            case "TT":
                AD_TT.share();
                break;
            case "BD":
                AD_BD.share();
                break;
        }
    },
    luPingBegin() {
        AD.luPingIsOver = false
        switch (AD.chanelName1) {
            case "TT":
                AD_TT.luPingStart();
                break;
            case "Kwai":
                AD_KS.luPingBegin();
                break;
        }
    },
    lupingOver() {//头条录屏结束
        if(AD.luPingIsOver) return
        AD.luPingIsOver = true;
        switch (AD.chanelName1) {
            case "TT":
                AD_TT.luPingEnd();
                break;
            case "Kwai":
                AD_KS.lupingOver();
                break;
        }
    },
    luPingShare() {
        switch (AD.chanelName1) {
            case "Kwai":
                AD_KS.luPingShare();
                break;
            case "TT":
                console.log("调用头条录屏分享")
                AD_TT.luPingShare();
                break;
        }

    },
    //是否是长屏手机
    isBigScreen() {
        console.log("是长屏吗  " + (cc.winSize.width / cc.winSize.height))
        if (AD.height / AD.width > 1.8) {
            return true;
        }
        return false;
    },
    stopAudioAll() {
        cc.audioEngine.pauseMusic()

    },
    playAudioAll() {
        cc.audioEngine.resumeMusic()
    },
    vibrateLong() {
        return
        if (AD.chanelName != AD.chanelName1) return
        switch (AD.chanelName1) {
            case "VIVO":
                qg.vibrateLong({
                    success(res) {
                        console.log(res);
                    },
                    fail(res) {
                        console.log(`vibrateLong调用失败`);
                    },
                });
                break;
            case "TT":
                AD_TT.vibrateLong();
                break;
            case "oppo":
                AD_oppo.vibrateLong();
                break;
        }
        
    },
    vibrateShort() {
        return
        if (AD.chanelName != AD.chanelName1) return
        switch (AD.chanelName1) {
            case "VIVO":
                qg.vibrateShort({
                    success(res) {
                        console.log(res);
                    },
                    fail(res) {
                        console.log(`vibrateShort调用失败`);
                    },
                });
                break;
            case "TT":
                AD_TT.vibrateShort();
                break;
            case "oppo":
                AD_oppo.vibrateShort();
                break;
        }
        
    },
}
