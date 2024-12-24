cc.Class({
    extends: cc.Component,

    properties: {
        player:cc.Node,
        joyNode: cc.Node,
    },

    onLoad () {
        this.rot = 0;
        this.joyStickBtn = this.joyNode.children[0];
        // Player's move direction
        this.dir = cc.v2(0, 0);
        this.angleRate = 600;
        this.maxSpeed = 3;
       
    },

    start () {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);
    },

    update (dt) {
        if (AD.Game.GameOver) return
        let len = this.joyStickBtn.position.mag();
        let maxLen = this.joyNode.width / 4;
        let ratio = len / maxLen;

        if (ratio > 1) {
            this.joyStickBtn.setPosition(this.joyStickBtn.position.div(ratio));
        }
        if (ratio > 0)
            ratio = 1
        // move Player

        let dis = this.dir.mul(this.maxSpeed * ratio);
        this.player.setPosition(this.player.position.add(dis));
        
        
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
        this.player.getChildByName("player").getComponent("redPlayer_ctjjj").onPlayerMove("走");
    },

    onTouchMove(event) {
        // constantly change joyStickBtn's position
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));
        // get direction
        this.dir = this.joyStickBtn.position.normalize();
        this.player.getChildByName("player").angle = Tools.getAngle(this.joyStickBtn,cc.v2(0,0))+180
    },

    onTouchEnd(event) {
        // reset
        this.joyStickBtn.setPosition(cc.v2(0, 0));
        this.player.getChildByName("player").getComponent("redPlayer_ctjjj").onPlayerMove("站立");
    },

    onTouchCancel(event) {
        this.joyStickBtn.setPosition(cc.v2(0, 0));
        this.player.getChildByName("player").getComponent("redPlayer_ctjjj").onPlayerMove("站立");
    },
    
});
