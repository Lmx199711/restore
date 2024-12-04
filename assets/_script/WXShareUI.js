var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_SDKMgr1 = require("SDKMgr1");
var r_CoinSystem = require("CoinSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_WXShareUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.WXShare, r_UIDef.UIDef.Res.UI.WXShareUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.WXShareUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WXShareUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
    this.btnShare.onClick(this.onClickShare, this);
    this.n7.text = "每日首次分享成功后可获得[color=#FB7424]300秒自动点击[/color] \n解放你的双手！";
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickShare = function () {
    var e = this;
    r_SDKMgr1.SDKMgr1.shareapp(function () {
      r_UtilsSystem.UtilsSystem.showTip("分享成功");
      e.hide();
      if (r_PlayerData.PlayerData.data.wxShareTime != new Date().toLocaleDateString()) {
        r_PlayerData.PlayerData.data.wxShareTime = new Date().toLocaleDateString();
        r_CoinSystem.CoinSystem.setAutoTime(r_CoinSystem.EarnTimeType.自动);
      }
    }, function () {
      r_UtilsSystem.UtilsSystem.showTip("分享失败");
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnShare")], _ctor.prototype, "btnShare", undefined);
  __decorate([r_DecorateFunction1.AutoFind("n7")], _ctor.prototype, "n7", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_WXShareUI;