var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumBallResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_NumBallUI = require("NumBallUI");
var r_ReportSystem = require("ReportSystem");
var exp_NumBallResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.NumBallResultUI) || this;
    t.randomList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.NumBallResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.NumBallResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnGet").asButton.onClick(this.onClickGet, this);
    this.contentPane.getChild("btnVideo").asButton.onClick(this.onClickVideo, this);
    this.contentPane.getChild("btnRestart").asButton.onClick(this.onClickRestart, this);
    for (var t = 1; t <= 20; t++) {
      this.randomList.push(t);
    }
  };
  _ctor.prototype.isTriggerDebug = function () {
    if (r_PlayerData.PlayerData.data.debugNumBallVersion == r_NumBallUI.NumBallUI.debugVersion) {
      return false;
    }
    var e = true;
    for (var t = 0; t < 5; t++) {
      if (-1 == r_PlayerData.PlayerData.data.numBallData.selectList.indexOf(r_NumBallUI.NumBallUI.debugNum[t])) {
        e = false;
        break;
      }
    }
    return !!e;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    var o = [];
    if (this.isTriggerDebug()) {
      r_UtilsSystem.UtilsSystem.shuffle(r_NumBallUI.NumBallUI.debugNum);
      for (var i = 0; i < 5; i++) {
        o.push(r_NumBallUI.NumBallUI.debugNum[i]);
      }
    } else {
      r_UtilsSystem.UtilsSystem.shuffle(this.randomList);
      for (i = 0; i < 5; i++) {
        o.push(this.randomList[i]);
      }
    }
    this.correctNum = 0;
    for (i = 0; i < 5; i++) {
      var n = this.contentPane.getChild("item" + (i + 1));
      n.getChild("num1").text = o[i] + "";
      n.getChild("num2").text = o[i] + "";
      if (r_PlayerData.PlayerData.data.numBallData.selectList.indexOf(o[i]) > -1) {
        n.getController("mode").selectedIndex = 1;
        this.correctNum = this.correctNum + 1;
      } else {
        n.getController("mode").selectedIndex = 0;
      }
    }
    if (this.correctNum) {
      this.contentPane.getController("mode").selectedIndex = 1;
      this.contentPane.getChild("level").url = "ui://Lottery/level" + (6 - this.correctNum);
      this.contentPane.getChild("coin").text = r_UtilsSystem.UtilsSystem.getShowCoin(_ctor.coinList[this.correctNum - 1]);
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.clearData();
    r_NumBallUI.NumBallUI.refreshAll();
    _ctor.Inst = null;
  };
  _ctor.prototype.onClickRestart = function () {
    this.hide();
  };
  _ctor.prototype.onClickGet = function () {
    var e = _ctor.coinList[this.correctNum - 1];
    r_PlayerData.PlayerData.addCoin("彩色球", e, r_ReportSystem.SystemKey.彩票);
    this.hide();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("彩色球", function () {
      var o = 5 * _ctor.coinList[e.correctNum - 1];
      r_PlayerData.PlayerData.addCoin("彩色球", o, r_ReportSystem.SystemKey.彩票);
      e.hide();
    });
  };
  _ctor.prototype.clearData = function () {
    this.isTriggerDebug() && (r_PlayerData.PlayerData.data.debugNumBallVersion = r_NumBallUI.NumBallUI.debugVersion);
    r_PlayerData.PlayerData.data.numBallData.selectList = null;
    r_PlayerData.PlayerData.data.numBallData.selectTime = null;
    r_NumBallUI.NumBallUI.selectMap = {};
    r_NumBallUI.NumBallUI.targetMap = {};
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.Inst = null;
  _ctor.coinList = [5e3, 5e4, 5e5, 1e6, 5e6];
  return _ctor;
}(r_TYIndex.UIWind);
exports.NumBallResultUI = exp_NumBallResultUI;