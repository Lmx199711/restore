var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneVideoUI = undefined;
var r_Tb = require("Tb");
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_StoneVideoUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.StoneVideoUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.GetVideoStoneNum = function () {
    _ctor.stoneNum || (_ctor.stoneNum = r_jsbi.default.BigInt(r_Tb.Tb.GetGameSet("popVideoStone").value));
    return _ctor.stoneNum;
  };
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneVideoUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneVideoUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.hide, this);
    this.btnVideo.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("tipNum").text = r_Tb.Tb.GetGameSet("popVideoStone").value + "钻石";
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("看视频得钻石", function () {
      r_PlayerData.PlayerData.addStone("购买", 1e3, r_ReportSystem.SystemKey.灵石交易);
      e.hide();
    });
  };
  _ctor.stoneNum = null;
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.StoneVideoUI = exp_StoneVideoUI;