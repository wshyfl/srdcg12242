

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        AD.Menu = this;
        AD.isAI = false;
        this.moduleView = cc.find("moduleView", this.node);
        this.introduceView = cc.find("introduceView", this.node);
        this.moduleArray = cc.find("view/content", this.moduleView).children;

        this.gameName = ["飞碟保卫战", "钩子抓抓抓", "急速冲冲冲", "冲出陨石带", "双指逃生", "警察抓小偷", "点球大战", "钱是我的", "坦克大战", "桌面曲棍球", "相扑之王", "开心躲得快", "地雷来了", "看谁刷的快", "小鸡争夺战", "磁铁捡捡捡"];
        this.gameIntroduce = [
            "两名玩家互相配合，点击按钮操控护盾保护飞船",
            "两名玩家互相配合，点击按钮控制钩子捕捉小魔鬼",
            "两名玩家互相配合，操控飞船，躲避陨石吃掉星星",
            "两名玩家互相配合，控制飞碟冲出陨石带，吃掉星星",
            "双人合作躲避陷阱，拿到金币",
            "控制警察逮捕小偷，或控制小偷躲避警察偷拿金币",
            "将球射入对方球门，并阻拦对方把球射入我方球门",
            "将钱币拉入自己的钱袋中",
            "点击按钮操控坦克，将对方坦克打爆",
            "拖动球拍把球打入对方球门",
            "看准光环颜色，快速点击按钮",
            "看准按钮文字提示，攻击对方或躲避对方攻击",

            "躲避脚下地雷",
            "操控人物抢夺地盘",
            "控制人物和对方争夺小鸡，将小鸡放入己方栅栏内",
            "抢夺钱币，互扔炸弹",
            "控制人物讲足球射入对方球门",
        ]
        this.haveAI = false;
    },

    start() {
       
        
        if (AD.chanelName1 == "HW") {
            cc.find("shiLingBg", this.node).active = false;
            AD_HuaWei.chaPing();
        }
        else if (AD.chanelName1 == "TT") {
            this.moduleArray[9].active = false;
        }
        else if (AD.chanelName1 == "oppo") {
            cc.find("oppoBg", this.node).active = true;
            
        }
        AD.showBanner();
        this.onInitVideo()
        if (AD.ScrollOffset) {
            cc.find("moduleView", this.node).getComponent(cc.ScrollView).scrollToOffset(AD.ScrollOffset)
        }
        cc.audioEngine.setMusicVolume(1)
        cc.director.on("在线时长解锁模式", this.onlineUnlockMode, this)
    },

    update(dt) {

    },
    onBtnCallBack(event, type) {
        AD.sound.playSfx("按钮")
        switch (type) {
            case "pve":
                AD.isAI = true;
                cc.director.loadScene("Game")
                break
            case "pvp":
                AD.isAI = false;
                cc.director.loadScene("Game")
                break
            case "返回选择模式":
                this.onPanelShowOrHide(this.introduceView, false);
                this.onPanelShowOrHide(this.moduleView, true);
                break
            case "打开隐私":
                this.node.getChildByName("yinSiView").active = true;
                break
            case "关闭隐私":
                this.node.getChildByName("dialogYinSi").active = false;
                break
            case "oppo开始游戏":
                cc.find("oppoBg", this.node).active = false;
                break
        }
    },
    onChooseGameType(event, type) {
        AD.sound.playSfx("按钮");
        AD.ScrollOffset = cc.find("moduleView", this.node).getComponent(cc.ScrollView).getScrollOffset();
        AD.gameType = type//this.gameName[event.target.getSiblingIndex()];
        AD.unLockModule = event.target.getSiblingIndex();
        if (event.target.getChildByName("video").active) {
            AD.showAD("解锁模式");
            return
        }
        this.onPanelShowOrHide(this.moduleView, false);
        // this.nod
        this.onModuleIntroduce()
    },
    /**模式介绍 */
    onModuleIntroduce() {
        this.onPanelShowOrHide(this.introduceView, true);
        for (var i = 0; i < this.gameName.length; i++) {
            if (AD.gameType == this.gameName[i]) {
                cc.find("icon", this.introduceView).getComponent(cc.Sprite).spriteFrame = AD.Texture.moduleIntroduceImg[this.onCallBackIndex()]
                cc.find("desc/title", this.introduceView).getComponent(cc.Label).string = AD.gameType;
                cc.find("desc/desc", this.introduceView).getComponent(cc.Label).string = this.gameIntroduce[this.gameName.indexOf(AD.gameType)];
            }
        }
        cc.find("pveBtn", this.introduceView).active = this.haveAI;


    },
    /**界面的隐藏与显示 */
    onPanelShowOrHide(Node, bool) {
        if (bool) {
           
            if (AD.chanelName1 != "HW") {
                AD.chaPing();
            }
            AD.showBanner();
            Node.active = bool;
        }
        else {
            Node.active = bool;
        }
    },
    /**返回index */
    onCallBackIndex() {
        this.haveAI = true
        switch (AD.gameType) {
            case "飞碟保卫战":
                this.haveAI = false;
                return 0
                break
            case "钩子抓抓抓":
                this.haveAI = false;
                return 1
                break
            case "急速冲冲冲":
                this.haveAI = false;
                return 2
                break
            case "冲出陨石带":
                this.haveAI = false;
                return 3
                break
            case "双指逃生":
                this.haveAI = false;
                return 4
                break
            case "警察抓小偷":
                this.haveAI = true;
                return 5

                break
            case "点球大战":
                this.haveAI = true;
                return 6
                break
            case "钱是我的":
                this.haveAI = false;
                return 7
                break
            case "坦克大战":
                this.haveAI = true;
                return 8
                break
            case "桌面曲棍球":
                this.haveAI = true;
                return 9
                break
            case "相扑之王":
                this.haveAI = true;
                return 10
                break
            case "开心躲得快":
                this.haveAI = true;
                return 11
                break
            case "地雷来了":
                this.haveAI = true;
                return 13
                break
            case "看谁刷的快":
                this.haveAI = true;
                return 14
                break
            case "小鸡争夺战":
                this.haveAI = true;
                return 12
                break
            case "磁铁捡捡捡":
                this.haveAI = true;
                return 15
                break
        }
    },
    /**初始化视频图标 */
    onInitVideo() {
        if (AD.chanelName1 == "TT" || AD.chanelName1 == "oppo") {
            if (AD.wuDianRate <= 0) {
                for (var i = 0; i < globalData.data.moduleState.length; i++) {
                    this.moduleArray[i].getChildByName("video").active = false;
                }
                this.moduleArray[4].getChildByName("time").active = false;
                this.moduleArray[5].getChildByName("time").active = false;
                return
            }
        }
        for (var i = 0; i < globalData.data.moduleState.length; i++) {
            if (globalData.data.moduleState[i]) {
                this.moduleArray[i].getChildByName("video").active = false;
            }
            else {
                this.moduleArray[i].getChildByName("video").active = true;
            }
        }
        if (globalData.data.onLineTime[0] <= 0) {
            this.moduleArray[4].getChildByName("time").active = false;
        }
        if (globalData.data.onLineTime[1] <= 0) {
            this.moduleArray[5].getChildByName("time").active = false;
        }
    },
    /**解锁模式回调 */
    onUnlockModuleCallBack() {
        this.moduleArray[AD.unLockModule].getChildByName("video").active = false;
        globalData.data.moduleState[AD.unLockModule] = true;
        if (AD.unLockModule == 4 || AD.unLockModule == 5) {
            this.moduleArray[AD.unLockModule].getChildByName("time").active = false;
            globalData.data.onLineTime[AD.unLockModule - 4] = 0;
        }
        globalData.saveData();
    },
    onlineUnlockMode(e) {
        if (globalData.data.onLineTime[0] == 0) {
            this.moduleArray[4].getChildByName("video").active = false;
            globalData.data.moduleState[4] = true;
            globalData.saveData();
            this.moduleArray[4].getChildByName("time").active = false;
        }
        else if (globalData.data.onLineTime[0] > 0) {
            this.moduleArray[4].getChildByName("time").getComponent(cc.Label).string =
                "在线时长:" + Tools.padding(Math.floor(globalData.data.onLineTime[0] / 60), 2) + ":" + Tools.padding(globalData.data.onLineTime[0] % 60)
        }
        if (globalData.data.onLineTime[1] == 0) {
            this.moduleArray[5].getChildByName("video").active = false;
            globalData.data.moduleState[5] = true;
            globalData.saveData();
            this.moduleArray[5].getChildByName("time").active = false;
        }
        else if (globalData.data.onLineTime[1] > 0) {
            this.moduleArray[5].getChildByName("time").getComponent(cc.Label).string =
                "在线时长:" + Tools.padding(Math.floor(globalData.data.onLineTime[1] / 60), 2) + ":" + Tools.padding(globalData.data.onLineTime[1] % 60)
        }
    },
});
