var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicWordInfo = exports.MusicArrowInfo = exports.MusicCharInfo = exports.MusicClickType = undefined;
var s;
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["点击"] = 0] = "点击";
  e[e["啪"] = 1] = "啪";
})(s = exports.MusicClickType || (exports.MusicClickType = {}));
var exp_MusicCharInfo = function () {
  function _ctor() {
    this.clickType = s.点击;
    this.startTime = 0;
    this.endTime = 0;
    this.trueAtion = "";
    this.isAdd = false;
    this.isFinish = false;
  }
  __decorate([_property({
    type: cc.Enum(s),
    displayName: "点击类型"
  })], _ctor.prototype, "clickType", undefined);
  __decorate([_property({
    type: Number,
    displayName: "开始时间"
  })], _ctor.prototype, "startTime", undefined);
  __decorate([_property({
    type: Number,
    displayName: "结束时间"
  })], _ctor.prototype, "endTime", undefined);
  __decorate([_property({
    displayName: "成功action"
  })], _ctor.prototype, "trueAtion", undefined);
  return __decorate([_ccclass("MusicCharInfo")], _ctor);
}();
exports.MusicCharInfo = exp_MusicCharInfo;
var exp_MusicArrowInfo = function () {
  function _ctor() {}
  __decorate([_property({
    type: cc.Node,
    displayName: "开始节点"
  })], _ctor.prototype, "startNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "结束节点"
  })], _ctor.prototype, "endNode", undefined);
  return __decorate([_ccclass("MusicArrowInfo")], _ctor);
}();
exports.MusicArrowInfo = exp_MusicArrowInfo;
var exp_MusicWordInfo = function () {
  function _ctor() {
    this.startTime = 0;
    this.duringTime = 3;
    this.endTime = 0;
    this.charList = [];
    this.arrowList = [];
    this.curState = 0;
    this.maxLength = 0;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "文字根节点"
  })], _ctor.prototype, "rootNode", undefined);
  __decorate([_property({
    type: Number,
    displayName: "开始时间"
  })], _ctor.prototype, "startTime", undefined);
  __decorate([_property({
    type: Number,
    displayName: "持续时间"
  })], _ctor.prototype, "duringTime", undefined);
  __decorate([_property({
    type: Number,
    displayName: "隐藏时间"
  })], _ctor.prototype, "endTime", undefined);
  __decorate([_property({
    type: [exp_MusicCharInfo],
    displayName: "点击事件列表"
  })], _ctor.prototype, "charList", undefined);
  __decorate([_property({
    type: [exp_MusicArrowInfo],
    displayName: "箭头滑动列表"
  })], _ctor.prototype, "arrowList", undefined);
  return __decorate([_ccclass("MusicWordInfo")], _ctor);
}();
exports.MusicWordInfo = exp_MusicWordInfo;
var def_MusicLevelCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.startAction = "";
    t.errorAction = "";
    t.clickPaAction = "";
    t.clickClickAction = "";
    t.countDownTime = 3;
    t.musicList = [];
    t.gameEndTime = 20;
    t.resultAction = "";
    t.passTime = 0;
    t.isPause = true;
    t.curCharList = [];
    t.isTriggerResult = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.isPause = true;
    this.passTime = -this.countDownTime;
    for (var e = 0; e < this.musicList.length; e++) {
      var t = this.musicList[e];
      for (var o = 0; o < t.arrowList.length; o++) {
        t.maxLength = t.maxLength + t.arrowList[o].endNode.x - t.arrowList[o].startNode.x;
      }
    }
  };
  _ctor.prototype.onClickStart = function () {
    this.isPause = false;
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.startAction);
  };
  _ctor.prototype.onClickPa = function () {
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.clickPaAction);
    for (var e = this.curCharList.length - 1; e >= 0; e--) {
      var t = this.curCharList[e];
      if (!(t.isFinish || t.clickType != s.啪)) {
        t.isFinish = true;
        r_TriggerActionMgr.TriggerActionMgr.trigger(t.trueAtion);
        this.curCharList.splice(e, 1);
      }
    }
  };
  _ctor.prototype.onClickClick = function () {
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.clickClickAction);
    for (var e = this.curCharList.length - 1; e >= 0; e--) {
      var t = this.curCharList[e];
      if (!(t.isFinish || t.clickType != s.点击)) {
        t.isFinish = true;
        r_TriggerActionMgr.TriggerActionMgr.trigger(t.trueAtion);
        this.curCharList.splice(e, 1);
      }
    }
  };
  _ctor.prototype.update = function (e) {
    if (!this.isPause) {
      e > .1 && (e = .016);
      this.passTime = this.passTime + e;
      for (var t = 0; t < this.musicList.length; t++) {
        var o = this.musicList[t];
        if (this.passTime < o.startTime) {
          ;
        } else if (this.passTime >= o.startTime && this.passTime < o.startTime + o.duringTime) {
          this.arrowNode.active = true;
          if (0 == o.curState) {
            o.curState = 1;
            o.rootNode.active = true;
          }
          var i = (this.passTime - o.startTime) / o.duringTime;
          var n = i * o.maxLength;
          var a = 0;
          for (var s = 0; s < o.arrowList.length; s++) {
            var c = n - a;
            var l = o.arrowList[s].endNode.x - o.arrowList[s].startNode.x;
            if (c >= 0 && c <= l) {
              var u = o.arrowList[s].startNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
              var h = this.arrowNode.parent.convertToNodeSpaceAR(u);
              this.arrowNode.x = h.x + c;
              this.arrowNode.y = h.y;
            }
            a = a + o.arrowList[s].endNode.x - o.arrowList[s].startNode.x;
          }
          for (s = 0; s < o.charList.length; s++) {
            if (!(p = o.charList[s]).isAdd && this.passTime >= p.startTime && this.passTime <= p.endTime) {
              p.isAdd = true;
              this.curCharList.push(p);
            }
          }
          o.rootNode.getChildByName("mask").width = o.rootNode.width * i;
        } else {
          this.passTime >= o.startTime + o.duringTime && this.passTime < o.startTime + o.duringTime + o.endTime || 1 == o.curState && (o.curState = 2, o.rootNode.active = false, this.arrowNode.active = false);
        }
      }
      for (t = this.curCharList.length - 1; t >= 0; t--) {
        var p = this.curCharList[t];
        if (this.passTime > p.endTime) {
          if (!p.isFinish) {
            p.isFinish = true;
            r_TriggerActionMgr.TriggerActionMgr.trigger(this.errorAction);
          }
          this.curCharList.splice(t, 1);
        }
      }
      this.isTriggerResult || this.passTime >= this.gameEndTime && (this.isTriggerResult = true, r_TriggerActionMgr.TriggerActionMgr.trigger(this.resultAction));
    }
  };
  __decorate([_property({
    displayName: "开始游戏action"
  })], _ctor.prototype, "startAction", undefined);
  __decorate([_property({
    displayName: "错误action"
  })], _ctor.prototype, "errorAction", undefined);
  __decorate([_property({
    displayName: "点击啪action"
  })], _ctor.prototype, "clickPaAction", undefined);
  __decorate([_property({
    displayName: "点击点击action"
  })], _ctor.prototype, "clickClickAction", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "箭头节点"
  })], _ctor.prototype, "arrowNode", undefined);
  __decorate([_property({
    type: Number,
    displayName: "延迟开始的时间"
  })], _ctor.prototype, "countDownTime", undefined);
  __decorate([_property({
    type: [exp_MusicWordInfo],
    displayName: "音乐信息列表"
  })], _ctor.prototype, "musicList", undefined);
  __decorate([_property({
    type: Number,
    displayName: "游戏结束时间"
  })], _ctor.prototype, "gameEndTime", undefined);
  __decorate([_property({
    displayName: "游戏结束触发action"
  })], _ctor.prototype, "resultAction", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_MusicLevelCom;