var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GlassMaskFind = require("GlassMaskFind");
var r_DataUtil = require("DataUtil");
var r_LevelPreload = require("LevelPreload");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_FindDiffChangeSceneLogic = require("FindDiffChangeSceneLogic");
var r_SoundMgr = require("SoundMgr");
var r_LoadMgr = require("LoadMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var r_CommonFunc = require("CommonFunc");
var r_Index = require("Index");
var r_RelaxSystem = require("RelaxSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var b = function () {
  function e() {
    this.func = "";
    this.parm = "";
  }
  __decorate([_property({
    displayName: "方法"
  })], e.prototype, "func", undefined);
  __decorate([_property({
    displayName: "参数"
  })], e.prototype, "parm", undefined);
  return __decorate([_ccclass("CallBack")], e);
}();
var x = function () {
  function e() {
    this.fakeNode = null;
    this.targetode = [];
    this.triggerId = "";
    this.callBackList = [];
    this.txt = "";
    this.msg = "";
    this.flySf = null;
    this.itemName = "";
    this.isMulTime = false;
    this.rangeNode = null;
  }
  __decorate([_property({
    displayName: "节点",
    type: cc.Node
  })], e.prototype, "fakeNode", undefined);
  __decorate([_property({
    displayName: "目标",
    type: cc.Node
  })], e.prototype, "targetode", undefined);
  __decorate([_property({
    displayName: "执行id",
    tooltip: "气泡字"
  })], e.prototype, "triggerId", undefined);
  __decorate([_property({
    displayName: "回调方法",
    type: b
  })], e.prototype, "callBackList", undefined);
  __decorate([_property({
    displayName: "独白"
  })], e.prototype, "txt", undefined);
  __decorate([_property({
    displayName: "对话内容"
  })], e.prototype, "msg", undefined);
  __decorate([_property({
    displayName: "飞行物品纹理",
    type: cc.SpriteFrame
  })], e.prototype, "flySf", undefined);
  __decorate([_property({
    displayName: "道具名"
  })], e.prototype, "itemName", undefined);
  __decorate([_property({
    displayName: "可重复触发"
  })], e.prototype, "isMulTime", undefined);
  __decorate([_property({
    displayName: "可移动范围",
    type: cc.Node
  })], e.prototype, "rangeNode", undefined);
  return __decorate([_ccclass("SceneFindDragClass")], e);
}();
var P = function () {
  function e() {
    this.fakeNode = null;
    this.triggerId = "";
    this.callBackList = [];
    this.txt = "";
    this.msg = "";
    this.flySf = null;
    this.itemName = "";
    this.isMulTime = false;
    this.isDouble = false;
  }
  __decorate([_property({
    displayName: "目标节点",
    type: cc.Node
  })], e.prototype, "fakeNode", undefined);
  __decorate([_property({
    displayName: "执行id",
    tooltip: "气泡字"
  })], e.prototype, "triggerId", undefined);
  __decorate([_property({
    displayName: "回调方法",
    type: b
  })], e.prototype, "callBackList", undefined);
  __decorate([_property({
    displayName: "独白"
  })], e.prototype, "txt", undefined);
  __decorate([_property({
    displayName: "对话内容"
  })], e.prototype, "msg", undefined);
  __decorate([_property({
    displayName: "飞行物品纹理",
    type: cc.SpriteFrame
  })], e.prototype, "flySf", undefined);
  __decorate([_property({
    displayName: "道具名"
  })], e.prototype, "itemName", undefined);
  __decorate([_property({
    displayName: "可重复触发"
  })], e.prototype, "isMulTime", undefined);
  __decorate([_property({
    displayName: "是否双击"
  })], e.prototype, "isDouble", undefined);
  return __decorate([_ccclass("SceneFindNodeClass")], e);
}();
var _ = function () {
  function e() {
    this.fakeNode = null;
    this.triggerId = "";
    this.callBackList = [];
    this.flySf = null;
    this.itemName = "";
    this.isMulTime = false;
  }
  __decorate([_property({
    displayName: "目标节点",
    type: cc.Node
  })], e.prototype, "fakeNode", undefined);
  __decorate([_property({
    displayName: "执行id",
    tooltip: "气泡字"
  })], e.prototype, "triggerId", undefined);
  __decorate([_property({
    displayName: "回调方法",
    type: b
  })], e.prototype, "callBackList", undefined);
  __decorate([_property({
    displayName: "飞行物品纹理",
    type: cc.SpriteFrame
  })], e.prototype, "flySf", undefined);
  __decorate([_property({
    displayName: "道具名"
  })], e.prototype, "itemName", undefined);
  __decorate([_property({
    displayName: "可重复触发"
  })], e.prototype, "isMulTime", undefined);
  return __decorate([_ccclass("SceneLangNodeClass")], e);
}();
var def_FindDiffChangeScene = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.touchNodeScale = new cc.Vec2(1, 2);
    t.discoveryNode = null;
    t.centerNode = null;
    t.range = new cc.Vec4(0, 0, 0, 0);
    t.findNodeList = [];
    t.clickNodeList = [];
    t.dragNodeList = [];
    t.langNodeList = [];
    t.text = null;
    t.msgText = null;
    t.showTime = 0;
    t.sceneList = [];
    t.page = [];
    t.itemRoot = null;
    t.itembg = null;
    t.itemsCount = [];
    t.layoutBg = null;
    t.m_index = 0;
    t.maskListDyn = [];
    t.worldScale = new cc.Vec2(0, 0);
    t.isClickFind = false;
    t.dragingIndex = -1;
    t.startPos = new cc.Vec2(0, 0);
    t.oldBlIndex = -1;
    t.startTime = null;
    t.touchFlag = false;
    t.tempInfo = null;
    t.doubleTimer = null;
    t.beginDistance = 0;
    t.beginScale = 0;
    t.bgNode = null;
    t.limitNode = null;
    t.rectNode = null;
    t.clampfPos = new cc.Vec4(0, 0, 0, 0);
    t.clampfDragPos = new cc.Vec4(0, 0, 0, 0);
    t.txtTween = null;
    t.msgTween = null;
    t.itemBtnList = [];
    t.findItemList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      return __generator(this, function () {
        return [2, Promise.resolve(1)];
      });
    });
  };
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
    this.rectNode = this.touchNode.parent;
    this.bgNode = this.touchNode.getChildByName("bg");
    console.error(this.itemsCount.length);
  };
  _ctor.prototype.onEnable = function () {
    this.discoveryNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.discoveryNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.discoveryNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.discoveryNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel);
    this.glassSon = this.discoveryNode.children[0];
    this.initBg();
  };
  _ctor.prototype.initBg = function () {
    if (this.bgNode) {
      this.bgNode.on(cc.Node.EventType.TOUCH_START, this.onBgTouchStart, this);
      this.bgNode.on(cc.Node.EventType.TOUCH_MOVE, this.onBgTouchMove, this);
      this.bgNode.on(cc.Node.EventType.TOUCH_END, this.onBgTouchEnd, this);
      this.bgNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onBgTouchEnd, this);
    }
    this.findNodeList = this.findNodeList.sort(function (e, t) {
      return Number(t.fakeNode.getSiblingIndex()) - Number(e.fakeNode.getSiblingIndex());
    });
    this.discoveryNode.getWorldScale(this.worldScale);
    if (!r_Index.Platform.isMiniPlatform()) {
      console.warn("测试平台注册滚轮事件");
      fgui.GRoot.inst.on(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheel, this);
    }
    this.changedScene();
  };
  _ctor.prototype.start = function () {
    var e;
    var t = this;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    null === (e = this.findNodeList) || undefined === e || e.forEach(function (e) {
      var o = e.fakeNode;
      o.getComponent(r_GlassMaskFind.default) && o.getComponent(r_GlassMaskFind.default).SetMediator(t.node);
      o.children.forEach(function (e) {
        e.getComponent(cc.Mask) && t.maskListDyn.push(e.getComponent(cc.Mask));
      });
    });
  };
  _ctor.prototype.handleScore = function () {};
  _ctor.prototype.update = function (t) {
    e.prototype.update.call(this, t);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(t);
    this.touchHold();
  };
  _ctor.prototype.touchHold = function () {
    var e = this;
    if (this.touchFlag && this.startTime && this.tempInfo && Date.now() - this.startTime > 1e3) {
      this.touchFlag = false;
      this.m_result = r_FindDiffChangeSceneLogic.default.getResult(this.findItemList.length, this.dragNodeList.length);
      if (this.m_result) {
        this.findNodeComplate(this.tempInfo);
        this.tempInfo.callBackList.forEach(function (t) {
          e[t.func].call(e, t.parm);
        });
        this.tempInfo.isMulTime || this.langNodeList.splice(this.langNodeList.indexOf(this.tempInfo), 1);
      }
      "长按事件" == this.tempInfo.itemName && r_BehaviorMgr.BehaviorMgr.trigger(this.tempInfo.triggerId);
    }
  };
  _ctor.prototype.onBgTouchStart = function (e) {
    var t = this;
    e.stopPropagation();
    this.discoveryNode.getWorldScale(this.worldScale);
    this.isClickFind = false;
    this.beginDistance = 0;
    this.beginScale = this.touchNode.scale;
    var o = e.getLocation();
    for (var i = this.clickNodeList.length - 1; i >= 0; i--) {
      var n = this.clickNodeList[i].fakeNode;
      if (r_CommonFunc.checkTouchNode2(o, n)) {
        if (this.clickNodeList[i].isDouble && null == this.doubleTimer) {
          console.error("需要双击");
          return this.doubleTimer = setTimeout(function () {
            t.doubleTimer = null;
          }, 250);
        }
        if (n.getComponent(r_GlassMaskFind.default)) {
          n.getComponent(r_GlassMaskFind.default).forceShow();
          r_SoundMgr.SoundMgr.playSound("正确提示");
        }
        r_BehaviorMgr.BehaviorMgr.trigger(this.clickNodeList[i].triggerId);
        null != this.clickNodeList[i].txt && this.clickNodeList[i].txt.length > 0 && this.playTxt(this.clickNodeList[i].txt);
        null != this.clickNodeList[i].msg && this.clickNodeList[i].msg.length > 0 && this.playMsg(this.clickNodeList[i].msg);
        null != this.clickNodeList[i].callBackList && this.clickNodeList[i].callBackList.length > 0 && this.clickNodeList[i].callBackList.forEach(function (e) {
          t[e.func].call(t, e.parm);
        });
        var a = this.clickNodeList[i];
        a.flySf && cc.tween(a.fakeNode).to(.5, {
          opacity: 255
        }).delay(2).to(.5, {
          opacity: 0
        }).start();
        this.findNodeComplate(a);
        return void (this.clickNodeList[i].isMulTime || this.clickNodeList.splice(i, 1));
      }
    }
    for (var s = this.findNodeList.length - 1; s >= 0; s--) {
      var r = this.findNodeList[s];
      if (r_CommonFunc.checkTouchNode2(o, r.fakeNode) && r_CommonFunc.checkTouchNode2(o, this.glassSon) && !r.fakeNode.getComponent(r_GlassMaskFind.default).IsFinish()) {
        r.fakeNode.getComponent(r_GlassMaskFind.default).show();
        r_BehaviorMgr.BehaviorMgr.trigger(r.triggerId);
        null != r.txt && r.txt.length > 0 && this.playTxt(r.txt);
        null != r.msg && r.msg.length > 0 && this.playMsg(r.msg);
        null != r.callBackList && r.callBackList.length > 0 && r.callBackList.forEach(function (e) {
          t[e.func].call(t, e.parm);
        });
        this.findNodeList[s].isMulTime || this.findNodeList.splice(s, 1);
        return void (this.isClickFind = true);
      }
    }
    for (var l = this.langNodeList.length - 1; l >= 0; l--) {
      n = this.langNodeList[l].fakeNode;
      if (r_CommonFunc.checkTouchNode2(o, n)) {
        this.startTime = Date.now();
        this.touchFlag = true;
        return void (this.tempInfo = this.langNodeList[l]);
      }
    }
    for (l = this.dragNodeList.length - 1; l >= 0; l--) {
      n = this.dragNodeList[l].fakeNode;
      if (r_CommonFunc.checkTouchNode2(o, n)) {
        this.dragNodeList[l].rangeNode && this.checkDragLimit(this.dragNodeList[l].rangeNode);
        this.startPos.x = n.x;
        this.startPos.y = n.y;
        this.dragingIndex = l;
        this.oldBlIndex = n.getSiblingIndex();
        return void n.setSiblingIndex(999);
      }
    }
  };
  _ctor.prototype.onBgTouchMove = function (e) {
    e.stopPropagation();
    if (!this.isClickFind) {
      if (this.dragingIndex >= 0 && "拖动事件" == this.dragNodeList[this.dragingIndex].itemName) {
        var t = this.dragNodeList[this.dragingIndex].fakeNode;
        t.x = cc.misc.clampf(t.x + e.getDeltaX() / this.worldScale.x, this.clampfDragPos.w, this.clampfDragPos.z);
        return void (t.y = cc.misc.clampf(t.y + e.getDeltaY() / this.worldScale.y, this.clampfDragPos.y, this.clampfDragPos.x));
      }
      if (this.dragingIndex >= 0) {
        this.dragNodeList[this.dragingIndex].fakeNode.x += e.getDeltaX() / this.worldScale.x;
        return void (this.dragNodeList[this.dragingIndex].fakeNode.y += e.getDeltaY() / this.worldScale.y);
      }
      var o = e.getTouches();
      if (1 == o.length) {
        this.checkMapPosition(e.getDeltaX(), e.getDeltaY());
      } else if (2 == o.length) {
        var i = o[0].getLocation();
        var n = o[1].getLocation();
        var a = i.sub(n).len();
        this.beginDistance <= 0 && (this.beginDistance = a);
        var s = a / this.beginDistance * this.beginScale;
        var r = cc.misc.clampf(s, this.touchNodeScale.x, this.touchNodeScale.y);
        this.checkFourLimit(r);
        this.checkMapPosition();
        this.touchNode.scale = r;
      }
    }
  };
  _ctor.prototype.onBgTouchEnd = function (e) {
    var t = this;
    e.stopPropagation();
    var o = e.getLocation();
    if (!this.isClickFind) {
      if (this.dragingIndex >= 0) {
        var i = this.dragNodeList[this.dragingIndex];
        var n = false;
        for (var a = 0; a < i.targetode.length; a++) {
          if (r_CommonFunc.checkTouchNode2(o, i.targetode[a])) {
            n = true;
            break;
          }
        }
        if (this.dragNodeList.length > 0 && "拖动事件" != this.dragNodeList[this.dragingIndex].itemName) {
          i.fakeNode.x = this.startPos.x;
          i.fakeNode.y = this.startPos.y;
        }
        if (n) {
          null != i.txt && i.txt.length > 0 && this.playTxt(i.txt);
          null != i.msg && i.msg.length > 0 && this.playMsg(i.msg);
          null != i.callBackList && i.callBackList.length > 0 && i.callBackList.forEach(function (e) {
            t[e.func].call(t, e.parm);
          });
          r_BehaviorMgr.BehaviorMgr.trigger(i.triggerId);
          if (i.isMulTime) {
            i.fakeNode.setSiblingIndex(this.oldBlIndex);
          } else {
            this.dragNodeList.splice(this.dragingIndex, 1);
            this.findNodeComplate(i);
          }
        } else {
          i.fakeNode.setSiblingIndex(this.oldBlIndex);
        }
        this.dragingIndex = -1;
      } else {
        this.checkFourLimit();
      }
      this.startTime = null;
      this.touchFlag = false;
      this.tempInfo = null;
    }
  };
  _ctor.prototype.findNodeComplate = function (e) {
    if (e.flySf) {
      var t = new cc.Node();
      var o = t.addComponent(cc.Sprite);
      o.type = cc.Sprite.Type.SIMPLE;
      o.sizeMode = cc.Sprite.SizeMode.RAW;
      t.width = 107;
      t.height = 107;
      o.spriteFrame = e.flySf;
      this.node.addChild(t);
      var i = e.fakeNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var n = t.parent.convertToNodeSpaceAR(i);
      t.x = n.x;
      t.y = n.y;
      i = this.itemBtnList[this.findItemList.length].convertToWorldSpaceAR(cc.Vec2.ZERO);
      n = t.parent.convertToNodeSpaceAR(i);
      cc.tween(t).to(.5, {
        x: n.x,
        y: n.y
      }).call(function () {
        t.destroy();
      }).start();
      this.findItemList.push(e);
      this.refreshItemList();
    }
  };
  _ctor.prototype.onDisable = function () {
    this.discoveryNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.discoveryNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.discoveryNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.discoveryNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel);
    !r_Index.Platform.isMiniPlatform() && this.mouseWheel && fgui.GRoot.inst.off(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheel, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    e.stopPropagation();
    this.oldBlIndex = this.discoveryNode.getSiblingIndex();
    this.discoveryNode.setSiblingIndex(999);
  };
  _ctor.prototype.onTouchMove = function (e) {
    e.stopPropagation();
    this.discoveryNode.x += e.getDeltaX() / this.worldScale.x;
    this.discoveryNode.y += e.getDeltaY() / this.worldScale.y;
    this.updateMask();
    this.checkDisNode();
  };
  _ctor.prototype.onTouchEnd = function (e) {
    e.stopPropagation();
    this.discoveryNode.setSiblingIndex(this.oldBlIndex);
  };
  _ctor.prototype.onTouchCancel = function (e) {
    e.stopPropagation();
  };
  _ctor.prototype.updateMask = function () {
    var e = this;
    var t = this.glassSon.getComponent(cc.PolygonCollider);
    this.maskListDyn.forEach(function (o) {
      if (o) {
        var i = o._graphics;
        i.lineWidth = 1;
        i.strokeColor = cc.color(255, 0, 0);
        i.fillColor = cc.color(0, 255, 0);
        i.clear();
        if (r_DataUtil.DataUtil.hitNode((e.centerNode || e.glassSon).convertToWorldSpaceAR(cc.v2(0, 0)), o.node.parent)) {
          o.node.parent.getComponent(r_GlassMaskFind.default).MakeCanClick();
          var n = null;
          for (var a = 0; a < t.points.length; a++) {
            var s = t.points[a];
            var r = e.glassSon.convertToWorldSpaceAR(s);
            var u = o.node.convertToNodeSpaceAR(r);
            if (0 != a) {
              i.lineTo(u.x, u.y);
              if (!(a != t.points.length - 1)) {
                i.close();
                i.stroke();
                i.fill();
              }
            } else {
              n = u;
              i.moveTo(n.x, n.y);
            }
          }
        } else {
          o.node.parent.getComponent(r_GlassMaskFind.default).MakeCanClick(false);
        }
      }
    });
  };
  _ctor.prototype.mouseWheel = function (e) {
    var t = e.getScrollY() / 1200;
    var o = this.touchNode.scale += t;
    var i = cc.misc.clampf(o, this.touchNodeScale.x, this.touchNodeScale.y);
    this.checkFourLimit(i);
    this.checkMapPosition();
    this.touchNode.scale = i;
  };
  _ctor.prototype.checkMapPosition = function (e, t) {
    undefined === e && (e = 0);
    undefined === t && (t = 0);
    var o = this.touchNode;
    o.x = cc.misc.clampf(o.x + e, this.clampfPos.w, this.clampfPos.z);
    o.y = cc.misc.clampf(o.y + t, this.clampfPos.y, this.clampfPos.x);
  };
  _ctor.prototype.checkDisNode = function () {
    if (this.discoveryNode.x < this.range.x) {
      this.discoveryNode.x = this.range.x;
    } else {
      this.discoveryNode.x > this.range.y && (this.discoveryNode.x = this.range.y);
    }
    if (this.discoveryNode.y < this.range.z) {
      this.discoveryNode.y = this.range.z;
    } else {
      this.discoveryNode.y > this.range.w && (this.discoveryNode.y = this.range.w);
    }
  };
  _ctor.prototype.checkFourLimit = function (e) {
    e || (e = this.touchNode.scale);
    var t = this.rectNode.width;
    var o = this.rectNode.height;
    var i = this.limitNode.width * this.limitNode.scaleX * e;
    var n = this.limitNode.height * this.limitNode.scaleY * e;
    this.clampfPos.x = (n - o) / 2;
    this.clampfPos.y = -this.clampfPos.x;
    this.clampfPos.z = (i - t) / 2;
    this.clampfPos.w = -this.clampfPos.z;
  };
  _ctor.prototype.checkDragLimit = function (e, t) {
    t || (t = this.touchNode.scale);
    var o = this.rectNode.width;
    var i = this.rectNode.height;
    var n = e.width * e.scaleX * t;
    var a = e.height * e.scaleY * t;
    this.clampfDragPos.x = (a - i) / 2;
    this.clampfDragPos.y = -this.clampfDragPos.x;
    this.clampfDragPos.z = (n - o) / 2;
    this.clampfDragPos.w = -this.clampfDragPos.z;
  };
  _ctor.prototype.playTxt = function (e, t, o) {
    this.text.string = e || o;
    this.txtTween && this.txtTween.stop();
    this.txtTween = cc.tween(this.text.node.parent).to(.5, {
      opacity: 255
    }).delay(Number(this.showTime) || 2).to(.5, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.playMsg = function (e, t, o) {
    this.msgText.string = e || o;
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playSound("lv" + r_LoadMgr.default.currLv + "/" + this.msgText.string);
    this.msgTween && this.msgTween.stop();
    this.msgTween = cc.tween(this.msgText.node.parent).to(.5, {
      opacity: 255
    }).delay(Number(this.showTime) || 2).to(.5, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.refreshItemList = function () {
    var e = this;
    for (var t = 0; t < this.itemBtnList.length; t++) {
      var o = this.itemBtnList[t];
      var i = this.findItemList[t];
      if (i) {
        o.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = i.flySf;
        o.getChildByName("name").getComponent(cc.Label).string = i.itemName;
      }
    }
    r_SoundMgr.SoundMgr.playSound("回答正确");
    if (this.findItemList.length >= this.itemBtnList.length) {
      if (1 == this.m_index) {
        this.scheduleOnce(function () {
          r_BehaviorMgr.BehaviorMgr.trigger("切换场景" + e.m_index);
        }, 2);
      } else {
        r_BehaviorMgr.BehaviorMgr.trigger("切换场景" + this.m_index);
      }
    }
  };
  _ctor.prototype.changedScene = function () {
    var e = this;
    if (!(this.m_index >= this.itemsCount.length)) {
      this.layoutBg.node.width = (this.itembg.width + this.layoutBg.spacingX) * Math.min(this.itemsCount[this.m_index], 5) + this.layoutBg.paddingLeft + this.layoutBg.paddingRight;
      this.sceneList.forEach(function (t, o) {
        if (o == e.m_index) {
          e.limitNode = t;
          t.active = true;
        } else {
          t.active = false;
        }
      });
      this.page.forEach(function (t, o) {
        if (o == e.m_index) {
          t.active = true;
        } else {
          t.active = false;
        }
      });
      console.log("切换场景为：", this.m_index);
      this.itemBtnList = [];
      this.findItemList = [];
      this.itemRoot.destroyAllChildren();
      for (var t = 0; t < this.itemsCount[this.m_index]; t++) {
        var o = cc.instantiate(this.itembg);
        this.itemRoot.addChild(o);
        o.active = true;
        this.itemBtnList.push(o);
      }
      this.checkFourLimit();
      this.touchNode.setPosition(cc.v2(0, 0));
      this.m_index++;
    }
  };
  _ctor.prototype.setOver = function () {
    r_BehaviorMgr.BehaviorMgr.trigger("结束动画" + this.m_result);
    this.endTime();
  };
  _ctor.prototype.failLevel = function () {
    r_RelaxSystem.RelaxSystem.lose();
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    this.endTime();
  };
  _ctor.prototype.passLevel = function () {
    r_RelaxSystem.RelaxSystem.win();
    this.endTime();
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  __decorate([_property({
    displayName: "背景图层",
    type: cc.Node
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    displayName: "背景图层缩放范围"
  })], _ctor.prototype, "touchNodeScale", undefined);
  __decorate([_property({
    displayName: "放大镜节点",
    type: cc.Node
  })], _ctor.prototype, "discoveryNode", undefined);
  __decorate([_property({
    displayName: "瞄准点",
    type: cc.Node,
    tooltip: "该点会进入目标节点时，启动msk效果"
  })], _ctor.prototype, "centerNode", undefined);
  __decorate([_property({
    displayName: "移动范围"
  })], _ctor.prototype, "range", undefined);
  __decorate([_property({
    displayName: "隐藏着节点",
    type: P
  })], _ctor.prototype, "findNodeList", undefined);
  __decorate([_property({
    displayName: "直接点击的节点",
    type: P
  })], _ctor.prototype, "clickNodeList", undefined);
  __decorate([_property({
    displayName: "拖动的节点",
    type: x
  })], _ctor.prototype, "dragNodeList", undefined);
  __decorate([_property({
    displayName: "长按节点",
    type: _
  })], _ctor.prototype, "langNodeList", undefined);
  __decorate([_property({
    displayName: "独白文本",
    type: cc.Label
  })], _ctor.prototype, "text", undefined);
  __decorate([_property({
    displayName: "对话框文本",
    type: cc.Label
  })], _ctor.prototype, "msgText", undefined);
  __decorate([_property({
    displayName: "显示时间",
    visible: function () {
      return this.text || this.msgText;
    }
  })], _ctor.prototype, "showTime", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "场景节点"
  })], _ctor.prototype, "sceneList", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "页签"
  })], _ctor.prototype, "page", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具根节点"
  })], _ctor.prototype, "itemRoot", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具节点"
  })], _ctor.prototype, "itembg", undefined);
  __decorate([_property({
    type: [cc.Integer],
    displayName: "场景道具数量"
  })], _ctor.prototype, "itemsCount", undefined);
  __decorate([_property(cc.Layout)], _ctor.prototype, "layoutBg", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_FindDiffChangeScene;