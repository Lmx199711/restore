var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_PlayerData = require("PlayerData");
var r_FguiResSystem = require("FguiResSystem");
var def_CommerceUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Bartender, r_UIDef.UIDef.Res.UI.CommerceUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CommerceUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CommerceUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.game = this.contentPane.getChild("game");
    this.btnStart = this.contentPane.getChild("btnStart");
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    this.btnStart.visible = false;
    if (r_PlayerData.PlayerData.data.isFirstCommerce) {
      this.btnStart.getController("btn").selectedIndex = 0;
    } else {
      console.log(r_PlayerData.PlayerData.data.isFirstCommerce);
      this.btnStart.getController("btn").selectedIndex = 1;
    }
    _ctor.Inst = this;
    r_ResSystem.ResSystem.loadBundleRes("game2", "commerce/commerce", cc.Prefab, function (e, t) {
      if (!e) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, t);
        o.btnStart.visible = true;
        o.gameNode = cc.instantiate(t);
        o.gameNode.parent = o.game.node;
      }
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    this.gameNode.destroy();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_CommerceUI;