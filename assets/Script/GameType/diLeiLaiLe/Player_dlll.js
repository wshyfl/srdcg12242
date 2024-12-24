

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.node.isCollide = false;
    },

    start () {

    },

    update (dt) {

    },
    onPlayerMove(state){
        if(state =="走"){
            this.node.getChildByName("player").getComponent(cc.Animation).play("playerMove",0)
        }
        else{
            this.node.getChildByName("player").getComponent(cc.Animation).play("playerStand",0)
        }
    },
    // 只在两个碰撞体开始接触时被调用一次
    onCollisionStay: function (other, self) {
        if(other.node.name == "bomb"){
            this.node.isCollide = true;
        }
    },

    // 只在两个碰撞体结束接触时被调用一次
    onCollisionExit: function (other, self) {
        if(other.node.name == "bomb"){
            this.node.isCollide = false;
        }
    },
});
