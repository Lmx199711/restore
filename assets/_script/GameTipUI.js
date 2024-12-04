var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameTipUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_BaseLayer = require("BaseLayer");
var r_ViewTipsUI = require("ViewTipsUI");
var r_GameEvent = require("GameEvent");
var r_LoadMgr = require("LoadMgr");
var r_LevelConfig = require("LevelConfig");
var r_RelaxSystem = require("RelaxSystem");
var r_RelaxLevelCfg = require("RelaxLevelCfg");
var exp_GameTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Wenzi, r_UIDef.UIDef.Res.UI.GameTipUI) || this;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.setTipBtnVisible = function (e) {
    _ctor.Inst && (_ctor.Inst.tipBtn.visible = e);
  };
  _ctor.setTipBtnVideoVisible = function () {
    if (_ctor.Inst) {
      if (r_RelaxLevelCfg.RelaxAnwserCfg.includes(r_RelaxSystem.RelaxSystem.lastLevelId)) {
        _ctor.Inst.tipBtn.getController("video").selectedIndex = 1;
      } else {
        _ctor.Inst.tipBtn.getController("video").selectedIndex = 0;
      }
    }
  };
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GameTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GameTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback("tip", "close");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    if (r_LevelConfig.default.hideTipLevels.includes(r_LoadMgr.default.currLv)) {
      this.tipBtn.visible = false;
    } else {
      this.tipBtn.visible = true;
    }
    this.tipBtn.getController("video").selectedIndex = 0;
    r_Index.App.inst.dispatchEventWith(r_GameEvent.default.OnShowGameTip);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.tipCallback = function () {
    if (r_RelaxLevelCfg.RelaxAnwserCfg.includes(r_RelaxSystem.RelaxSystem.lastLevelId) && r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack) {
      r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack(true);
    } else {
      r_ViewTipsUI.ViewTipsUI.showUI();
    }
  };
  _ctor.prototype.closeCallback = function () {
    r_RelaxSystem.RelaxSystem.clearLevel();
    this.hide();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.GameTipUI = exp_GameTipUI;