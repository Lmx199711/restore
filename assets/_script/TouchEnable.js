var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeItemAdsorption = exports.SetOtherState = undefined;
var r_GameSelfSystem = require("GameSelfSystem");
var r_SoundMgr = require("SoundMgr");
var r_ItemComponent = require("ItemComponent");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_SetOtherState = function () {
  function _ctor() {
    this.target = null;
    this.consistency = true;
  }
  __decorate([_property({
    type: cc.Node,
    tooltip: "要操作的节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    tooltip: "是否和自身的显隐保持一致"
  })], _ctor.prototype, "consistency", undefined);
  return __decorate([_ccclass("SetOtherState")], _ctor);
}();
exports.SetOtherState = exp_SetOtherState;
var exp_ChangeItemAdsorption = function () {
  function _ctor() {
    this.target = null;
    this.consistency = true;
  }
  __decorate([_property({
    type: cc.Node,
    tooltip: "要操作的item"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    type: Boolean,
    tooltip: "是否可吸附与当前对象的显隐保持一致"
  })], _ctor.prototype, "consistency", undefined);
  return __decorate([_ccclass("ChangeItemAdsorption")], _ctor);
}();
exports.ChangeItemAdsorption = exp_ChangeItemAdsorption;
var def_TouchEnable = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodes = [];
    t.show = [true];
    t.item = [];
    t.changItemAdsorption = [];
    t.needCheckFinish = false;
    t.isLastStep = false;
    t._isFinish = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    var e = this;
    if (!(this.isLastStep && !r_GameSelfSystem.GameSelfSystem.isFinishOtherExpLogic(this))) {
      this.nodes.forEach(function (t, o) {
        t.active = e.show[o];
      });
      this.initItems();
      this._isFinish = true;
      if (this.needCheckFinish) {
        54 == r_GameSelfSystem.GameSelfSystem.lastLevelId && r_SoundMgr.SoundMgr.playMusic("qixiBGM");
        r_GameSelfSystem.GameSelfSystem.checkWin();
      }
    }
  };
  _ctor.prototype.isFinish = function () {
    return this._isFinish;
  };
  _ctor.prototype.start = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.trigger, this);
    this.node._touchListener.setSwallowTouches(false);
    this.initItems();
  };
  _ctor.prototype.initItems = function () {
    for (var e = 0; e < this.item.length; e++) {
      if ((t = this.item[e]).target.curHang) {
        if (t.consistency) {
          t.target.active = this.node.active;
        } else {
          t.target.active = !this.node.active;
        }
      }
    }
    for (e = 0; e < this.changItemAdsorption.length; e++) {
      var t;
      var o = (t = this.changItemAdsorption[e]).target.getComponent(r_ItemComponent.default);
      if (t.consistency) {
        o.canAdsorption = this.node.active;
      } else {
        o.canAdsorption = !this.node.active;
      }
    }
  };
  __decorate([_property({
    type: [cc.Node],
    tooltip: "点击后要操作的对象"
  })], _ctor.prototype, "nodes", undefined);
  __decorate([_property({
    type: [Boolean],
    tooltip: "显示"
  })], _ctor.prototype, "show", undefined);
  __decorate([_property({
    type: [exp_SetOtherState],
    tooltip: "点击之后要操作的对象"
  })], _ctor.prototype, "item", undefined);
  __decorate([_property({
    type: [exp_ChangeItemAdsorption],
    tooltip: "对item对象吸附"
  })], _ctor.prototype, "changItemAdsorption", undefined);
  __decorate([_property({
    type: Boolean,
    tooltip: "是否要参与检查"
  })], _ctor.prototype, "needCheckFinish", undefined);
  __decorate([_property({
    type: Boolean,
    tooltip: "是否是最后一步"
  })], _ctor.prototype, "isLastStep", undefined);
  return __decorate([_ccclass("TouchEnable")], _ctor);
}(cc.Component);
exports.default = def_TouchEnable;