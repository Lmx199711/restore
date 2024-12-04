var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerBossUI = undefined;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_TowerSystem = require("TowerSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_TowerFightUI = require("TowerFightUI");
var exp_TowerBossUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Tower, r_UIDef.UIDef.Res.UI.TowerBossUI) || this;
    t.curBoss = null;
    t.towerCfg = null;
    t.dropCfg = null;
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
    this.show(r_UIDef.UIDef.Urls.UI.TowerBossUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TowerBossUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
    this.btnStart.onClick(this.onClickStart, this);
    this.btnRefresh.onClick(this.onClickRefresh, this);
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    var i = r_TowerSystem.TowerSystem.getTowerCfg(this.data.index);
    this.towerCfg = i;
    this.refreshStatus();
    this.dropCfg = r_TowerSystem.TowerSystem.getDropCfg(i.drop);
    this.list.numItems = this.dropCfg.items.length;
    this.lbName.text = i.name;
    this.lbHp.text = "生命值: " + i.hp;
    this.lbTitle.text = "通天塔 第" + this.data.index + "层";
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/enemy/guaiwu_" + this.data.index, cc.Prefab, function (e, t) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, t);
      if (o.curBoss) {
        o.curBoss.destroy();
        o.curBoss = null;
      }
      var n = cc.instantiate(t);
      o.centerNode.node.addChild(n);
      o.curBoss = n;
      o.curBoss.y = i.y;
      o.curBoss.scale = .6;
      o.curBoss.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
      var a = o.curBoss.getChildByName("anim1");
      a && a.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
      o.refreshStatus();
    });
    r_TimeSystem.TimeSystem.registSecondUpdate("towerBoss", this.updateSecond.bind(this));
    this.updateSecond();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("towerBoss");
  };
  _ctor.prototype.refreshStatus = function () {
    var e = r_TowerSystem.TowerSystem.getCurWeapon();
    var t = r_TowerSystem.TowerSystem.getPassTime(this.towerCfg.id);
    if (e) {
      if (r_TimeSystem.TimeSystem.getServerTime() < t + this.towerCfg.refreshTime) {
        this.contentPane.getController("mode").selectedIndex = 2;
        if (this.curBoss) {
          this.curBoss.color = cc.Color.BLACK;
          o = this.curBoss.getChildByName("anim1");
          if (o) {
            o.color = cc.Color.BLACK;
          }
        }
      } else {
        var o;
        this.contentPane.getController("mode").selectedIndex = 0;
        if (this.curBoss) {
          this.curBoss.color = cc.Color.WHITE;
          o = this.curBoss.getChildByName("anim1");
          if (o) {
            o.color = cc.Color.WHITE;
          }
        }
      }
    } else {
      this.contentPane.getController("mode").selectedIndex = 1;
      if (this.curBoss) {
        this.curBoss.color = cc.Color.WHITE;
        o = this.curBoss.getChildByName("anim1");
        if (o) {
          o.color = cc.Color.WHITE;
        }
      }
    }
  };
  _ctor.prototype.updateSecond = function () {
    if (2 == this.contentPane.getController("mode").selectedIndex) {
      var e = r_TowerSystem.TowerSystem.getPassTime(this.towerCfg.id) + this.towerCfg.refreshTime - r_TimeSystem.TimeSystem.getServerTime();
      e <= 0 && this.refreshStatus();
      this.lbTime.text = r_TimeSystem.TimeSystem.getTimeStr(e);
    }
  };
  _ctor.prototype.onClickRefresh = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("爬塔重置时间", function () {
      r_TowerSystem.TowerSystem.resetPassTime(e.towerCfg.id);
      e.refreshStatus();
    });
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this.dropCfg.items[e];
    if (2 == o.type) {
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "bdWeaponForge", "mat/small/灵石");
      t.getController("color").selectedIndex = 1;
    } else {
      var i = r_WeaponSystem.WeaponSystem.GetRecipeInfo(o.id);
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "bdWeaponForge", "mat/small/" + i.name);
      t.getController("color").selectedIndex = i.type;
    }
    t.getChild("num").text = o.num;
  };
  _ctor.prototype.onClickStart = function () {
    this.hide();
    r_TowerFightUI.TowerFightUI.showUI({
      index: this.data.index
    });
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRefresh")], _ctor.prototype, "btnRefresh", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbName")], _ctor.prototype, "lbName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbHp")], _ctor.prototype, "lbHp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbTitle")], _ctor.prototype, "lbTitle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbTime")], _ctor.prototype, "lbTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tip")], _ctor.prototype, "tip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("centerNode")], _ctor.prototype, "centerNode", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.TowerBossUI = exp_TowerBossUI;