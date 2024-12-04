var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_LevelRolePropUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.LevelRole, r_UIDef.UIDef.Res.UI.LevelRolePropUI) || this;
    t.showAnimFlag = false;
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
    this.show(r_UIDef.UIDef.Urls.UI.LevelRolePropUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LevelRolePropUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBack);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var e = this;
    var t = this.data.levelRoleId;
    r_ResSystem.ResSystem.loadBundleFguiImg(this.imgFood, "game5", "shaokao/foot_" + t + "_1");
    r_ResSystem.ResSystem.loadBundleFguiImg(this.imgBrush, "game5", "brush/brush" + t);
    this.btnBack.enabled = false;
    r_TimeSystem.TimeSystem.scheduleOnce("closeWin11", 1, function () {
      e.btnBack.enabled = true;
    });
    r_SoundMgr.SoundMgr.playSound("drawCard/获得钻石");
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("imgBrush")], _ctor.prototype, "imgBrush", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgFood")], _ctor.prototype, "imgFood", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_LevelRolePropUI;