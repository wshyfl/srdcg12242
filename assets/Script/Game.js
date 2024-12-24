

cc.Class({
    extends: cc.Component,

    properties: {
        bombPre: cc.Prefab,
        /**0胜利 1失败 */
        jieSuanSpine: [sp.SkeletonData]
    },

    onLoad() {
        //倒计时
        AD.Game = this;
        this.GameOver = false;
        this.second = 3;
        this.UIPanel = cc.find("UIPanel", this.node);
        this.noClick = cc.find("noClick", this.node);
        this.jieSuanPanel = cc.find("jieSuanPanel", this.UIPanel);
        this.pausePanel = cc.find("pausePanel", this.UIPanel);

        this.clickPause = false;
        // AD.isAI = true
    },

    start() {
        AD.overQQNum++;
        AD.showBanner();
        if(AD.chanelName1 == "TT"){
            AD.hideBanner();
        }
        this.onShowGameModule()
        this.scheduleOnce(this.onDownTime, 1)
        this.pauseFun = function () {
            if (this.clickPause)
                cc.director.pause()
        }
        var Volume = 1;
        this.schedule(function () {
            Volume -= 0.04;
            cc.audioEngine.setMusicVolume(Volume)
        }, 0.1, 9)
        AD.luPingBegin();
        this.scheduleOnce(function(){
            AD.lupingOver()
        },20)
    },

    update(dt) {

    },
    onBtnCallBack(event, type) {
        AD.sound.playSfx("按钮")
        switch (type) {
            case "关闭结算":
                this.onPanelShowOrHide(this.jieSuanPanel, false)
                cc.director.loadScene("Menu");

                break
            case "主界面":
                cc.director.resume();
                cc.director.loadScene("Menu");
                this.clickPause = false;
                this.unschedule(this.pauseFun)
                break
            case "暂停":
                this.onPanelShowOrHide(this.pausePanel, true);
                this.clickPause = true;
                this.pausePanel.getChildByName("bg").getComponent(cc.Animation).play("pausePanel", 0);
                this.scheduleOnce(this.pauseFun, 1)
                break
            case "继续游戏":
                this.onPanelShowOrHide(this.pausePanel, false)
                cc.director.resume()
                this.clickPause = false;
                this.unschedule(this.pauseFun)
                break
            case "重新开始":
                cc.director.loadScene("Game");
                cc.director.resume();
                this.clickPause = false;
                this.unschedule(this.pauseFun)
                break
            case "普通分享":
                AD.share()
                break
            case "分享":
                AD.luPingShare()
                break
            case "关闭分享":
                this.onCloseSharePanel(false)
                break
        }
    },
    /**倒计时 */
    onDownTime() {
        var self = this;
        AD.sound.playSfx("倒计时");
        this.schedule(function () {
            AD.sound.playSfx("倒计时");
        }, 1, 1)
        this.scheduleOnce(function () {
            AD.sound.playSfx("go");
        }, 3)
        cc.find("redUI/downTime", this.UIPanel).getComponent(sp.Skeleton).setSkin("red");
        cc.find("blueUI/downTime", this.UIPanel).getComponent(sp.Skeleton).setSkin("blue");
        cc.find("redUI/downTime", this.UIPanel).getComponent(sp.Skeleton).setAnimation(0, "daojishi", false);
        cc.find("blueUI/downTime", this.UIPanel).getComponent(sp.Skeleton).setAnimation(0, "daojishi", false);
        cc.find("redUI/downTime", this.UIPanel).getComponent(sp.Skeleton).setCompleteListener(function () {
            cc.find("redUI/downTime", self.UIPanel).active = false;
            cc.find("blueUI/downTime", self.UIPanel).active = false;
            self.noClick.active = false;
            self.startGame();
        })

    },
    startGame() {
        cc.director.emit("游戏开始");
        this.node.getChildByName("GameType").children[this.index].active = true;
        if (this.node.getChildByName("GameType").children[this.index].getChildByName("Control")) {
            this.node.getChildByName("GameType").children[this.index].getChildByName("Control").active = true;
        }
    },
    overGame(state) {
        if (this.GameOver) return
        AD.lupingOver()
        this.GameOver = true;
        var blueLight = this.jieSuanPanel.getChildByName("blueLight").children;
        var redLight = this.jieSuanPanel.getChildByName("redLight").children;
        this.scheduleOnce(function () {
            this.onPanelShowOrHide(this.jieSuanPanel, true);
            cc.find("share1Btn", this.jieSuanPanel).active = AD.btnShareActive;
            cc.find("share2Btn", this.jieSuanPanel).active = AD.btnShareActive;
            var blueSpine = this.jieSuanPanel.getChildByName("blue").getComponent(sp.Skeleton);
            var redSpine = this.jieSuanPanel.getChildByName("red").getComponent(sp.Skeleton);
            if (state == "蓝色") {
                AD.sound.playSfx("胜利");
                blueSpine.skeletonData = this.jieSuanSpine[0];
                blueSpine.setSkin("blue");
                blueSpine.setAnimation(0, "win", false);
                redSpine.skeletonData = this.jieSuanSpine[1];
                redSpine.setSkin("red");
                redSpine.setAnimation(0, "lose", false);
                blueLight[0].active = true;
                redLight[1].active = true;
            }
            else if (state == "红色") {
                AD.sound.playSfx("胜利");

                blueSpine.skeletonData = this.jieSuanSpine[1];
                blueSpine.setSkin("blue");
                blueSpine.setAnimation(0, "lose", false);
                redSpine.skeletonData = this.jieSuanSpine[0];
                redSpine.setSkin("red");
                redSpine.setAnimation(0, "win", false);
                blueLight[1].active = true;
                redLight[0].active = true;
            }
            else if (state == "胜利") {
                AD.sound.playSfx("胜利");

                blueSpine.skeletonData = this.jieSuanSpine[0];
                blueSpine.setSkin("blue");
                blueSpine.setAnimation(0, "win", false);
                redSpine.skeletonData = this.jieSuanSpine[0];
                redSpine.setSkin("red");
                redSpine.setAnimation(0, "win", false);
                blueLight[0].active = true;
                redLight[0].active = true;
            }
            else if (state == "失败") {
                AD.sound.playSfx("失败");

                blueSpine.skeletonData = this.jieSuanSpine[1];
                blueSpine.setSkin("blue");
                blueSpine.setAnimation(0, "lose", false);
                redSpine.skeletonData = this.jieSuanSpine[1];
                redSpine.setSkin("red");
                redSpine.setAnimation(0, "lose", false);
                blueLight[1].active = true;
                redLight[1].active = true;
            }
            blueSpine.setCompleteListener(function () {
                blueSpine.setAnimation(0, "xunhuan", true)

            })
            redSpine.setCompleteListener(function () {
                redSpine.setAnimation(0, "xunhuan", true)

            })
            this.scheduleOnce(function () {
                this.onCloseSharePanel(true)
                AD.GameOver()
                var self = this;
                cc.tween(this.jieSuanPanel.getChildByName("blue"))
                    .by(0.4, { y: 150 })
                    .start()
                cc.tween(this.jieSuanPanel.getChildByName("red"))
                    .by(0.4, { y: -150 })
                    .start()
                cc.tween(this.jieSuanPanel.getChildByName("blueLight"))
                    .by(0.4, { y: 150 })
                    .start()
                cc.tween(this.jieSuanPanel.getChildByName("redLight"))
                    .by(0.4, { y: -150 })
                    .start()
                cc.tween(this.jieSuanPanel.getChildByName("mask"))
                    .by(0.4, { height: 400 })
                    .start()
                cc.tween(this.jieSuanPanel.getChildByName("mask").getChildByName("againBtn"))
                    .to(0.4, { y: 100 })
                    .start()
                cc.tween(this.jieSuanPanel.getChildByName("mask").getChildByName("menuBtn"))
                    .to(0.4, { y: -100 })
                    .start()
            }, 2)
        }, 1)

    },
    /**界面的隐藏与显示 */
    onPanelShowOrHide(Node, bool) {
        if (bool) {
            Node.active = bool;
            AD.chaPing();
            AD.showBanner();
        }
        else {
            Node.active = bool;
            if(AD.chanelName1 == "TT"){
                AD.hideBanner();
            }
        }
    },
    /**缩放动作 */
    scaleNode(_node) {
        _node.scale = 0;
        cc.tween(_node)
            .to(0.2, { scale: 1 })
            .start()
    },
    /**屏幕振动 */
    shakeScreen(shakeTime, scale, moveH) {
        cc.find("Canvas/Main Camera").runAction(cc.sequence(
            cc.spawn(cc.moveBy(shakeTime, cc.v2(0, moveH)), cc.scaleTo(0.02, scale)),
            cc.spawn(cc.moveBy(shakeTime, cc.v2(0, -moveH)), cc.scaleTo(0.02, 1.0)),
            cc.spawn(cc.moveBy(shakeTime, cc.v2(0, moveH)), cc.scaleTo(0.02, scale)),
            cc.spawn(cc.moveBy(shakeTime, cc.v2(0, -moveH)), cc.scaleTo(0.02, 1.0))
        ));
    },
    onShowGameModule() {
        var index = this.node.getChildByName("GameType").children.length - 1;
        switch (AD.gameType) {
            case "飞碟保卫战":
                index = 0;
                break
            case "钩子抓抓抓":
                index = 1;
                break
            case "急速冲冲冲":
                index = 2;

                break
            case "冲出陨石带":
                index = 3;

                break
            case "双指逃生":
                index = 4;

                break
            case "警察抓小偷":
                index = 6;

                break
            case "点球大战":
                index = 5;

                break
            case "钱是我的":
                index = 11;

                break
            case "坦克大战":
                index = 9;

                break
            case "桌面曲棍球":
                index = 8;
                break
            case "相扑之王":
                index = 10;

                break
            case "开心躲得快":
                index = 7;

                break
            case "地雷来了":
                index = 12;
                break
            case "看谁刷的快":
                index = 13;
                break
            case "小鸡争夺战":
                index = 14;
                break
            case "磁铁捡捡捡":
                index = 15;
                break
        }
        this.index = index;
        this.node.getChildByName("GameType").children[index].active = true;
        if (this.node.getChildByName("GameType").children[index].getChildByName("Control")) {
            this.node.getChildByName("GameType").children[index].getChildByName("Control").active = false;
        }
    },
    onCloseSharePanel(bool) {
        if (!AD.showShareViewAuto) return
        if (bool) {
            cc.find("sharePanel", this.UIPanel).active = true;
            cc.find("sharePanel", this.UIPanel).scale = 0;
            cc.tween(cc.find("sharePanel", this.UIPanel))
            .to(0.2, { scale: 1 })
            .start()
            cc.find("sharePanel/closeBtn", this.UIPanel).active = false;
            this.scheduleOnce(function(){
                cc.find("sharePanel/closeBtn", this.UIPanel).active = true;
            },3)
            if(AD.wuDianRate>0){
                cc.find("sharePanel/bigShare", this.UIPanel).active = true;
            }
        }
        else {
            cc.find("sharePanel", this.UIPanel).active = false;
        }

    }
});
