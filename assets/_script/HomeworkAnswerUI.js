var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_HomeworkGameUI = require("HomeworkGameUI");
var r_HomeworkUI = require("HomeworkUI");
var def_HomeworkAnswerUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Homework, r_UIDef.UIDef.Res.UI.HomeworkAnswerUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HomeworkAnswerUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeworkAnswerUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBack);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("mode").selectedIndex = this.data.index;
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
    r_HomeworkGameUI.default.hide();
    if (0 != this.contentPane.getController("mode").selectedIndex) {
      r_HomeworkUI.default.Inst.changedMode(1);
    } else {
      r_HomeworkUI.default.hide();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_HomeworkAnswerUI;