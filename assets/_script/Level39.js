var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PerspectiveSceneLogic2 = require("PerspectiveSceneLogic2");
var r_TimeSystem = require("TimeSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_Level39 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.moveBg = null;
    t.moveTogether = null;
    t.bubbleNode = null;
    t.paper = null;
    t.show = true;
    t.paperShow = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    var e = this;
    this.moveTogetherPos = this.moveTogether.getPosition();
    setTimeout(function () {
      r_PerspectiveSceneLogic2.default.ONTOUCHMOVE = e.moveTo.bind(e);
      r_PerspectiveSceneLogic2.default.ONTOUCHEND = e.showBubble.bind(e);
    }, 100);
  };
  _ctor.prototype.moveTo = function (e, t, o) {
    o && (this.moveTogether.x = this.moveTogetherPos.x + this.node.convertToNodeSpaceAR(o).x);
  };
  _ctor.prototype.showBubble = function () {
    var e = this;
    if (this.show && this.paperShow) {
      this.show = false;
      this.bubbleNode.active = true;
      this.bubbleNode.getChildByName("content").getComponent(cc.Label).string = "我和上面的人很像？您肯定是认错了。";
      r_TimeSystem.TimeSystem.scheduleOnce("", 2, function () {
        e.bubbleNode && (e.bubbleNode.active = false);
      });
    }
    this.paper.active && (this.paperShow = true);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "移动背景"
  })], _ctor.prototype, "moveBg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "同时移动节点"
  })], _ctor.prototype, "moveTogether", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "气泡节点"
  })], _ctor.prototype, "bubbleNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "报道"
  })], _ctor.prototype, "paper", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_Level39;