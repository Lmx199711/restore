var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseLayer = undefined;
var r_Index = require("Index");
var exp_BaseLayer = function (e) {
  function _ctor() {
    var o = null !== e && e.apply(this, arguments) || this;
    o.showAnimIndex = _ctor.AnimType.Null;
    return o;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "UICom", {
    get: function () {
      throw new Error("中间件类,不应该被实例化");
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.touchArea = this.contentPane.getChild("touchArea");
    var t = this.contentPane.getChild("blockEvent");
    this.blockEventNode = t || null;
  };
  _ctor.prototype.onShown = function () {
    var e = this;
    if (this.touchArea) {
      this.touchArea.node.on(cc.Node.EventType.TOUCH_START, this.mouseStart, this);
      this.touchArea.node.on(cc.Node.EventType.TOUCH_MOVE, this.mouseMove, this);
      this.touchArea.node.on(cc.Node.EventType.TOUCH_END, this.mouseEnd, this);
      this.touchArea.node.on(cc.Node.EventType.TOUCH_CANCEL, this.mouseEnd, this);
    }
    if (this.blockEventNode && _ctor.BlockUIList.indexOf(this) < 0) {
      _ctor.BlockUICount += 1;
      _ctor.BlockUIList.push(this);
    }
    if (this.showAnimIndex == _ctor.AnimType.BigScale) {
      this.contentPane.node.scale = 0;
      this.contentPane.node.anchorX = .5;
      this.contentPane.node.anchorY = .5;
      fgui.GTween.to(0, 1, .3).onUpdate(function (t) {
        var o = t.value.x;
        e.contentPane.node.scale = o;
      });
    } else if (this.showAnimIndex == _ctor.AnimType.OpacityTo255) {
      this.contentPane.node.opacity = 0;
      fgui.GTween.to(0, 1, .5).onUpdate(function (t) {
        var o = t.value.x;
        e.contentPane.node.opacity = 255 * o;
      }).setEase(fgui.EaseType.Linear);
    }
  };
  _ctor.prototype.onHide = function () {
    if (this.touchArea) {
      this.touchArea.node.off(cc.Node.EventType.TOUCH_START, this.mouseStart, this);
      this.touchArea.node.off(cc.Node.EventType.TOUCH_MOVE, this.mouseMove, this);
      this.touchArea.node.off(cc.Node.EventType.TOUCH_END, this.mouseEnd, this);
      this.touchArea.node.off(cc.Node.EventType.TOUCH_CANCEL, this.mouseEnd, this);
    }
    if (this.blockEventNode) {
      var e = _ctor.BlockUIList.indexOf(this);
      if (e < 0) {
        return void console.log("页面关闭时发现自己没有被注册:", this);
      }
      _ctor.BlockUICount -= 1;
      _ctor.BlockUIList.splice(e, 1);
    }
  };
  _ctor.prototype.bindBtnCallback = function () {
    var e = [];
    for (var t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    var o = function (e) {
      try {
        var t = i.contentPane.getChild(e).asButton;
        t.onClick(function () {
          this[e + "Callback"]();
        }, i);
        i[e + "Btn"] = t;
      } catch (o) {
        console.error("该页面节点名:", e, " 确实");
      }
    };
    var i = this;
    var n = 0;
    for (var a = e; n < a.length; n++) {
      var s = a[n];
      o(s);
    }
  };
  _ctor.prototype.stopPropagation = function (e) {
    e.on(cc.Node.EventType.TOUCH_START, function (e) {
      e.stopPropagation();
    }, this);
    e.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      e.stopPropagation();
    }, this);
    e.on(cc.Node.EventType.TOUCH_END, function (e) {
      e.stopPropagation();
    }, this);
    e.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
      e.stopPropagation();
    }, this);
  };
  _ctor.prototype.mouseStart = function (e) {
    this.touchStart(e);
  };
  _ctor.prototype.mouseMove = function (e) {
    this.touchMove(e);
  };
  _ctor.prototype.mouseEnd = function (e) {
    this.touchEnd(e);
  };
  _ctor.prototype.touchStart = function () {};
  _ctor.prototype.touchMove = function () {};
  _ctor.prototype.touchEnd = function () {};
  _ctor.BlockUICount = 0;
  _ctor.BlockUIList = [];
  _ctor.AnimType = {
    Null: 0,
    BigScale: 1,
    SmallScale: 2,
    DownToTop: 3,
    TopToDown: 4,
    OpacityTo255: 5
  };
  return _ctor;
}(r_Index.UIWind);
exports.BaseLayer = exp_BaseLayer;