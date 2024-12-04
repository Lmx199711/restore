var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandDrawUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponDrawSystem = require("WeaponDrawSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_StoneVideoUI = require("StoneVideoUI");
var r_FairyLandDrawCardUI = require("FairyLandDrawCardUI");
var exp_FairyLandDrawUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandDraw, r_UIDef.UIDef.Res.UI.FairyLandDrawUI) || this;
    t.baodiRemain1 = 0;
    t.baodiRemain2 = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandDrawUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandDrawUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      return t.hide();
    });
    this.btnBack.onClick(function () {
      return t.hide();
    });
    this.btnDraw1.onClick(this.draw1.bind(this));
    this.btnDraw5.onClick(this.draw5.bind(this));
    this.btnDrawGuide.onClick(this.drawGuide.bind(this));
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_WeaponSystem.WeaponSystem.checkInitDraw();
    _ctor.Inst = this;
    this.refreshAll();
    r_TimeSystem.TimeSystem.registSecondUpdate("towerDraw", this.updateSecond.bind(this));
    this.updateTime();
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.coinChange, this.refreshBar, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.stoneChange, this.refreshBar, this);
    this.drawBtnCanShowRedTip();
    this.refreshGuide();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("towerDraw");
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.coinChange, this.refreshBar, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.stoneChange, this.refreshBar, this);
  };
  _ctor.prototype.refreshGuide = function () {
    if (r_PlayerData.PlayerData.data.isFairyDrawGuide) {
      this.btnDraw5.visible = true;
      this.btnDrawGuide.visible = false;
    } else {
      this.btnDraw5.visible = false;
      this.btnDrawGuide.visible = true;
    }
  };
  _ctor.prototype.updateSecond = function () {
    this.updateTime();
  };
  _ctor.prototype.updateTime = function () {
    var e = r_TimeSystem.TimeSystem.getServerTime();
    if (e > r_PlayerData.PlayerData.data.draw[1].nextTime) {
      var t = r_WeaponSystem.WeaponSystem.GetWpRecPool(1);
      t.cost;
      t.count;
      t.type;
      t.weight;
      t.desc;
      var o = t.drawTime;
      t.drawCool;
      if (r_PlayerData.PlayerData.data.draw[1].use >= o) {
        r_PlayerData.PlayerData.data.draw[1].use = 0;
        this.refreshPool1();
      }
      this.txtTime.visible = false;
      this.txtCost.visible = true;
      this.contentPane.getChild("n15").visible = true;
    } else {
      var i = r_PlayerData.PlayerData.data.draw[1].nextTime - e;
      this.txtTime.text = "刷新时间:" + r_TimeSystem.TimeSystem.getTimeStr(i);
      this.txtTime.visible = true;
      this.txtCost.visible = false;
      this.contentPane.getChild("n15").visible = false;
    }
  };
  _ctor.prototype.refreshAll = function () {
    this.txtRemainTime = this.btnDraw1.getChild("txtRemainTime");
    this.refreshBar();
    this.refreshPool1();
    this.refreshPool2();
  };
  _ctor.prototype.refreshBar = function () {
    this.drawBtnCanShowRedTip();
  };
  _ctor.prototype.refreshDrawNum = function () {
    this.refreshPool1();
    this.refreshPool2();
  };
  _ctor.prototype.refreshPool1 = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWpRecPool(1);
    var t = e.cost;
    var o = e.count;
    e.type;
    e.weight;
    var i = e.desc;
    var n = e.drawTime;
    e.drawCool;
    var a = r_PlayerData.PlayerData.data.draw[1];
    this.baodiRemain1 = o - (null == a ? undefined : a.hasDefeat) || 0;
    this.txtDesc1.text = i.replace("#", this.baodiRemain1 + "");
    this.txtCost.text = "消耗：" + t;
    var s = n - a.use >= 0 ? n - a.use : 0;
    this.txtRemainTime.text = s + "/" + n;
    this.btnDraw1.enabled = true;
  };
  _ctor.prototype.refreshPool2 = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWpRecPool(2);
    var t = e.count;
    var o = e.desc;
    var i = r_PlayerData.PlayerData.data.draw[2];
    this.baodiRemain2 = t - i.hasDefeat;
    this.txtDesc2.text = o.replace("#", this.baodiRemain2 + "");
  };
  _ctor.prototype.draw1 = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWpRecPool(1);
    var t = e.cost;
    e.count;
    e.type;
    e.weight;
    e.desc;
    var o = e.drawTime;
    e.drawCool;
    if (r_PlayerData.PlayerData.data.draw[1].use >= o) {
      r_UtilsSystem.UtilsSystem.showTip("次数不足哦");
    } else if (r_PlayerData.PlayerData.isStoneEnough(t)) {
      var i = r_WeaponDrawSystem.WeaponDrawSystem.drawOne();
      r_PlayerData.PlayerData.deleteStone("随机获取材料", t, r_ReportSystem.SystemKey.灵石交易);
      this.refreshAll();
      r_FairyLandDrawCardUI.FairyLandDrawCardUI.showUI({
        num: 1,
        recipe: i
      });
      this.drawBtnCanShowRedTip();
    } else {
      r_StoneVideoUI.StoneVideoUI.showUI();
    }
  };
  _ctor.prototype.draw5 = function () {
    r_PlatformSystem.PlatformSystem.showVideo("材料-五连抽", function () {
      var e = r_WeaponDrawSystem.WeaponDrawSystem.drawFive();
      r_FairyLandDrawCardUI.FairyLandDrawCardUI.showUI({
        num: 5,
        recipeList: e
      });
    });
  };
  _ctor.prototype.drawGuide = function () {
    var e = r_WeaponDrawSystem.WeaponDrawSystem.drawFive();
    r_FairyLandDrawCardUI.FairyLandDrawCardUI.showUI({
      num: 5,
      recipeList: e
    });
    this.refreshGuide();
  };
  _ctor.prototype.drawFromWeight = function (e) {
    var t = r_WeaponSystem.WeaponSystem.GetWpRecPool(e).weight.split(",");
    var o = [1e3, 0, 0, 0];
    var i = 0;
    for (var n = 0; n < 4; n++) {
      var a = parseInt(t[n]);
      o[n] = i + a;
      i = o[n];
    }
    var s = Math.random() * i;
    for (var r = 0; r < 4 && !(s < o[r]); r++) {
      ;
    }
    var c = r + 1;
    return r_WeaponSystem.WeaponSystem.getRandomRecipe(c);
  };
  _ctor.prototype.drawBtnCanShowRedTip = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWpRecPool(1);
    var t = e.cost;
    e.count;
    e.type;
    e.weight;
    e.desc;
    var o = e.drawTime;
    e.drawCool;
    if (r_PlayerData.PlayerData.data.draw[1].use < o && r_PlayerData.PlayerData.isStoneEnough(t)) {
      this.btnDraw1.getChild("redTip").visible = true;
      return true;
    } else {
      this.btnDraw1.getChild("redTip").visible = false;
      return false;
    }
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtCost")], _ctor.prototype, "txtCost", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDraw1")], _ctor.prototype, "btnDraw1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDraw5")], _ctor.prototype, "btnDraw5", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDrawGuide")], _ctor.prototype, "btnDrawGuide", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc1")], _ctor.prototype, "txtDesc1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc2")], _ctor.prototype, "txtDesc2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtTime")], _ctor.prototype, "txtTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandDrawUI = exp_FairyLandDrawUI;