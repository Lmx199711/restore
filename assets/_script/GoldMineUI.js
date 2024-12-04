var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoldMineUI = undefined;
var r_UIDef = require("UIDef");
var r_FarmCfg = require("FarmCfg");
var r_FarmSystem = require("FarmSystem");
var r_PlayerData = require("PlayerData");
var r_PoolSystem = require("PoolSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_GoldResultUI = require("GoldResultUI");
var exp_GoldMineUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.GoldMineUI) || this;
    t.isTouch = false;
    t.timer = 30;
    t.itemList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GoldMineUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GoldMineUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.BKBaoWu, "ui://Farm/itemCom", 1, this.contentPane);
    this.btnBack.onClick(this.hide, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("GoldMineUpdata");
    this.touch.off(fgui.Event.TOUCH_BEGIN);
    this.settlement();
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.touchEvent();
    this.contentPane.getChild("tip").visible = true;
    r_PlayerData.PlayerData.data.farmCD1Num = 0;
    this.isTouch = false;
    this.timer = 30;
    this.timeText.text = "" + Math.floor(this.timer);
    this.contentPane.getTransition("t0").play(function () {
      t.isTouch = true;
    });
    r_TimeSystem.TimeSystem.scheduleClear("GoldMineUpdata");
    r_TimeSystem.TimeSystem.schedule("GoldMineUpdata", .25, function () {
      if (t.isTouch) {
        t.timer -= .25;
        if (t.timer < 0) {
          t.isTouch = false;
          t.timer = 0;
          t.hide();
        }
        t.timeText.text = "" + Math.floor(t.timer);
      }
    });
  };
  _ctor.prototype.randId = function () {
    var e = Math.floor(3 * Math.random());
    if (0 == e) {
      return "qian";
    }
    if (1 == e) {
      return "zhuans";
    }
    var t = Math.random();
    var o = 0;
    for (var i = 0; i < r_FarmCfg.FarmCfg.length; i++) {
      var n = r_FarmCfg.FarmCfg[i];
      if (t < (o += n.rate / 100)) {
        return n.id;
      }
    }
  };
  _ctor.prototype.touchEvent = function () {
    var e = this;
    this.touch.on(fgui.Event.TOUCH_BEGIN, function (t) {
      if (e.isTouch) {
        e.contentPane.getChild("tip").visible = false;
        var o = cc.v2(t.pos.x, t.pos.y);
        var i = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.BKBaoWu);
        i.x = o.x;
        i.y = o.y;
        var n = Math.random() * e.mbPos.width - e.mbPos.width / 2;
        var a = Math.random() * e.mbPos.height - e.mbPos.height / 2;
        var s = e.randId();
        var l = false;
        for (var p = 0; p < e.itemList.length; p++) {
          if (s == e.itemList[p].id) {
            e.itemList[p].num += 1;
            e.itemList[p].value += "qian" == s ? r_FarmCfg.BKMoney : "zhuans" == s ? r_FarmCfg.BKJingCui : 1;
            l = true;
            break;
          }
        }
        if (!l) {
          var d = "qian" == s ? {
            id: s,
            name: "钱",
            num: 1,
            value: r_FarmCfg.BKMoney
          } : "zhuans" == s ? {
            id: s,
            name: "钻石",
            num: 1,
            value: r_FarmCfg.BKJingCui
          } : {
            id: s,
            name: r_FarmSystem.FarmSystem.getFarmInfo(s).name,
            num: 1,
            value: 1
          };
          e.itemList.push(d);
        }
        if ("qian" != s && "zhuans" != s) {
          r_ResSystem.ResSystem.loadBundleFguiImg(i.getChild("icon"), "game2", "farm/item/item" + s);
        } else {
          r_ResSystem.ResSystem.loadBundleFguiImg(i.getChild("icon"), "game2", "farm/item/" + s);
        }
        cc.tween(i.node).parallel(cc.tween().to(.4, {
          y: i.node.y + 200
        }, cc.easeOut(3)), cc.tween().to(.4, {
          x: i.node.x + (e.mbPos.node.x + n - i.node.x) / 3
        })).parallel(cc.tween().to(1, {
          y: e.mbPos.node.y + a
        }, cc.easeIn(3)), cc.tween().to(1, {
          x: e.mbPos.node.x + n
        })).start();
      }
    });
  };
  _ctor.prototype.settlement = function () {
    r_GoldResultUI.GoldResultUI.showUI({
      itemList: this.itemList
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("touch")], _ctor.prototype, "touch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("time")], _ctor.prototype, "timeText", undefined);
  __decorate([r_DecorateFunction1.AutoFind("mbPos")], _ctor.prototype, "mbPos", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.GoldMineUI = exp_GoldMineUI;