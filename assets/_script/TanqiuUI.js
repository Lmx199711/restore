var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_StreetMarble = require("StreetMarble");
var r_PlayerData = require("PlayerData");
var r_TanqiuCfg = require("TanqiuCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_jsbi = require("jsbi");
var r_PlatformSystem = require("PlatformSystem");
var r_ReportSystem = require("ReportSystem");
var r_BaseWin = require("BaseWin");
var r_TaskSystem = require("TaskSystem");
var r_TaskCfg = require("TaskCfg");
var r_FguiResSystem = require("FguiResSystem");
var def_TanqiuUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Tanqiu, r_UIDef.UIDef.Res.UI.TanqiuUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "index", {
    get: function () {
      return this.m_index;
    },
    set: function (e) {
      this.m_index = 3 == e ? 1 : 4 == e ? 2 : e;
      5 == e && (this.m_index = 3);
      this.contentPane.getController("c1").selectedIndex = this.m_index;
      var t = r_TanqiuCfg.TanqiuMenkangCfg[this.m_index];
      this.contentPane.getController("c2").selectedIndex = r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, t.toString()) ? 1 : 0;
      this.labPrice.text = r_UtilsSystem.UtilsSystem.getShowCoin(t);
      var o = r_TanqiuCfg.TanqiuPriceCfg[this.m_index];
      this.btnStart.title = r_UtilsSystem.UtilsSystem.getShowCoin(o);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TanqiuUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TanqiuUI);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.imgMask.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.restart();
    var t = this.data.index || 0;
    this.changeScene(t);
    r_PlayerData.PlayerData.isGame = true;
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    _ctor.instance = this;
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.btnStart = this.contentPane.getChild("btnStart");
    this.btnStart.onClick(this.onClickStart, this);
    this.btnVideo = this.contentPane.getChild("btnVideo");
    this.btnVideo.onClick(this.onClickVideo, this);
    this.imgMask = this.contentPane.getChild("imgMask");
    this.effect = this.contentPane.getChild("effect");
    this.imgHot = this.contentPane.getChild("imgHot");
    this.labPrice = this.contentPane.getChild("labPrice");
    for (var o = 0; o < 6; o++) {
      this["btnNum" + o] = this.contentPane.getChild("btnNum" + o);
      this["btnNum" + o].onClick(this.changeScene.bind(this, o), this);
    }
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.showView(false);
    this.btnNum5.visible = this.checkIsCaidan();
    r_ResSystem.ResSystem.loadBundleRes("wenzi1", "prefab/街头弹珠/街头弹珠", cc.Prefab, function (t, o) {
      return __awaiter(e, undefined, undefined, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
              this.prefab = cc.instantiate(o);
              this.contentPane.getChild("center").node.addChild(this.prefab);
              this.streetMarble = this.prefab.getComponent(r_StreetMarble.default);
              return [4, this.streetMarble.loadPreload()];
            case 1:
              e.sent();
              this.changeScene(this.m_index);
              this.next();
              return [2];
          }
        });
      });
    });
  };
  _ctor.prototype.next = function () {
    this.showView(true);
    cc.log("PlayerData.data.tanqiuVideo", r_PlayerData.PlayerData.data.tanqiuVideo);
  };
  _ctor.prototype.changeCaidan = function () {
    if (this.checkIsCaidan()) {
      this.changeScene(5);
      return void (this.btnNum5.visible = true);
    }
  };
  _ctor.prototype.checkIsCaidan = function () {
    return r_PlayerData.PlayerData.data.tanqiuVideo % 4 == 0 && r_TYIndex.Platform.isDarenPlatform() && 0 != r_PlayerData.PlayerData.data.tanqiuVideo || 3 == r_PlayerData.PlayerData.data.tanqiuVideo && !r_TYIndex.Platform.isDarenPlatform();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.streetMarble.colse();
    this.imgMask.node.off(cc.Node.EventType.TOUCH_START);
    this.prefab.destroy();
    this.prefab = null;
    this.streetMarble = null;
    r_PlayerData.PlayerData.isGame = false;
  };
  _ctor.prototype.onClickStart = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_TanqiuCfg.TanqiuPriceCfg[this.m_index])) {
      r_PlayerData.PlayerData.data.tanqiuNum++;
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.弹球);
      r_PlayerData.PlayerData.deleteCoin("弹球门票", r_TanqiuCfg.TanqiuPriceCfg[this.m_index], r_ReportSystem.SystemKey.弹球);
      this.showView(false);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.showView = function (e) {
    this.imgMask.visible = e;
    this.btnStart.visible = e;
    this.btnVideo.visible = e;
    this.imgHot.visible = e;
    for (var t = 0; t < 5; t++) {
      this["btnNum" + t].visible = e;
    }
    this.checkIsCaidan() && (this.btnNum5.visible = e);
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("弹球爽一局", function () {
      r_PlayerData.PlayerData.data.tanqiuNum++;
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.弹球);
      e.showView(false);
      if (e.checkIsCaidan() && 3 == e.index) {
        r_PlayerData.PlayerData.data.tanqiuVideo++;
        return void e.streetMarble.setBlackHole2();
      }
      e.checkIsCaidan() || 2 != e.index || r_PlayerData.PlayerData.data.tanqiuVideo++;
      e.streetMarble.setBlackHole();
    });
  };
  _ctor.prototype.changeScene = function (e) {
    this.index = e;
    this.streetMarble && this.streetMarble.changeScene();
  };
  _ctor.prototype.playEffect = function () {
    cc.tween(this.effect).to(.5, {
      alpha: 1
    }).to(.5, {
      alpha: 0
    }).start();
  };
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_TanqiuUI;