var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_CaidanSystem = require("CaidanSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_CaidanUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.CaidanUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CaidanUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CaidanUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
    this.black.node.off(cc.Node.EventType.TOUCH_START);
    this.black.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.labContent.text = r_CaidanSystem.CaidanSystem.caidanKey[this.data];
  };
  __decorate([r_DecorateFunction1.AutoFind("labContent")], _ctor.prototype, "labContent", undefined);
  __decorate([r_DecorateFunction1.AutoFind("black")], _ctor.prototype, "black", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_CaidanUI;