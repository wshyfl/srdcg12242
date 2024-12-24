

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
       
        this.Speed=3.5;
        this.AiTime = 0;
        this.tempAngle = 0;

    },

    start () {

    },

    update (dt) {
       if(AD.Game.GameOver) return 
        this.onAI()
    },
    onAI(){
        
        if(AD.Game.GameOver) return;
        if(!AD.jczxt.GameStart) return;
        if (!AD.isAI) return
        
        if(AD.jczxt.redIdentity == "警察"){
            this.AiTime++;
            if(this.AiTime%60 == 0){
                this.tempAngle=0
            }
            for(var i=0;i<AD.jczxt.coinPanel.children.length;i++){
                if(this.tempAngle == 0){
                    this.tempAngle = Tools.getAngle(AD.jczxt.coinPanel.children[0],this.node);
                }
                this.node.getChildByName("img").angle = this.tempAngle; 
                this.node.x+=this.Speed*Math.sin(-Tools.angleToRadian(this.tempAngle));
                this.node.y+=this.Speed*Math.cos(-Tools.angleToRadian(this.tempAngle));
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
        }
        
    },
    onBeginContact (contact, selfCollider, otherCollider) {
        if(AD.Game.GameOver) return
        switch(otherCollider.node.name){
            case "police":
                
                AD.jczxt.onGameOver("警察");
            break
           
            case "coin":
                
            break
            case "box":
                this.tempAngle+=Tools.random(90,180)
            break
            
        }
    },
    onCollisionEnter(other,self){
        if(other.tag == 1){
            AD.sound.playSfx("发抖");
            cc.director.emit("小偷减速","减速")
            if (AD.isAI) {
                if(AD.jczxt.redIdentity == "警察"){
                    this.node.getChildByName("img").getChildByName("han").active = true;
                    this.Speed = 3;
                }
            }
        }
        else{
            AD.sound.playSfx("得金币");
            this.node.getChildByName("eatCoinEff").active = true;
            this.node.getChildByName("eatCoinEff").getChildByName("New Node").getComponent(cc.Animation).play("effect_chiJinBi",0);
            other.node.getComponent("coin_jczxt").onUnschedule();
            other.node.destroy();
            AD.jczxt.onCreatCoin();
            AD.jczxt.thiefCoin++;
            AD.jczxt.onAddCoin()
            if(AD.jczxt.thiefCoin >= 3){
                AD.jczxt.onGameOver("小偷");
            }
        }
    },
    onCollisionExit(other,self){
        if(other.tag == 1){
            AD.sound.playSfx("停止发抖");
            cc.director.emit("小偷减速","恢复")
            if (AD.isAI) {
                if(AD.jczxt.redIdentity == "警察"){
                    this.node.getChildByName("img").getChildByName("han").active = false;
                    this.Speed = 3.5;
                }
            }
        }
    }
});
