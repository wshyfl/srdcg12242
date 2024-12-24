

cc.Class({
    extends: cc.Component,

    properties: {
        coinPre: cc.Node,
    },

    onLoad() {
        AD.jczxt = this;
        this.redControl = cc.find("Control/redControl", this.node);
        this.blueControl = cc.find("Control/blueControl", this.node);
        this.coinPanel = cc.find("coinPanel", this.node);
        this.police = cc.find("police", this.node);
        this.thief = cc.find("thief", this.node);
        this.redIdentity = "";
        this.thiefCoin = 0;
        this.coinPosArray = [cc.v2(0, 0), cc.v2(200, -120), cc.v2(-220, 500), cc.v2(255, 260), cc.v2(220, -500), cc.v2(-200, 0),];
        this.redPos = cc.v2(-200, -600);
        this.bluePos = cc.v2(250, 500)
        this.GameStart = false;
        this.onInitControl();
    },

    start() {

        cc.director.on("游戏开始", this.onGameStart, this);
        
        if (AD.isAI){
            this.AiTime = 0;
            this.blueControl.active = false;
            cc.find("Control/blueJoystickBg", this.node).active = false;
        }

    },

    update(dt) {
        
    },
    onInitControl() {
        this.redControl.y = -AD.height / 4;
        this.redControl.height = AD.height / 2;

        this.blueControl.y = AD.height / 4;
        this.blueControl.height = AD.height / 2;

        // var identityRed = cc.find("identityRed", this.node);
        // var identityBlue = cc.find("identityBlue", this.node);
        var r = Math.random();
        if (r < 0.5) {
            this.redIdentity = "警察"
            // identityRed.getComponent(cc.Label).string = "警察";
            cc.director.emit("红方身份", "警察")
            this.police.position = this.redPos;

            // identityBlue.getComponent(cc.Label).string = "小偷"
            cc.director.emit("蓝方身份", "小偷")
            this.thief.position = this.bluePos;

        }
        else {
            this.redIdentity = "小偷"
            // identityRed.getComponent(cc.Label).string = "小偷"
            cc.director.emit("红方身份", "小偷")
            this.thief.position = this.redPos;
            // identityBlue.getComponent(cc.Label).string = "警察"
            cc.director.emit("蓝方身份", "警察")
            this.police.position = this.bluePos;
            // this.police.scaleY=-1
        }

    },
    onGameStart() {
        this.GameStart = true;
        this.onCreatCoin();
        if(AD.isAI){
            if(this.redIdentity == "警察"){
                this.thief.getChildByName("img").getChildByName("img").getComponent(sp.Skeleton).setAnimation(0,"pao",true)
            }
            else{
                this.police.getChildByName("img").getChildByName("img").getComponent(sp.Skeleton).setAnimation(0,"pao",true)
            }
        }
    },
    onCreatCoin() {
        console.log("shengcheng")
        var coin = cc.instantiate(this.coinPre);
        coin.parent = this.node.getChildByName("coinPanel");
        coin.active = true;
        coin.position = this.getCoinPosition();
        

    },
    onAddCoin(){
        if(this.redIdentity == "警察"){
            cc.find("blueScore",this.node).getComponent(cc.Label).string = this.thiefCoin;
        }
        else{
            cc.find("redScore",this.node).getComponent(cc.Label).string = this.thiefCoin;
        }
    },
    onGameOver(str) {
        AD.sound.playSfx("停止发抖");
        if (str == "警察") {
            if (this.redIdentity == "警察") {
                AD.Game.overGame("红色")
                cc.find("redScore",this.node).getComponent(cc.Label).string = 1;
            }
            else {
                AD.Game.overGame("蓝色")
                cc.find("blueScore",this.node).getComponent(cc.Label).string = 1;
            }
        }
        else {
            if (this.redIdentity == "警察") {
                AD.Game.overGame("蓝色")
            }
            else {
                console.log("红色胜利")
                AD.Game.overGame("红色")
            }
        }

    },
    getCoinPosition(){
        for(var i=0;i<this.coinPosArray.length;i++){
            if(Tools.getDistance(this.thief,this.coinPosArray[i])>300){
                return this.coinPosArray[i]
            }
        }
        
    }
});
