var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrushState = undefined;
var s;
var r_GameSelfSystem = require("GameSelfSystem");
var r_ResSystem = require("ResSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e.InList = 1] = "InList";
  e[e.InBottom = 2] = "InBottom";
  e[e.Reset = 3] = "Reset";
  e[e.Removed = 4] = "Removed";
})(s = exports.CrushState || (exports.CrushState = {}));
var def_CrushComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.crushId = 0;
    t.overCrushList = [];
    t.maskNode = null;
    t.index = 0;
    t.bottomIndex = 0;
    t.isRemove = false;
    t.startX = 0;
    t.startY = 0;
    t.curState = s.InList;
    t.resetIndex = -1;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {
    this.maskNode = this.node.getChildByName("mask");
  };
  _ctor.prototype.start = function () {
    var e = this;
    this.curState = s.InList;
    this.startX = this.node.x;
    this.startY = this.node.y;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "sheep/sheep" + r_GameSelfSystem.GameSelfSystem.lastLevelId, cc.SpriteAtlas, function (t, o) {
      e.node.getComponent(cc.Sprite).spriteFrame = o.getSpriteFrame(r_GameSelfSystem.GameSelfSystem.lastLevelId + "_1");
      var i = e.node.getChildByName("mask");
      i.zIndex = 2;
      i.opacity = 102;
      i.color = cc.Color.WHITE;
      i.getComponent(cc.Sprite).spriteFrame = o.getSpriteFrame(r_GameSelfSystem.GameSelfSystem.lastLevelId + "_2");
    });
  };
  _ctor.prototype.init = function (e) {
    var t = this;
    this.crushId = e;
    var o = this.node._children;
    for (var i = 0; i < o.length; i++) {
      var n = o[i];
      "mask" != n.name && n.destroy();
    }
    r_ResSystem.ResSystem.loadBundleRes("resources1", "sheep/sheep" + r_GameSelfSystem.GameSelfSystem.lastLevelId, cc.SpriteAtlas, function (o, i) {
      t.createSpriteNode(t.node, i.getSpriteFrame(r_GameSelfSystem.GameSelfSystem.lastLevelId + "_1_" + e)).y = 5;
    });
  };
  _ctor.prototype.createSpriteNode = function (e, t) {
    var o = new cc.Node();
    o.addComponent(cc.Sprite).spriteFrame = t;
    e.addChild(o);
    return o;
  };
  __decorate([_property({
    type: cc.Integer,
    tooltip: "不同物品的对应ID"
  })], _ctor.prototype, "crushId", undefined);
  __decorate([_property({
    type: [_ref__ctor],
    tooltip: "覆盖在其上一层的物品ID列表"
  })], _ctor.prototype, "overCrushList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CrushComponent;