Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecuteBehaviorInfoByKeys = exports.DelayExecuteBehaviorInfo = exports.ExecuteBehaviorCheckType = exports.BrachType = undefined;
var n;
var r_GameKeyMgr = require("GameKeyMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
(function (e) {
  e[e["成功"] = 1] = "成功";
  e[e["未成功"] = 2] = "未成功";
})(exports.BrachType || (exports.BrachType = {}));
(function (e) {
  e[e["匹配所有"] = 0] = "匹配所有";
  e[e["避开以下所有"] = 1] = "避开以下所有";
  e[e["匹配其中一个"] = 2] = "匹配其中一个";
  e[e["避开其中一个即可"] = 3] = "避开其中一个即可";
})(n = exports.ExecuteBehaviorCheckType || (exports.ExecuteBehaviorCheckType = {}));
var exp_DelayExecuteBehaviorInfo = function () {
  function _ctor() {
    this.behaviorId = "";
    this.delay = 0;
    this.data = "";
  }
  _ctor.prototype.execute = function () {
    var e = this;
    if (this.delay > 0) {
      r_BehaviorMgr.BehaviorMgr.timeout(this.delay, function () {
        r_BehaviorMgr.BehaviorMgr.trigger(e.behaviorId, e.data);
      });
    } else {
      r_BehaviorMgr.BehaviorMgr.trigger(this.behaviorId, this.data);
    }
  };
  __decorate([_property({
    displayName: "要执行的行为"
  })], _ctor.prototype, "behaviorId", undefined);
  __decorate([_property({
    displayName: "延迟(s)",
    visible: function () {
      return this.behaviorId;
    }
  })], _ctor.prototype, "delay", undefined);
  __decorate([_property({
    displayName: "携带的数据",
    tooltip: "多个参数用|分隔",
    visible: function () {
      return this.behaviorId;
    }
  })], _ctor.prototype, "data", undefined);
  return __decorate([_ccclass("DelayExecuteBehaviorInfo")], _ctor);
}();
exports.DelayExecuteBehaviorInfo = exp_DelayExecuteBehaviorInfo;
var exp_ExecuteBehaviorInfoByKeys = function () {
  function _ctor() {
    this.keys = "";
    this.type = n.匹配所有;
    this.needExecuteBehavior = true;
    this.delayBehaviors = [];
    this.failBehaviors = [];
  }
  _ctor.prototype.execute = function () {
    var e;
    var t = false;
    if (this.keys.includes(",")) {
      e = this.keys.split(",");
    } else {
      this.keys && (e = [this.keys]);
    }
    if (e) {
      switch (this.type) {
        case n.避开其中一个即可:
          for (var o = 0; o < e.length; o++) {
            var i = e[o];
            if (!r_GameKeyMgr.GameKeyMgr.has(i)) {
              t = true;
              break;
            }
          }
          break;
        case n.匹配其中一个:
          for (o = 0; o < e.length; o++) {
            i = e[o];
            if (r_GameKeyMgr.GameKeyMgr.has(i)) {
              t = true;
              break;
            }
          }
          break;
        case n.避开以下所有:
          t = true;
          for (o = 0; o < e.length; o++) {
            i = e[o];
            if (r_GameKeyMgr.GameKeyMgr.has(i)) {
              t = false;
              break;
            }
          }
          break;
        case n.匹配所有:
          t = true;
          for (o = 0; o < e.length; o++) {
            i = e[o];
            if (!r_GameKeyMgr.GameKeyMgr.has(i)) {
              t = false;
              break;
            }
          }
          break;
        default:
          cc.warn("错误的key检查模式");
      }
    } else {
      t = true;
    }
    if (t) {
      this.delayBehaviors && this.delayBehaviors.length > 0 && this.delayBehaviors.forEach(function (e) {
        e.execute();
      });
      this.onCheckSuccess && this.onCheckSuccess();
    } else {
      this.failBehaviors && this.failBehaviors.length > 0 && this.failBehaviors.forEach(function (e) {
        e.execute();
      });
    }
  };
  __decorate([_property({
    displayName: "要检查的key",
    tooltip: '多个用逗号","隔开'
  })], _ctor.prototype, "keys", undefined);
  __decorate([_property({
    displayName: "检测类型",
    type: cc.Enum(n)
  })], _ctor.prototype, "type", undefined);
  __decorate([_property({
    displayName: "检测通过执行的行为",
    visible: function () {
      return this.needExecuteBehavior;
    },
    type: [exp_DelayExecuteBehaviorInfo]
  })], _ctor.prototype, "delayBehaviors", undefined);
  __decorate([_property({
    displayName: "检测不通过执行的行为",
    visible: function () {
      return this.needExecuteBehavior;
    },
    type: [exp_DelayExecuteBehaviorInfo]
  })], _ctor.prototype, "failBehaviors", undefined);
  return __decorate([_ccclass("ExecuteBehaviorInfoByKeys")], _ctor);
}();
exports.ExecuteBehaviorInfoByKeys = exp_ExecuteBehaviorInfoByKeys;