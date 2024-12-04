var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_HouseSystem = require("HouseSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_PokonyanSystem = require("PokonyanSystem");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PokonyanCfg = require("PokonyanCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_DrawLineCom = require("DrawLineCom");
var r_PokonyanDebugUI = require("PokonyanDebugUI");
var def_PokonyanUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pokonyan, r_UIDef.UIDef.Res.UI.PokonyanUI) || this;
    t.showAnimFlag = false;
    t.btnSelects = [];
    t.m_type = -1;
    t.m_isDrawEnd = false;
    t.m_awardData = null;
    t.m_debugData = null;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PokonyanUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PokonyanUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnOut, this.btnVideo, this.btnGo, this.btnRefresh, this.btnStart, this.btnGet, this.btnDouble, this.btnMIanchu, this.btnDebug);
    for (var o = 0; o < 4; o++) {
      var i = this.selectPanel.getChild("btnSelect" + o);
      this.btnSelects.push(i);
      i.onClick(this.onClickSelect.bind(this, o), this);
    }
    r_ResSystem.ResSystem.loadBundleRes("game4", "pokonyan/pokonyanDraw", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.prefabDraw = cc.instantiate(o);
      t.prefabDraw.active = true;
      t.draw.node.addChild(t.prefabDraw);
      t.drawCom = t.prefabDraw.getChildByName("pokonyanDraw").getComponent(r_DrawLineCom.default);
      t.drawCom.drawEndCallBack = t.drawEnd.bind(t);
      t.contentPane.visible = true;
      t.drawCom.start();
      t.m_isDrawEnd = false;
    });
    r_ResSystem.ResSystem.loadBundleRes("game4", "pokonyan/pokonyanClear", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.clear.node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.contentPane.visible = true;
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("cleanSuccess");
    r_SoundMgr.SoundMgr.stopSound("timao");
  };
  _ctor.prototype.restart = function () {
    this.m_type = -1;
    if (0 == r_PlayerData.PlayerData.data.pokonyanVideoNum) {
      this.contentPane.getController("mode").selectedIndex = 0;
    } else {
      this.contentPane.getController("mode").selectedIndex = 1;
    }
    if (this.drawCom) {
      this.drawCom.start();
      this.m_isDrawEnd = false;
    }
    this.m_awardData = null;
    this.contentPane.getTransition("init").play();
    this.m_debugData = null;
  };
  _ctor.prototype.onClickbtnOut = function () {
    this.hide();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("进入新年许愿", function () {
      e.contentPane.getController("mode").selectedIndex = 1;
      r_UtilsSystem.UtilsSystem.showBubble(e.bubble, "小伙子，就是你唤醒了我多啦大B？作为回报，我可以实现你的一个新年愿望");
    });
  };
  _ctor.prototype.onClickbtnGo = function () {
    var e = this;
    this.contentPane.getController("mode").selectedIndex = 2;
    r_UtilsSystem.UtilsSystem.showBubble(this.bubble, "在我的头上画出你的愿望图案，我会读取并帮你实现它");
    r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnGo", 3, function () {
      e.change3();
    });
  };
  _ctor.prototype.onClickSelect = function (e) {
    this.m_type = e;
    this.selectPanel.getController("c1").selectedIndex = e;
  };
  _ctor.prototype.change3 = function () {
    this.m_type = -1;
    this.m_isDrawEnd = false;
    this.btnStart.visible = true;
    this.btnRefresh.visible = true;
    this.contentPane.getController("mode").selectedIndex = 3;
    this.selectPanel.getController("c1").selectedIndex = 4;
    this.imgCat.visible = false;
    this.enabledSelectBtn(true);
    if (0 == r_PlayerData.PlayerData.data.pokonyanVideoNum) {
      this.btnStart.getController("c1").selectedIndex = 0;
    } else {
      this.btnStart.getController("c1").selectedIndex = 1;
    }
    r_PlayerData.PlayerData.data.pokonyanVideoNum = 1;
    r_PlayerData.PlayerData.saveData();
    this.contentPane.getTransition("t0").play();
  };
  _ctor.prototype.drawEnd = function () {
    this.m_isDrawEnd = true;
  };
  _ctor.prototype.cleanSuccess = function () {
    var e = this;
    this.nameCom.visible = true;
    this.nameCom.getChild("title").text = this.m_awardData.name;
    r_TimeSystem.TimeSystem.scheduleOnce("cleanSuccess", 1, function () {
      e.contentPane.getController("mode").selectedIndex = 5;
      e.showResult();
      r_SoundMgr.SoundMgr.stopSound("timao");
    });
  };
  _ctor.prototype.showResult = function () {
    this.labDec.visible = false;
    this.labDec.text = "已拥有，转化为金币";
    this.m_coin = this.m_awardData.coin;
    this.labName.text = this.m_awardData.name;
    switch (this.m_type) {
      case 0:
        if (this.m_awardData.id <= r_HouseSystem.HouseSystem.getHouseData().hasHouseId) {
          this.contentPane.getController("c1").selectedIndex = 1;
          this.labDec.visible = true;
        } else {
          this.contentPane.getController("c1").selectedIndex = 0;
          this.labUnlock.text = "恭喜你解锁新的房产";
        }
        break;
      case 1:
        if (this.m_coin >= 0) {
          this.contentPane.getController("c1").selectedIndex = 1;
          this.labDec.visible = true;
          this.labDec.text = "转换为金币";
        } else {
          this.contentPane.getController("c1").selectedIndex = 2;
        }
        break;
      case 2:
        if (r_SecretUpSystem.SecretUpSystem.hasSecret(this.m_awardData.id)) {
          this.contentPane.getController("c1").selectedIndex = 1;
          this.labDec.visible = true;
        } else {
          this.contentPane.getController("c1").selectedIndex = 0;
          this.labUnlock.text = "恭喜你解锁新的秘书";
        }
        break;
      case 3:
        var e = r_PokonyanCfg.PokonyanCoinPrCfg[this.m_awardData.id];
        this.m_coin = r_UtilsSystem.UtilsSystem.randomPercentFromArray(e).coin;
        this.m_debugData && 3 == this.m_debugData[0] && (this.m_coin = 0 == this.m_debugData[1] ? -1e10 : 1e10);
        if (this.m_coin >= 0) {
          this.contentPane.getController("c1").selectedIndex = 1;
        } else {
          this.contentPane.getController("c1").selectedIndex = 2;
        }
    }
    this.labCoin.text = r_UtilsSystem.UtilsSystem.numFormats(this.m_coin);
    var t = this.m_coin >= 0 ? "win" : "fail";
    r_SoundMgr.SoundMgr.playSound(t);
  };
  _ctor.prototype.cleanAllSuccess = function () {};
  _ctor.prototype.onClickbtnRefresh = function () {
    this.drawCom.start();
    this.m_isDrawEnd = false;
  };
  _ctor.prototype.onClickbtnStart = function () {
    var e = this;
    if (-1 != this.m_type) {
      if (this.m_isDrawEnd) {
        if (!this.contentPane.getTransition("angle").playing) {
          if (1 == this.btnStart.getController("c1").selectedIndex) {
            r_PlatformSystem.PlatformSystem.showVideo("新年愿望开始许愿", function () {
              e.setStart();
            });
          } else {
            this.setStart();
          }
        }
      } else {
        r_UtilsSystem.UtilsSystem.showTip("请画出您心中所想");
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("请选择你的愿望");
    }
  };
  _ctor.prototype.setStart = function () {
    var e = this;
    if (!this.contentPane.getTransition("angle").playing) {
      this.btnStart.visible = false;
      this.btnRefresh.visible = false;
      this.enabledSelectBtn(false);
      this.contentPane.getTransition("angle").play(function () {
        e.draw.scaleX = e.draw.scaleY = 1;
        e.contentPane.getController("mode").selectedIndex = 4;
        e.nameCom.visible = false;
        e.eraseCom.startClean();
        e.showAward();
        e.drawCom.start();
      });
    }
  };
  _ctor.prototype.enabledSelectBtn = function (e) {
    for (var t = 0; t < 4; t++) {
      var o = this.selectPanel.getChild("btnSelect" + t);
      o.enabled = e;
      o.grayed = false;
    }
  };
  _ctor.prototype.onClickbtnGet = function () {
    this.getAward();
    this.contentPane.getTransition("init").play();
    this.change3();
    this.m_debugData = null;
  };
  _ctor.prototype.onClickbtnMIanchu = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("新年愿望免除惩罚", function () {
      e.getAward(true);
      e.contentPane.getTransition("init").play();
      e.change3();
      e.m_debugData = null;
    });
  };
  _ctor.prototype.onClickbtnDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("新年愿望双倍奖励", function () {
      e.getAward(true);
      e.contentPane.getTransition("init").play();
      e.change3();
      e.m_debugData = null;
    });
  };
  _ctor.prototype.onClickbtnDebug = function () {
    r_Index.Platform.isDarenPlatform() && r_PokonyanDebugUI.default.showUI({
      ui: this
    });
  };
  _ctor.prototype.showAward = function () {
    this.m_awardData = r_PokonyanSystem.PokonyanSystem.getAwardData(this.m_type, r_PokonyanSystem.PokonyanSystem.getRandAward(this.m_type));
    if (this.m_debugData) {
      this.m_awardData = r_PokonyanCfg.PokonyanAwardCf[this.m_debugData[0]][this.m_debugData[1]];
      this.m_type = this.m_debugData[0];
    }
    r_ResSystem.ResSystem.loadBundleFguiImg(this.award, "game4", "pokonyan/icon/icon_" + this.m_type + "_" + this.m_awardData.id);
  };
  _ctor.prototype.getAward = function (e) {
    undefined === e && (e = false);
    var t = e ? 2 * this.m_awardData.coin : this.m_awardData.coin;
    switch (this.m_type) {
      case 0:
        if (this.m_awardData.id <= r_HouseSystem.HouseSystem.getHouseData().hasHouseId) {
          r_PlayerData.PlayerData.addCoin("新年许愿奖励", t, r_ReportSystem.SystemKey.新年许愿);
        } else {
          r_HouseSystem.HouseSystem.buyHouseId(this.m_awardData.id);
        }
        break;
      case 1:
        if (t >= 0) {
          r_PlayerData.PlayerData.addCoin("新年许愿奖励", t, r_ReportSystem.SystemKey.新年许愿);
        } else {
          if (e) {
            return;
          }
          if (r_PlayerData.PlayerData.isCoinEnough(-t)) {
            r_PlayerData.PlayerData.deleteCoin("新年许愿惩罚", -t, r_ReportSystem.SystemKey.新年许愿);
          } else {
            r_PlayerData.PlayerData.deleteCoin("新年许愿惩罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.新年许愿);
          }
        }
        break;
      case 2:
        if (r_SecretUpSystem.SecretUpSystem.hasSecret(this.m_awardData.id)) {
          r_PlayerData.PlayerData.addCoin("新年许愿奖励", t, r_ReportSystem.SystemKey.新年许愿);
        } else {
          r_SecretUpSystem.SecretUpSystem.addSecret({
            id: this.m_awardData.id
          });
        }
        break;
      case 3:
        r_PokonyanCfg.PokonyanCoinPrCfg[this.m_awardData.id];
        var o = e ? 2 * this.m_coin : this.m_coin;
        if (o >= 0) {
          r_PlayerData.PlayerData.addCoin("新年许愿奖励", o, r_ReportSystem.SystemKey.新年许愿);
        } else {
          if (e) {
            return;
          }
          if (r_PlayerData.PlayerData.isCoinEnough(-o)) {
            r_PlayerData.PlayerData.deleteCoin("新年许愿惩罚", -o, r_ReportSystem.SystemKey.新年许愿);
          } else {
            r_PlayerData.PlayerData.deleteCoin("新年许愿惩罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.新年许愿);
          }
        }
    }
  };
  _ctor.prototype.setDebugData = function (e) {
    this.m_debugData = e;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOut")], _ctor.prototype, "btnOut", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGo")], _ctor.prototype, "btnGo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRefresh")], _ctor.prototype, "btnRefresh", undefined);
  __decorate([r_DecorateFunction1.AutoFind("draw")], _ctor.prototype, "draw", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clear")], _ctor.prototype, "clear", undefined);
  __decorate([r_DecorateFunction1.AutoFind("selectPanel")], _ctor.prototype, "selectPanel", undefined);
  __decorate([r_DecorateFunction1.AutoFind("award")], _ctor.prototype, "award", undefined);
  __decorate([r_DecorateFunction1.AutoFind("titleCom")], _ctor.prototype, "titleCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("nameCom")], _ctor.prototype, "nameCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labUnlock")], _ctor.prototype, "labUnlock", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labDec")], _ctor.prototype, "labDec", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labCoin")], _ctor.prototype, "labCoin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMIanchu")], _ctor.prototype, "btnMIanchu", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labName")], _ctor.prototype, "labName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgCat")], _ctor.prototype, "imgCat", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble")], _ctor.prototype, "bubble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDebug")], _ctor.prototype, "btnDebug", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_PokonyanUI;