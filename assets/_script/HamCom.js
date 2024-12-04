var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HamCom = undefined;
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_HamUI = require("HamUI");
var exp_HamCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.props = [];
    t.myPropList = [];
    t.m_state = r_HamUI.HamState.生;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "state", {
    get: function () {
      return this.m_state;
    },
    set: function (e) {
      this.getController("mode").selectedIndex = e;
      this.m_state = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onConstruct = function () {
    for (var e = 0; e < 4; e++) {
      var t = this.getChild("prop" + e);
      t.visible = false;
      this.props.push(t);
    }
    this.animPorp = this.getChild("animPorp");
    this.labTime = this.getChild("labTime");
  };
  _ctor.prototype.init = function () {
    this.state = r_HamUI.HamState.生;
    this.props.forEach(function (e) {
      return e.visible = false;
    });
    this.animPorp.visible = false;
    this.myPropList = [];
    this.labTime.text = 5;
    this.propView();
  };
  _ctor.prototype.propView = function () {
    var e = this;
    this.myPropList.forEach(function (t) {
      e.getChild("prop" + t).visible = true;
    });
  };
  _ctor.prototype.addCondiment = function (e) {
    var t = this;
    if (!this.myPropList.includes(e)) {
      if (1 == e || 0 == e) {
        r_SoundMgr.SoundMgr.playSound("ham/倒辣椒和孜然");
      } else {
        3 != e && 2 != e || r_SoundMgr.SoundMgr.playSound("ham/刷酱");
      }
      r_HamUI.default.Inst.props[e].visible = false;
      r_UtilsSystem.UtilsSystem.playAnim(this.animPorp, "step_" + (e + 1), false);
      this.propView();
      this.myPropList.push(e);
      r_TimeSystem.TimeSystem.scheduleOnce("addCondiment", 1.5, function () {
        t.animPorp.visible = false;
        r_HamUI.default.Inst.props[e].visible = true;
        t.propView();
      });
    }
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("addCondiment");
  };
  return _ctor;
}(fgui.GComponent);
exports.HamCom = exp_HamCom;