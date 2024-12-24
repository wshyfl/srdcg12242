

import SumoOperationData from "../data/SumoOperationData";

const { ccclass, property } = cc._decorator;
/**相扑UI */
@ccclass
export default class SumoUI extends cc.Component {
    /**分数label1 */
    @property({
        type:cc.Label,
        displayName:"分数label1"
    })  scoreLabel1:cc.Label = null;
    /**分数label2 */
    @property({
        type:cc.Label,
        displayName:"分数label2"
    })  scoreLabel2:cc.Label = null;

    /**玩家1点击开关 */
    public clickBoo1:boolean = true;
    /**玩家2点击开关 */
    public clickBoo2:boolean = true;
    onLoad() {
        // 开启碰撞检测系统，未开启时无法检测
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2();
        // cc.director.getPhysicsManager().debugDrawFlags = 1;
    }

    start() {

    }
    /**点击事件 */
    public touchHanler(e: Event, _name): void {
        window["AD"].sound.playSfx("按钮");
        if(SumoOperationData.instance.isWinBoo) return;
        var speed1 = 0;
        var speed2 = 0;
        switch (_name) {
            case "点击1":
                if(!this.clickBoo1) break;
                if(SumoOperationData.instance.colorNum == 0){
                    speed1 = 2;
                    SumoOperationData.instance.speed2 = 0;
                    // window["AD"].audioMng.playSfx("按钮跑");
                }else{
                    // window["AD"].audioMng.playSfx("错误");
                    this.clickBoo1 = false;
                    this.scheduleOnce(()=>{
                        this.clickBoo1 = true;
                    },0.5)
                }
                break;
            case "点击2":
                if(!this.clickBoo1) break;
                if(SumoOperationData.instance.colorNum == 1){
                    speed1 = 2;
                    SumoOperationData.instance.speed2 = 0;
                    // window["AD"].audioMng.playSfx("按钮跑");

                }else{
                    // window["AD"].audioMng.playSfx("错误");
                    this.clickBoo1 = false;
                    this.scheduleOnce(()=>{
                        this.clickBoo1 = true;
                    },0.5)
                }
                break;
            case "点击3":
                if(!this.clickBoo2) break;
                if(window["AD"].isAI) break;
                if(SumoOperationData.instance.colorNum == 0){
                    speed2 = 2;
                    SumoOperationData.instance.speed1 = 0;
                    // window["AD"].audioMng.playSfx("按钮跑");
                }else{
                    // window["AD"].audioMng.playSfx("错误");
                    this.clickBoo2 = false;
                    this.scheduleOnce(()=>{
                        this.clickBoo2 = true;
                    },0.5)
                }
                break;
            case "点击4":
                if(!this.clickBoo2) break;
                if(window["AD"].isAI) break;
                if(SumoOperationData.instance.colorNum == 1){
                    speed2 = 2;
                    SumoOperationData.instance.speed1 = 0;
                    // window["AD"].audioMng.playSfx("按钮跑");
                }else{
                    // window["AD"].audioMng.playSfx("错误");
                    this.clickBoo2 = false;
                    this.scheduleOnce(()=>{
                        this.clickBoo2 = true;
                    },0.5)
                }
                break;
        }
        if(speed1 != 0){
            SumoOperationData.instance.speed1 = speed1;
        }
        if(speed2 != 0){
            SumoOperationData.instance.speed2 = speed2;
        }


    }

    update(dt) {
        //分数显示
        this.scoreLabel1.string = SumoOperationData.instance.scoreNumAll[0] + "";
        this.scoreLabel2.string = SumoOperationData.instance.scoreNumAll[1] + "";

        //速度衰减
        if (SumoOperationData.instance.speed1 > 0) {
            SumoOperationData.instance.speed1 -= 0.04;
            if (SumoOperationData.instance.speed1 < 0) {
                SumoOperationData.instance.speed1 = 0;
            }
        }
        if (SumoOperationData.instance.speed2 > 0) {
            SumoOperationData.instance.speed2 -= 0.04;
            if (SumoOperationData.instance.speed2 < 0) {
                SumoOperationData.instance.speed2 = 0;
            }
        }
    }
}
