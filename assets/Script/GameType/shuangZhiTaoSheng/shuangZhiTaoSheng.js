

cc.Class({
    extends: cc.Component,

    properties: {
        terrainPre: cc.Node,
    },

    onLoad() {
        AD.szts = this;
        this.GameStart = false;
        this.bg = this.node.getChildByName("bg");
        this.ball = this.node.getChildByName("ball")
        this.isJump = false;
        this.Speed = 5;
        this.Score = 0;

        this.ballSpine = this.ball.getChildByName("img").getComponent(sp.Skeleton)

    },

    start() {
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update(dt) {

    },
    onBtnCallBack(event, type) {
        AD.sound.playSfx("按钮")
        var self = this;
        switch (type) {
            case "向下":
                if (this.isJump) return
                if (this.ball.x < -100) return
                this.isJump = true;
                this.ballSpine.setAnimation(0, "xiatiao", false)
                cc.tween(this.ball)
                    .to(0.3, { x: -137, angle: 0 })
                    .call(function () {
                        self.isJump = false
                        self.ballSpine.setAnimation(0, "xiapao", true)
                        
                    })
                    .start()
                break;
            case "向上":
                if (this.isJump) return
                if (this.ball.x > 100) return
                this.isJump = true
                this.ballSpine.setAnimation(0, "shangtiao", false)
                cc.tween(this.ball)
                    .to(0.3, { x: 137, angle: 360 })
                    .call(function () {
                        self.isJump = false
                        self.ballSpine.setAnimation(0, "shangpao", true)
                        
                    })
                    .start()
                break;
        }
    },
    onGameStart() {
        this.GameStart = true;
        this.ballSpine.setAnimation(0, "xiapao", true)
        this.addSpeed = function () {
            this.Speed += 0.5;
            if (this.Speed >= 6) {
                this.unschedule(this.addSpeed);
            }
        }
        this.schedule(this.addSpeed, 7)
    },
    onGameOver(str) {
        AD.Game.shakeScreen(0.05, 1.05, 20);
        AD.vibrateLong();
        AD.Game.overGame(str)
    },
    onAddScore() {
        AD.sound.playSfx("得金币");
        this.Score++;
        this.ball.getChildByName("eatCoinEff").active = true;
        this.ball.getChildByName("eatCoinEff").getChildByName("New Node").getComponent(cc.Animation).play("effect_chiJinBi", 0);
        this.node.getChildByName("redScore").getComponent(cc.Label).string = this.Score;
        this.node.getChildByName("blueScore").getComponent(cc.Label).string = this.Score;
        // if (this.Score >= 15) {
        //     this.onGameOver("胜利");
        // }
    }
});
