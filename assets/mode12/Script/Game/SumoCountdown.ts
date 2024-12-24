

const {ccclass, property} = cc._decorator;
/**相扑倒计时 */
@ccclass
export default class SumoCountdown extends cc.Component {
    /**倒计时图片 */
    @property({
        type:cc.Sprite,
        displayName:"倒计时图片"
    })  numSpr:cc.Sprite = null;
    /**倒计时图片全部 */
    @property({
        type:cc.SpriteFrame,
        displayName:"倒计时图片全部"
    })  numSprArr:cc.SpriteFrame[] = [];
    private second:number = 0; //顺序
    onLoad () {
    }
    start () {

    }
    onEnable() {
        var that = this;
        that.resetDialogForDestroy(this.node, true);
        that.numSpr.spriteFrame  = that.numSprArr[0];
        that.second = 0;
        // window["AD"].audioMng.playSfx("秒");
        that.schedule(function () {
            that.second++;
            if (that.second < this.numSprArr.length){
                
                that.numSpr.spriteFrame  = that.numSprArr[that.second];
                
                // window["AD"].audioMng.playSfx("秒");
            }
            else 
            {
                that.resetDialogForDestroy(that.node, false);
                
                // window["AD"].audioMng.playSfx("go");
              
            }
        }, 1)
    }
    resetDialogForDestroy(_dialog, _show) {
        var _zheZhao = _dialog.getChildByName("zheZhao");
        var _bg = _dialog.getChildByName("bg");
        if (_show) {
            _dialog.active = true;
            _zheZhao.opacity = 0;
            _bg.scale = 0;

            cc.tween(_zheZhao)
                .to(0.2, { opacity: 180 })
                .start();

            cc.tween(_bg)
                .to(0.2, { scale: 1 })
                .start();

        }
        else {
            cc.tween(_zheZhao)
                .to(0.2, { opacity: 0 })
                .start();

            cc.tween(_bg)
                .to(0.2, { scale: 0 })
                .call(() => {
                    _dialog.active = false;
                    //游戏正式开始
                    cc.director.emit("animationPlay321");
                })
                .start();
        }
    }
    // update (dt) {}
}
