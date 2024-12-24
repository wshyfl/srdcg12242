
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.zhiZhen = cc.find("bg/zhiZhen", this.node);
        this.click = cc.find("bg/clickPanel", this.node);
        this.ball = cc.find("bg/ball", this.node);
        this.goalkeeper = cc.find("bg/goalkeeper", this.node);
        this.tip = cc.find("bg/tip", this.node);
        //守门员Spine动画
        this.goalkeeperSpine = this.goalkeeper.getChildByName("juese").getComponent(sp.Skeleton);
        this.goalkeeperCanMove = true;
        this.zhiZhenCanMove = true;
        /**反转 */
        this.inversion = 1;
        this.redScore = 0;
        this.blueScore = 0;
        this.isCatch = false;
    },

    start() {
        var self = this
        cc.director.on("游戏开始", this.onGameStart, this);
        cc.director.on("游戏结束", this.onGameOver, this);
        this.onClickNodeEventListen();
        this.goalkeeperSpine.setCompleteListener(function () {
            if (self.goalkeeperSpine.animation == "jump") {
                self.goalkeeperSpine.setAnimation(0, "daiji", true)
            }
        })
    },

    update(dt) {

    },

    onGameStart() {
        this.zhiZhenAnimation = this.zhiZhen.getComponent(cc.Animation).play("zhiZhenRotate", 0);
        cc.find("bg/tip1",this.node).active = true;
        cc.tween(cc.find("bg/tip1",this.node)).delay(1).to(1,{opacity:0}).start()
    },
    /**click节点事件监听 */
    onClickNodeEventListen() {
        this.click.on(cc.Node.EventType.TOUCH_START, function (e) {
            AD.sound.playSfx("按钮")
            if (AD.Game.GameOver) return
            var pos = cc.v2((e.getLocationX() - 360) * this.inversion, (e.getLocationY() - AD.height / 2) * this.inversion);
            if (pos.y < 0) {
                if(this.inversion == -1){
                    if(AD.isAI) return
                }
                if (!this.zhiZhenCanMove) return
                this.zhiZhenCanMove = false
                this.zhiZhenAnimation.pause();
                this.onBallMove()
                this.onAI()
            }
            else {
                if(this.inversion == 1){
                    if(AD.isAI) return
                }
                if (pos.x > 0) {
                    this.onGoalkeeperMove("右")
                }
                else {
                    this.onGoalkeeperMove("左")
                }
                
            }
        }, this);
    },
    /**守门员移动 */
    onGoalkeeperMove(dir) {
        var self = this;
        if (!this.goalkeeperCanMove){
            this.tip.active = true;
            AD.vibrateShort()
            if(!this.tipTween){
                this.tip.scale = 0;
                this.tipTween = cc.tween(this.tip).to(0.2,{scale:1}).to(1,{opacity:0}).start()
            }
            return
        } 
        AD.sound.playSfx("守门员移动");
        if (dir == "左") {
            if (this.goalkeeper.x >= -100) {
                this.goalkeeperCanMove = false;
                this.goalkeeperSpine.setAnimation(0, "jump", false)
                cc.tween(this.goalkeeper)
                    .by(0.2, { x: -180 })
                    .delay(0.8)
                    .call(function () {
                        self.goalkeeperCanMove = true;
                    })
                    .start()
            }
        }
        else {
            if (this.goalkeeper.x <= 100) {
                this.goalkeeperSpine.setAnimation(0, "jump", false)
                this.goalkeeperCanMove = false;
                cc.tween(this.goalkeeper)
                    .by(0.2, { x: 180 })
                    .delay(0.8)
                    .call(function () {
                        self.goalkeeperCanMove = true;
                    })
                    .start()
            }
        }

    },
    /**球移动 */
    onBallMove() {
        AD.sound.playSfx("踢球");
        var self = this;
        var _y = 410 + 295;
        var _angle = this.zhiZhen.angle
        if (this.zhiZhen.angle > 60) {
            _angle = 60
        }
        else if (this.zhiZhen.angle < -60) {
            _angle = -60
        }
        var x = _y * Math.tan(Tools.angleToRadian(-_angle));

        var time = Tools.getDistance(this.ball, cc.v2(x, 410)) / _y ;
        cc.tween(this.ball)
            .to(time / 2, { position: cc.v2((this.ball.x + x) / 2, (410 + this.ball.y) / 2), scale: 1.5 }, { easing: "sineIn" })
            .to(time / 2, { position: cc.v2(x, 410), scale: 1 }, { easing: "sineOut" })
            .call(function () {
                cc.director.emit("游戏结束");
                self.goalkeeperCanMove = false;
            })
            
            .start()
    },
    /**翻转 */
    onInversion() {
        if (AD.Game.GameOver) return
        var self = this;
        this.ball.position = cc.v2(-5, -295);

        this.zhiZhen.active = false;
        if (this.inversion == 1) {
            var _angle = 180;
        }
        else {
            var _angle = 0;
        }
        cc.tween(cc.find("bg", this.node))
            .to(0.5, { angle: _angle })
            .call(function () {
                self.goalkeeperCanMove = true;
                self.zhiZhenCanMove = true;
                self.inversion *= -1;
                if (self.inversion == 1) {
                    self.goalkeeperSpine.setSkin("lan")
                }
                else {
                    self.goalkeeperSpine.setSkin("hong")
                }
                self.zhiZhen.active = true;
                self.zhiZhenAnimation.play("zhiZhenRotate", 0);
                self.onAI()
            })
            .start()

    },
    /**游戏结束 */
    onGameOver() {
        if (Math.abs(this.ball.x - this.goalkeeper.x) <= (this.ball.width + this.goalkeeper.width) / 2) {
            this.isCatch = true;
            AD.sound.playSfx("足球唏嘘");
            if (this.inversion == 1) {//红方射球
                this.blueScore++;
                cc.find("blueScore",this.node).getComponent(cc.Label).string = this.blueScore;
                cc.tween(this.ball)
                .by(0.2,{y:-200})
                .by(0.2,{y:80,scale:0.2}, { easing: "sineOut" })
                .by(0.2,{y:-80,scale:-0.2}, { easing: "sineIn" })
                .by(0.2,{y:40,scale:0.1}, { easing: "sineOut" })
                .by(0.2,{y:-40,scale:-0.1}, { easing: "sineIn" })
                .start()
            }
            else {
                this.redScore++;
                cc.find("redScore",this.node).getComponent(cc.Label).string = this.redScore;
                cc.tween(this.ball)
                .by(0.2,{y:-200})
                .by(0.2,{y:80,scale:0.2}, { easing: "sineOut" })
                .by(0.2,{y:-80,scale:-0.2}, { easing: "sineIn" })
                .by(0.2,{y:40,scale:0.1}, { easing: "sineOut" })
                .by(0.2,{y:-40,scale:-0.1}, { easing: "sineIn" })
                .start()
            }
            this.scheduleOnce(this.onInversion,2)
        }
        else {
            
            this.isCatch = false;
            if (this.inversion == 1) {//红方射球
                if(this.ball.x>-237&&this.ball.x<237){
                    AD.sound.playSfx("足球欢呼");
                    this.redScore++;
                    cc.find("redScore",this.node).getComponent(cc.Label).string = this.redScore;
                    cc.tween(this.ball)
                    .by(0.2,{y:-80,scale:-0.2}, { easing: "sineIn" })
                    .by(0.2,{y:40,scale:0.1}, { easing: "sineOut" })
                    .by(0.2,{y:-40,scale:-0.1}, { easing: "sineIn" })
                    .start()
                }
                else{
                    AD.sound.playSfx("足球唏嘘");
                    this.blueScore++;
                    cc.find("blueScore",this.node).getComponent(cc.Label).string = this.blueScore;
                }
            }
            else {
                if(this.ball.x>-237&&this.ball.x<237){
                    AD.sound.playSfx("足球欢呼");
                    this.blueScore++;
                    cc.find("blueScore",this.node).getComponent(cc.Label).string = this.blueScore;
                    cc.tween(this.ball)
                    .by(0.2,{y:-80,scale:0.2}, { easing: "sineOut" })
                    .by(0.2,{y:40,scale:0.1}, { easing: "sineOut" })
                    .by(0.2,{y:-40,scale:-0.1}, { easing: "sineIn" })
                    .start()
                }
                else{
                    AD.sound.playSfx("足球唏嘘");
                    this.redScore++;
                    cc.find("redScore",this.node).getComponent(cc.Label).string = this.redScore;
                }
                
            }
            this.scheduleOnce(this.onInversion,2)
        }
        if (this.blueScore >=3) {
            AD.Game.overGame("蓝色")
        }
        if (this.redScore >=3) {
            AD.Game.overGame("红色")
        }
        
    },
    /**AI */
    onAI(){
        if(!AD.isAI) return
        if(this.inversion == 1){
            var arr=["左","右"]
                this.onGoalkeeperMove(arr[Tools.random(0,1)])
        }
        else{
            console.log(111111)
            this.scheduleOnce(function(){
                if (!this.zhiZhenCanMove) return
                this.zhiZhenCanMove = false;
                this.zhiZhenAnimation.pause();
                this.onBallMove();
            },Tools.random(3,6))
        }
    }
});
