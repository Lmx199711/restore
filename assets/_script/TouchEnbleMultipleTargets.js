var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchEnbleMultipleTargets = exports.EnbleTargetInfos = undefined;
var r_GameSelfSystem = require("GameSelfSystem");
var r_UtilsSystem = require("UtilsSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_EnbleTargetInfos = function () {
  function _ctor() {
    this.target = null;
    this.show = true;
    this.dlayTime = 0;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "要操作的节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "是否和自身的显隐保持一致"
  })], _ctor.prototype, "show", undefined);
  __decorate([_property({
    displayName: "延时"
  })], _ctor.prototype, "dlayTime", undefined);
  return __decorate([_ccclass("EnbleTargetInfos")], _ctor);
}();
exports.EnbleTargetInfos = exp_EnbleTargetInfos;
var exp_TouchEnbleMultipleTargets = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodeInfos = [];
    t.isLastStep = false;
    t._isFinish = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    var e = this;
    if (!this.isLastStep || r_GameSelfSystem.GameSelfSystem.isFinishOtherExpLogic(this)) {
      var t = 0;
      this.nodeInfos.forEach(function (e) {
        if (e.dlayTime > 0) {
          t < e.dlayTime && (t = e.dlayTime);
          setTimeout(function () {
            e.target && (e.target.active = e.show);
          }, 1e3 * e.dlayTime);
        } else {
          e.target && (e.target.active = e.show);
        }
      });
      this.isLastStep && r_UtilsSystem.UtilsSystem.scheduleOnce(1e3 * t, function () {
        e._isFinish = true;
        r_GameSelfSystem.GameSelfSystem.checkWin();
      });
    }
  };
  _ctor.prototype.start = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.trigger, this);
    this.node._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.isFinish = function () {
    return this._isFinish;
  };
  __decorate([_property({
    type: exp_EnbleTargetInfos
  })], _ctor.prototype, "nodeInfos", undefined);
  __decorate([_property({
    type: Boolean,
    tooltip: "是否是最后一步"
  })], _ctor.prototype, "isLastStep", undefined);
  return __decorate([_ccclass("TouchEnbleMultipleTargets")], _ctor);
}(cc.Component);
exports.TouchEnbleMultipleTargets = exp_TouchEnbleMultipleTargets;