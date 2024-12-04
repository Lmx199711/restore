var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HamStoveCom = undefined;
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_HamUI = require("HamUI");
var exp_HamStoveCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.startTime = null;
    t.uid = 0;
    t.timeFrame1 = 5;
    t.timeFrame2 = 30;
    t.m_state = r_HamUI.StoveState.空盘;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.animOil = this.getChild("animOil");
    this.hamCom = this.getChild("hamCom");
  };
  _ctor.prototype.restart = function () {
    this.getTransition("init").play();
    this.state = r_HamUI.StoveState.空盘;
    this.hamCom.init();
  };
  Object.defineProperty(_ctor.prototype, "state", {
    get: function () {
      return this.m_state;
    },
    set: function (e) {
      this.getController("mode").selectedIndex = e;
      this.m_state = e;
      if (e == r_HamUI.StoveState.烧烤) {
        this.hamCom.state = r_HamUI.HamState.生;
        this.startTime = r_TimeSystem.TimeSystem.getServerTime();
        r_TimeSystem.TimeSystem.schedule("kaochang" + this.uid, 1, this.onKaoHam.bind(this));
      }
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onKaoHam = function () {
    if (this.hamCom.state != r_HamUI.HamState.放入佐料) {
      var e = r_TimeSystem.TimeSystem.getServerTime() - this.startTime;
      this.hamCom.labTime.text = (e > this.timeFrame1 ? this.timeFrame2 - e : this.timeFrame1 - e) + "";
      if (e >= this.timeFrame2 && this.hamCom.state < r_HamUI.HamState.焦) {
        this.hamCom.state = r_HamUI.HamState.焦;
      } else {
        e >= this.timeFrame1 && this.hamCom.state < r_HamUI.HamState.熟 && (this.hamCom.state = r_HamUI.HamState.熟);
      }
    } else {
      r_TimeSystem.TimeSystem.scheduleClear("kaochang" + this.uid);
    }
  };
  _ctor.prototype.pourOil = function () {
    var e = this;
    this.state = r_HamUI.StoveState.涂油;
    r_UtilsSystem.UtilsSystem.playAnim(this.animOil, "step_1", false);
    r_SoundMgr.SoundMgr.playSound("ham/倒油");
    r_TimeSystem.TimeSystem.scheduleOnce("pourOil" + this.uid, 1.8, function () {
      r_UtilsSystem.UtilsSystem.playAnim(e.animOil, "step_2", true);
    });
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    this.state = r_HamUI.StoveState.空盘;
    this.hamCom.init();
    r_TimeSystem.TimeSystem.scheduleClear("pourOil" + this.uid);
    r_TimeSystem.TimeSystem.scheduleClear("kaochang" + this.uid);
  };
  return _ctor;
}(fgui.GComponent);
exports.HamStoveCom = exp_HamStoveCom;