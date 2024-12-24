
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {

    },

    start () {

    },

    update (dt) {
        if (this.playerNode) {
            var posWorld = this.playerNode.convertToWorldSpaceAR(this.playerNode.getChildByName("point"));
            this.node.position = cc.v2(posWorld.x - 360, posWorld.y - AD.height / 2);
            this.node.angle = this.playerNode.angle;
        }
    },
    onCollisionEnter(other, self) {
        if(this.playerNode)
        this.playerNode.getComponent("Player_zqdld").ballNode = null;
        this.playerNode = other.node;
        if(other.node.name == "redSmy" || other.node.name == "blueSmy"){
            self.enabled = false;
            this.scheduleOnce(function(){
               
                if(other.node.name == "redSmy"){
                    var r=Tools.random(-60,60)
                    var force=cc.v2(1000*Math.sin(-Tools.angleToRadian(r)),1000*Math.cos(-Tools.angleToRadian(r)));
                }
                else{
                    var r=Tools.random(210,330)
                    var force=cc.v2(1000*Math.sin(-Tools.angleToRadian(r)),1000*Math.cos(-Tools.angleToRadian(r)));
                }
                self.enabled = true;
                this.node.getComponent(cc.RigidBody).applyLinearImpulse(force,
                    this.node.getComponent(cc.RigidBody).getWorldCenter(), true);
                this.playerNode = null;
            },1)
        }
    },
    onCollisionExit(other, self) {
        this.playerNode = null;
        
    },
});
