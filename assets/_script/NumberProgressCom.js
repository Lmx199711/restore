var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressCheckInfo = undefined;
var s;
var r_GameKeyMgr = require("GameKeyMgr");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
_decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["大于等于"] = 0] = "大于等于";
  e[e["小于"] = 1] = "小于";
  e[e["大小之间"] = 2] = "大小之间";
})(s || (s = {}));
var exp_ProgressCheckInfo = function () {
  function _ctor() {
    this.checkKey = "";
    this.checkMood = s.大于等于;
    this.checkNumMin = 0;
    this.checkNumMax = 0;
    this.checkSucTriggerId = "";
  }
  __decorate([_property({
    displayName: "检测前置key"
  })], _ctor.prototype, "checkKey", undefined);
  __decorate([_property({
    displayName: "检测类型",
    type: cc.Enum(s)
  })], _ctor.prototype, "checkMood", undefined);
  __decorate([_property({
    displayName: "检测进度值小",
    visible: function () {
      return this.checkMood != s.小于;
    }
  })], _ctor.prototype, "checkNumMin", undefined);
  __decorate([_property({
    displayName: "检测进度值大",
    visible: function () {
      return this.checkMood != s.大于等于;
    }
  })], _ctor.prototype, "checkNumMax", undefined);
  __decorate([_property({
    displayName: "检测成功出发事件Id"
  })], _ctor.prototype, "checkSucTriggerId", undefined);
  return __decorate([_ccclass("ProgressCheckInfo")], _ctor);
}();
exports.ProgressCheckInfo = exp_ProgressCheckInfo;
var def_NumberProgressCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.varName = "";
    t.curr = 0;
    t.max = 100;
    t.changeTime = .2;
    t.checkInfoArr = [];
    t.currNum = 0;
    t.maxNum = 0;
    t.currProNum = 0;
    t.prograss = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.prograss = this.node.getComponentInChildren(cc.ProgressBar);
    this.maxNum = this.max;
    this.currNum = this.curr;
    console.log("初始进度值:" + this.currNum + "/" + this.max);
    this.showCurrPro();
    if (this.varName) {
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.varName, this.currNum);
      r_GameKeyMgr.GameKeyMgr.VarObj[this.varName] = this.currNum;
    }
  };
  _ctor.prototype.init = function (e, t) {
    var o = 0;
    var i = 0;
    !e && isNaN(Number(e)) || (o = Number(e));
    !t && isNaN(Number(t)) || (i = Number(t));
    this.maxNum = i;
    this.currNum = o;
    console.log("初始进度值:" + this.currNum + "/" + this.maxNum);
    if (this.varName) {
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.varName, this.currNum);
      r_GameKeyMgr.GameKeyMgr.VarObj[this.varName] = this.currNum;
    }
  };
  _ctor.prototype.AcFun = function (e, t, o) {
    if (o) {
      console.log("增加数值：data:" + o);
      this.addcurrNum(Number(o) || 0);
    }
  };
  _ctor.prototype.addcurrNum = function (e) {
    this.currNum += e;
    console.log("now the num:" + this.currNum);
    this.clampCurNum();
    this.showCurrPro();
    if (this.varName) {
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.varName, this.currNum);
      r_GameKeyMgr.GameKeyMgr.VarObj[this.varName] = this.currNum;
    }
    this.checkCurrInfo();
  };
  _ctor.prototype.showCurrPro = function () {
    this.prograss.node.stopAllActions();
    this.currProNum = this.currNum / this.maxNum;
    cc.tween(this.prograss).to(this.changeTime, {
      progress: this.currProNum
    }).start();
  };
  _ctor.prototype.clampCurNum = function () {
    this.currNum < 0 && (this.currNum = 0);
    this.currNum > this.maxNum && (this.currNum = this.maxNum);
  };
  _ctor.prototype.checkCurrInfo = function () {
    for (var e = 0; e < this.checkInfoArr.length; e++) {
      this.checkResult(e, this.checkInfoArr[e]);
    }
  };
  _ctor.prototype.checkResult = function (e, t) {
    var o = false;
    o = "" == t.checkKey || !!r_GameKeyMgr.GameKeyMgr.has(t.checkKey);
    console.log("检测条件" + e + "的checkKeyResult：" + o);
    if (o) {
      if (t.checkMood == s.大于等于 && this.currNum >= t.checkNumMin) {
        r_BehaviorMgr.BehaviorMgr.trigger(t.checkSucTriggerId);
      } else if (t.checkMood == s.小于 && this.currNum < t.checkNumMax) {
        r_BehaviorMgr.BehaviorMgr.trigger(t.checkSucTriggerId);
      } else {
        t.checkMood == s.大小之间 && this.currNum >= t.checkNumMin && this.currNum < t.checkNumMax && r_BehaviorMgr.BehaviorMgr.trigger(t.checkSucTriggerId);
      }
    }
  };
  __decorate([_property({
    displayName: "保存至变量"
  })], _ctor.prototype, "varName", undefined);
  __decorate([_property({
    displayName: "初始化点数",
    type: cc.Integer
  })], _ctor.prototype, "curr", undefined);
  __decorate([_property({
    displayName: "初始化最大点数",
    type: cc.Integer
  })], _ctor.prototype, "max", undefined);
  __decorate([_property({
    displayName: "进度条变化时间"
  })], _ctor.prototype, "changeTime", undefined);
  __decorate([_property({
    displayName: "所有检测条件",
    type: exp_ProgressCheckInfo
  })], _ctor.prototype, "checkInfoArr", undefined);
  return __decorate([_ccclass()], _ctor);
}(cc.Component);
exports.default = def_NumberProgressCom;