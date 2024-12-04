var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicBoardTipUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_MagicBoard = require("MagicBoard");
var r_UtilsSystem = require("UtilsSystem");
var r_BaseLayer = require("BaseLayer");
var r_DecorateFunction1 = require("DecorateFunction1");
var exp_MagicBoardTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Market, r_UIDef.UIDef.Res.UI.MagicBoardTipUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.MagicBoardTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MagicBoardTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.tipLevel = 1;
    this.btnBook1.onClick(this.onClickBook1, this);
    this.btnBook2.onClick(this.onClickBook2, this);
    this.btnBook3.onClick(this.onClickBook3, this);
    this.btnBook4.onClick(this.onClickBook4, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.isShow = true;
    this.initTip();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_MagicBoard.default.pause = false;
    _ctor.isShow = false;
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.initTip = function () {
    for (var e = 1; e <= 4; e++) {
      this["btnBook" + e].getController("video").selectedIndex = this.tipLevel >= e ? 0 : 1;
    }
  };
  _ctor.prototype.onClickBook1 = function () {
    this.btnBook1.getController("content").selectedIndex = 1;
  };
  _ctor.prototype.onClickBook2 = function () {
    var e = this;
    if (this.tipLevel >= 2) {
      return this.btnBook2.getController("content").selectedIndex = 1;
    }
    r_PlatformSystem.PlatformSystem.showVideo("神奇的菜板查看提示", function () {
      e.tipLevel = 2;
      e.initTip();
    });
  };
  _ctor.prototype.onClickBook3 = function () {
    var e = this;
    if (this.tipLevel >= 3) {
      return this.btnBook3.getController("content").selectedIndex = 1;
    }
    if (2 == this.tipLevel) {
      r_PlatformSystem.PlatformSystem.showVideo("神奇的菜板查看提示", function () {
        e.tipLevel = 3;
        e.initTip();
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("请先解锁青龙斩");
    }
  };
  _ctor.prototype.onClickBook4 = function () {
    var e = this;
    if (4 == this.tipLevel) {
      return this.btnBook4.getController("content").selectedIndex = 1;
    }
    if (3 == this.tipLevel) {
      r_PlatformSystem.PlatformSystem.showVideo("神奇的菜板查看提示", function () {
        e.tipLevel = 4;
        e.initTip();
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("请先解锁隐藏宝刀");
    }
  };
  _ctor.index = 0;
  _ctor.isShow = false;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBook1")], _ctor.prototype, "btnBook1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBook2")], _ctor.prototype, "btnBook2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBook3")], _ctor.prototype, "btnBook3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBook4")], _ctor.prototype, "btnBook4", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.MagicBoardTipUI = exp_MagicBoardTipUI;