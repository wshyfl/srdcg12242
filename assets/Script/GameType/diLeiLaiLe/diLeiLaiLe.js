
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.bg = cc.find("bg", this.node);
        this.redPlayer = cc.find("redPlayer", this.node);
        this.bluePlayer = cc.find("bluePlayer", this.node);
        this.redControl = cc.find("Control/redControl", this.node);
        this.blueControl = cc.find("Control/blueControl", this.node);
        
        this.GameStart=false;
        this.bCanMove = false;
        this.blueMove = false;
        this.blueStand = true;
    },

    start() {
        if(AD.isAI){
            this.blueControl.active = false;
            cc.find("Control/blueJoystickBg", this.node).active = false;
        }
        this.redControl.y = -AD.height / 4;
        this.redControl.height = AD.height / 2;
        this.blueControl.y = AD.height / 4;
        this.blueControl.height = AD.height / 2;
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update(dt) {
        this.onAI()
    },
    /**游戏开始 */
    onGameStart() {
        this.onCreatBomb();
        
        this.GameStart=true
    },
    onCreatBomb() {
        if(AD.Game.GameOver) return
        var no1 = Tools.random(0, this.bg.children.length-1);
        var no2 = Tools.random(0, this.bg.children.length-1);
        this.aiArr=[no1,no2];
        
        for (var i = 0; i < this.bg.children.length; i++) {
            if (i != no1 && i != no2) {
                this.bg.children[i].active = true;
            }
        }
        this.scheduleOnce(function(){
            this.onGameOver();
            AD.sound.playSfx("爆炸");
            for (var i = 0; i < this.bg.children.length; i++) {
                if (i != no1 && i != no2) {
                    var b=cc.instantiate(AD.Game.bombPre);
                    b.parent=this.node.getChildByName("bombPanel")
                    b.position=this.bg.children[i].position;
                    this.bg.children[i].active = false;
                }
            }
            
            this.scheduleOnce(function(){
                this.onCreatBomb();
            },0.5)
        },4)
        this.scheduleOnce(function(){
            this.bCanMove = true
        },Math.random()*2)
    },
    onGameOver(){
        console.log(this.redPlayer.isCollide)
        if(this.redPlayer.isCollide&&this.bluePlayer.isCollide){
            this.redPlayer.active = false;
            this.bluePlayer.active = false;
            AD.Game.overGame("失败");
        }
        else if(!this.redPlayer.isCollide&&this.bluePlayer.isCollide){
            this.bluePlayer.active = false;
            AD.Game.overGame("红色");
        }
        else if(this.redPlayer.isCollide&&!this.bluePlayer.isCollide){
            this.redPlayer.active = false;
            AD.Game.overGame("蓝色");
        }
    },
    onAI(){
        if(!AD.isAI) return
        if(!this.GameStart) return
        if(!this.bCanMove) return
        if(Tools.getDistance(this.bluePlayer,this.bg.children[this.aiArr[0]])>10){
            if(!this.blueMove){
                this.blueMove = true;
                this.blueStand = false;
                this.bluePlayer.getComponent("Player_dlll").onPlayerMove("走");
            }
            var angle = Tools.getAngle(this.bluePlayer,this.bg.children[this.aiArr[0]]);
            this.bluePlayer.getChildByName("player").angle = angle+180;
            this.bluePlayer.x+=3*Math.sin(Tools.angleToRadian(-angle+180));
            this.bluePlayer.y+=3*Math.cos(Tools.angleToRadian(-angle+180));
        }
        else{
            if(!this.blueStand){
                this.blueStand = true;
                this.blueMove = false;
                this.bluePlayer.getComponent("Player_dlll").onPlayerMove("站");
            }
        }
       
    }
});
