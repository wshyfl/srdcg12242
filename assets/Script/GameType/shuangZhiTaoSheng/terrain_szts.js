

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.PosXArray = [0,-1240,620,1240,620]
    },

    start() {
        
    },

    update(dt) {
        if(AD.Game.GameOver) return
        if (AD.szts.GameStart) {
            this.node.x += AD.szts.Speed;
            if (this.node.x >= 2365) {
                this.node.destroy()
            }
        }
    },
    onRandomTerrain(){
        Tools.ArrayRandom(this.PosXArray);
        for(var i =0;i<5;i++){
            this.node.getChildByName("bottom").children[i].x=this.PosXArray
            this.node.getChildByName("top").children[i].x=this.PosXArray
        }
    }
});
