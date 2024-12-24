cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        
        this.haveChicken = false;
    },

    start() {

    },

    update(dt) {
        if(this.node.name == "bluePlayer"){
            if(!AD.isAI) return
            if(this.node.y>345){
                if(this.haveChicken){
                    this.node.getChildByName("player").getChildByName("chicken").active = false;
                    this.haveChicken = false;
                    AD.xjzdz.onAddScore("蓝"); 
                    var chicken = cc.instantiate(AD.xjzdz.chickenPre);
                    chicken.parent = AD.xjzdz.bluePanel;
                    chicken.active = true;
                    chicken.position =cc.v2(0,0);
                    chicken.scale = 0.5
                    chicken.beCaught =true
                }
            }
            
        }
    },
    onPlayerMove(state){
        if(state =="走"){
            this.node.getChildByName("player").getComponent(cc.Animation).play("playerMove",0)
        }
        else{
            this.node.getChildByName("player").getComponent(cc.Animation).play("playerStand",0)
        }
    },
    onBeginContact(contact, selfCollider, otherCollider) {
        
        if (otherCollider.node.name == "redPanel") {
            if(this.node.name == "bluePlayer"){
                if(AD.isAI) return
            }
            if(this.haveChicken){
                this.node.getChildByName("player").getChildByName("chicken").active = false;
                this.haveChicken = false;
                AD.xjzdz.onAddScore("红"); 
                var chicken = cc.instantiate(AD.xjzdz.chickenPre);
                chicken.parent = otherCollider.node;
                chicken.active = true;
                chicken.position =cc.v2(0,0);
                chicken.scale = 0.5
                chicken.beCaught =true
            }
        }
        else if (otherCollider.node.name == "bluePanel") {
            if(this.node.name == "bluePlayer"){
                if(AD.isAI) return
            }
            if(this.haveChicken){
                this.node.getChildByName("player").getChildByName("chicken").active = false;
                this.haveChicken = false;
                AD.xjzdz.onAddScore("蓝"); 
                var chicken = cc.instantiate(AD.xjzdz.chickenPre);
                chicken.parent = otherCollider.node;
                chicken.active = true;
                chicken.position =cc.v2(0,0);
                chicken.scale = 0.5
                chicken.beCaught =true
            }
        }
        else if (otherCollider.node.name == "chicken") {
            if (!this.haveChicken) {
                if(otherCollider.node.beCaught) return
                AD.sound.playSfx("鸡叫")
                this.haveChicken = true;
                this.node.getChildByName("player").getChildByName("chicken").active = true;
                otherCollider.node.destroy()
            }
        }
    }
});
