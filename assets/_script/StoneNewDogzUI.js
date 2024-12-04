var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_StoneNewSystem = require("StoneNewSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_BaseWin = require("BaseWin");
var r_StoneNewCaidanUI = require("StoneNewCaidanUI");
var r_StoneNewDebugUI = require("StoneNewDebugUI");
var def_StoneNewDogzUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.StoneNew, r_UIDef.UIDef.Res.UI.StoneNewDogzUI) || this;
    t.loadnum = 0;
    t.animKey = {
      22: "daiji_4",
      23: "daiji_1",
      24: "daiji_2",
      25: "daiji_3"
    };
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StoneNewDogzUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneNewDogzUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.loadnum = 0;
    this.bindBtnCallback(this.dan, this.btnStart);
    for (var o = 22; o <= 25; o++) {
      r_ResSystem.ResSystem.loadBundleRes("game3", "stoneNew/stoneAnim" + o, cc.Prefab, function (e, o) {
        if (!e) {
          var i = cc.instantiate(o);
          t["anim" + i.name].node.addChild(i);
          t.loadnum++;
          t.loadnum >= 4 && t.restart();
        }
      });
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instance = this;
    this.bg.node.off(cc.Node.EventType.TOUCH_START);
    this.bg.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.restart();
    this.randomIndex = null;
    this.animHecheng.visible = false;
    this.animStart.visible = false;
    this.dan.visible = true;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instance = null;
  };
  _ctor.prototype.restart = function () {
    this.loadnum < 4 || this.refreshDogz();
  };
  _ctor.prototype.refreshDogz = function () {
    var e = r_PlayerData.PlayerData.data.stoneNewCaidan;
    for (var t in e) {
      this["dogz" + t].visible = e[t] > 0;
      if (e[t] > 0) {
        this["anim" + t].visible = true;
      } else {
        this["anim" + t].visible = false;
      }
    }
  };
  _ctor.prototype.onClickdan = function () {
    r_Index.Platform.isDarenPlatform() && r_StoneNewDebugUI.default.showUI();
  };
  _ctor.prototype.onClickbtnStart = function () {
    var e = this;
    if (!(this.loadnum < 4)) {
      if (r_StoneNewSystem.StoneNewSystem.chceckCaidan()) {
        var t = r_PlayerData.PlayerData.data.stoneNewCaidan;
        for (var o in t) this["dogz" + o].visible = false;
        this.animHecheng.visible = true;
        r_UtilsSystem.UtilsSystem.playAnim(this.animHecheng, "hechang", false);
        r_TimeSystem.TimeSystem.scheduleOnce("hecheng1", 1.5, function () {
          e.animStart.visible = true;
          e.dan.visible = false;
          r_UtilsSystem.UtilsSystem.playAnim(e.animStart, "dan", false);
        });
        r_TimeSystem.TimeSystem.scheduleOnce("hecheng2", 4, function () {
          r_StoneNewCaidanUI.default.showUI({
            randomIndex: e.randomIndex
          });
        });
      } else {
        r_UtilsSystem.UtilsSystem.showTip("材料不足");
      }
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dogz22")], _ctor.prototype, "dogz22", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dogz23")], _ctor.prototype, "dogz23", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dogz24")], _ctor.prototype, "dogz24", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dogz25")], _ctor.prototype, "dogz25", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim22")], _ctor.prototype, "anim22", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim23")], _ctor.prototype, "anim23", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim24")], _ctor.prototype, "anim24", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim25")], _ctor.prototype, "anim25", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dan")], _ctor.prototype, "dan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dan")], _ctor.prototype, "bg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animStart")], _ctor.prototype, "animStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animHecheng")], _ctor.prototype, "animHecheng", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_StoneNewDogzUI;