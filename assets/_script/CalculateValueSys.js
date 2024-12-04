Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalculateValueSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var r_BehaviorMgr = require("BehaviorMgr");
var r_CalculateValueCom = require("CalculateValueCom");
var r_GameKeyMgr = require("GameKeyMgr");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_CalculateValueSys = function () {
  function _ctor() {
    this.varName = "";
    this.isApplyCalculate = true;
  }
  _ctor.prototype.trigger = function () {
    var e = r_CommonFunc.stringKeyToArr(this.entity.idsBefore);
    e && e.length > 0 && e.forEach(function (e) {
      r_BehaviorMgr.BehaviorMgr.trigger(e);
    });
    var t = 0;
    0 == this.calculates.length && (this.isApplyCalculate = false);
    for (var o = 0; o < this.calculates.length; o++) {
      var i = this.calculates[o].type;
      var n = this.entity.initValue || 0;
      var l = 0;
      var u = 0;
      var h = this.calculates[o].a2b;
      var p = this.calculates[o].a;
      var d = this.calculates[o].b;
      if (isNaN(parseInt(p))) {
        r_GameKeyMgr.GameKeyMgr.VarObj[p] && (l = r_GameKeyMgr.GameKeyMgr.VarObj[p]);
      } else {
        l = parseInt(p) || 0;
      }
      if (isNaN(parseInt(d))) {
        r_GameKeyMgr.GameKeyMgr.VarObj[d] && (u = r_GameKeyMgr.GameKeyMgr.VarObj[d]);
      } else {
        u = parseInt(d) || 0;
      }
      switch (h) {
        case r_CalculateValueCom.OPERATION_TYPE.加:
          n = l + u;
          break;
        case r_CalculateValueCom.OPERATION_TYPE.减:
          n = l - u;
          break;
        case r_CalculateValueCom.OPERATION_TYPE.乘:
          n = l * u;
          break;
        case r_CalculateValueCom.OPERATION_TYPE.除:
          0 != u && (n = Math.floor(l / u));
          break;
        case r_CalculateValueCom.OPERATION_TYPE.取余:
          0 != u && (n = Math.floor(l % u));
          break;
        case r_CalculateValueCom.OPERATION_TYPE.赋值为:
          if (r_GameKeyMgr.GameKeyMgr.VarObj[p]) {
            r_GameKeyMgr.GameKeyMgr.VarObj[p] = u;
            n = u;
          }
      }
      switch (i) {
        case r_CalculateValueCom.OPERATION_TYPE.加:
          t += n;
          break;
        case r_CalculateValueCom.OPERATION_TYPE.减:
          t -= n;
          break;
        case r_CalculateValueCom.OPERATION_TYPE.乘:
          t *= n;
          break;
        case r_CalculateValueCom.OPERATION_TYPE.除:
          0 != n && (t = Math.floor(t / n));
          break;
        case r_CalculateValueCom.OPERATION_TYPE.取余:
          0 != n && (t = Math.floor(t % n));
          break;
        case r_CalculateValueCom.OPERATION_TYPE.赋值为:
          t = n;
      }
    }
    var y = true;
    if (this.conditions) {
      for (o = 0; o < this.conditions.length; o++) {
        var f = this.conditions[o];
        var m = true;
        var g = 0;
        var v = 0;
        var C = f.varName;
        var S = f.var_Var;
        if (isNaN(parseInt(C))) {
          r_GameKeyMgr.GameKeyMgr.VarObj[C] && (g = r_GameKeyMgr.GameKeyMgr.VarObj[C]);
        } else {
          g = parseInt(C) || 0;
        }
        if (isNaN(parseInt(S))) {
          r_GameKeyMgr.GameKeyMgr.VarObj[S] && (v = r_GameKeyMgr.GameKeyMgr.VarObj[S]);
        } else {
          v = parseInt(S) || 0;
        }
        switch (f.compareType) {
          case r_CalculateValueCom.COMPARE_TYPE.大于:
            m = g > v;
            break;
          case r_CalculateValueCom.COMPARE_TYPE.小于:
            m = g < v;
            break;
          case r_CalculateValueCom.COMPARE_TYPE.等于:
            m = g == v;
        }
        switch (f.logicType) {
          case r_CalculateValueCom.LOGIC_TYPE.并且:
            y = y && m;
            break;
          case r_CalculateValueCom.LOGIC_TYPE.或者:
            y = y || m;
            break;
          case r_CalculateValueCom.LOGIC_TYPE.取反:
            y = y && !m;
        }
      }
    }
    this.varName && this.isApplyCalculate && (r_GameKeyMgr.GameKeyMgr.VarObj[this.varName] = t);
    if (y) {
      var I = r_CommonFunc.stringKeyToArr(this.entity.idsPass);
      I && I.length > 0 && I.forEach(function (e) {
        r_BehaviorMgr.BehaviorMgr.trigger(e);
      });
    }
  };
  _ctor.prototype.onStart = function () {
    this.varName = this.entity.varKey;
    this.varName && (r_GameKeyMgr.GameKeyMgr.VarObj.hasOwnProperty(this.varName) || (r_GameKeyMgr.GameKeyMgr.VarObj[this.varName] = this.entity.initValue || 0));
    this.calculates = this.entity.calculateInfos;
    this.conditions = this.entity.conditionInfos;
  };
  _ctor.prototype.onDestroy = function () {
    if (this.varName) {
      try {
        r_GameKeyMgr.GameKeyMgr.VarObj.hasOwnProperty(this.varName) && (r_GameKeyMgr.GameKeyMgr.VarObj[this.varName] = 0);
      } catch (e) {}
    }
    this.entity = null;
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_CalculateValueCom.CalculateValueCom)], _ctor);
}();
exports.CalculateValueSys = exp_CalculateValueSys;