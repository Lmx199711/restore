var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_HomeWorkCom = require("HomeWorkCom");
var r_HomeworkTipUI = require("HomeworkTipUI");
var def_HomeworkGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Homework, r_UIDef.UIDef.Res.UI.HomeworkGameUI) || this;
    t.showAnimFlag = false;
    t.m_isVideo = true;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HomeworkGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeworkGameUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnFinish, this.btnTip);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    if (this.m_prefab) {
      this.m_prefab.destroy();
      this.m_prefab = null;
    }
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.m_isVideo = true;
    this.btnTip.getController("mode").selectedIndex = this.m_isVideo ? 0 : 1;
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("game4", "homework/homeworkCom", cc.Prefab, function (t, o) {
      if (t) {
        r_UtilsSystem.UtilsSystem.showTip("加载失败,请重进该玩法");
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        e.m_prefab = cc.instantiate(o);
        e.homeworkCom = e.m_prefab.getComponent(r_HomeWorkCom.HomeWorkCom);
        e.center.node.addChild(e.m_prefab);
        e.contentPane.visible = true;
      }
    });
  };
  _ctor.prototype.onClickbtnFinish = function () {
    this.homeworkCom.finish();
  };
  _ctor.prototype.onClickbtnTip = function () {
    var e = this;
    if (this.m_isVideo) {
      r_PlatformSystem.PlatformSystem.showVideo("寒假作业提示", function () {
        r_HomeworkTipUI.default.showUI();
        e.m_isVideo = false;
        e.btnTip.getController("mode").selectedIndex = e.m_isVideo ? 0 : 1;
      });
    } else {
      r_HomeworkTipUI.default.showUI();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("center")], _ctor.prototype, "center", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFinish")], _ctor.prototype, "btnFinish", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_HomeworkGameUI;