var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_CaidanSystem = require("CaidanSystem");
var r_FguiGestureSys = require("FguiGestureSys");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_PoolSystem = require("PoolSystem");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ElevenTickCfg = require("ElevenTickCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_EraseCom = require("EraseCom");
var r_BaseWin = require("BaseWin");
var def_ElevenTickUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.ElevenTickUI) || this;
    t.showAnimFlag = false;
    t.result = [];
    t.count = 0;
    t.continueNum = 0;
    t.m_timeId = 0;
    t.isOnce = true;
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
    this.show(r_UIDef.UIDef.Urls.UI.ElevenTickUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ElevenTickUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.visible = false;
    this.initCaidanPos = cc.v2(this.caidan.x, this.caidan.y);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.hongbao, "ui://Lottery/hongbao111", 1, this.contentPane);
    r_CaidanSystem.CaidanSystem.bindBtn("elevenTick", this.btnTip, "elevenTickCaidan");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/elevenTick", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.contentPane.visible = true;
      t.restart();
    });
    r_ResSystem.ResSystem.loadBundleRes("game3", "elevenTick/bgg", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      i.y = 400;
      t.particle.node.addChild(i);
      i.active = false;
      t.particleNode = i;
    });
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("elevenTickCaidan", this.caidan, this.caidan, this.btnPhone1, function () {
      if (0 == r_PlayerData.PlayerData.data.elevenTickCaidanNum || r_Index.Platform.isDarenPlatform()) {
        t.btnPhone.visible = true;
        t.caidan.visible = false;
      } else {
        t.caidan.x = t.initCaidanPos.x;
        t.caidan.y = t.initCaidanPos.y;
      }
    });
    this.bindBtnCallback(this.btnPhone, this.btnRob, this.btnAgain);
  };
  _ctor.prototype.cleanSuccess = function () {};
  _ctor.prototype.cleanAllSuccess = function () {
    r_PlayerData.PlayerData.addCoin("双12中奖", this.count, r_ReportSystem.SystemKey.彩票);
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("desHongbao");
    r_TimeSystem.TimeSystem.scheduleClear("texiao");
    r_TimeSystem.TimeSystem.scheduleClear("imgDahongbao");
    r_TimeSystem.TimeSystem.scheduleClear("animCoin");
    r_TimeSystem.TimeSystem.scheduleClear("animend");
  };
  _ctor.prototype.restart = function () {
    this.prefab && this.setView(null);
  };
  _ctor.prototype.setView = function (e) {
    var t = this;
    this.initCaidan();
    this.continueNum = 0;
    this.eraseCom.startClean();
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.elevenTickCaidanNum], r_PlayerData.PlayerData.data.elevenTickCaidan);
    this.btnAgain.visible = false;
    if (e) {
      this.result = e.concat();
    } else {
      this.result = [];
      for (var o = 0; o < 6; o++) {
        var i = r_UtilsSystem.UtilsSystem.getRandomFromArr(r_ElevenTickCfg.ElevenTickCfg).coin;
        this.result.push(i);
      }
    }
    this.count = 0;
    this.result.forEach(function (e, o) {
      t.contentPane.getChild("lab" + o).text = r_UtilsSystem.UtilsSystem.numFormats(e);
      t.count += e;
    });
    this.contentPane.getChild("labCount").text = r_UtilsSystem.UtilsSystem.numFormats(this.count);
    this.imgIcon.url = "ui://Lottery/icon" + r_UtilsSystem.UtilsSystem.getRandomNum(0, 3);
  };
  _ctor.prototype.onClickbtnPhone = function () {
    if (this.btnPhone.visible) {
      this.continueNum = 0;
      this.contentPane.getController("c1").selectedIndex = 1;
      this.contentPane.getTransition("t1").play();
    }
  };
  _ctor.prototype.onClickbtnRob = function () {
    var e = this;
    this.contentPane.getController("c1").selectedIndex = 2;
    r_TimeSystem.TimeSystem.schedule("dorpHongbao", .2, function () {
      var t = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.hongbao);
      t.y = -t.height;
      t.x = r_UtilsSystem.UtilsSystem.getRandomNum(50, 480);
      t.visible = true;
      t.getChild("icon").visible = true;
      t.getChild("anim").visible = false;
      t.alpha = 1;
      t.clearClick();
      t.onceClick(function () {
        e.continueNum++;
        cc.Tween.stopAllByTarget(t);
        t.getChild("icon").visible = false;
        t.getChild("anim").visible = true;
        r_TimeSystem.TimeSystem.scheduleOnce("desHongbao" + e.m_timeId++, .3, function () {
          r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.hongbao, t);
        });
        r_UtilsSystem.UtilsSystem.playAnim(t.getChild("anim"), "animation", false);
        e.labContinue.getChild("labContinue").text = e.continueNum + "";
        e.labContinue.getTransition("t0").play();
        r_PlayerData.PlayerData.addCoin("双12小红包彩蛋", r_ElevenTickCfg.ElevenTickSmallPacket, r_ReportSystem.SystemKey.彩票);
      }, e);
      cc.Tween.stopAllByTarget(t);
      cc.tween(t).to(3, {
        y: cc.view.getCanvasSize().height / cc.view.getScaleY() + t.height
      }).call(function () {
        r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.hongbao, t);
      }).start();
    }, 50);
    r_TimeSystem.TimeSystem.scheduleOnce("texiao", 8, function () {
      e.contentPane.getTransition("t2").play();
      e.particleNode.active = true;
    });
    r_TimeSystem.TimeSystem.scheduleOnce("imgDahongbao", 10, function () {
      e.imgDahongbao.visible = true;
      e.imgDahongbao.scaleX = e.imgDahongbao.scaleY = .3;
      e.imgDahongbao.y = -e.imgDahongbao.height / 2 * .3;
      var t = 516 + (cc.view.getCanvasSize().height / cc.view.getScaleY() - 1334) / 2;
      cc.tween(e.imgDahongbao).to(2, {
        y: t
      }).call(function () {
        1 == e.imgDahongbao.scaleX && e.playt4();
      }).start();
      e.imgDahongbao.clearClick();
      e.imgDahongbao.onClick(function () {
        if (e.imgDahongbao.scaleX < 1) {
          e.imgDahongbao.scaleX = e.imgDahongbao.scaleY += .1;
        } else {
          e.imgDahongbao.y == t && e.playt4();
        }
      });
    });
  };
  _ctor.prototype.playt4 = function () {
    var e = this;
    if (this.isOnce) {
      this.isOnce = false;
      this.contentPane.getTransition("t4").play();
      r_TimeSystem.TimeSystem.scheduleOnce("animCoin", 1.5, function () {
        e.animCoin.visible = true;
        r_UtilsSystem.UtilsSystem.playAnim(e.animCoin, "animation2", false);
      });
      r_UtilsSystem.UtilsSystem.playAnim(this.dahongbao, "animation", false);
      r_TimeSystem.TimeSystem.scheduleOnce("animend", 5.75, function () {
        r_PlayerData.PlayerData.data.elevenTickCaidanNum = 1;
        e.contentPane.getController("c1").selectedIndex = 0;
        r_PlayerData.PlayerData.addCoin("双12大红包彩蛋", r_ElevenTickCfg.ElevenTickBigPacket, r_ReportSystem.SystemKey.彩票);
        e.setView(r_ElevenTickCfg.ElevenTickCaidanCfg);
      });
    }
  };
  _ctor.prototype.initCaidan = function () {
    this.contentPane.getTransition("t2").stop();
    this.imgCaise.alpha = 0;
    this.imgCaise1.alpha = 0;
    this.isOnce = true;
    this.caidan.x = this.initCaidanPos.x;
    this.caidan.y = this.initCaidanPos.y;
    this.caidan.visible = true;
    this.particleNode && (this.particleNode.active = false);
    this.imgDahongbao.visible = false;
    this.dahongbao.visible = false;
    this.animCoin.visible = false;
    this.btnPhone.visible = false;
  };
  _ctor.prototype.onClickbtnAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双12门票", function () {
      e.btnAgain.visible = false;
      e.restart();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("particle")], _ctor.prototype, "particle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgIcon")], _ctor.prototype, "imgIcon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("caidan")], _ctor.prototype, "caidan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPhone")], _ctor.prototype, "btnPhone", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPhone1")], _ctor.prototype, "btnPhone1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animLi")], _ctor.prototype, "animLi", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRob")], _ctor.prototype, "btnRob", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labContinue")], _ctor.prototype, "labContinue", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgDahongbao")], _ctor.prototype, "imgDahongbao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animCoin")], _ctor.prototype, "animCoin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dahongbao")], _ctor.prototype, "dahongbao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgCaise")], _ctor.prototype, "imgCaise", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgCaise1")], _ctor.prototype, "imgCaise1", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ElevenTickUI;