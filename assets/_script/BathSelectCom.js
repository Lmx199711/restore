var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TimeSystem = require("TimeSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_BathSelectCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.props0 = [];
    t.props1 = [];
    t.props2 = [];
    t.props3 = [];
    t.m_index = 0;
    t.m_setp = 0;
    t.m_id = "";
    t.m_map = {
      0: "daiji_2",
      "00": "daiji_3",
      "01": "daiji_4",
      1: "daiji_5",
      10: "daiji_6",
      11: "daiji_7"
    };
    t.m_niejiaoMap = {
      0: "niejiao_2",
      "00": "niejiao_2",
      "01": "niejiao_2",
      1: "niejiao_1",
      10: "niejiao_1",
      11: "niejiao_1"
    };
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.init = function () {
    this.m_index = 0;
    this.m_setp = 0;
    this.m_id = "";
    this.sp = this.node.getComponent(sp.Skeleton);
  };
  _ctor.prototype.setIndex = function (e) {
    this.m_index = e;
    this.sp.setSkin("tou_" + (e + 1));
  };
  _ctor.prototype.setStep = function (e) {
    this.m_setp = e;
    for (var t = 0; t < 4; t++) {
      this["props" + t].forEach(function (e) {
        e.getChildByName("imgMask") && (e.getChildByName("imgMask").active = true);
        e.getChildByName("白衣服").active = true;
        e.active = false;
      });
    }
    this["props" + (e - 2)].forEach(function (e) {
      e.active = true;
    });
    switch (e) {
      case 2:
        this.sp.setAnimation(0, "daiji_1", true);
        break;
      case 5:
        this.setNiejiao();
    }
  };
  Object.defineProperty(_ctor.prototype, "cId", {
    get: function () {
      return this.m_id.substring(0, 1);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.setLeft = function () {
    var e = this;
    if (2 == this.m_setp) {
      this.m_id += "1";
    } else {
      3 == this.m_setp && (this.m_id += "1");
    }
    var t = this["props" + (this.m_setp - 2)];
    if (t) {
      var o = t[1];
      o.getChildByName("imgMask") && (o.getChildByName("imgMask").active = false);
      o.getChildByName("imgMask") || (o.getChildByName("白衣服").active = false);
    }
    r_TimeSystem.TimeSystem.scheduleOnce("setRight", 1, function () {
      e.sp.setAnimation(0, e.m_map[e.m_id], true);
    });
  };
  _ctor.prototype.setRight = function () {
    var e = this;
    if (2 == this.m_setp) {
      this.m_id += "0";
    } else {
      3 == this.m_setp && (this.m_id += "0");
    }
    var t = this["props" + (this.m_setp - 2)];
    if (t) {
      var o = t[0];
      o.getChildByName("imgMask") && (o.getChildByName("imgMask").active = false);
      o.getChildByName("imgMask") || (o.getChildByName("白衣服").active = false);
    }
    r_TimeSystem.TimeSystem.scheduleOnce("setRight", 1, function () {
      e.sp.setAnimation(0, e.m_map[e.m_id], true);
    });
  };
  _ctor.prototype.setNiejiao = function () {
    this.sp.node.opacity = 0;
    cc.Tween.stopAllByTarget(this.sp);
    cc.tween(this.sp.node).to(1, {
      opacity: 255
    }).start();
    this.sp.setAnimation(0, this.m_niejiaoMap[this.m_id], true);
    this.sp.setSkin("niejiao_t" + (this.m_index + 1));
  };
  __decorate([_property([cc.Node])], _ctor.prototype, "props0", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "props1", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "props2", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "props3", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_BathSelectCom;