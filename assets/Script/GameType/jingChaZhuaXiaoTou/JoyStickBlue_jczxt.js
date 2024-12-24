cc.Class({
    extends: cc.Component,

    properties: {

        joyNode: cc.Node,
        thief:cc.Node,
        police:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.rot = 0;
        this.player = this.thief;;
        this.maxSpeed = 0,
            // get joyStickBtn
        this.joyStickBtn = this.joyNode.children[0];
        // Player's move direction
        this.dir = cc.v2(0, 0);
        this.isRun = false;
    },

    start() {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
        if(AD.jczxt.redIdentity == "小偷"){
            this.player = this.police;
            this.maxSpeed = 3;
            this.Spine = this.player.getChildByName("img").getChildByName("img").getComponent(sp.Skeleton)
        }
        else{
            this.player = this.thief;
            this.maxSpeed = 3.5;
            this.Spine = this.player.getChildByName("img").getChildByName("img").getComponent(sp.Skeleton);
            this.thief_han = this.player.getChildByName("img").getChildByName("han")
        }
       
        cc.director.on("小偷减速", function (e) {
            
            if (this.player != this.thief) return
            if (e == "减速") {
                this.maxSpeed = 3;
                this.thief_han.active = true;
                console.log("减速")
            }
            else {
                this.maxSpeed = 3.5;
                this.thief_han.active = false;
            }
        }, this)
    },
    onDestroy() {
        // touch event
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },

    onTouchStart(event) {
        let pos = cc.v2(event.getLocation().x - AD.width / 2, event.getLocation().y - AD.height / 2)
        this.joyNode.setPosition(pos);
        this.dir = this.joyStickBtn.position.normalize();
        var rot = Tools.radianToAngle(Tools.getRadian(cc.v2(0, 0), this.dir)) + 180;
    },

    onTouchMove(event) {
        // constantly change joyStickBtn's position
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));
        // get direction
        this.dir = this.joyStickBtn.position.normalize();
        this.rot = Tools.radianToAngle(Tools.getRadian(cc.v2(0, 0), this.dir)) + 180;
        this.player.getChildByName("img").angle = this.rot;
        if(!this.isRun){
            this.isRun = true;
            this.Spine.setAnimation(0,"pao",true)
        }
    },

    onTouchEnd(event) {
        this.joyStickBtn.setPosition(cc.v2(0, 0));
        this.isRun = false;
        this.Spine.setAnimation(0,"daiji",true)
    },

    onTouchCancel(event) {
        this.joyStickBtn.setPosition(cc.v2(0, 0));
        this.isRun = false;
        this.Spine.setAnimation(0,"daiji",true)
    },

    update(dt) {
        if (!AD.jczxt.GameStart) return
        if (AD.Game.GameOver) return
        let len = this.joyStickBtn.position.mag();
        let maxLen = this.joyNode.width / 4;
        let ratio = len / maxLen;

        // restrict joyStickBtn inside the joyStickPanel
        if (ratio > 1) {
            this.joyStickBtn.setPosition(this.joyStickBtn.position.div(ratio));
        }
        if (ratio > 0)
            ratio = 1
        // move Player
        let dis = this.dir.mul(this.maxSpeed * ratio);
        this.player.setPosition(this.player.position.add(dis));
        if(this.player.x>340){
            this.player.x=340;
        }
        else if(this.player.x<-340){
            this.player.x=-340
        }
        if(this.player.y>AD.height/2-30){
            this.player.x=AD.height/2-30;
        }
        else if(this.player.x<-AD.height/2+30){
            this.player.x=-AD.height/2+30;
        }
    },

});
