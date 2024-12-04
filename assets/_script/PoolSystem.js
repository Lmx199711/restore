Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PoolSystem = exports._PoolSystem = undefined;
var r_PoolMgr = require("PoolMgr");
var r_GameSelfSystem = require("GameSelfSystem");
var exp__PoolSystem = function () {
  function _ctor() {
    this.TipCom = "TipCom";
    this.CoinImg = "CoinImg";
    this.MianCoinImg = "MianCoinImg";
    this.addCoinCom = "addCoinCom";
    this.WordImg = "WordImg";
    this.expNum = "expNum";
    this.CoinTipCom = "CoinTipCom";
    this.CoinTipCom2 = "CoinTipCom2";
    this.GodWealthAward = "GodWealthAward";
    this.MeritCom = "MeritCom";
    this.MeritCom2 = "MeritCom2";
    this.ExpTipCom = "ExpTipCom";
    this.ExpTipCom2 = "ExpTipCom2";
    this.DiamondTipCom = "DiamondTipCom";
    this.hongbao = "honebao";
    this.TrashTipCom = "TrashTipCom";
    this.Qianqian = "qianqian";
    this.YuanBao = "YuanBao";
    this.ZhazhaHuiProp1 = "ZhazhaHuiProp1";
    this.ZhazhaHuiProp2 = "ZhazhaHuiProp2";
    this.ZhazhaHuiProp3 = "ZhazhaHuiProp3";
    this.ZhazhaHuiProp4 = "ZhazhaHuiProp4";
    this.ZhazhaHuiProp5 = "ZhazhaHuiProp5";
    this.dissMoney = "dissMoney";
    this.isInitMain = false;
    this.isInitGame = false;
    this.isInitGameUI = false;
    this.adornMap = {};
    this.adornCallMap = {};
  }
  _ctor.prototype.initMain = function () {
    if (!this.isInitMain) {
      this.isInitMain = true;
      this.createUIObjPool(exports.PoolSystem.TipCom, "ui://MainHome/TipCom", 1, r_GameSelfSystem.GameSelfSystem.uiTopRoot);
      this.createUIObjPool(exports.PoolSystem.CoinImg, "ui://MainHome/CoinImg", 1, r_GameSelfSystem.GameSelfSystem.uiTopRoot);
      this.createUIObjPool(exports.PoolSystem.WordImg, "ui://MainHome/WordCom", 1, r_GameSelfSystem.GameSelfSystem.uiTopRoot);
      this.createUIObjPool(exports.PoolSystem.TrashTipCom, "ui://MainHome/TrashTipCom", 1, r_GameSelfSystem.GameSelfSystem.uiTopRoot);
    }
  };
  _ctor.prototype.addPool = function (e) {
    undefined === e && (e = r_GameSelfSystem.GameSelfSystem.uiTopRoot);
    this.createUIObjPool(exports.PoolSystem.CoinTipCom, "ui://MainHome/CoinTipCom", 1, e);
  };
  _ctor.prototype.createSceneObjPool = function () {};
  _ctor.prototype.createUIObjPool = function (e, t, o, a) {
    r_PoolMgr.PoolMgr.createPool(e, function () {
      return fgui.UIPackage.createObjectFromURL(t).asCom;
    }, o, function (e) {
      a && a.addChild(e);
      return e;
    }, function (e) {
      r_GameSelfSystem.GameSelfSystem.uiHideRoot.addChild(e);
      return e;
    }, function (e) {
      e.dispose();
    });
  };
  _ctor.prototype.createObj = function (e) {
    return r_PoolMgr.PoolMgr.createObj(e);
  };
  _ctor.prototype.revert = function (e, t) {
    r_PoolMgr.PoolMgr.revert(e, t);
  };
  return _ctor;
}();
exports._PoolSystem = exp__PoolSystem;
exports.PoolSystem = new exp__PoolSystem();