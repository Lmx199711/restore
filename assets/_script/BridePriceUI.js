var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_GuideSystem = require("GuideSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_BridePriceTipUI = require("BridePriceTipUI");
var def_BridePriceUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.BridePrice, r_UIDef.UIDef.Res.UI.BridePriceUI) || this;
    t.showAnimFlag = true;
    t.uiType = "fullScreen";
    t.m_step = 0;
    t.m_maxStep = 5;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BridePriceUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BridePriceUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBubble, this.btnBack);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.m_step = 0;
    this.contentPane.getTransition("t0").play();
    this.contentPane.getTransition("choose").play();
    this.next();
  };
  _ctor.prototype.onClickbtnBubble = function () {
    if (this.m_step > this.m_maxStep) {
      this.onClickbtnBack();
    } else {
      this.next();
    }
  };
  _ctor.prototype.next = function () {
    var e = this;
    this.contentPane.getTransition("choose").play();
    this.contentPane.getController("c1").selectedIndex = this.m_step;
    this.m_step++;
    this.m_txt = this.labChat.text;
    r_TimeSystem.TimeSystem.timeMapUpdate("guideChat", 2.8, function (t) {
      e.labChat.text = e.m_txt.substring(0, Math.ceil(t * e.m_txt.length));
      e.btnBubble.enable = true;
    });
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
    r_GuideSystem.GuideSystem.finishNewGuide2();
    this.contentPane.getController("c1").selectedIndex = 2;
    r_BridePriceTipUI.default.showUI({
      index: 0,
      isGuide: true
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBubble")], _ctor.prototype, "btnBubble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labChat")], _ctor.prototype, "labChat", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BridePriceUI;