

cc.Class({
    extends: cc.Component,

    properties: {
        Player:cc.Node,
        joyNode: cc.Node,
    },

    onLoad () {
        this.rot = 0;
        this.joyStickBtn = this.joyNode.children[0];
        // Player's move direction
        this.dir = cc.v2(0, 0);
        this.maxSpeed = 3;
        this.angleRate = 600;
       
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
        this.Player.setPosition(this.Player.position.add(dis));
        
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
        this.Player.getComponent("Player_zqdld").onPlayerMove("走");
    },

    onTouchMove(event) {
        // constantly change joyStickBtn's position
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));
        // get direction
        this.dir = this.joyStickBtn.position.normalize();
        this.rot = Tools.getAngle(cc.v2(0, 0), this.dir);
        this.Player.angle = Tools.getAngle(this.joyStickBtn,cc.v2(0,0))
    },

    onTouchEnd(event) {
        // reset
        this.joyStickBtn.setPosition(cc.v2(0, 0));
        this.Player.getComponent("Player_zqdld").onPlayerMove("待机");
        this.Player.getComponent("Player_zqdld").onSetBallForce();
    },

    onTouchCancel(event) {
        this.joyStickBtn.setPosition(cc.v2(0, 0));
        this.Player.getComponent("Player_zqdld").onPlayerMove("待机");
        this.Player.getComponent("Player_zqdld").onSetBallForce();
    },
});
