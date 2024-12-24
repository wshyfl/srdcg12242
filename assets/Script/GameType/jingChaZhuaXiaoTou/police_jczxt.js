
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.AiTime = 0;
        this.tempAngle = 180;
    },

    start () {

    },

    update (dt) {
        this.onAI()
    },
    /**AI */
    onAI() {
        if(AD.Game.GameOver) return;
        if(!AD.jczxt.GameStart) return;
        if (!AD.isAI) return
        
        if(AD.jczxt.redIdentity == "小偷"){
            this.AiTime++;
            if(this.AiTime%250 == 0){
                this.tempAngle = Tools.random(0,360)
            }
            else if(this.AiTime%100 == 0){
                this.tempAngle =Tools.getAngle(this.node,AD.jczxt.thief)+180;
            }
            this.node.x+=2.5*Math.sin(-Tools.angleToRadian(this.tempAngle));
            this.node.y+=2.5*Math.cos(-Tools.angleToRadian(this.tempAngle));
            this.node.getChildByName("img").angle = this.tempAngle; 
            if(this.node.x>340){
                this.node.x=340;
                this.tempAngle+=Tools.random(90,180);
            }
            else if(this.node.x<-340){
                this.node.x=-340;
                this.tempAngle+=Tools.random(90,180);
            }
            if(this.node.y>AD.height/2-30){
                this.node.y=AD.height/2-30;
                this.tempAngle+=Tools.random(90,180);
            }
            else if(this.node.y<-AD.height/2+30){
                this.node.x=-AD.height/2+30;
                this.tempAngle+=Tools.random(90,180);
            }
        }
    },
    onBeginContact (contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == "box"){
            this.tempAngle+=Tools.random(90,180);
        }
    }
});
