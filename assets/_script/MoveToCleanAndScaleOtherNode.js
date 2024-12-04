var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToCleanAndScaleOtherNode = undefined;
var r_SoundMgr = require("SoundMgr");
var r_MoveToClean = require("MoveToClean");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_MoveToCleanAndScaleOtherNode = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.scaleNode = null;
    t.showSuccessAnim = false;
    t.hideScaleNode = false;
    t.continueSoundName = "";
    t.startScale = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.cleanSuccess = function () {
    var e = this;
    this.cleanCom.cleanCompeleted();
    this.cleanProgress = 1;
    this.scaleNode && (this.scaleNode.scaleX = this.scaleNode.scaleY = this.cleanProgress);
    this.showSuccessAnim;
    this.hideScaleNode && this.scaleNode && cc.tween(this.scaleNode).to(1, {
      opacity: 0
    }).call(function () {
      e.scaleNode.active = false;
    }).start();
  };
  _ctor.prototype.updateCleanProgress = function (e) {
    if (1 != this.cleanProgress && (this.cleanProgress = e, this.scaleNode)) {
      var t = this.startScale + (1 - this.startScale) * this.cleanProgress;
      this.scaleNode.scaleX = this.scaleNode.scaleY = t;
    }
  };
  _ctor.prototype.onDragStart = function (t) {
    this.isGameOver = false;
    this.inCleanPolygon = false;
    e.prototype.onDragStart.call(this, t);
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.playSound(this.continueSoundName, true);
    this.upNode && (this.upNode.active = true);
    this.downNode && (this.downNode.active = false);
  };
  _ctor.prototype.onDragEnd = function (t) {
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.stopSound(this.continueSoundName);
    this.upNode && (this.upNode.active = false);
    this.downNode && (this.downNode.active = true);
    this.isGameOver = false;
    e.prototype.onDragEnd.call(this, t);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "需要缩放的节点"
  })], _ctor.prototype, "scaleNode", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  __decorate([_property({
    displayName: "自动隐藏缩放节点"
  })], _ctor.prototype, "hideScaleNode", undefined);
  __decorate([_property({
    displayName: "抬起持续音效"
  })], _ctor.prototype, "continueSoundName", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "抬起节点"
  })], _ctor.prototype, "upNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放下节点"
  })], _ctor.prototype, "downNode", undefined);
  __decorate([_property({
    type: Number,
    displayName: "开始缩放的值"
  })], _ctor.prototype, "startScale", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动物体去清理并且可以在清理的过程中逐渐放大一张图")], _ctor);
}(r_MoveToClean.MoveToClean);
exports.MoveToCleanAndScaleOtherNode = exp_MoveToCleanAndScaleOtherNode;