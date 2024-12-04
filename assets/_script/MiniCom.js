var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var r_HelpGrandResultUI = require("HelpGrandResultUI");
var r_RelaxSystem = require("RelaxSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_TextTipUI = require("TextTipUI");
var r_EmoManUI = require("EmoManUI");
var _decorator = cc._decorator;
var _property = _decorator.property;
var _ccclass = _decorator.ccclass;
var def_MiniCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.moneyNode = null;
    t.money = null;
    t.tip = null;
    t.reward = 0;
    t.GameId = 0;
    t.content = "";
    t.title = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.update = function () {
    this.tip && (this.tip.interactable = !r_TextTipUI.TextTipUI.Inst || !r_TextTipUI.TextTipUI.Inst.isShow);
  };
  _ctor.prototype.onEnable = function () {
    this.content = this.content.split(" ").join("\n");
    r_RelaxSystem.RelaxSystem.lastLevelId = this.GameId;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      this.tip.node.getChildByName("video").active = false;
    } else {
      this.tip.node.getChildByName("video").active = true;
    }
  };
  _ctor.prototype.close = function () {};
  _ctor.prototype.onClickTip = function () {
    var e = this;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      r_TextTipUI.TextTipUI.showUI(this.content);
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解压提示", function () {
        e.tip.node.getChildByName("video").active = false;
        r_RelaxSystem.RelaxSystem.addTip();
        r_TextTipUI.TextTipUI.showUI(e.content);
      });
    }
  };
  _ctor.prototype.destroyMoney = function () {
    if (this.moneyNode.childrenCount > 0) {
      this.moneyNode.children[this.moneyNode.childrenCount - 1].destroy();
    } else if (this.money) {
      this.money.destroy();
      r_BehaviorMgr.BehaviorMgr.trigger("钱用完了");
    }
  };
  _ctor.prototype.gameOver = function () {
    r_HelpGrandResultUI.HelpGrandResultUI.showUI({
      reward: this.reward,
      title: this.title,
      type: "success",
      closeCallback: function () {
        r_EmoManUI.EmoManUI.hide();
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
  __decorate([_property({
    displayName: "提示按钮",
    type: cc.Button
  })], _ctor.prototype, "tip", undefined);
  __decorate([_property({
    displayName: " 奖励金额",
    type: Number
  })], _ctor.prototype, "reward", undefined);
  __decorate([_property({
    displayName: "关卡id",
    type: Number
  })], _ctor.prototype, "GameId", undefined);
  __decorate([_property({
    displayName: "提示内容",
    tooltip: "空格换行",
    type: String
  })], _ctor.prototype, "content", undefined);
  __decorate([_property({
    displayName: "胜利标题"
  })], _ctor.prototype, "title", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_MiniCom;