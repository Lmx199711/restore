var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_WuGangUI = require("WuGangUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_WuGangCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.wgNode = null;
    t.tzNode = null;
    t.szNode = null;
    t.maskNode = null;
    t.wgSpine = null;
    t.tzSpine = null;
    t.szSpine = null;
    t.shuSpine = null;
    t.isWuGangChanged = false;
    t.isCanClickWg = false;
    t.isCanClickTz = false;
    t.isClickTz = false;
    t.isCanTzChange = false;
    t.szAnimNode = null;
    t.isWgPlay = false;
    t.yuanBaoNode = null;
    t.szPos = cc.v2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    this.wgSpine = this.wgNode.children[0].getComponent(sp.Skeleton);
    this.tzSpine = this.tzNode.children[0].getComponent(sp.Skeleton);
    this.szAnimNode = this.node.getChildByName("shuzhiNode");
    this.yuanBaoNode = this.node.getChildByName("yuanbao");
    this.szPos = this.szNode.getPosition();
  };
  _ctor.prototype.resetGame = function () {
    this.endTouch();
    this.wgSpine.setAnimation(0, "daiji_1", true);
    this.tzSpine.setAnimation(0, "tuzi", true);
    this.szAnimNode.active = false;
    this.yuanBaoNode.active = false;
    this.szNode.setPosition(this.szPos);
    this.szNode.active = true;
    this.isCanTzChange = false;
    this.isWuGangChanged = false;
    this.isWgPlay = false;
  };
  _ctor.prototype.startTouch = function () {
    this.isCanClickWg = true;
    this.isCanClickTz = true;
    this.szNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.szNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.endTouch = function () {
    this.isCanClickWg = false;
    this.isCanClickTz = false;
    this.szNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.szNode.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.touchMove = function (e) {
    var t = this.szNode.parent.convertToNodeSpaceAR(e.getLocation());
    this.szNode.setPosition(t);
  };
  _ctor.prototype.touchEnd = function (e) {
    var t = this;
    var o = this.tzNode.parent.convertToNodeSpaceAR(e.getLocation());
    if (this.tzNode.getBoundingBox().contains(o)) {
      this.szNode.active = false;
      this.szAnimNode.active = true;
      this.isCanTzChange = true;
      r_TimeSystem.TimeSystem.scheduleOnce("星光", 1.5, function () {
        t.szAnimNode.active = false;
      });
    }
  };
  _ctor.prototype.wgChange = function () {
    var e = this;
    this.isCanClickWg = false;
    r_SoundMgr.SoundMgr.playSound("wugang/吴刚变身_01");
    this.wgSpine.setAnimation(0, "bians", false);
    this.wgSpine.setCompleteListener(function () {
      r_SoundMgr.SoundMgr.playSound("wugang/连续砍树_02");
      e.wgSpine.setAnimation(0, "kan_2_1", true);
      r_TimeSystem.TimeSystem.scheduleOnce("砍树", 1.5, function () {
        e.wgSpine.setAnimation(0, "daiji_2", true);
        r_WuGangUI.default.playTreeDx();
        e.yuanBaoNode.active = true;
        r_TimeSystem.TimeSystem.scheduleOnce("元宝", 1.5, function () {
          r_PlayerData.PlayerData.data.isWuGangCaiDan = 1;
          r_PlayerData.PlayerData.saveData();
          e.yuanBaoNode.active = false;
          r_PlayerData.PlayerData.addCoin("吴刚伐桂彩蛋", r_LotteryTicketCfg.LotteryTicketCfg.WuGangCDanCoin, r_ReportSystem.SystemKey.彩票, true);
          r_WuGangUI.default.refreshAward();
        });
      });
      e.wgSpine.setCompleteListener(null);
    });
  };
  _ctor.prototype.clickWuGang = function () {
    var e = this;
    this.isCanClickWg && !this.isWuGangChanged && (this.isWgPlay || (this.isWgPlay = true, r_SoundMgr.SoundMgr.playSound("wugang/你干嘛哎呦_01"), r_SoundMgr.SoundMgr.playSound("wugang/砍树_01"), this.wgSpine.setAnimation(0, "kan_1", false), this.wgSpine.setCompleteListener(function () {
      e.wgSpine.setAnimation(0, "daiji_1", true);
      e.isWgPlay = false;
      e.wgSpine.setCompleteListener(null);
    })));
  };
  _ctor.prototype.clickTuzi = function () {
    var e = this;
    if (this.isCanClickTz) {
      if (this.isClickTz) {
        if (this.isCanTzChange) {
          this.isCanClickTz = false;
          r_SoundMgr.SoundMgr.playSound("wugang/玉兔变身_01");
          this.tzSpine.setAnimation(0, "bians", false);
          this.tzSpine.setCompleteListener(function () {
            e.tzSpine.setAnimation(0, "ce", true);
            e.tzSpine.setCompleteListener(null);
            e.wgChange();
          });
        }
      } else {
        this.isClickTz = true;
        r_TimeSystem.TimeSystem.scheduleOnce("双击", .3, function () {
          e.isClickTz = false;
        });
      }
    }
  };
  __decorate([_property({
    displayName: "吴刚节点",
    type: cc.Node
  })], _ctor.prototype, "wgNode", undefined);
  __decorate([_property({
    displayName: "兔子节点",
    type: cc.Node
  })], _ctor.prototype, "tzNode", undefined);
  __decorate([_property({
    displayName: "树枝节点",
    type: cc.Node
  })], _ctor.prototype, "szNode", undefined);
  __decorate([_property({
    displayName: "mask节点",
    type: cc.Node
  })], _ctor.prototype, "maskNode", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_WuGangCom;