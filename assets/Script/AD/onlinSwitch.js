
var LabelUtils2 = require("LabelUtils2");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        AD.intAD()
        if (AD.chanelName == AD.chanelName1){
            if (AD.chanelName1 == "TT") {
                this.schedule(function(){
                    AD_TT.showFavoriteGuide()
                },20)
            }
           
        }

        if (AD.chanelName == AD.chanelName1 && AD.getOnlineSwitch) {
            if (AD.chanelName1 == "UC") return
            if (AD.chanelName1 == "BD")
                AD.btnCloseBig = true;
            this.getSwitchKey();
            LabelUtils2.getInstance().initLabel(this.key);
            var _funcGetShare = function () {
                //关闭按钮 概率
                var _close = LabelUtils2.getInstance().getLabel(this.switch)//
                if (_close == true) {
                    AD.wuDianRate = 10;//点击关闭也是看公告的概率  概率 x%
                    AD.wuDianRateChaPing = 5;//插屏自点击概率---vivo oppo原生广告
                    AD.delayTime = 3;//按钮延时
                    AD.btnCloseBig = false;
                    AD.chaPingOppo=true;
                    if (AD.chanelName1 == "oppo"){
                        AD_oppo.switchOn()
                        AD_oppo.secondOnlineOppo = 60;
                        AD_oppo.showMoreGameOppo = true;
                    }
                    this.unschedule(_funcGetShare);
                }
                console.log("开关是  " + _close)
            };
            this.schedule(_funcGetShare, 0.05, 40, 1)
            this.schedule(_funcGetShare, 5);
           
        }


    },
    
    start() {
        var onlineUnlockMode = function(){
            if(globalData.data.onLineTime[0]>=0){
                globalData.data.onLineTime[0]--;
                cc.director.emit("在线时长解锁模式",4)
            }
            
            if(globalData.data.onLineTime[1]>0){
                globalData.data.onLineTime[1]--;
                cc.director.emit("在线时长解锁模式",5)
            }
            else{
                this.unschedule(onlineUnlockMode)
            }
            globalData.saveData()
        }
        if(globalData.data.onLineTime[1]>0){
            this.schedule(onlineUnlockMode,1);
        }
    },
    
    getSwitchKey() {
        switch (AD.chanelName1) {
            case "BD":  //百度 1.0.0.0
                this.key = "srdcg_sryxhjbd_100_baidu_xyx_20211222";
                this.switch = "switch";
                break;
            case "TT":  //头条 1.0.0
                this.key = "srdcg_srdcgtt_100_toutiao_xyx_20210903";
                this.switch = "switch";
                break;
            case "oppo":  //oppo 1.0.0 
                this.key = "srdcg_srdcgoppo_100_oppo_xyx_20221026";
                this.switch = "switch";
                break;
            case "QQ":  //QQ 1.0.0
                this.key = "srdcg_srdcgqq_100_qq_xyx_20210903";
                this.switch = "switch";
                break;
            case "WX":  //WX 1.0.0 
                this.key = "srdzz_srdzzwx_100_weixin_xyx_20210128";
                this.switch = "switch";
                break;
            case "VIVO":  //VIVO 1.0.0 
                this.key = "srdcg_srdcgvivo_100_vivo_xyx_20210903";
                this.switch = "switch";
                break;
            case "HW":  //VIVO 1.0.0 
                this.key = "srdcg_sryxhjhw_100_other_xyx_20220321";
                this.switch = "switch";
                break;
        }





    },
    // update (dt) {},
});
