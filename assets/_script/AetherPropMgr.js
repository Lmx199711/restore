var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_CommonFunc = require("CommonFunc");
var r_AetherSystem = require("AetherSystem");
var r_BitCfg = require("BitCfg");
var r_AetherProp = require("AetherProp");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var y = cc.v2();
var f = cc.v2();
var def_AetherPropMgr = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.props = [];
    t.m_index = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.init = function () {
    this.node.destroyAllChildren();
    this.props = [];
    this.m_index = 0;
  };
  _ctor.prototype.addPrefab = function (e) {
    var t = this;
    this.node.addChild(e);
    e.children.forEach(function (e) {
      var o = e.getComponent(r_AetherProp.default);
      t.props.push(o);
      o.setData();
      o.layertIndex = t.m_index;
    });
    this.m_index++;
  };
  _ctor.prototype.pushProp = function (e) {
    var t = e.getComponent(r_AetherProp.default);
    this.props.push(t);
    t.setData();
    t.layertIndex = this.m_index;
  };
  _ctor.prototype.test = function (e, t, o) {
    var i = new cc.Node();
    i.width = 50;
    i.height = 50;
    i.addComponent(cc.Label).string = t + "," + r_BitCfg.BitLayerCoeff[t] * o.count;
    e.addChild(i);
  };
  _ctor.prototype.clickHit = function (e) {
    for (var t = this.props.length - 1; t >= 0; t--) {
      var o = this.props[t];
      if (r_CommonFunc.checkNodeOverOtherNode(e, o.node)) {
        if (o.data.hp <= 0) {
          r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitPropHit, {
            data: o.data,
            node: o.node
          });
          this.props.splice(t, 1);
          return void ("endPoint" != o.name && o.destruct());
        } else {
          o.data.hp -= r_AetherSystem.AetherSystem.getAttack() / 60;
          return void (o.hp = o.data.hp);
        }
      }
    }
  };
  _ctor.prototype.checkMove = function (e) {
    for (var t = this.props.length - 1; t >= 0; t--) {
      var o = this.props[t];
      if (r_CommonFunc.checkNodeOverOtherNode(e, o.node) && o.data.hp > 0) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.showProp = function (e) {
    for (var t = 0; t < this.props.length; t++) {
      var o = this.props[t];
      o.node.convertToWorldSpaceAR(cc.Vec2.ZERO, y);
      e.convertToWorldSpaceAR(cc.Vec2.ZERO, f);
      o.node.active = Math.abs(f.y - y.y) < 1200;
    }
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_AetherPropMgr;