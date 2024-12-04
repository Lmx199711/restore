var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BBQCom2 = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_ResSystem = require("ResSystem");
var exp_BBQCom2 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.kaos = [];
    t.shus = [];
    t.foot = null;
    t.m_initX = null;
    t.m_index = 0;
    t.m_level = 1;
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
    this.foot = this.getChild("foot").asLoader;
    this.animTanhuo = this.getChild("animTanhuo");
    this.m_initX = this.foodGroup.x;
  };
  _ctor.prototype.restart = function (e) {
    undefined === e && (e = 1);
    this.m_level = e;
    this.m_index = 0;
    this.getController("c1").selectedIndex = 0;
    this.kaos.forEach(function (e) {
      e.visible = true;
    });
    this.foodGroup.x = this.m_initX;
    this.setView();
    this.animTanhuo.visible = false;
  };
  _ctor.prototype.onEnable = function () {
    e.prototype.onEnable.call(this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.upgrade, this.onRefesh, this);
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.upgrade, this.onRefesh, this);
    cc.Tween.stopAllByTarget(this.foodGroup);
  };
  _ctor.prototype.onRefesh = function () {
    this.setView();
  };
  _ctor.prototype.setView = function () {
    var e = this.m_level;
    for (var t = 0; t < this.kaos.length; t++) {
      var o = this.getChild("kao" + t).asLoader;
      r_ResSystem.ResSystem.loadBundleFguiImg(o, "game5", "shaokao/foot_" + e + "_0");
      var i = this.getChild("shu" + t).asLoader;
      r_ResSystem.ResSystem.loadBundleFguiImg(i, "game5", "shaokao/foot_" + e + "_1");
    }
    r_ResSystem.ResSystem.loadBundleFguiImg(this.foot, "game5", "shaokao/foot_" + e + "_1");
  };
  _ctor.prototype.play = function () {
    var e = this;
    if (this.m_isPlay) {
      this.m_level;
      var t = this.getNextIndex();
      this.getController("c1").selectedIndex = t;
      this.kaos.forEach(function (t, o) {
        t.visible = e.m_index <= o;
      });
      if (5 == this.m_index) {
        this.m_isPlay = false;
        var o = this;
        this.foodGroup.visible = true;
        cc.Tween.stopAllByTarget(this.foodGroup);
        cc.tween(this.foodGroup).delay(.2).call(function () {
          o.m_index = 0;
          o.getController("c1").selectedIndex = 0;
          o.kaos.forEach(function (e) {
            e.visible = true;
          });
          e.m_isPlay = true;
          e.foodGroup.x = e.m_initX;
        }).start();
      } else {
        cc.Tween.stopAllByTarget(this.foodGroup);
        cc.tween(this.foodGroup).by(.2, {
          x: -38
        }).start();
      }
      this.getTransition("move").play();
    }
  };
  _ctor.prototype.getNextIndex = function () {
    this.m_index++;
    this.m_index > 5 && (this.m_index = 0);
    return this.m_index;
  };
  return _ctor;
}(fgui.GComponent);
exports.BBQCom2 = exp_BBQCom2;