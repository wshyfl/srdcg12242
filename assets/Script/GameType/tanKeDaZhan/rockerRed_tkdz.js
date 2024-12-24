cc.Class({
    extends: cc.Component,

    properties: {
        tank:cc.Node,
        joyNode: cc.Node,
    },

    onLoad () {
        this.rot = 0;
        this.joyStickBtn = this.joyNode.children[0];
        // Player's move direction
        this.dir = cc.v2(0, 0);
        this.maxSpeed = 3;
        this.angleRate = 600;
        this.isShoot =true;
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
        this.tank.setPosition(this.tank.position.add(dis));
        this.resetAngle(this.rot,dt)
        // this.tank.angle += (this.rot-this.tank.angle)/10;
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
        
    },

    onTouchMove(event) {
        // constantly change joyStickBtn's position
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));
        // get direction
        this.dir = this.joyStickBtn.position.normalize();
        this.rot = Tools.getAngle(cc.v2(0, 0), this.dir);
        if(this.isShoot){
            this.isShoot = false;
            this.tank.canShoot = false
        }
    },

    onTouchEnd(event) {
        // reset
        this.joyStickBtn.setPosition(cc.v2(0, 0));
        this.isShoot = true;
        this.tank.canShoot = true
    },

    onTouchCancel(event) {
        this.joyStickBtn.setPosition(cc.v2(0, 0));
        this.isShoot = true;
        this.tank.canShoot = true
    },
    resetAngle(_angleTarget, dt) {

        if (Math.abs(_angleTarget - this.tank.getChildByName("body").angle) < 180) {
            if (this.tank.getChildByName("body").angle - _angleTarget < -this.angleRate * dt)
                this.tank.getChildByName("body").angle += this.angleRate * dt;
            else if (this.tank.getChildByName("body").angle - _angleTarget > this.angleRate * dt)
                this.tank.getChildByName("body").angle -= this.angleRate * dt;
            else
                this.tank.getChildByName("body").angle = _angleTarget;
        }
        else {
            if (this.tank.getChildByName("body").angle >= 360)
                this.tank.getChildByName("body").angle -= 360;
            else if (this.tank.getChildByName("body").angle < 0)
                this.tank.getChildByName("body").angle += 360;

            if (this.tank.getChildByName("body").angle - _angleTarget > this.angleRate * dt)
                this.tank.getChildByName("body").angle += this.angleRate * dt;
            else if (this.tank.getChildByName("body").angle - _angleTarget < -this.angleRate * dt)
                this.tank.getChildByName("body").angle -= this.angleRate * dt;
            else
                this.tank.getChildByName("body").angle = _angleTarget;
        }
    },
});
