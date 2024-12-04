Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatchDogLogic = undefined;
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_TimeSystem = require("TimeSystem");
var r_CatchDogCom = require("CatchDogCom");
var r_CatchDogResultUI = require("CatchDogResultUI");
var r_CatchDogUI = require("CatchDogUI");
var r_DogNetCom = require("DogNetCom");
var l = function () {
  function e() {
    this.dogList = [];
    this.m_curDog = null;
  }
  e.prototype.init = function () {
    r_TYEventDispatcher.TYEventDispatcher.on(r_DogNetCom.CatchDogEvent.CATCH, this.onCatch, this);
  };
  e.prototype.start = function (e, t, o) {
    this.dogList = e;
    this.dogList.forEach(function (e) {
      e.node.y = 150.007;
    });
    this.dogNet = t;
    this.dogNet.node.x = 0;
    this.dogNet.node.y = -645.09;
    this.owen = o;
  };
  e.prototype.onCatch = function (e) {
    var t = e.data;
    var o = function () {
      var e = i.dogList[c];
      if (e.getIsCatch(t.cathPos)) {
        if (e.data.isCatch) {
          if (--e.blood <= 0) {
            i.cahthSucc(t, e);
          } else if (3 == e.data.id) {
            r_CatchDogUI.default.instance.deleteCatchNum();
            r_CatchDogUI.default.instance.catachNum <= 0 && r_TimeSystem.TimeSystem.scheduleOnce("yanchidiaoyong0", 3, function () {
              r_CatchDogResultUI.default.showUI(1);
            });
            r_TimeSystem.TimeSystem.scheduleOnce("lose231", 3, function () {
              r_CatchDogUI.default.instance.isTouch = true;
            });
            e.getCaught();
            t.succCall && t.succCall();
            r_TimeSystem.TimeSystem.scheduleOnce("fangpi", 1.5, function () {
              r_CatchDogCom.default.instance.playCouqi(function () {
                e.taunt();
                t.failCall && t.failCall();
              });
              e.getCaught2();
            });
          } else if (7 == e.data.id) {
            r_CatchDogUI.default.instance.deleteCatchNum();
            r_CatchDogUI.default.instance.catachNum <= 0 && r_TimeSystem.TimeSystem.scheduleOnce("yanchidiaoyong0", 3, function () {
              r_CatchDogResultUI.default.showUI(1);
            });
            r_TimeSystem.TimeSystem.scheduleOnce("lose231", 3, function () {
              r_CatchDogUI.default.instance.isTouch = true;
            });
            i.bossStruggle(t, e);
          }
          return {
            value: undefined
          };
        } else {
          i.lose(t);
          r_CatchDogCom.default.instance.isMove = true;
          r_CatchDogResultUI.default.showUI(3);
          return {
            value: undefined
          };
        }
      }
    };
    var i = this;
    for (var c = 0; c < this.dogList.length; c++) {
      var l = o();
      if ("object" == typeof l) {
        return l.value;
      }
    }
    this.dogList.forEach(function (e) {
      e.taunt();
    });
    this.lose(t);
  };
  e.prototype.bossStruggle = function (e, t) {
    var i = this;
    var a = e;
    r_CatchDogUI.default.instance.crazeTouch(true);
    a.succCall && a.succCall();
    this.m_curDog = t;
    this.m_curDog.getCaught();
    cc.Tween.stopAllByTarget(exports.CatchDogLogic);
    cc.tween(exports.CatchDogLogic).to(.8, {
      tweenRecycle: -780
    }).to(.8, {
      tweenRecycle: -645
    }).call(function () {
      t.getCaught2();
      i.m_curDog = null;
      r_CatchDogUI.default.instance.crazeTouch(false);
      r_TimeSystem.TimeSystem.scheduleOnce("bossStruggle", 1, function () {
        t.taunt();
        a.failCall && a.failCall();
      });
    }).start();
  };
  e.prototype.lose = function (e) {
    r_CatchDogUI.default.instance.deleteCatchNum();
    r_CatchDogUI.default.instance.catachNum <= 0 && r_TimeSystem.TimeSystem.scheduleOnce("yanchidiaoyong0", 2, function () {
      r_CatchDogResultUI.default.showUI(1);
    });
    r_CatchDogUI.default.instance.isTouch = true;
    e.failCall && e.failCall();
  };
  e.prototype.cahthSucc = function (e, t) {
    var i = this;
    var s = e;
    this.m_curDog = t;
    this.m_curDog.getCaught();
    s.succCall && s.succCall();
    cc.Tween.stopAllByTarget(exports.CatchDogLogic);
    cc.tween(exports.CatchDogLogic).to(3, {
      tweenRecycle: -990
    }).call(function () {
      i.dogNet.rowei();
      i.m_curDog.rowei();
      cc.Tween.stopAllByTarget(i.owen);
      if (7 != t.data.id) {
        i.owen.active = true;
        i.owen.opacity = 0;
        cc.tween(i.owen).delay(.5).to(.5, {
          opacity: 255
        }).delay(2).call(function () {
          cc.Tween.stopAllByTarget(i.m_curDog.node);
          cc.tween(i.m_curDog.node).delay(.2).to(.5, {
            opacity: 0
          }).start();
        }).to(.5, {
          opacity: 0
        }).call(function () {
          r_CatchDogCom.default.instance.getAward();
          var e = i.dogList.findIndex(function (e) {
            return e == i.m_curDog;
          });
          if (e > -1) {
            i.dogList[e].node.destroy();
            i.dogList.splice(e, 1);
          }
          r_CatchDogCom.default.instance.deleteDog(i.m_curDog);
          i.m_curDog = null;
          r_CatchDogCom.default.instance.chcekResult() && r_CatchDogCom.default.instance.roundOver();
        }).start();
      } else {
        r_TimeSystem.TimeSystem.scheduleOnce("cahthSucc7", 2, function () {
          var e = i.dogList.findIndex(function (e) {
            return e == i.m_curDog;
          });
          if (e > -1) {
            i.dogList[e].node.destroy();
            i.dogList.splice(e, 1);
          }
          r_CatchDogCom.default.instance.deleteDog(i.m_curDog);
          i.m_curDog = null;
          r_CatchDogCom.default.instance.chcekResult() && r_CatchDogCom.default.instance.roundOver();
        });
      }
    }).start();
  };
  Object.defineProperty(e.prototype, "tweenRecycle", {
    get: function () {
      return this.dogNet.node.y;
    },
    set: function (e) {
      this.dogNet.node.y = e;
      var t = this.m_curDog.getMountPoint();
      var o = this.dogNet.getMountPoint().subSelf(t);
      this.m_curDog.node.x += o.x;
      this.m_curDog.node.y += o.y;
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.clearScene = function () {
    r_TimeSystem.TimeSystem.scheduleClear("yanchidiaoyong0");
    r_TimeSystem.TimeSystem.scheduleClear("bossStruggle");
    r_TimeSystem.TimeSystem.scheduleClear("lose231");
    r_TimeSystem.TimeSystem.scheduleClear("fangpi");
    cc.Tween.stopAllByTarget(exports.CatchDogLogic);
    this.m_curDog && this.m_curDog.node && cc.Tween.stopAllByTarget(this.m_curDog.node);
    this.m_curDog = null;
    this.dogList.forEach(function (e) {
      e.node.destroy();
    });
    this.dogList = [];
    this.dogNet = null;
    this.owen && cc.Tween.stopAllByTarget(this.owen);
    this.owen = null;
  };
  return e;
}();
exports.CatchDogLogic = new l();