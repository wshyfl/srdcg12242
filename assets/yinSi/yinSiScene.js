cc.Class({
    extends: cc.Component,

    properties: {
        yinSiView: cc.Node,
    },

    onLoad() {
        AD.yinSiChannel = "yinSi" + "srhdsc" + AD.chanelName1;
        // cc.sys.localStorage.removeItem(AD.yinSiChannel);
        this.yinSiView.active = true;
        if (cc.sys.localStorage.getItem(AD.yinSiChannel) == undefined) {
            cc.sys.localStorage.setItem(AD.yinSiChannel, "false");
        }
        else if (cc.sys.localStorage.getItem(AD.yinSiChannel) == "false") {
            this.yinSiView.active = true;
        }
        if (cc.sys.localStorage.getItem(AD.yinSiChannel) == "true") {
            if (AD.chanelName1 == "vivoApk" || AD.chanelName1 == "miApk" || AD.chanelName1 == "oppoApk") {
                AD_Apk.checkPermission();
            }
            this.yinSiView.active = false;
        }


    },

    start() {

        cc.director.on("同意隐私", () => {
            this.yinSiView.active = false;
        })
    },

    // update (dt) {},
});
