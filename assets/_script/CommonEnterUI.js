var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonEnterUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_CommonEnterUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.CommonEnterUI) || this;
    t.showAnimFlag = true;
    t.desc = "金币不足看视频进入";
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
    this.show(r_UIDef.UIDef.Urls.UI.CommonEnterUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CommonEnterUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.hide, this);
    this.btnVideo.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.videoCallback = this.data.videoCallback;
    this.data && this.data.desc && (this.desc = this.data.desc);
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo(this.desc, function () {
      e.videoCallback && e.videoCallback();
      e.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.CommonEnterUI = exp_CommonEnterUI;