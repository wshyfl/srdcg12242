

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

    },

    start() {

    },

    update(dt) {
        if (this.node.y <= -540) {
            AD.sound.playSfx("得分");
            AD.zmqgq.onGameOver("蓝色");
            var eff = cc.instantiate(AD.zmqgq.ballEff)
            eff.parent = this.node.parent;
            eff.position = this.node.position;
            this.node.destroy();
        }
        else if (this.node.y >= 540) {
            AD.sound.playSfx("得分");
            AD.zmqgq.onGameOver("红色");
            var eff = cc.instantiate(AD.zmqgq.ballEff)
            eff.parent = this.node.parent;
            eff.position = this.node.position;
            this.node.destroy();
        }
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        AD.sound.playSfx("桌球");
        if (otherCollider.node.name == "red") {
            this.node.getComponent(cc.RigidBody).applyLinearImpulse(AD.zmqgq.redForce,
                this.node.getComponent(cc.RigidBody).getWorldCenter(), true);

        }
        else if (otherCollider.node.name == "blue") {
            if (AD.isAI) {
                var worldManifold = contact.getWorldManifold();
                var normal = worldManifold.normal;
                AD.zmqgq.blueForce = cc.v2(-normal.x * 3000, -normal.y * 3000)
            }
            this.node.getComponent(cc.RigidBody).applyLinearImpulse(AD.zmqgq.blueForce,
                this.node.getComponent(cc.RigidBody).getWorldCenter(), true);

        }
    },
});
