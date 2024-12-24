import SumoOperationData from "../data/SumoOperationData";
const {ccclass, property} = cc._decorator;
/**相扑AI */
@ccclass
export default class PeopleAI extends cc.Component {
    /**对方*/
    @property({
        type:cc.Node,
        displayName:"对方"
    })  party:cc.Node = null;
    /**玩家位置 */
    @property({
        type:cc.Integer,
        displayName:"玩家位置:0自己 1对面"
    })  locationNum = 0;

    // onLoad () {}

    /**计时器 */
    public timeNum:number = 0;

    start () {
        var isAI = window["AD"].isAI; //AI
        //是否是AI
        if(this.locationNum == 1 && !isAI){
            this.node.destroy();
        }
    }

    update (dt) {
        this.timeNum ++;
        if(SumoOperationData.instance.isWinBoo) return;

        let targetPos: cc.Vec2 = this.node.getPosition();
        let bulletPos: cc.Vec2 = this.party.getPosition();
        let normalizeVec: cc.Vec2 = bulletPos.subtract(targetPos).normalize();
        let speedX;
        let speedY;
        var speed2 = SumoOperationData.instance.speed2;
        speedX = (normalizeVec.x) * speed2;
        speedY = normalizeVec.y * speed2;
        this.node.getComponent(cc.RigidBody).applyLinearImpulse(cc.v2(speedX * 500, speedY * 500),
                this.node.getComponent(cc.RigidBody).getWorldCenter(), true);


        //AI随机点击
        if(SumoOperationData.instance.collisionBoo == false){
            if(this.timeNum % 30 == 0){
                SumoOperationData.instance.speed2 = 2;
            }
        }else{  
            if(this.timeNum % 20 == 0){
                var ranNum = Math.random() * 100;
                if(ranNum < 70){ //30概率点击
                    SumoOperationData.instance.speed2 = 2;
                    SumoOperationData.instance.speed1 = 0;
                }

            }
        }   
    }
}
