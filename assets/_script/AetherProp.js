var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_AetherCfg = require("AetherCfg");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_AetherProp = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bitId = "0";
    t.m_layertIndex = 0;
    t.m_hp = 0;
    t.m_maxHp = 0;
    t.m_data = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.setData();
  };
  _ctor.prototype.setData = function () {
    this.m_data = JSON.parse(JSON.stringify(r_AetherCfg.AetherPropCfg[this.bitId]));
    if (this.node.getChildByName("hp")) {
      this.m_maxHp = this.data.hp;
      this.hp = this.data.hp;
    }
  };
  Object.defineProperty(_ctor.prototype, "layertIndex", {
    get: function () {
      return this.m_data.layertIndex;
    },
    set: function (e) {
      this.m_layertIndex = e;
      this.m_data.layertIndex = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "data", {
    get: function () {
      return this.m_data;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "hp", {
    set: function (e) {
      this.m_hp = e;
      var t = this.node.getChildByName("hp");
      this.node.getChildByName("hp") && (t.getComponent(cc.ProgressBar).progress = this.m_hp / this.m_maxHp < 0 ? 0 : this.m_hp / this.m_maxHp);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.destruct = function () {
    var e = this;
    if (this.node.childrenCount > 0) {
      if (this.node.children[1]) {
        var t = this.node.children[1].getComponent(sp.Skeleton);
        if (t) {
          t.setAnimation(0, "step_1", false);
          return void this.scheduleOnce(function () {
            e.node.destroy();
          }, 1.5);
        }
      }
      if ("broken" == this.node.children[0].name) {
        this.node.children[0].active = true;
        this.node.getComponent(cc.Sprite).destroy();
        var o = this.node.y - 1500;
        cc.tween(this.node).delay(.2).to(.5, {
          y: o
        }).call(function () {
          e.node.destroy();
        }).start();
      }
    } else {
      cc.tween(this.node).to(.5, {
        opacity: 0
      }).call(function () {
        e.node.destroy();
      }).start();
    }
  };
  _ctor.prototype.onDestroy = function () {
    this.m_data = null;
  };
  __decorate([_property(String)], _ctor.prototype, "bitId", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_AetherProp;