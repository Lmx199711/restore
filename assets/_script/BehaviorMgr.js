var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorMgr = exports.removeBehavior = exports.addBehavior = exports.JsonInject2Action = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var r_BehaviorComBase = require("BehaviorComBase");
var r_ExecuteBehaviorCom = require("ExecuteBehaviorCom");
var r_BehaviorDef = require("BehaviorDef");
var r_CommonFunc = require("CommonFunc");
var r_ExecuteBehaviorInfoByKeys = require("ExecuteBehaviorInfoByKeys");
var r_TimeSystem = require("TimeSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var m = _decorator.executeInEditMode;
var _property = _decorator.property;
var _menu = _decorator.menu;
exports.JsonInject2Action = function (e) {
  e && e.levelVar && e.levelVar.forEach(function (e) {
    var t = false;
    r_GameKeyValueMgr.GameKeyValueMgr.setValue(e.id, e.value || 0);
    e.value && (t = true);
    e.expand && e.expand.forEach(function (o) {
      var i = (o.pre || "") + e.id + (o.post || "");
      i == e.id && t && cc.warn("变量表前后缀拼接时，中存在重复写入,变量名:" + e.id);
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(i, o.value || 0);
    });
  });
  e && e.ActionsGourp && e.ActionsGourp.forEach(function (e) {
    e.id;
    var t = e.name;
    var o = e.branch;
    var i = e.condition;
    var n = e.key;
    var a = e.excuteInfo;
    if (!t || !a) {
      return false;
    }
    var s = new r_ExecuteBehaviorCom.ExecuteBehaviorCom();
    s.behaviorId = t;
    var r = [];
    for (var c = 0; c < a.length; c++) {
      var u = new r_ExecuteBehaviorInfoByKeys.DelayExecuteBehaviorInfo();
      u.behaviorId = a[c].actionId;
      u.delay = a[c].delay || 0;
      r.push(u);
    }
    var h = new r_ExecuteBehaviorInfoByKeys.ExecuteBehaviorInfoByKeys();
    h.keys = n || "";
    n && "number" == typeof n && (h.keys = n.toString());
    h.type = i - 1;
    if (o == r_ExecuteBehaviorInfoByKeys.BrachType.成功) {
      h.delayBehaviors = r;
    } else {
      h.failBehaviors = r;
    }
    s.nextBehaviorInfo = [h];
    exp_BehaviorMgr.allBehavior[t] = s;
  });
};
exports.addBehavior = function (e, t) {
  for (var o = 0; o < e.length; o++) {
    for (var i = o + 1; i < e.length; i++) {
      e[o].behaviorId == e[o].behaviorId && console.error("有重复的id", e[o].behaviorId);
    }
  }
  var n = r_BehaviorDef.BehaviorComClass[t];
  if (null == n) {
    console.error("添加action失败 type=", t);
  } else {
    var a = new n();
    a.behaviorType = r_BehaviorDef.BehaviorType[t];
    e.unshift(a);
  }
};
exports.removeBehavior = function (e, t) {
  var o = e.findIndex(function (e) {
    return e.behaviorId == t;
  });
  -1 != o && e.splice(o, 1);
};
var exp_BehaviorMgr = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.originKey = [];
    t.addType = 0;
    t.add = false;
    t.removeActionId = "";
    t.remove = false;
    t.actionList = [];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.destroy = function () {
    for (var e in this.allBehavior) this.allBehavior[e].onDestroy();
    _ref__ctor.timeOutNumber = 0;
    _ref__ctor.tempTimeOutKeys.forEach(function (e) {
      r_TimeSystem.TimeSystem.scheduleClear(e);
    });
    _ref__ctor.tempTimeOutKeys.length = 0;
    _ref__ctor.allBehavior = {};
  };
  _ctor.timeout = function (e, t) {
    var i = _ref__ctor.timeOutKey + (_ref__ctor.timeOutNumber++).toString();
    _ref__ctor.tempTimeOutKeys.push(i);
    r_TimeSystem.TimeSystem.scheduleOnce(i, e, function () {
      var e = _ref__ctor.tempTimeOutKeys.indexOf(i);
      _ref__ctor.tempTimeOutKeys.splice(e, 1);
      t && t();
    });
  };
  _ctor.start = function () {
    for (var e in this.allBehavior) this.allBehavior[e].onStart();
  };
  _ctor.trigger = function (e, t) {
    undefined === e && (e = "");
    var i = e.toString();
    if (i && i.trim()) {
      i = i.trim();
      var n = (i = _ref__ctor.replaceKey(i)).indexOf("#");
      if (-1 != n) {
        var a = i.substring(0, n);
        var r = i.substring(n + 1);
        (i = a).length > 0 && (t = r);
        console.log("执行(带参):" + i + "," + t);
      } else {
        console.log("执行：" + i);
      }
      var c = this.allBehavior[i];
      if (c) {
        if (c.saveKeys) {
          if (c.delaySaveKeys > 0) {
            _ref__ctor.timeout(c.delaySaveKeys, function () {
              r_GameKeyMgr.GameKeyMgr.add(c.saveKeys);
            });
          } else {
            r_GameKeyMgr.GameKeyMgr.add(c.saveKeys);
          }
        }
        if (c.removeKeys) {
          if (c.delayRemoveKeys > 0) {
            _ref__ctor.timeout(c.delayRemoveKeys, function () {
              r_GameKeyMgr.GameKeyMgr.remove(c.removeKeys);
            });
          } else {
            r_GameKeyMgr.GameKeyMgr.remove(c.removeKeys);
          }
        }
        c.trigger(t);
        c.nextBehaviorInfo.forEach(function (e) {
          return e.execute();
        });
        c.isDebug && cc.log("尝试跳转", c.behaviorId, c.log);
      } else {
        console.log("触发了一个没有不存在的id:" + i);
      }
    }
  };
  _ctor.replaceKey = function (e) {
    var t = e;
    var o = /{([^{]+?)}/;
    for (var i = 0; null != o.exec(e);) {
      var n = o.exec(e);
      if (null != r_GameKeyValueMgr.GameKeyValueMgr.getValue(n[1])) {
        e = e.replace(o, r_GameKeyValueMgr.GameKeyValueMgr.getValue(n[1]));
      } else {
        r_GameKeyMgr.GameKeyMgr.VarObj.hasOwnProperty(n[1]) && (e = e.replace(o, r_GameKeyMgr.GameKeyMgr.VarObj[n[1]] || "0"));
      }
      if (++i > 8) {
        console.log("->>>>>>replaceKey format error<<<<<<--");
        e = t;
        break;
      }
    }
    return e;
  };
  _ctor.KeyToAction = function (e, t) {
    var i = true;
    var n = r_CommonFunc.stringKeyToArr(e);
    if (n) {
      for (var a = 0; a < n.length; a++) {
        var r = n[a];
        if (!r_GameKeyMgr.GameKeyMgr.has(r)) {
          i = false;
          break;
        }
      }
    }
    if (i) {
      var c = r_CommonFunc.stringKeyToArr(t);
      c && c.length > 0 && c.forEach(function (e) {
        _ref__ctor.trigger(e);
      });
    }
    return i;
  };
  _ctor.hasKeys = function (e) {
    var t = r_CommonFunc.stringKeyToArr(e);
    if (t) {
      for (var o = 0; o < t.length; o++) {
        var i = t[o];
        if (!r_GameKeyMgr.GameKeyMgr.has(i)) {
          return false;
        }
      }
    }
    return true;
  };
  _ctor.triggerActions = function (e) {
    var t = r_CommonFunc.stringKeyToArr(e);
    t && t.length > 0 && t.forEach(function (e) {
      _ref__ctor.trigger(e);
    });
  };
  _ctor.executeBehavior = function (e) {
    e && e.execute();
  };
  _ctor.prototype.onLoad = function () {
    this.originKey.forEach(function (e) {
      r_GameKeyMgr.GameKeyMgr.add(e);
    });
    this.actionList.forEach(function (e) {
      _ref__ctor.allBehavior[e.behaviorId] = e;
    });
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function () {};
  _ctor.stopAll = function () {
    _ref__ctor.destroy();
  };
  _ctor.allBehavior = {};
  _ctor.timeOutKey = "RelaxLevelLogic_Timeout_";
  _ctor.timeOutNumber = 0;
  _ctor.tempTimeOutKeys = [];
  __decorate([_property({
    type: [cc.String],
    displayName: "初始有用的key",
    serializable: true
  })], _ctor.prototype, "originKey", undefined);
  __decorate([_property({
    type: cc.Enum(r_BehaviorDef.BehaviorType),
    displayName: "需要添加的行为"
  })], _ctor.prototype, "addType", undefined);
  __decorate([_property({
    displayName: "添加一个行为"
  })], _ctor.prototype, "add", undefined);
  __decorate([_property({
    displayName: "需要移除的行为ID"
  })], _ctor.prototype, "removeActionId", undefined);
  __decorate([_property({
    displayName: "移除一个行为"
  })], _ctor.prototype, "remove", undefined);
  __decorate([_property({
    type: [r_BehaviorComBase.BehaviorComBase],
    displayName: "行为",
    serializable: true
  })], _ctor.prototype, "actionList", undefined);
  return _ref__ctor = __decorate([_ccclass, m, _menu("新系统/行为组")], _ctor);
}(cc.Component);
exports.BehaviorMgr = exp_BehaviorMgr;