

cc.Class({
    extends: cc.Component,

    properties: {
        redPre: cc.Node,
        bluePre: cc.Node,
        buffPre: cc.Node,
    },

    onLoad() {
        AD.kssdk = this;
        this.redPlayer = cc.find("redPlayer", this.node);
        this.bluePlayer = cc.find("bluePlayer", this.node);
        this.redControl = cc.find("Control/redControl", this.node);
        this.blueControl = cc.find("Control/blueControl", this.node);
        this.redScore = 0;
        this.blueScore = 0;

        this.GameStart = false;
        this.blueTarget = null;
        this.blueMove = false;
        this.blueStand = true;
    },

    start() {
        if (AD.isAI) {
            cc.find("Control/blueControl", this.node).active = false;
            cc.find("Control/blueJoystickBg", this.node).active = false;
        }
        this.redControl.y = -AD.height / 4;
        this.redControl.height = AD.height / 2;
        this.blueControl.y = AD.height / 4;
        this.blueControl.height = AD.height / 2;
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update(dt) {
        this.onAI()
    },
    onGameStart() {

        this.redPlayer.getComponent(cc.BoxCollider).enabled = true;
        this.bluePlayer.getComponent(cc.BoxCollider).enabled = true;
        var time = 30;
        var downTime = function () {
            time--;
            cc.find("redTime", this.node).getComponent(cc.Label).string = time;
            cc.find("blueTime", this.node).getComponent(cc.Label).string = time;
            if (time == 0) {
                this.unschedule(downTime);
                this.onGameOver();
            }
        }
        this.schedule(downTime, 1);
        this.scheduleOnce(this.onCreatBuff, 5);
        this.GameStart = true;
        this.blueTarget = cc.find("bg", this.node).children[Tools.random(0, 79)];
    },
    onCreatBuff() {
        var buff = cc.instantiate(this.buffPre);
        buff.active = true;
        buff.parent = cc.find("buffPanel", this.node);
        buff.position = cc.v2(Tools.random(-250, 270), Tools.random(-300, 370))
    },
    onAddScore(type) {
        if (type == "red") {
            this.redScore++;
            cc.find("redScore", this.node).getComponent(cc.Label).string = this.redScore;
        }
        else {
            this.blueScore++;
            cc.find("blueScore", this.node).getComponent(cc.Label).string = this.blueScore;
        }
    },
    onGameOver() {
        if (this.redScore == this.blueScore) {
            AD.Game.overGame("胜利")
        }
        else if (this.redScore > this.blueScore) {
            AD.Game.overGame("红色")
        }
        else if (this.redScore < this.blueScore) {
            AD.Game.overGame("蓝色")
        }
    },

    onAI() {
        if (!AD.isAI) return
        if (!this.GameStart) return
        if (AD.Game.GameOver) return
        if (Tools.getDistance(this.bluePlayer, this.blueTarget) > 10) {
            if (!this.blueMove) {
                this.blueMove = true;
                this.blueStand = false;
                this.bluePlayer.getComponent("bluePlayer_kssdk").onPlayerMove("走");
            }
            var angle = Tools.getAngle(this.bluePlayer, this.blueTarget);
            this.bluePlayer.angle = angle + 180;
            this.bluePlayer.x += 3 * Math.sin(Tools.angleToRadian(-angle + 180));
            this.bluePlayer.y += 3 * Math.cos(Tools.angleToRadian(-angle + 180));
        }
        else {
            if (!this.blueStand) {
                this.blueStand = true;
                this.blueMove = false;
                this.bluePlayer.getComponent("bluePlayer_kssdk").onPlayerMove("站");
                this.scheduleOnce(function () {
                    this.blueTarget = cc.find("bg", this.node).children[Tools.random(0, 79)];
                }, Math.random())

            }
        }

    }
});
