var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GameSelfSystem = require("GameSelfSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_WinShowComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodeList = [];
    t.hideNodeList = [];
    t.duration = 1;
    t.isNeedOpacity = true;
    t.action = "";
    t.sound = "";
    t.curItemList = [];
    t.isEnd = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  _ctor.prototype.trigger = function () {};
  _ctor.prototype.isFinish = function () {
    var e = this;
    if (this.isEnd) {
      return true;
    }
    if (!r_GameSelfSystem.GameSelfSystem.isFinishOtherExpLogic(this)) {
      return false;
    }
    this.isEnd = true;
    r_GameSelfSystem.GameSelfSystem.blockAllTouch(true);
    for (var t = 0; t < this.hideNodeList.length; t++) {
      (o = this.hideNodeList[t]).active = false;
    }
    "" != this.action && r_TriggerActionMgr.TriggerActionMgr.trigger(this.action);
    "" != this.sound && r_SoundMgr.SoundMgr.playSound(this.sound);
    for (t = 0; t < this.nodeList.length; t++) {
      var o;
      (o = this.nodeList[t]).active = true;
      if (0 == t) {
        if (this.isNeedOpacity) {
          o.opacity = 0;
          cc.tween(o).to(this.duration, {
            opacity: 255
          }, {
            easing: cc.easing.smooth
          }).call(function () {
            e.isEnd = true;
            r_GameSelfSystem.GameSelfSystem.blockAllTouch(false);
            r_GameSelfSystem.GameSelfSystem.checkWin();
          }).start();
        } else {
          cc.tween(o).delay(this.duration).call(function () {
            e.isEnd = true;
            r_GameSelfSystem.GameSelfSystem.blockAllTouch(false);
            r_GameSelfSystem.GameSelfSystem.checkWin();
          }).start();
        }
      } else if (this.isNeedOpacity) {
        o.opacity = 0;
        cc.tween(o).to(this.duration, {
          opacity: 255
        }, {
          easing: cc.easing.smooth
        }).start();
      } else {
        cc.tween(o).delay(this.duration).start();
      }
    }
  };
  __decorate([_property({
    type: [cc.Node],
    tooltip: "胜利出现的节点列表"
  })], _ctor.prototype, "nodeList", undefined);
  __decorate([_property({
    type: [cc.Node],
    tooltip: "胜利隐藏的节点列表"
  })], _ctor.prototype, "hideNodeList", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "出现时间"
  })], _ctor.prototype, "duration", undefined);
  __decorate([_property({
    tooltip: "是否需要透明度变化"
  })], _ctor.prototype, "isNeedOpacity", undefined);
  __decorate([_property({
    tooltip: "触发action"
  })], _ctor.prototype, "action", undefined);
  __decorate([_property({
    tooltip: "音效"
  })], _ctor.prototype, "sound", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_WinShowComponent;