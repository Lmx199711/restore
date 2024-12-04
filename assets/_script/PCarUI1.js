var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PCarUI1 = undefined;
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_PCarUI2 = require("PCarUI2");
var exp_PCarUI1 = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.PhoneCar, r_UIDef.UIDef.Res.UI.PCarUI1) || this;
    t.showAnimFlag = true;
    t.uiType = "fullScreen";
    t.flag = "none";
    t.info = null;
    t.canClick = false;
    t.canChoose = false;
    t.opening = false;
    t.goodRepair = false;
    t.repairIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PCarUI1, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PCarUI1);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.cclose, this);
    this.state = this.contentPane.getController("state");
    this.toolClear = this.contentPane.getController("toolClear");
    this.gold = this.contentPane.getTransition("gold");
    this.btn1.onClick(this.choose.bind(this, 1));
    this.btn2.onClick(this.choose.bind(this, 2));
  };
  _ctor.prototype.cclose = function () {
    if ("canBack" != this.flag) {
      r_UtilsSystem.UtilsSystem.showTip("动画播放中");
    } else {
      this.hide();
    }
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.flag = "anim";
    this.state.selectedIndex = 0;
    this.opening = false;
    this.btn1.scaleX = 0;
    this.btn1.scaleY = 0;
    this.btn2.scaleY = 0;
    this.btn2.scaleX = 0;
    this.canChoose = false;
    this.canClick = false;
    this.repairIndex = 0;
    this.comCheck.getChild("n3").scaleX = 0;
    this.comCheck.getChild("n4").visible = false;
    this.comCheck.getChild("n3").scaleY = 0;
    this.info = this.data.info;
    var o = this.info.case ? "_hao" : "_po";
    this.iconCar.url = "ui://PhoneCar/" + this.info.name + o;
    this.spineScan.animationName = this.info.scan;
    this.btn1.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.info.repair1, 2, false);
    this.btn2.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.info.repair2, 2, false);
    this.toolClear.selectedIndex = 0;
    this.contentPane.getTransition("t1").play();
    cc.tween(this.clickArea.node).delay(.2).call(function () {
      r_SoundMgr.SoundMgr.playSound("phoneCar/drop");
    }).delay(.8).call(function () {
      r_SoundMgr.SoundMgr.playSound("phoneCar/wash");
    }).delay(2).call(function () {
      r_SoundMgr.SoundMgr.playSound("升级成功音效");
    }).delay(1.5).call(function () {
      r_SoundMgr.SoundMgr.playSound("phoneCar/scan");
    }).start();
    cc.tween(this.iconCar.node).delay(1.5).call(function () {
      t.iconCar.url = "ui://PhoneCar/" + t.info.name + "_hao";
    }).delay(5).call(function () {
      t.canClick = true;
      t.clickCar();
    }).start();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("gotoGGold");
    r_TimeSystem.TimeSystem.scheduleClear("changeTOPaimai");
    r_TimeSystem.TimeSystem.scheduleClear("gotoAution");
    r_TimeSystem.TimeSystem.scheduleClear("showTanlanB");
    r_TimeSystem.TimeSystem.scheduleClear("gotoUI22");
    r_TimeSystem.TimeSystem.scheduleClear("TimeTohidePrice");
    cc.Tween.stopAllByTarget(this.clickArea.node);
    cc.Tween.stopAllByTarget(this.iconCar.node);
    cc.Tween.stopAllByTarget(this.iconCar);
    cc.Tween.stopAllByTarget(this.spineFire);
    cc.Tween.stopAllByTarget(this.iconFly);
    cc.Tween.stopAllByTarget(this.contentPane.getChild("comShout1"));
    cc.Tween.stopAllByTarget(this.contentPane.getChild("comShout2"));
    cc.Tween.stopAllByTarget(this.contentPane.getChild("comShout3"));
  };
  _ctor.prototype.clickCar = function () {
    var e = this;
    if (this.canClick) {
      this.canClick = false;
      if (this.opening) {
        this.opening = false;
        this.spineFire.visible = false;
        this.iconCar.url = "ui://PhoneCar/" + this.info.name + "_hao";
        this.canClick = false;
        this.toolClear.selectedIndex = 1;
        r_TimeSystem.TimeSystem.scheduleOnce("gotoGGold", .5, function () {
          e.showGold();
        });
      } else {
        this.opening = true;
        cc.tween(this.iconCar).to(.1, {
          scaleX: .85,
          scaleY: .75
        }, {
          easing: "backOut"
        }).to(.1, {
          scaleX: .8,
          scaleY: .8
        }, {
          easing: "backOut"
        }).call(function () {
          e.spineFire.visible = true;
          e.spineFire.scaleX = 1;
          e.spineFire.scaleY = 1;
          cc.tween(e.spineFire).delay(.5).to(1, {
            scaleX: 0,
            scaleY: 0
          }, {
            easing: "sineIn"
          }).call(function () {
            e.canChoose = true;
            e.flag = "canBack";
          }).start();
        }).start();
        this.iconCar.url = "ui://PhoneCar/" + this.info.name + "_kai";
      }
    }
  };
  _ctor.prototype.showGold = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleOnce("changeTOPaimai", .5, function () {
      e.state.selectedIndex = 2;
    });
    this.gold.play();
    r_SoundMgr.SoundMgr.playSound("saveAnimals/胜利");
    r_TimeSystem.TimeSystem.scheduleOnce("gotoAution", 1.5, function () {
      e.biginShout();
    });
  };
  _ctor.prototype.choose = function (e) {
    var t = this;
    if (this.canChoose) {
      this.canChoose = false;
      this.flag = "anim";
      this.iconFly.x = this.contentPane.getChild("btn" + e).x;
      this.iconFly.y = this.contentPane.getChild("btn" + e).y;
      this.iconFly.alpha = 1;
      this.iconFly.visible = true;
      cc.tween(this.iconFly).to(.2, {
        x: this.clickArea.x,
        y: this.clickArea.y - 100
      }).delay(.1).call(function () {
        t.shakeCar();
        t.comCheck.getTransition("checking").playReverse();
      }).to(.1, {
        y: this.clickArea.y,
        alpha: 0
      }).call(function () {
        t.iconFly.visible = false;
        t.iconFly.alpha = 1;
      }).start();
      this.repairIndex = e;
      if (this.info["repair" + e] > this.info.baseRepair) {
        this.goodRepair = true;
      } else {
        this.goodRepair = false;
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("播放动画中，请稍等");
    }
  };
  _ctor.prototype.shakeCar = function () {
    var e = this;
    cc.tween(this.iconCar).to(.1, {
      scaleX: .9,
      scaleY: .75
    }, {
      easing: "backOut"
    }).to(.1, {
      scaleX: .8,
      scaleY: .8
    }, {
      easing: "backOut"
    }).call(function () {
      e.canClick = true;
      e.clickCar();
    }).start();
  };
  _ctor.prototype.biginShout = function () {
    var e = this;
    var t = this.info["sell" + this.data.chooseSellIndex];
    this.contentPane.getChild("txtPrice1").text = r_UtilsSystem.UtilsSystem.getShowCoin(t, 2, false);
    this.contentPane.getChild("txtPrice2").text = r_UtilsSystem.UtilsSystem.getShowCoin(t, 2, false);
    this.contentPane.getTransition("price").play(function () {
      return __awaiter(e, undefined, undefined, function () {
        var e;
        var o;
        var i;
        return __generator(this, function (n) {
          switch (n.label) {
            case 0:
              e = 0;
              n.label = 1;
            case 1:
              if (e < 3) {
                o = this.info.shout[e];
                i = this.info.shout[e - 1] || t;
                return [4, this.showShoutBub(i, o, e)];
              } else {
                return [3, 4];
              }
            case 2:
              n.sent();
              n.label = 3;
            case 3:
              e++;
              return [3, 1];
            case 4:
              return [2];
          }
        });
      });
    });
    r_TimeSystem.TimeSystem.scheduleOnce("showTanlanB", .8, function () {
      e.spineMe.animationName = "kaixin";
    });
    r_TimeSystem.TimeSystem.scheduleOnce("gotoUI22", 4.9, function () {
      r_PCarUI2.PCarUI2.showUI({
        info: e.info,
        sellIndex: e.data.chooseSellIndex,
        repairIndex: e.repairIndex,
        goodRepair: e.goodRepair
      });
      e.hide();
    });
    r_TimeSystem.TimeSystem.scheduleOnce("TimeTohidePrice", 4, function () {
      e.contentPane.getTransition("price").playReverse();
    });
  };
  _ctor.prototype.showShoutBub = function (e, t, o) {
    return __awaiter(this, undefined, undefined, function () {
      var i;
      var n = this;
      return __generator(this, function (a) {
        switch (a.label) {
          case 0:
            (i = this.contentPane.getChild("comShout" + (o + 1))).text = r_UtilsSystem.UtilsSystem.getShowCoin(this.info.shout[o], 2, false);
            r_SoundMgr.SoundMgr.playSound("phoneCar/bub");
            cc.tween(i).to(.4, {
              scaleX: .7,
              scaleY: .7
            }, {
              easing: "backOut"
            }).call(function () {
              r_TimeSystem.TimeSystem.timeUpdate(.2, function (o) {
                n.contentPane.getChild("txtPrice2").text = r_UtilsSystem.UtilsSystem.getShowCoin(e + Math.floor(o * t - e), 2, false);
              });
            }).delay(1).to(.1, {
              scaleX: 0,
              scaleY: 0
            }).start();
            return [4, new Promise(function (e) {
              setTimeout(function () {
                e(1);
              }, 800 + 100 * o);
            })];
          case 1:
            a.sent();
            return [2];
        }
      });
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("comCheck")], _ctor.prototype, "comCheck", undefined);
  __decorate([r_DecorateFunction1.AutoFind("spineScan")], _ctor.prototype, "spineScan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("spineMe")], _ctor.prototype, "spineMe", undefined);
  __decorate([r_DecorateFunction1.AutoFind("spineFire")], _ctor.prototype, "spineFire", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconCar")], _ctor.prototype, "iconCar", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickArea")], _ctor.prototype, "clickArea", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconFly")], _ctor.prototype, "iconFly", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn1")], _ctor.prototype, "btn1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn2")], _ctor.prototype, "btn2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLayer.BaseLayer);
exports.PCarUI1 = exp_PCarUI1;