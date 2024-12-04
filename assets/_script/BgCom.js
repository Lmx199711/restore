var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BgCom = undefined;
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_RoleGirlSystem = require("RoleGirlSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_MainHomeUI = require("MainHomeUI");
var exp_BgCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.mishus = [];
    t.arrV2 = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    for (var e = 1; e <= 21; e++) {
      var t = this.getChild("mishu" + e).asLoader;
      this.mishus.push(t);
    }
  };
  _ctor.prototype.showSecret = function () {
    var e = this;
    this.arrV2 = [];
    var t = r_PlayerData.PlayerData.data.roleGirlMap.roleList;
    this.mishus.forEach(function (e) {
      e.node && e.node.destroyAllChildren();
    });
    t.forEach(function (t, o) {
      return __awaiter(e, undefined, undefined, function () {
        var e;
        var i;
        var n;
        return __generator(this, function (a) {
          switch (a.label) {
            case 0:
              e = this.mishus[o];
              return [4, this.loadMishu(t.id)];
            case 1:
              if ((i = a.sent()) && e) {
                (n = cc.instantiate(i)).name = "mishu";
                e.node.addChild(n);
                n.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
                this.arrV2.push(cc.v2(e.x, e.y));
                n.scale = .9;
                return [2];
              } else {
                return [2];
              }
          }
        });
      });
    });
  };
  _ctor.prototype.loadMishu = function (e) {
    return new Promise(function (t) {
      r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + e, cc.Prefab, function (e, o) {
        if (e) {
          console.error("加载失败: ", e);
          return void t(null);
        }
        t(o);
      });
    });
  };
  _ctor.prototype.getRoleGirlPos = function () {
    if (!r_MainHomeUI.default.Inst) {
      return null;
    }
    var e = -1;
    0 == r_MainHomeUI.default.Inst.contentPane.getController("bg").selectedIndex && (e = r_UtilsSystem.UtilsSystem.interval2(1, 10, r_RoleGirlSystem.RoleGirlSystem.getBoughtRoleCount()) ? r_UtilsSystem.UtilsSystem.getRandomNum(1, r_RoleGirlSystem.RoleGirlSystem.getBoughtRoleCount()) : r_UtilsSystem.UtilsSystem.getRandomNum(1, 10));
    if (1 == r_MainHomeUI.default.Inst.contentPane.getController("bg").selectedIndex) {
      if (!r_UtilsSystem.UtilsSystem.interval2(11, r_RoleGirlSystem.RoleGirlSystem.roleIdList.length, r_RoleGirlSystem.RoleGirlSystem.getBoughtRoleCount())) {
        return;
      }
      e = r_UtilsSystem.UtilsSystem.getRandomNum(11, r_RoleGirlSystem.RoleGirlSystem.getBoughtRoleCount());
    }
    if (-1 == e) {
      return null;
    } else {
      return cc.v2(this.mishus[e - 1].x, this.mishus[e - 1].y - 250);
    }
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    this.mishus.forEach(function (e) {
      e.node && e.node.destroyAllChildren();
    });
  };
  return _ctor;
}(fgui.GComponent);
exports.BgCom = exp_BgCom;