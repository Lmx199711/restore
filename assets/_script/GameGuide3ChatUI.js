var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_StoryBaseUI = require("StoryBaseUI");
var def_GameGuide3ChatUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.GameGuide, r_UIDef.UIDef.Res.UI.GameGuide3ChatUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GameGuide3ChatUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GameGuide3ChatUI);
  };
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_StoryBaseUI.default);
exports.default = def_GameGuide3ChatUI;