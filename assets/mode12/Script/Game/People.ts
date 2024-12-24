import SumoOperationData from "../data/SumoOperationData";
const {ccclass, property} = cc._decorator;
/**人 */
@ccclass
export default class People extends cc.Component {
    /**对方全部*/
    @property({
        type:cc.Node,
        displayName:"对方全部"
    })  partyAll:cc.Node[] = [];
    /**玩家位置 */
    @property({
        type:cc.Integer,
        displayName:"玩家位置:0自己 1对面"
    })  locationNum = 0;

    /**人物1 */
    private party:cc.Node;
    // onLoad () {}

    start () {
        var isAI = window["AD"].isAI; //AI
        //是否是AI
        if(this.locationNum == 1 && isAI){
            this.node.destroy();
        }

        if(this.locationNum == 0){
            if(isAI){
                this.party = this.partyAll[1];
            }else{
                this.party = this.partyAll[0];
            }
        }else{
            this.party = this.partyAll[0];
        }
    }

    update (dt) {
        if(SumoOperationData.instance.isWinBoo) return;

        let targetPos: cc.Vec2 = this.node.getPosition();
        let bulletPos: cc.Vec2 = this.party.getPosition();
        var distance = Math.sqrt(Math.pow(bulletPos.x - targetPos.x, 2) + Math.pow(bulletPos.y - targetPos.y, 2));
        let normalizeVec: cc.Vec2 = bulletPos.subtract(targetPos).normalize();
        let speedX;
        let speedY;
        var speed1 = SumoOperationData.instance.speed1;
        var speed2 = SumoOperationData.instance.speed2;
        if(this.locationNum == 0){
            speedX = (normalizeVec.x) * speed1;
            speedY = (normalizeVec.y ) * speed1;

            
            // if(SumoOperationData.instance.collisionBoo
            // && ( speed1 != 0 || speed2 != 0 )){
            //     this.node.angle += 0.01;
            //     var rdian = this.angleToRadian(this.node.angle + 90);
            //     var speedX1 = Math.cos(rdian) * 180;
            //     var speedY1 = Math.sin(rdian) * 180;
            //     this.party.x = this.node.x + speedX1;
            //     this.party.y = this.node.y + speedY1;
            //     this.party.angle = this.node.angle;
            // }

        }else{
            speedX = (normalizeVec.x) * speed2;
            speedY = normalizeVec.y * speed2;

        }
        this.node.getComponent(cc.RigidBody).applyLinearImpulse(cc.v2(speedX * 500, speedY * 500),
                this.node.getComponent(cc.RigidBody).getWorldCenter(), true);


    }
    //角度转弧度
    angleToRadian(angle) {
        return angle * Math.PI / 180;
    }
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        console.log("碰撞了");
        SumoOperationData.instance.collisionBoo = true;
        this.node.getComponent(cc.RigidBody).enabledContactListener = false;
    }
}
