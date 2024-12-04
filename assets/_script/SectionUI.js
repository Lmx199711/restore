var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_Config = require("Config");
var r_UIDef = require("UIDef");
var r_GroupSystem = require("GroupSystem");
var r_PlayerData = require("PlayerData");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_SectionUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Section, r_UIDef.UIDef.Res.UI.SectionUI) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SectionUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SectionUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {
    var e = this;
    var t = r_PlayerData.PlayerData.data.storyMap.id;
    this.data && (t = this.data.id);
    var o = r_GroupSystem.GroupSystem.getSectionCfg()[t];
    console.log("PlayerData.data.storyMap.id: ", t);
    if (o) {
      this.imgNum.url = "ui://Section/" + o.num;
      this.imgTitle.url = "ui://Section/" + o.title;
      this.contentPane.getTransition("t1").play(function () {
        var t;
        e.hide();
        if (null === (t = e.data) || undefined === t ? undefined : t.hideCall) {
          e.data.hideCall();
        } else {
          r_PlayerData.PlayerData.data.storyMap.isShow = false;
          r_Config.default.uiClassMap[o.win].showUI();
        }
      });
    } else {
      this.hide();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("imgNum")], _ctor.prototype, "imgNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgTitle")], _ctor.prototype, "imgTitle", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_SectionUI;