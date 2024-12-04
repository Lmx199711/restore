var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetWeaponUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetCfg = require("PetCfg");
var r_PetData = require("PetData");
var r_PetUpgradeUI = require("PetUpgradeUI");
var r_PetCardUI = require("PetCardUI");
var r_ResSystem = require("ResSystem");
var r_PetCommon = require("PetCommon");
var r_FguiResSystem = require("FguiResSystem");
var exp_PetWeaponUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetWeaponUI) || this;
    t.showItemInfos = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetWeaponUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetWeaponUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.tab1 = this.contentPane.getController("tab1");
    this.list = this.contentPane.getChild("list").asList;
    this.list.itemRenderer = this.itemRenderer.bind(this);
    this.tab1.onChanged(function () {
      t.initList();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.tab1.selectedIndex = 0;
    this.initList();
    this.list.scrollPane.scrollTop();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PetInfoUI).showInfo();
  };
  _ctor.prototype.initList = function () {
    if (this.list) {
      if (0 == this.tab1.selectedIndex) {
        this.showItemInfos = r_PetCfg.PetWeaponCfgs;
      } else {
        this.showItemInfos = r_PetCfg.PetSkillCfgs;
      }
      this.showItemInfos.sort(this.compare.bind(this));
      this.list.numItems = this.showItemInfos.length;
    }
  };
  _ctor.prototype.compare = function (e, t) {
    var o = 0 == this.tab1.selectedIndex ? r_PetData.PetData.getWeaponsInfo() : r_PetData.PetData.getSkillsInfo();
    if (o.some(function (t) {
      return t.id == e.id;
    }) && !o.some(function (e) {
      return e.id == t.id;
    })) {
      return -1;
    }
    if (!o.some(function (t) {
      return t.id == e.id;
    }) && o.some(function (e) {
      return e.id == t.id;
    })) {
      return 1;
    }
    if (e.quality < t.quality) {
      return -1;
    }
    if (e.quality > t.quality) {
      return 1;
    }
    var i = o.find(function (t) {
      return t.id == e.id;
    });
    var n = o.find(function (e) {
      return e.id == t.id;
    });
    if (i && n) {
      if (i.level < n.level) {
        return -1;
      }
      if (i.level > n.level) {
        return 1;
      }
    }
    return 0;
  };
  _ctor.prototype.itemRenderer = function (e, o) {
    var i = this;
    var n = this.showItemInfos[e];
    var a = (0 == this.tab1.selectedIndex ? r_PetData.PetData.getWeaponsInfo() : r_PetData.PetData.getSkillsInfo()).find(function (e) {
      return e.id == n.id;
    });
    o.getChild("name").asTextField.text = n.name;
    _ctor.setDesc(o.getChild("desc").asTextField, n, a ? a.level : 0);
    var s = 0 == this.tab1.selectedIndex ? "ui://Pet/weapon" + n.id : "ui://Pet/skill" + n.id;
    var r = o.getChild("iconItem").asCom;
    _ctor.setIconItem(r, s, n.quality, a ? a.level : 0);
    var h = o.getChild("btnUp");
    var d = o.getChild("btnGet");
    if (a) {
      a.level >= 5 && n.name2 && (o.getChild("name").asTextField.text = n.name2);
      r.getChild("icon").grayed = false;
      o.getChild("star").visible = true;
      o.getChild("star").asCom.getController("c1").selectedIndex = a.level;
      h.visible = true;
      d.visible = false;
      h.enabled = a.level < 5;
      h.clearClick();
      h.onClick(function () {
        r_PetUpgradeUI.PetUpgradeUI.showUI({
          type: 0 == i.tab1.selectedIndex ? "weapon" : "skill",
          id: n.id
        });
        r_PetCommon.PetCommon.showGuide(o.getChild("guideUpgrade2"), true);
      }, this);
    } else {
      r.getChild("icon").grayed = true;
      o.getChild("star").visible = false;
      h.visible = false;
      d.visible = true;
      d.clearClick();
      d.onClick(function () {
        r_PetCardUI.PetCardUI.showUI();
      }, this);
    }
    if (0 == this.tab1.selectedIndex && a && r_PetData.PetData.getData("guideUpgrade") && !r_PetData.PetData.getData("guideUpgrade2")) {
      r_PetCommon.PetCommon.showGuide(o.getChild("guideUpgrade2"));
    } else {
      o.getChild("guideUpgrade2").visible = false;
    }
  };
  _ctor.setDesc = function (e, t, o) {
    var i = t.levelValues[o];
    var n = {};
    for (var a = 0; a < i.length; a++) {
      if (i[a] !== Math.floor(+i[a])) {
        n["val" + a] = Math.floor(100 * +i[a]) + "%";
      } else {
        n["val" + a] = i[a];
      }
    }
    e.text = t.desc;
    e.templateVars = n;
    t["descExtra" + o] && (e.text += "，" + t["descExtra" + o]);
  };
  _ctor.setIconItem = function (e, t, o, i) {
    var n = this;
    e.getChild("icon").asLoader.url = t;
    e.getController("quality").selectedIndex = o;
    var a = e.getChild("center").asCom;
    a.visible = false;
    if (i >= 5) {
      a.visible = true;
      0 == a.node.childrenCount && r_ResSystem.ResSystem.loadBundleRes("game3", "pet/kuang", cc.Prefab, function (e, t) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(n, t);
        var o = cc.instantiate(t);
        a.node.addChild(o);
      });
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetWeaponUI = exp_PetWeaponUI;