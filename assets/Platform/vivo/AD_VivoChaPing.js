
cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        desc: cc.Label,
        iconY: cc.Node,
        img: cc.Node,
        
    },
    onLoad() {

        this.node.destroy()

    },
    onDestroy() {
    },
    start() {
        // this.load()
    },
    onEnable() {
        // this.showChaping();
    },
    showChaping() {

    },
    //插屏展示 数据上报
    reportAdShow() {

    },

    //插屏点击 数据上报
    reportAdClick() {
 
    },

    //点击下载
    btn_down() {

    },
    //点击关闭
    btn_close() {

    },


    //  update (dt) {

    //  },
});
