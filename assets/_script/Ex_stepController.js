var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var r_LevelTimeCom = require("LevelTimeCom");
var r_PlatformSystem = require("PlatformSystem");
var r_RunTimerBase = require("RunTimerBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_Ex_stepController = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.stepNode = null;
    t.stepLabel = 0;
    t.addStep = 5;
    t.timerNode = null;
    t.endAction = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.levelTimeCom = this.node.getComponent(r_LevelTimeCom.default);
    this.stepNode.getComponent(cc.Label).string = this.stepLabel.toString();
  };
  _ctor.prototype.Pass = function () {
    this.passLevel = true;
  };
  _ctor.prototype.stepReduce = function () {
    this.stepLabel--;
    this.stepNode.getComponent(cc.Label).string = this.stepLabel.toString();
    if (this.stepLabel <= 0 && !this.passLevel) {
      this.stepLabel = 0;
      this.levelTimeCom && (this.levelTimeCom.loopKey = false);
      this.timerNode && (this.timerNode.loopKey = false);
      r_BehaviorMgr.BehaviorMgr.trigger(this.endAction);
    }
  };
  _ctor.prototype.stepAdd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("加时", function () {
      e.stepLabel += e.addStep;
      e.stepNode.getComponent(cc.Label).string = e.stepLabel.toString();
    });
  };
  _ctor.prototype.stepAdd2 = function () {
    this.stepLabel += this.addStep;
    this.stepNode.getComponent(cc.Label).string = this.stepLabel.toString();
  };
  _ctor.prototype.resurrection = function () {
    this.levelTimeCom && (this.levelTimeCom.loopKey = false);
    this.timerNode && (this.timerNode.loopKey = false);
  };
  __decorate([_property({
    displayName: "步数节点",
    type: cc.Node
  })], _ctor.prototype, "stepNode", undefined);
  __decorate([_property({
    displayName: "步数"
  })], _ctor.prototype, "stepLabel", undefined);
  __decorate([_property({
    displayName: "增加步数"
  })], _ctor.prototype, "addStep", undefined);
  __decorate([_property({
    displayName: "计时器节点",
    type: r_RunTimerBase.default
  })], _ctor.prototype, "timerNode", undefined);
  __decorate([_property({
    displayName: "结束时执行的事件"
  })], _ctor.prototype, "endAction", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_Ex_stepController;