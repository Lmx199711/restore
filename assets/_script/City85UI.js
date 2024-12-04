var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_RelaxSystem = require("RelaxSystem");
var r_RelaxLevelCfg = require("RelaxLevelCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var r_ExpSystem = require("ExpSystem");
var r_ResSystem = require("ResSystem");
var r_SoundMgr = require("SoundMgr");
var r_UtilsSystem = require("UtilsSystem");
var def_City85UI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.City85, r_UIDef.UIDef.Res.UI.City85UI) || this;
    t.vieoName = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.City85UI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.City85UI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnStart = this.contentPane.getChild("btnStart");
    this.btnStart.onClick(this.onClickStart, this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.btnRefresh = this.contentPane.getChild("btnRefresh");
    this.btnRefresh.onClick(this.onClcikRefresh, this);
    this.btnJujue = this.contentPane.getChild("btnJujue");
    this.btnJujue.onClick(this.onClcikJujue, this);
    this.labDesc = this.contentPane.getChild("labDesc").asLabel;
    this.labSuccDesc = this.contentPane.getChild("labSuccDesc").asLabel;
    this.pro = this.contentPane.getChild("pro").asProgress;
    this.labName = this.contentPane.getChild("labName").asLabel;
    this.labBad = this.contentPane.getChild("labBad").asLabel;
    this.labGood = this.contentPane.getChild("labGood").asLabel;
    this.nextLevel = this.contentPane.getChild("nextLevel").asLabel;
    this.up = this.contentPane.getChild("up").asLoader;
    this.up2 = this.contentPane.getChild("up2").asLoader;
    this.ricon = this.contentPane.getChild("ricon").asLoader;
    this.imgRole = this.contentPane.getChild("imgRole").asLoader;
    this.imgInitRole = this.contentPane.getChild("imgInitRole").asLoader;
    r_ResSystem.ResSystem.loadBundleRes("game1", "city85/dianzan_up", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.headAnim = i.getComponent(sp.Skeleton);
      t.up.node.addChild(i);
      i.active = false;
    });
    r_ResSystem.ResSystem.loadBundleRes("game1", "city85/dianzan_down", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.badAnim = i.getComponent(sp.Skeleton);
      t.up2.node.addChild(i);
      i.active = false;
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.restart = function () {
    var e = this;
    if (2 == this.data) {
      var t = function () {
        r_ExpSystem.ExpSystem.addExp(5);
        var t = r_ExpSystem.ExpSystem.getMaxExp();
        e.pro.tweenValue(r_ExpSystem.ExpSystem.getExp() / t * 100, 3);
        e.labName.text = r_ExpSystem.ExpSystem.getLevelName();
        e.labBad.text = r_ExpSystem.ExpSystem.getBad() + "";
      };
      var o = r_RelaxSystem.RelaxSystem.lastLevelId;
      var i = r_RelaxLevelCfg.RelaxTaskCfg[o];
      this.contentPane.getController("c1").setSelectedIndex(2);
      this.loadRole(this.imgRole, i);
      this.labSuccDesc.text = i.succBubble;
      this.setRelaxExp();
      r_ExpSystem.ExpSystem.addGood();
      this.playGoodAnim();
      setTimeout(function () {
        e.hide();
      }, 1e3 * i.succTime);
      if (r_ExpSystem.ExpSystem.checkUp(5)) {
        this.pro.tweenValue(100, 1);
        return void cc.tween(this.contentPane).delay(1).call(function () {
          e.pro.value = 0;
          t();
        }).start();
      } else {
        return void t();
      }
    }
    var n = r_RelaxSystem.RelaxSystem.getRelaxTaskId();
    var a = r_RelaxLevelCfg.RelaxTaskCfg[n];
    var s = r_ExpSystem.ExpSystem.getMaxExp();
    this.pro.value = r_ExpSystem.ExpSystem.getExp() / s * 100;
    this.setRelaxExp();
    if (1 == this.data) {
      r_ExpSystem.ExpSystem.addBad();
      this.playBadAnim();
    }
    if (null == n) {
      this.contentPane.getController("c1").setSelectedIndex(0);
      return void this.loadRole(this.imgInitRole, null);
    }
    this.contentPane.getController("c1").setSelectedIndex(1);
    this.loadRole(this.imgRole, a);
    this.ricon.url = "ui/City85/ricon" + n;
    this.labDesc.text = a.desc;
    this.btnStart.visible = true;
    this.btnJujue.visible = true;
  };
  _ctor.prototype.playGoodAnim = function () {
    var e = this;
    this.headAnim.node.active = true;
    this.headAnim.setAnimation(0, "animation", true);
    var t = parseInt(this.labGood.text);
    var o = r_ExpSystem.ExpSystem.getGood();
    var i = o - t;
    var n = function () {
      t++;
      e.labGood.text = t + "";
      if (t >= o) {
        e.headAnim.unschedule(n);
        e.headAnim.node.active = false;
      }
    };
    this.headAnim.schedule(n, .3, i);
  };
  _ctor.prototype.playBadAnim = function () {
    var e = this;
    this.badAnim.node.active = true;
    this.badAnim.setAnimation(0, "animation", true);
    var t = parseInt(this.labBad.text);
    var o = r_ExpSystem.ExpSystem.getBad();
    var i = o - t;
    var n = function () {
      t++;
      e.labBad.text = t + "";
      if (t >= o) {
        e.badAnim.unschedule(n);
        e.badAnim.node.active = false;
      }
    };
    this.badAnim.schedule(n, .3, i);
  };
  _ctor.prototype.setRelaxExp = function () {
    this.labName.text = r_ExpSystem.ExpSystem.getLevelName();
    this.nextLevel.text = r_ExpSystem.ExpSystem.getNextLevelName();
    this.labBad.text = r_ExpSystem.ExpSystem.getBad() + "";
    this.labGood.text = r_ExpSystem.ExpSystem.getGood() + "";
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("yanchi");
    r_TimeSystem.TimeSystem.scheduleClear("await");
    this.vieoName.length > 0 && r_SoundMgr.SoundMgr.stopSound(this.vieoName);
  };
  _ctor.prototype.onClickStart = function () {
    var e = r_RelaxSystem.RelaxSystem.getRelaxTaskId();
    var t = r_RelaxLevelCfg.RelaxTaskCfg[e];
    if (t.playTip > 0) {
      r_UtilsSystem.UtilsSystem.showAlert(r_RelaxLevelCfg.RelaxPlayTipCfg[t.playTip], 0, this.enterGame.bind(this, e), this, "提示");
    } else {
      this.enterGame(e);
    }
  };
  _ctor.prototype.enterGame = function (e) {
    var t = this;
    this.btnStart.visible = false;
    this.btnJujue.visible = false;
    this.contentPane.getTransition("t0").play();
    var o = r_RelaxLevelCfg.RelaxTaskCfg[e];
    this.vieoName.length > 0 && r_SoundMgr.SoundMgr.stopSound(this.vieoName);
    var i = o.id;
    this.vieoName = "city85/video_" + i + "_1";
    r_SoundMgr.SoundMgr.playSound(this.vieoName);
    r_TimeSystem.TimeSystem.scheduleOnce("yanchi", .25, function () {
      t.labDesc.text = o.okBubble;
      r_TimeSystem.TimeSystem.scheduleOnce("await", o.okTime, function () {
        r_RelaxSystem.RelaxSystem.startLevel(e);
      });
    });
  };
  _ctor.prototype.loadRole = function (e, t) {
    this.vieoName.length > 0 && r_SoundMgr.SoundMgr.stopSound(this.vieoName);
    var o = t ? t.id : 0;
    this.vieoName = "city85/video_" + o + "_" + (2 == this.contentPane.getController("c1").selectedIndex ? 2 : 0);
    r_SoundMgr.SoundMgr.playSound(this.vieoName);
    var i = t ? t.roleId : 0;
    e.node.active = false;
    for (var n = 0; n < e.node.children.length; n++) {
      var a = e.node.children[n];
      a.getComponent(sp.Skeleton) && a.destroy();
    }
    r_ResSystem.ResSystem.loadBundleRes("game1", "city85/W_" + i, cc.Prefab, function (t, o) {
      var i = cc.instantiate(o);
      var n = i.getComponent(sp.Skeleton);
      e.url = "";
      e.node.addChild(i);
      n.setAnimation(0, "animation", true);
      i.active = true;
      e.node.active = true;
    });
  };
  _ctor.prototype.onClcikRefresh = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("85同城刷新任务", function () {
      r_RelaxSystem.RelaxSystem.refreshRelaxTaskId();
      e.data = null;
      e.restart();
    });
  };
  _ctor.prototype.onClcikJujue = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("85同城刷新任务", function () {
      r_RelaxSystem.RelaxSystem.addTaskId();
      r_RelaxSystem.RelaxSystem.refreshRelaxTaskId();
      e.data = null;
      e.restart();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_City85UI;