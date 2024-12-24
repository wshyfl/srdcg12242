

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {

    },

    start () {
        this.scheduleOnce(this.nodeDestroy,8)
    },

    update (dt) {},
    nodeDestroy(){
        AD.jczxt.onCreatCoin()
        this.node.destroy();
    },
    onUnschedule(){
       this.unschedule(this.nodeDestroy);
    }
});
