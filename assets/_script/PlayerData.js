Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerData = exports._PlayerData = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_jsbi = require("jsbi");
var r_SDKMgr1 = require("SDKMgr1");
var r_TYIndex = require("TYIndex");
var r_MainHomeUI = require("MainHomeUI");
var r_FarmUI = require("FarmUI");
var r_MainUI = require("MainUI");
var r_SoundMgr = require("SoundMgr");
var r_AdPushSystem = require("AdPushSystem");
var r_BillSystem = require("BillSystem");
var r_ChatSystem = require("ChatSystem");
var r_DaySystem = require("DaySystem");
var r_DrawCardSystem = require("DrawCardSystem");
var r_EmgcSystem = require("EmgcSystem");
var r_EntrySystem = require("EntrySystem");
var r_FruitsSystem = require("FruitsSystem");
var r_GodWealthSystem = require("GodWealthSystem");
var r_HouseSystem = require("HouseSystem");
var r_HttpSystem = require("HttpSystem");
var r_InitPlayerData = require("InitPlayerData");
var r_LuckBagSystem = require("LuckBagSystem");
var r_MailSystem = require("MailSystem");
var r_MonopolySystem = require("MonopolySystem");
var r_PhoneSystem = require("PhoneSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PopSystem = require("PopSystem");
var r_RankSystem = require("RankSystem");
var r_RelaxSystem = require("RelaxSystem");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_SecretSystem = require("SecretSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_StoneSystem = require("StoneSystem");
var r_TaskSystem = require("TaskSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_MagicBoardSystem = require("MagicBoardSystem");
var r_CitySystem = require("CitySystem");
var r_BusinessSystem = require("BusinessSystem");
var r_StarSystem = require("StarSystem");
var r_GameGuideSystem = require("GameGuideSystem");
var r_RoleGirlSystem = require("RoleGirlSystem");
var r_HouseEarnSystem = require("HouseEarnSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_RoleGirlCfg = require("RoleGirlCfg");
var exp__PlayerData = function () {
  function _ctor() {
    this.PlayerDataStorageKey = "PlayerDataStorageKey1090";
    this.data = null;
    this.errorData = null;
    this.isGame = false;
    this.isNewPlayer = false;
    this.isGetServerData = false;
    this.serverDataVersion = 0;
    this.passTime = 0;
    this.autoUpdateTime = 299;
  }
  _ctor.prototype.init = function () {
    var e = this;
    if (r_PlatformSystem.PlatformSystem.isSupportFileData()) {
      console.log("PlatformSystem getPlayerData11");
      r_PlatformSystem.PlatformSystem.getPlayerData(function (t) {
        if (t && "" != t) {
          try {
            e.data = JSON.parse(t);
            if (e.data) {
              console.log("getPlayerData 2=", e.data);
              r_PlatformSystem.PlatformSystem.report("playerdataget", {
                getdata: "读取成功0"
              });
              e.resetData();
              e.onFinishInitData();
            } else {
              console.log("getPlayerData 1=", e.data);
              r_PlatformSystem.PlatformSystem.report("playerdataget", {
                getdata: "读取数据失败初始化0_1"
              });
              e.initDataFromStorage();
            }
          } catch (o) {
            console.log("getPlayerData 3=", e.data);
            r_PlatformSystem.PlatformSystem.report("playerdataget", {
              getdata: "读取数据失败初始化0_2"
            });
            e.initDataFromStorage();
          }
        } else {
          console.log("getPlayerData 4=", t);
          e.initDataFromStorage();
        }
      });
    } else {
      this.initDataFromStorage();
    }
  };
  _ctor.prototype.onFinishInitData = function () {
    if (exports.PlayerData.data.isCloseSound) {
      r_SoundMgr.SoundMgr.soundVolume = 0;
    } else {
      r_SoundMgr.SoundMgr.soundVolume = 1;
    }
    r_SoundMgr.SoundMgr.playMusic("bgm");
    if (exports.PlayerData.data.openId) {
      r_PlatformSystem.PlatformSystem.isSupportServerData() && r_HttpSystem.HttpSystem.checkUpdateOrUploadData();
      r_AdPushSystem.AdPushSystem.sendActive();
    } else if (r_SDKMgr1.SDKMgr1.isplatform()) {
      r_SDKMgr1.SDKMgr1.checkGetOpenId();
    } else {
      r_PlatformSystem.PlatformSystem.checkGetOpenId();
    }
    var e = r_TimeSystem.TimeSystem.getServerTime();
    if (0 == exports.PlayerData.data.newGuideStep) {
      exports.PlayerData.data.newPlayerTime = e + 86400;
      exports.PlayerData.isNewPlayer = true;
    }
    0 != exports.PlayerData.data.newGuideStep && exports.PlayerData.data.newPlayerTime && exports.PlayerData.data.newPlayerTime > e && (exports.PlayerData.isNewPlayer = true);
    r_ReportSystem.ReportSystem.reportSystemMes();
  };
  _ctor.prototype.initDataFromStorage = function () {
    var e = cc.sys.localStorage.getItem(exports.PlayerData.PlayerDataStorageKey);
    if (e) {
      try {
        this.data = JSON.parse(e);
        if (this.data) {
          r_PlatformSystem.PlatformSystem.report("playerdataget", {
            getdata: "读取成功"
          });
          this.resetData();
        } else {
          r_PlatformSystem.PlatformSystem.report("playerdataget", {
            getdata: "读取数据失败初始化1"
          });
          this.initData();
        }
      } catch (t) {
        r_PlatformSystem.PlatformSystem.report("playerdataget", {
          getdata: "读取数据失败初始化2"
        });
        this.initData();
      }
    } else {
      r_PlatformSystem.PlatformSystem.report("playerdataget", {
        getdata: "初始化数据第一次"
      });
      this.initData();
    }
    this.onFinishInitData();
    if (r_TimeSystem.TimeSystem.isNextDay(this.data.systemExpendStamp)) {
      this.data.systemIncomeMap = {};
      this.data.systemOutCoinMap = {};
      this.data.systemUIShowMap = {};
      this.data.systemExpendStamp = r_TimeSystem.TimeSystem.getServerTime();
      this.saveData();
    }
  };
  _ctor.prototype.resetData = function () {
    this.data.time || (this.data.time = 0);
    this.data.loanBankTime || (this.data.loanBankTime = 0);
    this.data.billList || (this.data.billListNew = []);
    this.data.billListNew || (this.data.billListNew = []);
    this.data.curChatTaskList || (this.data.curChatTaskList = []);
    this.data.finishChatTaskList || (this.data.finishChatTaskList = []);
    this.data.finishChatStateMap || (this.data.finishChatStateMap = {});
    this.data.stockMap || (this.data.stockMap = {});
    this.data.isCloseMusic || (this.data.isCloseMusic = 0);
    this.data.isCloseSound || (this.data.isCloseSound = 0);
    this.data.isCloseShake || (this.data.isCloseShake = 0);
    this.data.userId || (this.data.userId = 0);
    this.data.openId || (this.data.openId = 0);
    this.data.curHead || (this.data.curHead = 1);
    this.data.headList || (this.data.headList = [1]);
    this.data.stoneMap || (this.data.stoneMap = {});
    this.data.refreshStoneTime || (this.data.refreshStoneTime = 0);
    this.data.cutStoneNum || (this.data.cutStoneNum = 0);
    this.data.refreshCutNumTime || (this.data.refreshCutNumTime = 0);
    this.data.stoneNewArr || (this.data.stoneNewArr = []);
    this.data.refreshStoneNewTime || (this.data.refreshStoneNewTime = 0);
    this.data.cutStoneNewNum || (this.data.cutStoneNewNum = 0);
    this.data.refreshNewCutNumTime || (this.data.refreshNewCutNumTime = 0);
    this.data.guideIndex || (this.data.guideIndex = -1);
    this.data.rankRewardTime || (this.data.rankRewardTime = 0);
    this.data.scoreRankRewardTime || (this.data.scoreRankRewardTime = 0);
    this.data.levelRankRewardTime || (this.data.levelRankRewardTime = 0);
    this.data.rewardTimeMap || (this.data.rewardTimeMap = {});
    this.data.coinInfoList || (this.data.coinInfoList = []);
    this.data.momoData || (this.data.momoData = {});
    this.data.numBallData || (this.data.numBallData = {});
    this.data.mailData || (this.data.mailData = {});
    this.data.emgcMap || (this.data.emgcMap = {});
    this.data.almanacMap || (this.data.almanacMap = {});
    this.data.debugNumBallVersion || (this.data.debugNumBallVersion = 0);
    if (!this.data.moveBrickMap) {
      this.data.moveBrickMap = {};
      this.data.moveBrickMap.curMultiple = 1;
    }
    if (this.data.coin) {
      this.data.coinStr = this.data.coin + "";
      this.data.coin = 0;
    }
    this.data.coinStr || (this.data.coinStr = "5003");
    this.data.maxCoinStr || (this.data.maxCoinStr = "0");
    this.data.diamondStr || (this.data.diamondStr = "0");
    this.data.maxDiamondStr || (this.data.maxDiamondStr = "0");
    undefined === this.data.stoneStr && (this.data.stoneStr = "500");
    this.data.donateCoinStr || (this.data.donateCoinStr = "0");
    this.data.adPushMap || (this.data.adPushMap = {});
    this.data.bitLeveMoveSpeed || (this.data.bitLeveMoveSpeed = 0);
    this.data.bitLeveOilLoss || (this.data.bitLeveOilLoss = 0);
    this.data.bitLeveCoin || (this.data.bitLeveCoin = 0);
    this.data.aetherLeveMoveSpeed || (this.data.aetherLeveMoveSpeed = 0);
    this.data.aetherLeveOilLoss || (this.data.aetherLeveOilLoss = 0);
    this.data.aetherLeveAttck || (this.data.aetherLeveAttck = 0);
    null == this.data.bitHead && (this.data.bitHead = 2);
    this.data.sideGiftDayNum || (this.data.sideGiftDayNum = 0);
    this.data.getSideGiftTime || (this.data.getSideGiftTime = 0);
    null == this.data.isBootleOnce && (this.data.isBootleOnce = true);
    null == this.data.makeCoeff && (this.data.makeCoeff = 1);
    null == this.data.makeEyeglass && (this.data.makeEyeglass = false);
    null == this.data.tigerCoeff && (this.data.tigerCoeff = 0);
    null == this.data.dayObject && (this.data.dayObject = {});
    null == this.data.isTigerCaiDan && (this.data.isTigerCaiDan = true);
    null == this.data.isNiuniuCaidan && (this.data.isNiuniuCaidan = true);
    null == this.data.isWuGangCaiDan && (this.data.isWuGangCaiDan = -1);
    null == this.data.WuGangCaiDanVideo && (this.data.WuGangCaiDanVideo = 0);
    null == this.data.relaxTaskId && (this.data.relaxTaskId = 0);
    null == this.data.relaxDay && (this.data.relaxDay = 0);
    null == this.data.relaxRefresh && (this.data.relaxRefresh = false);
    null == this.data.houseData && (this.data.houseData = new r_HouseSystem.HouseData());
    null == this.data.relaxExp && (this.data.relaxExp = {
      level: 0,
      exp: 0,
      good: 0,
      bad: 0
    });
    null == exports.PlayerData.data.baomuId && (exports.PlayerData.data.baomuId = null);
    null == exports.PlayerData.data.baomuId2 && (exports.PlayerData.data.baomuId2 = null);
    exports.PlayerData.data.baomuList || (exports.PlayerData.data.baomuList = []);
    null == exports.PlayerData.data.wawaDay && (exports.PlayerData.data.wawaDay = 0);
    null == exports.PlayerData.data.wawaList && (exports.PlayerData.data.wawaList = [0, 1, 2, 3, 4, 5]);
    null == exports.PlayerData.data.wawaCaidan && (exports.PlayerData.data.wawaCaidan = 0);
    null == exports.PlayerData.data.wawaBuzhong && (exports.PlayerData.data.wawaBuzhong = 0);
    null == this.data.tanqiuCaidan && (this.data.tanqiuCaidan = 0);
    null == this.data.godWealthDayNum && (this.data.godWealthDayNum = [0, 0, 0]);
    null == this.data.godWealthOnce && (this.data.godWealthOnce = 0);
    null == this.data.godwealthDate && (this.data.godwealthDate = new Date().toLocaleDateString());
    null == exports.PlayerData.data.bankInfo && (exports.PlayerData.data.bankInfo = {});
    null == this.data.bankEndDay && (this.data.bankEndDay = 0);
    null == this.data.girlsJitui && (this.data.girlsJitui = 0);
    null == this.data.girlsChanged && (this.data.girlsChanged = 0);
    null == this.data.girlsCaidanVideo && (this.data.girlsCaidanVideo = 0);
    null == this.data.tanqiuVideo && (this.data.tanqiuVideo = 0);
    null == this.data.penalty && (this.data.penalty = false);
    null == this.data.footballCaidanNum && (this.data.footballCaidanNum = 0);
    null == this.data.entryInfo && (this.data.entryInfo = {
      num: 0,
      lastDay: null,
      maxNum: 20
    });
    null == this.data.lampFailNum && (this.data.lampFailNum = 0);
    null == this.data.penciCaidanNum && (this.data.penciCaidanNum = 0);
    null == this.data.penciCaidanVideo && (this.data.penciCaidanVideo = 0);
    null == this.data.shenronCaidanNum && (this.data.shenronCaidanNum = 0);
    null == this.data.shenronCaidanVideo && (this.data.shenronCaidanVideo = 0);
    null == this.data.caishenCaidanNum && (this.data.caishenCaidanNum = 0);
    null == this.data.caishenCaidanVideo && (this.data.caishenCaidanVideo = 0);
    null == this.data.nianMonsterCaidanNum && (this.data.nianMonsterCaidanNum = 0);
    null == this.data.nianMonsterCaidanVideo && (this.data.nianMonsterCaidanVideo = 0);
    null == this.data.rocketToSkyCaidanNum && (this.data.rocketToSkyCaidanNum = 0);
    null == this.data.rocketToSkyCaidanVideo && (this.data.rocketToSkyCaidanVideo = 0);
    null == this.data.barCaidanList && (this.data.barCaidanList = []);
    null == this.data.isGuanzhu && (this.data.isGuanzhu = false);
    null == this.data.monopolyCaidan && (this.data.monopolyCaidan = false);
    this.data.miniGame || (this.data.miniGame = {});
    null == this.data.getCarId && (this.data.getCarId = -1);
    null == this.data.startScrapCar && (this.data.startScrapCar = -1);
    this.data.printer || (this.data.printer = {});
    this.data.sleepApp || (this.data.sleepApp = {});
    this.data.petData || (this.data.petData = {});
    null == this.data.isFirstCommerce && (this.data.isFirstCommerce = true);
    null == this.data.newGuideStep && (this.data.newGuideStep = 0);
    null == this.data.newGuideTime && (this.data.newGuideTime = -1);
    null == this.data.newGuideBattle && (this.data.newGuideBattle = false);
    null == this.data.newGuideTime2 && (this.data.newGuideTime2 = -1);
    null == this.data.newGuideBattle2 && (this.data.newGuideBattle2 = false);
    null == this.data.newGuideType && (this.data.newGuideType = 0);
    null == this.data.secretFireDraw && (this.data.secretFireDraw = 0);
    null == this.data.systemIncomeMap && (this.data.systemIncomeMap = {});
    null == this.data.systemOutCoinMap && (this.data.systemOutCoinMap = {});
    null == this.data.offLineEarnTime && (this.data.offLineEarnTime = 0);
    null == this.data.yugongCaidanNum && (this.data.yugongCaidanNum = 0);
    null == this.data.yugongCaidanVideo && (this.data.yugongCaidanVideo = 0);
    null == this.data.footballCaidanVideo && (this.data.footballCaidanVideo = 0);
    null == this.data.elevenTickCaidanNum && (this.data.elevenTickCaidanNum = 0);
    null == this.data.elevenTickCaidan && (this.data.elevenTickCaidan = 0);
    null == this.data.pendantId && (this.data.pendantId = 0);
    null == this.data.fruitsRefTime && (this.data.fruitsRefTime = new Date().toLocaleDateString());
    null == this.data.fruitsList && (this.data.fruitsList = [0, 1, 2, 3, 4, 5]);
    this.data.refreshStoneDay || (this.data.refreshStoneDay = 0);
    this.data.refreshStoneNewDay || (this.data.refreshStoneNewDay = 0);
    this.data.isHasDogScheme || (this.data.isHasDogScheme = 0);
    this.data.brideVideoCount || (this.data.brideVideoCount = 0);
    null == this.data.dogSchemeDay && (this.data.dogSchemeDay = "");
    null == this.data.isAddDesk && (this.data.isAddDesk = false);
    null == this.data.wugangVideo && (this.data.wugangVideo = false);
    null == this.data.bigAndSmallVideo && (this.data.bigAndSmallVideo = false);
    null == this.data.shenronVideo && (this.data.shenronVideo = false);
    null == this.data.shopVideoNum && (this.data.shopVideoNum = 0);
    null == this.data.stoneNewCaidan && (this.data.stoneNewCaidan = {});
    null == this.data.stoneNewCaidan[22] && (this.data.stoneNewCaidan[22] = 0);
    null == this.data.stoneNewCaidan[23] && (this.data.stoneNewCaidan[23] = 0);
    null == this.data.stoneNewCaidan[24] && (this.data.stoneNewCaidan[24] = 0);
    null == this.data.stoneNewCaidan[25] && (this.data.stoneNewCaidan[25] = 0);
    this.data.draw || (this.data.draw = {});
    this.data.drawedList || (this.data.drawedList = []);
    this.data.weapon || (this.data.weapon = {
      isFinishGuide: false,
      recipes: {
        1: 1,
        2: 1,
        3: 1
      },
      pet: [{
        id: 1,
        lv: 0,
        exp: 0
      }]
    });
    this.data.firstVideoEnterMap || (this.data.firstVideoEnterMap = {});
    this.data.dragonBallList || (this.data.dragonBallList = []);
    this.data.systemUIShowMap || (this.data.systemUIShowMap = {});
    this.data.towerMap || (this.data.towerMap = {});
    this.data.unlockPlayTypeMap || (this.data.unlockPlayTypeMap = {});
    this.data.secretUpList || (this.data.secretUpList = []);
    this.data.homeWayMap || (this.data.homeWayMap = {});
    this.data.taskMap || (this.data.taskMap = {});
    if (!this.data.makeNum) {
      if (this.data.makeEyeglass) {
        this.data.makeNum = 100;
      } else {
        this.data.makeNum = 0;
      }
    }
    this.data.luckyNum || (this.data.luckyNum = 0);
    this.data.rockNum || (this.data.rockNum = 0);
    this.data.fruitsNum || (this.data.fruitsNum = 0);
    this.data.tanqiuNum || (this.data.tanqiuNum = 0);
    this.data.flyGodNum || (this.data.flyGodNum = 0);
    this.data.fieldNum || (this.data.fieldNum = 0);
    this.data.catchDogNum || (this.data.catchDogNum = 0);
    this.data.fairyLandTgNum || (this.data.fairyLandTgNum = 0);
    this.data.fairy || (this.data.fairy = {});
    this.data.godWealthNum || (this.data.godWealthNum = 0);
    this.data.industrysNum || (this.data.industrysNum = 0);
    this.data.chessEgg || (this.data.chessEgg = false);
    this.data.donateCoinStr || (this.data.donateCoinStr = "0");
    this.data.trashTime0 || (this.data.trashTime0 = 0);
    this.data.trashTime1 || (this.data.trashTime1 = 0);
    this.data.newSceneVideoCount || (this.data.newSceneVideoCount = 0);
    this.data.futureSceneVideoCount || (this.data.futureSceneVideoCount = 0);
    this.data.onceBattle || (this.data.onceBattle = 0);
    this.data.woodenPeopleMap || (this.data.woodenPeopleMap = {});
    this.data.catchFishMap || (this.data.catchFishMap = r_InitPlayerData.InitPlayerData.initFishNetNum());
    this.data.pokonyanVideoNum || (this.data.pokonyanVideoNum = 0);
    this.data.caiShenVideo || (this.data.caiShenVideo = 0);
    this.data.cityMap || (this.data.cityMap = {});
    this.data.comeInSysCount || (this.data.comeInSysCount = {});
    this.data.playGameInfo || (this.data.playGameInfo = []);
    this.data.shopMap || (this.data.shopMap = r_InitPlayerData.InitPlayerData.initShopMap());
    this.data.bagInfo || (this.data.bagInfo = r_InitPlayerData.InitPlayerData.initBagData());
    this.data.riverHaiBoDong || (this.data.riverHaiBoDong = r_InitPlayerData.InitPlayerData.initRiverHaiBoDong());
    this.data.snackRoomFull || (this.data.snackRoomFull = r_InitPlayerData.InitPlayerData.initSnackRoomFull());
    this.data.countMoneyGame || (this.data.countMoneyGame = r_InitPlayerData.InitPlayerData.initCountMoneyGame());
    this.data.giveRedPacketMap || (this.data.giveRedPacketMap = r_InitPlayerData.InitPlayerData.initGiveRedPacketData());
    this.data.mysteryShopMap || (this.data.mysteryShopMap = r_InitPlayerData.InitPlayerData.initMysteryShopMap());
    this.data.ferruleGameMap || (this.data.ferruleGameMap = r_InitPlayerData.InitPlayerData.initFerruleGameMap());
    this.data.huntMap || (this.data.huntMap = r_InitPlayerData.InitPlayerData.initHuntMap());
    this.data.farmAllHarvestVideo || (this.data.farmAllHarvestVideo = 0);
    null == this.data.farmStrengthNum && (this.data.farmStrengthNum = 10);
    this.data.farmStrengthTime || (this.data.farmStrengthTime = 0);
    this.data.farmTreeType || (this.data.farmTreeType = 0);
    this.data.farmTreeSeed || (this.data.farmTreeSeed = 0);
    null == this.data.farmTreeSeedNum && (this.data.farmTreeSeedNum = 1);
    this.data.farmNowDay || (this.data.farmNowDay = 0);
    this.data.farmInfoList || (this.data.farmInfoList = []);
    this.data.farmAllHarvestVideo || (this.data.farmAllHarvestVideo = 0);
    null == this.data.farmStrengthNum && (this.data.farmStrengthNum = 10);
    this.data.farmStrengthTime || (this.data.farmStrengthTime = 0);
    this.data.farmTreeType || (this.data.farmTreeType = 0);
    this.data.farmTreeSeed || (this.data.farmTreeSeed = 0);
    null == this.data.farmTreeSeedNum && (this.data.farmTreeSeedNum = 1);
    this.data.cdTreeSeedId || (this.data.cdTreeSeedId = 0);
    this.data.farmNowDay || (this.data.farmNowDay = 0);
    null == this.data.farmCD1Num && (this.data.farmCD1Num = 1);
    null == this.data.farmCD1TO2 && (this.data.farmCD1TO2 = 1);
    this.data.farmInfoList || (this.data.farmInfoList = []);
    this.data.farmMarkList || (this.data.farmMarkList = []);
    this.data.farmSeedList || (this.data.farmSeedList = [{
      id: 5,
      num: 2
    }, {
      id: 14,
      num: 5
    }, {
      id: 17,
      num: 5
    }]);
    this.data.farmPaper || (this.data.farmPaper = 0);
    this.data.houseMap || (this.data.houseMap = {});
    this.data.businessMap || (this.data.businessMap = {});
    this.data.starMap || (this.data.starMap = {});
    this.data.level || (this.data.level = 1);
    this.data.addCoinTime || (this.data.addCoinTime = r_TimeSystem.TimeSystem.getServerTime());
    this.data.lotteryMap || (this.data.lotteryMap = {});
    this.data.homeworkCaidan || (this.data.homeworkCaidan = 0);
    this.data.SignInStamp || (this.data.SignInStamp = 0);
    this.data.curSignIndex || (this.data.curSignIndex = 0);
    this.data.SignInStamp2 || (this.data.SignInStamp2 = 0);
    this.data.curSignIndex2 || (this.data.curSignIndex2 = 0);
    this.data.curSignState || (this.data.curSignState = 0);
    this.data.gameGuide || (this.data.gameGuide = 0);
    this.data.onlineTime || (this.data.onlineTime = 0);
    this.data.ErShouCarMap || (this.data.ErShouCarMap = {});
    this.data.onlinePassTime || (this.data.onlinePassTime = 0);
    this.data.isGuideFairyLand || (this.data.isGuideFairyLand = 0);
    this.data.isGotoCity || (this.data.isGotoCity = 0);
    this.data.isGoSideGift || (this.data.isGoSideGift = 0);
    this.data.isGoDeskTop || (this.data.isGoDeskTop = 0);
    this.data.onlineGetList || (this.data.onlineGetList = []);
    if (!this.data.storyMap) {
      this.data.storyMap = {};
      this.data.storyMap.id = 0;
      this.data.storyMap.isShow = false;
    }
    this.data.roleGirlMap || (this.data.roleGirlMap = {});
    this.data.gameGuideCountDown || (this.data.gameGuideCountDown = {});
    this.data.earnTimestamp || (this.data.earnTimestamp = {
      auto: 0,
      continue: 0,
      multiple: 0
    });
    this.data.roleGirlTranLevel || (this.data.roleGirlTranLevel = 1);
    exports.PlayerData.data.roleGirlTranLevel > Object.values(r_RoleGirlCfg.RoleGirlTranCfg).length && (exports.PlayerData.data.roleGirlTranLevel = Object.values(r_RoleGirlCfg.RoleGirlTranCfg).length);
    this.data.battleLevel || (this.data.battleLevel = 1);
    this.data.lotteryGameMap || (this.data.lotteryGameMap = {});
    this.data.serverUpdateTime || (this.data.serverUpdateTime = r_TimeSystem.TimeSystem.getServerTime());
    this.data.wxShareTime || (this.data.wxShareTime = "");
    this.data.deskTopEntryTime || (this.data.deskTopEntryTime = 0);
    this.data.deskTopGetNum || (this.data.deskTopGetNum = 0);
    this.data.isShowVideoOnce || (this.data.isShowVideoOnce = 1);
    this.bigCoin = r_jsbi.default.BigInt(this.data.coinStr);
    this.bigDiamond = r_jsbi.default.BigInt(this.data.diamondStr);
    this.maxDiamond = r_jsbi.default.BigInt(this.data.maxDiamondStr);
    this.bigStone = r_jsbi.default.BigInt(this.data.stoneStr);
    this.donateCoin = r_jsbi.default.BigInt(this.data.donateCoinStr);
    r_RoleGirlSystem.RoleGirlSystem.checkInit();
    r_RoleSystem.RoleSystem.resetData();
    r_DrawCardSystem.DrawCardSystem.resetData();
    r_ChatSystem.ChatSystem.resetData();
    r_PhoneSystem.PhoneSystem.resetData();
    r_HouseSystem.HouseSystem.resetData();
    r_BillSystem.BillSystem.resetData();
    r_RelaxSystem.RelaxSystem.resetData();
    r_GodWealthSystem.GodWealthSystem.resetData();
    r_AdPushSystem.AdPushSystem.checkData();
    r_MailSystem.MailSystem.checkInit();
    r_SecretSystem.SecretSystem.checkInit();
    r_EntrySystem.EntrySystem.resetData();
    r_MonopolySystem.MonopolySystem.restartData();
    r_FruitsSystem.FruitsSystem.resetData();
    r_SecretUpSystem.SecretUpSystem.checkInit();
    r_TaskSystem.TaskSystem.iniData();
    r_MagicBoardSystem.MagicBoardSystem.resetData();
    r_CitySystem.CitySystem.checkInit();
    r_BusinessSystem.BusinessSystem.checkInit();
    r_StarSystem.StarSystem.checkInit();
    r_HouseEarnSystem.HouseEarnSystem.checkInit();
    r_RankSystem.RankSystem.checkUploadLevel();
    r_WeaponSystem.WeaponSystem.init();
    this.saveData();
  };
  _ctor.prototype.initData = function () {
    this.data = {};
    this.data.time = 0;
    this.data.loanBankTime = 0;
    this.data.billList = [];
    this.data.billListNew = [];
    this.data.curChatTaskList = [];
    this.data.finishChatTaskList = [];
    this.data.finishChatStateMap = {};
    this.data.stockMap = {};
    this.data.curHead = 1;
    this.data.headList = [1];
    this.data.stoneMap = {};
    this.data.refreshStoneTime = 0;
    this.data.refreshStoneDay = 0;
    this.data.cutStoneNum = 0;
    this.data.refreshCutNumTime = 0;
    this.data.SignInStamp = 0;
    this.data.curSignIndex = 0;
    this.data.curSignState = 0;
    this.data.SignInStamp2 = 0;
    this.data.curSignIndex2 = 0;
    this.data.curSignState2 = 0;
    this.data.stoneNewArr = [];
    this.data.refreshStoneNewTime = 0;
    this.data.refreshStoneNewDay = 0;
    this.data.cutStoneNewNum = 0;
    this.data.refreshNewCutNumTime = 0;
    this.data.onlineTime = 0;
    this.data.onlinePassTime = 0;
    this.data.onlineGetList = [];
    this.data.isGuideFairyLand = 0;
    this.data.isGotoCity = 0;
    this.data.isGoSideGift = 0;
    this.data.isGoDeskTop = 0;
    this.data.guideIndex = -1;
    this.data.coinInfoList = [];
    this.data.momoData = {};
    this.data.numBallData = {};
    this.data.ErShouCarMap = {};
    this.data.mailData = {};
    this.data.coinStr = "5003";
    this.data.maxCoinStr = "0";
    this.data.diamondStr = "0";
    this.data.maxDiamondStr = "0";
    this.data.stoneStr = "500";
    this.data.donateCoinStr = "0";
    this.bigCoin = r_jsbi.default.BigInt(this.data.coinStr);
    this.bigDiamond = r_jsbi.default.BigInt(this.data.diamondStr);
    this.bigStone = r_jsbi.default.BigInt(this.data.stoneStr);
    this.maxDiamond = r_jsbi.default.BigInt(this.data.maxDiamondStr);
    this.donateCoin = r_jsbi.default.BigInt(this.data.donateCoinStr);
    this.data.emgcMap = {};
    this.data.almanacMap = {};
    this.data.adPushMap = {};
    this.data.sideGiftDayNum = 0;
    this.data.getSideGiftTime = 0;
    this.data.isFirstCommerce = true;
    this.data.isCloseMusic = 0;
    this.data.isCloseSound = 0;
    this.data.isCloseShake = 0;
    this.data.userId = 0;
    this.data.openId = 0;
    this.data.rankRewardTime = 0;
    this.data.debugNumBallVersion = 0;
    this.data.scoreRankRewardTime = 0;
    this.data.levelRankRewardTime = 0;
    this.data.rewardTimeMap = {};
    this.data.moveBrickMap = {};
    this.data.moveBrickMap.curMultiple = 1;
    this.data.bitLeveMoveSpeed = 0;
    this.data.bitLeveOilLoss = 0;
    this.data.bitLeveCoin = 0;
    this.data.aetherLeveMoveSpeed = 0;
    this.data.aetherLeveOilLoss = 0;
    this.data.aetherLeveAttck = 0;
    this.data.bitHead = 2;
    this.data.makeCoeff = 1;
    this.data.makeEyeglass = false;
    this.data.isBootleOnce = true;
    this.data.tigerCoeff = 0;
    this.data.dayObject = {};
    this.data.isTigerCaiDan = true;
    this.data.isNiuniuCaidan = true;
    this.data.isWuGangCaiDan = -1;
    this.data.WuGangCaiDanVideo = 0;
    this.data.relaxTaskId = 0;
    this.data.relaxDay = 0;
    this.data.relaxRefresh = false;
    this.data.houseData = new r_HouseSystem.HouseData();
    this.data.relaxExp = {
      level: 0,
      exp: 0,
      good: 0,
      bad: 0
    };
    exports.PlayerData.data.secretMap = {};
    exports.PlayerData.data.secretMap.secretList = [];
    exports.PlayerData.data.secretMap.buyList = [];
    exports.PlayerData.data.secretMap.buyTime = 0;
    exports.PlayerData.data.baomuId = null;
    exports.PlayerData.data.baomuId2 = null;
    exports.PlayerData.data.baomuList = [];
    exports.PlayerData.data.wawaDay = 0;
    exports.PlayerData.data.wawaList = [0, 1, 2, 3, 4, 5];
    exports.PlayerData.data.wawaCaidan = 0;
    exports.PlayerData.data.wawaBuzhong = 0;
    this.data.tanqiuCaidan = 0;
    this.data.godWealthDayNum = [0, 0, 0];
    this.data.godWealthOnce = 0;
    this.data.godwealthDate = new Date().toLocaleDateString();
    exports.PlayerData.data.bankInfo = {};
    this.data.bankEndDay = 0;
    this.data.girlsJitui = 0;
    this.data.girlsChanged = 0;
    this.data.girlsCaidanVideo = 0;
    this.data.tanqiuVideo = 0;
    this.data.penalty = false;
    this.data.footballCaidanNum = 0;
    this.data.entryInfo = {
      num: 0,
      lastDay: null,
      maxNum: 20
    };
    this.data.lampFailNum = 0;
    this.data.penciCaidanNum = 0;
    this.data.penciCaidanVideo = 0;
    this.data.shenronCaidanNum = 0;
    this.data.shenronCaidanVideo = 0;
    this.data.caishenCaidanNum = 0;
    this.data.caishenCaidanVideo = 0;
    this.data.nianMonsterCaidanNum = 0;
    this.data.nianMonsterCaidanVideo = 0;
    this.data.rocketToSkyCaidanNum = 0;
    this.data.rocketToSkyCaidanVideo = 0;
    this.data.barCaidanList = [];
    this.data.isGuanzhu = false;
    this.data.monopolyCaidan = false;
    this.data.miniGame = {};
    this.data.startScrapCar = -1;
    this.data.getCarId = -1;
    this.data.newGuideStep = 0;
    this.data.newGuideTime = -1;
    this.data.newGuideBattle = false;
    this.data.newGuideTime2 = -1;
    this.data.newGuideBattle2 = false;
    this.data.newGuideType = false;
    this.data.secretFireDraw = 0;
    this.data.systemIncomeMap = {};
    this.data.systemOutCoinMap = {};
    this.data.systemUIShowMap = {};
    this.data.towerMap = {};
    this.data.offLineEarnTime = 0;
    this.data.yugongCaidanNum = 0;
    this.data.yugongCaidanVideo = 0;
    this.data.footballCaidanVideo = 0;
    this.data.elevenTickCaidanNum = 0;
    this.data.elevenTickCaidan = 0;
    this.data.pendantId = 0;
    this.data.printer = {};
    this.data.petData = {};
    this.data.sleepApp = {};
    this.data.isHasDogScheme = 0;
    this.data.brideVideoCount = 0;
    this.data.dogSchemeDay = "";
    this.data.isAddDesk = false;
    this.data.wugangVideo = false;
    this.data.bigAndSmallVideo = false;
    this.data.shenronVideo = false;
    this.data.shopVideoNum = 0;
    this.data.stoneNewCaidan = {};
    this.data.stoneNewCaidan[22] = 0;
    this.data.stoneNewCaidan[23] = 0;
    this.data.stoneNewCaidan[24] = 0;
    this.data.stoneNewCaidan[25] = 0;
    this.data.draw = {};
    this.data.drawedList = [];
    this.data.weapon = {
      isFinishGuide: false,
      recipes: {
        1: 1,
        2: 1,
        3: 1
      },
      pet: [{
        id: 1,
        lv: 0,
        exp: 0
      }]
    };
    this.data.firstVideoEnterMap = {};
    this.data.dragonBallList = [];
    this.data.unlockPlayTypeMap = {};
    this.data.secretUpList = [];
    this.data.taskMap = {};
    this.data.makeNum = 0;
    this.data.luckyNum = 0;
    this.data.rockNum = 0;
    this.data.fruitsNum = 0;
    this.data.tanqiuNum = 0;
    this.data.flyGodNum = 0;
    this.data.fieldNum = 0;
    this.data.catchDogNum = 0;
    this.data.fairyLandTgNum = 0;
    this.data.fairy = {};
    this.data.godWealthNum = 0;
    this.data.industrysNum = 0;
    this.data.donateCoinStr = "0";
    this.data.trashTime0 = 0;
    this.data.trashTime1 = 0;
    this.data.newSceneVideoCount = 0;
    this.data.futureSceneVideoCount = 0;
    this.data.onceBattle = 0;
    this.data.woodenPeopleMap = {};
    this.data.catchFishMap = r_InitPlayerData.InitPlayerData.initFishNetNum();
    this.data.comeInSysCount = {};
    this.data.shopMap = r_InitPlayerData.InitPlayerData.initShopMap();
    this.data.playGameInfo = [];
    this.data.bagInfo = r_InitPlayerData.InitPlayerData.initBagData();
    this.data.riverHaiBoDong = r_InitPlayerData.InitPlayerData.initRiverHaiBoDong();
    this.data.mysteryShopMap = r_InitPlayerData.InitPlayerData.initMysteryShopMap();
    this.data.ferruleGameMap = r_InitPlayerData.InitPlayerData.initFerruleGameMap();
    this.data.huntMap = r_InitPlayerData.InitPlayerData.initHuntMap();
    this.data.farmAllHarvestVideo = 0;
    this.data.farmStrengthNum = 10;
    this.data.farmStrengthTime = 0;
    this.data.farmTreeType = 0;
    this.data.farmTreeSeed = 0;
    this.data.farmTreeSeedNum = 1;
    this.data.cdTreeSeedId = 0;
    this.data.farmNowDay = 0;
    this.data.farmCD1Num = 1;
    this.data.farmCD1TO2 = 1;
    this.data.farmInfoList = [];
    this.data.farmMarkList = [];
    this.data.farmSeedList = [{
      id: 5,
      num: 2
    }, {
      id: 14,
      num: 5
    }, {
      id: 17,
      num: 5
    }];
    this.data.farmPaper = 0;
    this.data.snackRoomFull = r_InitPlayerData.InitPlayerData.initSnackRoomFull();
    this.data.countMoneyGame = r_InitPlayerData.InitPlayerData.initCountMoneyGame();
    this.data.giveRedPacketMap = r_InitPlayerData.InitPlayerData.initGiveRedPacketData();
    this.data.pokonyanVideoNum = 0;
    this.data.caiShenVideo = 0;
    this.data.cityMap = {};
    this.data.houseMap = {};
    this.data.businessMap = {};
    this.data.starMap = {};
    this.data.level = 1;
    this.data.addCoinTime = r_TimeSystem.TimeSystem.getServerTime();
    exports.PlayerData.data.lotteryMap = {};
    this.data.homeworkCaidan = 0;
    this.data.gameGuide = 0;
    this.data.gameGuideCountDown = {};
    this.data.earnTimestamp = {
      auto: 0,
      continue: 0,
      multiple: 0
    };
    this.data.storyMap = {};
    this.data.storyMap.id = 0;
    this.data.storyMap.isShow = false;
    this.data.roleGirlMap = {};
    this.data.roleGirlTranLevel = 1;
    this.data.battleLevel = 1;
    this.data.lotteryGameMap = {};
    this.data.serverUpdateTime = r_TimeSystem.TimeSystem.getServerTime();
    this.data.wxShareTime = "";
    this.data.deskTopEntryTime = 0;
    this.data.deskTopGetNum = 0;
    this.data.isShowVideoOnce = 1;
    r_RoleGirlSystem.RoleGirlSystem.checkInit();
    r_RoleSystem.RoleSystem.initData();
    r_DrawCardSystem.DrawCardSystem.initData();
    r_AdPushSystem.AdPushSystem.checkData();
    r_BillSystem.BillSystem.resetData();
    r_ChatSystem.ChatSystem.resetData();
    r_PhoneSystem.PhoneSystem.resetData();
    r_HouseSystem.HouseSystem.resetData();
    r_GodWealthSystem.GodWealthSystem.resetData();
    r_MailSystem.MailSystem.checkInit();
    r_EntrySystem.EntrySystem.resetData();
    r_MonopolySystem.MonopolySystem.initData();
    r_SecretSystem.SecretSystem.checkInit();
    r_FruitsSystem.FruitsSystem.initData();
    r_StoneSystem.StoneSystem.refreshStoneMap();
    r_SecretUpSystem.SecretUpSystem.checkInit();
    r_TaskSystem.TaskSystem.iniData();
    r_MagicBoardSystem.MagicBoardSystem.initData();
    r_CitySystem.CitySystem.checkInit();
    r_BusinessSystem.BusinessSystem.checkInit();
    r_StarSystem.StarSystem.checkInit();
    r_HouseEarnSystem.HouseEarnSystem.checkInit();
    r_WeaponSystem.WeaponSystem.init();
    this.saveData(false);
  };
  _ctor.prototype.restart = function () {
    this.data.time = 0;
    this.data.loanBankTime = 0;
    this.data.billList = [];
    this.data.billListNew = [];
    this.data.curChatTaskList = [];
    this.data.finishChatTaskList = [];
    this.data.finishChatStateMap = {};
    this.data.stockMap = {};
    this.data.curHead = 1;
    this.data.headList = [1];
    this.data.stoneMap = {};
    this.data.refreshStoneTime = 0;
    this.data.refreshStoneDay = 0;
    this.data.cutStoneNum = 0;
    this.data.refreshCutNumTime = 0;
    this.data.SignInStamp = 0;
    this.data.curSignIndex = 0;
    this.data.curSignState = 0;
    this.data.SignInStamp2 = 0;
    this.data.curSignIndex2 = 0;
    this.data.curSignState2 = 0;
    this.data.onlineTime = 0;
    this.data.onlinePassTime = 0;
    this.data.onlineGetList = [];
    this.data.isGuideFairyLand = 0;
    this.data.isGotoCity = 0;
    this.data.isGoSideGift = 0;
    this.data.isGoDeskTop = 0;
    this.data.stoneNewArr = [];
    this.data.refreshStoneNewTime = 0;
    this.data.refreshStoneNewDay = 0;
    this.data.cutStoneNewNum = 0;
    this.data.refreshNewCutNumTime = 0;
    this.data.guideIndex = -1;
    this.data.coinInfoList = [];
    this.data.momoData = {};
    this.data.numBallData = {};
    this.data.mailData = {};
    this.data.emgcMap = {};
    this.data.almanacMap = {};
    this.data.coinStr = "5003";
    this.data.diamondStr = "0";
    this.data.maxDiamondStr = "0";
    this.data.stoneStr = "500";
    this.data.debugNumBallVersion = 0;
    this.data.moveBrickMap = {};
    this.data.moveBrickMap.curMultiple = 1;
    this.data.sideGiftDayNum = 0;
    this.data.getSideGiftTime = 0;
    this.data.bitLeveMoveSpeed = 0;
    this.data.bitLeveOilLoss = 0;
    this.data.bitLeveCoin = 0;
    this.data.aetherLeveMoveSpeed = 0;
    this.data.aetherLeveOilLoss = 0;
    this.data.aetherLeveAttck = 0;
    this.data.bitHead = 2;
    this.data.makeCoeff = 1;
    this.data.makeEyeglass = false;
    this.data.isBootleOnce = true;
    this.data.tigerCoeff = 0;
    this.data.dayObject = {};
    this.data.isTigerCaiDan = true;
    this.data.isNiuniuCaidan = true;
    this.data.isWuGangCaiDan = -1;
    this.data.WuGangCaiDanVideo = 0;
    this.data.relaxTaskId = 0;
    this.data.relaxDay = 0;
    this.data.relaxRefresh = false;
    this.data.houseData = new r_HouseSystem.HouseData();
    this.data.relaxExp = {
      level: 0,
      exp: 0,
      good: 0,
      bad: 0
    };
    exports.PlayerData.data.secretMap = {};
    exports.PlayerData.data.secretMap.secretList = [];
    exports.PlayerData.data.secretMap.buyList = [];
    exports.PlayerData.data.secretMap.buyTime = 0;
    exports.PlayerData.data.baomuId = null;
    exports.PlayerData.data.baomuId2 = null;
    exports.PlayerData.data.baomuList = [];
    exports.PlayerData.data.wawaDay = 0;
    exports.PlayerData.data.wawaList = [0, 1, 2, 3, 4, 5];
    exports.PlayerData.data.wawaCaidan = 0;
    exports.PlayerData.data.wawaBuzhong = 0;
    this.data.tanqiuCaidan = 0;
    this.data.godWealthDayNum = [0, 0, 0];
    this.data.godWealthOnce = 0;
    this.data.godwealthDate = new Date().toLocaleDateString();
    this.data.donateCoinStr = "0";
    this.bigCoin = r_jsbi.default.BigInt(this.data.coinStr);
    this.bigDiamond = r_jsbi.default.BigInt(this.data.diamondStr);
    this.bigStone = r_jsbi.default.BigInt(this.data.stoneStr);
    this.maxDiamond = r_jsbi.default.BigInt(this.data.maxDiamondStr);
    this.donateCoin = r_jsbi.default.BigInt(this.data.donateCoinStr);
    exports.PlayerData.data.bankInfo = {};
    this.data.bankEndDay = 0;
    this.data.girlsJitui = 0;
    this.data.girlsChanged = 0;
    this.data.girlsCaidanVideo = 0;
    this.data.tanqiuVideo = 0;
    this.data.penalty = false;
    this.data.footballCaidanNum = 0;
    this.data.entryInfo = {
      num: 0,
      lastDay: null,
      maxNum: 20
    };
    this.data.lampFailNum = 0;
    this.data.penciCaidanNum = 0;
    this.data.penciCaidanVideo = 0;
    this.data.shenronCaidanNum = 0;
    this.data.shenronCaidanVideo = 0;
    this.data.caishenCaidanNum = 0;
    this.data.caishenCaidanVideo = 0;
    this.data.nianMonsterCaidanNum = 0;
    this.data.nianMonsterCaidanVideo = 0;
    this.data.rocketToSkyCaidanNum = 0;
    this.data.rocketToSkyCaidanVideo = 0;
    this.data.barCaidanList = [];
    this.data.isGuanzhu = false;
    this.data.monopolyCaidan = false;
    this.data.miniGame = {};
    this.data.startScrapCar = -1;
    this.data.getCarId = -1;
    this.data.newGuideStep = 0;
    this.data.newGuideTime = -1;
    this.data.newGuideBattle = false;
    this.data.newGuideTime2 = -1;
    this.data.newGuideBattle2 = false;
    this.data.newGuideType = 0;
    this.data.secretFireDraw = 0;
    this.data.systemIncomeMap = {};
    this.data.systemOutCoinMap = {};
    this.data.systemUIShowMap = {};
    this.data.towerMap = {};
    this.data.offLineEarnTime = 0;
    this.data.yugongCaidanNum = 0;
    this.data.yugongCaidanVideo = 0;
    this.data.footballCaidanVideo = 0;
    this.data.elevenTickCaidanNum = 0;
    this.data.elevenTickCaidan = 0;
    this.data.pendantId = 0;
    this.data.fruitsRefTime = new Date().toLocaleDateString();
    this.data.fruitsList = [0, 1, 2, 3, 4, 5];
    this.data.printer = {};
    this.data.petData = {};
    this.data.sleepApp = {};
    this.data.isHasDogScheme = 0;
    this.data.brideVideoCount = 0;
    this.data.dogSchemeDay = "";
    this.data.isAddDesk = false;
    this.data.wugangVideo = false;
    this.data.bigAndSmallVideo = false;
    this.data.shenronVideo = false;
    this.data.shopVideoNum = 0;
    this.data.stoneNewCaidan = {};
    this.data.stoneNewCaidan[22] = 0;
    this.data.stoneNewCaidan[23] = 0;
    this.data.stoneNewCaidan[24] = 0;
    this.data.stoneNewCaidan[25] = 0;
    this.data.chessEgg = false;
    this.data.jumpFishEgg = false;
    this.data.farmAllHarvestVideo = 0;
    this.data.farmStrengthNum = 10;
    this.data.farmStrengthTime = 0;
    this.data.farmTreeType = 0;
    this.data.farmTreeSeed = 0;
    this.data.farmTreeSeedNum = 1;
    this.data.cdTreeSeedId = 0;
    this.data.farmNowDay = 0;
    this.data.farmCD1Num = 1;
    this.data.farmCD1TO2 = 1;
    this.data.farmInfoList = [];
    this.data.farmMarkList = [];
    this.data.farmSeedList = [{
      id: 5,
      num: 2
    }, {
      id: 14,
      num: 5
    }, {
      id: 17,
      num: 5
    }];
    this.data.farmPaper = 0;
    this.data.draw = {};
    this.data.drawedList = [];
    this.data.weapon = {
      isFinishGuide: false,
      recipes: {
        1: 1,
        2: 1,
        3: 1
      },
      pet: [{
        id: 1,
        lv: 0,
        exp: 0
      }]
    };
    this.data.firstVideoEnterMap = {};
    this.data.dragonBallList = [];
    this.data.unlockPlayTypeMap = {};
    this.data.secretUpList = [];
    this.data.homeWayMap = {};
    this.data.taskMap = {};
    this.data.makeNum = 0;
    this.data.luckyNum = 0;
    this.data.rockNum = 0;
    this.data.fruitsNum = 0;
    this.data.tanqiuNum = 0;
    this.data.flyGodNum = 0;
    this.data.fieldNum = 0;
    this.data.catchDogNum = 0;
    this.data.fairyLandTgNum = 0;
    this.data.fairy = {};
    this.data.godWealthNum = 0;
    this.data.industrysNum = 0;
    this.data.trashTime0 = 0;
    this.data.trashTime1 = 0;
    this.data.newSceneVideoCount = 0;
    this.data.futureSceneVideoCount = 0;
    this.data.onceBattle = 0;
    this.data.woodenPeopleMap = {};
    this.data.catchFishMap = r_InitPlayerData.InitPlayerData.initFishNetNum();
    this.data.pokonyanVideoNum = 0;
    this.data.caiShenVideo = 0;
    this.data.cityMap = {};
    this.data.houseMap = {};
    this.data.lotteryMap = {};
    this.data.comeInSysCount = {};
    this.data.Daily = null;
    this.data.farmCardOpenCount = 0;
    this.data.farmCardCount = 0;
    this.data.farmCardNextTime = 0;
    this.data.shopMap = r_InitPlayerData.InitPlayerData.initShopMap();
    this.data.playGameInfo = [];
    this.data.bagInfo = r_InitPlayerData.InitPlayerData.initBagData();
    this.data.riverHaiBoDong = r_InitPlayerData.InitPlayerData.initRiverHaiBoDong();
    this.data.snackRoomFull = r_InitPlayerData.InitPlayerData.initSnackRoomFull();
    this.data.countMoneyGame = r_InitPlayerData.InitPlayerData.initCountMoneyGame();
    this.data.giveRedPacketMap = r_InitPlayerData.InitPlayerData.initGiveRedPacketData();
    this.data.businessMap = {};
    this.data.starMap = {};
    this.data.level = 1;
    this.data.addCoinTime = r_TimeSystem.TimeSystem.getServerTime();
    this.data.mysteryShopMap = r_InitPlayerData.InitPlayerData.initMysteryShopMap();
    this.data.ferruleGameMap = r_InitPlayerData.InitPlayerData.initFerruleGameMap();
    this.data.huntMap = r_InitPlayerData.InitPlayerData.initHuntMap();
    this.data.homeworkCaidan = 0;
    this.data.gameGuide = 0;
    this.data.gameGuideCountDown = {};
    this.data.earnTimestamp = {
      auto: 0,
      continue: 0,
      multiple: 0
    };
    this.data.storyMap = {};
    this.data.storyMap.id = 0;
    this.data.storyMap.isShow = false;
    this.data.roleGirlMap = {};
    this.data.roleGirlTranLevel = 1;
    this.data.battleLevel = 1;
    this.data.lotteryGameMap = {};
    this.data.serverUpdateTime = r_TimeSystem.TimeSystem.getServerTime();
    this.data.wxShareTime = "";
    this.data.deskTopEntryTime = 0;
    this.data.deskTopGetNum = 0;
    this.data.isShowVideoOnce = 1;
    r_RoleGirlSystem.RoleGirlSystem.checkInit();
    r_RoleSystem.RoleSystem.initData();
    r_DrawCardSystem.DrawCardSystem.initData();
    r_ChatSystem.ChatSystem.resetData();
    r_PhoneSystem.PhoneSystem.resetData();
    r_GodWealthSystem.GodWealthSystem.resetData();
    r_HouseSystem.HouseSystem.resetData();
    r_BillSystem.BillSystem.resetData();
    r_TaskSystem.TaskSystem.iniData();
    if (r_TYIndex.Platform.isDarenPlatform()) {
      exports.PlayerData.data.gameGuide = 6;
      exports.PlayerData.data.storyMap.id = 1;
      exports.PlayerData.data.storyMap.isShow = false;
    }
    r_TYIndex.UIWind.hideAllNotMain();
    r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.refreshHead();
    r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.refreshHead();
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.coinChange);
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.DiamondChange);
    r_MailSystem.MailSystem.checkInit();
    r_EmgcSystem.EmgcSystem.checkInit();
    r_PopSystem.PopSystem.enterMainUI();
    r_EntrySystem.EntrySystem.resetData();
    r_MonopolySystem.MonopolySystem.initData();
    r_GameGuideSystem.GameGuideSystem.init();
    r_GameGuideSystem.GameGuideSystem.checkGuide();
    r_ChatSystem.ChatSystem.checkTriggerTask();
    r_FruitsSystem.FruitsSystem.initData();
    r_StoneSystem.StoneSystem.refreshStoneMap();
    r_SecretUpSystem.SecretUpSystem.checkInit();
    r_TaskSystem.TaskSystem.iniData();
    r_LuckBagSystem.LuckBagSystem.resetData();
    r_MagicBoardSystem.MagicBoardSystem.initData();
    r_CitySystem.CitySystem.checkInit();
    r_BusinessSystem.BusinessSystem.checkInit();
    r_StarSystem.StarSystem.checkInit();
    r_HouseEarnSystem.HouseEarnSystem.checkInit();
    r_WeaponSystem.WeaponSystem.init();
    this.saveData();
  };
  _ctor.prototype.addSystemUIShowCount = function (e) {
    this.data.systemUIShowMap[e] || (this.data.systemUIShowMap[e] = 0);
    this.data.systemUIShowMap[e]++;
  };
  _ctor.prototype.addPlayTypeUnlockedCount = function (e) {
    this.data.unlockPlayTypeMap[e] || (this.data.unlockPlayTypeMap[e] = 0);
    this.data.unlockPlayTypeMap[e]++;
    this.saveData();
  };
  _ctor.prototype.getPlayTypeUnlockedCount = function (e) {
    if (this.data.unlockPlayTypeMap[e]) {
      return this.data.unlockPlayTypeMap[e];
    } else {
      return 0;
    }
  };
  _ctor.prototype.setUserId = function (e) {
    this.data.userId = e;
    exports.PlayerData.saveData();
  };
  _ctor.prototype.setOpenId = function (e) {
    this.data.openId = e;
    r_PlatformSystem.PlatformSystem.checkInWhiteList();
    exports.PlayerData.saveData();
    r_AdPushSystem.AdPushSystem.sendActive();
  };
  _ctor.prototype.addHead = function (e) {
    if (-1 == this.data.headList.indexOf(e)) {
      this.data.headList.push(e);
      this.saveData();
    }
  };
  _ctor.prototype.finishChatTask = function (e, t) {
    var o = this.data.curChatTaskList.indexOf(e);
    -1 != o && this.data.curChatTaskList.splice(o, 1);
    if (-1 == this.data.finishChatTaskList.indexOf(e)) {
      this.data.finishChatTaskList.push(e);
      r_PlatformSystem.PlatformSystem.report("Chat", {
        num: "" + this.data.finishChatTaskList.length
      });
      t && (this.data.finishChatStateMap[e] = t);
      this.saveData();
      r_ChatSystem.ChatSystem.checkTriggerTask();
    }
  };
  _ctor.prototype.refreshFinishChatTask = function (e, t) {
    if (-1 != this.data.finishChatTaskList.indexOf(e)) {
      this.data.finishChatStateMap[e] = t;
      this.saveData();
    }
  };
  _ctor.prototype.addLoanBankTime = function () {
    this.data.loanBankTime = this.data.loanBankTime + 1;
    this.saveData();
  };
  _ctor.prototype.addBill = function (e) {
    this.data.billListNew.push(e);
    this.saveData();
  };
  _ctor.prototype.setTime = function (e) {
    this.data.time = e;
    this.saveData();
  };
  _ctor.prototype.isCoinEnough = function (e) {
    return !!r_jsbi.default.GE(this.bigCoin, e);
  };
  _ctor.prototype.isStoneEnough = function (e) {
    return !!r_jsbi.default.GE(this.bigStone, e);
  };
  _ctor.prototype.useCoin = function (e, t) {
    if (this.isCoinEnough(t)) {
      this.deleteCoin(e, t);
      return true;
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
      return false;
    }
  };
  _ctor.prototype.addCoin = function (e, t, o, s, r, c) {
    undefined === o && (o = r_ReportSystem.SystemKey.None);
    undefined === s && (s = true);
    undefined === r && (r = true);
    undefined === c && (c = true);
    if (t) {
      "number" == typeof t && (t = Math.ceil(t));
      t = r_jsbi.default.BigInt(t);
      this.bigCoin = r_jsbi.default.ADD(this.bigCoin, t);
      s && r_UtilsSystem.UtilsSystem.showTip("获得金币" + r_UtilsSystem.UtilsSystem.getShowCoin(t));
      r_ReportSystem.ReportSystem.addCoin(e, t, o);
      this.addCoinInfo(e, t);
      r_PhoneSystem.PhoneSystem.checkOpen();
      this.data.coinStr = this.bigCoin.toString();
      r_RankSystem.RankSystem.checkUploadScore();
      c && this.saveData();
      r && r_SoundMgr.SoundMgr.playSound("huodejinbi");
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.coinChange);
    }
  };
  _ctor.prototype.addDiamond = function (e, t, o) {
    undefined === o && (o = true);
    if (t) {
      "number" == typeof t && (t = Math.ceil(t));
      t = r_jsbi.default.BigInt(t);
      if (e <= 3) {
        this.maxDiamond = r_jsbi.default.ADD(this.maxDiamond, t);
        this.data.maxDiamondStr = this.maxDiamond.toString();
      }
      this.bigDiamond = r_jsbi.default.ADD(this.bigDiamond, t);
      this.data.diamondStr = this.bigDiamond.toString();
      4 == e && this.saveData();
      e > 4 && o && r_UtilsSystem.UtilsSystem.showTip("获取" + r_UtilsSystem.UtilsSystem.getShowCoin(t) + "钻石");
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.DiamondChange, t);
    }
  };
  _ctor.prototype.addStone = function (e, t, o, s, r, c) {
    undefined === s && (s = true);
    undefined === r && (r = true);
    undefined === c && (c = false);
    if (t) {
      "number" == typeof t && (t = Math.ceil(t));
      t = r_jsbi.default.BigInt(t);
      s && r_UtilsSystem.UtilsSystem.showTip("获得灵石" + r_UtilsSystem.UtilsSystem.getShowCoin(t, 2, false));
      this.bigStone = r_jsbi.default.ADD(this.bigStone, t);
      this.data.stoneStr = this.bigStone.toString();
      this.saveData();
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.stoneChange);
    }
  };
  _ctor.prototype.deleteStone = function (e, t, o, s) {
    undefined === s && (s = false);
    "number" == typeof t && (t = Math.floor(t));
    t = r_jsbi.default.BigInt(t);
    return !r_jsbi.default.LT(this.bigStone, t) && (r_UtilsSystem.UtilsSystem.showTip("使用灵石:" + r_UtilsSystem.UtilsSystem.getShowCoin(t)), this.bigStone = r_jsbi.default.subtract(this.bigStone, t), this.data.stoneStr = this.bigStone.toString(), this.saveData(), r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.coinChange), true);
  };
  _ctor.prototype.addDonateCoin = function (e) {
    if (e) {
      "number" == typeof e && (e = Math.ceil(e));
      e = r_jsbi.default.BigInt(e);
      this.donateCoin = r_jsbi.default.ADD(this.donateCoin, e);
      this.data.donateCoinStr = this.donateCoin.toString();
      this.saveData();
    }
  };
  _ctor.prototype.setFarmSeed = function (e, t, o) {
    var i = false;
    for (var n = 0; n < this.data.farmSeedList.length; n++) {
      if (this.data.farmSeedList[n].id == e) {
        this.data.farmSeedList[n].num += t;
        i = true;
        if (this.data.farmSeedList[n].num <= 0) {
          this.data.farmSeedList.splice(n, 1);
          o && o();
        }
        break;
      }
    }
    i || this.data.farmSeedList.push({
      id: e,
      num: t
    });
    r_FarmUI.FarmUI.Inst && r_FarmUI.FarmUI.Inst.setListLength();
  };
  _ctor.prototype.isFarmMark = function (e) {
    for (var t = 0; t < this.data.farmMarkList.length; t++) {
      if (e == this.data.farmMarkList[t].id && this.data.farmMarkList[t].num > 0) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.addFarmMark = function (e) {
    var t = false;
    for (var o = 0; o < this.data.farmMarkList.length; o++) {
      if (e == this.data.farmMarkList[o].id) {
        this.data.farmMarkList[o].num += 1;
        t = true;
      }
    }
    if (!t) {
      var i = {
        id: e,
        num: 1
      };
      this.data.farmMarkList.push(i);
    }
  };
  _ctor.prototype.useFarmMark = function () {
    for (var e = 0; e < this.data.farmMarkList.length; e++) {
      this.data.farmMarkList[e].num -= 1;
    }
  };
  _ctor.prototype.checkDonateCoin = function () {
    return parseInt(this.data.donateCoinStr) > 0;
  };
  _ctor.prototype.initDonateCoin = function () {
    this.data.donateCoinStr = "0";
    this.donateCoin = r_jsbi.default.BigInt(0);
    this.saveData();
  };
  _ctor.prototype.addCoinInfo = function (e, t) {
    var o = this;
    var i = {};
    i.day = r_DaySystem.DaySystem.getShowDay();
    i.reason = e;
    i.num = t.toString();
    this.data.coinInfoList.push(i);
    this.data.coinInfoList = this.data.coinInfoList.filter(function (e, t) {
      return t >= o.data.coinInfoList.length - 30 && t < o.data.coinInfoList.length;
    });
  };
  _ctor.prototype.reportCoin = function () {
    var e = "10000000000";
    if (r_jsbi.default.LT(this.bigCoin, 1e4)) {
      e = "10000";
    } else if (r_jsbi.default.LT(this.bigCoin, 1e5)) {
      e = "100000";
    } else if (r_jsbi.default.LT(this.bigCoin, 1e6)) {
      e = "1000000";
    } else if (r_jsbi.default.LT(this.bigCoin, 1e7)) {
      e = "10000000";
    } else if (r_jsbi.default.LT(this.bigCoin, 1e8)) {
      e = "100000000";
    } else {
      r_jsbi.default.LT(this.bigCoin, 1e9) && (e = "1000000000");
    }
    r_PlatformSystem.PlatformSystem.report("Gold", {
      stage: e
    });
  };
  _ctor.prototype.deleteCoin = function (e, t, o, s) {
    undefined === o && (o = r_ReportSystem.SystemKey.None);
    undefined === s && (s = false);
    "number" == typeof t && (t = Math.floor(t));
    t = r_jsbi.default.BigInt(t);
    return !r_jsbi.default.LT(this.bigCoin, t) && (this.bigCoin = r_jsbi.default.subtract(this.bigCoin, t), s || r_UtilsSystem.UtilsSystem.showTip("使用金币:" + r_UtilsSystem.UtilsSystem.getShowCoin(t)), r_ReportSystem.ReportSystem.deleteCoin(e, t, o), this.addCoinInfo(e, r_jsbi.default.unaryMinus(t)), this.data.coinStr = this.bigCoin.toString(), this.saveData(), r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.coinChange), true);
  };
  _ctor.prototype.resetCoin = function () {
    this.bigCoin = r_jsbi.default.BigInt(0);
    this.data.coinStr = this.bigCoin.toString();
    this.saveData();
  };
  _ctor.prototype.saveData = function (e) {
    undefined === e && (e = true);
    console.log("saveData", this.data);
    e && (this.data.version = this.data.version + 1);
    try {
      var t = JSON.stringify(this.data);
      if (!t) {
        return;
      }
      r_PlatformSystem.PlatformSystem.isSupportFileData() && r_PlatformSystem.PlatformSystem.savePlayerData(t, function () {});
      cc.sys.localStorage.setItem(exports.PlayerData.PlayerDataStorageKey, t);
      var i = cc.sys.localStorage.getItem(exports.PlayerData.PlayerDataStorageKey);
      if (i) {
        try {
          this.data = JSON.parse(i);
          this.data;
        } catch (n) {}
      }
    } catch (n) {}
  };
  _ctor.prototype.setUpdateServerTime = function () {
    this.data.serverUpdateTime = r_TimeSystem.TimeSystem.getServerTime();
    this.saveData();
  };
  _ctor.prototype.updateFromServer = function (e) {
    var t = this.data.adPushMap;
    this.data = e;
    r_AdPushSystem.AdPushSystem.updateServerData(t);
    this.resetData();
    this.saveData(false);
    this.bigCoin = r_jsbi.default.BigInt(this.data.coinStr);
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.coinChange);
    this.bigDiamond = r_jsbi.default.BigInt(this.data.diamondStr);
    this.maxDiamond = r_jsbi.default.BigInt(this.data.maxDiamondStr);
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.DiamondChange);
    this.bigStone = r_jsbi.default.BigInt(this.data.stoneStr);
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.StoneChange);
    if (exports.PlayerData.data.isCloseSound) {
      r_SoundMgr.SoundMgr.soundVolume = 0;
    } else {
      r_SoundMgr.SoundMgr.soundVolume = 1;
    }
    if (r_SoundMgr.SoundMgr.curMusicName && exports.PlayerData.data.isCloseMusic) {
      r_SoundMgr.SoundMgr.stopMusic();
    } else {
      r_SoundMgr.SoundMgr.curMusicName || exports.PlayerData.data.isCloseMusic || r_SoundMgr.SoundMgr.playMusic("bgm");
    }
    0 != exports.PlayerData.data.newGuideStep && (exports.PlayerData.isNewPlayer = false);
  };
  _ctor.prototype.update = function (e) {
    if (this.data) {
      e > .1 && (e = .016);
      this.passTime = this.passTime + e;
      if (this.passTime >= 1) {
        this.passTime = 0;
        r_PlatformSystem.PlatformSystem.isSupportServerData() && r_TimeSystem.TimeSystem.getServerTime() - this.data.serverUpdateTime >= this.autoUpdateTime && r_HttpSystem.HttpSystem.checkUpdateOrUploadData(false);
      }
    }
  };
  _ctor.prototype.deleteDiamond = function (e, t) {
    undefined === t && (t = false);
    "number" == typeof e && (e = Math.floor(e));
    e = r_jsbi.default.BigInt(e);
    return !r_jsbi.default.LT(this.bigDiamond, e) && (this.bigDiamond = r_jsbi.default.subtract(this.bigDiamond, e), t || r_UtilsSystem.UtilsSystem.showTip("使用钻石:" + r_UtilsSystem.UtilsSystem.getShowCoin(e)), this.data.diamondStr = this.bigDiamond.toString(), this.saveData(), r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.DiamondChange), true);
  };
  _ctor.prototype.isDiamondEnough = function (e) {
    return !!r_jsbi.default.GE(this.bigDiamond, e);
  };
  _ctor.prototype.setComeInSysCount = function (e) {
    if (this.data.comeInSysCount[e]) {
      this.data.comeInSysCount[e].count += 1;
      this.data.comeInSysCount[e].time = this.data.time;
    } else {
      var t = {
        count: 1,
        time: this.data.time
      };
      this.data.comeInSysCount[e] = t;
    }
  };
  _ctor.prototype.getComeInSysCount = function (e) {
    if (this.data.comeInSysCount[e]) {
      return this.data.comeInSysCount[e].count;
    } else {
      return 0;
    }
  };
  return _ctor;
}();
exports._PlayerData = exp__PlayerData;
exports.PlayerData = new exp__PlayerData();