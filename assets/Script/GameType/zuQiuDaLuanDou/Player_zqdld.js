

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad () {

    },

    start () {

    },

    update (dt) {
        
    },
    onPlayerMove(state) {
        if (state == "走") {
            this.node.getChildByName("player").getComponent(cc.Animation).play("playerMove", 0);
           
        }
        else {
            this.node.getChildByName("player").getComponent(cc.Animation).play("playerStand", 0);
            
        }
    },
    onCollisionEnter(other, self) {
        if(other.node.name == "ball"){
            this.ballNode = other.node;
        }
    },
    onCollisionExit(other, self) {
        if(other.node.name == "ball"){
            this.ballNode = null;
        }
    },
    /**设置足球身上的力 */
    onSetBallForce(){
        if(this.ballNode){
            
            var force = cc.v2(1000*Math.sin(-Tools.angleToRadian(this.node.angle)),1000*Math.cos(-Tools.angleToRadian(this.node.angle)));
            this.ballNode.getComponent(cc.RigidBody).applyLinearImpulse(force,
                this.ballNode.getComponent(cc.RigidBody).getWorldCenter(), true);
            this.ballNode.getComponent("ball_zqdld").playerNode = null;
            this.ballNode = null;
        }
    }
});
