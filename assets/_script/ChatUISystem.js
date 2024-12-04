Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatUISystem = exports._ChatUISystem = undefined;
var r_ChatTransferUI = require("ChatTransferUI");
var r_SoundMgr = require("SoundMgr");
var r_DebugSystem = require("DebugSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__ChatUISystem = function () {
  function _ctor() {
    this.numList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  }
  _ctor.prototype.initTransfer = function (e, t, o) {
    var c = this;
    var l = 0;
    var u = true;
    var h = t.getChildByName("input");
    var p = t.getChildByName("nums");
    var d = t.getChildByName("buttons");
    var y = t.getChildByName("anim").getComponent(sp.Skeleton);
    var f = false;
    var m = "";
    var g = function (e) {
      r_UtilsSystem.UtilsSystem.shuffle(c.numList);
      var n = 0;
      p.active = true;
      for (var a = 1; a <= 12; a++) {
        var l = p.getChildByName("num" + a);
        if (a == e) {
          l.getChildByName("z").active = true;
          l.getChildByName("num").active = false;
          l.getChildByName("dian").active = false;
        } else {
          var y = c.numList[n];
          if ("." == y) {
            l.getChildByName("z").active = false;
            l.getChildByName("num").active = false;
            l.getChildByName("dian").active = true;
          } else {
            l.getChildByName("z").active = false;
            l.getChildByName("num").active = true;
            l.getChildByName("dian").active = false;
            l.getChildByName("num").getComponent(cc.Label).string = y;
          }
          n += 1;
        }
        var f = d.getChildByName("" + a);
        v(f, a);
      }
      d.active = false;
      u = true;
      r_ChatTransferUI.ChatTransferUI.showUI();
      console.log("result=", m);
      var g = parseFloat(m);
      isNaN(g) && (g = 1e7);
      var C = Math.ceil(g);
      isNaN(C) && (C = 1e7);
      r_TimeSystem.TimeSystem.scheduleOnce("transferChat", 1, function () {
        r_ChatTransferUI.ChatTransferUI.hide();
        o(C, function () {
          t.getChildByName("coin").active = true;
          t.getChildByName("coin").getComponent(cc.Label).string = g + "";
          h.active = false;
        });
      });
    };
    var v = function (e, t) {
      e.off(cc.Node.EventType.TOUCH_START);
      e.on(cc.Node.EventType.TOUCH_START, function () {
        r_SoundMgr.SoundMgr.playSound("click");
        if (!u) {
          var e = r_DebugSystem.DebugSystem.getChatTransferCfg()[l];
          if (e) {
            var o = c.getRandomCfg(e, f);
            if ("0" == o.result) {
              m += "0";
            } else if ("num" == o.result) {
              m += r_UtilsSystem.UtilsSystem.getRandomNum(1, 9);
            } else {
              if ("." != o.result) {
                return void g(t);
              }
              m += ".";
              f = true;
            }
            l += 1;
            c.updateTransferInput(h, l);
            d.active = false;
            y.node.active = true;
            y.setAnimation(0, "animation", false);
            r_TimeSystem.TimeSystem.scheduleOnce("transferChat", 1, function () {
              y.node.active = false;
              d.active = true;
            });
          } else {
            g(t);
          }
        }
      });
    };
    for (var C = 1; C <= 12; C++) {
      var S = d.getChildByName("" + C);
      v(S, C);
    }
    d.opacity = 0;
    cc.tween(d).to(2, {
      opacity: 255
    }).call(function () {
      p.active = false;
      d.active = false;
      y.node.active = true;
      y.setAnimation(0, "animation", false);
      r_TimeSystem.TimeSystem.scheduleOnce("transferChat", 1, function () {
        u = false;
        y.node.active = false;
        d.active = true;
      });
    }).start();
  };
  _ctor.prototype.getRandomCfg = function (e, t) {
    if (!t) {
      return r_UtilsSystem.UtilsSystem.randomPercentFromArray(e);
    }
    var o = null;
    for (var i = 0; i < 100; i++) {
      var n = r_UtilsSystem.UtilsSystem.randomPercentFromArray(e);
      if ("." != n.result) {
        o = n;
        break;
      }
    }
    o || (o = {
      result: "num"
    });
    return o;
  };
  _ctor.prototype.updateTransferInput = function (e, t) {
    var o = e.getChildByName("1");
    var i = e.getChildByName("" + t);
    if (!i) {
      (i = cc.instantiate(o)).parent = o.parent;
      i.active = true;
      i.x = o.x + (t - 1) * o.width;
    }
    i.active = true;
    e.getChildByName("line").x = i.x + o.width / 2 + 10;
  };
  return _ctor;
}();
exports._ChatUISystem = exp__ChatUISystem;
exports.ChatUISystem = new exp__ChatUISystem();