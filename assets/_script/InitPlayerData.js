Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitPlayerData = undefined;
var exp_InitPlayerData = function () {
  function _ctor() {}
  _ctor.initFishNetNum = function () {
    return {
      normalNet: 0,
      bestNet: 0,
      fishEgg: false,
      dragonEgg: false,
      lightGodEgg: false
    };
  };
  _ctor.initSnackRoomFull = function () {
    return {
      unLock: 0,
      isGuide: 0,
      workTime: [10, 18],
      comeInTime: 0,
      startSellTime: 0,
      expendTime: 0,
      isCanSell: 0,
      rewardMoney: 0,
      employeeMap: [],
      employeeId: 0,
      giftGrade: 1,
      giftStar: 0,
      highGiftGrade: 1,
      highGiftStar: 0,
      highStartSellTime: 0,
      highExpendTime: 0,
      isHighCanSell: 0,
      highRewardMoney: 0,
      score: 0,
      isGameGuide: 0,
      boxCreateCount: 0,
      boxCreateTime: 0,
      highBoxCreateCount: 0,
      highBoxCreateTime: 0,
      isCandan: 0,
      boxCreateInfo: []
    };
  };
  _ctor.initShopMap = function () {
    return {
      shopGoodsList: [],
      buyTime: 0,
      freeCount: 0,
      refreshCount: 0,
      trunCount: 3
    };
  };
  _ctor.initBagData = function () {
    return {
      goodsList: [],
      bag1BoxCount: 12,
      bag2BoxCount: 12,
      bag3BoxCount: 12
    };
  };
  _ctor.initGiveRedPacketData = function () {
    return {
      isGuide: 0,
      caidan1: 0,
      caidan2: 0
    };
  };
  _ctor.initRiverHaiBoDong = function () {
    return {
      unlock: 0,
      firstClick: 0,
      isCancaidan: 0,
      curGoodsList: [],
      curGoodsCountList: [],
      curDouble: .2,
      curDoubleCount: 0,
      isFanYi: 0
    };
  };
  _ctor.initCountMoneyGame = function () {
    return {
      caidan1: 0,
      caidan2: 0,
      caidan3: 0
    };
  };
  _ctor.initMysteryShopMap = function () {
    return {
      goodsList: [],
      refreshTime: 0,
      videoCount: 0,
      exchangeCardCount: 0,
      caidan: 0
    };
  };
  _ctor.initFerruleGameMap = function () {
    return {
      jianbaoList: [],
      jianbaoNum: 3,
      isFirst: 0,
      hitFamaleBossNum: 0,
      caidan: 0
    };
  };
  _ctor.initHuntMap = function () {
    return {
      unlock: 0,
      isGuide: 0,
      isGuide2: 0,
      pass: 0,
      dayPlay: 0,
      playTime: 0,
      caidan1: 0
    };
  };
  _ctor.syncMapData = function (e, t) {
    if (Object.keys(e).length > Object.keys(t).length) {
      for (var o in t) e[o] = t[o];
      return e;
    }
    return t;
  };
  return _ctor;
}();
exports.InitPlayerData = exp_InitPlayerData;