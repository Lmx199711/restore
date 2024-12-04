var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_BartenderCfg = require("BartenderCfg");
var r_FguiGestureSys = require("FguiGestureSys");
var r_BartenderSystem = require("BartenderSystem");
var r_ResSystem = require("ResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_BartenderResultUI = require("BartenderResultUI");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_BartenderTipUI = require("BartenderTipUI");
var r_BartenderCaidanUI = require("BartenderCaidanUI");
var r_FguiResSystem = require("FguiResSystem");
var def_BartenderUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bartender, r_UIDef.UIDef.Res.UI.BartenderUI) || this;
    t.uiType = "fullScreen";
    t.m_posList = [];
    t.m_waterList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BartenderUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BartenderUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    var o = r_BartenderCfg.BartenderPropCfg;
    this.cup = this.contentPane.getChild("cup");
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.btnStart = this.contentPane.getChild("btnStart");
    this.btnStart.onClick(this.onClickStart, this);
    this.btnVideo = this.contentPane.getChild("btnVideo");
    this.btnVideo.onClick(this.onClickVideo, this);
    this.prop0 = this.contentPane.getChild("prop0");
    this.prop1 = this.contentPane.getChild("prop1");
    this.prop2 = this.contentPane.getChild("prop2");
    this.imgResult = this.contentPane.getChild("imgResult");
    this.head = this.contentPane.getChild("head");
    this.bubble = this.contentPane.getChild("bubble");
    this.m_posList = [];
    for (var i = 1; i <= o.length; i++) {
      this["water" + i] = this.contentPane.getChild("water" + i);
      r_FguiGestureSys.FguiGestureSys.bindMoveEvent("water" + i, this["water" + i], this["water" + i], this.cup, this.hitSucc.bind(this, i));
      this.m_posList.push(cc.v2(this["water" + i].x, this["water" + i].y));
    }
    this.water6.on(fgui.Event.TOUCH_END, this.onTouchEnd, this);
    r_ResSystem.ResSystem.loadBundleRes("game2", "bartender/naic", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        t.roleAnim = i.getComponent(sp.Skeleton);
        t.roleAnim.setCompleteListener(t.onConpleteAnim.bind(t));
        t.restart();
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
    _ctor.instace = this;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
    r_TimeSystem.TimeSystem.scheduleClear("showResult");
  };
  _ctor.prototype.restart = function () {
    if (this.roleAnim) {
      this.bubble.visible = false;
      this.contentPane.getController("c1").selectedIndex = 0;
      this.contentPane.getController("lcok").selectedIndex = 0;
      this.imgResult.visible = false;
      this.m_waterList = [];
      this.updateProp();
      this.cup.url = "ui://Bartender/摇杯";
      this.cup.visible = true;
      this.roleAnim.setAnimation(0, "daiji", true);
      var e = r_BartenderCfg.BartenderPropCfg;
      for (var t = 1; t <= e.length; t++) {
        this["water" + t].visible = true;
        this["water" + t].x = this.m_posList[t - 1].x;
        this["water" + t].y = this.m_posList[t - 1].y;
      }
    }
  };
  _ctor.prototype.onClickStart = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
    this.allEnabl(true);
  };
  _ctor.prototype.hitSucc = function (e) {
    this["water" + e].visible = false;
    this.addWater(e);
  };
  _ctor.prototype.addWater = function (e) {
    if (this.m_waterList.length >= 3) {
      this.allEnabl(false);
    } else if (!this.m_waterList.includes(e)) {
      this.m_waterList.push(e);
      this.updateProp();
      this.allEnabl(false);
      this.cup.url = "ui://Bartender/摇杯2";
      this.cup.visible = false;
      var t = r_BartenderCfg.BartenderPropCfg.find(function (t) {
        return t.id == e;
      });
      this.roleAnim.setAnimation(0, t.animation, false);
      r_SoundMgr.SoundMgr.playSound("bartender/" + t.sound);
    }
  };
  _ctor.prototype.updateProp = function () {
    for (var e = 0; e < 3; e++) {
      var t = this.m_waterList[e];
      if (t) {
        this["prop" + e].getController("c1").selectedIndex = 1;
        this["prop" + e].getChild("icon").url = "ui://Bartender/name" + t;
      } else {
        this["prop" + e].getController("c1").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.allEnabl = function (e) {
    var t = r_BartenderCfg.BartenderPropCfg;
    for (var o = 1; o <= t.length; o++) {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("water" + o, e);
    }
  };
  _ctor.prototype.onConpleteAnim = function () {
    var e = this;
    switch (this.roleAnim.animation) {
      case "dao_kafei":
      case "dao_niunai":
      case "dao_shui":
      case "dao_chaye":
      case "dao_ningmeng":
      case "dao_jiu":
      case "dao_bk":
        if (this.m_waterList.length >= 3) {
          this.allEnabl(false);
          this.contentPane.getController("c1").selectedIndex = 2;
          this.m_resultId = r_BartenderSystem.BartenderSystem.getBartendResult(this.m_waterList);
          cc.log("t_id: ", this.m_resultId);
          var t = r_BartenderSystem.BartenderSystem.getBarById(this.m_resultId);
          cc.log("t_info: ", t);
          this.roleAnim.setAnimation(0, "yao", false);
          r_SoundMgr.SoundMgr.playSound("bartender/摇晃饮料");
        } else {
          this.allEnabl(true);
          this.roleAnim.setAnimation(0, "daiji", true);
          this.cup.visible = true;
        }
        break;
      case "kai_1":
      case "kai_2":
        if (!(t = r_BartenderSystem.BartenderSystem.getBarById(this.m_resultId))) {
          return;
        }
        r_BartenderResultUI.default.showUI(t, function () {
          e.restart();
          r_BartenderSystem.BartenderSystem.saveBar(t.id) && r_TimeSystem.TimeSystem.scheduleOnce("barCaidan", 1, function () {
            r_BartenderCaidanUI.default.showUI();
          });
        });
        break;
      case "yao":
        t = r_BartenderSystem.BartenderSystem.getBarById(this.m_resultId);
        this.roleAnim.setAnimation(0, t.isSucc ? "kai_1" : "kai_2", false);
        r_SoundMgr.SoundMgr.playSound(t.isSucc ? "bartender/成功发光" : "bartender/失败爆炸");
        r_TimeSystem.TimeSystem.scheduleOnce("showResult", 1, function () {
          e.imgResult.visible = true;
          e.imgResult.url = t.isSucc ? "ui://Bartender/" + t.id : "ui://Bartender/bad";
        });
        break;
      case "hejiu":
        this.bubble.visible = true;
        r_SoundMgr.SoundMgr.playSound("bartender/这酒有点上头");
        this.roleAnim.setAnimation(0, "weixun_1", true);
        break;
      case "weixun_1":
        r_BartenderTipUI.default.showUI();
    }
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("解锁毛台", function () {
      e.contentPane.getController("lcok").selectedIndex = 1;
    });
  };
  _ctor.prototype.onTouchEnd = function (e) {
    if (this.head.hitTest(e.pos)) {
      r_SoundMgr.SoundMgr.playSound("bartender/喝水");
      this.roleAnim.setAnimation(0, "hejiu", false);
      this.water6.visible = false;
      this.allEnabl(false);
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_BartenderUI;