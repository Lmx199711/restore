var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PCarResUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_PhoneCarEvent = require("PhoneCarEvent");
var exp_PCarResUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.PhoneCar, r_UIDef.UIDef.Res.UI.PCarResUI) || this;
    t.money = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.PCarResUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PCarResUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.state = this.contentPane.getController("win");
    this.btnLeft.onClick(this.clickbtnLeft, this);
    this.btnRight.onClick(this.clickbtnRight, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.money = 0;
    this.info = this.data.info;
    this.state.selectedIndex = this.data.res ? 1 : 0;
    this.txt1.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.info.shout[2], 2);
    var t = this.info["sell" + this.data.sellIndex];
    var o = this.info["repair" + this.data.repairIndex];
    var i = 0;
    if (this.data.res) {
      r_SoundMgr.SoundMgr.playSound("eat/shengli");
      i = this.info.extra1;
      this.iconCar.url = "ui://PhoneCar/" + this.info.name + "_hao";
      this.txt2.text = "" + r_UtilsSystem.UtilsSystem.getShowCoin(i, 2);
      this.txt3.text = "-" + r_UtilsSystem.UtilsSystem.getShowCoin(t, 2);
      this.txt4.text = "-" + r_UtilsSystem.UtilsSystem.getShowCoin(o, 2, false);
    } else {
      r_SoundMgr.SoundMgr.playSound("saveAnimals/失败");
      this.iconCar.url = "ui://PhoneCar/" + this.info.name + "_baozha";
      i = this.info.extra2;
      this.txt2.text = "-" + r_UtilsSystem.UtilsSystem.getShowCoin(t, 2);
      this.txt3.text = "-" + r_UtilsSystem.UtilsSystem.getShowCoin(o, 2);
      this.txt4.text = "-" + r_UtilsSystem.UtilsSystem.getShowCoin(-1 * this.info.extra2, 2);
      this.txtTotal.text = "";
    }
    this.money = this.info.shout[2] - t - o + i;
    if (this.money < 0) {
      this.txtTotal.text = "-" + r_UtilsSystem.UtilsSystem.getShowCoin(-1 * this.money);
    } else {
      this.txtTotal.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.money);
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.clickbtnLeft = function () {
    if (this.data.res) {
      r_PlayerData.PlayerData.addCoin("二手车收入", this.money, r_ReportSystem.SystemKey.二手车app);
      this.hide();
    } else {
      r_PlayerData.PlayerData.deleteCoin("二手车赔偿", -1 * this.money, r_ReportSystem.SystemKey.二手车app, true) || r_PlayerData.PlayerData.deleteCoin("二手车赔偿", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.二手车app);
      this.hide();
    }
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_PhoneCarEvent.PhoneCarEvent.closeCarUI2);
  };
  _ctor.prototype.clickbtnRight = function () {
    var e = this;
    if (this.data.res) {
      r_PlatformSystem.PlatformSystem.showVideo("三倍获得二手车报酬", function () {
        r_PlayerData.PlayerData.addCoin("二手车收入", 3 * e.money, r_ReportSystem.SystemKey.二手车app);
        e.hide();
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_PhoneCarEvent.PhoneCarEvent.closeCarUI2);
      });
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("免除二车赔偿", function () {
        e.hide();
        r_UtilsSystem.UtilsSystem.showTip("已免除赔偿");
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_PhoneCarEvent.PhoneCarEvent.closeCarUI2);
      });
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("spineMan")], _ctor.prototype, "spineMan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconCar")], _ctor.prototype, "iconCar", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txt1")], _ctor.prototype, "txt1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txt2")], _ctor.prototype, "txt2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txt3")], _ctor.prototype, "txt3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txt4")], _ctor.prototype, "txt4", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtTotal")], _ctor.prototype, "txtTotal", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLeft")], _ctor.prototype, "btnLeft", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRight")], _ctor.prototype, "btnRight", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLayer.BaseLayer);
exports.PCarResUI = exp_PCarResUI;