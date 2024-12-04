var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonWordAdUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_CommonWordAdUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.CommonWordAd) || this;
    t.showAnimFlag = true;
    t.report = "视频上报";
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
    this.show(r_UIDef.UIDef.Urls.UI.CommonWordAdUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CommonWordAdUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.close, this);
    this.btnExit.onClick(this.close, this);
    this.btnVideo.onClick(this.clickVideo, this);
  };
  _ctor.prototype.close = function () {
    this.hide();
    this.data.closeCallback && this.data.closeCallback();
  };
  _ctor.prototype.clickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo(this.report, function () {
      e.hide();
      e.data.videoCallback && e.data.videoCallback();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data) {
      this.data.desc && (this.txtDesc.text = this.data.desc);
      this.data.word1 && (this.btnExit.getChild("title").text = this.data.word1);
      this.data.word2 && (this.btnVideo.getChild("title").text = this.data.word2);
      this.data.report && (this.report = this.data.report);
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnExit")], _ctor.prototype, "btnExit", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.CommonWordAdUI = exp_CommonWordAdUI;