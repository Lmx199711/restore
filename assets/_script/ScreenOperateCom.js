var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UtilsSystem = require("UtilsSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_ScreenOperateCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodeList = [];
    t.showArea = null;
    t.touchNode = null;
    t.curIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.registTouch();
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    if (!this.touchNode) {
      this.touchNode = new cc.Node();
      this.touchNode.width = 1668;
      this.touchNode.height = 1002;
      this.node.addChild(this.touchNode);
    }
    var t = null;
    var o = null;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (i) {
      e.bgOriginPos = null;
      t = i.getLocation();
      o = null;
      if (r_UtilsSystem.UtilsSystem.touchInNode(e.showArea, t)) {
        for (var n = 0; n < e.nodeList.length; n++) {
          var a = e.nodeList[n];
          if (a.activeInHierarchy) {
            e.bgOriginPos = a.getPosition();
            o = a;
          }
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (i) {
      if (o) {
        var n = i.getLocation();
        var a = e.bgOriginPos.add(n.subtract(t));
        var s = (o.width * o.scale - e.showArea.width) / 2;
        s = Math.max(0, s);
        var r = (o.height * o.scale - e.showArea.height) / 2;
        r = Math.max(0, r);
        a.x < -s && (a.x = -s);
        a.x > s && (a.x = s);
        a.y < -r && (a.y = -r);
        a.y > r && (a.y = r);
        o.setPosition(a);
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function () {});
  };
  __decorate([_property({
    type: [cc.Node],
    displayName: "操作节点列表"
  })], _ctor.prototype, "nodeList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "显示区域"
  })], _ctor.prototype, "showArea", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ScreenOperateCom;