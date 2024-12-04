var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressSound = exports.ProgressMoveInfo = undefined;
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_ProgressMoveInfo = function () {
  function _ctor() {}
  __decorate([_property({
    type: cc.Node,
    displayName: "进度移动节点"
  })], _ctor.prototype, "moveNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "进度移动节点开始坐标"
  })], _ctor.prototype, "moveStart", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "进度移动节点结束坐标"
  })], _ctor.prototype, "moveEnd", undefined);
  return __decorate([_ccclass("ProgressMoveInfo")], _ctor);
}();
exports.ProgressMoveInfo = exp_ProgressMoveInfo;
var exp_ProgressSound = function () {
  function _ctor() {
    this.progress = .1;
    this.sound = "";
    this.isPlay = false;
  }
  __decorate([_property({
    type: Number,
    displayName: "达到进度触发音效"
  })], _ctor.prototype, "progress", undefined);
  __decorate([_property({
    displayName: "音效"
  })], _ctor.prototype, "sound", undefined);
  return __decorate([_ccclass("ProgressSound")], _ctor);
}();
exports.ProgressSound = exp_ProgressSound;
var def_ClickAddProgress = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.clickTime = 10;
    t.clickAction = "";
    t.successAction = "";
    t.moveList = [];
    t.delTime = 0;
    t.delpro = 0;
    t.clickSound = "";
    t.soundList = [];
    t.passTime = 0;
    t.isPlayClickSound = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.progress.progress = 0;
    for (var e = 0; e < this.moveList.length; e++) {
      this.moveList[e].moveNode.x = this.moveList[e].moveStart.x;
      this.moveList[e].moveNode.y = this.moveList[e].moveStart.y;
    }
    this.passTime = 0;
  };
  _ctor.prototype.onClickBtn = function () {
    var e = this;
    if (!(this.progress.progress >= 1)) {
      if (!(this.isPlayClickSound || "" == this.clickSound)) {
        this.isPlayClickSound = true;
        r_SoundMgr.SoundMgr.playSound(this.clickSound, false, function () {
          e.isPlayClickSound = false;
        });
      }
      var t = this.progress.progress + 1 / this.clickTime;
      if (t >= .999) {
        t = 1;
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.successAction);
      } else {
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.clickAction);
      }
      this.refreshProgress(t);
    }
  };
  _ctor.prototype.refreshProgress = function (e) {
    this.progress.progress = e;
    for (var t = 0; t < this.moveList.length; t++) {
      var o = this.moveList[t];
      o.moveNode.x = o.moveStart.x + (o.moveEnd.x - o.moveStart.x) * e;
      o.moveNode.y = o.moveStart.y + (o.moveEnd.y - o.moveStart.y) * e;
    }
  };
  _ctor.prototype.update = function (e) {
    if (!(this.delTime <= 0 || this.progress.progress >= 1)) {
      this.passTime = this.passTime + e;
      for (var t = 0; t < this.soundList.length; t++) {
        var o = this.soundList[t];
        if (!o.isPlay && o.progress <= this.progress.progress) {
          o.isPlay = true;
          r_SoundMgr.SoundMgr.playSound(o.sound);
        }
      }
      if (this.passTime >= this.delTime) {
        this.passTime = 0;
        var i = this.progress.progress - this.delpro;
        i <= 0 && (i = 0);
        this.refreshProgress(i);
      }
    }
  };
  __decorate([_property({
    type: Number,
    displayName: "点击次数"
  })], _ctor.prototype, "clickTime", undefined);
  __decorate([_property({
    type: cc.ProgressBar,
    displayName: "进度条"
  })], _ctor.prototype, "progress", undefined);
  __decorate([_property({
    displayName: "点击时触发的action"
  })], _ctor.prototype, "clickAction", undefined);
  __decorate([_property({
    displayName: "成功时触发的action"
  })], _ctor.prototype, "successAction", undefined);
  __decorate([_property({
    type: [exp_ProgressMoveInfo],
    displayName: "进度移动列表"
  })], _ctor.prototype, "moveList", undefined);
  __decorate([_property({
    type: Number,
    displayName: "减少进度时间间隔"
  })], _ctor.prototype, "delTime", undefined);
  __decorate([_property({
    type: Number,
    displayName: "减少进度"
  })], _ctor.prototype, "delpro", undefined);
  __decorate([_property({
    displayName: "点击音效"
  })], _ctor.prototype, "clickSound", undefined);
  __decorate([_property({
    type: [exp_ProgressSound],
    displayName: "进度移动列表"
  })], _ctor.prototype, "soundList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ClickAddProgress;