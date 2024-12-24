

cc.Class({
    extends: cc.Component,

    properties: {
        yunShiAry: [cc.Node],
    },

    onLoad() {
        AD.ccysd = this;
        this.UFO = cc.find("UFO", this.node);
        this.yunShiPanel = cc.find("yunShiPanel", this.node);
        this.redScore = cc.find("redScore",this.node);
        this.blueScore = cc.find("blueScore",this.node);
        this.redBtn = cc.find("Btns/redBtn", this.node);
        this.blueBtn = cc.find("Btns/blueBtn", this.node);
        this.bgs = cc.find("bg",this.node).children;
        this.Speed = 0;
        this.Score = 0;
        this.bgSpeed = 0;
    },

    start() {
        this.onBtnsEventListen();
        cc.director.on("游戏开始", this.onGameStart, this);

        cc.director.on("游戏结束", this.onGameOver, this);
    },

    update(dt) {
        this.onUFOMove();
        this.onBgMove()
    },
    /**游戏开始 */
    onGameStart() {
        this.bgSpeed = 2;
        this.num = 1.1;
        this.Speed = 3;
        this.wave = 4;
        this.schedule(this.onCreatYunShi, (this.wave / this.num))
        this.schedule(function () {
            if(AD.Game.GameOver) return
            if(this.Speed >= 10) return
            this.num += 0.3;
            this.Speed += 1
            this.unschedule(this.onCreatYunShi, this)
            this.schedule(this.onCreatYunShi, (this.wave / this.num))
        }, 10)
    },
    /**按钮监听 */
    onBtnsEventListen() {
        this.isRight = false;
        this.isLeft = false;
        this.redBtn.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮")
            this.isRight = true;
            this.isLeft = false;
        }, this);
        this.redBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.isRight = false;
        }, this);
        this.redBtn.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isRight = false;
        }, this);
        //------------//
        this.blueBtn.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮")
            this.isRight = false;
            this.isLeft = true;
        }, this);
        this.blueBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.isLeft = false;
        }, this);
        this.blueBtn.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isLeft = false;
        }, this);
    },
    /**UFO移动 */
    onUFOMove() {
        if(AD.Game.GameOver) return
        if (this.isRight) {
            this.UFO.x += 3;
            if (this.UFO.x >= AD.width / 2) {
                this.UFO.x = AD.width / 2
            }

        }
        if (this.isLeft) {
            this.UFO.x -= 3;
            if (this.UFO.x <= -AD.width / 2) {
                this.UFO.x = -AD.width / 2
            }
        }
    },
    /**创建陨石 */
    onCreatYunShi() {
        if(AD.Game.GameOver) return
        var r = Tools.random(0, this.yunShiAry.length - 1)
        var ys = cc.instantiate(this.yunShiAry[r]);
        ys.parent = this.yunShiPanel;
        ys.active = true;
        ys.y = AD.height / 2 + 100;
        // ys.getComponent("yunShi_ccysd").Speed = this.Speed;
    },
    onBgMove(){
        if (AD.Game.GameOver) return
       
        for(var i=0;i<this.bgs.length;i++){
            this.bgs[i].y-=this.bgSpeed;
            if(this.bgs[i].y<-1590){
                
                this.bgs[i].y =this.bgs[(i+2)%3].y+1590; 
            }
        }
    },
    /**游戏结束 */
    onGameOver(){
        AD.Game.overGame("失败");
        console.log("游戏结束")
    },
    /**游戏胜利 */
    onGameWin(){
        this.Score++;
        this.UFO.getChildByName("eatCoinEff").active = true;
        this.UFO.getChildByName("eatCoinEff").getChildByName("New Node").getComponent(cc.Animation).play("effect_chiJinBi",0);
        this.redScore.getComponent(cc.Label).string = this.Score;
        this.blueScore.getComponent(cc.Label).string = this.Score;
        if(this.Score>=15){
            AD.Game.overGame("胜利");
            console.log("游戏结束")
        }
        
    },
});
