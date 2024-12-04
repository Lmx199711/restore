var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_TipsAnswerPicTxt = undefined;
var r_GameTipUI = require("GameTipUI");
var r_ViewTipsUI = require("ViewTipsUI");
var r_GameKeyMgr = require("GameKeyMgr");
var r_ExAB_TipsAnswer = require("ExAB_TipsAnswer");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = function (e) {
  function t() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.key = "";
    t.tipTxt = "";
    t.tipPic = "";
    t.tipNodes = Array();
    return t;
  }
  __extends(t, e);
  __decorate([_property({
    displayName: "答案key",
    tooltip: "保存这个key，表示本答案已经完成(仅一个key)"
  })], t.prototype, "key", undefined);
  __decorate([_property({
    displayName: "出现提示文本",
    tooltip: "出现提示的文字，直到key被保存"
  })], t.prototype, "tipTxt", undefined);
  __decorate([_property({
    displayName: "出现提示图片",
    tooltip: "出现提示的图片，直到key被保存"
  })], t.prototype, "tipPic", undefined);
  __decorate([_property({
    displayName: "特写N个节点",
    type: cc.Node,
    tooltip: "依次展示这些节点，直到key被保存",
    visible: function () {
      return false;
    }
  })], t.prototype, "tipNodes", undefined);
  return __decorate([_ccclass("myTipAnswerInfo1")], t);
}(r_ExAB_TipsAnswer.TipAnswerInfo);
var exp_Ex_TipsAnswerPicTxt = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.answerInfos = [];
    t._tempV2 = cc.Vec2.ZERO;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
  };
  _ctor.prototype.findLastTip = function () {
    var e = -1;
    for (var t = 0; t < this.answerInfos.length; t++) {
      var i = this.answerInfos[t];
      if (_ref__ctor.IndexKey && !r_GameKeyMgr.GameKeyMgr.has(_ref__ctor.IndexKey)) {
        if (_ref__ctor.IndexKey == i.key) {
          e = t;
          break;
        }
      } else if (!r_GameKeyMgr.GameKeyMgr.has(i.key)) {
        e = t;
        break;
      }
    }
    return e;
  };
  _ctor.prototype.showAnswer = function (e) {
    var t = this.answerInfos[e];
    r_ViewTipsUI.ViewTipsUI.showAnserTip(t.tipTxt, t.tipPic);
    r_GameTipUI.GameTipUI.setTipBtnVisible(true);
  };
  _ctor.IndexKey = null;
  __decorate([_property({
    displayName: "答案信息",
    type: y
  })], _ctor.prototype, "answerInfos", undefined);
  return _ref__ctor = __decorate([_ccclass, _menu("新系统/02快捷脚本/关卡答案提示/左图右文")], _ctor);
}(r_ExAB_TipsAnswer.default);
exports.Ex_TipsAnswerPicTxt = exp_Ex_TipsAnswerPicTxt;