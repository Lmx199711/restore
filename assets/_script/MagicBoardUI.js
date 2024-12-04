var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicBoardUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_BaseLayer = require("BaseLayer");
var r_DecorateFunction1 = require("DecorateFunction1");
var exp_MagicBoardUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Market, r_UIDef.UIDef.Res.UI.MagicBoardUI) || this;
    t.uiType = "fullScreen";
    t.isHide = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MagicBoardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MagicBoardUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    _ctor.instance = this;
    this.btnBack.onClick(this.onClickBack, this);
    this.btnPlay = this.contentPane.getChild("btnPlay").asButton;
    this.btnPlay.onClick(this.onClickPlay, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.isHide = false;
    r_ResSystem.ResSystem.loadBundleRes("game1", "market/magicBoard", cc.Prefab, function (e, o) {
      if (o) {
        t.prefab && t.prefab.destroy();
        t.prefab = cc.instantiate(o);
        t.prefab.parent = cc.find("Canvas");
        t.MagicBoard = t.prefab.getComponent("MagicBoard");
        t.btnPlay.visible = true;
      }
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    this.isHide = true;
  };
  _ctor.prototype.onClickPlay = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("开始玩菜刀", function () {
      e.MagicBoard.gameStartFunc();
      e.btnPlay.visible = false;
    });
  };
  _ctor.prototype.InitGame = function () {
    this.btnPlay.visible = true;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.MagicBoardUI = exp_MagicBoardUI;