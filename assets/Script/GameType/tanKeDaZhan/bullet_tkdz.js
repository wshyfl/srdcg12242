

cc.Class({
    extends: cc.Component,

    properties: {
        btImg: [cc.SpriteFrame]
    },

    onLoad() {
        this.Speed = 6;
    },

    start() {
        
    },
    reset(_angle, _playerIndex) {
        this.node.type = _playerIndex
        if(_playerIndex == "red"){
            this.node.getChildByName("tuoWei1").getComponent(cc.Sprite).spriteFrame = this.btImg[1];
        }
        else{
            this.node.getChildByName("tuoWei1").getComponent(cc.Sprite).spriteFrame = this.btImg[0];
        }
        this.node.angle = _angle;
        this.initPos=this.node.position;
    },

    update(dt) {
        this.node.x+=this.Speed*Math.sin(-Tools.angleToRadian(this.node.angle));
        this.node.y+=this.Speed*Math.cos(-Tools.angleToRadian(this.node.angle));
        if(Tools.getDistance(this.node,this.initPos)>400){
            AD.sound.playSfx("爆炸");
            var bomb =cc.instantiate(AD.Game.bombPre);
            bomb.parent=this.node.parent;
            bomb.position = this.node.position
            this.node.destroy()
        }
    },
    onBomb() {
        
    },

    onBeginContact(contact, selfCollider, otherCollider) {//  
        if(otherCollider.node.name == "woodenBox"){
            AD.sound.playSfx("爆炸");
            otherCollider.node.destroy();
        }
        else if(otherCollider.node.name == "blueTank"){
            if(this.node.type == "red"){
                AD.sound.playSfx("打中坦克");
                otherCollider.node.getComponent("tankBlue_tkdz").onBlueBeHit();
            }
            else{
                return
            }
        }
        else if(otherCollider.node.name == "redTank"){
            if(this.node.type == "red"){
                return
            }
            else{
                AD.sound.playSfx("打中坦克");
                otherCollider.node.getComponent("tankRed_tkdz").onRedBeHit();
                
            }
        }
        else if(otherCollider.node.name == "playerBt_tank"){
            return
        }
        
        var bomb =cc.instantiate(AD.Game.bombPre);
        bomb.parent=this.node.parent;
        bomb.position = this.node.position
        selfCollider.node.destroy();
    },
    onCollisionExit(other, self) {
        
    },
});
