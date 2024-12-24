

cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            default: [],
            type: [cc.AudioClip]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        AD.sound=this;
        cc.game.addPersistRootNode(this.node);
        this.sfxIndex = 0;
        
    },
    
    playSfx(_name){
        if(_name=="背景音乐")
        {
            cc.audioEngine.playMusic(this.audio[0], true);  
        }
        else if(_name=="按钮"){
            cc.audioEngine.play(this.audio[1], false, 1); 
        }
        else if(_name=="胜利")
        {
            cc.audioEngine.play(this.audio[2], false,1);
        }
        else if(_name=="失败")
        {
            cc.audioEngine.play(this.audio[3], false, 1); 
        }
        else if(_name=="爆炸")
        {
            cc.audioEngine.play(this.audio[4], false, 1); 
        }
        else if(_name=="得分")
        {
            cc.audioEngine.play(this.audio[5], false, 1); 
        }
        else if(_name=="得金币")
        {
            cc.audioEngine.play(this.audio[6], false, 1); 
        }
        else if(_name=="打手背")
        {
            cc.audioEngine.play(this.audio[7], false, 1); 
        }
        else if(_name=="守门员移动")
        {
            cc.audioEngine.play(this.audio[8], false, 1); 
        }
        else if(_name=="发抖")
        {
            this.fadou=cc.audioEngine.play(this.audio[9], true, 1); 
        }
        else if(_name=="停止发抖")
        {
            cc.audioEngine.stop(this.fadou); 
        }
        else if(_name=="打中坦克")
        {
            cc.audioEngine.play(this.audio[10], false, 1); 
        }
        else if(_name=="发射炮弹")
        {
            cc.audioEngine.play(this.audio[11], false, 1); 
        }
        else if(_name=="鸡叫")
        {
            cc.audioEngine.play(this.audio[12], false, 1); 
        }
        else if(_name=="捉到小魔鬼")
        {
            cc.audioEngine.play(this.audio[13], false, 1); 
        }
        else if(_name=="桌球")
        {
            cc.audioEngine.play(this.audio[14], false, 1); 
        }
        else if(_name=="踢球")
        {
            cc.audioEngine.play(this.audio[15], false, 1); 
        }
        else if(_name=="倒计时")
        {
            cc.audioEngine.play(this.audio[16], false, 1); 
        }
        else if(_name=="足球欢呼")
        {
            cc.audioEngine.play(this.audio[17], false, 1); 
        }
        else if(_name=="足球唏嘘")
        {
            cc.audioEngine.play(this.audio[18], false, 1); 
        }
        else if(_name=="go")
        {
            cc.audioEngine.play(this.audio[19], false, 1); 
        }
    },
    start () {
    },

    update (dt) {
        
    },
    
    
});
