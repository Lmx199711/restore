var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoodlesUI = exports.NoodlesConfig = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_OpenDoughUI = require("OpenDoughUI");
var r_SoundMgr = require("SoundMgr");
exports.NoodlesConfig = {
  time: 15,
  level: [0, 1, 31, 61],
  reward: [1e4, 5e4, 1e5, 1e6],
  maxReward: 2e8,
  rate: {
    "0000": [.8, .2, 0, 0],
    1000: [0, .6, .35, .5],
    "0100": [.4, 0, .55, .5],
    1100: [0, 0, .3, .7],
    1010: [0, .3, 0, .7],
    "0110": [.3, 0, 0, .7],
    1110: [0, 0, 0, 1]
  }
};
var exp_NoodlesUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Noodles, r_UIDef.UIDef.Res.UI.NoodlesUI) || this;
    t.openStatus = 0;
    t.openCount = 0;
    t.comboBoxVal = -1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.NoodlesUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.NoodlesUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    if (r_TYIndex.Platform.isDarenPlatform()) {
      var o = this.contentPane.getChild("comboBox").asComboBox;
      o.visible = true;
      o.on(fgui.Event.STATUS_CHANGED, function (e) {
        t.comboBoxVal = e.value;
      }, this);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initItem();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.initItem = function () {
    var e = this;
    this.openCount = 0;
    this.openStatus = 0;
    this.comboBoxVal = -1;
    var t = function (t) {
      var n = i.contentPane.getChild("item" + t).asCom;
      n.getController("c1").selectedIndex = 0;
      n.clearClick();
      n.onClick(function () {
        n.getController("c1").selectedIndex = 1;
        var t = Math.random();
        var i = 0;
        var a = 0;
        var s = exports.NoodlesConfig.rate[e.openStatus.toString(2).padStart(4, "0")];
        for (var l = 0; l < s.length; l++) {
          if (t < (a += s[l])) {
            i = l;
            e.openStatus |= 8 >> l;
            break;
          }
        }
        if (-1 != e.comboBoxVal) {
          i = e.comboBoxVal;
          e.comboBoxVal = -1;
        }
        n.getController("c2").selectedIndex = i;
        e.openCount++;
        r_OpenDoughUI.OpenDoughUI.showUI({
          type: i,
          openCount: e.openCount
        });
        r_SoundMgr.SoundMgr.playSound("noodles/打开盖子_01");
      }, i);
    };
    var i = this;
    for (var n = 0; n < 4; n++) {
      t(n);
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.NoodlesUI = exp_NoodlesUI;