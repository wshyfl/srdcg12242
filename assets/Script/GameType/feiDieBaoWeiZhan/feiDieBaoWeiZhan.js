

cc.Class({
    extends: cc.Component,

    properties: {
        BombPre:cc.Prefab,
    },

    onLoad() {
        AD.fdbwz = this;
        this.onUFOTween();
        this.enemyPre = this.node.getChildByName("enemy");

        this.starArry = cc.find("starPanel",this.node).children;

        this.redScore = cc.find("redScore", this.node);
        this.redBtnLeft = cc.find("Btns/redLeftBtn", this.node);
        this.redBtnRight = cc.find("Btns/redRightBtn", this.node);

        this.blueScore = cc.find("blueScore", this.node);
        this.blueBtnLeft = cc.find("Btns/blueLeftBtn", this.node);
        this.blueBtnRight = cc.find("Btns/blueRightBtn", this.node);
       
        this.starSpeed = 1;
        this.speed=1.5;
        this.score = 0;
    },

    start() {
        this.onBtnsEventListen();
        cc.director.on("游戏开始", this.onGameStart, this);
    },
    
    update(dt) {
        if(AD.Game.GameOver) return
        this.UFO.angle -= this._angle;
        this.onRedPlankMove();
        this.onBluePlankMove();
        this.onBgMove()
    },
    onUFOTween() {
        var self = this;
        this._angle = 0;
        this.UFO = this.node.getChildByName("UFO");
        this.UFO.x = -500;

        cc.find("bluePlane/plank", this.node).active = false;
        cc.find("redPlane/plank", this.node).active = false;
        var redPlankMove = cc.tween(cc.find("redPlane/plank", this.node))
            .to(1, { y: 150 });
        var bluePlankMove = cc.tween(cc.find("bluePlane/plank", this.node))
            .to(1, { y: -150 })
        cc.tween(this.UFO)
            .to(2, { x: 0 })
            .call(function () {
                self._angle = 2
                cc.find("bluePlane/plank", self.node).active = true;
                cc.find("redPlane/plank", self.node).active = true;
                redPlankMove.start();
                bluePlankMove.start()
            })
            .start()
        cc.tween(this.UFO.getChildByName("text"))
        .repeatForever(
            cc.tween()
            .to(0.3,{scale:0.8})
            .to(0.3,{scale:1})
        )
        .start()
    },
    onBgMove(){
        if (AD.Game.GameOver) return
       
        for(var i=0;i<this.starArry.length;i++){
            this.starArry[i].y-=this.starSpeed;
            if(this.starArry[i].y<-1500){
                
                this.starArry[i].y =this.starArry[(i+1)%2].y+1500; 
            }
        }
    },
    /**游戏开始 */
    onGameStart() {
        
        var max = 2;
        var time = 2
        this.scheduleOnce(function () { max = 4 }, 10)
        this.schedule(this.onCreatEnemy, time);
        this.schedule(function () {
            this.unschedule(this.onCreatEnemy, this);
            if (time > 0.8) {
                time -= 0.3;
            }
            this.schedule(this.onCreatEnemy, time);
        }, 8)
    },
    /**创建敌人 */
    onCreatEnemy() {
        if (AD.Game.GameOver) return
        var rang = Tools.random(0, 3);
        var enemy = cc.instantiate(this.enemyPre);
        enemy.active = true
        enemy.parent = this.node.getChildByName("enemyPanel");
        enemy.scale = 1;
        enemy.position = this.enemyBollPos(rang);
        enemy.getComponent("enemy_fdbwz").speedX = this.speed * Math.sin(-Tools.getRadian(enemy, this.UFO) + Math.PI);
        enemy.getComponent("enemy_fdbwz").speedY = this.speed * Math.cos(-Tools.getRadian(enemy, this.UFO) + Math.PI);
        enemy.angle = Tools.radianToAngle(Tools.getRadian(enemy, this.UFO)) - 180;
    },
    enemyBollPos(num) {
        if (num == 0) {
            return cc.v2(Tools.random(-360, 360), 400)
        }
        else if (num == 1) {
            return cc.v2(Tools.random(-360, 360), -400)
        }
        else if (num == 2) {
            return cc.v2(400, Tools.random(-400, 400));
        }
        else if (num == 3) {
            return cc.v2(-400, Tools.random(-400, 400));
        }
    },
    /**红蓝按钮事件监听 */
    onBtnsEventListen() {
        this.isRedLeft = false;
        this.isRedRight = false;
        this.isBlueLeft = false;
        this.isBlueRight = false;

        //#region 红色方
        this.redBtnLeft.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮");
            this.isRedLeft = true;
            this.isRedRight = false;
        }, this);
        this.redBtnLeft.on(cc.Node.EventType.TOUCH_END, function () {
            this.isRedLeft = false;
        }, this);
        this.redBtnLeft.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isRedLeft = false;
        }, this);

        this.redBtnRight.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮");
            this.isRedRight = true;
            this.isRedLeft = false;
        }, this);
        this.redBtnRight.on(cc.Node.EventType.TOUCH_END, function () {
            this.isRedRight = false;
        }, this);
        this.redBtnRight.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isRedRight = false;
        }, this);
        //#endregion
        //#region 蓝色方
        this.blueBtnLeft.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮");
            this.isBlueLeft = true;
            this.isBlueRight = false;
        }, this);
        this.blueBtnLeft.on(cc.Node.EventType.TOUCH_END, function () {
            this.isBlueLeft = false;
        }, this);
        this.blueBtnLeft.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isBlueLeft = false;
        }, this);

        this.blueBtnRight.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮");
            this.isBlueRight = true;
            this.isBlueLeft = false;
        }, this);
        this.blueBtnRight.on(cc.Node.EventType.TOUCH_END, function () {
            this.isBlueRight = false;
        }, this);
        this.blueBtnRight.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.isBlueRight = false;
        }, this);
        //#endregion
    },
    /**红色木板移动 */
    onRedPlankMove() {
        if (this.isRedLeft == true && this.isRedRight == true) {
            return
        }
        else if (this.isRedLeft == false && this.isRedRight == false) {
            return
        }
        //逆时针移动
        else if (this.isRedLeft == true && this.isRedRight == false) {
            cc.find("redPlane", this.node).angle += 1.5
        }
        //顺时针移动
        else if (this.isRedLeft == false && this.isRedRight == true) {
            cc.find("redPlane", this.node).angle -= 1.5
        }
    },
    /**蓝色木板移动 */
    onBluePlankMove() {
        // if(this.hookCatch)return;

        if (this.isBlueLeft == true && this.isBlueRight == true) {
            return
        }
        else if (this.isBlueLeft == false && this.isBlueRight == false) {
            return
        }
        //逆时针移动
        else if (this.isBlueLeft == true && this.isBlueRight == false) {
            cc.find("bluePlane", this.node).angle += 1.5
        }
        //顺时针移动
        else if (this.isBlueLeft == false && this.isBlueRight == true) {
            cc.find("bluePlane", this.node).angle -= 1.5
        }
    },
    onGameOver(){
        AD.Game.overGame("失败")
        console.log("游戏结束")
    },
    onGameWin(){
        AD.fdbwz.score++;
        this.redScore.getComponent(cc.Label).string = this.score;
        this.blueScore.getComponent(cc.Label).string = this.score;
        if(this.score >= 15){
            AD.Game.overGame("胜利")
            console.log("游戏胜利")
        }
        
    },
});
