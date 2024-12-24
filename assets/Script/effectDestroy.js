

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        if(this.node.name == "ef_baoZha"){
            this.scheduleOnce(function(){
                this.node.destroy();
            },1)
        }
    },

    start () {

    },

    update (dt) {},
});
