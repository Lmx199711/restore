var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewDreamUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_SleepAppCfg = require("SleepAppCfg");
var exp_ViewDreamUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.SleepApp, r_UIDef.UIDef.Res.UI.ViewDreamUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ViewDreamUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ViewDreamUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
    }, this);
    for (var o = 0; o < 5; o++) {
      this.contentPane.getChild("num" + o).asTextField.text = r_SleepAppCfg.SleepAppCfg.lotteryNum[o].toString();
    }
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.contentPane.getChild("desc").asTextField.text = this.data.dreamData.msg;
    for (var o = 0; o < this.data.dreamData.image.length; o++) {
      var i = this.data.dreamData.imageTarget ? this.data.dreamData.imageTarget[o] : "icon";
      r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild(i), "game2", "sleepApp/" + this.data.dreamData.image[o]);
    }
    this.contentPane.getChild("man").visible = false;
    this.contentPane.getChild("door").visible = false;
    this.contentPane.getChild("num").visible = 1 == this.data.dreamData.index;
    this.contentPane.getChild("icon").visible = true;
    if (5 == this.data.dreamData.index) {
      this.contentPane.getChild("icon").visible = false;
      r_ResSystem.ResSystem.loadBundleRes("game2", "sleepApp/yugong", cc.Prefab, function (e, o) {
        var i;
        null === (i = t.yugong) || undefined === i || i.destroy();
        var n = cc.instantiate(o);
        t.contentPane.getChild("yugong").node.addChild(n);
        t.yugong = n;
      });
    } else if (!(6 != this.data.dreamData.index && 7 != this.data.dreamData.index)) {
      this.contentPane.getChild("door").visible = true;
      r_TimeSystem.TimeSystem.timeMapUpdate("opendoor", 1.5, function (e) {
        if (e >= .8) {
          t.contentPane.getChild("doorL").asImage.fillAmount = .2;
          t.contentPane.getChild("doorR").asImage.fillAmount = .2;
          return void r_TimeSystem.TimeSystem.clearTimeMapUpdate("opendoor");
        }
        t.contentPane.getChild("doorL").asImage.fillAmount = 1 - e;
        t.contentPane.getChild("doorR").asImage.fillAmount = 1 - e;
      });
    }
  };
  _ctor.prototype.onHide = function () {
    var t;
    e.prototype.onHide.call(this);
    if (this.data.dreamData.reward > 0) {
      r_PlayerData.PlayerData.addCoin("梦境回顾", this.data.dreamData.reward);
    } else {
      r_PlayerData.PlayerData.deleteCoin("梦境回顾", -this.data.dreamData.reward);
    }
    null === (t = this.yugong) || undefined === t || t.destroy();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.ViewDreamUI = exp_ViewDreamUI;