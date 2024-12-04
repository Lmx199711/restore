var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_MonopolyUI = require("MonopolyUI");
var r_PlayerData = require("PlayerData");
var def_MonopolyLuckyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Monopoly, r_UIDef.UIDef.Res.UI.MonopolyLuckyUI) || this;
    t.m_index = 1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MonopolyLuckyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MonopolyLuckyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.nums = [];
    for (var t = 1; t <= 6; t++) {
      var o = this.contentPane.getChild("num" + t);
      this.nums.push(o);
      o.onClick(this.onClickSelect.bind(this, t), this);
    }
    this.btnOK = this.contentPane.getChild("btnOK").asButton;
    this.btnOK.onClick(this.onClickOK, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.onClickSelect(1);
  };
  _ctor.prototype.onClickSelect = function (e) {
    this.nums.forEach(function (e) {
      e.getController("c1").selectedIndex = 0;
    });
    this.nums[e - 1].getController("c1").selectedIndex = 1;
    this.m_index = e;
  };
  _ctor.prototype.onClickOK = function () {
    r_MonopolyUI.default.instance.rollDice(this.m_index);
    r_PlayerData.PlayerData.data.newMonpolyData.assignDice--;
    r_PlayerData.PlayerData.saveData();
    r_MonopolyUI.default.instance.propShow();
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_MonopolyLuckyUI;