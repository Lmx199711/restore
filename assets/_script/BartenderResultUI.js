var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var def_BartenderResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Bartender, r_UIDef.UIDef.Res.UI.BartenderResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BartenderResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BartenderResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.imgicon = this.contentPane.getChild("imgicon");
    this.level = this.contentPane.getChild("level");
    this.labPrice = this.contentPane.getChild("labPrice");
    this.title = this.contentPane.getChild("title");
    this.labDesc = this.contentPane.getChild("labDesc");
    this.btnGet = this.contentPane.getChild("btnGet");
    this.btnDouble = this.contentPane.getChild("btnDouble");
    this.btnMianchu = this.contentPane.getChild("btnMianchu");
    this.btnGet.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickDouble, this);
    this.btnMianchu.onClick(this.onClickMainchu, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onClickGet = function () {
    if (this.data.earn >= 0) {
      r_PlayerData.PlayerData.addCoin("直播带货", this.data.earn, r_ReportSystem.SystemKey.小游戏);
    } else {
      if (!r_PlayerData.PlayerData.isCoinEnough(Math.abs(this.data.earn))) {
        r_PlayerData.PlayerData.deleteCoin("直播带货", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.小游戏);
        return void this.hide();
      }
      r_PlayerData.PlayerData.deleteCoin("直播带货", Math.abs(this.data.earn), r_ReportSystem.SystemKey.小游戏);
    }
    this.hide();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("直播带货双倍", function () {
      r_PlayerData.PlayerData.addCoin("直播带货双倍", 2 * e.data.earn, r_ReportSystem.SystemKey.小游戏);
      e.hide();
    });
  };
  _ctor.prototype.onClickMainchu = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("带货免除惩罚", function () {
      e.hide();
    });
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.isSucc ? 0 : 1;
    r_SoundMgr.SoundMgr.playSound(this.data.isSucc ? "win" : "fail");
    this.imgicon.url = this.data.isSucc ? "ui://Bartender/" + this.data.id : "ui://Bartender/bad";
    this.level.url = "ui://Bartender/level" + this.data.level;
    this.labPrice.text = r_UtilsSystem.UtilsSystem.numFormats(this.data.earn);
    this.title.url = this.data.isSucc ? "ui://Bartender/result" + this.data.id : "ui://Bartender/resultBad";
    this.labDesc.text = this.data.desc;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_BartenderResultUI;