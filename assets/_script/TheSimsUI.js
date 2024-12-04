var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TheSimsUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_TheSimsCfg = require("TheSimsCfg");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_TheSimsResultUI = require("TheSimsResultUI");
var exp_TheSimsUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.TheSims, r_UIDef.UIDef.Res.UI.TheSimsUI) || this;
    t.isItemClick = false;
    t.curSound = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TheSimsUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TheSimsUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initScene("出差");
    r_SoundMgr.SoundMgr.playMusic("TheSims/BGM_01");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("toNextScene");
    r_TimeSystem.TimeSystem.scheduleClear("bubbleIn");
    r_SoundMgr.SoundMgr.playMusic("bgm");
    this.hideBubble();
  };
  _ctor.prototype.initScene = function (e) {
    var t = this;
    var o = r_TheSimsCfg.TheSimsCfg.scene[e];
    r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild("bg"), "game2", "TheSims/" + o.bg);
    r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild("role"), "game2", "TheSims/" + o.role);
    o.prop && r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild("prop"), "game2", "TheSims/" + o.prop);
    this.contentPane.getController("c1").selectedIndex = o.index;
    this.showMsg(o.msg);
    this.isItemClick = false;
    var i = function (e) {
      var i = n.contentPane.getChild("item" + e).asLoader;
      if (!o.item) {
        i.visible = false;
        n.contentPane.getChild("itembg").visible = false;
        return "continue";
      }
      i.visible = true;
      n.contentPane.getChild("itembg").visible = true;
      i.url = "ui://" + r_UIDef.UIDef.Pack.TheSims + "/" + o.item[e];
      var a = n.contentPane.getChild("target1").asCom;
      i.clearClick();
      i.onClick(function () {
        if (!t.isItemClick) {
          t.isItemClick = true;
          var n = new fgui.GLoader();
          t.contentPane.addChild(n);
          n.setPivot(.5, .5, true);
          n.url = i.url;
          n.setPosition(i.x, i.y);
          n.setSize(i.width, i.height);
          cc.tween(n).to(.3, {
            x: a.x,
            y: a.y
          }).call(function () {
            n.dispose();
            if (o.bubbleOut && "" != o.bubbleOut[e]) {
              t.showBubble(o.bubbleOut[e], function () {
                t.goToScene(o.next[e]);
              });
            } else {
              t.goToScene(o.next[e]);
            }
          }).start();
        }
      }, n);
    };
    var n = this;
    for (var a = 0; a < 3; a++) {
      i(a);
    }
    !o.item && o.next && r_TimeSystem.TimeSystem.scheduleOnce("toNextScene", 3, function () {
      t.goToScene(o.next[0]);
    });
    o.reward && r_TimeSystem.TimeSystem.scheduleOnce("toNextScene", 4, function () {
      r_TheSimsResultUI.TheSimsResultUI.showUI({
        reward: o.reward
      });
    });
    o.bubbleIn && "" != o.bubbleIn && r_TimeSystem.TimeSystem.scheduleOnce("bubbleIn", .5, function () {
      t.showBubble(o.bubbleIn);
    });
    o.sound && r_SoundMgr.SoundMgr.playSound("TheSims/" + o.sound);
  };
  _ctor.prototype.goToScene = function (e) {
    var t = this;
    this.hideBubble();
    this.showBlock(function () {
      t.initScene(e);
    });
  };
  _ctor.prototype.showBubble = function (e, t) {
    var o = this.contentPane.getChild("bubble").asGroup;
    this.contentPane.getChild("bubbleText").asLabel.text = e;
    "主人" != e && (o.visible = true);
    o.node.opacity = 0;
    cc.Tween.stopAllByTarget(o.node);
    cc.tween(o.node).to(.2, {
      opacity: 255
    }).delay(3).to(.2, {
      opacity: 0
    }).call(function () {
      o.visible = false;
      t && t();
    }).start();
    "" != this.curSound && r_SoundMgr.SoundMgr.stopSound(this.curSound);
    this.curSound = "TheSims/" + e;
    r_SoundMgr.SoundMgr.playSound(this.curSound);
  };
  _ctor.prototype.hideBubble = function () {
    this.contentPane.getChild("bubble").asGroup.visible = false;
    "" != this.curSound && r_SoundMgr.SoundMgr.stopSound(this.curSound);
  };
  _ctor.prototype.showMsg = function (e) {
    var t = this.contentPane.getChild("msg").asGroup;
    if (e) {
      this.contentPane.getChild("msgText").asLabel.text = e;
      t.visible = true;
    } else {
      t.visible = false;
    }
  };
  _ctor.prototype.showBlock = function (e) {
    var t = this.contentPane.getChild("block").asGraph;
    t.visible = true;
    t.node.opacity = 0;
    cc.Tween.stopAllByTarget(t.node);
    cc.tween(t.node).to(1, {
      opacity: 255
    }).call(function () {
      e && e();
    }).to(1, {
      opacity: 0
    }).call(function () {
      t.visible = false;
    }).start();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.TheSimsUI = exp_TheSimsUI;