var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowMsgPick = undefined;
var r_MsgActionBase = require("MsgActionBase");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_ShowMsgPick = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.delayHide = 1;
    t.panelDelay = 1;
    t.myTextNode = null;
    t.myText = null;
    t.Delayindex = 0;
    t.timeoutIndex = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.AcFun = function (e, t, o) {
    if (o) {
      if (o instanceof Array) {
        this.handleArg({
          arg1: o[0],
          arg2: o[1]
        });
      } else {
        this.handleArg({
          arg1: o
        });
      }
    }
  };
  _ctor.prototype.onLoad = function () {
    this.myText = this.myTextNode.getComponent(cc.Label) || this.myTextNode.getComponent(cc.RichText);
    this.panelDelay = this.delayHide;
  };
  _ctor.prototype.start = function () {
    this.myText && (this.myText.string = "");
  };
  _ctor.prototype.setWords = function (e) {
    if (this.myText) {
      this.clearTimer();
      cc.Tween.stopAllByTarget(this.node);
      cc.tween(this.node).to(.2, {
        opacity: 255
      }).start();
      this.myText.string = e || "";
      this.onFinish();
    }
  };
  _ctor.prototype.onFinish = function () {
    var e = this;
    if (this.delayHide > 0) {
      this.Delayindex = setTimeout(function () {
        var t = setTimeout(function () {
          e.myText.string = "";
          cc.tween(e.node).to(.2, {
            opacity: 0
          }).start();
        }, 1e3);
        e.timeoutIndex.push(t);
      }, 1e3 * this.delayHide);
      this.timeoutIndex.push(this.Delayindex);
    }
  };
  _ctor.prototype.handleArg = function (e) {
    if (e && e.arg2) {
      console.log("-指定了fade时间:" + e.arg2);
      this.setFadeTime(e.arg2);
    } else {
      console.log("-没有指定fade时间");
      this.delayHide = this.panelDelay;
    }
    e && e.arg1 && this.setWords(e.arg1);
  };
  _ctor.prototype.setFadeTime = function (e) {
    var t = Number(e);
    if (isNaN(t)) {
      cc.warn("--><静态文字>传入arg2非数字");
    } else {
      this.delayHide = t;
    }
  };
  _ctor.prototype.onDestroy = function () {
    this.clearTimer();
  };
  _ctor.prototype.clearTimer = function () {
    for (var e = 0; e < this.timeoutIndex.length; e++) {
      clearTimeout(this.timeoutIndex[e]);
    }
    this.timeoutIndex.length = 0;
  };
  __decorate([_property({
    displayName: "消失时间",
    step: .1
  })], _ctor.prototype, "delayHide", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "myTextNode", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/文本/静态文字")], _ctor);
}(r_MsgActionBase.default);
exports.ShowMsgPick = exp_ShowMsgPick;