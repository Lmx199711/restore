var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_EndPos321 = undefined;
var r_TimeSystem = require("TimeSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var r_CommonFunc = require("CommonFunc");
var r_ExAB_EndPos = require("ExAB_EndPos");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_Ex_EndPos321 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.parentN = null;
    t.newParent = null;
    t.isMul = false;
    t.triggerWhenNoHit = "";
    t.removeDelay = 0;
    t.doNodes = [];
    t._worldPos = new cc.Vec2(0, 0);
    t.isBlock = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.initCom = function () {
    this.doNodes = this.parentN.children;
  };
  _ctor.prototype.checkEndPos = function (e) {
    var t = this;
    if (!this.isBlock) {
      var o = "";
      var i = function (i) {
        if (n.doNodes[i] && r_CommonFunc.checkTouchNode(e, n.doNodes[i])) {
          o = n.doNodes[i].name;
          r_BehaviorMgr.BehaviorMgr.trigger(o);
          if (n.removeDelay > 0) {
            n.isBlock = true;
            r_TimeSystem.TimeSystem.scheduleOnce("EndPos321", n.removeDelay, function () {
              t.isBlock = false;
              if (t.doNodes[i] && t.doNodes[i].name == o) {
                t._worldPos = t.doNodes[i].convertToWorldSpaceAR(cc.Vec2.ZERO);
                var e = t.doNodes[i];
                t.doNodes[i].parent = t.newParent;
                t.newParent.convertToNodeSpaceAR(t._worldPos, t._worldPos);
                e.x = t._worldPos.x;
                e.y = t._worldPos.y;
              }
            });
          } else if (n.doNodes[i] && n.doNodes[i].name == o) {
            n._worldPos = n.doNodes[i].convertToWorldSpaceAR(cc.Vec2.ZERO);
            var a = n.doNodes[i];
            n.doNodes[i].parent = n.newParent;
            n.newParent.convertToNodeSpaceAR(n._worldPos, n._worldPos);
            a.x = n._worldPos.x;
            a.y = n._worldPos.y;
          }
          if (!n.isMul) {
            return "break";
          }
        }
      };
      var n = this;
      for (var a = this.doNodes.length - 1; a >= 0 && "break" !== i(a); a--) {
        ;
      }
      !o && this.triggerWhenNoHit && r_BehaviorMgr.BehaviorMgr.trigger(this.triggerWhenNoHit);
    }
  };
  _ctor.prototype.onDestroy = function () {
    r_TimeSystem.TimeSystem.scheduleClear("EndPos321");
  };
  __decorate([_property({
    displayName: "检查位置(使用父节点)",
    type: cc.Node
  })], _ctor.prototype, "parentN", undefined);
  __decorate([_property({
    displayName: "新的父节点",
    type: cc.Node
  })], _ctor.prototype, "newParent", undefined);
  __decorate([_property({
    displayName: "可穿透多节点"
  })], _ctor.prototype, "isMul", undefined);
  __decorate([_property({
    displayName: "检查失败触发"
  })], _ctor.prototype, "triggerWhenNoHit", undefined);
  __decorate([_property({
    displayName: "延迟移除子节点",
    tooltip: "因为有时候在移除前某些行为会通过父节点找子节点,防止移除太快导致找不成功",
    range: [0, 10, .1]
  })], _ctor.prototype, "removeDelay", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/点击成功/N合1,名即行为")], _ctor);
}(r_ExAB_EndPos.ExAB_EndPos);
exports.Ex_EndPos321 = exp_Ex_EndPos321;