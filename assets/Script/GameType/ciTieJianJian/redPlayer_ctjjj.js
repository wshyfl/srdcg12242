

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad() {
        this.haveCoin = false;
        this.canAbsorb = false;
        this.coinNode = null;
       
    },

    start() {

    },

    update(dt) {
        
        if (this.coinNode) {
            var posWorld = this.node.convertToWorldSpaceAR(this.node.getChildByName("point"));
            this.coinNode.position = cc.v2(posWorld.x - 360, posWorld.y - AD.height / 2);
            this.coinNode.angle = this.node.angle-180;
        }
        
    },
    onPlayerMove(state) {
        if (state == "走") {
            this.node.getComponent(cc.Animation).play("playerMove", 0);
            this.canAbsorb = true
        }
        else {
            this.node.getComponent(cc.Animation).play("playerStand", 0);
            this.canAbsorb = false;
            if (this.haveCoin) {
                this.haveCoin = false;
                this.coinNode.getComponent(cc.PhysicsPolygonCollider).enabled = true;
                this.coinNode = null;
            }
        }
    },
    onCollisionEnter(other, self) {
        if (!this.canAbsorb) return
        if (other.node.name == "coin" || other.node.name == "bomb") {
            if (!this.haveCoin) {
                this.haveCoin = true;
                this.coinNode = other.node;
                other.node.getComponent(cc.PhysicsPolygonCollider).enabled = false;
                if(this.node.name == "bluePlayer"){
                    if(other.node.name == "bomb"){
                        if(Math.random()>0.2){
                            if (this.haveCoin) {
                                
                                this.haveCoin = false;
                                this.coinNode.getComponent(cc.PhysicsPolygonCollider).enabled = true;
                                this.coinNode.setSiblingIndex(2);
                                this.coinNode = null;
                            }
                        }
                    }
                }
            }
        }
        else if (other.node.name == "Red") {
            if (this.haveCoin) {
                this.haveCoin = false;
                if (this.coinNode.type == "炸弹") {
                    AD.ctjjj.onAddScore("红", -8);
                    this.onTip("red","-8")
                }
                else if (this.coinNode.type == "金币") {
                    AD.ctjjj.onAddScore("红", 5);
                    this.onTip("red","+5")
                }
                else {
                    AD.ctjjj.onAddScore("红", 3);
                    this.onTip("red","+3")
                }
                this.coinNode.destroy();
                this.coinNode = null;
                AD.ctjjj.onUpdataCoin();
            }
        }
        else if (other.node.name == "Blue") {
            if (this.haveCoin) {
                this.haveCoin = false;
                if (this.coinNode.type == "炸弹") {
                    AD.ctjjj.onAddScore("蓝", -8);
                    this.onTip("蓝","-8")
                }
                else if (this.coinNode.type == "金币") {
                    AD.ctjjj.onAddScore("蓝", 5);
                    this.onTip("蓝","+5")
                }
                else {
                    AD.ctjjj.onAddScore("蓝", 3);
                    this.onTip("蓝","+3")
                }
                this.coinNode.destroy();
                this.coinNode = null;
                AD.ctjjj.onUpdataCoin();
            }
        }
    },
    onCollisionExit(other, self) {
        if (!this.canAbsorb) return
        if (other.node.name == "coin" || other.node.name == "bomb") {
            if (this.haveCoin) {
                if (other.node != this.coinNode) return
                this.haveCoin = false;
                this.coinNode.getComponent(cc.PhysicsPolygonCollider).enabled = true
                this.coinNode = null;
            }
        }
    },
    onTip(type,num){
        if(type == "red"){
            var tip =cc.instantiate(AD.ctjjj.tip[0])
            tip.parent = this.node.parent.parent;
            tip.active = true;
            tip.getComponent(cc.Label).string = num;
            cc.tween(tip)
            .by(0.5,{y:100,opacity:-100})
            .call(function(){
                tip.destroy()
            })
            .start()
        }
        else{
            var tip =cc.instantiate(AD.ctjjj.tip[1])
            tip.parent = this.node.parent.parent;
            tip.active = true;
            tip.getComponent(cc.Label).string = num;
            cc.tween(tip)
            .by(0.5,{y:-100,opacity:-100})
            .call(function(){
                tip.destroy()
            })
            .start()
        }
        
    }
});
