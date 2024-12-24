cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.node.beCaught =false;
        this.tempAngle = 0;
        this.isJin = 0
        this.isJin1 = 0;
        this.isCollide = 0;
    },

    start() {
        this.tempAngle = Tools.random(0, 360);
        
    },

    update(dt) {
        if(!AD.xjzdz.GameStart) return
        this.onMove()
        this.isJin-=dt;
        this.isJin1 -= dt
        this.isCollide -=dt
        this.node.x+=2.5*Math.sin(Tools.angleToRadian(this.tempAngle))
        this.node.y+=2.5*Math.cos(Tools.angleToRadian(this.tempAngle))
        this.node.angle = -this.tempAngle;


    },
    onBeginContact(contact, selfCollider, otherCollider){
        if(otherCollider.node.name == "bg" || otherCollider.node.name == "redPanel" || otherCollider.node.name == "bluePanel"){
            if(this.isCollide<=0){
                this.isCollide = 2
                this.tempAngle += 180;
            }
        }
    },
    onMove(){
        if(Tools.getDistance(this.node,AD.xjzdz.redPlayer)<150){
            
            if(this.isJin<=0){
                this.isJin = 1;
                this.tempAngle = Tools.getAngle(this.node,AD.xjzdz.redPlayer)+ Tools.random(60,120);
            }
        }
        
        if(Tools.getDistance(this.node,AD.xjzdz.bluePlayer)<150){
            if(this.isJin1<=0){
                this.isJin1 = 1;
                this.tempAngle = Tools.getAngle(this.node,AD.xjzdz.bluePlayer)+ Tools.random(60,120);
            }
            
          
        }
       
    }
});
