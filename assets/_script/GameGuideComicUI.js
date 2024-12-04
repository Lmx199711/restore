var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_GameGuideComicUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GameGuide, r_UIDef.UIDef.Res.UI.GameGuideComicUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.step = 0;
    t.maxStep = 4;
    return t;
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
    this.show(r_UIDef.UIDef.Urls.UI.GameGuideComicUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GameGuideComicUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.touch.onClick(this.onTouch, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    r_SoundMgr.SoundMgr.playMusic("gameGuide/info/漫画bgm");
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    r_PlayerData.PlayerData.data.gameGuide = 1;
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("comicNext");
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getTransition("init").play();
    this.step = 0;
    this.next();
  };
  _ctor.prototype.next = function () {
    var e = this;
    if (!(this.step > this.maxStep)) {
      this.contentPane.getController("c1").selectedIndex = this.step;
      this.contentPane.getTransition("t" + this.step).play(function () {
        r_TimeSystem.TimeSystem.scheduleOnce("comicNext", 2, function () {
          e.step++;
          e.next();
        });
      });
    }
  };
  _ctor.prototype.onTouch = function () {
    r_TimeSystem.TimeSystem.scheduleClear("comicNext");
    if (this.step > this.maxStep) {
      this.hide();
    } else {
      this.contentPane.getTransition("t" + this.step).stop();
      this.contentPane.getTransition("fnish" + this.step).play();
      this.step++;
      this.next();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("touch")], _ctor.prototype, "touch", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_GameGuideComicUI;