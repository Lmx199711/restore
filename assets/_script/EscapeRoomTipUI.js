var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_EscapeRoomTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.EscapeRoom, r_UIDef.UIDef.Res.UI.EscapeRoomTipUI) || this;
    t.showAnimFlag = true;
    return t;
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
    this.show(r_UIDef.UIDef.Urls.UI.EscapeRoomTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EscapeRoomTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.BtnClose.node.off(cc.Node.EventType.TOUCH_START);
    this.BtnClose.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  __decorate([r_DecorateFunction1.AutoFind("BtnClose")], _ctor.prototype, "BtnClose", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_EscapeRoomTipUI;