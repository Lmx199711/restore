var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetItemComUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var exp_GetItemComUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.GetItemComUI) || this;
    t.showAnimFlag = true;
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
    this.show(r_UIDef.UIDef.Urls.UI.GetItemComUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GetItemComUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnOK.onClick(this.close, this);
    this.btnLeft.onClick(this.close, this);
    this.btnRight.onClick(this.doubleClick, this);
  };
  _ctor.prototype.close = function () {
    this.hide();
    this.data.closeCallback && this.data.closeCallback();
  };
  _ctor.prototype.doubleClick = function () {
    var e = this;
    this.data.doubleCallBack && r_PlatformSystem.PlatformSystem.showVideo("彩蛋双倍", function () {
      e.hide();
      e.data.doubleCallBack();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data) {
      if (this.data.is2Btn) {
        this.contentPane.getController("c1").selectedIndex = 1;
      } else {
        this.contentPane.getController("c1").selectedIndex = 0;
      }
      if (this.data.hideTitle) {
        this.contentPane.getController("showHead").setSelectedPage("dontShow");
        this.itemIcon2.texture = this.data.sprite;
      } else {
        this.contentPane.getController("showHead").setSelectedPage("show");
        this.itemIcon.url = this.data.iconUrl;
      }
      if (this.data.titleTip) {
        this.contentPane.getController("showHead").setSelectedPage("show2");
        this.itemIcon.url = this.data.iconUrl;
      }
      this.itemDesc.text = this.data.getDesc;
      if (this.data.scale) {
        this.itemIcon.scaleX = this.data.scale;
        this.itemIcon.scaleY = this.data.scale;
      } else {
        this.itemIcon.scaleX = 1;
        this.itemIcon.scaleY = 1;
      }
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("itemIcon")], _ctor.prototype, "itemIcon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("itemIcon2")], _ctor.prototype, "itemIcon2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("itemDesc")], _ctor.prototype, "itemDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOK")], _ctor.prototype, "btnOK", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLeft")], _ctor.prototype, "btnLeft", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRight")], _ctor.prototype, "btnRight", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.GetItemComUI = exp_GetItemComUI;