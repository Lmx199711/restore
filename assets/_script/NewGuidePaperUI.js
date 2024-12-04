var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_ChatSystem = require("ChatSystem");
var r_GuideSystem = require("GuideSystem");
var r_IconSystem = require("IconSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_MainHomeUI = require("MainHomeUI");
var def_NewGuidePaperUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.NewGuide, r_UIDef.UIDef.Res.UI.NewGuidePaperUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.NewGuidePaperUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.NewGuidePaperUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnStart);
    this.contentPane.node.startX = this.contentPane.node.x;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    for (var t = 1; t <= 4; t++) {
      var o = this.contentPane.getChild("content" + t);
      o.node.opacity = 0;
      cc.Tween.stopAllByTarget(this.contentPane.node);
      cc.tween(o.node).delay(.2 + 1 * (t - 1)).to(1, {
        opacity: 255
      }, {
        easing: cc.easing.smooth
      }).call(function () {}).start();
    }
    this.btnStart.node.scale = 0;
    cc.Tween.stopAllByTarget(this.btnStart.node);
    cc.tween(this.btnStart.node).delay(4.2).to(.5, {
      scale: 1
    }, {
      easing: cc.easing.smooth
    }).call(function () {}).start();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (this.data && this.data.callBack) {
      this.data.callBack();
      this.data.callBack = null;
    }
  };
  _ctor.prototype.onClickbtnStart = function () {
    this.hide();
    r_IconSystem.IconSystem.flyMainHomeIcon("btnGoout", function () {
      var e = r_MainHomeUI.default.instance.btnGoout.node;
      var t = cc.v2(0, 0);
      r_GuideSystem.GuideSystem.showFinger(t, e);
    });
    r_ChatSystem.ChatSystem.addNewChatTaskById(46);
  };
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_NewGuidePaperUI;