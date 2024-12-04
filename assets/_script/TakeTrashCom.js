var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CleanGroupComponent = require("CleanGroupComponent");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TakeTrashSystem = require("TakeTrashSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TakeTrashCfg = require("TakeTrashCfg");
var r_SoundMgr = require("SoundMgr");
var r_TakeTrashResultUI = require("TakeTrashResultUI");
var r_TakeTrashUI = require("TakeTrashUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_TakeTrashCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.m_trashData = [];
    t.posList = [];
    t.clearRoot = null;
    t.maskNode = null;
    t.showSp = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.createCom = function (e) {
    var t = this;
    this.m_trashData = e.concat();
    if (0 != this.m_trashData.length) {
      this.maskNode.active = false;
      this.showSp.node.active = false;
      var o = 0;
      var i = function (e) {
        var i = n.m_trashData[e];
        r_ResSystem.ResSystem.loadBundleRes("game3", "takeTrash/preab/icon" + i, cc.Prefab, function (i, n) {
          if (!i) {
            var a = cc.instantiate(n);
            t.posList[e].addChild(a);
            a.x = r_UtilsSystem.UtilsSystem.getRandomNum(-50, 50);
            a.y = r_UtilsSystem.UtilsSystem.getRandomNum(-50, 50);
            t.clearRoot.pointRootList.push(a.children[0]);
            ++o == t.m_trashData.length && r_TakeTrashUI.default.instance && r_TakeTrashUI.default.instance.startGame();
          }
        });
      };
      var n = this;
      for (var a = 0; a < this.m_trashData.length; a++) {
        i(a);
      }
    }
  };
  _ctor.prototype.clearCom = function () {
    this.posList.forEach(function (e) {
      e.children.forEach(function (e) {
        e.off(cc.Node.EventType.TOUCH_START);
      });
      e.destroyAllChildren();
    });
    this.clearRoot.pointRootList.length = 1;
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t = this;
    if (this.clearRoot.pointRootList[e] || !e) {
      var o = this.clearRoot.pointRootList[e].name;
      var i = r_UtilsSystem.UtilsSystem.getRepNum(o);
      var n = this.clearRoot.pointRootList[e].parent;
      n.off(cc.Node.EventType.TOUCH_START);
      n.on(cc.Node.EventType.TOUCH_START, function () {
        n.scale = .95;
        t.onSetResult(i, n);
        n.off(cc.Node.EventType.TOUCH_START);
      }, this);
    }
  };
  _ctor.prototype.onSetResult = function (e, t) {
    var o = r_TakeTrashSystem.TakeTrashSystem.getTrashIconCfg(e);
    if (o) {
      if (o.type == r_TakeTrashCfg.TakeTrashType.普通) {
        if (o.award > 0) {
          r_PlayerData.PlayerData.addCoin("倒垃圾奖励", o.award, r_ReportSystem.SystemKey.倒垃圾, false);
        } else {
          var i = Math.abs(o.award);
          if (r_PlayerData.PlayerData.isCoinEnough(i)) {
            r_PlayerData.PlayerData.deleteCoin("倒垃圾惩罚", i, r_ReportSystem.SystemKey.倒垃圾, true);
          } else {
            r_PlayerData.PlayerData.deleteCoin("倒垃圾惩罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.倒垃圾, true);
          }
          r_SoundMgr.SoundMgr.playSound("takeTrash/diancuo");
        }
        this.playShow(t, function () {
          r_UtilsSystem.UtilsSystem.showTipTrash(o.desc);
        });
      } else if (o.type == r_TakeTrashCfg.TakeTrashType.保险箱) {
        r_TakeTrashResultUI.default.showUI({
          index: 1
        });
      } else if (o.type == r_TakeTrashCfg.TakeTrashType.彩票) {
        r_TakeTrashResultUI.default.showUI({
          index: 0
        });
      } else if (o.type == r_TakeTrashCfg.TakeTrashType.垃圾带) {
        r_TakeTrashResultUI.default.showUI({
          index: 2
        });
      } else {
        o.type == r_TakeTrashCfg.TakeTrashType.核弹 && r_TakeTrashResultUI.default.showUI({
          index: 3
        });
      }
      t.off(cc.Node.EventType.TOUCH_START);
      t.destroy();
      this.m_trashData.splice(this.m_trashData.findIndex(function () {
        return e;
      }), 1);
      if (this.m_trashData.length <= 0) {
        this.clearCom();
        r_TimeSystem.TimeSystem.scheduleOnce("again", 2, function () {
          r_TakeTrashUI.default.instance.setAgain();
        });
      }
    }
  };
  _ctor.prototype.playShow = function (e, t) {
    var o = this;
    this.maskNode.active = true;
    this.maskNode.getChildByName("guang").active = false;
    this.showSp.node.active = true;
    this.showSp.spriteFrame = e.getComponent(cc.Sprite).spriteFrame;
    var i = this.node.convertToNodeSpaceAR(e.worldPosition);
    this.showSp.node.x = i.x;
    this.showSp.node.y = i.y;
    this.showSp.node.scale = 1;
    cc.Tween.stopAllByTarget(this.showSp.node);
    cc.tween(this.showSp.node).to(.5, {
      x: 0,
      y: 0,
      scale: 2
    }).call(function () {
      o.maskNode.getChildByName("guang").active = true;
      t && t();
    }).delay(3).call(function () {
      o.showSp.node.active = false;
      o.maskNode.active = false;
    }).start();
  };
  _ctor.prototype.destruct = function () {
    r_TimeSystem.TimeSystem.scheduleClear("again");
  };
  __decorate([_property([cc.Node])], _ctor.prototype, "posList", undefined);
  __decorate([_property(r_CleanGroupComponent.default)], _ctor.prototype, "clearRoot", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "maskNode", undefined);
  __decorate([_property(cc.Sprite)], _ctor.prototype, "showSp", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_TakeTrashCom;