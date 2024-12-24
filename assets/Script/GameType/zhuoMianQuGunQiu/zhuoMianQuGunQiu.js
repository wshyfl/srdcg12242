

cc.Class({
    extends: cc.Component,

    properties: {
        ballEff:cc.Prefab,
    },

    onLoad () {
        AD.zmqgq = this;
        this.red = cc.find("red",this.node);
        this.blue = cc.find("blue",this.node);
        this.blueMove = false;
    },

    start () {
        this.onNodeEventListen();
        cc.director.on("游戏开始", this.onGameStart, this);
    },

    update (dt) {
      
    },
    /**节点事件监听 */
    onNodeEventListen(){
        this.redForce = cc.v2(0,0);
        this.blueForce = cc.v2(0,0)
        this.red.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            this.red.x+=e.getDelta().x;
            this.red.y+=e.getDelta().y;
            this.redForce=cc.v2(e.getDelta().x*150,e.getDelta().y*150)
            if(this.red.x<-260){
                this.red.x = -260;
            }
            else if(this.red.x>260){
                this.red.x = 260;
            }
            if(this.red.y<-500){
                this.red.y = -500;
            }
            else if(this.red.y>-57){
                this.red.y = -57;
            }
        },this)
        this.blue.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            if(AD.isAI) return
            this.blue.x+=e.getDelta().x;
            this.blue.y+=e.getDelta().y;
            this.blueForce=cc.v2(e.getDelta().x*150,e.getDelta().y*150)
            if(this.blue.x<-260){
                this.blue.x = -260;
            }
            else if(this.blue.x>260){
                this.blue.x = 260;
            }
            if(this.blue.y>500){
                this.blue.y = 500;
            }
            else if(this.blue.y<57){
                this.blue.y = 57;
            }
        },this)
    },
    onGameStart(){
        var r=Math.random()
        if(r<0){
            this.node.getChildByName("ball").y =-180;
        }
        else{
            this.node.getChildByName("ball").y =180;
            if(AD.isAI){
                cc.tween(this.blue)
                .to(0.2,{y:this.node.getChildByName("ball").y})
                .to(0.4,{y:440})
                .start()
                this.blueForce = cc.v2(0,-2000)
                this.schedule(function(){
                    if(AD.Game.GameOver) return
                    if(this.node.getChildByName("ball").y>0){
                        var self = this;
                        if(this.blueMove) return
                        this.blueMove = true;
                        cc.tween(this.blue)
                        .to(0.4,{position:this.node.getChildByName("ball").position})
                        .to(0.4,{position:cc.v2(0,440)})
                        .call(function(){
                            self.blueMove = false;
                        })
                        .start()
                    }
                },0.2)
            }
        }
    },
    onGameOver(str){
        AD.Game.overGame(str)
    },
});
