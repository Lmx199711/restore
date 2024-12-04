var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_MonopolyLogic = require("MonopolyLogic");
var r_SoundMgr = require("SoundMgr");
var def_MonopolyEmgcUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Monopoly, r_UIDef.UIDef.Res.UI.MonopolyEmgcUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MonopolyEmgcUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MonopolyEmgcUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose = this.contentPane.getChild("btnClose").asButton;
    this.btnClose.onClick(this.onClickClose, this);
    this.imgIcon = this.contentPane.getChild("imgIcon");
    this.content = this.contentPane.getChild("content");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.imgIcon.url = "ui://Monopoly/emgc" + this.data.id;
    this.content.text = this.data.tips;
    r_SoundMgr.SoundMgr.playSound("monopoly/触发事件");
  };
  _ctor.prototype.onClickClose = function () {
    r_MonopolyLogic.MonopolyLogic["triggerEvent" + this.data.type](this.data);
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_MonopolyEmgcUI;