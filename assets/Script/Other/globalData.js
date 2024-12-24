window.globalData = {
    firstGameStr:"firstGame_shuangRenDaChuangGuan_BD",
    dataStr:"data_shuangRenDaChuangGuan_BD",
    data:{
        onLineTime:[300,600],
        moduleState:[true,true,true,true,false,false,false,false,
                    false,false,false,false,false,false,false,false],
    },
    
    getDataAll(){
        
        switch (AD.chanelName1) {
            case "QQ":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuanQQ"
                globalData.dataStr="data_shuangRenDaChuangGuan_QQ"
                break;
            case "WX":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuan_WX"
                globalData.dataStr="data_shuangRenDaChuangGuan_WX"
                break;
            case "UC":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuan_UC"
                globalData.dataStr="data_shuangRenDaChuangGuan_UC"
                break;
            case "TT":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuan_TT"
                globalData.dataStr="data_shuangRenDaChuangGuan_TT"
                break;
            case "oppo":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuan_OPPO2"
                globalData.dataStr="data_shuangRenDaChuangGuan_OPPO2"
                break;
            case "VIVO":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuan_VIVO"
                globalData.dataStr="data_shuangRenDaChuangGuan_VIVO"
                break;
            case "BD":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuan_BD"
                globalData.dataStr="data_shuangRenDaChuangGuan_BD"
                break;
            case "HW":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuan_HW"
                globalData.dataStr="data_shuangRenDaChuangGuan_HW"
                break;
            case "KS":
                globalData.firstGameStr="firstGame_shuangRenDaChuangGuan_KS"
                globalData.dataStr="data_shuangRenDaChuangGuan_KS"
                break;
        }
        // globalData.clearAllData();//清除所有 
        cc.debug.setDisplayStats(false);
        if(cc.sys.localStorage.getItem(globalData.firstGameStr) != 1)
        {  
            cc.log("首次进入游戏")
            globalData.saveData();
            globalData.data =  globalData.getData();
            cc.sys.localStorage.setItem(globalData.firstGameStr,1);
        }
        else{
            cc.log("非首次进入游戏 " + cc.sys.localStorage.getItem(globalData.firstGameStr))
            globalData.data =  globalData.getData();
        }
    },
    getData(){
        var _res = cc.sys.localStorage.getItem(globalData.dataStr);
        if(_res != null)
           return JSON.parse(_res);
    },

    clearAllData(){
        cc.sys.localStorage.removeItem(globalData.firstGameStr);
        cc.sys.localStorage.removeItem(globalData.dataStr);
        
    },
    saveData(){            
        cc.sys.localStorage.setItem(globalData.dataStr,JSON.stringify(globalData.data));
        
    },
    addCoin(num){
        globalData.data.coin+=num;
        globalData.saveData();
    },
}