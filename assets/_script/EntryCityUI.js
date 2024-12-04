var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_EntryCitySystem = require("EntryCitySystem");
var r_GroupSystem = require("GroupSystem");
var r_LimitSystem = require("LimitSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_EntryCityUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Entry, r_UIDef.UIDef.Res.UI.EntryCityUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.EntryCityUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EntryCityUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnGo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var e = r_EntryCitySystem.EntryCitySystem.getCfgById(this.data.index);
    var t = e.name;
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel()[t])) {
      this.contentPane.getController("mode").selectedIndex = 1;
      this.imgRole.url = "ui://Entry/" + e.unlockRole;
      this.labDesc.text = e.unlockTxt;
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
      this.imgRole.url = "ui://Entry/" + e.lockRole;
      this.labDesc.text = e.lockTxt;
      this.labLimit.text = "需要主角等级到达" + r_GroupSystem.GroupSystem.getLimitLevel()[t] + "即可开放";
    }
  };
  _ctor.prototype.onClickbtnVideo = function () {};
  _ctor.prototype.onClickbtnGo = function () {
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnGo")], _ctor.prototype, "btnGo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgRole")], _ctor.prototype, "imgRole", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labDesc")], _ctor.prototype, "labDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labLimit")], _ctor.prototype, "labLimit", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_EntryCityUI;