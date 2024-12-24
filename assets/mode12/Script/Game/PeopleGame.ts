import SumoOperationData from "../data/SumoOperationData";
const {ccclass, property} = cc._decorator;
/**相扑游戏 */
@ccclass
export default class PeopleGame extends cc.Component {
    /**能量条0*/
    @property({
        type:cc.Node,
        displayName:"能量条0"
    })  energy0:cc.Node = null;
    /**能量条1*/
    @property({
        type:cc.Node,
        displayName:"能量条1"
    })  energy1:cc.Node = null;
    /**能量条2*/
    @property({
        type:cc.Node,
        displayName:"能量条2"
    })  energy2:cc.Node = null;
    /**人物all*/
    @property({
        type:cc.Node,
        displayName:"人物all"
    })  peoplenodeAll:cc.Node[] = [];
    /**倒计时节点*/
    @property({
        type:cc.Node,
        displayName:"倒计时节点"
    })  countdownAnimation:cc.Node = null;
    /**遮罩1*/
    @property({
        type:cc.Node,
        displayName:"遮罩1"
    })  zheZhao1:cc.Node = null;
    /**遮罩2*/
    @property({
        type:cc.Node,
        displayName:"遮罩2"
    })  zheZhao2:cc.Node = null;

    /**人物1 */
    private peopleNode1:cc.Node;
    /**人物2 */
    private peopleNode2:cc.Node;
    // onLoad () {}
    onLoad(){
        SumoOperationData.instance.isWinBoo = true;
    }
    start () {
        var that = this;
        that.peopleNode1 = that.peoplenodeAll[0];
        var isAI = window["AD"].isAI; //AI
        if(isAI){
            that.peopleNode2 = that.peoplenodeAll[2];
        }else{
            that.peopleNode2 = that.peoplenodeAll[1];
        }

        // that.initGame();
        // that.circleRefresh();
        cc.director.on("游戏开始",()=>{ //正式开始游戏监听
            SumoOperationData.instance.init();
            that.initGame();
            SumoOperationData.instance.isWinBoo = false;
            that.circleRefresh();
        },this);
        
       

    }
    /**点击事件 */
    public touchHanler(e: Event, _name): void {
        window["AD"].sound.playSfx("按钮")
        if(SumoOperationData.instance.isWinBoo) return;
        var speed1 = SumoOperationData.instance.speed1;
        var speed2 = SumoOperationData.instance.speed2;
        if(speed1 != 0 || speed2 != 0 ){
            if(SumoOperationData.instance.collisionBoo
                && ( speed1 != 0 || speed2 != 0 )){
                    this.peopleNode1.angle += 0.5;
                    var rdian = this.angleToRadian(this.peopleNode1.angle + 90);
                    var speedX1 = Math.cos(rdian) * 180;
                    var speedY1 = Math.sin(rdian) * 180;
                    this.peopleNode2.x = this.peopleNode1.x + speedX1;
                    this.peopleNode2.y = this.peopleNode1.y + speedY1;
                    this.peopleNode2.angle = this.peopleNode1.angle;
                }
        }
        
    }
    update (dt) {
        if(SumoOperationData.instance.isWinBoo) return;
        let peopleNodePos1: cc.Vec2 = this.peopleNode1.getPosition();
        let peopleNodePos2: cc.Vec2 = this.peopleNode2.getPosition();
        let bulletPos = new cc.Vec2(0,0);
        var distance = Math.sqrt(Math.pow(peopleNodePos1.x - bulletPos.x, 2) + Math.pow(peopleNodePos1.y - bulletPos.y, 2));
        if(distance > 380){
            SumoOperationData.instance.isWinBoo = true;
            SumoOperationData.instance.scoreNumAll[1] ++;
            this.settlement(1);
        }
        distance = Math.sqrt(Math.pow(peopleNodePos2.x - bulletPos.x, 2) + Math.pow(peopleNodePos2.y - bulletPos.y, 2));
        if(distance > 380){
            SumoOperationData.instance.isWinBoo = true;
            SumoOperationData.instance.scoreNumAll[0] ++;
            this.settlement(0);
        }

        //人物慢动作
        if(SumoOperationData.instance.collisionBoo){
            var maxSpeed =  SumoOperationData.instance.speed1 > SumoOperationData.instance.speed2 ? SumoOperationData.instance.speed1 : SumoOperationData.instance.speed2;
            this.peopleNode1.getComponent(sp.Skeleton).timeScale = maxSpeed / 2;
            this.peopleNode2.getComponent(sp.Skeleton).timeScale = maxSpeed / 2;
        }else{
            this.peopleNode1.getComponent(sp.Skeleton).timeScale = SumoOperationData.instance.speed1 / 2;
            this.peopleNode2.getComponent(sp.Skeleton).timeScale = SumoOperationData.instance.speed2 / 2;
        }
        
    }
    /**圈刷新 */
    public circleRefresh():void {
        this.energy0.active = false;
        this.energy1.active = false;
        this.energy2.active = false;
        if(SumoOperationData.instance.isWinBoo) return;
        var ranNum = Math.floor(Math.random() * 2);
        SumoOperationData.instance.colorNum = ranNum;
        var energy:cc.Node;
        if(ranNum == 0){
            this.energy0.active = true;
            this.energy1.active = false;
            this.energy2.active = false;
            energy = this.energy0;
        }else if(ranNum == 1){
            this.energy0.active = false;
            this.energy1.active = true;
            this.energy2.active = false;
            energy = this.energy1;
        }else if(ranNum == 2){
            this.energy0.active = false;
            this.energy1.active = false;
            this.energy2.active = true;
            energy = this.energy2;
        }
        energy.width = 680;
        energy.height = 680;
        var timeNum = Math.random()*1.5 + 0.5;
        cc.tween(energy)
        .to(0.2,{width:700,height:700})
        .to(timeNum,{width:570,height:570})
        .call(()=>{
            this.circleRefresh();
        })
        .start();

        //AI
        if(window["AD"].isAI){
            SumoOperationData.instance.speed2 = 2;
        }
    }
    /**初始化游戏 */
    public initGame():void {
        // this.peopleNode1.x = this.peopleNode2.x = 0;
        // this.peopleNode1.y = -150;
        // this.peopleNode2.y = 150;
        // this.peopleNode1.angle = 0;
        // this.peopleNode2.angle = 0;
        SumoOperationData.instance.collisionBoo = false;
        SumoOperationData.instance.speed1 = 0;
        SumoOperationData.instance.speed2 = 0;
        this.peopleNode1.getComponent(cc.RigidBody).enabledContactListener = true;
        this.peopleNode1.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(0,0);
        this.peopleNode1.getComponent(sp.Skeleton).setAnimation(0,"yidong",true);
        this.peopleNode2.getComponent(sp.Skeleton).setAnimation(0,"yidong",true);
        this.peopleNode1.getComponent(sp.Skeleton).timeScale = 0;
        this.peopleNode2.getComponent(sp.Skeleton).timeScale = 0;
    }
    /**添加321倒计时动画 */
    public animationPlay321():void {
        this.countdownAnimation.active = true;
    }

    /**结算判断 */
    public settlement(_index:number): void {
        //播放音效

        //遮罩闪
        if(_index == 0){
            cc.tween(this.zheZhao2)
            .to(0.2,{opacity:120})
            .to(0.2,{opacity:0})
            .to(0.2,{opacity:120})
            .to(0.2,{opacity:0})
            .to(0.2,{opacity:120})
            .start();
        }else{
            cc.tween(this.zheZhao1)
            .to(0.2,{opacity:120})
            .to(0.2,{opacity:0})
            .to(0.2,{opacity:120})
            .to(0.2,{opacity:0})
            .to(0.2,{opacity:120})
            .start();
        }
        this.initGame();
        
        // window["AD"].audioMng.playSfx("欢呼")
        //结算
        this.scheduleOnce(()=>{
            var scoreNumAll = SumoOperationData.instance.scoreNumAll;
            if(scoreNumAll[0] >= 1){
                //自己胜利
                window["AD"].Game.overGame("红色")
                return;
            }
            if(scoreNumAll[1] >= 1){
                //对方胜利
                window["AD"].Game.overGame("蓝色")
                return;
            }
        
            //下一局
            this.animationPlay321();
        },2);
        cc.director.emit("隐藏暂停按钮");
        
        
    }
    //角度转弧度
    angleToRadian(angle) {
        return angle * Math.PI / 180;
    }
}


