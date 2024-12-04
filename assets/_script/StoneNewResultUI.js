var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_StoneNewSystem = require("StoneNewSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_StoneNewCfg = require("StoneNewCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_StoneNewCutUI = require("StoneNewCutUI");
var r_StoneNewUI = require("StoneNewUI");
var def_StoneNewResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.StoneNew, r_UIDef.UIDef.Res.UI.StoneNewResultUI) || this;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneNewResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneNewResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.leftVect = cc.v2(this.icon_left.x, this.icon_left.y);
    this.rightVect = cc.v2(this.icon_right.x, this.icon_right.y);
    this.awardVect = cc.v2(this.award.x, this.award.y);
    this.bindBtnCallback(this.btnSell, this.btnDouble, this.btnSave);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.contentPane.getController("mode").selectedIndex = 0;
    this.icon_left.x = this.leftVect.x;
    this.icon_left.y = this.leftVect.y;
    this.icon_left.url = "ui/stoneNew/icon" + this.data.stoneData.stoneId + "_0";
    this.icon_right.x = this.rightVect.x;
    this.icon_right.y = this.rightVect.y;
    this.icon_right.url = "ui/stoneNew/icon" + this.data.stoneData.stoneId + "_1";
    this.award.x = this.awardVect.x;
    this.award.y = this.awardVect.y;
    this.award.url = "ui/stoneNew/award/award" + this.data.stoneData.awardId;
    this.lose.visible = false;
    this.win.visible = false;
    this.loseLight.visible = false;
    this.winLight.visible = false;
    var t = r_StoneNewCfg.StoneNewAwardCfg[this.data.stoneData.awardId];
    this.content.text = t.desc;
    this.labName.text = t.name;
    this.contentPane.getTransition("anim").play(function () {
      e.contentPane.getController("mode").selectedIndex = 1;
      e.lose.visible = e.data.stoneData.price >= e.data.stoneData.coin;
      e.win.visible = e.data.stoneData.price < e.data.stoneData.coin;
      e.loseLight.visible = e.data.stoneData.price >= e.data.stoneData.coin;
      e.winLight.visible = e.data.stoneData.price < e.data.stoneData.coin;
      e.data.stoneData.price >= e.data.stoneData.coin && r_SoundMgr.SoundMgr.playSound("fail");
      e.data.stoneData.price < e.data.stoneData.coin && r_SoundMgr.SoundMgr.playSound("win");
      e.contentPane.getTransition("result").play();
      e.btnSell.getChild("title").text = r_UtilsSystem.UtilsSystem.numFormats(e.data.stoneData.coin);
      e.btnSave.visible = e.data.stoneData.awardId >= 22;
    });
  };
  _ctor.prototype.onClickbtnSell = function () {
    r_PlayerData.PlayerData.addCoin("新切石头", this.data.stoneData.coin, r_ReportSystem.SystemKey.石头);
    this.hide();
    r_StoneNewCutUI.StoneNewCutUI.hide();
    r_StoneNewUI.default.instance && r_StoneNewUI.default.instance.restart();
  };
  _ctor.prototype.onClickbtnDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("石头结算翻倍", function () {
      r_PlayerData.PlayerData.addCoin("新切石头", 2 * e.data.stoneData.coin, r_ReportSystem.SystemKey.石头);
      e.hide();
      r_StoneNewCutUI.StoneNewCutUI.hide();
      r_StoneNewUI.default.instance && r_StoneNewUI.default.instance.restart();
    });
  };
  _ctor.prototype.onClickbtnSave = function () {
    r_StoneNewSystem.StoneNewSystem.svaeDogzById(this.data.stoneData.awardId);
    this.hide();
    r_StoneNewCutUI.StoneNewCutUI.hide();
    r_StoneNewUI.default.instance && r_StoneNewUI.default.instance.restart();
  };
  __decorate([r_DecorateFunction1.AutoFind("icon_left")], _ctor.prototype, "icon_left", undefined);
  __decorate([r_DecorateFunction1.AutoFind("icon_right")], _ctor.prototype, "icon_right", undefined);
  __decorate([r_DecorateFunction1.AutoFind("award")], _ctor.prototype, "award", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lose")], _ctor.prototype, "lose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("win")], _ctor.prototype, "win", undefined);
  __decorate([r_DecorateFunction1.AutoFind("loseLight")], _ctor.prototype, "loseLight", undefined);
  __decorate([r_DecorateFunction1.AutoFind("winLight")], _ctor.prototype, "winLight", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSell")], _ctor.prototype, "btnSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("content")], _ctor.prototype, "content", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSave")], _ctor.prototype, "btnSave", undefined);
  __decorate([r_DecorateFunction1.AutoFind("name")], _ctor.prototype, "labName", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_StoneNewResultUI;