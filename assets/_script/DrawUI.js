var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawUI = undefined;
var r_UIDef = require("UIDef");
var r_DrawCardSystem = require("DrawCardSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_DrawCardUI = require("DrawCardUI");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var r_DrawCardCfg = require("DrawCardCfg");
var r_ReportSystem = require("ReportSystem");
var exp_DrawUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.DrawCard, r_UIDef.UIDef.Res.UI.DrawUI) || this;
    t.baodiRemain1 = 0;
    t.baodiRemain2 = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.DrawUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DrawUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      return t.hide();
    });
    this.btnBack.onClick(function () {
      return t.hide();
    });
    this.btnDraw1.onClick(this.draw1.bind(this));
    this.btnDraw5.onClick(this.draw5.bind(this));
    this.anim.animationName = "animation";
    this.anim.loop = true;
    this.anim.playing = true;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.refreshAll();
    r_TimeSystem.TimeSystem.schedule("towerDraw", 1, this.updateSecond.bind(this));
    this.updateTime();
    r_SoundMgr.SoundMgr.playMusic("secretbgm2");
    this.refreshFree();
  };
  _ctor.prototype.refreshFree = function () {
    if (r_PlayerData.PlayerData.data.secretFireDraw) {
      this.btnDraw5.getController("c1").selectedIndex = 1;
    } else {
      this.btnDraw5.getController("c1").selectedIndex = 0;
      var e = this.btnDraw5.getChild("anim");
      e.loop = true;
      e.animationName = "step_4";
      e.playing = true;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.scheduleClear("towerDraw");
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_PlayerData.PlayerData.data.gameGuide;
  };
  _ctor.prototype.updateSecond = function () {
    this.updateTime();
  };
  _ctor.prototype.updateTime = function () {
    if (r_TimeSystem.TimeSystem.getServerTime() > r_PlayerData.PlayerData.data.drawData1.nextTime) {
      var e = r_DrawCardSystem.DrawCardSystem.getDrawCardCfgById(1);
      e.cost;
      e.count;
      e.type;
      e.weight;
      e.desc;
      var t = e.drawTimes;
      e.drawCool;
      r_PlayerData.PlayerData.data.drawData1.total % t == 0 && this.refreshPool1();
      this.txtTime.visible = false;
      this.txtCost.visible = true;
      this.contentPane.getChild("n15").visible = true;
    } else {
      r_PlayerData.PlayerData.data.drawData1.nextTime;
      this.txtTime.text = "刷新时间:" + r_DrawCardSystem.DrawCardSystem.countDownTime();
      this.txtTime.visible = true;
    }
  };
  _ctor.prototype.refreshAll = function () {
    this.txtRemainTime = this.btnDraw1.getChild("txtRemainTime");
    this.refreshPool1();
    this.refreshPool2();
  };
  _ctor.prototype.refreshDrawNum = function () {
    this.refreshPool1();
    this.refreshPool2();
  };
  _ctor.prototype.refreshPool1 = function () {
    this.baodiRemain1 = r_DrawCardSystem.DrawCardSystem.getRemainCount(1);
    var e = r_DrawCardSystem.DrawCardSystem.getDrawCardCfgById(1);
    this.txtDesc1.text = e.desc.replace("#", this.baodiRemain1 + "");
    this.txtCost.text = "消耗：" + r_UtilsSystem.UtilsSystem.getShowCoin(e.cost);
    var t = r_DrawCardSystem.DrawCardSystem.getRemainTimes();
    this.txtRemainTime.text = "(" + t + "/" + e.drawTimes + ")";
    this.btnDraw1.enabled = true;
  };
  _ctor.prototype.refreshPool2 = function () {
    var e = r_DrawCardSystem.DrawCardSystem.getDrawCardCfgById(2);
    e.count;
    var t = e.desc;
    this.baodiRemain2 = r_DrawCardSystem.DrawCardSystem.getRemainCount(2);
    this.txtDesc2.text = t.replace("#", this.baodiRemain2 + "");
  };
  _ctor.prototype.draw1 = function () {
    var e = r_DrawCardSystem.DrawCardSystem.getDrawCardCfgById(1);
    var t = e.cost;
    e.count;
    e.type;
    e.weight;
    e.desc;
    e.drawTimes;
    e.drawCool;
    if (r_DrawCardSystem.DrawCardSystem.getRemainTimes() <= 0) {
      r_UtilsSystem.UtilsSystem.showTip("次数不足哦");
    } else if (r_PlayerData.PlayerData.isCoinEnough(t)) {
      r_PlayerData.PlayerData.deleteCoin("单词抽秘书", t, r_ReportSystem.SystemKey.秘书);
      r_DrawCardSystem.DrawCardSystem.addTotal(1);
      this.refreshAll();
      var o = [r_DrawCardSystem.DrawCardSystem.getWeightDrawCard(1, 0 == r_DrawCardSystem.DrawCardSystem.getRemainCount(1))];
      r_DrawCardUI.DrawCardUI.showUI({
        num: 1,
        data: o
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.draw5 = function () {
    if (!r_PlayerData.PlayerData.data.secretFireDraw) {
      r_DrawCardSystem.DrawCardSystem.addTotal(2);
      var e = r_DrawCardCfg.DrawFreeFireCfg;
      r_PlayerData.PlayerData.data.secretFireDraw = 1;
      r_DrawCardUI.DrawCardUI.showUI({
        num: 5,
        data: e
      });
      return void this.refreshFree();
    }
    r_PlatformSystem.PlatformSystem.showVideo("秘书-五连抽", function () {
      r_DrawCardSystem.DrawCardSystem.addTotal(2);
      var e = [];
      for (var t = 0; t < 5; t++) {
        if (2 != t) {
          e.push(r_DrawCardSystem.DrawCardSystem.getWeightDrawCard(2, false));
        } else {
          e.push(r_DrawCardSystem.DrawCardSystem.getWeightDrawCard(2, 0 == r_DrawCardSystem.DrawCardSystem.getRemainCount(2)));
        }
      }
      r_DrawCardUI.DrawCardUI.showUI({
        num: 5,
        data: e
      });
    });
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtCost")], _ctor.prototype, "txtCost", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDraw1")], _ctor.prototype, "btnDraw1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDraw5")], _ctor.prototype, "btnDraw5", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc1")], _ctor.prototype, "txtDesc1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc2")], _ctor.prototype, "txtDesc2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtTime")], _ctor.prototype, "txtTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  return _ctor;
}(r_TYIndex.UIWind);
exports.DrawUI = exp_DrawUI;