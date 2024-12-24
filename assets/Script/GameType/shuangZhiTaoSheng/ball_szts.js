

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

  
    onLoad () {

    },

    start () {

    },

    update (dt) {
        
    },
    onCollisionEnter(other, self){
        if(other.tag == 1){
            var terrain=cc.instantiate(AD.szts.terrainPre);
            terrain.parent = AD.szts.bg;
            terrain.active = true;
            terrain.x = AD.szts.bg.children[0].x-3101;
            // terrain.getComponent("terrain_szts").onRandomTerrain() 
        }
        else if(other.tag == 2){
            AD.szts.onGameOver("失败")
        }
        else if(other.tag == 3){
           other.node.destroy()
           AD.szts.onAddScore()
        }
    }
});
