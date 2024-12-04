var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErShouResUI = undefined;
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_ErShouCarSystem = require("ErShouCarSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_ErShouResUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ErShouCar, r_UIDef.UIDef.Res.UI.ErShouResUI) || this;
    t.uiType = "fullScreen";
    t.curPrice = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ErShouResUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ErShouResUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
    this.btnBuy.onClick(this.onClickBuy, this);
    this.btnVideo.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onShown = function () {
    return __awaiter(this, undefined, undefined, function () {
      return __generator(this, function () {
        e.prototype.onShown.call(this);
        this.data;
        this.restore();
        return [2];
      });
    });
  };
  _ctor.prototype.restore = function () {
    var e = this;
    var t = this.data.info;
    var o = t.name;
    var i = t.path;
    var n = t.oriPrice;
    this.txtBecome.text = "即将成为尊贵的" + o + "车主";
    var a = r_jsbi.default.BigInt(Number(n));
    var s = Number(this.data.totalGet);
    this.curPrice = Number(n) + s;
    this.txtOriPrice.text = a.toString();
    this.txtNewPrice.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.curPrice);
    r_ResSystem.ResSystem.loadBundleRes("bundleErShouCar", i + "/2", cc.SpriteFrame, function (t, o) {
      e.car.texture = o;
    });
  };
  _ctor.prototype.onClickBuy = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(this.curPrice)) {
      r_PlayerData.PlayerData.deleteCoin("购买二手车", this.curPrice, r_ReportSystem.SystemKey.二手车, true);
      r_ErShouCarSystem.ErShouCarSystem.buyCar(this.data.info.index);
      this.hide();
      r_UtilsSystem.UtilsSystem.showTip("喜提" + this.data.info.name + "！可在图鉴查看");
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("二手车AD", function () {
      r_ErShouCarSystem.ErShouCarSystem.buyCar(e.data.info.index);
      e.hide();
      r_UtilsSystem.UtilsSystem.showTip("喜提" + e.data.info.name + "！可在图鉴查看");
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("car")], _ctor.prototype, "car", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtBecome")], _ctor.prototype, "txtBecome", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtOriPrice")], _ctor.prototype, "txtOriPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtNewPrice")], _ctor.prototype, "txtNewPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBuy")], _ctor.prototype, "btnBuy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLayer.BaseLayer);
exports.ErShouResUI = exp_ErShouResUI;