

cc.Class({
    extends: cc.Component,

    properties: {
        redBtnImgs: [cc.SpriteFrame],
        blueBtnImgs: [cc.SpriteFrame],
    },


    onLoad() {
        AD.kxddk = this;
        this.handRed = cc.find("Red/hand", this.node);
        this.handBlue = cc.find("Blue/hand", this.node);

        this.btnRed = cc.find("Red/btn", this.node);
        this.btnBlue = cc.find("Blue/btn", this.node);

        this.yuansRed = cc.find("Red/yuans", this.node).children;
        this.yuansBlue = cc.find("Blue/yuans", this.node).children;

        this.scoreRed = cc.find("Red/score", this.node);
        this.scoreBlue = cc.find("Blue/score", this.node);

        this.isRedAtt = true;
        this.isBlueAtt = !this.isRedAtt;
        this.redCanClick = true;
        this.blueCanClick = true;
        this.redHideNum = 0;
        this.blueHideNum = 0;
        this.onInitBtnImg();

        this.redScore = 0;
        this.blueScore = 0;
        this.redInjury = 0.8;
        this.blueInjury = 0.8;
        this.isHit = false
    },

    start() {
        //单人时蓝色按钮隐藏
        if(AD.isAI){
            this.btnBlue.active = false;
        }
        this.onBtnEventListen();
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update(dt) {

    },
    onGameStart(){
        this.onAI()
    },
    onBtnEventListen() {
        this.btnRed.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮");
            if (!this.redCanClick) return
            if (this.isRedAtt) {

                this.redCanClick = false;
                this.onRedHandHitOrHide("打");

            }
            else {
                this.redCanClick = false;
                this.blueCanClick = false;
                this.onRedHandHitOrHide("躲");
            }
        }, this)
        this.btnBlue.on(cc.Node.EventType.TOUCH_START, function () {
            AD.sound.playSfx("按钮");
            if (!this.blueCanClick) return
            if (this.isBlueAtt) {
                this.blueCanClick = false;
                this.onBlueHandHitOrHide("打")

            }
            else {
                this.blueCanClick = false;
                this.redCanClick = false;
                this.onBlueHandHitOrHide("躲");
            }
        }, this)
    },
    /**初始化按钮图片 */
    onInitBtnImg() {
        if (this.isRedAtt) {
            this.node.getChildByName("Red").zIndex = 1;
            this.node.getChildByName("Blue").zIndex = 0;
            this.btnRed.getComponent(cc.Sprite).spriteFrame = this.redBtnImgs[0];
            this.btnBlue.getComponent(cc.Sprite).spriteFrame = this.blueBtnImgs[1];
        }
        else {
            this.node.getChildByName("Red").zIndex = 0;
            this.node.getChildByName("Blue").zIndex = 1;
            this.btnRed.getComponent(cc.Sprite).spriteFrame = this.redBtnImgs[1];
            this.btnBlue.getComponent(cc.Sprite).spriteFrame = this.blueBtnImgs[0];
        }
    },
    /**红方打或躲 */
    onRedHandHitOrHide(str) {
        var self = this;
        if (str == "打") {
            cc.tween(this.handRed)
                .to(0.5, { y: -100 })
                .to(0.5, { y: -400 })
                .call(function () {
                    AD.kxddk.redCanClick = true;
                    AD.kxddk.blueCanClick = true;
                    AD.kxddk.isBlueAtt = true;
                    AD.kxddk.isRedAtt = false;
                    if(!AD.kxddk.isHit){
                        AD.kxddk.onGameOver("蓝色");
                    }
                    else{
                        AD.kxddk.isHit = false
                    }
                    AD.kxddk.onInitBtnImg();
                })
                .start()
        }
        else {
            cc.tween(this.handRed)
                .to(0.5, { y: -700 })
                .to(0.5, { y: -400 })
                .call(function () {
                    AD.kxddk.redCanClick = true;
                    AD.kxddk.blueCanClick = true;
                })
                .start()
            this.onRedHandHideCallBack()
        }
    },
    /**红方躲避回调 */
    onRedHandHideCallBack() {
        this.yuansRed[this.redHideNum].children[0].active = true;
        this.redHideNum++;
        if (this.redHideNum == 3) {
            this.redHideNum = 0;
            this.yuansRed[0].children[0].active = false;
            this.yuansRed[1].children[0].active = false;
            this.yuansRed[2].children[0].active = false;
            this.isRedAtt = true;
            this.isBlueAtt = false;
            this.onInitBtnImg();
            //躲三次无效后对方自动加一分
            this.onGameOver("蓝色");
        }
    },
    /**蓝方打或躲 */
    onBlueHandHitOrHide(str) {
        if (str == "打") {
            cc.tween(this.handBlue)
                .to(0.5, { y: -100 })
                .to(0.5, { y: -400 })
                .call(function () {
                    AD.kxddk.redCanClick = true;
                    AD.kxddk.blueCanClick = true;
                    AD.kxddk.isBlueAtt = false;
                    AD.kxddk.isRedAtt = true;
                    AD.kxddk.onInitBtnImg();
                    if(!AD.kxddk.isHit){
                        AD.kxddk.onGameOver("红色");
                    }
                    else{
                        AD.kxddk.isHit = false
                    }
                })
                .start()
        }
        else {
            cc.tween(this.handBlue)
                .to(0.5, { y: -700 })
                .to(0.5, { y: -400 })
                .call(function () {
                    AD.kxddk.redCanClick = true;
                    AD.kxddk.blueCanClick = true;
                })
                .start()
            this.onBlueHandHideCallBack()
        }
    },
    /**蓝方躲避回调 */
    onBlueHandHideCallBack() {
        this.yuansBlue[this.blueHideNum].children[0].active = true;
        this.blueHideNum++;
        if (this.blueHideNum == 3) {
            this.blueHideNum = 0;
            this.yuansBlue[0].children[0].active = false;
            this.yuansBlue[1].children[0].active = false;
            this.yuansBlue[2].children[0].active = false;
            this.isBlueAtt = true;
            this.isRedAtt = false;
            this.onInitBtnImg();
            //躲三次无效后对方自动加一分
            this.onGameOver("红色");
        }
    },
    /**初始化圈 */
    onInitQuan() {
        this.redHideNum = 0;
        this.yuansRed[0].children[0].active = false;
        this.yuansRed[1].children[0].active = false;
        this.yuansRed[2].children[0].active = false;
        this.blueHideNum = 0;
        this.yuansBlue[0].children[0].active = false;
        this.yuansBlue[1].children[0].active = false;
        this.yuansBlue[2].children[0].active = false;
    },
    onGameOver(str) {
        if (str == "红色") {
            this.redScore++;
            this.scoreRed.getComponent(cc.Label).string = this.redScore;
        }
        else {
            this.blueScore++;
            this.scoreBlue.getComponent(cc.Label).string = this.blueScore;
        }
        this.onInitQuan();
        if (this.blueScore >= 3) {
            AD.Game.overGame("蓝色");
        }
        if (this.redScore >= 3) {
            AD.Game.overGame("红色");
        }
    },
    onAI(){
        if(AD.Game.GameOver) return
        if(!AD.isAI) return
        this.scheduleOnce(function(){
            if(AD.Game.GameOver) return
            if(this.isRedAtt){
                this.onBlueHandHitOrHide("躲")
            }
            else{
                this.onBlueHandHitOrHide("打")
            }
            this.onAI()
        },Tools.random(4,8))
    }
});
