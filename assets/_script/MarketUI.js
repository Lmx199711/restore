var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarketUI = undefined;
var r_UIDef = require("UIDef");
var r_BaseLayer = require("BaseLayer");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_UtilsSystem = require("UtilsSystem");
var r_PreloadSystem = require("PreloadSystem");
var r_ResSystem = require("ResSystem");
var r_MagicBoardUI = require("MagicBoardUI");
var r_BlockSystem = require("BlockSystem");
var r_SnackRoomFullUI = require("SnackRoomFullUI");
var r_GiveRedPacketSelectUI = require("GiveRedPacketSelectUI");
var exp_MarketUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Market, r_UIDef.UIDef.Res.UI.MarketUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MarketUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MarketUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.btnMagicBoard.onClick(this.onClickMagicBoard, this);
    this.btnClamshell.onClick(this.onClickClamshell, this);
    this.btnCandyHouse.onClick(this.onClickCandyHouse, this);
    this.btnGiveRedPacket.onClick(this.onClickGiveRedPacket, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickMagicBoard = function () {
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.菜刀)) {
      return r_UtilsSystem.UtilsSystem.showTip("暂未开放");
    }
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_ResSystem.ResSystem.loadBundleRes("game1", "market/magicBoard", cc.Prefab, function () {
      r_UtilsSystem.UtilsSystem.showLoading(false);
      r_MagicBoardUI.MagicBoardUI.showUI();
    });
  };
  _ctor.prototype.onClickClamshell = function () {
    r_UtilsSystem.UtilsSystem.showTip("暂未开放");
  };
  _ctor.prototype.onClickCandyHouse = function () {
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.零食满屋)) {
      return r_UtilsSystem.UtilsSystem.showTip("暂未开放");
    }
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.SnackRoomFull
    }, function () {
      r_ResSystem.ResSystem.loadBundleRes("game1", "snackRoomFull/gamePrefab", cc.Prefab, function () {
        r_UtilsSystem.UtilsSystem.showLoading(false);
        r_SnackRoomFullUI.SnackRoomFullUI.showUI();
      });
    });
  };
  _ctor.prototype.onClickGiveRedPacket = function () {
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.派红包)) {
      return r_UtilsSystem.UtilsSystem.showTip("暂未开放");
    }
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.SnackRoomFull
    }, function () {
      r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.showUI();
      r_UtilsSystem.UtilsSystem.showLoading(false);
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClamshell")], _ctor.prototype, "btnClamshell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCandyHouse")], _ctor.prototype, "btnCandyHouse", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMagicBoard")], _ctor.prototype, "btnMagicBoard", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGiveRedPacket")], _ctor.prototype, "btnGiveRedPacket", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.MarketUI = exp_MarketUI;