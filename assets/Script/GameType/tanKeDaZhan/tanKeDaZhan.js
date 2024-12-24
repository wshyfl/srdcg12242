

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPre:cc.Prefab,
        daoHengPrefab:cc.Prefab,
    },

    onLoad () {
        AD.tkdz = this;
        this.redTank = cc.find("bg/redTank",this.node);
        this.blueTank = cc.find("bg/blueTank",this.node); 
        this.redScore = cc.find("redScore",this.node).getComponent(cc.Label);
        this.blueScore = cc.find("blueScore",this.node).getComponent(cc.Label);
        this.redHp = cc.find("redHp",this.node).children;
        this.blueHp = cc.find("blueHp",this.node).children;
        if(AD.isAI){
            cc.find("Control/blueControl",this.node).active = false;
            cc.find("Control/blueJoystickBg",this.node).active = false;
        }
        cc.find("Control/blueControl",this.node).y=AD.height/4;
        cc.find("Control/blueControl",this.node).height=AD.height/2;
        cc.find("Control/redControl",this.node).y=-AD.height/4;
        cc.find("Control/redControl",this.node).height=AD.height/2;
        this.GameStart = false;
        this.notMove = false
    },

    start () {
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update (dt) {

    },
    onGameStart(){
        this.GameStart = true;
        
    },
    onGameOver(str){
        AD.Game.overGame(str)
    }
});
