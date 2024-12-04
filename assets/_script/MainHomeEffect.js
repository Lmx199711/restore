Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MianHomeEffect = undefined;
var r_PoolSystem = require("PoolSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var s = function () {
  function e() {
    this.animIndex = 1;
  }
  e.prototype.init = function (e) {
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.ExpTipCom, "ui://MainHome/ExpTipCom", 1, e);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.DiamondTipCom, "ui://MainHome/DiamondTipCom", 1, e);
  };
  e.prototype.addPool = function (e) {
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.ExpTipCom2, "ui://MainHome/ExpTipCom", 1, e);
  };
  e.prototype.playAddExpAnim = function (e, t) {
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.ExpTipCom);
    o.x = t.x + r_UtilsSystem.UtilsSystem.getRandomNum(-100, 100);
    o.y = t.y + r_UtilsSystem.UtilsSystem.getRandomNum(-100, 100);
    var s = o.y;
    o.getChild("lab").text = e;
    o.alpha = 1;
    o.scaleX = o.scaleY = 1;
    o.node.scale = 1;
    cc.tween(o).to(.1, {
      scaleY: .7
    }).to(.1, {
      scaleY: 1
    }).to(1, {
      y: s - 150,
      alpha: 0
    }).start();
    r_TimeSystem.TimeSystem.timeUpdate(1.2, function (e) {
      e < 1 || r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.ExpTipCom, o);
    });
  };
  e.prototype.playAddExpAnim2 = function (e, t) {
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.ExpTipCom2);
    o.x = t.x + r_UtilsSystem.UtilsSystem.getRandomNum(-100, 100);
    o.y = t.y + r_UtilsSystem.UtilsSystem.getRandomNum(-100, 100);
    o.scaleX = o.scaleY = 1;
    o.node.scale = 1;
    var s = o.y;
    o.getChild("lab").text = e;
    o.alpha = 1;
    cc.tween(o).to(.1, {
      scaleY: .7
    }).to(.1, {
      scaleY: 1
    }).to(1, {
      y: s - 150,
      alpha: 0
    }).start();
    r_TimeSystem.TimeSystem.timeUpdate(1.2, function (e) {
      e < 1 || r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.ExpTipCom2, o);
    });
  };
  e.prototype.playAddExpAnimByNode = function (e, t) {
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.ExpTipCom);
    var a = t;
    var s = o.node.parent.convertToNodeSpaceAR(a);
    var r = s.x;
    var c = s.y;
    o.node.x = r;
    o.node.y = c + 200;
    o.node.scaleX = o.node.scaleY = .6;
    var l = o.node.y;
    o.getChild("lab").text = e;
    o.alpha = 1;
    cc.tween(o.node).to(1, {
      y: l + 100
    }).start();
    r_TimeSystem.TimeSystem.timeUpdate(1.1, function (e) {
      e < 1 || r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.ExpTipCom, o);
    });
  };
  e.prototype.playAutoAddExpAnim = function (e, t) {
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.ExpTipCom);
    o.x = t.x;
    o.y = t.y - 150;
    o.scaleX = o.scaleY = 1;
    o.node.scale = 1;
    var a = o.y;
    o.getChild("lab").text = e;
    o.alpha = 1;
    cc.tween(o).to(1, {
      y: a - 150,
      alpha: 0
    }).start();
    r_TimeSystem.TimeSystem.timeUpdate(1.1, function (e) {
      e < 1 || r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.ExpTipCom, o);
    });
  };
  e.prototype.playAutoAddExpAnim2 = function (e, t) {
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.ExpTipCom2);
    o.x = t.x;
    o.y = t.y - 150;
    o.scaleX = o.scaleY = 1;
    o.node.scale = 1;
    var a = o.y;
    o.getChild("lab").text = e;
    o.alpha = 1;
    cc.tween(o).to(1, {
      y: a - 150,
      alpha: 0
    }).start();
    r_TimeSystem.TimeSystem.timeUpdate(1.1, function (e) {
      e < 1 || r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.ExpTipCom2, o);
    });
  };
  e.prototype.playAddDiamond = function (e, t, o) {
    var a = this;
    var s = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.DiamondTipCom);
    s.node.x = t[0].x;
    s.node.y = t[0].y;
    s.scaleX = s.scaleY = .8;
    s.getChild("lab").text = e;
    cc.tween(s.node).to(.3, {
      x: t[1].x,
      y: t[1].y
    }).bezierTo(.5, t[1], t[2], t[3]).start();
    r_TimeSystem.TimeSystem.timeUpdate(.9, function (t) {
      if (!(t < 1)) {
        r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.DiamondTipCom, s);
        var n = cc.v2(o.x, o.y);
        a.playDiamondAnim("+" + e, n);
      }
    });
  };
  e.prototype.playDiamondAnim = function (e, t) {
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.ExpTipCom);
    o.x = t.x;
    o.y = t.y;
    var a = o.y - 10;
    o.getChild("lab").text = e;
    o.alpha = 1;
    cc.tween(o).to(1, {
      y: a - 30,
      alpha: 0
    }).start();
    r_TimeSystem.TimeSystem.timeUpdate(1.1, function (e) {
      e < 1 || r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.ExpTipCom, o);
    });
  };
  e.prototype.playAddCoinAnim = function (e, t) {
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.addCoinCom);
    o.x = t.x;
    o.y = t.y;
    var a = o.y - 10;
    o.getChild("lab").text = e;
    o.alpha = 1;
    cc.tween(o).to(1, {
      y: a - 30,
      alpha: 0
    }).start();
    r_TimeSystem.TimeSystem.timeUpdate(1.1, function (e) {
      e < 1 || r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.addCoinCom, o);
    });
  };
  return e;
}();
exports.MianHomeEffect = new s();