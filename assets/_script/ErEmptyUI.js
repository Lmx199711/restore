var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErEmptyUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_EraseCom28010 = require("EraseCom28010");
var r_CommonFunction = require("CommonFunction");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var exp_ErEmptyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ErShouCar, r_UIDef.UIDef.Res.UI.ErEmptyUI) || this;
    t.timerKeys = [];
    t.timerCur = 0;
    t.prefabNode = null;
    t.isCleanSuc = false;
    t.eraseCom = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ErEmptyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ErEmptyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    return __awaiter(this, undefined, undefined, function () {
      return __generator(this, function (t) {
        switch (t.label) {
          case 0:
            e.prototype.onShown.call(this);
            return [4, this.loadUI()];
          case 1:
            t.sent();
            this.restore();
            return [2];
        }
      });
    });
  };
  _ctor.prototype.restore = function () {
    this.eraseCom && this.registTouch();
    this.contentPane.getChild("flash").visible = false;
    this.isCleanSuc = false;
    this.eraseCom && this.eraseCom.startClean(false);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.finishCarThing, this.close, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.carThingFlash, this.showFlash, this);
  };
  _ctor.prototype.showFlash = function () {
    this.contentPane.getChild("flash").visible = true;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.finishCarThing, this.close, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.carThingFlash, this.showFlash, this);
    this.unregistTouch();
    this.timerKeys.forEach(function (e) {
      r_TimeSystem.TimeSystem.scheduleClear(e);
    });
    this.eraseCom = null;
    this.timerCur = 0;
    this.timerKeys = [];
  };
  _ctor.prototype.close = function () {
    this.hang.node.destroyAllChildren();
    this.hide();
  };
  _ctor.prototype.loadUI = function () {
    return __awaiter(this, undefined, undefined, function () {
      var e;
      var t = this;
      return __generator(this, function (o) {
        switch (o.label) {
          case 0:
            e = this.data.info.actionPath;
            return [4, new Promise(function (o) {
              r_ResSystem.ResSystem.loadBundleRes("bundleErShouCar", e, cc.Prefab, function (e, i) {
                t.prefabNode = cc.instantiate(i);
                t.hang.node.addChild(t.prefabNode);
                t.prefabNode.x = t.prefabNode.y = 0;
                t.contentPane.visible = true;
                if (t.prefabNode.getComponent(r_EraseCom28010.default)) {
                  t.eraseCom = t.prefabNode.getComponent(r_EraseCom28010.default);
                  t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
                  t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
                } else {
                  t.excuteActionGroup(t.data.info.action);
                }
                o(1);
              });
            })];
          case 1:
            o.sent();
            return [2];
        }
      });
    });
  };
  _ctor.prototype.registTouch = function () {
    this.unregistTouch();
    this.hang.on(fgui.Event.TOUCH_BEGIN, this.touchBegin, this);
    this.hang.on(fgui.Event.TOUCH_MOVE, this.touchMove, this);
    this.hang.on(fgui.Event.TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.unregistTouch = function () {
    this.hang.off(fgui.Event.TOUCH_BEGIN, this.touchBegin, this);
    this.hang.off(fgui.Event.TOUCH_MOVE, this.touchMove, this);
    this.hang.off(fgui.Event.TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.touchBegin = function (e) {
    e.captureTouch();
    this.eraseCom.touchStart(e.touch);
  };
  _ctor.prototype.touchMove = function (e) {
    this.eraseCom.touchMove(e.touch);
  };
  _ctor.prototype.touchEnd = function (e) {
    this.eraseCom.touchEnd(e.touch);
  };
  _ctor.prototype.cleanSuccess = function (e) {
    console.log("Gambling cleanSuccess", e);
  };
  _ctor.prototype.cleanAllSuccess = function () {
    console.log("cleanAllSuccess");
    this.isCleanSuc = true;
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.finishCarThing);
  };
  _ctor.prototype.excuteActionGroup = function (e) {
    var t = this;
    if (e && e.length > 0) {
      var o = function (o) {
        var n = e[o];
        if (n.delay) {
          var a = ("ActionDirectorSystem" + i.timerCur++).toString();
          i.timerKeys.push(a);
          r_TimeSystem.TimeSystem.scheduleOnce(a, n.delay, function () {
            return t.handleAction(n);
          });
        } else {
          i.handleAction(n);
        }
      };
      var i = this;
      for (var n = 0; n < e.length; n++) {
        o(n);
      }
    }
  };
  _ctor.prototype.handleAction = function (e) {
    var t;
    var o = null;
    var i = {
      condition: "",
      args: []
    };
    e.arg2 && (i = r_CommonFunction.HandleData(e.arg2));
    var n = [];
    var a = "";
    switch (e.id) {
      case "显隐":
        o = this.findTarget(e.arg1);
        i.condition;
        o.active = "1" == e.arg2;
        break;
      case "spine":
        o = this.findTarget(e.arg1);
        if (o) {
          o.active = true;
        }
        switch (i.condition) {
          case r_CommonFunction.ARGS.args:
            o.getComponent(sp.Skeleton).setAnimation(0, i.args[0], "1" == i.args[1]);
        }
        break;
      case "属性":
        a = (n = e.arg1.split("|"))[1];
        o = this.findTarget(n[0]);
        switch (i.condition) {
          case r_CommonFunction.ARGS.val:
            var s = 0;
            var r = 0;
            if (-1 != i.args[0].indexOf(",")) {
              s = Number(i.args[0].split(",")[0]);
              o[a] = Number(s);
              r = Number(i.args[0].split(",")[1]);
            } else {
              r = Number(i.args[0]);
            }
            cc.tween(o).to(Number(i.args[1]), (t = {}, t[n[1]] = r, t), {
              easing: i.args[2] || "smooth"
            }).start();
        }
        break;
      case "缓动节点":
        a = (n = e.arg2.split("|"))[1];
        o = this.findTarget(e.arg1);
        var c = this.findTarget(n[0]);
        var h = c.x;
        var p = c.y;
        cc.tween(o).to(Number(a), {
          x: h,
          y: p
        }).start();
        break;
      case "音效":
        r_SoundMgr.SoundMgr.playSound(e.arg1);
        break;
      case "通知":
        e.arg1 && r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(e.arg1);
        break;
      case "结束":
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.finishCarThing);
        break;
      case "事件":
        break;
      default:
        cc.log("--other");
    }
  };
  _ctor.prototype.findTarget = function (e) {
    var t = null;
    this.prefabNode && (t = this.prefabNode.getChildByName(e));
    return t;
  };
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLayer.BaseLayer);
exports.ErEmptyUI = exp_ErEmptyUI;