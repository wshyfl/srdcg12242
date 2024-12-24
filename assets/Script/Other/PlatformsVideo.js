

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {},

    start () {
        if(AD.chanelName1 == "TT"){
            this.node.getComponent(cc.Sprite).spriteFrame = AD.Texture.videoImg[1];
        }
        else{
            this.node.getComponent(cc.Sprite).spriteFrame = AD.Texture.videoImg[0];
        }
    },

    // update (dt) {},
});
