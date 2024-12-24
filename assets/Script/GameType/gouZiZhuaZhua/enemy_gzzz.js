

cc.Class({
    extends: cc.Component,

    properties: {
        face:cc.SpriteFrame,
        redskin:[cc.SpriteFrame],
        blueskin:[cc.SpriteFrame],
    },


    onLoad () {
        this.speed=Tools.random(6,10)*10;
        this.distance = 720;
        
    },

    start () {
        this.schedule(this.onInitPos,5);
        
        cc.director.on("移动限制",function(e){
            if(e == "变大"){
                this.distance = 720;
            }
            else{
                if(this.node.name == "enemy"){
                    this.distance = 360;
                }
            }
        },this)
    },

    update (dt) {
        if(!AD.Game.GameOver){
            this.node.angle-=Tools.random(2,5);
            var xx = this.speed * this.dis.x
            var yy = this.speed * this.dis.y
        
            var sx = xx * dt
            var sy = yy * dt
            this.node.x += sx
            this.node.y += sy
            if(Tools.getDistance(this.node,cc.v2(0,0))>=this.distance){
                this.onInitPos();
            }
        }
        
    },
    /**初始化移动坐标 */
    onInitPos(){
        
        var r=Tools.angleToRadian(Tools.random(0,360));
        //偏移值
        this.dis = cc.v2(Math.sin(r),Math.cos(r));
         
    },
});
