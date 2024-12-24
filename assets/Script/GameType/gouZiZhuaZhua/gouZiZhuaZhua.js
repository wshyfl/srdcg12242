

cc.Class({
    extends: cc.Component,

    properties: {
        BombPre: cc.Prefab,
    },

    onLoad() {
        AD.gzzz = this;
        this.scoreBar = cc.find("scoreBar", this.node);
        this.light = cc.find("light", this.node);
        this.downTime = cc.find("downTime", this.node);
        this.hookParent = cc.find("hookParent", this.node);
        this.enemyPanel = cc.find("enemyPanel", this.node);
        this.enemyPre = cc.find("enemy", this.node);
        this.stonePre = cc.find("stone", this.node);
        this.hookCatch = false;
        this.score = 0;
    },

    start() {
        this.onBtnsEventListen();
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update(dt) {
        if (AD.Game.GameOver) return
        this.node.getChildByName("UFO").angle -= 0.5;
        this.onEnemyLimit()
        if (this.hookCatch) return;
        this.onRedPlankMove();

    },
    onGameStart() {
        this.onDownTime()
        for (let i = 0; i < 4; i++) {
            this.onCreatEnemy();
            this.onCreatStone()
        }
    },
    onDownTime(){
        var time = 40;
        this.downTimeFun=function(){
            time--;
            this.downTime.getComponent(cc.Label).string = time;
            if(time == 0){
                this.onGameOver()
            }
        }
        this.schedule(this.downTimeFun,1);
    },
    /**红蓝按钮事件监听 */
    onBtnsEventListen() {
        var catchBtn = cc.find("Btns/catchBtn", this.node);
        var leftBtn = cc.find("Btns/redLeftBtn", this.node);
        var rightBtn = cc.find("Btns/redRightBtn", this.node);
        this.isRight = false;
        this.isLeft = false;
        leftBtn.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮")
            this.isLeft = true;
            this.isRight = false;
        }, this)
        leftBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.isLeft = false;
        }, this)
        leftBtn.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isLeft = false;
        }, this)

        rightBtn.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮")
            this.isRight = true;
            this.isLeft = false;
        }, this)
        rightBtn.on(cc.Node.EventType.TOUCH_END, function () {
            this.isRight = false;
        }, this)
        rightBtn.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isRight = false;
        }, this)

        catchBtn.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮")
            if (AD.Game.GameOver) return
            if (this.hookCatch) return;
            this.hookCatch = true;
            cc.director.emit("抓取");
        }, this)
    },
    /**抓钩移动 */
    onRedPlankMove() {
        if (this.isLeft == true && this.isRight == true) {
            return
        }
        else if (this.isLeft == false && this.isRight == false) {
            return
        }
        //逆时针移动
        else if (this.isLeft == true && this.isRight == false) {
            this.hookParent.angle += 1.5
        }
        //顺时针移动
        else if (this.isLeft == false && this.isRight == true) {
            this.hookParent.angle -= 1.5
        }
    },
    /**创建小恶魔 */
    onCreatEnemy() {
        var enemy = cc.instantiate(this.enemyPre);
        enemy.parent = this.node.getChildByName("enemyPanel");
        enemy.active = true
        let rnge = Tools.random(0, 360)
        let length = Tools.random(160, 360)
        let posx = length * Math.sin(Tools.angleToRadian(rnge));
        let posy = length * Math.cos(Tools.angleToRadian(rnge));
        enemy.position = cc.v2(posx, posy);
        console.log(enemy.position)
        // sweet.scale=0;
        enemy.opacity = 0;
        cc.tween(enemy)
            .to(0.2, { opacity: 255 })
            .start()
        enemy.getComponent("enemy_gzzz").onInitPos();

    },
    /**创建陨石 */
    onCreatStone() {
        var stone = cc.instantiate(this.stonePre);
        stone.active = true;
        stone.parent = this.node.getChildByName("enemyPanel");
        let length = Tools.random(160, 360)
        let posx = length * Math.sin(Tools.angleToRadian(Tools.random(0, 360)));
        let posy = length * Math.sin(Tools.angleToRadian(Tools.random(0, 360)));
        stone.position = cc.v2(posx, posy);
        // sweet.scale=0;
        stone.opacity = 0;
        cc.tween(stone)
            .to(0.2, { opacity: 255 })
            .start()
        stone.getComponent("enemy_gzzz").onInitPos();

    },
    onGameOver() {
        this.unschedule(this.downTimeFun);
        AD.Game.overGame("失败")
        console.log("游戏结束")
    },
    onGameWin() {
        this.score++;
        AD.sound.playSfx("得分");
        cc.tween(this.scoreBar.getComponent(cc.Sprite))
        .to(0.5,{fillRange:this.score/10})
        .start()
        this.light.active = true;
        cc.tween(this.light)
        .to(0.5,{angle:this.score*36})
        .start()
        if(this.score >= 10){
            this.unschedule(this.downTimeFun);
            AD.Game.overGame("胜利")
            console.log("游戏胜利");
        }

    },
    /**移动限制 */
    onEnemyLimit(){
        var sum=0;
        for(var i = 0;i<this.enemyPanel.children.length;i++){
            if(this.enemyPanel.children[i].x>360){
                if(this.enemyPanel.children[i].name == "enemy")
                    sum++;
            }
        }
        if(sum>=2){
            cc.director.emit("移动限制","变小")
        }
        else{
            cc.director.emit("移动限制","变大")
        }
    }
});
