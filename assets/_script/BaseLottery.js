var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CaidanSystem = require("CaidanSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LotteryCfg = require("LotteryCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_EraseCom = require("EraseCom");
var r_BaseWin = require("BaseWin");
var def_BaseLottery = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.showAnimFlag = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    r_CaidanSystem.CaidanSystem.initData(this.winId);
    var o = this.getCfg();
    this.contentPane.visible = false;
    this.bindBtnCallback(this.btnAgain);
    this.btnAgain.getChild("num").text = r_UtilsSystem.UtilsSystem.numFormats(o.tickets);
    r_CaidanSystem.CaidanSystem.bindBtnById(o.tipId, this.btnTip, o.videoId);
    r_ResSystem.ResSystem.loadBundleRes(o.bundleName, o.preab, cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.contentPane.visible = true;
      t.restart();
    });
    this.btnAgain.visible = false;
  };
  _ctor.prototype.onClickbtnAgain = function () {
    var e = this.getCfg();
    if (r_PlayerData.PlayerData.isCoinEnough(e.tickets)) {
      r_PlayerData.PlayerData.deleteCoin("彩票门票", e.tickets, r_ReportSystem.SystemKey.彩票);
      this.btnAgain.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.cleanSuccess = function () {};
  _ctor.prototype.cleanAllSuccess = function () {
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.eraseCom && this.restart();
  };
  _ctor.prototype.restart = function () {
    this.eraseCom.startClean();
    var e = this.getCfg();
    this.btnAgain.visible = false;
    var t = [];
    e.tipNum.forEach(function (o) {
      console.log("PlayerData.data.lotteryGameMap: ", r_PlayerData.PlayerData.data.lotteryGameMap);
      console.log("PlayerData.data.lotteryGameMap[t_cfg.tipId]:", r_PlayerData.PlayerData.data.lotteryGameMap[e.tipId]);
      t.push(r_PlayerData.PlayerData.data.lotteryGameMap[e.tipId][o]);
    });
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, t, r_PlayerData.PlayerData.data.lotteryGameMap[e.tipId][e.videoId]);
  };
  _ctor.prototype.getCfg = function () {
    var e = this;
    return r_LotteryCfg.LotteryCfg.find(function (t) {
      return e.winId == t.id;
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BaseLottery;