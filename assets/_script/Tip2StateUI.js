var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tip2StateUI = undefined;
var r_Tb = require("Tb");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_Tip2StateUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.Tip2StateUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.Tip2StateUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.Tip2StateUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnNo.onClick(this.close, this);
    this.btnOk.onClick(this.okFine, this);
    this.btnSave.onClick(this.lookVideo, this);
  };
  _ctor.prototype.close = function () {
    this.hide();
    this.data.closeCallback && this.data.closeCallback();
  };
  _ctor.prototype.okFine = function () {
    var e = r_WeaponSystem.WeaponSystem.MyGraduateWpLen();
    var t = r_Tb.Tb.FairyEvent.filter(function (t) {
      return 3 == t.time && Number(t.condition) == e;
    });
    if (t && t.length > 0) {
      var o = r_WeaponSystem.WeaponSystem.findEvent(t);
      var i = o.isFind;
      var n = o.info;
      i && r_WeaponSystem.WeaponSystem.showEvent(n, null);
    }
    this.hide();
    this.data.closeCallback && this.data.closeCallback();
  };
  _ctor.prototype.lookVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("修复兵器", function () {
      e.data.okCallback && e.data.okCallback();
      e.hide();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data) {
      var t = this.data;
      var o = t.result;
      var i = t.id;
      var n = t.level;
      var a = t.curLevel;
      var s = r_WeaponSystem.WeaponSystem.GetWeaponInfo(i).name;
      r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild("icon"), "bdWeaponForge", "weapon/small/" + s);
      if (1 == o) {
        this.txt1.text = s + "成功强化至" + n + "级！";
        this.contentPane.getController("state").selectedIndex = 1;
        this.contentPane.getChild("icon").grayed = false;
        this.contentPane.getChild("iconBg").grayed = false;
      } else if (0 == o) {
        this.txt0.text = "很遗憾，你的" + s + "降至" + a + "级";
        this.contentPane.getController("state").selectedIndex = 0;
        this.contentPane.getChild("icon").grayed = true;
        this.contentPane.getChild("iconBg").grayed = true;
      }
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("txt0")], _ctor.prototype, "txt0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txt1")], _ctor.prototype, "txt1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNo")], _ctor.prototype, "btnNo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSave")], _ctor.prototype, "btnSave", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.Tip2StateUI = exp_Tip2StateUI;