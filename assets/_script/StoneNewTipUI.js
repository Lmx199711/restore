var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneNewTipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_StoneNewCfg = require("StoneNewCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_StoneNewCutUI = require("StoneNewCutUI");
var r_ResSystem = require("ResSystem");
var exp_StoneNewTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.StoneNew, r_UIDef.UIDef.Res.UI.StoneNewTipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneNewTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneNewTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("BtnClose").asButton.onClick(this.hide, this);
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
    var t = r_StoneNewCfg.StoneNewCfg[this.data.stoneData.stoneId];
    this.contentPane.getChild("content").text = t.text;
    this.contentPane.getChild("weight").text = "重量：" + t.Weight + "千克";
    this.contentPane.getChild("price").text = "购价：" + r_UtilsSystem.UtilsSystem.numFormats(this.data.stoneData.price);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickOpen = function () {
    this.hide();
    r_StoneNewCutUI.StoneNewCutUI.showUI(this.data);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.StoneNewTipUI = exp_StoneNewTipUI;