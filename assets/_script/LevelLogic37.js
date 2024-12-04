var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlatformSystem = require("PlatformSystem");
var r_RelaxSystem = require("RelaxSystem");
var r_RelaxTipUI = require("RelaxTipUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_LevelLogic37 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.timer = 90;
    t.time = 0;
    t.timeLab = null;
    t.isStart = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {
    _ref__ctor.Inst = this;
  };
  _ctor.prototype.start = function () {
    this.init();
  };
  _ctor.prototype.init = function () {
    this.isStart = true;
    this.time = 0;
  };
  _ctor.prototype.onEnable = function () {
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      this.node.getChildByName("nodeTip").children[0].active = false;
    } else {
      this.node.getChildByName("nodeTip").children[0].active = true;
    }
  };
  _ctor.prototype.update = function (e) {
    this.timerRun(e);
  };
  _ctor.prototype.timerRun = function (e) {
    if (this.isStart) {
      this.time += e;
      this.showTime();
      if (this.time >= this.timer) {
        r_RelaxSystem.RelaxSystem.lose();
        this.isStart = false;
      }
    }
  };
  _ctor.prototype.showTime = function () {
    this.timeLab && (this.timeLab.progress = (this.timer - this.time) / this.timer);
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      r_RelaxTipUI.default.showUI();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解压提示", function () {
        e.node.getChildByName("nodeTip").children[0].active = false;
        r_RelaxSystem.RelaxSystem.addTip();
        r_RelaxTipUI.default.showUI();
      });
    }
  };
  _ctor.Inst = null;
  __decorate([_property({
    displayName: "总时间"
  })], _ctor.prototype, "timer", undefined);
  __decorate([_property({
    displayName: "显示时间文本",
    type: cc.ProgressBar
  })], _ctor.prototype, "timeLab", undefined);
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_LevelLogic37;