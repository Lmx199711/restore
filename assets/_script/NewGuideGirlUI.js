var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_BaseWin = require("BaseWin");
var def_NewGuideGirlUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.NewGuide, r_UIDef.UIDef.Res.UI.NewGuideGirlUI) || this;
    t.animList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.NewGuideGirlUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.NewGuideGirlUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.animList = ["role", "pop", "titleBg", "name", "content"];
    this.contentPane.node.startX = this.contentPane.node.x;
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    var o = this.contentPane.node.startX;
    this.contentPane.node.x = o - 750;
    cc.Tween.stopAllByTarget(this.contentPane.node);
    cc.tween(this.contentPane.node).to(.2, {
      x: o
    }, {
      easing: cc.easing.smooth
    }).delay(3.5).to(.2, {
      x: o - 750
    }, {
      easing: cc.easing.smooth
    }).call(function () {}).start();
    r_TimeSystem.TimeSystem.scheduleOnce("onShow1", 4, function () {
      t.hide();
    });
    this.contentPane.getChild("content").text = this.data.content;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    cc.Tween.stopAllByTarget(this.contentPane.node);
    if (this.data.callBack) {
      this.data.callBack();
      this.data.callBack = null;
    }
  };
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_NewGuideGirlUI;