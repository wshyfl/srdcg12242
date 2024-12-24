

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
    onCollisionEnter(other, self) {
        AD.sound.playSfx("打手背");
        AD.kxddk.isHit = true;
        if(AD.kxddk.isRedAtt){
            AD.kxddk.onGameOver("红色");
            AD.kxddk.handBlue.getChildByName("shangHen").active = true;
            AD.kxddk.blueInjury+=0.2;
            AD.kxddk.handBlue.getChildByName("shangHen").scale = AD.kxddk.blueInjury;
        }
        else{
            AD.kxddk.onGameOver("蓝色")
            AD.kxddk.handRed.getChildByName("shangHen").active = true
            AD.kxddk.redInjury+=0.2;
            AD.kxddk.handRed.getChildByName("shangHen").scale = AD.kxddk.redInjury;
        }
    }
});
