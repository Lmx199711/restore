var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_BehaviorMgr = require("BehaviorMgr");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_CommonTipUI = require("CommonTipUI");
var r_WoodenPeopleUI = require("WoodenPeopleUI");
var def_WoodenPeopleResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.WoodenPeople, r_UIDef.UIDef.Res.UI.WoodenPeopleResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.WoodenPeopleResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WoodenPeopleResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnGet.onClick(this.clickGet, this);
    this.btnDouble.onClick(this.clickGetDouble, this);
    this.btnBack.onClick(this.clickBack, this);
    this.btnAgain.onClick(this.clickAgain, this);
    this.btnClose.onClick(this.clickClose, this);
    this.btnCaidan.onClick(this.clickCaidan, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.btnCaidan.getController("type").selectedIndex = 0;
    this.contentPane.getController("c1").selectedIndex = this.data.mode - 1;
    r_PlayerData.PlayerData.data.woodenPeopleMap.getNick && 2 == this.data.mode && (this.contentPane.getController("c1").selectedIndex = 3);
    this.labMoney.text = r_UtilsSystem.UtilsSystem.numFormats(1e6);
    if (r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan && r_PlayerData.PlayerData.data.woodenPeopleMap.getNick) {
      this.btnClose.visible = false;
      this.btnCaidan.visible = false;
    } else {
      this.btnClose.visible = true;
      3 != this.data.mode && 2 != this.data.mode && 4 != this.data.mode || (this.btnClose.visible = false);
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.callback && this.data.callback();
  };
  _ctor.prototype.clickGet = function () {
    this.hide();
    r_WoodenPeopleUI.WoodenPeopleUI.hide();
    if (1 == this.data.mode) {
      r_PlayerData.PlayerData.addCoin("热梗合集", 1e6);
    } else if (r_PlayerData.PlayerData.data.woodenPeopleMap.getNick) {
      r_PlayerData.PlayerData.addCoin("热梗合集", 1e6);
    } else {
      r_PlayerData.PlayerData.data.woodenPeopleMap.getNick = 1;
      r_PlayerData.PlayerData.saveData();
      r_PlayerData.PlayerData.addCoin("热梗合集", 3e7);
    }
  };
  _ctor.prototype.clickGetDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("热梗合集双倍领取", function () {
      e.hide();
      r_WoodenPeopleUI.WoodenPeopleUI.hide();
      if (1 == e.data.mode) {
        r_PlayerData.PlayerData.addCoin("热梗合集", 2e6);
      } else if (r_PlayerData.PlayerData.data.woodenPeopleMap.getNick) {
        r_PlayerData.PlayerData.addCoin("热梗合集", 2e6);
      } else {
        r_PlayerData.PlayerData.data.woodenPeopleMap.getNick = 1;
        r_PlayerData.PlayerData.saveData();
        r_PlayerData.PlayerData.addCoin("热梗合集", 6e7);
      }
    });
  };
  _ctor.prototype.clickBack = function () {
    this.hide();
    r_WoodenPeopleUI.WoodenPeopleUI.hide();
  };
  _ctor.prototype.clickAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("热梗合集再来一次", function () {
      e.hide();
      r_WoodenPeopleUI.WoodenPeopleUI.Inst && r_WoodenPeopleUI.WoodenPeopleUI.Inst.againStartGame();
    });
  };
  _ctor.prototype.clickClose = function () {
    r_PlayerData.PlayerData.addCoin("热梗合集", 1e6);
    this.hide();
    r_BehaviorMgr.BehaviorMgr.trigger("显示场景2");
  };
  _ctor.prototype.clickCaidan = function () {
    var e = this;
    if (1 == this.btnCaidan.getController("type").selectedIndex) {
      r_CommonTipUI.CommonTipUI.showUI({
        desc: "第1步：点击过关弹窗右上角关闭按钮\n第2步：游戏开始后，连续点击树5次，可获得加特林装备\n第3步：用新武器可在50次内击败NPC"
      });
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("热梗合集获取彩蛋", function () {
        e.btnCaidan.getController("type").selectedIndex = 1;
        r_CommonTipUI.CommonTipUI.showUI({
          desc: "第1步：点击过关弹窗右上角关闭按钮\n第2步：游戏开始后，连续点击树5次，可获得加特林装备\n第3步：用新武器可在50次内击败NPC"
        });
      });
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCaidan")], _ctor.prototype, "btnCaidan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labMoney")], _ctor.prototype, "labMoney", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_WoodenPeopleResultUI;