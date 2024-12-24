

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.Speed = 0;
    },

    start() {
        var r=Math.random();
        if(r<0.5){
            this.node.getChildByName("star").destroy()
        }
    },

    update(dt) {
        if(AD.Game.GameOver) return
        this.node.y -= AD.ccysd.Speed;
    },
});
