

cc.Class({
    extends: cc.Component,

    properties: {
        coinPre:[cc.Node],
        coinImgs:[cc.SpriteFrame],
        tip:[cc.Node],
    },

    onLoad () {
        AD.ctjjj=this;
        this.coinPanel = cc.find("coinPanel",this.node);
        this.bluePlayer = cc.find("bluePlayer",this.node);
        for(var i=0;i<10;i++){
            this.onCreatCoin()
        }
        this.redScore = 0;
        this.blueScore = 0;
        this.GameStart = false;
    },

    start () {
        if (AD.isAI) {
            cc.find("Control/blueControl", this.node).active = false;
            cc.find("Control/blueJoystickBg", this.node).active = false;
        }
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update (dt) {

    },
    onGameStart(){
        this.GameStart = true;
        if (AD.isAI) {
            this.bluePlayer.getChildByName("player").getComponent("Player_ctjjj").onPlayerMove("走");
        }
        var time = 30;

        var downTime = function(){
            time--;
            cc.find("redTime",this.node).getComponent(cc.Label).string = time;
            cc.find("blueTime",this.node).getComponent(cc.Label).string = time;
            if(time<=0){
                this.unschedule(downTime);
                this.onGameOver()
            }
        }
        this.schedule(downTime,1)
    },
    onCreatCoin(){
        var r = Math.random();
        var coin = null;
        if(r<0.1){
            coin = cc.instantiate(this.coinPre[1]);
            coin.type = "炸弹";
        }
        else if(r>=0.1&&r<0.2){
            coin = cc.instantiate(this.coinPre[0]);
            coin.getComponent(cc.Sprite).spriteFrame = this.coinImgs[0];
            coin.type = "金币";

        }
        else{
            coin = cc.instantiate(this.coinPre[0]);
            coin.getComponent(cc.Sprite).spriteFrame = this.coinImgs[1];
            coin.type = "银币";
        }
        coin.active = true;
        coin.parent = this.coinPanel;
        coin.position = cc.v2(Tools.random(-260,260),Tools.random(-140,140))

    },
    /**更新金币 */
    onUpdataCoin(){
        if(this.coinPanel.children.length<=5){
            for(var i=0;i<5;i++){
                this.onCreatCoin();
            }
        }
    },
    onAddScore(player,coin){
        AD.sound.playSfx("得金币");
        if(player == "红"){
            this.redScore+=coin;
            cc.find("redScore",this.node).getComponent(cc.Label).string = this.redScore;
        }
        else{
            this.blueScore+=coin;
            cc.find("blueScore",this.node).getComponent(cc.Label).string = this.blueScore;
        }

    },
    onGameOver(){
        if(this.redScore>this.blueScore){
            AD.Game.overGame("红色");
        }
        else if(this.redScore<this.blueScore){
            AD.Game.overGame("蓝色");
        }
        else{
            AD.Game.overGame("胜利");
        }
    },
});
