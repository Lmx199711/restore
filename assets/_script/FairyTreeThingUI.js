var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyTreeThingUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_FairyTreeCfg = require("FairyTreeCfg");
var r_jsbi = require("jsbi");
var r_UtilsSystem = require("UtilsSystem");
var r_ReportSystem = require("ReportSystem");
var exp_FairyTreeThingUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandTg, r_UIDef.UIDef.Res.UI.FairyTreeThing) || this;
    t.uiType = "fullScreen";
    t.fontSize = 40;
    t.recId1 = -1;
    t.recName1 = "";
    t.recId2 = -1;
    t.recName2 = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FairyTreeThingUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyTreeThingUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btn1.onClick(this.click1, this);
    this.btn2.onClick(this.click2, this);
  };
  _ctor.prototype.click1 = function () {
    this.hide();
    var e = r_FairyTreeCfg.FairyTreeCfg[this.data + "1"];
    r_UtilsSystem.UtilsSystem.showAlert(e.desc);
    this.click1Callback(e.num);
  };
  _ctor.prototype.click2 = function () {
    this.hide();
    var e = r_FairyTreeCfg.FairyTreeCfg[this.data + "2"];
    var t = e.desc + "";
    if (e.preType) {
      var o = this.preHandle();
      t = t.replace("#", o);
    }
    r_UtilsSystem.UtilsSystem.showAlert(t);
    this.click2Callback(e.num);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data) {
      var t = r_FairyTreeCfg.FairyTreeCfg[this.data];
      this.txtDesc.fontSize = t.fontSize || this.fontSize;
      this.txtDesc.text = t.desc;
      this.iconShow.icon = "ui://FairyLandTg/icon" + t.icon;
      this.btn1.text = t.btn1;
      this.btn2.text = t.btn2;
      this.recId1 = -1;
      this.recName1 = "";
      this.recId2 = -1;
      this.recName2 = "";
    }
  };
  _ctor.prototype.click1Callback = function (e) {
    switch (this.data) {
      case "monkey":
        r_PlayerData.PlayerData.addStone("仙界树事件", e, r_ReportSystem.SystemKey.仙界神树);
        break;
      case "hammer":
        break;
      case "hulu":
        r_PlayerData.PlayerData.addStone("仙界树事件", e, r_ReportSystem.SystemKey.仙界神树);
    }
  };
  _ctor.prototype.click2Callback = function (e) {
    switch (this.data) {
      case "monkey":
        if (r_jsbi.default.LT(r_PlayerData.PlayerData.bigStone, e)) {
          console.log("全抢光");
          r_PlayerData.PlayerData.deleteStone("仙界树事件", r_PlayerData.PlayerData.bigStone, r_ReportSystem.SystemKey.仙界神树);
        }
        r_PlayerData.PlayerData.deleteStone("仙界树事件", e, r_ReportSystem.SystemKey.仙界神树);
        break;
      case "hammer":
        r_PlayerData.PlayerData.data.weapon.strongerTime = 3;
        r_UtilsSystem.UtilsSystem.showTip("补充三次闪电之锤");
        r_PlayerData.PlayerData.saveData();
        break;
      case "hulu":
        if (this.recId1 > 0 && this.recId2 > 0) {
          r_UtilsSystem.UtilsSystem.showTip("获得" + this.recName1 + "," + this.recName2);
          r_WeaponSystem.WeaponSystem.getRecipeOnce([this.recId1, this.recId2]);
        } else {
          r_UtilsSystem.UtilsSystem.showTip("获得" + this.recName1 + "*2");
          r_WeaponSystem.WeaponSystem.GetRecipe(this.recId1, 2);
        }
    }
  };
  _ctor.prototype.preHandle = function () {
    var e = "";
    var t = r_WeaponSystem.WeaponSystem.getRandomRecipe(3);
    var o = r_WeaponSystem.WeaponSystem.getRandomRecipe(3);
    console.log("info1:" + JSON.stringify(t));
    console.log("info2:" + JSON.stringify(o));
    this.recId1 = t.id;
    this.recName1 = t.name;
    if (t.id === o.id) {
      e = t.name + "*2";
    } else {
      this.recId2 = o.id;
      this.recName2 = o.name;
      e = t.name + "*1," + o.name + "*1";
    }
    return e;
  };
  __decorate([r_DecorateFunction1.AutoFind("btn1")], _ctor.prototype, "btn1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn2")], _ctor.prototype, "btn2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconShow")], _ctor.prototype, "iconShow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyTreeThingUI = exp_FairyTreeThingUI;