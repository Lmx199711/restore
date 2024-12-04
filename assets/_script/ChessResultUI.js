var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChessResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_ChineseChessUI = require("ChineseChessUI");
var exp_ChessResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.ChineseChess, r_UIDef.UIDef.Res.UI.ChessResultUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.ChessResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ChessResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.controller = this.contentPane.getController("c1");
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.btnVideo = this.contentPane.getChild("btnVideo").asButton;
    this.btnVideo.onClick(this.onClickVideo, this);
    this.numTxt = this.contentPane.getChild("num").asTextField;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.controller.selectedIndex = this.data.type;
    this.numTxt.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.data.num);
  };
  _ctor.prototype.onUpdate = function () {
    e.prototype.onUpdate.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_ChineseChessUI.ChineseChessUI.instance.initUI();
  };
  _ctor.prototype.onClickBack = function () {
    if (0 == this.data.type) {
      r_PlayerData.PlayerData.addCoin("象棋结算", this.data.num);
    } else {
      r_PlayerData.PlayerData.deleteCoin("象棋结算", this.data.num);
    }
    this.hide();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("象棋结算", function () {
      0 == e.data.type && r_PlayerData.PlayerData.addCoin("象棋结算", 2 * e.data.num);
      e.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.ChessResultUI = exp_ChessResultUI;