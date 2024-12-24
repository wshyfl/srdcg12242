

cc.Class({
    extends: cc.Component,

    properties: {
        coinPre: cc.Node,
        handPre: cc.Node,
        coinImgs:[cc.SpriteFrame],
        handImgs:[cc.SpriteFrame],
        handXianImgs:[cc.SpriteFrame],
        tip:[cc.Node],
    },

    onLoad() {
        AD.qswd = this;
        this.coinPanel = cc.find("coinPanel", this.node);
        this.redQianDai = cc.find("redQianDai", this.node);
        this.blueQianDai = cc.find("blueQianDai", this.node);
        this.redScore = 0;
        this.blueScore = 0;
    },

    start() {
        cc.director.on("游戏开始", this.onGameStart, this);
        cc.director.on("进钱袋",this.onEnterInto,this)
        
    },

    update(dt) {

    },
    /**游戏开始 */
    onGameStart() {
        this.schedule(this.onCreatCoin,1,1)
    },
    /**生成金币 钞票 */
    onCreatCoin() {
        var coin = cc.instantiate(this.coinPre);
        coin.parent = this.coinPanel;
        coin.active = true;
        coin.position=cc.v2(Tools.random(-250,250),Tools.random(-20,20));
    },
    onEnterInto(e,e2){
        
        if(e == "蓝色"){
            AD.sound.playSfx("得金币");
            if(e2 == "纸币"){
                this.blueScore+=3;
                this.onTip("blue","+3")
            }
            else{
                this.blueScore++;
                this.onTip("blue","+1")
            }
            this.node.getChildByName("blueScore").getComponent(cc.Label).string = this.blueScore;
            if(this.blueScore>=15){
                this.onGameOver("蓝色")
            }
            cc.tween(this.blueQianDai)
            .to(0.2,{scaleX:1.2,scaleY:0.8},{easing:"quadOut"})
            .to(0.4,{scaleX:0.8,scaleY:1.2},{easing:"quadIn"})
            .to(0.2,{scaleX:1,scaleY:1},{easing:"quadOut"})
            .start()
        }
        else  if(e == "红色"){
            AD.sound.playSfx("得金币");
            if(e2 == "纸币"){
                this.redScore+=3;
                this.onTip("red","+3")
            }
            else{
                this.redScore++;
                this.onTip("red","+1")
            }
            this.node.getChildByName("redScore").getComponent(cc.Label).string = this.redScore;
            if(this.redScore>=15){
                this.onGameOver("红色")
            }
            cc.tween(this.redQianDai)
            .to(0.2,{scaleX:1.2,scaleY:0.8},{easing:"quadOut"})
            .to(0.4,{scaleX:0.8,scaleY:1.2},{easing:"quadIn"})
            .to(0.2,{scaleX:1,scaleY:1},{easing:"quadOut"})
            .start()
        }
        this.scheduleOnce(function(){
            this.onCreatCoin()
        },1);
    },
    onGameOver(str){
        if(AD.Game.GameOver) return
        AD.Game.overGame(str);
    },
    onTip(type,num){
        if(type == "red"){
            var tip = cc.instantiate(this.tip[0]);
            tip.parent = cc.find("tipPanel",this.node);
            tip.active = true;
            tip.getComponent(cc.Label).string = num;
            cc.tween(tip)
            .by(0.5,{y:100,opacity:-100})
            .call(function(){
                tip.destroy()
            })
            .start()
        }
        else{
            var tip = cc.instantiate(this.tip[1]);
            tip.parent = cc.find("tipPanel",this.node);
            tip.active = true;
            tip.getComponent(cc.Label).string = num;
            cc.tween(tip)
            .by(0.5,{y:-100,opacity:-100})
            .call(function(){
                tip.destroy()
            })
            .start()
        }
    }
});
