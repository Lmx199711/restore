var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_FlirtingGirlCom = require("FlirtingGirlCom");
var r_SKUtilsSystem = require("SKUtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_TimeSystem = require("TimeSystem");
var r_FguiResSystem = require("FguiResSystem");
var def_FlirtingGirlUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FlirtingGirl, r_UIDef.UIDef.Res.UI.FlirtingGirlUI) || this;
    t.uiType = "fullScreen";
    t.m_maxTouchNum = 10;
    t.touchNum = 0;
    t.m_isTouch = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FlirtingGirlUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FlirtingGirlUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.btnBaoZou = this.contentPane.getChild("btnBaoZou");
    this.btnBaoZou.onClick(this.onClickBaoZou, this);
    this.btnNao = this.contentPane.getChild("btnNao");
    this.btnNao.onClick(this.onClickNao, this);
    this.centerNode = this.contentPane.getChild("center");
    this.btnFlirting = this.contentPane.getChild("btnFlirting");
    this.btnFlirting.onClick(this.onClickFlirting, this);
    this.btnKiss = this.contentPane.getChild("btnKiss");
    this.btnKiss.onClick(this.onClickKiss, this);
    this.btnGun = this.contentPane.getChild("btnGun");
    this.btnGun.onClick(this.onClickGun, this);
    this.btnBug = this.contentPane.getChild("btnBug");
    this.btnBug.onClick(this.onClickBug, this);
    this.btnImg = this.contentPane.getChild("btnImg");
    this.pointTarget = this.contentPane.getChild("pointTarget");
    this.btnGun.getChild("ske").loop = true;
    this.btnGun.getChild("ske").animationName = "gunzi";
    this.btnGun.getChild("ske").playing = true;
    this.btnKiss.getChild("ske").loop = true;
    this.btnKiss.getChild("ske").animationName = "zuiba";
    this.btnKiss.getChild("ske").playing = true;
    this.btnBug.getChild("ske").loop = true;
    this.btnBug.getChild("ske").animationName = "chong";
    this.btnBug.getChild("ske").playing = true;
    this.addGamePrefab();
  };
  _ctor.prototype.addGamePrefab = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("game3", "flirtingGirl/prefab/FlirtingGirlPrefab", cc.Prefab, function (t, o) {
      if (t) {
        console.error("加载失败: ", t);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        var i = cc.instantiate(o);
        e.centerNode.node.addChild(i);
        i.active = true;
        e.flirtingGirlCom = i.getComponent(r_FlirtingGirlCom.default);
        e.flirtingGirlCom.resetStart();
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = 0;
    this.btnBaoZou.node.off(cc.Node.EventType.TOUCH_START);
    this.btnBaoZou.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    _ctor.instace = this;
    this.btnNao.visible = false;
    this.btnFlirting.visible = false;
    this.btnBaoZou.visible = true;
    this.btnImg.visible = false;
    r_PlatformSystem.PlatformSystem.startRecorder();
    this.touchNum = 0;
    this.flirtingGirlCom && this.flirtingGirlCom.resetStart();
  };
  _ctor.prototype.onClickBaoZou = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    this.touchNum++;
    this.touchNum == this.m_maxTouchNum && (this.btnFlirting.visible = true);
    var e = r_SKUtilsSystem.SKUtilsSystem.getRandomNum(180, 500);
    var t = r_SKUtilsSystem.SKUtilsSystem.getRandomNum(260, 800);
    this.btnBaoZou.x = e;
    this.btnBaoZou.y = t;
  };
  _ctor.prototype.onClickNao = function () {
    this.flirtingGirlCom && this.flirtingGirlCom.naoyang();
  };
  _ctor.prototype.showNaoBtn = function () {
    this.btnNao.visible = true;
    this.btnBaoZou.visible = false;
    this.btnFlirting.visible = false;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
    r_PlatformSystem.PlatformSystem.stopRecorder();
    this.flirtingGirlCom && this.flirtingGirlCom.endGame();
  };
  _ctor.prototype.onClickFlirting = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("调戏小姐姐彩蛋", function () {
      e.contentPane.getController("c1").selectedIndex = 2;
      e.flirtingGirlCom.roleCaidan();
      e.m_isTouch = true;
    });
  };
  _ctor.prototype.onClickGun = function () {
    var e = this;
    if (this.m_isTouch) {
      this.setTimeTouchOut(2.5);
      this.showTween(0, cc.v2(this.btnGun.x, this.btnGun.y), function () {
        e.flirtingGirlCom.gun();
        e.btnImg.visible = false;
      });
    }
  };
  _ctor.prototype.onClickKiss = function () {
    var e = this;
    if (this.m_isTouch) {
      this.setTimeTouchOut(2.5);
      this.showTween(1, cc.v2(this.btnKiss.x, this.btnKiss.y), function () {
        e.flirtingGirlCom.kiss();
        e.btnImg.visible = false;
      });
    }
  };
  _ctor.prototype.onClickBug = function () {
    var e = this;
    if (this.m_isTouch) {
      this.setTimeTouchOut(2.5);
      this.showTween(2, cc.v2(this.btnBug.x, this.btnBug.y), function () {
        e.flirtingGirlCom.bug();
        e.btnImg.visible = false;
      });
    }
  };
  _ctor.prototype.showTween = function (e, t, o) {
    this.btnImg.x = t.x;
    this.btnImg.y = t.y;
    this.btnImg.visible = true;
    this.btnImg.url = "ui://FlirtingGirl/itm" + e;
    cc.tween(this.btnImg).to(.3, {
      x: this.pointTarget.x,
      y: this.pointTarget.y
    }).call(o).start();
  };
  _ctor.prototype.setTimeTouchOut = function (e) {
    var t = this;
    this.m_isTouch = false;
    r_TimeSystem.TimeSystem.scheduleOnce("delayTouch", e, function () {
      t.m_isTouch = true;
    });
  };
  _ctor.instace = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_FlirtingGirlUI;