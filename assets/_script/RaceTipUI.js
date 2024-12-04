var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaceTipUI = undefined;
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_RaceUI = require("RaceUI");
var exp_RaceTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Fun, r_UIDef.UIDef.Res.UI.RaceTipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RaceTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RaceTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnBack2").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnBack3").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnAdd").asButton.onClick(this.onClickAdd, this);
    this.contentPane.getChild("btnInfo").asButton.onClick(this.onClickInfo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.refreshInfo();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.refreshInfo = function () {
    if (_ctor.popTipNum) {
      if (1 == _ctor.popTipNum) {
        this.contentPane.getController("mode").selectedIndex = 1;
        var e = [_ctor.winIndex, _ctor.nextIndex];
        r_UtilsSystem.UtilsSystem.shuffle(e);
        var o = "";
        for (var i = 0; i < 2; i++) {
          o = o + "【" + r_RaceUI.RaceUI.getNameByIndex(e[i]) + "】";
        }
        this.contentPane.getChild("content2").text = "看你这么诚恳的份上，我就稍微透漏一点消息给你，这场比赛[color=#DA694B]" + o + "[/color]状态火热，获胜者将在它俩之间诞生";
      } else {
        this.contentPane.getController("mode").selectedIndex = 2;
        o = "【" + r_RaceUI.RaceUI.getNameByIndex(_ctor.winIndex) + "】";
        this.contentPane.getChild("content2").text = "经过我的仔细观察，发现这场必赢的小动物就是[color=#DA694B]" + o + "[/color]，你买下就知道了";
      }
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
    }
  };
  _ctor.prototype.onClickAdd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("赛马消息", function () {
      _ctor.popTipNum = 1;
      if (r_DebugSystem.DebugSystem.raceType) {
        _ctor.winIndex = r_DebugSystem.DebugSystem.raceType;
      } else {
        _ctor.winIndex = r_UtilsSystem.UtilsSystem.getRandomFromArr(_ctor.randomArray);
      }
      _ctor.nextIndex = r_UtilsSystem.UtilsSystem.getRandomFromArrExcept(_ctor.randomArray, _ctor.winIndex);
      r_PlayerData.PlayerData.saveData();
      e.refreshInfo();
    });
  };
  _ctor.prototype.onClickInfo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("赛马精确消息", function () {
      _ctor.popTipNum = 2;
      r_PlayerData.PlayerData.saveData();
      e.refreshInfo();
    });
  };
  _ctor.randomArray = [1, 2, 3, 4];
  _ctor.Inst = null;
  _ctor.popTipNum = 0;
  _ctor.winIndex = 0;
  _ctor.nextIndex = 0;
  return _ctor;
}(r_TYIndex.UIWind);
exports.RaceTipUI = exp_RaceTipUI;