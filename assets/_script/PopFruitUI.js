var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopFruitUI = undefined;
var r_Index = require("Index");
var r_Tb = require("Tb");
var r_UIDef = require("UIDef");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_CommonWordAdUI = require("CommonWordAdUI");
var r_AFairyEvent = require("AFairyEvent");
var r_FirstVideoSystem = require("FirstVideoSystem");
var exp_PopFruitUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.popFruit0) || this;
    t.showAnimFlag = true;
    t.isMustUp = false;
    t.isMustDown = false;
    t.petLv = 0;
    t.tbInfo = null;
    t.isAd = true;
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
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PopFruitUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PopFruitUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.close, this);
    this.btnExit.onClick(this.close, this);
    this.btnVideo.onClick(this.clickVideo, this);
    if (r_Index.Platform.isMiniPlatform()) {
      this.iconFruit.clearClick();
      this.iconGmDown.clearClick();
    } else {
      this.iconFruit.onClick(this.clickFruit, this);
      this.iconGmDown.onClick(this.clickGmDown, this);
    }
  };
  _ctor.prototype.close = function () {
    this.hide();
  };
  _ctor.prototype.clickFruit = function () {
    this.isMustUp = true;
    this.isMustDown = false;
    r_UtilsSystem.UtilsSystem.showTip("下次必涨");
  };
  _ctor.prototype.clickGmDown = function () {
    this.isMustDown = true;
    this.isMustUp = false;
    r_UtilsSystem.UtilsSystem.showTip("下次必跌");
  };
  _ctor.prototype.clickVideo = function () {
    var e = this;
    if (!this.tbInfo) {
      r_UtilsSystem.UtilsSystem.showTip("无法提升等级了");
      return void this.hide();
    }
    if (this.isAd) {
      r_PlatformSystem.PlatformSystem.showVideo("器武魂果实", function () {
        e.getChangeLevel();
        e.hide();
      });
    } else {
      this.getChangeLevel();
      r_FirstVideoSystem.FirstVideoSystem.setFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.首次吃果实);
      this.hide();
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.isMustUp = false;
    this.isMustDown = false;
    this.initData();
  };
  _ctor.prototype.initData = function () {
    this.petLv = r_PlayerData.PlayerData.data.weapon.pet[0].lv || 0;
    if (r_FirstVideoSystem.FirstVideoSystem.hasFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.首次吃果实)) {
      this.btnVideo.getController("noAd").selectedIndex = 0;
      this.isAd = true;
    } else {
      this.btnVideo.getController("noAd").selectedIndex = 1;
      this.isAd = false;
    }
    if (this.data) {
      this.txtDesc.text = this.data.desc;
      this.btnVideo.text = this.data.word2;
      this.btnVideo.getChild("txtWord").asTextField.text = this.data.word2;
      this.btnExit.text = this.data.word1;
    }
    this.findFruitInfo();
  };
  _ctor.prototype.findFruitInfo = function () {
    for (var e = 0; e < r_Tb.Tb.WpPetFruit.length; e++) {
      if (this.petLv <= r_Tb.Tb.WpPetFruit[e].level) {
        this.tbInfo = r_Tb.Tb.WpPetFruit[e];
        break;
      }
    }
  };
  _ctor.prototype.getChangeLevel = function () {
    var e = [];
    var t = true;
    if (null != this.tbInfo.rate) {
      if (Math.floor(100 * Math.random()) + 1 < this.tbInfo.rate) {
        e = this.tbInfo.up;
      } else {
        e = this.tbInfo.down;
        t = false;
      }
    } else {
      e = __spreadArrays(this.tbInfo.up, this.tbInfo.down);
    }
    if (this.isMustUp) {
      t = true;
      e = this.tbInfo.up;
    }
    if (this.isMustDown) {
      t = false;
      e = this.tbInfo.down;
    }
    var o = r_UtilsSystem.UtilsSystem.getWeightAny(e);
    if (t) {
      if (o < this.tbInfo.up.length) {
        this.upLevel(o + 1);
      } else {
        this.downLevel(o - 9);
      }
    } else {
      this.downLevel(o + 1);
    }
  };
  _ctor.prototype.upLevel = function (e) {
    var t = this;
    this.ChangePlayerLv(e);
    r_CommonWordAdUI.CommonWordAdUI.showUI({
      desc: "恭喜你，器武魂提高" + e + "级！看广告额外获得[color=#b9563f]" + this.tbInfo.upAdd + "经验[/color]",
      word1: "不用了",
      word2: "获得",
      report: "额外果实经验",
      videoCallback: function () {
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.PetFruitMsg, {
          getExp: t.tbInfo.upAdd,
          isDown: false
        });
      },
      closeCallback: function () {
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.PetFruitMsg);
      }
    });
  };
  _ctor.prototype.downLevel = function (e) {
    var t = this;
    var o = -1 * e;
    this.ChangePlayerLv(o);
    r_CommonWordAdUI.CommonWordAdUI.showUI({
      desc: "很不幸，器武魂降低" + e + "级，看广告[color=#qb7012]免罚[/color]并加[color=#b9563f]" + this.tbInfo.downAdd + "经验[/color]",
      word1: "含泪受罚",
      word2: "免罚",
      report: "挽救果实降级",
      videoCallback: function () {
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.PetFruitMsg, {
          getExp: t.tbInfo.downAdd,
          isDown: true
        });
      },
      closeCallback: function () {
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.PetFruitMsg);
      }
    });
  };
  _ctor.prototype.ChangePlayerLv = function (e) {
    var t = r_PlayerData.PlayerData.data.weapon.pet[0].lv;
    if (t + e > r_WeaponSystem.WeaponSystem.MaxPetLv()) {
      r_PlayerData.PlayerData.data.weapon.pet[0].lv = r_WeaponSystem.WeaponSystem.MaxPetLv();
    } else {
      r_PlayerData.PlayerData.data.weapon.pet[0].lv = t + e < 0 ? 0 : t + e;
    }
    if (0 == r_PlayerData.PlayerData.data.weapon.pet[0].lv) {
      r_PlayerData.PlayerData.data.weapon.pet[0].exp = 0;
    } else if (e < 0) {
      var o = r_PlayerData.PlayerData.data.weapon.pet[0].lv;
      var i = Number(r_PlayerData.PlayerData.data.weapon.pet[0].id);
      var n = r_WeaponSystem.WeaponSystem.GetWpPetInfo(i);
      var a = r_WeaponSystem.WeaponSystem.GetWpPetLvInfo(n.expInfo);
      var s = Math.floor(a.num[o] / 2);
      r_PlayerData.PlayerData.data.weapon.pet[0].exp = s;
    }
    r_PlayerData.PlayerData.saveData();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnExit")], _ctor.prototype, "btnExit", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconFruit")], _ctor.prototype, "iconFruit", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconGmDown")], _ctor.prototype, "iconGmDown", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.PopFruitUI = exp_PopFruitUI;