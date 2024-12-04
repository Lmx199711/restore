var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_CommonFunc = require("CommonFunc");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = function () {
  function e() {
    this.animationName = "animation";
    this.loop = false;
    this.delay = 0;
  }
  __decorate([_property({
    displayName: "动画名称"
  })], e.prototype, "animationName", undefined);
  __decorate([_property({
    displayName: "是否循环"
  })], e.prototype, "loop", undefined);
  __decorate([_property({
    displayName: "延迟"
  })], e.prototype, "delay", undefined);
  return __decorate([_ccclass("PlayerAnimationInfo")], e);
}();
var y = function () {
  function e() {
    this.skinNodeName = "1";
    this.skinNodeDepth = 1;
    this.delay = 0;
  }
  __decorate([_property({
    displayName: "皮肤部件名称"
  })], e.prototype, "skinNodeName", undefined);
  __decorate([_property({
    displayName: "皮肤部件的深度",
    tooltip: "第几个部件"
  })], e.prototype, "skinNodeDepth", undefined);
  __decorate([_property({
    displayName: "延迟"
  })], e.prototype, "delay", undefined);
  return __decorate([_ccclass("PlayerSkinNodeInfo")], e);
}();
var f = function () {
  function e() {
    this.soundName = "";
    this.delay = 0;
  }
  __decorate([_property({
    displayName: "音效名称"
  })], e.prototype, "soundName", undefined);
  __decorate([_property({
    displayName: "延迟"
  })], e.prototype, "delay", undefined);
  return __decorate([_ccclass("SoundInfo")], e);
}();
var m = function () {
  function e() {
    this.animationNode = null;
    this.animationDuration = 1;
    this.delay = 1;
    this.playCompletedHide = true;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "动画节点"
  })], e.prototype, "animationNode", undefined);
  __decorate([_property({
    displayName: "动画持续时间"
  })], e.prototype, "animationDuration", undefined);
  __decorate([_property({
    displayName: "延迟"
  })], e.prototype, "delay", undefined);
  __decorate([_property({
    displayName: "播放完成之后是否隐藏",
    tooltip: "播放完成之后是否隐藏"
  })], e.prototype, "playCompletedHide", undefined);
  return __decorate([_ccclass("AdAnimationInfo")], e);
}();
var g = function () {
  function e() {
    this.scaleNode = null;
    this.origin = 30;
    this.min = 0;
    this.max = 100;
    this.failNum = 30;
    this.winNum = 36;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "数值改变时缩放节点",
    tooltip: "数值改变时缩放节点"
  })], e.prototype, "scaleNode", undefined);
  __decorate([_property({
    displayName: "初始值"
  })], e.prototype, "origin", undefined);
  __decorate([_property({
    displayName: "最小值"
  })], e.prototype, "min", undefined);
  __decorate([_property({
    displayName: "最大值"
  })], e.prototype, "max", undefined);
  __decorate([_property({
    displayName: "低于这个值直接失败"
  })], e.prototype, "failNum", undefined);
  __decorate([_property({
    displayName: "大于这个值成功"
  })], e.prototype, "winNum", undefined);
  return __decorate([_ccclass("AdValueInfo")], e);
}();
var v = function () {
  function e() {
    this.target = null;
    this.isShow = true;
    this.delay = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "目标节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "是否显示"
  })], e.prototype, "isShow", undefined);
  __decorate([_property({
    displayName: "延迟"
  })], e.prototype, "delay", undefined);
  return __decorate([_ccclass("ShowOrHideInfo")], e);
}();
var C = function () {
  function e() {
    this.clickOptionArea = null;
    this.addAdVal = 0;
    this.addAdNodeValDelay = 2;
    this.soundInfo = [];
    this.playerAnimationInfo = [];
    this.playerSkinNodeInfo = [];
    this.adAnimationInfo = [];
    this.clickOptionBehavior = null;
    this.nextTime = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "选项点击区域"
  })], e.prototype, "clickOptionArea", undefined);
  __decorate([_property({
    displayName: "点击之后改变的数值"
  })], e.prototype, "addAdVal", undefined);
  __decorate([_property({
    type: f,
    displayName: "点击之后播放的音效"
  })], e.prototype, "soundInfo", undefined);
  __decorate([_property({
    type: d,
    displayName: "主角动画信息"
  })], e.prototype, "playerAnimationInfo", undefined);
  __decorate([_property({
    type: y,
    displayName: "主角皮肤信息"
  })], e.prototype, "playerSkinNodeInfo", undefined);
  __decorate([_property({
    type: m,
    displayName: "关卡动画信息"
  })], e.prototype, "adAnimationInfo", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "点击选项执行的行为"
  })], e.prototype, "clickOptionBehavior", undefined);
  __decorate([_property({
    displayName: "下一步的时间"
  })], e.prototype, "nextTime", undefined);
  return __decorate([_ccclass("AdOptionInfo")], e);
}();
var S = function () {
  function e() {
    this.preconditions = [];
    this.completedSaveKey = "";
    this.adTips = null;
    this.highLightNode = null;
    this.clickHighLightBehavior = null;
    this.optionNode = null;
    this.adOptionInfo = [];
    this.showOrHideInfo = [];
    this.isCompleted = false;
  }
  __decorate([_property({
    type: cc.String,
    displayName: "前置条件"
  })], e.prototype, "preconditions", undefined);
  __decorate([_property({
    displayName: "完成之后保存的值",
    tooltip: "前置条件是填这里面的值"
  })], e.prototype, "completedSaveKey", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示信息节点"
  })], e.prototype, "adTips", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "高亮显示,也作为点击区域"
  })], e.prototype, "highLightNode", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "点击高亮区域时执行的行为"
  })], e.prototype, "clickHighLightBehavior", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "选项根节点"
  })], e.prototype, "optionNode", undefined);
  __decorate([_property({
    type: C,
    displayName: "选项信息"
  })], e.prototype, "adOptionInfo", undefined);
  __decorate([_property({
    type: v,
    displayName: "显示隐藏信息"
  })], e.prototype, "showOrHideInfo", undefined);
  return __decorate([_ccclass("AdLevelInfo")], e);
}();
var def_AdLevelCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.adValueInfo = new g();
    t.adLevelInfo = [];
    t.playerAnimationNode = null;
    t.clickSound = "level55/click";
    t.failBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.successBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.completedCondition = [];
    t.curIndex = -1;
    t.isShowHighLight = false;
    t.isShowOption = false;
    t.curAdVal = 10;
    t.bg = null;
    t.curSkin = [];
    t.skinDepth = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = this;
    this.bg = new cc.Node("bg");
    this.bg.width = 1668;
    this.bg.height = 1002;
    this.node.addChild(this.bg);
    this.completedCondition.length = 0;
    this.adLevelInfo.forEach(function (t) {
      t.highLightNode.opacity = 0;
      t.optionNode.active = false;
      t.adTips && (t.adTips.children[0].active = false);
      t.adOptionInfo.forEach(function (t) {
        t.adAnimationInfo.forEach(function (e) {
          e.animationNode.active = false;
        });
        t.playerSkinNodeInfo.forEach(function (t) {
          t.skinNodeDepth > e.skinDepth && (e.skinDepth = t.skinNodeDepth);
        });
      });
    });
    this.curSkin.length = 0;
    for (var t = 0; t < this.skinDepth; t++) {
      this.curSkin.push("0");
    }
    this.curAdVal = this.adValueInfo.origin;
    var o = (this.curAdVal - this.adValueInfo.min) / (this.adValueInfo.max - this.adValueInfo.min);
    this.adValueInfo.scaleNode.scaleY = o;
    this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    var t = e.getLocation();
    !this.onClickOption(t) && this.onClickHighLight(t);
  };
  _ctor.prototype.checkCompletePreconditions = function (e, t) {
    if (0 == e.length) {
      return true;
    }
    if (e.length > t.length) {
      return false;
    }
    var o = true;
    var i = function (i) {
      if (-1 == t.findIndex(function (t) {
        return t == e[i];
      })) {
        o = false;
        return "break";
      }
    };
    for (var n = 0; n < e.length && "break" !== i(n); n++) {
      ;
    }
    return o;
  };
  _ctor.prototype.onClickHighLight = function (e) {
    if (this.isShowHighLight && -1 != this.curIndex) {
      if (r_CommonFunc.checkTouchNode(e, this.adLevelInfo[this.curIndex].highLightNode)) {
        this.adLevelInfo[this.curIndex].highLightNode.opacity = 0;
        this.adLevelInfo[this.curIndex].optionNode.active = false;
        this.isShowHighLight = false;
        this.curIndex = -1;
        this.clickSound && r_SoundMgr.SoundMgr.playSound(this.clickSound);
      }
    } else {
      for (var t = 0; t < this.adLevelInfo.length; t++) {
        if (!this.adLevelInfo[t].isCompleted && r_CommonFunc.checkTouchNode(e, this.adLevelInfo[t].highLightNode)) {
          if (this.checkCompletePreconditions(this.adLevelInfo[t].preconditions, this.completedCondition)) {
            this.curIndex = t;
            this.adLevelInfo[this.curIndex].highLightNode.opacity = 255;
            this.adLevelInfo[this.curIndex].optionNode.active = true;
            this.isShowHighLight = true;
            this.adLevelInfo[this.curIndex].clickHighLightBehavior && this.adLevelInfo[this.curIndex].clickHighLightBehavior.execute();
          } else {
            this.showTips(t);
          }
          this.clickSound && r_SoundMgr.SoundMgr.playSound(this.clickSound);
          break;
        }
      }
    }
  };
  _ctor.prototype.onClickOption = function (e) {
    if (!this.isShowHighLight) {
      return false;
    }
    this.clickSound && r_SoundMgr.SoundMgr.playSound(this.clickSound);
    var t = this.adLevelInfo[this.curIndex].adOptionInfo;
    for (var o = 0; o < t.length; o++) {
      if (r_CommonFunc.checkTouchNode(e, t[o].clickOptionArea)) {
        this.adLevelInfo[this.curIndex].highLightNode.opacity = 0;
        this.adLevelInfo[this.curIndex].optionNode.active = false;
        this.isShowHighLight = false;
        t[o].clickOptionBehavior && t[o].clickOptionBehavior.execute();
        this.showAnimation(o);
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.showAnimation = function (e) {
    var t = this;
    var o = this.adLevelInfo[this.curIndex].adOptionInfo[e];
    o.adAnimationInfo.forEach(function (e) {
      t.scheduleOnce(function () {
        e.animationNode.active = true;
      }, e.delay);
      t.scheduleOnce(function () {
        e.animationNode.active = !e.playCompletedHide;
      }, e.animationDuration);
    });
    this.adLevelInfo[this.curIndex].showOrHideInfo.forEach(function (e) {
      t.scheduleOnce(function () {
        e.target.active = e.isShow;
      }, e.delay);
    });
    o.playerSkinNodeInfo.forEach(function (e) {
      t.scheduleOnce(function () {
        t.curSkin[e.skinNodeDepth - 1] = e.skinNodeName;
        var o = t.curSkin.join("_");
        t.playerAnimationNode.setSkin(o);
      }, e.delay);
    });
    o.playerAnimationInfo.forEach(function (e) {
      t.scheduleOnce(function () {
        t.playerAnimationNode.setAnimation(0, e.animationName, e.loop);
      }, e.delay);
    });
    o.soundInfo.forEach(function (e) {
      t.scheduleOnce(function () {
        r_SoundMgr.SoundMgr.playSound(e.soundName);
      }, e.delay);
    });
    this.curAdVal += this.adLevelInfo[this.curIndex].adOptionInfo[e].addAdVal;
    this.scheduleOnce(function () {
      t.adLevelInfo[t.curIndex].isCompleted = true;
      t.completedCondition.push(t.adLevelInfo[t.curIndex].completedSaveKey);
      t.curIndex = -1;
      t.checkFinish() || t.curAdVal <= 0 && t.failBehavior.execute();
    }, this.adLevelInfo[this.curIndex].adOptionInfo[e].nextTime);
    var i = (this.curAdVal - this.adValueInfo.min) / (this.adValueInfo.max - this.adValueInfo.min);
    if (i > 0) {
      i > 1 && (i = 1);
      cc.tween(this.adValueInfo.scaleNode).delay(this.adLevelInfo[this.curIndex].adOptionInfo[e].addAdNodeValDelay).to(1, {
        scaleY: i
      }).start();
    }
  };
  _ctor.prototype.checkFinish = function () {
    var e = true;
    for (var t = 0; t < this.adLevelInfo.length; t++) {
      e && (e = this.adLevelInfo[t].isCompleted);
    }
    if (e) {
      if (this.curAdVal > this.adValueInfo.winNum) {
        this.successBehavior.execute();
      } else {
        this.failBehavior.execute();
      }
    }
    return e;
  };
  _ctor.prototype.showTips = function (e) {
    var t = this.adLevelInfo[e].adTips;
    var o = cc.instantiate(t.children[0]);
    o.x = 0;
    o.y = 0;
    o.active = true;
    o.opacity = 255;
    o.parent = t;
    cc.tween(o).to(.9, {
      y: 100,
      opacity: 0
    }, {
      easing: "quadOut"
    }).call(function () {
      o.destroy();
    }).start();
  };
  __decorate([_property({
    type: g,
    displayName: "关卡数值信息"
  })], _ctor.prototype, "adValueInfo", undefined);
  __decorate([_property({
    type: S,
    displayName: "关卡信息"
  })], _ctor.prototype, "adLevelInfo", undefined);
  __decorate([_property({
    type: sp.Skeleton,
    displayName: "主角"
  })], _ctor.prototype, "playerAnimationNode", undefined);
  __decorate([_property({
    displayName: "点击音效"
  })], _ctor.prototype, "clickSound", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "失败执行的行为"
  })], _ctor.prototype, "failBehavior", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "成功执行的行为"
  })], _ctor.prototype, "successBehavior", undefined);
  return __decorate([_ccclass, _menu("专门看广告的关卡")], _ctor);
}(cc.Component);
exports.default = def_AdLevelCom;