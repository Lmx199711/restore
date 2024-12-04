Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimSystem = exports._AnimSystem = undefined;
var r_MainHomeUI = require("MainHomeUI");
var r_MainAuditUI = require("MainAuditUI");
var r_PoolSystem = require("PoolSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TimeSystem = require("TimeSystem");
var exp__AnimSystem = function () {
  function _ctor() {
    this.coinList = [];
  }
  _ctor.prototype.init = function () {};
  _ctor.prototype.playCoinAnim = function (e) {
    undefined === e && (e = null);
    var t = function () {
      var t = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.CoinImg);
      var o = fgui.GRoot.inst.width / 2;
      var r = -fgui.GRoot.inst.height / 2;
      if (e) {
        var c = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var l = t.node.parent.convertToNodeSpaceAR(c);
        o = l.x;
        r = l.y;
      }
      t.node.x = o + r_UtilsSystem.UtilsSystem.getRandomNum(-100, 100);
      t.node.y = r + r_UtilsSystem.UtilsSystem.getRandomNum(-100, 100);
      var u = (r_MainHomeUI.default.coinCom ? r_MainHomeUI.default : r_MainAuditUI.default).coinCom.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var h = t.node.parent.convertToNodeSpaceAR(u);
      cc.tween(t.node).to(.8, {
        x: h.x,
        y: h.y
      }).call(function () {
        r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.CoinImg, t);
      }).start();
    };
    for (var o = 1; o <= 10; o++) {
      t();
    }
  };
  _ctor.prototype.playCoinAnim2 = function (e) {
    var t = function () {
      var t = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.MianCoinImg);
      var o = fgui.GRoot.inst.width / 2;
      var c = -fgui.GRoot.inst.height / 2;
      if (e) {
        var l = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var u = t.node.parent.convertToNodeSpaceAR(l);
        o = u.x;
        c = u.y;
      }
      t.node.x = o;
      t.node.y = c;
      cc.tween(t.node).to(.3, {
        x: o + r_UtilsSystem.UtilsSystem.getRandomNum(-100, 100),
        y: c + r_UtilsSystem.UtilsSystem.getRandomNum(-100, 100)
      }).call(function () {
        var e = (r_MainHomeUI.default.coinCom ? r_MainHomeUI.default : r_MainAuditUI.default).coinCom.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var o = t.node.parent.convertToNodeSpaceAR(e);
        cc.tween(t.node).to(.8, {
          x: o.x,
          y: o.y
        }).call(function () {}).start();
      }).start();
      r_TimeSystem.TimeSystem.timeUpdate(1.2, function (e) {
        e < 1 || r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.MianCoinImg, t);
      });
    };
    for (var o = 1; o <= 10; o++) {
      t();
    }
  };
  return _ctor;
}();
exports._AnimSystem = exp__AnimSystem;
exports.AnimSystem = new exp__AnimSystem();