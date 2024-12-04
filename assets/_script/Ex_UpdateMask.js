var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_UpdateMask = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_FindReplaceDiff = require("FindReplaceDiff");
var r_DataUtil = require("DataUtil");
var r_ExAB_Update = require("ExAB_Update");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_Ex_UpdateMask = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "子物体获得放大镜功能";
    t.centerNode = null;
    t.findNodeList = [];
    t.maskListDyn = [];
    t.keyArr = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.initCom = function () {
    var e;
    var t = this;
    this.glassSon || (this.glassSon = this.node.children[0]);
    null === (e = this.findNodeList) || undefined === e || e.forEach(function (e) {
      e.fakeNode.children.forEach(function (o) {
        if (o.getComponent(cc.Mask)) {
          t.maskListDyn.push(o.getComponent(cc.Mask));
          t.keyArr.push(e.triggerId);
        }
      });
    });
    this.moveUpdate();
  };
  _ctor.prototype.moveUpdate = function () {
    var e = this.glassSon.getComponent(cc.PolygonCollider);
    for (var t = 0; t < this.maskListDyn.length; t++) {
      var o = this.maskListDyn[t];
      if (o) {
        var i = o._graphics;
        i.lineWidth = 1;
        i.strokeColor = cc.color(255, 0, 0);
        i.fillColor = cc.color(0, 255, 0);
        i.clear();
        if (r_DataUtil.DataUtil.hitNode((this.centerNode || this.glassSon).convertToWorldSpaceAR(cc.v2(0, 0)), o.node.parent)) {
          this.keyArr[t] && !r_GameKeyMgr.GameKeyMgr.has(this.keyArr[t]) && r_GameKeyMgr.GameKeyMgr.add(this.keyArr[t]);
          var n = null;
          for (var a = 0; a < e.points.length; a++) {
            var r = e.points[a];
            var l = this.glassSon.convertToWorldSpaceAR(r);
            var u = o.node.convertToNodeSpaceAR(l);
            if (0 != a) {
              i.lineTo(u.x, u.y);
              if (!(a != e.points.length - 1)) {
                i.close();
                i.stroke();
                i.fill();
              }
            } else {
              n = u;
              i.moveTo(n.x, n.y);
            }
          }
        } else {
          this.keyArr[t] && r_GameKeyMgr.GameKeyMgr.has(this.keyArr[t]) && r_GameKeyMgr.GameKeyMgr.remove(this.keyArr[t]);
        }
      }
    }
  };
  __decorate([_property({
    displayName: "附加效果",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property({
    displayName: "瞄准点",
    type: cc.Node,
    tooltip: "该点会进入目标节点时，启动msk效果"
  })], _ctor.prototype, "centerNode", undefined);
  __decorate([_property({
    displayName: "隐藏着节点",
    type: r_FindReplaceDiff.FindNodeClass
  })], _ctor.prototype, "findNodeList", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/子物体/放大镜")], _ctor);
}(r_ExAB_Update.ExAB_Update);
exports.Ex_UpdateMask = exp_Ex_UpdateMask;