

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        AD.sound.playSfx("背景音乐");
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        AD.height = cc.winSize.height;
        AD.width = cc.winSize.width;

    },

    start() {
        globalData.getDataAll();


        cc.tween(this.node.getChildByName("bar"))
            .to(3, { width: 501 })
            .call(function () {
                cc.director.loadScene("Menu");
            })
            .start()
        cc.tween(this.node.getChildByName("ufo"))
            .to(3, { x: 250.5 })
            
            .start()
    },

    update(dt) {

    },
});
