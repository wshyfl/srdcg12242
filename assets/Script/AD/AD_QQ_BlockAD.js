
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    },

    start () {
        if (AD.chanelName != AD.chanelName1) return;
        if(AD.chanelName1 != "QQ")return;
        AD_QQ.blockADQQShow();
        this.secondQQ = 0;
        this.schedule(function () {
            this.secondQQ++;
            if (this.secondQQ > 5) {
                if (this.secondQQ % 15 == 7) {
                    AD_QQ.blockADQQHide();
                }
                else if (this.secondQQ % 15 == 9) {
                    AD_QQ.blockADQQShow();
                }
            }

            // var _sceneName = cc.director.getScene().name;
            // if (_sceneName == "gameScene")
            //     AD_QQ.blockADQQHide();
        }, 1)
    },

    // update (dt) {},
});
