

cc.Class({
    extends: cc.Component,

    properties: {

        starSprite: cc.SpriteFrame,
        starTuoWei: cc.Texture2D,
        
    },

    onLoad() {
        this.type = 0;
        this.speed = 0;
    },

    start() {
        if (this.type == 0) {
            this.node.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.starSprite;
            this.node.getChildByName("eff").active = false
            this.node.getComponent(cc.MotionStreak).texture = this.starTuoWei;
            this.node.getComponent(cc.MotionStreak).stroke = 30;
            this.node.getComponent(cc.MotionStreak).fadeTime = 1.5
        }
        this.orient=-Tools.getRadian(this.node,AD.jscc.player)+Math.PI;
        this.node.getChildByName("eff").angle =Tools.getAngle(this.node,AD.jscc.player)
    },

    update(dt) {
        if (this.type == 0) {
        }
        this.node.getChildByName("img").angle -= 1;
        if (this.node.x <= -420) {
            this.node.destroy()
        }
        if (!AD.Game.GameOver) {
            this.node.x += this.speed * dt*Math.sin(this.orient);
            this.node.y += this.speed * dt*Math.cos(this.orient)
        }
    },
    onCollisionEnter(other, self) {
        if (other.node.name == "UFO") {
            if (this.type == 0) {
                AD.sound.playSfx("得分");
                this.node.destroy();
                AD.jscc.onGameWin();
            }
            else {
                if (!AD.Game.GameOver) {
                    AD.sound.playSfx("爆炸");
                    AD.vibrateLong();
                    AD.Game.shakeScreen(0.05, 1.05, 20);
                    cc.director.emit("游戏结束");
                }
            }
        }

    }
});
