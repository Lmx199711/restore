var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYEventType = require("TYEventType");
var r_SoundMgr = require("SoundMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var m = function () {
  function e() {
    this.scrollItem = null;
    this.target = null;
    this.event = "";
    this.event2 = "";
    this.clickEvent = "";
  }
  __decorate([_property({
    displayName: "节点",
    type: cc.Node
  })], e.prototype, "scrollItem", undefined);
  __decorate([_property({
    displayName: "目标",
    type: cc.Node
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "事件"
  })], e.prototype, "event", undefined);
  __decorate([_property({
    displayName: "未拖动到目标时触发的事件"
  })], e.prototype, "event2", undefined);
  __decorate([_property({
    displayName: "点击事件"
  })], e.prototype, "clickEvent", undefined);
  return __decorate([_ccclass("ScrollItem_bcismfp")], e);
}();
var def_Ex_ScrollView = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.scrollItems = [];
    t.successSound = "";
    t.layout = null;
    t.group = "";
    t.limitN = null;
    t.scaleN = null;
    t.handNode = null;
    t.groupScrollItems = [];
    t.groupIndex = 0;
    t.startPos = null;
    t.touchStartPos = null;
    t.canDragEvent = false;
    t.canClickEvent = true;
    t.currentPage = 0;
    t.totalPages = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.scrollView = this.node.getChildByName("scrollView");
    this.initGroupScrollItems();
    this.initLayout();
    this.initPage();
  };
  _ctor.prototype.initLayout = function () {
    var e = this;
    this.layout || (this.layout = this.node.getChildByName("scrollView").getChildByName("Layout"));
    if (0 != this.groupScrollItems.length) {
      this.layout.removeAllChildren();
      this.scrollItems.forEach(function (e) {
        e.scrollItem.active = false;
      });
      var t = this.group.split(",");
      var o = parseInt(t[this.groupIndex]) > 5 ? 5 : parseInt(t[this.groupIndex]);
      console.log(o);
      var i;
      var n = 0;
      this.groupScrollItems[this.groupIndex].forEach(function (e) {
        n += e.scrollItem.width;
      });
      i = n / this.groupScrollItems[this.groupIndex].length;
      this.layout.getComponent(cc.Layout).spacingX = this.node.getChildByName("scrollView").width / o - i + 20;
      this.groupScrollItems[this.groupIndex++].forEach(function (t) {
        t.scrollItem.active = true;
        t.scrollItem.parent = e.layout;
      });
    }
  };
  _ctor.prototype.addLayoutItem = function (e, t, o) {
    undefined === e && (e = null);
    undefined === t && (t = null);
    console.log(o);
    this.scrollItems[o].scrollItem.active = true;
    this.scrollItems[o].scrollItem.parent = this.layout;
  };
  _ctor.prototype.removeLayoutItem = function (e, t, o) {
    undefined === e && (e = null);
    undefined === t && (t = null);
    if (Number(o) || 0 == Number(o)) {
      r_BehaviorMgr.BehaviorMgr.trigger(this.scrollItems[o].event);
      this.scrollItems[o].scrollItem.active = false;
      this.scrollItems[o].scrollItem.parent = null;
      "" != this.successSound && r_SoundMgr.SoundMgr.playSound(this.successSound);
      0 == this.getLayoutChildrenActiveCount() && r_BehaviorMgr.BehaviorMgr.trigger("第" + this.groupIndex + "组完");
    } else {
      for (var i = 0; i < this.scrollItems.length; i++) {
        if (this.scrollItems[i].event == o) {
          r_BehaviorMgr.BehaviorMgr.trigger(this.scrollItems[i].event);
          this.scrollItems[i].scrollItem.active = false;
          this.scrollItems[i].scrollItem.parent = null;
          "" != this.successSound && r_SoundMgr.SoundMgr.playSound(this.successSound);
          0 == this.getLayoutChildrenActiveCount() && r_BehaviorMgr.BehaviorMgr.trigger("第" + this.groupIndex + "组完");
          break;
        }
      }
    }
  };
  _ctor.prototype.initGroupScrollItems = function () {
    var e = this;
    this.groupScrollItems = [];
    var t = this.group.split(",");
    var o = __spreadArrays(this.scrollItems);
    var i = 0;
    var n = [];
    var a = function (a) {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(c.scrollItems[a].scrollItem);
      c.scrollItems[a].scrollItem.on(cc.Node.EventType.TOUCH_START, function (t) {
        e.onTouchStart(e.scrollItems[a], t);
      }, c);
      c.scrollItems[a].scrollItem.on(r_TYEventType.TYEventType.DRAG_MOVE, function (t) {
        e.onTouchMove(e.scrollItems[a], t);
      }, c);
      c.scrollItems[a].scrollItem.on(r_TYEventType.TYEventType.TOUCH_END, function (t) {
        e.onTouchEnd(e.scrollItems[a], t);
      });
      n.push(o.shift());
      console.log(a == parseInt(t[i]) - 1, parseInt(t[i]) - 1);
      if (c.checkGroup(a, i)) {
        c.groupScrollItems.push(__spreadArrays(n));
        n.length = 0;
        i++;
      }
    };
    var c = this;
    for (var u = 0; u < this.scrollItems.length; u++) {
      a(u);
    }
  };
  _ctor.prototype.checkGroup = function (e, t) {
    var o = this.group.split(",");
    for (var i = 0; i < t; i++) {
      e -= parseInt(o[i]);
    }
    return e == parseInt(o[t]) - 1;
  };
  _ctor.prototype.getMoveDis = function () {
    if (this.limitN) {
      this.widthDis = this.limitN.width * this.limitN.scale / 2;
      this.widthDis = Math.max(this.widthDis, 0);
      this.heightDis = this.limitN.height * this.limitN.scale / 2;
      this.heightDis = Math.max(this.heightDis, 0);
    }
  };
  _ctor.prototype.onTouchStart = function (e, t) {
    this.startPos = e.scrollItem.getPosition();
    this.touchStartPos = t.getLocation();
    var o = cc.instantiate(e.scrollItem);
    o.parent = this.handNode.parent;
    this.handNode = o;
    this.handNode.worldPosition = t.getLocation();
    this.handNode.opacity = 0;
    this.handNode.active = true;
    this.myScrollItem = e;
    this.canClickEvent = true;
    this.canDragEvent = false;
  };
  _ctor.prototype.onTouchMove = function (e, t) {
    if (this.startPos) {
      this.handNode.worldPosition = t.getLocation();
      if (this.handNode.x > this.node.width / 2 || this.handNode.x < -this.node.width / 2 || this.handNode.y > this.node.height / 2 || this.handNode.y < -this.node.height / 2) {
        this.handNode.opacity = 255;
        this.canDragEvent = true;
        this.scrollView.getComponent(cc.ScrollView).enabled = false;
      }
      t.getLocation().subtract(this.startPos).mag() > 20 && (this.canClickEvent = false);
    }
  };
  _ctor.prototype.onTouchEnd = function (e, t) {
    this.scrollView.getComponent(cc.ScrollView).enabled = true;
    this.startPos = null;
    if (this.canClickEvent) {
      r_BehaviorMgr.BehaviorMgr.trigger(e.clickEvent);
      this.canClickEvent = false;
    }
    this.handNode.opacity = 0;
    if (r_UtilsSystem.UtilsSystem.touchInNode(this.myScrollItem.target, t.getLocation()) && this.myScrollItem.target.active && this.myScrollItem.target.parent.active) {
      r_BehaviorMgr.BehaviorMgr.trigger(this.myScrollItem.event);
      this.myScrollItem.scrollItem.active = false;
      this.myScrollItem.scrollItem.parent = null;
      "" != this.successSound && r_SoundMgr.SoundMgr.playSound(this.successSound);
      0 == this.getLayoutChildrenActiveCount() && r_BehaviorMgr.BehaviorMgr.trigger("第" + this.groupIndex + "组完");
    } else if (this.canDragEvent && r_UtilsSystem.UtilsSystem.touchInNode(this.limitN, t.getLocation())) {
      r_BehaviorMgr.BehaviorMgr.trigger(this.myScrollItem.event2);
      this.canDragEvent = false;
    }
  };
  _ctor.prototype.getLayoutChildrenActiveCount = function () {
    var e = 0;
    for (var t = 0; t < this.layout.childrenCount; t++) {
      this.layout.children[t].active && e++;
    }
    return e;
  };
  _ctor.prototype.initPage = function () {
    var e = this.scrollView.getComponent(cc.ScrollView);
    this.totalPages = Math.ceil(e.getMaxScrollOffset().x / this.scrollView.width);
  };
  _ctor.prototype.nextPage = function () {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.scrollToPage(this.currentPage);
    }
  };
  _ctor.prototype.prevPage = function () {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.scrollToPage(this.currentPage);
    }
  };
  _ctor.prototype.scrollToPage = function (e) {
    console.log(e, "Page");
    var t = this.scrollView.getComponent(cc.ScrollView);
    var o = e * this.scrollView.width;
    t.scrollToOffset(new cc.Vec2(o, 0), .5, true);
  };
  _ctor.prototype.onScrollEvent = function (e, t) {
    9 == t && (this.currentPage = Math.abs(Math.round(e.getScrollOffset().x / this.scrollView.width)));
  };
  _ctor.prototype.scrollToDistance = function (e, t, o) {
    var i = this.scrollView.getComponent(cc.ScrollView);
    var n = Math.abs(i.getScrollOffset().x);
    n = o instanceof Array ? this.layout.children[o[0]].x + this.layout.children[o[0]].width / 2 + this.layout.getComponent(cc.Layout).spacingX : n + Number(o);
    i.scrollToOffset(new cc.Vec2(n, 0), .5, true);
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    return Promise.resolve(undefined);
  };
  _ctor.prototype.passLevel = function () {};
  __decorate([_property({
    displayName: "节点列表",
    type: [m]
  })], _ctor.prototype, "scrollItems", undefined);
  __decorate([_property({
    displayName: "拖动成功音效"
  })], _ctor.prototype, "successSound", undefined);
  __decorate([_property({
    displayName: "layout容器",
    type: cc.Node
  })], _ctor.prototype, "layout", undefined);
  __decorate([_property({
    displayName: "节点列表分组及数量",
    tooltip: "格式：2,3"
  })], _ctor.prototype, "group", undefined);
  __decorate([_property({
    displayName: "移动范围",
    type: cc.Node
  })], _ctor.prototype, "limitN", undefined);
  __decorate([_property({
    displayName: "缩放节点",
    type: cc.Node
  })], _ctor.prototype, "scaleN", undefined);
  __decorate([_property({
    displayName: "显示node",
    type: cc.Node
  })], _ctor.prototype, "handNode", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/横向组件")], _ctor);
}(cc.Component);
exports.default = def_Ex_ScrollView;