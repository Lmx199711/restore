var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmGuideUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var exp_FarmGuideUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.FarmGuideUI) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FarmGuideUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FarmGuideUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    r_ResSystem.ResSystem.loadBundleRes("game3", "finger", cc.Prefab, function (e, o) {
      t.progressAnim = cc.instantiate(o);
      t.progressAnim.active = true;
      t.anim.getChild("anim").node.addChild(t.progressAnim);
      t.progressAnim.x = 0;
      t.progressAnim.y = 0;
    });
    this.btnSkip.onClick(function () {
      r_UtilsSystem.UtilsSystem.showAlert("跳过引导将不再触发，确认跳过引导吗？", 0, function () {
        t.hide();
      }, "跳过");
    });
    this.btnIKnow.onClick(function () {
      t.hide();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.moveMask = function (e, t, o, i) {
    undefined === o && (o = false);
    this.btnIKnow.visible = false;
    this.btnSkip.visible = true;
    if ("" != i) {
      this.n6.visible = true;
      this.talkText.text = i;
    } else {
      this.n6.visible = false;
    }
    var n = this.guideCircle.getChild("mask");
    n.x = e.x;
    n.y = e.y;
    n.width = t.x;
    n.height = t.y;
    this.anim.getChild("anim").x = e.x;
    this.anim.getChild("anim").y = e.y;
    if (o) {
      this.btnIKnow.visible = true;
      this.btnSkip.visible = false;
      n.visible = false;
      this.anim.visible = false;
    }
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("guideCircle")], _ctor.prototype, "guideCircle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("text")], _ctor.prototype, "talkText", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSkip")], _ctor.prototype, "btnSkip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnIKnow")], _ctor.prototype, "btnIKnow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("n6")], _ctor.prototype, "n6", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.FarmGuideUI = exp_FarmGuideUI;