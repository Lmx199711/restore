var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PCarUI2 = undefined;
var r_UIDef = require("UIDef");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_PCarResUI = require("PCarResUI");
var r_PhoneCarEvent = require("PhoneCarEvent");
var exp_PCarUI2 = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.PhoneCar, r_UIDef.UIDef.Res.UI.PCarUI2) || this;
    t.uiType = "fullScreen";
    t.showAnimFlag = true;
    t.ori_x = 0;
    t.ori_y = 0;
    t.grp_ori_x = 0;
    t.grp_ori_y = 0;
    t.car_ori_x = 0;
    t.car_ori_y = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.PCarUI2, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PCarUI2);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.ori_x = this.spineMan.x;
    this.ori_y = this.spineMan.y;
    this.car_ori_x = this.iconCar.x;
    this.car_ori_y = this.iconCar.y;
    this.grp_ori_x = this.grp1.x;
    this.grp_ori_y = this.grp1.y;
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.grp1.x = this.grp_ori_x;
    this.grp1.y = this.grp_ori_y;
    this.spineMan.alpha = 1;
    this.spineMan.x = this.ori_x;
    this.spineMan.y = this.ori_y;
    this.iconCar.x = this.car_ori_x;
    this.iconCar.y = this.car_ori_y;
    r_TYEventDispatcher.TYEventDispatcher.on(r_PhoneCarEvent.PhoneCarEvent.closeCarUI2, this.closeUI, this);
    this.info = this.data.info;
    this.iconCar.url = "ui://PhoneCar/" + this.info.name + "_hao";
    cc.tween(this.spineMan).delay(.5).to(.3, {
      x: this.ori_x + 100,
      y: this.ori_y - 50,
      alpha: 0
    }).call(function () {
      r_SoundMgr.SoundMgr.playSound("phoneCar/cardoor");
    }).start();
    if (this.data.goodRepair) {
      r_TimeSystem.TimeSystem.scheduleOnce("timeTogo", 2, function () {
        t.contentPane.getTransition("carGo").play();
        r_TimeSystem.TimeSystem.scheduleOnce("isgsadge", 2.5, function () {
          r_PCarResUI.PCarResUI.showUI({
            info: t.info,
            sellIndex: t.data.sellIndex,
            repairIndex: t.data.repairIndex,
            res: t.data.goodRepair
          });
        });
      });
    } else {
      cc.tween(this.iconCar.node).delay(1.5).call(function () {
        t.contentPane.getTransition("carBoom").play();
      }).delay(.5).call(function () {
        r_SoundMgr.SoundMgr.playSound("chef/baozha");
      }).delay(.5).call(function () {
        t.iconCar.url = "ui://PhoneCar/" + t.info.name + "_baozha";
      }).delay(3).call(function () {
        r_PCarResUI.PCarResUI.showUI({
          info: t.info,
          sellIndex: t.data.sellIndex,
          repairIndex: t.data.repairIndex,
          res: t.data.goodRepair
        });
      }).start();
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_PhoneCarEvent.PhoneCarEvent.closeCarUI2, this.closeUI, this);
    r_TimeSystem.TimeSystem.scheduleClear("timeTogo");
    r_TimeSystem.TimeSystem.scheduleClear("timeToChangeIcon");
    r_TimeSystem.TimeSystem.scheduleClear("isgsadge");
    cc.Tween.stopAllByTarget(this.iconCar.node);
    cc.Tween.stopAllByTarget(this.spineMan);
  };
  _ctor.prototype.closeUI = function () {
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("spineMan")], _ctor.prototype, "spineMan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconCar")], _ctor.prototype, "iconCar", undefined);
  __decorate([r_DecorateFunction1.AutoFind("grp1")], _ctor.prototype, "grp1", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLayer.BaseLayer);
exports.PCarUI2 = exp_PCarUI2;