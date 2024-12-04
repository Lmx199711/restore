var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_HelpGrandResultUI = require("HelpGrandResultUI");
var r_RelaxSystem = require("RelaxSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_TextTipUI = require("TextTipUI");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_HelpGrandUI = require("HelpGrandUI");
var _decorator = cc._decorator;
var _property = _decorator.property;
var _ccclass = _decorator.ccclass;
var def_HelpGrandCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.moneyNode = null;
    t.money = null;
    t.spendMoneyNum = 0;
    t.goodNum = 0;
    t.content = "1.拖动钱到上方天空处\n2.拖动钱到后方荒地\n3.拖动钱到老房子\n4.拖动钱给喇叭\n5.拖动钱给菜篮子\n6.拖动钱给奶奶\n7.再次拖动钱给奶奶\n8.拖动钱到奶奶身边\n9.拖动钱给大黄狗\n10.再次拖动钱给大黄狗\n11.拖动钱给躺在地上的爷爷";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.initGame = function () {
    this.spendMoneyNum = 0;
    this.goodNum = 0;
    r_GameKeyMgr.GameKeyMgr.add("天空,荒地,老房子,奶奶,菜篮子,喇叭,大黄,爷爷");
  };
  _ctor.prototype.spendMoney = function (e, t, o) {
    if ("爷爷" != o) {
      this.spendMoneyNum += 1;
      3 == this.spendMoneyNum && r_BehaviorMgr.BehaviorMgr.trigger("爷爷要噶了");
      6 == this.spendMoneyNum && r_BehaviorMgr.BehaviorMgr.trigger("爷爷噶了");
      if (this.moneyNode.childrenCount > 0) {
        this.moneyNode.children[this.moneyNode.childrenCount - 1].destroy();
      } else {
        this.money.destroy();
        setTimeout(function () {
          r_HelpGrandResultUI.HelpGrandResultUI.showUI({
            reward: 2e6,
            type: "success",
            closeCallback: function () {
              r_HelpGrandUI.HelpGrandUI.hide();
            }
          });
        }, 4e3);
      }
    } else {
      this.goodNum += 1;
      2 == this.goodNum && r_BehaviorMgr.BehaviorMgr.trigger("爷爷回心转意");
    }
    r_BehaviorMgr.BehaviorMgr.trigger(o);
  };
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
    this.node.getChildByName("nodeTip").getComponent(cc.Button).interactable = !r_TextTipUI.TextTipUI.Inst || !r_TextTipUI.TextTipUI.Inst.isShow;
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxSystem.RelaxSystem.lastLevelId = 1e4;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      this.node.getChildByName("nodeTip").children[0].active = false;
    } else {
      this.node.getChildByName("nodeTip").children[0].active = true;
    }
  };
  _ctor.prototype.close = function () {};
  _ctor.prototype.onClickTip = function () {
    var e = this;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      r_TextTipUI.TextTipUI.showUI(this.content);
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解压提示", function () {
        e.node.getChildByName("nodeTip").children[0].active = false;
        r_RelaxSystem.RelaxSystem.addTip();
        r_TextTipUI.TextTipUI.showUI(e.content);
      });
    }
  };
  _ctor.prototype.gameOver = function () {
    r_HelpGrandResultUI.HelpGrandResultUI.showUI({
      reward: 2e6,
      type: "success",
      closeCallback: function () {
        r_HelpGrandUI.HelpGrandUI.hide();
      }
    });
  };
  __decorate([_property({
    displayName: "钱堆",
    type: cc.Node
  })], _ctor.prototype, "moneyNode", undefined);
  __decorate([_property({
    displayName: "钱",
    type: cc.Node
  })], _ctor.prototype, "money", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_HelpGrandCom;