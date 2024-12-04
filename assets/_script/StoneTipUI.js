var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneTipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_StoneCutUI = require("StoneCutUI");
var r_ResSystem = require("ResSystem");
var exp_StoneTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Stone, r_UIDef.UIDef.Res.UI.StoneTipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    var t = this.contentPane.getChild("btnOpen").asButton;
    t.onClick(this.onClickOpen, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/stone/btnOpen", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      i.active = true;
      t.node.addChild(i);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("content").text = this.data.stoneCfg.Text;
    this.contentPane.getChild("weight").text = "重量：" + this.data.stoneCfg.Weight + "千克";
    this.contentPane.getChild("price").text = "购价：" + this.data.stoneCfg.UseGold;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickOpen = function () {
    this.hide();
    r_StoneCutUI.StoneCutUI.showUI(this.data);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.StoneTipUI = exp_StoneTipUI;