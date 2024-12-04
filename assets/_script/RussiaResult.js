var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_RussiaGameUI = require("RussiaGameUI");
var def_RussiaResult = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Russia, r_UIDef.UIDef.Res.UI.RussiaResult) || this;
    t.showAnimFlag = false;
    t.gifts = [];
    t.m_once = 0;
    t.m_index = 0;
    t.m_price = [1e7, 5e7, 1e8];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RussiaResult, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RussiaResult);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 0; t < 3; t++) {
      this.contentPane.getChild("gift" + t).asCom.onClick(this.onClickGift.bind(this, t), this);
    }
    this.bindBtnCallback(this.btnVideo, this.btnCaidan);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    r_RussiaGameUI.default.hide();
  };
  _ctor.prototype.restart = function () {
    this.gifts = [];
    for (var e = 0; e < 3; e++) {
      var t = this.contentPane.getChild("gift" + e).asCom;
      t.getController("c1").selectedIndex = 0;
      t.getController("max").selectedIndex = 0;
      t.enabled = true;
      this.gifts.push(t);
    }
    this.m_index = 0;
    this.m_once = 0;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.m_price = [5e9, 1e9, 2e10];
    this.labBubble.text = "没想到你真的通关了，下面领取你的奖励吧";
  };
  _ctor.prototype.onClickGift = function (e) {
    this.gifts[e].getController("c1").selectedIndex = this.m_index + 1;
    r_PlayerData.PlayerData.addCoin("俄罗斯轮盘奖励", this.m_price[this.m_index], r_ReportSystem.SystemKey.俄罗斯轮盘);
    this.m_index++;
    this.contentPane.getController("c1").selectedIndex = 1;
    this.gifts.forEach(function (e) {
      e.enabled = false;
      e.grayed = false;
    });
    this.gifts.splice(e, 1);
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("俄罗斯轮盘追加奖励", function () {
      e.gifts.shift().getController("c1").selectedIndex = e.m_index + 1;
      r_PlayerData.PlayerData.addCoin("俄罗斯轮盘奖励", e.m_price[e.m_index], r_ReportSystem.SystemKey.俄罗斯轮盘);
      e.m_index++;
      e.gifts.length <= 0 && r_TimeSystem.TimeSystem.scheduleOnce("end", 1, e.hide.bind(e));
    });
  };
  _ctor.prototype.onClickbtnCaidan = function () {
    if (0 != this.gifts.length && 1 != this.m_once && 0 == this.m_once) {
      this.m_once++;
      this.m_price = [5e9, 5e9, 5e9];
      this.labBubble.text = "这个奖励才是最好的哦";
      this.gifts.forEach(function (e, t) {
        0 == t && (e.getController("max").selectedIndex = 1);
      });
      this.m_price[this.m_index] = 2e10;
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCaidan")], _ctor.prototype, "btnCaidan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labBubble")], _ctor.prototype, "labBubble", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_RussiaResult;