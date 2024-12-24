

cc.Class({
    extends: cc.Component,

    properties: {
        shang:cc.Node,
        xia:cc.Node,
    },

    onLoad() {
        var typeRandom = Math.random();
        if (typeRandom < 0.2) {
            this.type = "纸币";
            this.node.getComponent(cc.Sprite).spriteFrame = AD.qswd.coinImgs[1];
        }
        else {
            this.type = "金币";
            this.node.getComponent(cc.Sprite).spriteFrame = AD.qswd.coinImgs[0];
        }
        this.handArray = new Array();
        this.touchs = new Array();
        this.sumY = 0;
        this.joinIn = false;
        this.inHalf = false
    },

    start() {
        this.onInit();
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        
    },

    update(dt) {
        if (this.joinIn) return
        if (this.inHalf) return
        for (var i = 0; i < this.touchs.length; i++) {
            var posY = (this.touchs[i].getLocationY() - AD.height / 2) - this.node.y;
            this.node.y += posY * dt;
            var posX = (this.touchs[i].getLocationX() - 360) - this.node.x;
            this.node.x += posX * dt;

            if(Tools.getDistance(cc.v2(this.touchs[i].getLocationX() - 360, this.touchs[i].getLocationY() - AD.height / 2), this.node)-36<=0){
                this.node.children[i].getChildByName("xian").height = 0
            }
            else{
                this.node.children[i].getChildByName("xian").height = 
                Tools.getDistance(cc.v2(this.touchs[i].getLocationX() - 360, this.touchs[i].getLocationY() - AD.height / 2), this.node)-36;
            }
            if (this.type == "纸币") {
                if (i < this.touchs.length - 1 ) {
                    
                    if (this.onHandAngeleCallBack(this.node.children[i]) != this.onHandAngeleCallBack(this.node.children[i + 1])) {

                        this.node.scaleY += 0.01;
                        if (this.node.scaleY > 1.2) {
                            this.inHalf = true;
                            var self = this;
                            this.node.active = false;
                            var top=cc.instantiate(this.shang);
                            top.parent =this.node.parent;
                            top.active=true
                            top.position = cc.v2(this.node.x,this.y+53)

                            cc.tween(top)
                            .to(1,{y:500,opacity:100})
                            .call(function(){
                                self.node.destroy()
                                top.destroy()
                                cc.director.emit("进钱袋", "蓝色","金币")
                            })
                            .start()
                            var bom=cc.instantiate(this.xia);
                            bom.parent =this.node.parent;
                            bom.position = cc.v2(this.node.x,this.y-53)
                            bom.active=true
                            cc.tween(bom)
                            .to(1,{y:-500,opacity:100})
                            .call(function(){
                                bom.destroy()
                                cc.director.emit("进钱袋", "红色","金币")
                            })
                            .start()
                            
                        }
                    }
                    else {
                        this.node.scaleY = 1
                    }
                }
            }
        }
        if (this.node.y > 280) {
            this.joinIn = true;
            var self = this;
            cc.tween(this.node)
            .to(0.2, { position: cc.v2(0, 450) })
            .call(function () {
                cc.director.emit("进钱袋", "蓝色", self.type);
                self.node.destroy();
            })
            .start()
            this.node.removeAllChildren()
        }
        else if (this.node.y < -280) {
            this.joinIn = true;
            var self = this;
            cc.tween(this.node)
            .to(0.2, { position: cc.v2(0, -450) })
            .call(function () {
                cc.director.emit("进钱袋", "红色", self.type);
                self.node.destroy();
            })
            .start()
            this.node.removeAllChildren()
        }
    },
    /**初始化 */
    onInit() {
        var moveRandom = Math.random();
        var _y = 10;
        if (moveRandom < 0.5) {
            _y = -10;
        }

        cc.tween(this.node)
            .by(0.2, { y: _y }, { easing: "sineOut" })
            .start()
    },
    onTouchStart(e) {
        AD.sound.playSfx("按钮");
        var hand = cc.instantiate(AD.qswd.handPre);
        hand.parent = this.node;
        hand.active = true;
        hand._index = e.getID();
        this.touchs.push(e);
        hand.position = cc.v2(e.getLocationX() - 360 - this.node.x, e.getLocationY() - AD.height / 2 - this.node.y);
    },
    onTouchMove(e) {
        let _x = e.getLocationX() - 360;
        let _y = e.getLocationY() - AD.height / 2;
        this.sumY = 0;
        for (var i = 0; i < this.node.children.length; i++) {
            if (this.node.children[i]._index == e.getID()) {
                this.node.children[i].angle = Tools.getAngle(cc.v2(_x, _y), this.node) - 180;
                if (this.node.children[i].angle >= -90 && this.node.children[i].angle < 90) {
                    this.node.children[i].getComponent(cc.Sprite).spriteFrame = AD.qswd.handImgs[0];
                    this.node.children[i].getChildByName("xian").getComponent(cc.Sprite).spriteFrame = AD.qswd.handXianImgs[0];
                }
                else {
                    this.node.children[i].getComponent(cc.Sprite).spriteFrame = AD.qswd.handImgs[1];
                    this.node.children[i].getChildByName("xian").getComponent(cc.Sprite).spriteFrame = AD.qswd.handXianImgs[1];
                }
                
            }
        }

    },
    onTouchEnd(e) {

        for (var i = 0; i < this.node.children.length; i++) {
            if (this.node.children[i]._index == e.getID()) {
                this.node.children[i].destroy();
                
                
            }
        }
        for(var j = 0; j < this.touchs.length; j++){
            if(this.touchs[j].getID()==e.getID()){
                this.touchs.splice(j, 1);
            }
        }
    },
    onTouchCancel(e) {
        for (var i = 0; i < this.node.children.length; i++) {
            if (this.node.children[i]._index == e.getID()) {
                this.node.children[i].destroy();
                
            }
        }
        for(var j = 0; j < this.touchs.length; j++){
            if(this.touchs[j].getID()==e.getID()){
                this.touchs.splice(j, 1);
            }
        }
    },
    onHandAngeleCallBack(node) {
        if (node.angle >= -90 && node.angle < 90)
            return true
        else
            return false
    }
});
