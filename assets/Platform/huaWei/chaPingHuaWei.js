

cc.Class({
    extends: cc.Component,

    properties: {
        zheZhao:cc.Node,
        currentNode:cc.Node,
        title:cc.Label,
        source:cc.Label,
        desc:cc.Label,
        icon:cc.Node,
        img:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.currentNode.active = false;
        this.zheZhao.active = false;
        cc.game.addPersistRootNode(this.node);
        // this.node.group = "UI";
        this.node.zIndex = 10;
    },

    onEnable() {
        this.node.x = 640 + (cc.winSize.width - 1280) / 2;
        this.node.y = 360 + (cc.winSize.height - 720) / 2;
        // cc.director.on("ChaPingClose",this.pageClose,this); //关闭
        cc.director.on("ChaPingShow",this.pageShow,this); //显示
        cc.director.on("ChaPingShuaXin",this.dataUpdate,this); //刷新
        cc.director.on("chaPingReportAdShow",this.reportAdShow2,this); //返回游戏中 上报

        console.log("华为插屏  onEnable")
    },
    onDisable() {
        // cc.director.off("ChaPingClose",this.pageClose,this); //关闭
        cc.director.off("ChaPingShow",this.pageShow,this); //显示
        cc.director.off("ChaPingShuaXin",this.dataUpdate,this);
        cc.director.off("chaPingReportAdShow",this.reportAdShow2,this); //返回游戏中 上报
        console.log("华为插屏  onDisable")
    },
    start () {

    },
      /**页面打开 */
    pageShow() {
        // if(!AD_HuaWei.result) return;
        this.currentNode.active = true;
        this.zheZhao.active = true;
        this.currentNode.scale = 1;
        // this.currentNode.runAction(cc.scaleTo(0.2,1,1));
        this.dataUpdate();
    },
    /**页面关闭 */
    pageClose() {
        this.currentNode.active = false;
        this.zheZhao.active = false;
        AD_HuaWei.nativeAd.destroy();
        AD_HuaWei.chaPingViewBoo = false;
    },
    /**数据刷新 */
    dataUpdate() {
        if(this.currentNode.active == false) return;
        var result = AD_HuaWei.result;
        if(result != null){
            console.log("获取数据成功， 开始替换资源...........................");
            this.currentNode.active = true;
            this.zheZhao.active = true;
            console.log("展示数据2")
            this.reportAdShow()
            this.title.string = (result.title != undefined) ? result.title : "";
            this.source.string = (result.source != undefined) ? result.source : "";
            // this.desc.string = (result.desc != undefined) ? result.desc : "";
             //显示logo
             var remoteUrl = result.icon != undefined ? result.icon : "";
             var imgUrl =  result.imgUrlList[0]
             var sprite = this.icon.getComponent(cc.Sprite)
             var imgspr = this.img.getComponent(cc.Sprite)
             if(remoteUrl != "")
             {
                this.icon.active = true;
                cc.loader.load(remoteUrl, (err, texture) => {
                    if (err) {
                        console.log(err + "加载icon出错..........................................");
                        // return;
                    }else{
                        var spriteFrame = new cc.SpriteFrame(texture);
                        sprite.spriteFrame = spriteFrame;
                        console.log("成功ssssssssssssssssssss" )
                    }
                    
                });
   
             }else{
                this.icon.active = false;

             }

            //  else
             {
                console.log("开始加载图片" + imgUrl);
                cc.loader.load(imgUrl, (err, texture1) => {
                    if (err) {
                        console.log(err);
                        // return
                    }else{
                        var spriteFramelogo = new cc.SpriteFrame(texture1);
                        imgspr.spriteFrame = spriteFramelogo;
                    }
                    
                });
            }
            

         }else{
            this.currentNode.active = false;
            this.zheZhao.active = false;
         }
    },
    /**下载上报 */
    reportAdClick(){
        var self = this;
        var result = AD_HuaWei.result;
        var nativeAd = AD_HuaWei.nativeAd;
        if(result != null){
        nativeAd.reportAdClick({ 
                adId: result.adId.toString()
            });
        }
    },
    /**显示上报 */
    reportAdShow(){
        if(AD_HuaWei.reportBoo == true) return;
        var self = this;
        // if(self.currentNode.active == false) return;
        var result = AD_HuaWei.result;
        var nativeAd = AD_HuaWei.nativeAd;
        if(result != null){
            nativeAd.reportAdShow({ 
                adId: result.adId.toString() 
            });
            AD_HuaWei.reportBoo = true;
            console.log("上报成功");
        }
    },
    reportAdShow2(){
        if(AD_HuaWei.result == null) return;
        var self = this;
        if(self.currentNode.active == false) return;
        var result = AD_HuaWei.result;
        var nativeAd = AD_HuaWei.nativeAd;
        if(result != null){
            nativeAd.reportAdShow({ 
                adId: result.adId.toString() 
            });
            AD_HuaWei.reportBoo = true;
            console.log("上报成功");
        }
    },
    btnCallBack(event,type){
        switch(type){
            case "点击下载":                
                this.reportAdClick();
                this.pageClose();
                break;
            case "关闭插屏":
                console.log("关闭插屏") 
                if(AD.couldZDJ()){
                    this.reportAdClick();
                }
                this.pageClose();
                break;
        }
    }

    // update (dt) {},
});
