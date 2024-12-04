var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindItemInfo = undefined;
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_FindItemInfo = function () {
  function _ctor() {
    this.getAtion = "";
    this.putAtion = "";
    this.isGet = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "物品节点"
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "显示的图片"
  })], _ctor.prototype, "sprite", undefined);
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "移动目标节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "拾取到的action"
  })], _ctor.prototype, "getAtion", undefined);
  __decorate([_property({
    displayName: "放置到的action"
  })], _ctor.prototype, "putAtion", undefined);
  return __decorate([_ccclass("FindItemInfo")], _ctor);
}();
exports.FindItemInfo = exp_FindItemInfo;
var def_FindItemListCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.itemList = [];
    t.kuangList = [];
    t.itemGetList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.registTouch();
  };
  _ctor.prototype.update = function () {};
  _ctor.prototype.refreshGetList = function () {
    for (var e = 0; e < 5; e++) {
      var t = this.itemGetList[e];
      var o = this.kuangList[e];
      if (t) {
        o.getChildByName("icon").active = true;
        o.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = t.sprite;
      } else {
        o.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = null;
      }
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.touchNode = new cc.Node();
    this.touchNode.width = 1668;
    this.touchNode.height = 1002;
    this.node.addChild(this.touchNode);
    var t = 0;
    var o = null;
    var i = null;
    var n = null;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (a) {
      o = null;
      i = null;
      n = a.getLocation();
      for (var c = 0; c < e.itemList.length; c++) {
        var l = (p = e.itemList[c]).node;
        var u = l.convertToNodeSpaceAR(n);
        var h = l.getComponent(cc.PolygonCollider);
        if (l.activeInHierarchy && !p.isGet && cc.Intersection.pointInPolygon(u, h.points)) {
          p.isGet = true;
          p.node.active = false;
          e.itemGetList.push(p);
          r_SoundMgr.SoundMgr.playSound("getItem");
          e.refreshGetList();
          r_TriggerActionMgr.TriggerActionMgr.trigger(p.getAtion);
          break;
        }
      }
      for (c = 0; c < e.itemGetList.length; c++) {
        var p = e.itemGetList[c];
        var d = e.kuangList[c];
        u = d.convertToNodeSpaceAR(n);
        h = d.getComponent(cc.PolygonCollider);
        if (d.activeInHierarchy && cc.Intersection.pointInPolygon(u, h.points)) {
          var y = d.getChildByName("icon");
          y.active = false;
          var f = y.convertToWorldSpaceAR(cc.Vec2.ZERO);
          (o = cc.instantiate(y)).active = true;
          i = p;
          t = c;
          e.node.addChild(o);
          var m = e.node.convertToNodeSpaceAR(f);
          o.x = m.x;
          o.y = m.y;
          o.startX = m.x;
          o.startY = m.y;
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      if (o) {
        var t = e.getLocation();
        o.x = o.startX + t.x - n.x;
        o.y = o.startY + t.y - n.y;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function (n) {
      if (o) {
        n.getLocation();
        if (i.target) {
          var a = o.convertToWorldSpaceAR(cc.Vec2.ZERO);
          var c = i.target.node.convertToNodeSpaceAR(a);
          var l = i.target;
          if (i.target.node.activeInHierarchy && cc.Intersection.pointInPolygon(c, l.points)) {
            e.itemGetList.splice(t, 1);
            e.refreshGetList();
            r_SoundMgr.SoundMgr.playSound("getItem");
            r_TriggerActionMgr.TriggerActionMgr.trigger(i.putAtion);
            o.destroy();
            return void (o = null);
          }
        }
        o.destroy();
        o = null;
        e.kuangList[t].getChildByName("icon").active = true;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      if (o) {
        o.destroy();
        o = null;
        e.kuangList[t].getChildByName("icon").active = true;
      }
    });
    this.touchNode._touchListener.setSwallowTouches(false);
  };
  __decorate([_property({
    type: [exp_FindItemInfo],
    displayName: "选择物品列表"
  })], _ctor.prototype, "itemList", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "选择框列表"
  })], _ctor.prototype, "kuangList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_FindItemListCom;