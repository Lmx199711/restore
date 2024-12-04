var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyValue = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_KeyValue = function () {
  function _ctor() {
    this.keyString = "";
    this.valueString = "";
    this.currSuccActionId = "";
  }
  __decorate([_property({
    displayName: "key值"
  })], _ctor.prototype, "keyString", undefined);
  __decorate([_property({
    displayName: "value值"
  })], _ctor.prototype, "valueString", undefined);
  __decorate([_property({
    displayName: "当前检测成功事件"
  })], _ctor.prototype, "currSuccActionId", undefined);
  return __decorate([_ccclass("KeyValue")], _ctor);
}();
exports.KeyValue = exp_KeyValue;
var def_CheckKeyValue = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isCheckAll = true;
    t.checkArr = [];
    t.succActionId = "";
    t.failActionId = "";
    t.finishActionId = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.checkResult = function () {
    if (this.isCheckAll) {
      var e = true;
      for (var t = 0; t < this.checkArr.length; t++) {
        r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.checkArr[t].keyString) != this.checkArr[t].valueString && (e = false);
      }
      if (e) {
        r_BehaviorMgr.BehaviorMgr.trigger(this.succActionId);
      } else {
        r_BehaviorMgr.BehaviorMgr.trigger(this.failActionId);
      }
    } else {
      for (t = 0; t < this.checkArr.length; t++) {
        if ("" == this.checkArr[t].valueString) {
          if (r_GameKeyMgr.GameKeyMgr.has(this.checkArr[t].keyString)) {
            r_BehaviorMgr.BehaviorMgr.trigger(this.checkArr[t].currSuccActionId);
            break;
          }
          if (t != this.checkArr.length - 1) {
            continue;
          }
          r_BehaviorMgr.BehaviorMgr.trigger(this.finishActionId);
        } else {
          if (r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.checkArr[t].keyString) == this.checkArr[t].valueString) {
            r_BehaviorMgr.BehaviorMgr.trigger(this.checkArr[t].currSuccActionId);
            break;
          }
          if (t != this.checkArr.length - 1) {
            continue;
          }
          r_BehaviorMgr.BehaviorMgr.trigger(this.finishActionId);
        }
      }
    }
  };
  __decorate([_property({
    displayName: "全部检测通过模式"
  })], _ctor.prototype, "isCheckAll", undefined);
  __decorate([_property({
    displayName: "检查键值对",
    type: exp_KeyValue
  })], _ctor.prototype, "checkArr", undefined);
  __decorate([_property({
    displayName: "检查通过执行id",
    visible: function () {
      return this.isCheckAll;
    }
  })], _ctor.prototype, "succActionId", undefined);
  __decorate([_property({
    displayName: "检查不通过执行id",
    visible: function () {
      return this.isCheckAll;
    }
  })], _ctor.prototype, "failActionId", undefined);
  __decorate([_property({
    displayName: "顺序检测全部完成",
    visible: function () {
      return !this.isCheckAll;
    }
  })], _ctor.prototype, "finishActionId", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CheckKeyValue;