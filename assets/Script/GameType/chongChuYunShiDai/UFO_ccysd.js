

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {

    },

    start() {

    },

    update(dt) {

    },

    onCollisionEnter(other, self) {
        switch(other.node.name){
            case "yunShi":
                AD.sound.playSfx("爆炸");
                var b = cc.instantiate(AD.Game.bombPre);
                b.parent = this.node.parent;
                b.position = this.node.position;
                b.y+=105
                AD.Game.shakeScreen(0.05, 1.05, 20);
                AD.vibrateLong();
                this.node.active =false;
                cc.director.emit("游戏结束")
                break
            case "star":
                AD.sound.playSfx("得分");
                AD.ccysd.onGameWin();
                other.node.destroy()
                break
        }
    }
});
