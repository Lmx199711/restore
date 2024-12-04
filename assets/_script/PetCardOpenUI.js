var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetCardOpenUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PetData = require("PetData");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_PetCfg = require("PetCfg");
var r_RoleSystem = require("RoleSystem");
var r_ResSystem = require("ResSystem");
var r_PetNewWeaponUI = require("PetNewWeaponUI");
var r_ReportSystem = require("ReportSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_PetCardOpenUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetCardOpenUI) || this;
    t.openCount = 0;
    t.itemList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetCardOpenUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetCardOpenUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnOpenAll").onClick(function () {
      t.contentPane.getChild("btnOpenAll").visible = false;
      t.openAll();
    }, this);
    this.contentPane.getChild("btnOpen5").onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("宠物5连抽", function () {
        t.data = {
          count: 5
        };
        t.initCardItem(t.data.count);
      });
    }, this);
    for (var o = 0; o < 5; o++) {
      var i = this.contentPane.getChild("card" + o);
      this.itemList.push(i);
      i.node.startX = i.node.x;
      i.node.startY = i.node.y;
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initCardItem(this.data.count);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PetCardUI).showSSRTip();
  };
  _ctor.prototype.playAnim = function () {
    for (var e = 0; e < this.itemList.length; e++) {
      var t = this.itemList[e];
      t.node.x = this.itemList[2].node.x;
      t.node.y = this.itemList[2].node.y;
      t.node.scale = 0;
      cc.tween(t.node).to(.3, {
        x: t.node.startX,
        y: t.node.startY,
        scale: 1
      }, {
        easing: null
      }).start();
    }
  };
  _ctor.prototype.showSSRTip = function () {
    var e = 50 - r_PetData.PetData.getData("totalOpenCount", 0) % 50;
    var t = Math.ceil(e / 5);
    this.contentPane.getChild("ssrTip5").asTextField.setVar("num", "" + t).flushVars();
  };
  _ctor.prototype.initCardItem = function (e) {
    this.openCount = 0;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.contentPane.getChild("btnOpenAll").visible = true;
    this.showSSRTip();
    for (var t = 0; t < 5; t++) {
      var o = this.contentPane.getChild("card" + t).asCom;
      o.getController("open").selectedIndex = 0;
      o.getController("type").selectedIndex = 0;
      o.visible = 5 == e || 2 == t;
      if (o.visible) {
        o.touchable = true;
        o.clearClick();
        o.onClick(this.clickCard.bind(this, t), this);
      }
    }
    this.playAnim();
    r_PlatformSystem.PlatformSystem.report("pet_card", {
      stage: e
    });
  };
  _ctor.prototype.setCardInfo = function (e) {
    var t;
    var o = this;
    if (this.data.firstOpen5) {
      t = r_PetCfg.PetCardCfg.fistOpen5[this.openCount - 1];
    } else if (r_PetData.PetData.getData("totalOpenCount", 0) % 50 == 0) {
      t = r_PetCfg.PetCardCfg.rewards[r_PetCfg.PetCardCfg.rewards.length - 1];
    } else {
      var i = Math.random();
      var n = 0;
      for (var a = 0; a < r_PetCfg.PetCardCfg.rewards.length && !(i < (n += (t = r_PetCfg.PetCardCfg.rewards[a]).rate)); a++) {
        ;
      }
    }
    return function (t) {
      if (t.type < 3) {
        e.getController("type").selectedIndex = t.type;
        if (0 == t.type) {
          r_PlayerData.PlayerData.addCoin("宠物抽卡", t.val, r_ReportSystem.SystemKey.None);
          e.getChild("num").text = "金币+";
        } else if (1 == t.type) {
          r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.其它, t.val);
          r_UtilsSystem.UtilsSystem.showTip("获取" + r_UtilsSystem.UtilsSystem.getShowCoin(t.val) + "钻石");
          e.getChild("num").text = "钻石+";
        } else if (2 == t.type) {
          r_PetData.PetData.addBagProp(1, t.val);
          e.getChild("num").text = "强者之心+";
        }
        e.getChild("num").text += t.val;
      } else {
        var i;
        var n = r_PetCfg.PetSkillCfgs.filter(function (e) {
          return e.quality == t.val;
        });
        var a = r_PetCfg.PetWeaponCfgs.filter(function (e) {
          return e.quality == t.val;
        });
        var s = undefined;
        var l = undefined;
        if (o.data.firstOpen5 || Math.random() < a.length / (n.length + a.length)) {
          i = o.data.firstOpen5 ? r_PetCfg.PetWeaponCfgs.find(function (e) {
            return e.id == t.val;
          }) : a[Math.floor(Math.random() * a.length)];
          s = r_PetData.PetData.getWeaponsInfo();
          l = "weapon";
        } else {
          i = n[Math.floor(Math.random() * n.length)];
          s = r_PetData.PetData.getSkillsInfo();
          l = "skill";
        }
        e.getController("type").selectedIndex = i.quality + 3;
        e.getChild("num").text = i.name;
        e.getChild("icon").asLoader.url = "ui://Pet/" + l + i.id;
        i.quality == r_PetCfg.PetItemQuality.SSR && r_PetData.PetData.setData("totalOpenCount", 0);
        var p = e.getChild("center").node.getChildByName("anim");
        if (p) {
          p.getComponent(sp.Skeleton).setAnimation(0, r_PetCfg.PetItemQuality[i.quality].toLowerCase(), true);
        } else {
          r_ResSystem.ResSystem.loadBundleRes("game3", "printer/prefab/cardAnim", cc.Prefab, function (t, n) {
            r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, n);
            p = cc.instantiate(n);
            e.getChild("center").node.addChild(p);
            p.name = "anim";
            p.getComponent(sp.Skeleton).setAnimation(0, r_PetCfg.PetItemQuality[i.quality].toLowerCase(), true);
          });
        }
        if (!s.some(function (e) {
          return e.id == i.id;
        })) {
          s.push({
            id: i.id,
            level: 0
          });
          if ("skill" == l) {
            r_PetData.PetData.setSkillsInfo(s);
          } else {
            r_PetData.PetData.setWeaponsInfo(s);
          }
          return {
            type: l,
            id: i.id
          };
        }
        r_TimeSystem.TimeSystem.scheduleOnce("petCardChange" + e.name, 2, function () {
          e.getController("type").selectedIndex = 6;
          e.getChild("num").text = "强者之心+" + r_PetCfg.PetCardCfg.qualityPrice[i.quality];
          r_PetData.PetData.addBagProp(1, r_PetCfg.PetCardCfg.qualityPrice[i.quality]);
        });
      }
    }(t);
  };
  _ctor.prototype.clickCard = function (e) {
    this.openOne(e);
  };
  _ctor.prototype.openOne = function (e, t) {
    var o = this;
    var i = this.contentPane.getChild("card" + e).asCom;
    if (!i.visible || !i.touchable) {
      return false;
    }
    i.touchable = false;
    this.openCount++;
    r_PetData.PetData.setData("totalOpenCount", r_PetData.PetData.getData("totalOpenCount", 0) + 1);
    r_SoundMgr.SoundMgr.playSound("drawCard/翻牌");
    var n = this.setCardInfo(i);
    cc.Tween.stopAllByTarget(i.node);
    i.node.scale = 1;
    cc.tween(i.node).to(.25, {
      scaleX: 0
    }).call(function () {
      i.getController("open").selectedIndex = 1;
    }).to(.25, {
      scaleX: 1
    }).call(function () {
      if (o.openCount >= o.data.count) {
        o.contentPane.getController("c1").selectedIndex = 1;
        o.showSSRTip();
      }
      if (n) {
        r_PetNewWeaponUI.PetNewWeaponUI.showUI({
          type: n.type,
          id: n.id,
          closeCallback: function () {
            t && t();
          }
        });
      } else {
        t && t();
      }
    }).start();
    return true;
  };
  _ctor.prototype.openAll = function () {
    var e = this;
    for (var t = 0; t < 5 && !this.openOne(t, function () {
      e.openAll();
    }); t++) {
      ;
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetCardOpenUI = exp_PetCardOpenUI;