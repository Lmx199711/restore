var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErShouCarBookUI = undefined;
var r_UIDef = require("UIDef");
var r_ErShouCarSystem = require("ErShouCarSystem");
var r_ResSystem = require("ResSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_ErShouCarBookUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ErShouCar, r_UIDef.UIDef.Res.UI.ErShouCarBookUI) || this;
    t.curIndex = 1;
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
    this.show(r_UIDef.UIDef.Urls.UI.ErShouCarBookUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ErShouCarBookUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickHide, this);
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnRight.onClick(this.onClickRight, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.curIndex = 1;
    this.refreshInfo();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickHide = function () {
    this.hide();
  };
  _ctor.prototype.onClickLeft = function () {
    if (!(this.curIndex <= 1)) {
      this.curIndex = this.curIndex - 1;
      this.refreshInfo();
    }
  };
  _ctor.prototype.onClickRight = function () {
    if (!(this.curIndex >= Object.keys(r_ErShouCarSystem.ErShouCarCfg).length)) {
      this.curIndex = this.curIndex + 1;
      this.refreshInfo();
    }
  };
  _ctor.prototype.refreshInfo = function () {
    if (this.curIndex <= 1) {
      this.btnLeft.visible = false;
    } else {
      this.btnLeft.visible = true;
    }
    if (this.curIndex >= Object.keys(r_ErShouCarSystem.ErShouCarCfg).length) {
      this.btnRight.visible = false;
    } else {
      this.btnRight.visible = true;
    }
    var e = r_ErShouCarSystem.ErShouCarCfg[this.curIndex];
    this.num.text = this.curIndex + "_" + Object.keys(r_ErShouCarSystem.ErShouCarCfg).length;
    r_ResSystem.ResSystem.loadBundleFguiImg(this.namePic, "bundleErShouCar", "ui/" + e + "1");
    r_ResSystem.ResSystem.loadBundleFguiImg(this.iconPic, "bundleErShouCar", "ui/" + e);
    if (r_ErShouCarSystem.ErShouCarSystem.hasCar(this.curIndex.toString())) {
      this.iconPic.color = cc.Color.WHITE;
      this.namePic.visible = true;
    } else {
      this.iconPic.color = cc.Color.BLACK;
      this.namePic.visible = false;
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLeft")], _ctor.prototype, "btnLeft", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRight")], _ctor.prototype, "btnRight", undefined);
  __decorate([r_DecorateFunction1.AutoFind("num")], _ctor.prototype, "num", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconPic")], _ctor.prototype, "iconPic", undefined);
  __decorate([r_DecorateFunction1.AutoFind("namePic")], _ctor.prototype, "namePic", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLayer.BaseLayer);
exports.ErShouCarBookUI = exp_ErShouCarBookUI;