var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetUpgradeUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetUpgradeResultUI = require("PetUpgradeResultUI");
var r_PetData = require("PetData");
var r_PetCfg = require("PetCfg");
var r_PetWeaponUI = require("PetWeaponUI");
var r_PetBuyPropUI = require("PetBuyPropUI");
var r_PlatformSystem = require("PlatformSystem");
var exp_PetUpgradeUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetUpgradeUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetUpgradeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetUpgradeUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnUp").onClick(function () {
      t.upgrade();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    if ("weapon" == this.data.type) {
      this.itemInfos = r_PetData.PetData.getWeaponsInfo();
    } else {
      this.itemInfos = r_PetData.PetData.getSkillsInfo();
    }
    this.itemInfo = this.itemInfos.find(function (e) {
      return e.id == t.data.id;
    });
    this.showInfo();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PetWeaponUI).initList();
  };
  _ctor.prototype.showInfo = function () {
    var e = this;
    var t = "weapon" == this.data.type ? r_PetCfg.PetWeaponCfgs.find(function (t) {
      return t.id == e.data.id;
    }) : r_PetCfg.PetSkillCfgs.find(function (t) {
      return t.id == e.data.id;
    });
    r_PetWeaponUI.PetWeaponUI.setIconItem(this.contentPane.getChild("iconItem"), "ui://Pet/" + this.data.type + this.data.id, t.quality, this.itemInfo.level);
    var o = this.contentPane.getChild("curDesc").asTextField;
    var i = this.contentPane.getChild("nextDesc").asTextField;
    r_PetWeaponUI.PetWeaponUI.setDesc(o, t, this.itemInfo.level);
    if (this.itemInfo.level < t.levelValues.length - 1) {
      i.align = cc.Label.HorizontalAlign.LEFT;
      i.verticalAlign = cc.Label.VerticalAlign.TOP;
      r_PetWeaponUI.PetWeaponUI.setDesc(i, t, this.itemInfo.level + 1);
      this.contentPane.getChild("btnUp").enabled = true;
    } else {
      i.align = cc.Label.HorizontalAlign.CENTER;
      i.verticalAlign = cc.Label.VerticalAlign.CENTER;
      i.text = "[color=#ff0000]已满级[/color]";
      this.contentPane.getChild("btnUp").enabled = false;
    }
    this.contentPane.getChild("star").asCom.getController("c1").selectedIndex = this.itemInfo.level;
    this.showProp();
    var n = r_PetData.PetData.getData("luckVal" + this.data.type + this.data.id, 0);
    if (this.itemInfo.level >= 4) {
      this.contentPane.getChild("luck").visible = true;
      this.contentPane.getChild("luckNum").text = n;
      this.contentPane.getChild("luckPro").asProgress.value = n;
    } else {
      this.contentPane.getChild("luck").visible = false;
    }
    if (this.itemInfo.level < 2 || n >= 100) {
      this.contentPane.getController("c1").selectedIndex = 2;
    } else if (this.itemInfo.level < 3) {
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
  };
  _ctor.prototype.showProp = function () {
    var e = r_PetData.PetData.getBagPropNum(1);
    var t = this.contentPane.getChild("prop").asCom;
    var o = r_PetCfg.PetUpgradeCfg.cost[this.itemInfo.level < r_PetCfg.PetUpgradeCfg.cost.length ? this.itemInfo.level : r_PetCfg.PetUpgradeCfg.cost.length - 1];
    t.getChild("num").text = e >= o ? "[color=#00ff00]" + e + "[/color]/" + o : "[color=#ff0000]" + e + "[/color]/" + o;
  };
  _ctor.prototype.upgrade = function () {
    var e = this;
    var t = r_PetData.PetData.getBagPropNum(1);
    var o = r_PetCfg.PetUpgradeCfg.cost[this.itemInfo.level];
    if (t < o) {
      r_PetBuyPropUI.PetBuyPropUI.showUI({
        num: o - t,
        closeCallbalck: function () {
          e.showProp();
          r_PetData.PetData.getBagPropNum(1) >= r_PetCfg.PetUpgradeCfg.cost[e.itemInfo.level] && e.upgrade();
        }
      });
    } else {
      r_PetData.PetData.addBagProp(1, -o);
      var i = 1;
      Math.random() < r_PetCfg.PetUpgradeCfg.rate[this.itemInfo.level] && (i = 0);
      if (this.itemInfo.level >= 4) {
        var n = r_PetData.PetData.getData("luckVal" + this.data.type + this.data.id, 0);
        if (n >= 100) {
          n = 0;
          i = 0;
        } else {
          n += 10;
        }
        r_PetData.PetData.setData("luckVal" + this.data.type + this.data.id, n);
      }
      0 == i && this.itemInfo.level++;
      if ("weapon" == this.data.type) {
        r_PetData.PetData.setWeaponsInfo(this.itemInfos);
      } else {
        r_PetData.PetData.setSkillsInfo(this.itemInfos);
      }
      this.showInfo();
      r_PetUpgradeResultUI.PetUpgradeResultUI.showUI({
        result: i,
        type: this.data.type,
        id: this.data.id
      });
      r_PlatformSystem.PlatformSystem.report("pet_upgrade", {
        stage: "强化"
      });
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetUpgradeUI = exp_PetUpgradeUI;