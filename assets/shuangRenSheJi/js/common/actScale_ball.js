

cc.Class({
    extends: cc.Component,

    properties: {
        time:0.5,
        big:1.1,
        small:1,
    },

    // onLoad () {},

    start () {
        cc.tween(this.node)
        .repeatForever(
            cc.tween()
            .to(this.time,{scale:this.big})
            .to(this.time,{scale:this.small})
        )
        .start();
    },

    // update (dt) {},
});
