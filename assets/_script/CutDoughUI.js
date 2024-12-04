var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CutDoughUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_NoodlesUI = require("NoodlesUI");
var r_CutOverUI = require("CutOverUI");
var r_SoundMgr = require("SoundMgr");
var r_ResSystem = require("ResSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_CutDoughUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Noodles, r_UIDef.UIDef.Res.UI.CutDoughUI) || this;
    t.cutCount = 0;
    t.objPool = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CutDoughUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CutDoughUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.countText = this.contentPane.getChild("countText").asTextField;
    this.timePro = this.contentPane.getChild("timePro").asProgress;
    this.cutDough = this.contentPane.getChild("cutDough").asCom;
    this.contentPane.onClick(this.cut, this);
    this.tran = this.contentPane.getTransition("t0");
    r_ResSystem.ResSystem.loadBundleRes("game2", "noodles/guozi", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.contentPane.getChild("pot").node.addChild(i);
    });
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.cutCount = 0;
    this.countText.text = this.cutCount.toString();
    this.cutDough.asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Noodles + "/cutDough" + this.data.type;
    this.timePro.max = r_NoodlesUI.NoodlesConfig.time;
    this.timePro.value = r_NoodlesUI.NoodlesConfig.time;
    r_TimeSystem.TimeSystem.registSecondUpdate("timePro", function () {
      t.timePro.value--;
      if (t.timePro.value <= 0) {
        r_TimeSystem.TimeSystem.unregistSecondUpdate("timePro");
        r_CutOverUI.CutOverUI.showUI({
          type: t.data.type,
          cutCount: t.cutCount
        });
        t.hide();
      }
    });
    r_SoundMgr.SoundMgr.playSound("noodles/沸腾水_01", true);
    this.tran.stop();
  };
  _ctor.prototype.onHide = function () {
    var t;
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("timePro");
    r_SoundMgr.SoundMgr.stopSound("noodles/沸腾水_01");
    null === (t = this.noodlesRoot) || undefined === t || t.dispose();
    this.noodlesRoot = null;
  };
  _ctor.prototype.cut = function () {
    var e = this;
    this.cutCount++;
    this.countText.text = this.cutCount.toString();
    r_SoundMgr.SoundMgr.playSound("noodles/刀削面_01");
    this.tran.play();
    var t = 0;
    for (var o = r_NoodlesUI.NoodlesConfig.level.length - 1; o >= 0; o--) {
      if (this.cutCount >= r_NoodlesUI.NoodlesConfig.level[o]) {
        t = o;
        break;
      }
    }
    var i = function (t) {
      var o = n.objPool.pop() || new fgui.GLoader();
      o.url = "ui://" + r_UIDef.UIDef.Pack.Noodles + "/noodles" + n.data.type;
      if (!n.noodlesRoot) {
        n.noodlesRoot = new fgui.GComponent();
        n.contentPane.addChild(n.noodlesRoot);
      }
      n.noodlesRoot.addChild(o);
      o.setPivot(.5, .5);
      var i = 100 * (2 == t ? -1 : t);
      var a = 40 * -Math.random();
      o.x = n.cutDough.x + n.cutDough.width / 2 + i;
      o.y = n.cutDough.y + a;
      o.rotation = 0;
      o.scaleX = 1;
      o.scaleY = 1;
      var r = n.contentPane.getChild("pot");
      cc.tween(o).to(.2, {
        x: r.x + i,
        y: r.y - 140 + a,
        scaleX: .2,
        scaleY: .2,
        rotation: 90 * (.5 - Math.random())
      }).call(function () {
        o.removeFromParent();
        e.objPool.push(o);
      }).start();
    };
    var n = this;
    for (o = 0; o < t; o++) {
      i(o);
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.CutDoughUI = exp_CutDoughUI;