var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipAnswerInfo = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_Index = require("Index");
var r_GameTipUI = require("GameTipUI");
var r_ViewTipsUI = require("ViewTipsUI");
var r_GameEvent = require("GameEvent");
var r_ExAB_TipAnswerStrategy = require("ExAB_TipAnswerStrategy");
var r_TimeSystem = require("TimeSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TipAnswerInfo = function () {
  function _ctor() {
    this.key = "";
    this.tipTxt = "";
    this.tipNodes = Array();
  }
  __decorate([_property({
    displayName: "答案key",
    tooltip: "保存这个key，表示本答案已经完成(仅一个key)"
  })], _ctor.prototype, "key", undefined);
  __decorate([_property({
    displayName: "出现提示文本",
    tooltip: "出现提示的文字，直到key被保存"
  })], _ctor.prototype, "tipTxt", undefined);
  __decorate([_property({
    displayName: "特写N个节点",
    type: cc.Node,
    tooltip: "依次展示这些节点，直到key被保存"
  })], _ctor.prototype, "tipNodes", undefined);
  return __decorate([_ccclass("TipAnswerInfo")], _ctor);
}();
exports.TipAnswerInfo = exp_TipAnswerInfo;
var def_ExAB_TipsAnswer = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isBlockWhenClick = false;
    t.isUseStrategy = false;
    t.strategy = null;
    t.answerInfos = Array();
    t.listenKey = "";
    t.listenKeyArr = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    r_Index.App.inst.on(r_GameEvent.default.OnShowGameTip, this.onShowGameTip, this);
  };
  _ctor.prototype.start = function () {
    var e = this;
    this.isUseStrategy && this.strategy.initStrategy();
    r_Index.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
    r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack = function () {
      cc.log("提示功能正在启动中..");
    };
    r_TimeSystem.TimeSystem.scheduleOnce("beginTipUsable", 1, function () {
      r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack = function () {
        e.anserFunction();
      };
    });
  };
  _ctor.prototype.onDestroy = function () {
    r_Index.App.inst.off(r_GameEvent.default.OnShowGameTip, this.onShowGameTip, this);
    r_TimeSystem.TimeSystem.scheduleClear("beginTipUsable");
  };
  _ctor.prototype.anserFunction = function () {
    var e;
    if (-1 != (e = this.isUseStrategy ? this.findLastTipByStrategy() : this.findLastTip())) {
      var t = this.answerInfos[e];
      this.listenKey = t.key;
    } else {
      console.log("完成所有!!!");
    }
  };
  _ctor.prototype.onShowGameTip = function () {
    r_GameTipUI.GameTipUI.setTipBtnVideoVisible(true);
  };
  _ctor.prototype.findLastTipByStrategy = function () {
    var e = this.strategy.GetKey();
    var t = -1;
    for (var o = 0; o < this.answerInfos.length; o++) {
      if (this.answerInfos[o].key == e) {
        t = o;
        break;
      }
    }
    return t;
  };
  _ctor.prototype.findLastTip = function () {
    var e = -1;
    for (var t = 0; t < this.answerInfos.length; t++) {
      var o = this.answerInfos[t];
      if (!r_GameKeyMgr.GameKeyMgr.has(o.key)) {
        e = t;
        break;
      }
    }
    return e;
  };
  _ctor.prototype.onCheck = function (e) {
    var t = e.data;
    var o = t.add;
    t.key;
    if (o) {
      if (!this.listenKey) {
        return;
      }
      this.listenKey;
    }
  };
  _ctor.prototype.BlockPlayer = function () {
    this.isBlockWhenClick;
  };
  _ctor.prototype.UnblockPlayer = function () {
    this.isBlockWhenClick;
  };
  __decorate([_property({
    displayName: "展示答案时屏蔽点击"
  })], _ctor.prototype, "isBlockWhenClick", undefined);
  __decorate([_property({
    displayName: "使用策略模式"
  })], _ctor.prototype, "isUseStrategy", undefined);
  __decorate([_property({
    displayName: "策略组",
    type: r_ExAB_TipAnswerStrategy.default,
    visible: function () {
      return this.isUseStrategy;
    }
  })], _ctor.prototype, "strategy", undefined);
  __decorate([_property({
    displayName: "答案列表",
    type: exp_TipAnswerInfo
  })], _ctor.prototype, "answerInfos", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ExAB_TipsAnswer;