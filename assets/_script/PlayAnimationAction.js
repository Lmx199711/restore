var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayAnimationAction = undefined;
var r_SoundMgr = require("SoundMgr");
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var h = function () {
  function e() {
    this.target = null;
    this.isShow = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "显示"
  })], e.prototype, "isShow", undefined);
  return __decorate([_ccclass("ShowNodeInfo3")], e);
}();
var exp_PlayAnimationAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isLoop = false;
    t.animationName = "";
    t.skinName = "";
    t.stopBgm = false;
    t.showNodeList = [];
    t.timeScale = 1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.target || console.log("找不到target=", this.actionId);
    var e = this.target.getComponent(sp.Skeleton);
    if (e) {
      "" != this.skinName && e.setSkin(this.skinName);
      "" != this.animationName && e.setAnimation(0, this.animationName, this.isLoop);
      e.timeScale = 0;
      e.paused = true;
    }
  };
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    this.stopBgm && r_SoundMgr.SoundMgr.stopMusic();
    for (var t = 0; t < this.showNodeList.length; t++) {
      var o = this.showNodeList[t];
      if (o.isShow) {
        o.target.active = true;
      } else {
        o.target.active = false;
      }
    }
    this.target.active || (this.target.active = true);
    var i = this.target.getComponent(sp.Skeleton);
    if (i) {
      "" != this.skinName && i.setSkin(this.skinName);
      "" != this.animationName && i.setAnimation(0, this.animationName, this.isLoop);
      i.timeScale = this.timeScale;
      i.paused = false;
    }
  };
  __decorate([_property({
    displayName: "是否需要循环播放"
  })], _ctor.prototype, "isLoop", undefined);
  __decorate([_property({
    displayName: "播放动画的名字"
  })], _ctor.prototype, "animationName", undefined);
  __decorate([_property({
    displayName: "播放动画的皮肤"
  })], _ctor.prototype, "skinName", undefined);
  __decorate([_property({
    displayName: "停止背景音乐"
  })], _ctor.prototype, "stopBgm", undefined);
  __decorate([_property({
    type: h,
    displayName: "设置节点显示隐藏列表"
  })], _ctor.prototype, "showNodeList", undefined);
  __decorate([_property({
    type: Number,
    displayName: "动画速度"
  })], _ctor.prototype, "timeScale", undefined);
  return __decorate([_ccclass("PlayAnimationAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.PlayAnimationAction = exp_PlayAnimationAction;