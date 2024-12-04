var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomPlayAnim = undefined;
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_RandomPlayAnim = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.animNameList = [];
    t.delayTime = 2;
    t.triggerSound = "";
    t.randomList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = this;
    this.resetRandomList();
    var t = cc.tween().call(function () {
      e.randomList.length <= 0 && e.resetRandomList();
      var t = r_UtilsSystem.UtilsSystem.getRandomNum(0, e.randomList.length - 1);
      var o = e.randomList[t];
      e.randomList.splice(t, 1);
      e.actionNode.getComponent(sp.Skeleton).setAnimation(0, o, false);
      "" != e.triggerSound && r_SoundMgr.SoundMgr.playSound(e.triggerSound);
    }).delay(this.delayTime);
    cc.tween(this.actionNode).then(t).repeatForever().start();
  };
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.resetRandomList = function () {
    this.randomList = [];
    for (var e = 0; e < this.animNameList.length; e++) {
      this.randomList.push(this.animNameList[e]);
    }
  };
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onCheck = function () {};
  __decorate([_property({
    type: cc.Node,
    displayName: "播放动画节点"
  })], _ctor.prototype, "actionNode", undefined);
  __decorate([_property({
    type: [String],
    displayName: "随机播放动画列表"
  })], _ctor.prototype, "animNameList", undefined);
  __decorate([_property({
    displayName: "动画间隔时间"
  })], _ctor.prototype, "delayTime", undefined);
  __decorate([_property({
    displayName: "触发后的音效"
  })], _ctor.prototype, "triggerSound", undefined);
  return __decorate([_ccclass, _menu("Action/事件/随机播放动画")], _ctor);
}(cc.Component);
exports.RandomPlayAnim = exp_RandomPlayAnim;