

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        AD.HuaWeiLoading = this;
        cc.find("Canvas/load").active = false; cc.find("Canvas/load").scale = 0;
        globalData.getDataAll();
        if (globalData.data.nowDay == undefined) {
            globalData.data.nowDay = Tools.getDate("month") + Tools.getDate("day") / 100;
            globalData.data.canSaveDesk = true;
            globalData.data.chaPingNum = 0;
        }
        else {
            if (globalData.data.nowDay == Tools.getDate("month") + Tools.getDate("day") / 100) {
            }
            else {
                globalData.data.chaPingNum = 0;
                globalData.data.canSaveDesk = true;
                globalData.data.nowDay = Tools.getDate("month") + Tools.getDate("day") / 100;
            }
        }
        globalData.saveData()
        // if (globalData.data.hadShowHuaWei == undefined) {
        //     this.scheduleOnce(function () {
        //         cc.find("Canvas/load").active = true;cc.find("Canvas/load").scale=0;
        //         cc.tween(cc.find("Canvas/load"))
        //         .to(0.2,{scale:1})
        //         .start();
        //     }, 3);
        // }
        // else {
        //     this.scheduleOnce(function () {
        //         cc.director.loadScene("Loading");
        //     }, 3);
        // }
    },

    start() {
        this.HuaWeiLogin()
    },
    chaPingDownTime() {
        this.scheduleOnce(function () {
            AD_HuaWei.canChaPing = true
        }, 20)
    },
    HuaWeiLogin() {
        var self = this;
        if (AD.chanelName1 == "HW") {
            console.log("调用登录-----")
            qg.gameLogin({
                forceLogin: 1,
                appid: "105777721",
                success: function (data) {
                    console.log("Game login success:" + data);
                    cc.director.loadScene("Loading")

                },
                fail: function (data, code) {
                    console.log("game login with real fail:" + data + ", code:" + code);
                    cc.find("Canvas/loginView").active = true;
                }
            });
        }
    },
    btnCallBack(event, type) {
        switch (type) {
            case "同意":
                globalData.data.hadShowHuaWei = true;
                globalData.saveData();
                cc.director.loadScene("Loading");
                break;
            case "不同意":
                cc.game.end();
                break;
            case "登录":
                this.HuaWeiLogin();
                break;
        }
    }
    // update (dt) {},
});
