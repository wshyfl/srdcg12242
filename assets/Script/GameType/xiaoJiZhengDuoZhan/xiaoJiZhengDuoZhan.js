

cc.Class({
    extends: cc.Component,

    properties: {
        chickenPre: cc.Node,
    },


    onLoad() {
        AD.xjzdz = this;
        this.chickenPanel = cc.find("chickenPanel", this.node);
        this.redPlayer = cc.find("redPlayer", this.node);
        this.bluePanel = cc.find("bluePanel", this.node);
        this.bluePlayer = cc.find("bluePlayer", this.node);
        this.GameStart = false;
        this.redScore = 0;
        this.blueScore = 0;
    },

    start() {
        if (AD.isAI) {
            cc.find("Control/blueControl", this.node).active = false;
            cc.find("Control/blueJoystickBg", this.node).active = false;
        }
        this.onInitChicken();
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update(dt) {
        this.onAI()
    },
    onGameStart() {
        this.GameStart = true;
        if (AD.isAI) {
            this.bluePlayer.getComponent("Player_xjzdz").onPlayerMove("走");
        }
    },
    onInitChicken() {
        for (var i = 0; i < 15; i++) {
            var chicken = cc.instantiate(this.chickenPre);
            chicken.parent = this.chickenPanel;
            chicken.active = true;
        }
    },
    onAddScore(type) {
        if (type == "红") {
            this.redScore++;
            cc.find("redScore", this.node).getComponent(cc.Label).string = this.redScore;
        }
        else {
            this.blueScore++;
            cc.find("blueScore", this.node).getComponent(cc.Label).string = this.blueScore;
        }
        if (this.redScore + this.blueScore == 15) {
            if (this.redScore > this.blueScore) {
                AD.Game.overGame("红色");
            }
            else {
                AD.Game.overGame("蓝色");
            }
        }
    },
    onAI() {
        if (!AD.isAI) return
        if (!this.GameStart) return
        if (AD.Game.GameOver) return
        var angle = 0
        if (this.bluePlayer.getComponent("Player_xjzdz").haveChicken) {
            angle = Tools.getAngle(this.bluePlayer, cc.v2(0, 360))

        }
        else {
            if (this.chickenPanel.children.length > 0) {
                angle = Tools.getAngle(this.bluePlayer, this.chickenPanel.children[0]);
            }
        }
        this.bluePlayer.getChildByName("player").angle = angle + 180;
        this.bluePlayer.x += 3 * Math.sin(Tools.angleToRadian(-angle + 180));
        this.bluePlayer.y += 3 * Math.cos(Tools.angleToRadian(-angle + 180));
    },
});
