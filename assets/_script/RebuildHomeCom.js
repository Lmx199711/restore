var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RebuildHomeInfoClass = exports.rb_thingInfo = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_BehaviorMgr = require("BehaviorMgr");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_ARebuildHomeEvent = require("ARebuildHomeEvent");
var _decorator = cc._decorator;
var _property = _decorator.property;
var _ccclass = _decorator.ccclass;
exports.rb_thingInfo = function () {};
exports.RebuildHomeInfoClass = function () {};
var def_RebuildHomeCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.data = null;
    t.moneyNode = null;
    t.beginMoneyIndex = -1;
    t.leftIcon = null;
    t.leftLable = null;
    t.leftPosX = 0;
    t.rightIcon = null;
    t.rightLable = null;
    t.rightPosX = 0;
    t.choosePanel = null;
    t.state = "none";
    t.rebuildTime = 0;
    t.allTime = 0;
    t.res = [0, 0, 0];
    t.pngs = null;
    t.showing = null;
    t.showNode = "";
    t.nowIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.getPng = function (e) {
    var t;
    if (null === (t = this.pngs.getChildByName(e)) || undefined === t) {
      return undefined;
    } else {
      return t.getComponent(cc.Sprite).spriteFrame;
    }
  };
  _ctor.prototype.onLoad = function () {
    this.choosePanel = this.node.getChildByName("choosePanel");
    this.leftPosX = this.leftIcon.node.x;
    this.rightPosX = this.rightIcon.node.x;
  };
  _ctor.prototype.onDestroy = function () {
    r_TimeSystem.TimeSystem.scheduleClear("waitToFinishGame");
  };
  _ctor.prototype.initData = function (e) {
    this.data = e;
    this.res = [0, 0, 0];
    this.allTime = Object.keys(this.data.thing).length;
    var t = this.moneyNode.childrenCount;
    if (this.beginMoneyIndex < 0) {
      this.nowIndex = t + this.beginMoneyIndex;
    } else {
      this.nowIndex = this.beginMoneyIndex >= t ? t - 1 : this.beginMoneyIndex;
    }
  };
  _ctor.prototype.AcRebuild = function (e, t, o) {
    var i = this;
    if (this.data.thing[o]) {
      this.showing = this.data.thing[o];
      this.showNode = o;
      if (Math.random() > .5) {
        this.leftIcon.node.x = this.rightPosX;
        this.rightIcon.node.x = this.leftPosX;
        this.leftLable.string = r_UtilsSystem.UtilsSystem.getShowCoin(this.showing.price2);
        this.rightLable.string = r_UtilsSystem.UtilsSystem.getShowCoin(this.showing.price1);
      } else {
        this.leftIcon.node.x = this.leftPosX;
        this.rightIcon.node.x = this.rightPosX;
        this.leftLable.string = this.showing.price1 + "";
        this.rightLable.string = this.showing.price2 + "";
      }
      this.leftIcon.spriteFrame = this.getPng(this.showing.icon1);
      this.leftIcon.node.children[0].opacity = 0;
      this.rightIcon.node.children[0].opacity = 0;
      this.rightIcon.spriteFrame = this.getPng(this.showing.icon2);
      this.changeState("anim");
      this.leftIcon.node.getComponent(cc.Button).enabled = false;
      this.rightIcon.node.getComponent(cc.Button).enabled = false;
      cc.tween(this.choosePanel).to(.1, {
        scaleX: 1
      }).call(function () {
        cc.tween(i.leftIcon.node).to(.1, {
          scale: 1
        }).call(function () {
          i.leftIcon.node.getComponent(cc.Button).enabled = true;
        }).start();
        cc.tween(i.rightIcon.node).to(.1, {
          scale: 1
        }).call(function () {
          i.changeState("choose");
          i.rightIcon.node.getComponent(cc.Button).enabled = true;
        }).start();
      }).start();
    }
  };
  _ctor.prototype.checkMoney = function (e) {
    var t = this.showing["price" + e];
    if (r_PlayerData.PlayerData.isCoinEnough(t)) {
      this.chooseOne(e);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("没钱");
    }
  };
  _ctor.prototype.chooseOne = function (e) {
    var t = this;
    if ("choose" == this.state) {
      var o = 1 == e ? this.leftIcon.node : this.rightIcon.node;
      cc.tween(o.children[0]).to(.05, {
        opacity: 255
      }).start();
      this.rebuildTime++;
      this.res[e]++;
      r_GameKeyMgr.GameKeyMgr.remove(this.showNode);
      this.fadeOutMoney();
      r_SoundMgr.SoundMgr.playSound(this.data.upSound);
      r_PlayerData.PlayerData.deleteCoin("改造房屋", this.showing["price" + e], r_ReportSystem.SystemKey.小游戏, true);
      this.showing.action && r_BehaviorMgr.BehaviorMgr.trigger(this.showing.action);
      this.showing["action" + e] && r_BehaviorMgr.BehaviorMgr.trigger(this.showing["action" + e]);
      this.node.children.forEach(function (o) {
        if (o.name == t.showNode) {
          o.children[0].opacity = 0;
          o.children[e].opacity = 255;
        }
      });
      r_TimeSystem.TimeSystem.scheduleOnce("waitTohidePanel", .3, function () {
        cc.tween(t.leftIcon.node).to(.1, {
          scale: 0
        }).start();
        cc.tween(t.rightIcon.node).to(.1, {
          scale: 0
        }).call(function () {
          cc.tween(t.choosePanel).to(.08, {
            scaleX: 0
          }).start();
          t.rebuildTime <= t.allTime && t.changeState("none");
        }).start();
      });
      if (this.rebuildTime == this.allTime) {
        this.data.finishActon && this.data.finishActon.forEach(function (e) {
          r_BehaviorMgr.BehaviorMgr.trigger(e);
        });
        if (this.res[2] == this.allTime) {
          this.data.successAction && this.data.successAction.forEach(function (e) {
            r_BehaviorMgr.BehaviorMgr.trigger(e);
          });
          r_TimeSystem.TimeSystem.scheduleOnce("waitToFinishGame", this.data.successDelay || 2, function () {
            r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_ARebuildHomeEvent.ARebuildHomeEvent.GameOver, {
              win: true
            });
          });
        } else {
          this.data.defeatAction && this.data.defeatAction.forEach(function (e) {
            r_BehaviorMgr.BehaviorMgr.trigger(e);
          });
          r_TimeSystem.TimeSystem.scheduleOnce("waitToFinishGame", this.data.defeatDelay || 2, function () {
            r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_ARebuildHomeEvent.ARebuildHomeEvent.GameOver, {
              win: false,
              reason: t.data.reason || "为什么失败,是不是不努力？"
            });
          });
        }
      }
    }
  };
  _ctor.prototype.AcChoose = function (e, t) {
    var o = parseInt(t);
    this.checkMoney(o);
  };
  _ctor.prototype.changeState = function (e) {
    if (e != this.state) {
      if ("none" != e) {
        r_GameKeyMgr.GameKeyMgr.remove("none");
      } else {
        r_GameKeyMgr.GameKeyMgr.add("none");
      }
      this.state = e;
    }
  };
  _ctor.prototype.fadeOutMoney = function () {
    if (this.moneyNode.children[this.nowIndex] && this.moneyNode.children[this.nowIndex].opacity > 0) {
      cc.tween(this.moneyNode.children[this.nowIndex]).to(.3, {
        opacity: 0
      }).start();
      this.nowIndex--;
      this.nowIndex < 0 && (this.nowIndex = this.moneyNode.childrenCount - 1);
    }
  };
  __decorate([_property({
    displayName: "钱堆",
    type: cc.Node
  })], _ctor.prototype, "moneyNode", undefined);
  __decorate([_property({
    displayName: "钱堆开始递减下标",
    tooltip: "负数表示倒数第n个",
    step: 1
  })], _ctor.prototype, "beginMoneyIndex", undefined);
  __decorate([_property({
    displayName: "leftIcon",
    type: cc.Sprite
  })], _ctor.prototype, "leftIcon", undefined);
  __decorate([_property({
    displayName: "leftLable",
    type: cc.Label
  })], _ctor.prototype, "leftLable", undefined);
  __decorate([_property({
    displayName: "rightIcon",
    type: cc.Sprite
  })], _ctor.prototype, "rightIcon", undefined);
  __decorate([_property({
    displayName: "rightLable",
    type: cc.Label
  })], _ctor.prototype, "rightLable", undefined);
  __decorate([_property({
    displayName: "物品图片在哪里",
    type: cc.Node
  })], _ctor.prototype, "pngs", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_RebuildHomeCom;