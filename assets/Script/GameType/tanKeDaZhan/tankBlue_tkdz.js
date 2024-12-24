

cc.Class({
    extends: cc.Component,

    properties: {
        otherTank:cc.Node,
    },

    onLoad () {
        this.HP = 3;
        //松手可以立马发射道导弹
        this.createCheHeng();
        this.node.canShoot = false;
        this.canShoot = false;
        this.node.isCollider = false;
    },

    start () {
        cc.director.on("游戏开始",this.startGame,this) 
    },
    startGame(){
        this.node.canShoot = true;
        this.canShoot = true
        this.sum = 0;
    },
    update (dt) {
        this.onAI()
        this.node.getChildByName("head").angle =Tools.getAngle(this.node.position,this.otherTank.position)+180;
        if(this.canShoot){
            this.sum +=1;
        }
        if(this.sum == 60){
            
            this.canShoot = false;
            if(this.node.canShoot)
            this.onCreatBullet();
        }
        
    },
    onCreatBullet(){
        this.canShoot = true;
        this.sum = 0;
        AD.sound.playSfx("发射炮弹");
        var bullet = cc.instantiate(AD.tkdz.bulletPre);
        bullet.parent = this.node.parent;
        var posWorld =this.node.getChildByName("head").convertToWorldSpaceAR(this.node.getChildByName("head").getChildByName("shoot"));
        var pos =cc.v2(posWorld.x-360,posWorld.y-AD.height/2);
        bullet.position = pos;
        bullet.getComponent("bullet_tkdz").reset(this.node.getChildByName("head").angle,"blue");
    },
    createCheHeng() {
        this.cheHen = cc.instantiate(AD.tkdz.daoHengPrefab);
        this.cheHen2 = cc.instantiate(AD.tkdz.daoHengPrefab);
        this.cheHen.parent = this.node.parent;
        this.cheHen2.parent = this.node.parent;
        this.cheHen.zIndex = this.cheHen2.zIndex = -1;
        this.cheHen.position = cc.v2(this.node.x + 20, this.node.y);
        this.cheHen2.position = cc.v2(this.node.x - 20, this.node.y);
        var _func = function () {
            var _vx = -Math.sin(Tools.angleToRadian(this.node.angle + 30)) * 40;
            var _vy = Math.cos(Tools.angleToRadian(this.node.angle + 30)) * 40;
            var _vx2 = -Math.sin(Tools.angleToRadian(this.node.angle - 30)) * 40;
            var _vy2 = Math.cos(Tools.angleToRadian(this.node.angle - 30)) * 40;


            this.cheHen.position = cc.v2(this.node.x + _vx, this.node.y + _vy);
            this.cheHen2.position = cc.v2(this.node.x + _vx2, this.node.y + _vy2);
        };
        this.schedule(_func, 0.01);
    },
    onShoot(bool){
        if(bool){
            this.unschedule(this.onCreatBullet);
            if(this.firstShoot){
                this.onCreatBullet()
            }
            this.schedule(this.onCreatBullet,1)
        }
        else{
            this.unschedule(this.onCreatBullet)
        }
    },
    onBlueBeHit(){
        this.HP--;
        AD.tkdz.blueScore.string = this.HP;
        AD.tkdz.blueHp[this.HP].active = false;
        if(this.HP<=0){
            AD.sound.playSfx("爆炸");
            this.node.active = false;
            var bomb =cc.instantiate(AD.Game.bombPre);
            bomb.parent=this.node.parent;
            bomb.position = this.node.position
            AD.tkdz.onGameOver("红色")
        }
    },
    //松手可以立马发射道导弹
    onFirstShoot(){
        this.firstShoot = false
        if(!this.shootFun){
            this.shootFun = function(){
                this.firstShoot = true
            }
        }
        this.unschedule(this.shootFun)
        this.scheduleOnce(this.shootFun,1)
    },
   
    onBeginContact(contact, selfCollider, otherCollider) {//  
        if(otherCollider.tag == 1){
            this.node.isCollider = true;
            this.tempAngle = Tools.getAngle(otherCollider.node.position, this.node.position) + Tools.random(0, 180);
        }
    },
    onEndContact(contact, selfCollider, otherCollider) {//  
        if(otherCollider.tag == 1){
            this.scheduleOnce(function () {
                this.node.isCollider = false;
            },1)
        }
    },
    onAI(){
        if(!AD.isAI) return
        if(AD.Game.GameOver) return
        if(!AD.tkdz.GameStart) return
        if(Tools.getDistance(this.otherTank,this.node)>400){
            this.notMove = false
            this.node.canShoot = false;
            if(!this.node.isCollider){
                
                var angle = Tools.getAngle(this.otherTank,this.node);
                this.node.getChildByName("body").angle=angle;
                this.node.x+=3*Math.sin(-Tools.angleToRadian(angle))
                this.node.y+=3*Math.cos(-Tools.angleToRadian(angle))
            }
            else{
                var angle = this.tempAngle;
                this.node.getChildByName("body").angle=angle;
                this.node.x+=3*Math.sin(-Tools.angleToRadian(angle))
                this.node.y+=3*Math.cos(-Tools.angleToRadian(angle))
            }
            
        }
        else{
            if(!this.notMove){
                this.notMove = true;
                this.node.canShoot = true;
            }
        }
    }
});
