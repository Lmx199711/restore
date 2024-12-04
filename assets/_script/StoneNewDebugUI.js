var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_StoneNewSystem = require("StoneNewSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_StoneNewDogzUI = require("StoneNewDogzUI");
var def_StoneNewDebugUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.StoneNew, r_UIDef.UIDef.Res.UI.StoneNewDebugUI) || this;
    t.showAnimFlag = false;
    t.randomIndex = null;
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
    this.show(r_UIDef.UIDef.Urls.UI.StoneNewDebugUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneNewDebugUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnMake);
    for (var t = 0; t < 5; t++) {
      this.contentPane.getChild("btn" + t).onClick(this.onClickBtn.bind(this, t), this);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickbtnMake = function () {
    r_StoneNewSystem.StoneNewSystem.debugCaidan();
  };
  _ctor.prototype.onClickBtn = function (e) {
    r_StoneNewDogzUI.default.instance.randomIndex = e;
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnMake")], _ctor.prototype, "btnMake", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_StoneNewDebugUI;