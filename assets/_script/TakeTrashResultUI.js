var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_BigSmallUI = require("BigSmallUI");
var def_TakeTrashResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.TakeTrash, r_UIDef.UIDef.Res.UI.TakeTrashResultUI) || this;
    t.showAnimFlag = true;
    t.isTouch = true;
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
    this.show(r_UIDef.UIDef.Urls.UI.TakeTrashResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TakeTrashResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnGuakai, this.btnSelect0, this.btnSelect1, this.btnSelect2, this.btnSelect3, this.btnSelect4, this.btnSelect5, this.btnSelect6, this.btnSelect7);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.black.node.off(cc.Node.EventType.TOUCH_START);
    this.black.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("onClickbtnSelect");
  };
  _ctor.prototype.onClickbtnSelect0 = function () {
    this.isTouch && this.missTake();
  };
  _ctor.prototype.onClickbtnSelect1 = function () {
    if (this.isTouch) {
      r_UtilsSystem.UtilsSystem.showTipTrash("成功打开保险箱，获得52万");
      r_PlayerData.PlayerData.addCoin("倒垃圾奖励", 52e4, r_ReportSystem.SystemKey.倒垃圾, false);
      this.imgIcon.url = "ui://" + r_UIDef.UIDef.Pack.TakeTrash + "/icon24";
      this.isTouch = false;
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnSelect", 2, this.hide.bind(this));
    }
  };
  _ctor.prototype.onClickbtnSelect2 = function () {
    this.isTouch && this.missTake();
  };
  _ctor.prototype.onClickbtnSelect3 = function () {
    this.isTouch && this.missTake();
  };
  _ctor.prototype.onClickbtnSelect4 = function () {
    if (this.isTouch) {
      if (Math.random() < .5) {
        r_UtilsSystem.UtilsSystem.showTipTrash("打开垃圾后发现竟然有大量金币，获得22w现金");
        r_PlayerData.PlayerData.addCoin("倒垃圾奖励", 22e4, r_ReportSystem.SystemKey.倒垃圾, false);
        this.imgIcon.url = "ui://" + r_UIDef.UIDef.Pack.TakeTrash + "/icon28";
      } else {
        r_UtilsSystem.UtilsSystem.showTipTrash("打开发现一袋子陈年臭垃圾，被臭进了医院，交了22w医药费");
        if (r_PlayerData.PlayerData.isCoinEnough(22e4)) {
          r_PlayerData.PlayerData.deleteCoin("倒垃圾惩罚", 22e4, r_ReportSystem.SystemKey.倒垃圾, false);
        } else {
          r_PlayerData.PlayerData.deleteCoin("倒垃圾惩罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.倒垃圾, false);
        }
        this.imgIcon.url = "ui://" + r_UIDef.UIDef.Pack.TakeTrash + "/icon30";
      }
      this.isTouch = false;
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnSelect", 2, this.hide.bind(this));
    }
  };
  _ctor.prototype.onClickbtnSelect5 = function () {
    if (this.isTouch) {
      this.hide();
      r_UtilsSystem.UtilsSystem.showTip("你扔掉了一袋垃圾");
    }
  };
  _ctor.prototype.onClickbtnSelect6 = function () {
    if (this.isTouch) {
      r_UtilsSystem.UtilsSystem.showTipTrash("祖国不会辜负正直的青年，奖励你66w现金");
      r_PlayerData.PlayerData.addCoin("倒垃圾奖励", 66e4, r_ReportSystem.SystemKey.倒垃圾, false);
      this.isTouch = false;
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnSelect", 2, this.hide.bind(this));
    }
  };
  _ctor.prototype.onClickbtnSelect7 = function () {
    var e = this;
    if (this.isTouch) {
      r_UtilsSystem.UtilsSystem.showTipTrash("因使用不当导致自爆，你因此赔偿50w现金");
      this.imgIcon.visible = false;
      r_UtilsSystem.UtilsSystem.playAnim(this.hedan, "animation", false);
      r_SoundMgr.SoundMgr.playSound("takeTrash/baozha");
      if (r_PlayerData.PlayerData.isCoinEnough(5e5)) {
        r_PlayerData.PlayerData.deleteCoin("倒垃圾惩罚", 5e5, r_ReportSystem.SystemKey.倒垃圾, false);
      } else {
        r_PlayerData.PlayerData.deleteCoin("倒垃圾惩罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.倒垃圾, false);
      }
      this.isTouch = false;
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnSelect", 2, function () {
        e.imgIcon.visible = true;
        e.hedan.visible = false;
        e.hide();
      });
    }
  };
  _ctor.prototype.onClickbtnGuakai = function () {
    if (this.isTouch) {
      r_BigSmallUI.default.showUI();
      this.hide();
    }
  };
  _ctor.prototype.missTake = function () {
    r_UtilsSystem.UtilsSystem.showTip("密码错误");
    this.hide();
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.index;
    this.hedan.visible = false;
    this.imgIcon.visible = true;
    this.isTouch = true;
    if (1 == this.data.index) {
      this.imgIcon.url = "ui://" + r_UIDef.UIDef.Pack.TakeTrash + "/icon23";
    } else {
      2 == this.data.index && (this.imgIcon.url = "ui://" + r_UIDef.UIDef.Pack.TakeTrash + "/icon27");
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnGuakai")], _ctor.prototype, "btnGuakai", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect0")], _ctor.prototype, "btnSelect0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect1")], _ctor.prototype, "btnSelect1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect2")], _ctor.prototype, "btnSelect2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect3")], _ctor.prototype, "btnSelect3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect4")], _ctor.prototype, "btnSelect4", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect5")], _ctor.prototype, "btnSelect5", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect6")], _ctor.prototype, "btnSelect6", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect7")], _ctor.prototype, "btnSelect7", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgIcon")], _ctor.prototype, "imgIcon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hedan")], _ctor.prototype, "hedan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("black")], _ctor.prototype, "black", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_TakeTrashResultUI;