var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r_GameKeyMgr = require("GameKeyMgr");
var r_UtilsSystem = require("UtilsSystem");
var r_Index = require("Index");
var r_SoundMgr = require("SoundMgr");
var r_CommonFunc = require("CommonFunc");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["电梯层数面板数字"] = 0] = "电梯层数面板数字";
  e[e["电梯按钮数字"] = 1] = "电梯按钮数字";
  e[e["对话框"] = 2] = "对话框";
  e[e["手中外卖"] = 3] = "手中外卖";
  e[e["楼层背景"] = 4] = "楼层背景";
  e[e["正确反馈"] = 5] = "正确反馈";
  e[e["错误反馈"] = 6] = "错误反馈";
})(s || (s = {}));
var def_Level37Com = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.BUTTONCOUNT = 16;
    t.rightNodes = [];
    t.wrongNodes = [];
    t.curFloorIndex = 0;
    t.curSelectItemIndex = 0;
    t.waimaiNames = ["3楼炸鸡", "5楼鲜果", "8楼轻食", "8楼咖啡", "11楼奶茶", "11楼蛋糕", "16楼湘菜", "16楼烧烤串串", "16楼汉堡"];
    t.bgIndices = [0, 3, 1, 2, 4, 3, 1, 0, 2, 3, 3, 1, 0, 2, 4, 1];
    t.isFirst = true;
    t.isControl = false;
    t.isSelectFloor = false;
    t.isPlayAnim = false;
    t.isShowWrong = false;
    t.animOverAction = null;
    t.selectItem = null;
    t.sendSum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.waimaiInfos = {
      2: {
        waimaiIndices: [0]
      },
      4: {
        waimaiIndices: [1]
      },
      7: {
        waimaiIndices: [2, 3]
      },
      10: {
        waimaiIndices: [4, 5]
      },
      15: {
        waimaiIndices: [6, 7, 8]
      }
    };
    this.clickButtons = [];
    this.clickButtons.length = this.BUTTONCOUNT;
    this.displayButtons = [];
    this.displayButtons.length = this.BUTTONCOUNT;
    this.floorNums = [];
    this.floorNums.length = this.BUTTONCOUNT;
    for (var e = 0; e < this.BUTTONCOUNT; e++) {
      this.clickButtons[e] = this.buttonPanel.getChildByName("按钮碰撞点" + (e + 1).toString());
      this.displayButtons[e] = this.buttonPanel.getChildByName((e + 1).toString());
      this.floorNums[e] = this.floorDisplayPanel.getChildByName((e + 1).toString());
    }
    this.dragWaimais = [];
    this.dragWaimais.length = this.waimaiNames.length;
    this.duihuakuangs = [];
    this.duihuakuangs.length = this.waimaiNames.length;
    this.gotWaimais = [];
    this.gotWaimais.length = this.waimaiNames.length;
    for (e = 0; e < this.waimaiNames.length; e++) {
      var t = this.waimaiNames[e];
      this.dragWaimais[e] = this.dragWaimaiParent.getChildByName(t);
      this.duihuakuangs[e] = this.duihuakuangParent.getChildByName(t);
      this.gotWaimais[e] = this.gotWaimaiParent.getChildByName(t);
    }
    this.bgs = [];
    for (e = 0; e < this.bgParent.childrenCount; e++) {
      var o = this.bgParent.children[e];
      this.bgs.push(o);
    }
    this.upArrow = this.floorDisplayPanel.getChildByName("上方向");
    this.downArrow = this.floorDisplayPanel.getChildByName("下方向");
    this.isFirst = true;
    this.sendSum = 0;
  };
  _ctor.prototype.onEnable = function () {
    r_Index.App.inst.on(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
  };
  _ctor.prototype.onDisable = function () {
    r_Index.App.inst.off(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
    this.touchBg.off(cc.Node.EventType.TOUCH_START, this.startTouch, this);
    this.touchBg.off(cc.Node.EventType.TOUCH_MOVE, this.moveTouch, this);
    this.touchBg.off(cc.Node.EventType.TOUCH_END, this.endTouch, this);
  };
  _ctor.prototype.onChangeKey = function (e) {
    if (!("准备选择楼层" != e.data.key || this.isControl)) {
      this.isControl = true;
      this.initActives();
      this.touchBg.on(cc.Node.EventType.TOUCH_START, this.startTouch, this);
      this.touchBg.on(cc.Node.EventType.TOUCH_MOVE, this.moveTouch, this);
      this.touchBg.on(cc.Node.EventType.TOUCH_END, this.endTouch, this);
    }
  };
  _ctor.prototype.initActives = function () {
    this.upArrow.active = false;
    this.downArrow.active = true;
    this.setActive(s.对话框, -1);
    this.setActive(s.手中外卖, -1);
    this.setActive(s.楼层背景, this.bgIndices[0]);
    this.setActive(s.电梯层数面板数字, 0);
    this.setActive(s.电梯按钮数字, 0);
    this.setActive(s.正确反馈, -1);
    this.setActive(s.错误反馈, -1);
    this.upArrow.active = this.downArrow.active = false;
  };
  _ctor.prototype.startTouch = function (e) {
    var t = this;
    if (!this.isPlayAnim) {
      this.touchStartPos = e.getLocation();
      if (this.isSelectFloor) {
        if (r_CommonFunc.checkTouchNode(this.touchStartPos, this.buttonPanel)) {
          for (var o = 0; o < this.clickButtons.length; o++) {
            var i = this.clickButtons[o];
            if (r_CommonFunc.checkTouchNode(this.touchStartPos, i)) {
              this.isSelectFloor = false;
              this.showAnimForIndex(o);
              this.smallButtonPanel();
              this.playSound("diantianniu");
              break;
            }
          }
        } else {
          this.isSelectFloor = false;
          this.smallButtonPanel();
        }
      } else if (r_CommonFunc.checkTouchNode(this.touchStartPos, this.buttonPanel)) {
        this.isSelectFloor = true;
        this.isPlayAnim = true;
        this.bigButtonPanel(function () {
          t.isPlayAnim = false;
        });
      } else {
        for (o = 0; o < this.dragWaimais.length; o++) {
          i = this.dragWaimais[o];
          if (r_CommonFunc.checkTouchNode(this.touchStartPos, i)) {
            r_SoundMgr.SoundMgr.playSound("getItem");
            this.selectItem = i;
            this.selectItemBeginPosX = this.selectItem.x;
            this.selectItemBeginPosY = this.selectItem.y;
            this.curSelectItemIndex = o;
            break;
          }
        }
      }
    }
  };
  _ctor.prototype.moveTouch = function (e) {
    if (!this.isPlayAnim && this.selectItem) {
      var t = e.getLocation();
      this.selectItem.x = this.selectItemBeginPosX + t.x - this.touchStartPos.x;
      this.selectItem.y = this.selectItemBeginPosY + t.y - this.touchStartPos.y;
    }
  };
  _ctor.prototype.endTouch = function () {
    if (!this.isPlayAnim) {
      if (this.selectItem) {
        var e = this.waimaiInfos[this.curFloorIndex];
        if (e) {
          var t = e.waimaiIndices;
          var o = t.indexOf(this.curSelectItemIndex);
          if (r_CommonFunc.checkNodeOverOtherNode(this.selectItem, this.waimaiTargetNode)) {
            if (0 == o) {
              r_SoundMgr.SoundMgr.playSound("itemDown");
              this.selectItem.setPosition(this.waimaiRightPos.getPosition());
              this.setActive(s.对话框, -1);
              t.shift();
              this.showHandInAnim(t, this.selectItem);
              this.sendSum++;
            } else {
              this.showWrongTip();
              this.resetSelectItem();
            }
          } else {
            this.resetSelectItem();
          }
        } else {
          this.resetSelectItem();
        }
      }
      this.selectItem = null;
    }
  };
  _ctor.prototype.resetSelectItem = function () {
    this.selectItem.x = this.selectItemBeginPosX;
    this.selectItem.y = this.selectItemBeginPosY;
  };
  _ctor.prototype.showAnimForIndex = function (e) {
    var t = this;
    if (e != this.curFloorIndex) {
      this.isPlayAnim = true;
      this.setActive(s.电梯按钮数字, e);
      var o = function () {
        for (var o = 0; o < t.duihuakuangParent.childrenCount; o++) {
          t.duihuakuangParent.children[o].active = false;
        }
        var i;
        t.setActive(s.电梯层数面板数字, -1);
        if (e > t.curFloorIndex) {
          t.upArrow.active = true;
          t.downArrow.active = false;
          i = t.upArrow;
        } else {
          t.upArrow.active = false;
          t.downArrow.active = true;
          i = t.downArrow;
        }
        t.playSound("diantiyunxing");
        cc.tween(i).blink(1, 2).call(function () {
          t.curFloorIndex = e;
          t.setActive(s.电梯层数面板数字, e);
          t.setActive(s.楼层背景, t.bgIndices[e]);
          t.upArrow.active = t.downArrow.active = false;
          t.playSound("diantidaoda");
          t.diantiAnim.setTrackCompleteListener(t.diantiAnim.setAnimation(0, "step_1", false), function () {
            if (t.waimaiInfos[t.curFloorIndex] && t.waimaiInfos[t.curFloorIndex].waimaiIndices.length > 0) {
              var e = t.waimaiInfos[t.curFloorIndex].waimaiIndices[0];
              t.setActive(s.对话框, e);
              t.upArrow.active = t.downArrow.active = false;
            }
            t.isPlayAnim = false;
          });
        }).start();
      };
      if (this.isFirst) {
        this.isFirst = false;
        o();
      } else {
        this.diantiAnim.setTrackCompleteListener(this.diantiAnim.setAnimation(0, "step_3", false), function () {
          o();
        });
      }
    }
  };
  _ctor.prototype.smallButtonPanel = function () {
    cc.tween(this.buttonPanel).to(.5, {
      scale: this.buttonPanelStartPos.scale,
      x: this.buttonPanelStartPos.x,
      y: this.buttonPanelStartPos.y
    }).start();
  };
  _ctor.prototype.bigButtonPanel = function (e) {
    cc.tween(this.buttonPanel).to(.5, {
      scale: this.buttonPanelEndPos.scale,
      x: this.buttonPanelEndPos.x,
      y: this.buttonPanelEndPos.y
    }).call(e).start();
  };
  _ctor.prototype.showHandInAnim = function (e, t) {
    var o = this;
    this.isPlayAnim = true;
    cc.tween(this.gotWaimaiParent).to(.5, {
      x: this.gotHandStartPos.x
    }).call(function () {
      t.active = false;
      o.setActive(s.手中外卖, o.curSelectItemIndex);
      var i = o.getRandomIndex(o.rightNodes);
      o.setActive(s.正确反馈, i);
      r_UtilsSystem.UtilsSystem.scheduleOnce(1e3, function () {
        o.setActive(s.正确反馈, -1);
        cc.tween(o.gotWaimaiParent).to(.5, {
          x: o.gotHandEndPos.x
        }).call(function () {
          o.setActive(s.手中外卖, -1);
          o.isPlayAnim = false;
          e.length > 0 && o.setActive(s.对话框, e[0]);
          o.sendSum >= o.waimaiNames.length && o.showWinAnim();
        }).start();
      });
    }).start();
  };
  _ctor.prototype.showWrongTip = function () {
    var e = this;
    if (!this.isShowWrong) {
      this.isShowWrong = true;
      var t = this.getRandomIndex(this.wrongNodes);
      this.setActive(s.错误反馈, t);
      r_UtilsSystem.UtilsSystem.scheduleOnce(1e3, function () {
        e.isShowWrong = false;
        e.setActive(s.错误反馈, -1);
      });
    }
  };
  _ctor.prototype.setActive = function (e, t) {
    var o;
    switch (e) {
      case s.对话框:
        o = this.duihuakuangs;
        break;
      case s.手中外卖:
        o = this.gotWaimais;
        break;
      case s.楼层背景:
        o = this.bgs;
        break;
      case s.电梯层数面板数字:
        o = this.floorNums;
        break;
      case s.电梯按钮数字:
        o = this.displayButtons;
        break;
      case s.正确反馈:
        o = this.rightNodes;
        break;
      case s.错误反馈:
        o = this.wrongNodes;
    }
    for (var i = 0; i < o.length; i++) {
      o[i].active = i == t;
    }
  };
  _ctor.prototype.getRandomIndex = function (e) {
    return Math.floor(Math.random() * e.length);
  };
  _ctor.prototype.showWinAnim = function () {
    var e = this;
    this.diantiAnim.setTrackCompleteListener(this.diantiAnim.setAnimation(0, "step_3", false), function () {
      e.winMask.active = true;
      e.winTitle.active = true;
      e.winTitle.scale = 0;
      cc.tween(e.winTitle).to(1, {
        scale: 1
      }).start();
      r_UtilsSystem.UtilsSystem.scheduleOnce(2e3, function () {});
    });
  };
  _ctor.prototype.playSound = function (e) {
    r_SoundMgr.SoundMgr.playSound("level37/" + e);
  };
  __decorate([_property({
    displayName: "触摸监听节点",
    type: cc.Node
  })], _ctor.prototype, "touchBg", undefined);
  __decorate([_property({
    displayName: "电梯按钮面板节点",
    type: cc.Node
  })], _ctor.prototype, "buttonPanel", undefined);
  __decorate([_property({
    displayName: "按钮个数",
    type: cc.Integer
  })], _ctor.prototype, "BUTTONCOUNT", undefined);
  __decorate([_property({
    displayName: "电梯层数显示面板",
    type: cc.Node
  })], _ctor.prototype, "floorDisplayPanel", undefined);
  __decorate([_property({
    displayName: "电梯面板起始点",
    type: cc.Node
  })], _ctor.prototype, "buttonPanelStartPos", undefined);
  __decorate([_property({
    displayName: "电梯面板目标点",
    type: cc.Node
  })], _ctor.prototype, "buttonPanelEndPos", undefined);
  __decorate([_property({
    displayName: "电梯动画",
    type: sp.Skeleton
  })], _ctor.prototype, "diantiAnim", undefined);
  __decorate([_property({
    displayName: "对话框父节点",
    type: cc.Node
  })], _ctor.prototype, "duihuakuangParent", undefined);
  __decorate([_property({
    displayName: "推拽外卖的父节点",
    type: cc.Node
  })], _ctor.prototype, "dragWaimaiParent", undefined);
  __decorate([_property({
    displayName: "手拿外卖节点",
    type: cc.Node
  })], _ctor.prototype, "gotWaimaiParent", undefined);
  __decorate([_property({
    displayName: "手位移的起始点",
    type: cc.Node
  })], _ctor.prototype, "gotHandStartPos", undefined);
  __decorate([_property({
    displayName: "手位移的目标点",
    type: cc.Node
  })], _ctor.prototype, "gotHandEndPos", undefined);
  __decorate([_property({
    displayName: "外卖拖拽到的目标点",
    type: cc.Node
  })], _ctor.prototype, "waimaiTargetNode", undefined);
  __decorate([_property({
    displayName: "正确时外卖放置点",
    type: cc.Node
  })], _ctor.prototype, "waimaiRightPos", undefined);
  __decorate([_property({
    displayName: "楼层背景父节点",
    type: cc.Node
  })], _ctor.prototype, "bgParent", undefined);
  __decorate([_property({
    displayName: "正确反馈节点",
    type: [cc.Node]
  })], _ctor.prototype, "rightNodes", undefined);
  __decorate([_property({
    displayName: "错误反馈节点",
    type: [cc.Node]
  })], _ctor.prototype, "wrongNodes", undefined);
  __decorate([_property({
    displayName: "电梯动画播放完成执行行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "animOverAction", undefined);
  __decorate([_property({
    displayName: "结束蒙层",
    type: cc.Node
  })], _ctor.prototype, "winMask", undefined);
  __decorate([_property({
    displayName: "结束UI框",
    type: cc.Node
  })], _ctor.prototype, "winTitle", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_Level37Com;