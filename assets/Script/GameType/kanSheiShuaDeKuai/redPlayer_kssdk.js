

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.node.Speed = 3;
    },

    start () {

    },

    update (dt) {
        this.node.getChildByName("speedText").angle = -this.node.angle;
    },
    onPlayerMove(state){
        if(state =="走"){
            this.node.getChildByName("player").getComponent(cc.Animation).play("playerMove",0)
        }
        else{
            this.node.getChildByName("player").getComponent(cc.Animation).play("playerStand",0)
        }
    },
    onCreatRed(_parent){
        var red = cc.instantiate(AD.kssdk.redPre);
        red.parent = _parent; 
        red.active = true;
    },
    onAddSpeed(){
        AD.sound.playSfx("得分");
        this.node.Speed = 4;
        var speedText = this.node.getChildByName("speedText");
        speedText.active = true
        speedText.y = 0;
        speedText.opacity = 255;
        cc.tween(speedText)
        .to(0.4,{y:25})
        .to(0.4,{y:50,opacity:0})
        .start()
        this.scheduleOnce(function(){
            this.node.Speed = 3;
            this.node.getChildByName("speedText").active = false
        },5)
    },
    onCollisionEnter(other,self){
        if(other.node.name == "kuai"){
            if(other.node.type ==undefined){
                other.node.type = "red";
                AD.kssdk.onAddScore("red");
                this.onCreatRed(other.node);
            }
            else if(other.node.type =="blue"){
                other.node.type = "red";
                AD.kssdk.onAddScore("red");
                other.node.removeAllChildren()
                this.onCreatRed(other.node);
            }
            else{

            }
        }
        else if(other.node.name == "buff"){
            other.node.destroy();
            this.onAddSpeed()
            this.scheduleOnce(function(){
                AD.kssdk.onCreatBuff();
            },5)
        }
    },
});
