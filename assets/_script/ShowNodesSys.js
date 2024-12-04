Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowNodesSys = undefined;
var r_BehaviorMgr = require("BehaviorMgr");
var r_ShowNodesCom = require("ShowNodesCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_BehaviorDef = require("BehaviorDef");
var exp_ShowNodesSys = function () {
  function _ctor() {
    this.curNode = 0;
  }
  _ctor.prototype.trigger = function (e) {
    var t = this;
    var o = r_BehaviorDef.HandleData(e);
    var i = o[0];
    var a = o[1];
    switch (i) {
      case r_BehaviorDef.ARGS.childAdd:
        var s = function (e) {
          var t = c.entity.nodes[e];
          if (null != t.target.getChildByName(a[0])) {
            if (t.delay > 0) {
              r_BehaviorMgr.BehaviorMgr.timeout(t.delay, function () {
                t.target && (t.target.getChildByName(a[0]).active = t.isShow);
              });
            } else {
              t.target && (t.target.getChildByName(a[0]).active = t.isShow);
            }
          } else {
            cc.log("-childAdd失败，检查是否被移除了??");
          }
        };
        var c = this;
        for (var l = 0; l < this.entity.nodes.length; l++) {
          s(l);
        }
        break;
      case r_BehaviorDef.ARGS.childSelf:
        for (l = 0; l < this.entity.nodes.length; l++) {
          var u = this.entity.nodes[l];
          if (null != u.target.getChildByName(a[0])) {
            for (var h = 0; h < u.target.childrenCount; h++) {
              if (u.target.children[h].name == a[0]) {
                u.target.children[h].active = true;
              } else {
                u.target.children[h].active = false;
              }
            }
          } else {
            cc.log("-childSelf失败，检查是否被移除了??");
          }
        }
        break;
      case r_BehaviorDef.ARGS.childPP:
        var p = function (e) {
          var o = d.entity.nodes[e];
          if (d.curNode >= o.target.children.length) {
            return "break";
          }
          if (o.delay > 0) {
            r_BehaviorMgr.BehaviorMgr.timeout(o.delay, function () {
              o.target && (o.target.children[t.curNode].active = o.isShow);
            });
          } else {
            o.target && (o.target.children[d.curNode].active = o.isShow);
          }
        };
        var d = this;
        for (l = 0; l < this.entity.nodes.length && "break" !== p(l); l++) {
          ;
        }
        this.curNode++;
        break;
      default:
        this.entity.nodes.forEach(function (t) {
          if (t.target) {
            var o = t.isShow;
            if (e && !isNaN(parseInt(e))) {
              var i = parseInt(e);
              o = i > 0;
            }
            if (t.delay > 0) {
              r_BehaviorMgr.BehaviorMgr.timeout(t.delay, function () {
                t.target && (t.target.active = o);
              });
            } else {
              t.target && (t.target.active = o);
            }
          }
        });
    }
  };
  _ctor.prototype.onStart = function () {
    this.entity.nodes.forEach(function (e) {
      e.target && (e.target.active = e.originIsShow);
    });
  };
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_ShowNodesCom.ShowNodesCom)], _ctor);
}();
exports.ShowNodesSys = exp_ShowNodesSys;