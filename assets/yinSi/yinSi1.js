

cc.Class({
    extends: cc.Component,

    properties: {
        zhuTi: "",
        gameName: "",
    },

    onLoad() {
      
        cc.find("yinSi_2/New ScrollView/view/content/zhuTi", this.node).getComponent(cc.Label).string = "主体:" + this.zhuTi;
        cc.find("yinSi_2/New ScrollView/view/content/gameName", this.node).getComponent(cc.Label).string = "游戏名称:《" + this.gameName + "》";
        if (AD.chanelName1 == "QQ") {
            cc.find("yinSi_2/New ScrollView/view/content/youXiang", this.node).active = true;
            cc.find("yinSi_2/New ScrollView/view/content/diZhi", this.node).active = true;
        }
        else if (AD.chanelName1 == "HW") {
            cc.find("yinSi_2/New ScrollView/view/content/youXiang", this.node).active = false;
            cc.find("yinSi_2/New ScrollView/view/content/QQ", this.node).active = false;
        }
        switch (this.zhuTi) {
            case "天艺互娱（北京）网络科技有限公司":
                cc.find("yinSi_2/New ScrollView/view/content/diZhi", this.node).getComponent(cc.Label).string = "地址：北京市密云区密云镇鼓楼南大街兴旺市场东侧商铺楼1至4层（443室）";
                break
            case "石家庄木偶人网络科技有限公司":
                cc.find("yinSi_2/New ScrollView/view/content/diZhi", this.node).getComponent(cc.Label).string = "地址：河北省石家庄市高新区长江大道9号筑业高新国际A11F";
                break
            case "河南玖神网络科技有限公司":
                cc.find("yinSi_2/New ScrollView/view/content/diZhi", this.node).getComponent(cc.Label).string = "地址：河南省安阳市高新区弦歌大道西段科创大厦1楼创客空间105-12";
                break
        }

    },
    start() {

    },
    onEnable() {

        if (cc.sys.localStorage.getItem(AD.yinSiChannel) == "true") {
            cc.find("yinSi_1/backBtn", this.node).active = true;
            cc.find("yinSi_1/agreeBtn", this.node).active = false;
            cc.find("yinSi_1/noAgreeBtn", this.node).active = false;
        }
    },

    // update (dt) {},
    onBtnCallBack(e, t) {
        switch (t) {
            case "同意":
                if (cc.sys.localStorage.getItem(AD.yinSiChannel) == "false") {
                    if (AD.chanelName1 == "vivoApk" || AD.chanelName1 == "miApk"|| AD.chanelName1 == "oppoApk") {
                        AD_Apk.checkPermission();
                    }
                }
                cc.director.emit("同意隐私");
                cc.sys.localStorage.setItem(AD.yinSiChannel, "true");
                console.log(cc.sys.localStorage.getItem(AD.yinSiChannel))
                globalData.saveData()
                break

            case "展开隐私政策":
                cc.find("yinSi_1", this.node).active = false;
                cc.find("yinSi_2", this.node).active = true;
                break
            case "展开用户协议":
                cc.find("yinSi_1", this.node).active = false;
                cc.find("yinSi_3", this.node).active = true;
                break
            case "关闭隐私":
                cc.find("yinSi_1", this.node).active = true;
                cc.find("yinSi_2", this.node).active = false;
                cc.find("yinSi_3", this.node).active = false;
                break
            case "退出隐私":
                this.node.active = false;
                break
            case "不同意":
                if (AD.chanelName1 == "VIVO") {
                    qg.exitApplication()
                }
                else if (AD.chanelName1 == "QQ") {
                    qq.exitMiniProgram();
                }
                else {
                    cc.game.end();
                }
                break
        }
    },

});
