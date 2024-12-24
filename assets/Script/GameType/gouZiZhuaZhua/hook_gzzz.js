

cc.Class({
    extends: cc.Component,

    properties: {
        hookSkin: [cc.SpriteFrame],
    },


    onLoad() {
        var self = this;

        this.boxCollide = this.node.getComponent(cc.BoxCollider);
        this.hookTween = cc.tween(this.node)
            .to(1.5, { y: 500 })
            .call(function () {
                self.boxCollide.enabled = false;
            })
            .to(1.5, { y: 125 })
            .call(function () {
                AD.gzzz.hookCatch = false;
            })

    },

    start() {
        cc.director.on("抓取", this.onHookCatch, this)
    },

    update(dt) {
        this.node.parent.getChildByName("shengziMask").height = this.node.y - 125
    },
    onHookCatch() {

        this.boxCollide.enabled = true;
        this.hookTween.start()
    },
    onCollisionEnter(other, self) {
        var ower = this;
        if (other.node.name == "enemy") {
            AD.sound.playSfx("捉到小魔鬼");
            this.boxCollide.enabled = false;
            this.hookTween.stop()
            self.node.getComponent(cc.Sprite).spriteFrame = this.hookSkin[Tools.random(1,2)];
            
            other.node.destroy();
            // other.node.position=cc.v2(0,-20)
            var speed = 375 / 1.5;
            var time = Math.abs(self.node.y - 125) / speed;
            cc.tween(this.node)
                .to(time, { y: 125 })
                .call(function () {
                    ower.boxCollide.enabled = false;
                    AD.gzzz.hookCatch = false;
                    self.node.getComponent(cc.Sprite).spriteFrame = ower.hookSkin[0];
                   
                    AD.gzzz.onCreatEnemy();
                    AD.gzzz.onGameWin()
                })
                .start()
        }
        else if (other.node.name == "stone") {
            AD.sound.playSfx("爆炸");
            AD.Game.shakeScreen(0.05, 1.05, 20);
            AD.vibrateLong();
            var bombPre = cc.instantiate(AD.gzzz.BombPre);
            bombPre.parent = this.node.parent
            bombPre.position = this.node.position;
            this.boxCollide.enabled = false;
            other.node.destroy();
            this.hookTween.stop();
            var speed = 375 / 1.5;
            var time = Math.abs(self.node.y - 125) / speed;
            cc.tween(this.node)
                .delay(1)
                .to(time, { y: 125 })
                .call(function () {
                    ower.boxCollide.enabled = false;
                    AD.gzzz.hookCatch = false;
                    self.node.getComponent(cc.Sprite).spriteFrame = ower.hookSkin[0];
                    
                })
                .start()
            AD.gzzz.onGameOver()
        }
    }
});
