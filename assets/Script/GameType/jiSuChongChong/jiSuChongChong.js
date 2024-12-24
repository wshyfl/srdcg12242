

cc.Class({
    extends: cc.Component,

    properties: {
        leftBtn: {
            default: null,
            type: cc.Node,
            displayName: "蓝色的按钮",
            tooltip: "leftBtn",
        },
        rightBtn: {
            default: null,
            type: cc.Node,
            displayName: "红色的按钮",
            tooltip: "rightBtn",
        },
        player: {
            default: null,
            type: cc.Node,
            displayName: "玩家",
            tooltip: "player",
        },
        enemy: {
            default: null,
            type: cc.Node,
            displayName: "其他",
            tooltip: "enemy",
        },
        bombPre: cc.Prefab,
    },

    onLoad() {
        AD.jscc = this;
        this.scoreRed = this.node.getChildByName("scoreRed");
        this.scoreBlue = this.node.getChildByName("scoreBlue");
        this.bgs = cc.find("bg",this.node).children;
        this.score = 0;

        this.isLeft = false;
        this.isRight = false;
        this.bgSpeed = 0;
        cc.find("ef_suDuXian",this.node).active = false;
    },

    start() {
        cc.director.on("游戏开始", this.startGame, this);
        cc.director.on("游戏结束", this.overGame, this);
        this.onBtnEventListen();
    },

    update(dt) {
        this.onBgMove()
        this.onUFOMove()
    },
    /**游戏开始 */
    startGame() {
        cc.find("ef_suDuXian",this.node).active = true;
        this.bgSpeed = 1;
        this.score = 0;
        this.num = 1.1;
        this.speedAdd = 4;
        this.wave = 2.3;
        this.schedule(this.onCreatEnemy, (this.wave / this.num))
        this.schedule(function () {
            this.num += 0.1;
            this.speedAdd += 1;
            this.unschedule(this.onCreatEnemy, this)
            this.schedule(this.onCreatEnemy, (this.wave / this.num))
        }, 6)
    },
    /**游戏失败 */
    overGame() {
        if (AD.Game.GameOver) return
        cc.find("ef_suDuXian",this.node).active = false;
        AD.Game.overGame("失败");

        var b = cc.instantiate(this.bombPre);
        b.parent = this.node;
        b.position = this.player.position;
        b.y+=105
        this.player.active = false;
        b.position = this.player.position;
        cc.tween(this.player)
            .repeatForever(
                cc.tween()
                    .to(0.6, { opacity: 0 })
                    .to(0.6, { opacity: 255 })
            )
            .start()
        // AD.game.onOtherOverPanel(this.score,0);
    },
    /**游戏胜利 */
    onGameWin() {
        this.score++;
        this.player.getChildByName("eatCoinEff").active = true;
        this.player.getChildByName("eatCoinEff").getChildByName("New Node").getComponent(cc.Animation).play("effect_chiJinBi",0);
        this.scoreRed.getComponent(cc.Label).string = this.score;
        this.scoreBlue.getComponent(cc.Label).string = this.score;
        if (this.score >= 15) {
            cc.find("ef_suDuXian",this.node).active = false;
            AD.Game.overGame("胜利");
        }

    },
    onBtnEventListen() {
        this.leftBtn.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮");
            this.isLeft = true;
            this.isRight = false;
        }, this);
        this.leftBtn.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isLeft = false;
        }, this);
        this.leftBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.isLeft = false;
        }, this);


        this.rightBtn.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮");
            this.isRight = true;
            this.isLeft = false;
        }, this);
        this.rightBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.isRight = false;
        }, this);
        this.rightBtn.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isRight = false;
        }, this);
    },
    onUFOMove() {
        if (AD.Game.GameOver) return
        if (this.isLeft == true && this.isRight == true) {
            return
        }
        else if (this.isLeft == false && this.isRight == false) {
            return
        }
        //逆时针移动
        else if (this.isLeft == true && this.isRight == false) {
            this.player.y += 4
            if (this.player.y > AD.heigth / 2 - 110) {
                this.player.y = AD.heigth / 2 - 110
            }
            else if (this.player.y < -AD.heigth / 2 + 110) {
                this.player.y = -AD.heigth / 2 + 110
            }
        }
        //顺时针移动
        else if (this.isLeft == false && this.isRight == true) {
            this.player.y -= 4
        }
    },
    onBgMove(){
        if (AD.Game.GameOver) return
       
        for(var i=0;i<this.bgs.length;i++){
            this.bgs[i].x-=this.bgSpeed;
            if(this.bgs[i].x<-710){
                
                this.bgs[i].x =this.bgs[(i+2)%3].x+710; 
            }
        }
    },
    onCreatEnemy() {
        if (!AD.Game.GameOver) {
            var em = cc.instantiate(this.enemy);
            em.parent = this.node;
            em.position = cc.v2(420, Tools.random(-360, 360));
            em.active = true
            em.getComponent("enemy_jsccc").speed = 100 + 20 * this.speedAdd;
            var r = Math.random();
            if (r < 0.3) {
                em.getComponent("enemy_jsccc").type = 0;
            }
            else {
                em.getComponent("enemy_jsccc").type = 1;
            }
        }

    },
});
