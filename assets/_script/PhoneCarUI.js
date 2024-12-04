var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneCarUI = undefined;
var r_Tb = require("Tb");
var r_UIDef = require("UIDef");
var r_FirstVideoSystem = require("FirstVideoSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_PCarUI1 = require("PCarUI1");
var exp_PhoneCarUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.PhoneCar, r_UIDef.UIDef.Res.UI.PhoneCarUI) || this;
    t.flag = "none";
    t.showPrice = false;
    t.car_ori_x = -9999;
    t.car_ori_y = -9999;
    t.chooseSellIndex = 0;
    t.index = -1;
    t.info = null;
    t.spineList = ["ui://PhoneCar/baozupo", "ui://PhoneCar/tengyuantuohai", "ui://PhoneCar/liyoutian"];
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
    this.show(r_UIDef.UIDef.Urls.UI.PhoneCarUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PhoneCarUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.cclose, this);
    this.btnStart.onClick(this.startGame, this);
    this.tran_price = this.contentPane.getTransition("price");
    this.tran_bub = this.contentPane.getTransition("bub");
    this.tran_car = this.contentPane.getTransition("car");
    this.tran_carOut = this.contentPane.getTransition("carOut");
    this.spineSell = this.comClient.getChild("spineSell");
    this.btn1.onClick(this.clickBtn.bind(this, 1));
    this.btn2.onClick(this.clickBtn.bind(this, 2));
    this.car_ori_x = this.comCar.x;
    this.car_ori_y = this.comCar.y;
  };
  _ctor.prototype.cclose = function () {
    var e = this;
    if (!("canBack" != this.flag)) {
      this.flag = "anim";
      if (this.showPrice) {
        this.tran_price.playReverse(function () {
          e.hide();
          r_SoundMgr.SoundMgr.playMusic("bgm");
        });
      } else {
        this.hide();
        r_SoundMgr.SoundMgr.playMusic("bgm");
      }
    }
  };
  _ctor.prototype.clickBtn = function (e) {
    var t = this;
    this.flag = "anim";
    this.comBub.text = "" + r_UtilsSystem.UtilsSystem.getShowCoin(this.info["sell" + e], 2, false);
    this.tran_bub.play();
    r_SoundMgr.SoundMgr.playSound("phoneCar/bub");
    this.chooseSellIndex = e;
    if (this.info["sell" + e] > this.info.baseSell) {
      r_TimeSystem.TimeSystem.scheduleOnce("timetobubSound", .4, function () {
        r_SoundMgr.SoundMgr.playSound("phoneCar/bub");
      });
      this.comClient.getController("purpose").selectedIndex = 1;
      r_TimeSystem.TimeSystem.scheduleOnce("gotoFFinish", .5, function () {
        t.comClient.getTransition("t1").play();
        t.finish();
      });
    } else {
      r_SoundMgr.SoundMgr.playSound("phoneCar/angry");
      this.comClient.getController("purpose").selectedIndex = 0;
      r_TimeSystem.TimeSystem.scheduleOnce("gotoClientSay", .5, function () {
        t.comClient.getChild("spineSell").animationName = "shengqi";
      });
      r_TimeSystem.TimeSystem.scheduleOnce("gotoClientBackCar", 2, function () {
        t.comClient.getTransition("t0").playReverse();
        r_SoundMgr.SoundMgr.playSound("phoneCar/cardoor");
        t.tran_bub.playReverse();
      });
      r_TimeSystem.TimeSystem.scheduleOnce("gotoClientLeave", 3, function () {
        r_SoundMgr.SoundMgr.playSound("phoneCar/carOut");
        cc.tween(t.spineSmoke).to(.2, {
          alpha: 1
        }).start();
        t.tran_carOut.play();
      });
      r_TimeSystem.TimeSystem.scheduleOnce("gotoNewCar", 4, function () {
        t.comeNewCar();
      });
    }
    this.tran_price.playReverse();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.showPrice = false;
    this.flag = "canBack";
    this.btnStart.visible = true;
    this.comCar.x = this.car_ori_x;
    this.comCar.y = this.car_ori_y;
    this.spineSmoke.alpha = 1;
    this.comClient.getChild("spineSell").alpha = 0;
    this.comClient.getChild("n14").scaleY = 0;
    this.comClient.getChild("n15").scaleX = 0;
    this.comBub.scaleX = 0;
    this.comBub.scaleY = 0;
    this.index = -1;
    this.chooseSellIndex = 0;
    if (r_FirstVideoSystem.FirstVideoSystem.hasFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.首次玩二手车app)) {
      this.btnStart.getController("ad").selectedIndex = 1;
    } else {
      this.btnStart.getController("ad").selectedIndex = 0;
    }
    r_SoundMgr.SoundMgr.playMusic("chef/zuofanBgm");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("gotoWish");
  };
  _ctor.prototype.startGame = function () {
    var e = this;
    if (r_FirstVideoSystem.FirstVideoSystem.hasFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.首次玩二手车app)) {
      r_PlatformSystem.PlatformSystem.showVideo("二手车app", function () {
        e.btnStart.visible = false;
        e.comeNewCar();
      });
    } else {
      r_FirstVideoSystem.FirstVideoSystem.setFirstEnter(r_FirstVideoSystem.FirstVideoUIEnum.首次玩二手车app);
      this.btnStart.visible = false;
      this.comeNewCar();
    }
  };
  _ctor.prototype.comeNewCar = function () {
    var e = this;
    this.showPrice = true;
    this.flag = "anim";
    this.index++;
    this.index >= r_Tb.Tb.PhoneCar.length && (this.index = 0);
    this.info = r_Tb.Tb.PhoneCar[this.index];
    this.comClient.getController("sell").selectedIndex = this.info.actor - 1;
    this.spineSell.url || (this.spineSell.url = this.spineList[this.info.actor - 1]);
    var t = this.info.case ? "_hao" : "_po";
    this.iconCar.url = "ui://PhoneCar/" + this.info.name + t;
    this.comClient.getChild("spineSell").animationName = "daiji";
    this.refreshPricePanel();
    r_SoundMgr.SoundMgr.playSound("phoneCar/carIn");
    this.tran_car.play(function () {
      cc.tween(e.spineSmoke).to(.1, {
        alpha: 0
      }).start();
      r_TimeSystem.TimeSystem.scheduleOnce("gotoXiaChe", .2, function () {
        r_SoundMgr.SoundMgr.playSound("phoneCar/cardoor");
        e.comClient.getTransition("t0").play();
      });
      r_TimeSystem.TimeSystem.scheduleOnce("gotoShowChoose", .5, function () {
        e.tran_price.play(function () {
          e.flag = "canBack";
        });
      });
    });
  };
  _ctor.prototype.refreshPricePanel = function () {
    this.btn1.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.info.sell1, 2, false);
    this.btn2.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.info.sell2, 2, false);
  };
  _ctor.prototype.finish = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleOnce("gotoWish", 3.3, function () {
      r_PCarUI1.PCarUI1.showUI({
        info: e.info,
        chooseSellIndex: e.chooseSellIndex
      });
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("comCar")], _ctor.prototype, "comCar", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comPrice/btn1")], _ctor.prototype, "btn1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comPrice/btn2")], _ctor.prototype, "btn2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comCar/iconCar")], _ctor.prototype, "iconCar", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comCar/spineSmoke")], _ctor.prototype, "spineSmoke", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comClient/spineSell")], _ctor.prototype, "spineSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comClient")], _ctor.prototype, "comClient", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comBub")], _ctor.prototype, "comBub", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLayer.BaseLayer);
exports.PhoneCarUI = exp_PhoneCarUI;