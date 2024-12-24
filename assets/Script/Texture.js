

cc.Class({
    extends: cc.Component,

    properties: {
        moduleIntroduceImg:[cc.SpriteFrame],
        videoImg:[cc.SpriteFrame],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        AD.Texture = this;
    },

    start () {

    },

    // update (dt) {},
});
