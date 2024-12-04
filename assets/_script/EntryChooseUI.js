var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_EntryResultUI = require("EntryResultUI");
var r_EntrySecurityUI = require("EntrySecurityUI");
var def_EntryChooseUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Entry, r_UIDef.UIDef.Res.UI.EntryChooseUI) || this;
    t.uiType = "fullScreen";
    t.txtList = ["温柔地对待他人，他们也会还给你温暖", "你要善良，要勇敢，要像星星一样努力发光", "愿你坚定而柔软，自信且谦逊，阳光而皎洁"];
    t.txt2List = ["不听不听，王八念经！", "你是我的小呀小苹果~", "天底下竟然有这么漂亮的人！", "老板！是我有眼不识泰山啊！"];
    t.m_bbIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EntryChooseUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EntryChooseUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("game2", "entry/baoan2", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        t.contentPane.visible = true;
        var i = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        t.baoanAnim = i.getComponent(sp.Skeleton);
        t.bindBtnCallback(t.btnFIght, t.btnVideo, t.btnChoose, t.btnSlect0, t.btnSlect1, t.btnSlect2);
        t.restart();
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instance = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instance = null;
    r_TimeSystem.TimeSystem.scheduleClear("bubble0_step");
    r_TimeSystem.TimeSystem.scheduleClear("bubble1_step");
    r_TimeSystem.TimeSystem.scheduleClear("visibleBtn");
    r_TimeSystem.TimeSystem.scheduleClear("onClickbtnSlect");
    r_TimeSystem.TimeSystem.scheduleClear("OpenResult");
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    if (this.baoanAnim) {
      this.baoanAnim.setAnimation(0, "1_daiji", true);
      this.roleAnim.loop = true;
      this.roleAnim.animationName = "1_daiji";
      this.roleAnim.playing = true;
    }
  };
  _ctor.prototype.onClickbtnFIght = function () {
    r_EntrySecurityUI.default.showUI();
    this.hide();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("保安以德服人", function () {
      e.step1();
    });
  };
  _ctor.prototype.step1 = function () {
    var e = this;
    this.bubble0.visible = false;
    this.bubble1.visible = false;
    this.btnChoose.visible = false;
    this.contentPane.getController("c1").selectedIndex = 1;
    this.baoanAnim.setAnimation(0, "1_daiji", true);
    this.bubble1.getChild("labBubble").text = this.txt2List[0];
    this.roleAnim.playing = false;
    this.roleAnim.loop = true;
    this.roleAnim.animationName = "1_daiji";
    this.roleAnim.playing = true;
    this.contentPane.getTransition("move").play(function () {
      e.changeBubble();
      r_TimeSystem.TimeSystem.schedule("bubble0_step", 3, e.changeBubble.bind(e));
    });
    r_TimeSystem.TimeSystem.scheduleOnce("bubble1_step", 2, function () {
      e.bubble1.visible = true;
    });
    r_TimeSystem.TimeSystem.scheduleOnce("visibleBtn", 3, function () {
      e.btnChoose.visible = true;
    });
  };
  _ctor.prototype.changeBubble = function () {
    this.bubble0.visible = true;
    this.bubble0.alpha = 0;
    var e = this.m_bbIndex++ % this.txtList.length;
    this.bubble0.getChild("labBubble").text = this.txtList[e];
    cc.tween(this.bubble0).to(.5, {
      alpha: 1
    }).start();
  };
  _ctor.prototype.onClickbtnChoose = function () {
    this.step2();
  };
  _ctor.prototype.step2 = function () {
    this.bubble1.visible = false;
    r_TimeSystem.TimeSystem.scheduleClear("bubble0_step");
    r_TimeSystem.TimeSystem.scheduleClear("bubble1_step");
    r_TimeSystem.TimeSystem.scheduleClear("visibleBtn");
    this.m_isTouch = true;
    this.contentPane.getController("c1").selectedIndex = 2;
  };
  _ctor.prototype.onClickbtnSlect0 = function () {
    var e = this;
    if (this.m_isTouch) {
      this.m_isTouch = false;
      this.roleAnim.playing = false;
      this.roleAnim.loop = false;
      this.roleAnim.animationName = "2_tangseng";
      this.bubble1.getChild("labBubble").text = this.txt2List[1];
      this.roleAnim.playing = true;
      r_SoundMgr.SoundMgr.playSound("entry/变身唐僧");
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnSlect", 2, function () {
        e.baoanAnim.setAnimation(0, "2_yaogun", true);
        e.bubble1.visible = true;
      });
      r_TimeSystem.TimeSystem.scheduleOnce("OpenResult", 5, function () {
        r_EntryResultUI.default.showUI(0);
      });
    }
  };
  _ctor.prototype.onClickbtnSlect1 = function () {
    var e = this;
    if (this.m_isTouch) {
      this.m_isTouch = false;
      this.roleAnim.playing = false;
      this.roleAnim.loop = false;
      this.roleAnim.animationName = "3_nvzhuang";
      this.bubble1.getChild("labBubble").text = this.txt2List[2];
      this.roleAnim.playing = true;
      r_SoundMgr.SoundMgr.playSound("entry/变身女装");
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnSlect", 2, function () {
        e.baoanAnim.setAnimation(0, "3_huachi", true);
        e.bubble1.visible = true;
      });
      r_TimeSystem.TimeSystem.scheduleOnce("OpenResult", 5, function () {
        r_EntryResultUI.default.showUI(1);
      });
    }
  };
  _ctor.prototype.onClickbtnSlect2 = function () {
    var e = this;
    if (this.m_isTouch) {
      this.m_isTouch = false;
      this.roleAnim.playing = false;
      this.roleAnim.loop = false;
      this.roleAnim.animationName = "4_fuhao";
      this.bubble1.getChild("labBubble").text = this.txt2List[3];
      this.roleAnim.playing = true;
      r_SoundMgr.SoundMgr.playSound("entry/变身老板");
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnSlect", 2, function () {
        e.baoanAnim.setAnimation(0, "4_guidi", true);
        e.bubble1.visible = true;
      });
      r_TimeSystem.TimeSystem.scheduleOnce("OpenResult", 5, function () {
        r_EntryResultUI.default.showUI(2);
      });
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnFIght")], _ctor.prototype, "btnFIght", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnChoose")], _ctor.prototype, "btnChoose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSlect0")], _ctor.prototype, "btnSlect0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSlect1")], _ctor.prototype, "btnSlect1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSlect2")], _ctor.prototype, "btnSlect2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("center")], _ctor.prototype, "center", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble0")], _ctor.prototype, "bubble0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble1")], _ctor.prototype, "bubble1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleAnim")], _ctor.prototype, "roleAnim", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_EntryChooseUI;