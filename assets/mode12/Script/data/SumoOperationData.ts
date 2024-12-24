const { ccclass, property } = cc._decorator;
/**相扑游戏内数据 */
@ccclass
export default class SumoOperationData extends cc.Component {
    private static _instance: SumoOperationData
    public static get instance(): SumoOperationData {
        if (!this._instance) {
            this._instance = new SumoOperationData();
        }
        return this._instance;
    }
    /**得分 */
    public scoreNumAll = [0, 0];
    /**是否结束 */
    public isWinBoo: boolean = true;
    /**速度1 */
    public speed1:number = 0;
    /**速度2 */
    public speed2:number = 0;
    /**当前颜色0，1，2 */
    public colorNum:number = 0;
    /**是否碰撞 */
    public collisionBoo:boolean = false;
    /**游戏初始化 */
    public init(): void {
        this.scoreNumAll = [0, 0];
        this.isWinBoo = false;
        this.speed1 = 0;
        this.speed2 = 0;
        this.collisionBoo = false;
    }

    
}
