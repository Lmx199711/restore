var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BBQCom = undefined;
var a;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_LevelRoleSystem = require("LevelRoleSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp_BBQCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.kaos = [];
    t.shus = [];
    t.foot = null;
    t.m_index = 0;
    t.m_initX = null;
    t.m_initX2 = null;
    t.gid = 1;
    t.m_touchNum = 0;
    t.m_isPlay = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    for (var e = 0; e < 5; e++) {
      var t = this.getChild("kao" + e).asLoader;
      this.kaos.push(t);
      var o = this.getChild("shu" + e).asLoader;
      this.shus.push(o);
    }
    this.foodGroup = this.getChild("foodGroup").asGroup;
    this.foodGroup2 = this.getChild("foodGroup2").asGroup;
    this.m_initX = this.foodGroup.x;
    this.m_initX2 = this.foodGroup2.x;
    this.foot = this.getChild("foot").asLoader;
    this.animBrush = this.getChild("animBrush");
    this.hearthstone = this.getChild("hearthstone");
    this.animTanhuo = this.getChild("animTanhuo");
    r_UtilsSystem.UtilsSystem.playAnim(this.animTanhuo, "step_1", true);
  };
  _ctor.prototype.restart = function () {
    this.m_touchNum = 0;
    this.foodGroup.x = this.m_initX;
    this.foodGroup2.x = this.m_initX2;
    this.m_index = 0;
    this.getController("c1").selectedIndex = 0;
    this.kaos.forEach(function (e) {
      e.visible = true;
    });
    this.setView();
    this.updateSecond();
  };
  _ctor.prototype.onEnable = function () {
    var t = this;
    e.prototype.onEnable.call(this);
    if (this.hearthstone) {
      this.m_touchNum = 0;
      r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.upgrade, this.onRefesh, this);
      r_TimeSystem.TimeSystem.registSecondUpdate("BBQCom" + this.gid, function () {
        t.updateSecond();
      });
    }
  };
  _ctor.prototype.updateSecond = function () {
    this.animTanhuo.alpha = 1;
    if (this.m_touchNum >= a.大火) {
      r_UtilsSystem.UtilsSystem.playAnim(this.hearthstone, "luzi_yan", true);
      r_UtilsSystem.UtilsSystem.playAnim(this.animTanhuo, "step_3", true);
    } else if (this.m_touchNum >= a.中火) {
      r_UtilsSystem.UtilsSystem.playAnim(this.hearthstone, "luzi_yan3", true);
      r_UtilsSystem.UtilsSystem.playAnim(this.animTanhuo, "step_2", true);
    } else if (this.m_touchNum >= a.小火) {
      r_UtilsSystem.UtilsSystem.playAnim(this.hearthstone, "luzi_yan4", true);
      r_UtilsSystem.UtilsSystem.playAnim(this.animTanhuo, "step_1", true);
    } else if (this.m_touchNum >= a.静止) {
      "luzi_daiji" != this.hearthstone.animationName && r_UtilsSystem.UtilsSystem.playAnim(this.hearthstone, "luzi_daiji", true);
      this.animTanhuo.alpha = 0;
    }
    this.m_touchNum = 0;
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("BBQCom" + this.gid);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.upgrade, this.onRefesh, this);
  };
  _ctor.prototype.onRefesh = function () {
    this.setView();
  };
  _ctor.prototype.setView = function () {
    var e = this;
    this.visible = false;
    var t = r_LevelRoleSystem.LevelRoleSystem.getLevelTitle(r_PlayerData.PlayerData.data.level).id;
    for (var o = 0; o < this.kaos.length; o++) {
      var i = this.getChild("kao" + o).asLoader;
      r_ResSystem.ResSystem.loadBundleFguiImg(i, "game5", "shaokao/foot_" + t + "_0");
      var n = this.getChild("shu" + o).asLoader;
      r_ResSystem.ResSystem.loadBundleFguiImg(n, "game5", "shaokao/foot_" + t + "_1");
    }
    r_ResSystem.ResSystem.loadBundleFguiImg(this.foot, "game5", "shaokao/foot_" + t + "_1");
    r_ResSystem.ResSystem.loadBundleRes("game6", "shuazi/take" + t, cc.Prefab, function (t, o) {
      if (!t) {
        var i = cc.instantiate(o);
        e.animBrush.node.destroyAllChildren();
        e.animBrush.node.addChild(i);
        e.brushSk = i.getComponent(sp.Skeleton);
        e.brushSk.setAnimation(0, "animation", false);
        e.brushSk.timeScale = 0;
        e.visible = true;
      }
    });
  };
  _ctor.prototype.play = function () {
    var e = this;
    if (this.m_isPlay) {
      this.m_touchNum++;
      r_LevelRoleSystem.LevelRoleSystem.getLevelTitle(r_PlayerData.PlayerData.data.level).id;
      var t = this.getNextIndex();
      this.getController("c1").selectedIndex = t;
      this.kaos.forEach(function (t, o) {
        t.visible = e.m_index <= o;
      });
      if (5 == this.m_index) {
        this.m_isPlay = false;
        var o = this;
        o.kaos.forEach(function (e) {
          e.visible = true;
        });
        this.foodGroup.visible = true;
        cc.Tween.stopAllByTarget(this.foodGroup);
        this.foodGroup.x = 1002;
        cc.tween(this.foodGroup).to(.2, {
          x: o.m_initX
        }).call(function () {
          o.m_index = 0;
          o.kaos.forEach(function (e) {
            e.visible = true;
          });
        }).start();
        this.moveGorup2();
      } else {
        cc.Tween.stopAllByTarget(this.foodGroup);
        cc.tween(this.foodGroup).by(.2, {
          x: -47
        }).start();
      }
      this.getTransition("move").play();
      this.playSk();
    }
  };
  _ctor.prototype.playSk = function () {
    if (this.brushSk) {
      this.brushSk.setAnimation(0, "animation", false);
      this.brushSk.timeScale = 1;
    }
  };
  _ctor.prototype.moveGorup2 = function () {
    var e = this;
    cc.Tween.stopAllByTarget(this.foodGroup2);
    this.foodGroup2.x = this.m_initX2;
    cc.tween(this.foodGroup2).delay(.3).to(.1, {
      x: -243
    }).call(function () {
      e.getController("c1").selectedIndex = 0;
    }).to(.1, {
      x: this.m_initX2
    }).call(function () {
      e.m_isPlay = true;
    }).start();
  };
  _ctor.prototype.getNextIndex = function () {
    this.m_index++;
    this.m_index > 5 && (this.m_index = 0);
    return this.m_index;
  };
  return _ctor;
}(fgui.GComponent);
exports.BBQCom = exp_BBQCom;
(function (e) {
  e[e["静止"] = 0] = "静止";
  e[e["小火"] = 1] = "小火";
  e[e["中火"] = 3] = "中火";
  e[e["大火"] = 5] = "大火";
})(a || (a = {}));