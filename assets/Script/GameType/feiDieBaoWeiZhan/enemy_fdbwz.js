

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.speedX = 0;
        this.speedY = 0;
    },

    start() {
        this.node.angle = Tools.getAngle(this.node,AD.fdbwz.UFO)
    },

    update(dt) {
        if (!AD.Game.GameOver) {
            this.node.getChildByName("img").angle +=1;
            this.node.x += this.speedX;
            this.node.y += this.speedY;
        }

        if (this.node.x > 500 || this.node.x < -500) {
            this.node.destroy()
        }
        if (this.node.y < -500 || this.node.y > 500) {
            this.node.destroy()
        }
    },
    onCollisionEnter: function (other, self) {
        if (other.node.name == "UFO") {
            AD.sound.playSfx("爆炸");
            var bombPre = cc.instantiate(AD.fdbwz.BombPre);
            bombPre.parent = this.node.parent
            bombPre.position = this.node.position;
            // bombPre.scale=0.5
            AD.fdbwz.onGameOver();
            AD.Game.shakeScreen(0.05, 1.05, 20);
            self.node.destroy();
        }
        else if (other.node.name == "plank") {
            AD.sound.playSfx("打中坦克");
            AD.vibrateShort();
            AD.fdbwz.onGameWin();
            if(this.plankTween!=null){
                this.plankTween .stop();
            }      
            this.plankTween = cc.tween(other.node)
                .to(0.1,{scale:1.1})
                .to(0.1,{scale:1})
                .start()
            var bombPre = cc.instantiate(AD.fdbwz.BombPre);
            bombPre.parent = this.node.parent
            bombPre.position = this.node.position;
            self.node.destroy();
        }
    },
});
