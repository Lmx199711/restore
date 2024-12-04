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
    t.typeCool = .02;
    t.words = "";
    t.myText = null;
    t.delayHide = .1;
    t.currentPos = 0;
    t.isActive = false;
    t.Delayindex = 0;
    t.timeoutIndex = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.AcFun = function (e, t, o) {
    o && this.handleArg({
      arg1: o[0],
      arg2: o[1]
    });
  };
  _ctor.prototype.start = function () {
    this.timer = 0;
    this.typeCool = Math.min(0, this.typeCool);
    this.myText && (this.myText.string = "");
  };
  _ctor.prototype.update = function (e) {
    if (this.isActive) {
      if (e > 1) {
        console.log("出现超长帧,屏蔽掉");
      } else if (!(this.typeCool < 0)) {
        this.timer += e;
        if (this.timer >= this.typeCool) {
          this.timer = 0;
          this.currentPos++;
          this.myText && (this.myText.string = this.words.slice(0, this.currentPos));
          this.currentPos >= this.words.length && this.onFinish();
        }
      }
    }
  };
  _ctor.prototype.setWords = function (e) {
    if (this.typeCool < 0) {
      this.clearTimer();
      cc.tween(this.node).to(.2, {
        opacity: 255
      }).start();
      this.myText.string = e;
      this.onFinish();
    } else {
      this.clearTimer();
      cc.tween(this.node).to(.2, {
        opacity: 255
      }).start();
      this.words = e;
      this.isActive = true;
    }
  };
  _ctor.prototype.handleArg = function (e) {
    e && e.arg1 && this.setWords(e.arg1);
  };
  _ctor.prototype.onFinish = function () {
    var e = this;
    this.isActive = false;
    if (this.delayHide > 0) {
      this.Delayindex = setTimeout(function () {
        console.log(":onFinish");
        e.timer = 0;
        e.currentPos = 0;
        e.myText && (e.myText.string = e.words);
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
    displayName: "打字时间间隔"
  })], _ctor.prototype, "typeCool", undefined);
  __decorate([_property({
    displayName: "打印文字"
  })], _ctor.prototype, "words", undefined);
  __decorate([_property(cc.Label)], _ctor.prototype, "myText", undefined);
  __decorate([_property()], _ctor.prototype, "delayHide", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/文本/打字效果")], _ctor);
}(r_MsgActionBase.default);
exports.ShowMsgPick = exp_ShowMsgPick;