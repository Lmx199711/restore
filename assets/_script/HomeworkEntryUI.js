var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_HomeworkUI = require("HomeworkUI");
var def_HomeworkEntryUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Homework, r_UIDef.UIDef.Res.UI.HomeworkEntryUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.HomeworkEntryUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeworkEntryUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnVideo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = r_PlayerData.PlayerData.data.homeworkCaidan;
    if (0 == r_PlayerData.PlayerData.data.homeworkCaidan) {
      r_UtilsSystem.UtilsSystem.playAnim(this.anim, "animation", true);
    } else {
      r_UtilsSystem.UtilsSystem.playAnim(this.anim1, "animation", true);
    }
  };
  _ctor.prototype.onClickbtnVideo = function () {
    r_PlatformSystem.PlatformSystem.showVideo("进入寒假作业", function () {
      r_HomeworkUI.default.showUI();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim1")], _ctor.prototype, "anim1", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_HomeworkEntryUI;