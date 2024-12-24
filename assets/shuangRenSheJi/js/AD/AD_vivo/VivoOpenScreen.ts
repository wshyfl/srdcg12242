
const { ccclass, property } = cc._decorator;
/**开屏界面 */
@ccclass
export default class VivoOpenScreen extends cc.Component {

    /**当前界面节点 */
    @property({
        type: cc.Node,
        displayName: "当前界面节点"
    }) currentNode: cc.Node = null;
    /*遮罩 */
    @property({
        type: cc.Node,
        displayName: "遮罩"
    }) zheZhao: cc.Node = null;
    /*title */
    @property({
        type: cc.Label,
        displayName: "title"
    }) title: cc.Label = null;
    /*desc */
    @property({
        type: cc.Label,
        displayName: "desc"
    }) desc: cc.Label = null;
    /**icon */
    @property({
        type: cc.Node,
        displayName: "icon"
    }) icon: cc.Node = null;
    /**img */
    @property({
        type: cc.Node,
        displayName: "img"
    }) img: cc.Node = null;
    /**跳过文本 */
    @property({
        type: cc.Label,
        displayName: "跳过文本"
    }) jumpText: cc.Label = null;

    /**倒计时 */
    private countdownNum: number = 5;

    onLoad() {
        if (window["AD"].chanelName != window["AD"].chanelName1 || window["AD"].chanelName1 != "VIVO") {
            this.node.destroy();
        }
    }

    start() {
        var that = this;
        // cc.game.addPersistRootNode(that.node);
        // var screenHeight = cc.winSize.height;
        // this.node.y = screenHeight / 2;

        that.currentNode.active = false;
        that.zheZhao.active = true;

        //刷原生开屏广告
        var num = 0;
        var _funcGetShare = function () {
            num++;
            if (window["AD"].chanelName != window["AD"].chanelName1
                || num >= 20
                || window["AD"].nativeVivo.resultChaPing) {
                that.unschedule(_funcGetShare);
                that.init();//进行下一步
            } else {
                window["AD"].nativeVivo.initChaPing();
            }
        };
        that.schedule(_funcGetShare, 0.1);


    }
    onEnable() {
    }
    onDisable() {
    }
    onDestroy() {
      
    }
    /**初始化 */
    public init(): void {
        var that = this;
        if (window["AD"].wuDianRate <= 0) {
            //未获取开关 
            that.pageClose();
            // cc.director.emit("vivo小游戏开屏下一步");
            return;
        }
        if (!window["AD"].nativeVivo.resultChaPing) {
            //没有申请到数据
            that.pageClose();
            // cc.director.emit("vivo小游戏开屏下一步");
            return;
        }
        that.pageShow();

        //开始倒计时
        that.schedule(() => {
            that.countdownNum--;
            if (that.countdownNum < 0) {
                that.countdownNum = 0;
                
                that.pageClose();
            }
            that.jumpText.string = "跳过" + that.countdownNum;
        }, 1, 5, 1);
    }

    /**页面打开 */
    public pageShow(): void {
        this.currentNode.active = true;
        this.zheZhao.active = true;
        this.dataUpdate();
    }
    /**页面关闭 */
    public pageClose(): void {
        if (this.zheZhao.active == false) return;
        this.currentNode.active = false;
        this.zheZhao.active = false;
        this.node.destroy();
        cc.director.emit("vivo小游戏开屏下一步");
    }
    /**数据刷新 */
    public dataUpdate(): void {
        // return;
        var result = window["AD"].nativeVivo.resultChaPing;
        if (result != null) {
            this.currentNode.active = true;
            this.zheZhao.active = true;
            console.log("展示数据2")
            this.reportAdShow()
            this.title.string = result.title;
            this.desc.string = result.desc;

            //显示logo
            var remoteUrl = result.icon;
            var imgUrl = result.imgUrlList[0]
            var sprite = this.icon.getComponent(cc.Sprite)
            var imgspr = this.img.getComponent(cc.Sprite)
            if (remoteUrl != "") {
                this.icon.active = true;
                cc.loader.load(remoteUrl, (err, texture) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    var spriteFrame = new cc.SpriteFrame(texture);
                    sprite.spriteFrame = spriteFrame;
                });

            } else {
                this.icon.active = false;

            }

            //  else
            {
                var pngStr = ".png";
                var pngBoo = imgUrl.indexOf(pngStr) >= 0;
                var jpgStr = ".jpg";
                var jpbBoo = imgUrl.indexOf(jpgStr) >= 0;
                if (pngBoo || jpbBoo) {
                    var urlString = imgUrl.split("?");
                    cc.assetManager.loadRemote(urlString[0], function (err, texture: any) {
                        if (err) {
                            console.log(err);
                            return
                        }
                        var spriteFramelogo = new cc.SpriteFrame(texture);
                        imgspr.spriteFrame = spriteFramelogo;
                    });
                } else {
                    cc.assetManager.loadRemote(imgUrl, { ext: '.png' }, function (err, texture: any) {
                        if (err) {
                            console.log(err);
                            // return
                        } else {
                            var spriteFramelogo = new cc.SpriteFrame(texture);
                            imgspr.spriteFrame = spriteFramelogo;
                        }
                    });
                }
            }

        } else {
            this.currentNode.active = false;
            this.zheZhao.active = false;
        }
    }
    /**下载上报 */
    reportAdClick() {
        var self = this;
        var result = window["AD"].nativeVivo.resultChaPing;
        var nativeAd = window["AD"].nativeVivo.nativeChaPing;
        if (result != null) {
            nativeAd.reportAdClick({
                adId: result.adId.toString()
            });
        }
    }
    /**显示上报 */
    reportAdShow() {
        
        var self = this;
        var result = window["AD"].nativeVivo.resultChaPing;
        var nativeAd = window["AD"].nativeVivo.nativeChaPing;
        if (result != null) {
            nativeAd.reportAdShow({
                adId: result.adId.toString()
            });
            
        }
    }
    // update (dt) {}
    public touchHanler(e: cc.Event, name: string): void {
        switch (name) {
            case "点击":
                if (window["AD"].chanelName != window["AD"].chanelName1) return;
                if (!window["AD"].nativeVivo.resultChaPing) return;
                this.reportAdClick();
                this.pageClose();
                break;
            case "关闭":
                console.log("关闭插屏")
                this.pageClose();
                break;
        }

    }
}
