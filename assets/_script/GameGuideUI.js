var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_GameGuideSystem = require("GameGuideSystem");
var r_PlayerData = require("PlayerData");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_TYIndex = require("TYIndex");
var r_BaseWin = require("BaseWin");
var r_LevelRoleUI = require("LevelRoleUI");
var r_MainHomeUI = require("MainHomeUI");
var r_BattleUpUI = require("BattleUpUI");
var r_RoleGirlUI = require("RoleGirlUI");
var def_GameGuideUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.GameGuide, r_UIDef.UIDef.Res.UI.GameGuideUI) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    r_TYIndex.UIWind.hideAllNotMain();
    this.show(r_UIDef.UIDef.Urls.UI.GameGuideUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GameGuideUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.sortingOrder = 10;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {
    this.startGuide();
  };
  _ctor.finishStep = function (e) {
    if (r_GameGuideSystem.GameGuideSystem.curGuideStep == e && _ref__ctor.Inst) {
      r_GameGuideSystem.GameGuideSystem.curGuideStep = r_GameGuideSystem.GameGuideSystem.curGuideStep + 1;
      if (r_GameGuideSystem.GameGuideSystem.curGuideStep > _ref__ctor.lenthCfg[r_PlayerData.PlayerData.data.gameGuide]) {
        r_PlayerData.PlayerData.data.gameGuide++;
        6 == r_PlayerData.PlayerData.data.gameGuide && r_GameGuideSystem.GameGuideSystem.addStory();
        r_PlayerData.PlayerData.saveData();
        r_GameGuideSystem.GameGuideSystem.init();
        this.hide();
      } else {
        _ref__ctor.Inst.startGuide();
      }
    }
  };
  _ctor.prototype.startGuide = function () {
    if (r_PlayerData.PlayerData.data.gameGuide == r_GameGuideSystem.GameGuideState.点击与升级教程) {
      var e = r_GameGuideSystem.GameGuideSystem.cfg[r_GameGuideSystem.GameGuideSystem.curGuideStep];
      r_GameGuideSystem.GameGuideSystem.curGuideStep.toString();
      this.content.text = e.content;
      if (1 == r_GameGuideSystem.GameGuideSystem.curGuideStep) {
        if (!r_MainHomeUI.default.Inst) {
          return;
        }
        var t = r_MainHomeUI.default.Inst.btnGuide0;
        this.startRect(t.localToGlobal(), t.width, t.height, e);
      } else if (2 == r_GameGuideSystem.GameGuideSystem.curGuideStep) {
        if (!r_MainHomeUI.default.Inst) {
          return;
        }
        t = r_MainHomeUI.default.Inst.btnEquip;
        this.startRect(t.localToGlobal(), t.width, t.height, e);
      } else if (3 == r_GameGuideSystem.GameGuideSystem.curGuideStep) {
        if (!r_LevelRoleUI.LevelRoleUI.Inst) {
          return;
        }
        t = r_LevelRoleUI.LevelRoleUI.Inst.btnUp;
        this.startRect(t.localToGlobal(), t.width, t.height, e);
      } else if (4 == r_GameGuideSystem.GameGuideSystem.curGuideStep) {
        if (!r_LevelRoleUI.LevelRoleUI.Inst) {
          return;
        }
        t = r_LevelRoleUI.LevelRoleUI.Inst.btnClose;
        this.startRect(t.localToGlobal(), t.width, t.height, e);
      }
    } else if (r_PlayerData.PlayerData.data.gameGuide == r_GameGuideSystem.GameGuideState.挑战教程) {
      e = r_GameGuideSystem.GameGuideSystem.cfg2[r_GameGuideSystem.GameGuideSystem.curGuideStep];
      r_GameGuideSystem.GameGuideSystem.curGuideStep.toString();
      this.content.text = e.content;
      if (1 == r_GameGuideSystem.GameGuideSystem.curGuideStep) {
        if (!r_MainHomeUI.default.Inst) {
          return;
        }
        t = r_MainHomeUI.default.Inst.btnBattle;
        this.startRect(t.localToGlobal(), t.width, t.height, e);
      } else if (2 == r_GameGuideSystem.GameGuideSystem.curGuideStep) {
        if (!r_BattleUpUI.default.instace) {
          return;
        }
        t = r_BattleUpUI.default.instace.getItemBtnBattle();
        this.startRect(t.localToGlobal(), t.width, t.height, e);
      }
    } else if (r_PlayerData.PlayerData.data.gameGuide == r_GameGuideSystem.GameGuideState.助理教程) {
      e = r_GameGuideSystem.GameGuideSystem.cfg3[r_GameGuideSystem.GameGuideSystem.curGuideStep];
      r_GameGuideSystem.GameGuideSystem.curGuideStep.toString();
      this.content.text = e.content;
      if (1 == r_GameGuideSystem.GameGuideSystem.curGuideStep) {
        if (!r_MainHomeUI.default.Inst) {
          return;
        }
        t = r_MainHomeUI.default.Inst.btnSecretNew;
        this.startRect(t.localToGlobal(), t.width, t.height, e);
      } else if (2 == r_GameGuideSystem.GameGuideSystem.curGuideStep) {
        if (!r_RoleGirlUI.RoleGirlUI.Inst) {
          return;
        }
        t = r_RoleGirlUI.RoleGirlUI.Inst.getItemBtn(0);
        this.startRect(t.localToGlobal(), t.width, t.height, e);
      }
    }
  };
  _ctor.prototype.startRect = function (e, t, o, i) {
    this.guideRect.visible = true;
    var n = this.guideRect.globalToLocal(e.x, e.y);
    this.guideRect.getChild("rect").x = n.x;
    this.guideRect.getChild("rect").y = n.y;
    this.guideRect.getChild("rect").width = t;
    this.guideRect.getChild("rect").height = o;
    var a = this.contentPane.globalToLocal(e.x + i.label[0], e.y - i.label[1]);
    this.content.x = a.x;
    this.content.y = a.y;
    var s = this.contentPane.globalToLocal(e.x, e.y);
    var r = s.x - this.finger.width + i.finger[0];
    var c = s.y - i.finger[1];
    cc.tween(this.finger).to(.3, {
      x: r,
      y: c
    }).start();
  };
  _ctor.lenthCfg = {
    1: 4,
    3: 2,
    5: 2
  };
  __decorate([r_DecorateFunction1.AutoFind("content")], _ctor.prototype, "content", undefined);
  __decorate([r_DecorateFunction1.AutoFind("guideRect")], _ctor.prototype, "guideRect", undefined);
  __decorate([r_DecorateFunction1.AutoFind("finger")], _ctor.prototype, "finger", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_GameGuideUI;