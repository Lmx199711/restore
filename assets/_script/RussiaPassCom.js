var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RussiaPassCom = undefined;
var r_RussiaSystem = require("RussiaSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_RussiaCfg = require("RussiaCfg");
var r_RussiaGameUI = require("RussiaGameUI");
var exp_RussiaPassCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.m_maxTime = 10;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.labItems = [];
    for (var e = 1; e <= 5; e++) {
      var t = this.getChild("labItem" + e);
      this.labItems.push(t);
      t.text = 0 == r_RussiaCfg.RussiaRoundAward[e - 1] ? "???" : r_UtilsSystem.UtilsSystem.numFormats(r_RussiaCfg.RussiaRoundAward[e - 1]);
    }
    this.labTime = this.getChild("labTime");
    this.labNum = this.getChild("labNum");
  };
  _ctor.prototype.initRound = function () {
    this.getTransition("init").play();
    this.m_time = this.m_maxTime;
    this.labNum.text = "X" + r_RussiaSystem.RussiaSystem.gameData.hp;
    this.labTime.text = "" + this.m_time;
  };
  _ctor.prototype.subHp = function () {
    this.labNum.text = "X" + r_RussiaSystem.RussiaSystem.gameData.hp;
    this.getTransition("t2").play();
  };
  _ctor.prototype.showHp = function () {
    this.labNum.text = "X" + r_RussiaSystem.RussiaSystem.gameData.hp;
  };
  _ctor.prototype.countDown = function () {
    var e = this;
    this.m_time = this.m_maxTime;
    r_TimeSystem.TimeSystem.schedule("countDown", 1, function () {
      e.m_time--;
      e.labTime.text = e.m_time + "";
      if (0 == e.m_time) {
        e.destruct();
        r_RussiaGameUI.default.Inst && r_RussiaGameUI.default.Inst.fire();
      }
    }, 10);
  };
  _ctor.prototype.stop = function () {
    this.destruct();
  };
  _ctor.prototype.destruct = function () {
    r_TimeSystem.TimeSystem.scheduleClear("countDown");
  };
  return _ctor;
}(fgui.GComponent);
exports.RussiaPassCom = exp_RussiaPassCom;