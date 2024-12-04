Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchMgrLevel = exports.setNodeTouchDisabled = undefined;
var r_Ex_stepController = require("Ex_stepController");
var r_CommonFunc = require("CommonFunc");
var r_TYEventType = require("TYEventType");
exports.setNodeTouchDisabled = function (e, t) {
  e && (e.__TouchDisabled = t);
};
var exp_TouchMgrLevel = function () {
  function _ctor() {
    this._brTouchInTime = 0;
    this._brTouchOutTime = 0;
    this._timer1 = 0;
    this._timer2 = 0;
    this.coolClick = true;
    this.mTouchDisabled = false;
    this.mTouchInDisabled = false;
    this.mTouchOutDisabled = false;
    this.needCheckItems = [];
    this.num = 0;
    this.onHitTestFunc = null;
    this.isMouseDown = false;
    this.updateListener = [];
    this.touchX = 0;
    this.touchY = 0;
  }
  _ctor.prototype.setBrTouchTimeIn = function (e) {
    this._brTouchInTime = e;
  };
  _ctor.prototype.setBrTouchTimeEnd = function (e) {
    this._brTouchOutTime = e;
  };
  Object.defineProperty(_ctor.prototype, "touchDisabled", {
    get: function () {
      return this.mTouchDisabled;
    },
    set: function (t) {
      if (this.mTouchDisabled != t) {
        this.mTouchDisabled = t;
        this.mTouchDisabled && _ctor.selectItem && this.stopDrag();
      }
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.blockTouchIn = function () {
    var e = this;
    if (this._brTouchInTime > 0) {
      this.mTouchInDisabled = true;
      setTimeout(function () {
        e.mTouchInDisabled = false;
      }, this._brTouchInTime);
    }
  };
  _ctor.prototype.blockTouchEnd = function () {
    var e = this;
    if (this._brTouchOutTime > 0) {
      this.mTouchOutDisabled = true;
      setTimeout(function () {
        e.mTouchOutDisabled = false;
      }, this._brTouchOutTime);
    }
  };
  _ctor.prototype.addUpdate = function (e) {
    -1 == this.updateListener.findIndex(function (t) {
      return t == e;
    }) && this.updateListener.push(e);
  };
  _ctor.prototype.removeUpdate = function (e) {
    var t = this.updateListener.findIndex(function (t) {
      return t == e;
    });
    -1 != t && this.updateListener.splice(t, 1);
  };
  _ctor.prototype.loadLevelSuccess = function (t) {
    this.isMouseDown = false;
    this.num = 0;
    this.levelNode = t;
    cc.director.getScene().getChildByName("Canvas").getChildByName("背景");
    t.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
    t.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    t.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    t.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    t._touchListener.setSwallowTouches(false);
    _ctor.stepController = t.getComponent(r_Ex_stepController.default);
    this.updateListener.length = 0;
    this.mTouchDisabled = false;
    this.onLoadLevelSuccess(t);
  };
  _ctor.prototype.clearLevel = function () {
    this.num = 0;
    _ctor.selectItem = null;
    this.needCheckItems.length = 0;
    this.onDestroy();
  };
  _ctor.prototype.loseAnim = function () {};
  _ctor.prototype.onLoadLevelSuccess = function () {};
  _ctor.prototype.onDestroy = function () {
    this.onHitTestFunc = null;
    _ctor.stepController = null;
  };
  _ctor.prototype.addTouchNode = function (e) {
    -1 == this.needCheckItems.findIndex(function (t) {
      return t == e;
    }) && this.needCheckItems.push(e);
  };
  _ctor.prototype.removeTouchNode = function (e) {
    var t = this.needCheckItems.findIndex(function (t) {
      return t == e;
    });
    -1 != t && this.needCheckItems.splice(t, 1);
  };
  _ctor.prototype.update = function (e) {
    0 == this.num && (this.num = 1);
    if (1 == this.num) {
      this.num = -1;
      this.onStart();
    }
    this.onUpdate(e);
    this.updateListener.forEach(function (t) {
      t(e);
    });
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onUpdate = function () {};
  _ctor.prototype.findSelect = function (e) {
    return this.findTouchNode(e, this.levelNode);
  };
  _ctor.AppointItem = function () {
    if (null != this.selectItem) {
      this.appointedItem = this.selectItem;
    } else {
      null != this.lastSelectItem && (this.appointedItem = this.lastSelectItem);
    }
  };
  _ctor.SetAppointedItem = function (e) {
    e && (this.appointedItem = e);
  };
  _ctor.GetLastSelectItem = function () {
    return this.lastSelectItem;
  };
  _ctor.GetAppointedItem = function () {
    return this.appointedItem;
  };
  _ctor.prototype.onTouchGlobol = function (e, t, o) {
    this.levelNode.on(e, t, o);
  };
  _ctor.prototype.offTouchGlobol = function (e, t, o) {
    this.levelNode.off(e, t, o);
  };
  _ctor.prototype.onTouchBegin = function (t) {
    if (!this.mTouchInDisabled && (this.blockTouchIn(), !this.mTouchDisabled)) {
      this.isMouseDown = true;
      var o = t.getLocation();
      this.touchX = o.x;
      this.touchY = o.y;
      this.currTouchEventData = t;
      var i = this.findSelect(o);
      i != this.levelNode && (_ctor.selectItem = i);
      _ctor.selectItem && _ctor.selectItem.emit(r_TYEventType.TYEventType.TOUCH_BEGIN, t);
      this.levelNode.emit(r_TYEventType.TYEventType.TOUCH_BEGIN, t);
    }
  };
  _ctor.prototype.onTouchMove = function (t) {
    if (!this.mTouchDisabled) {
      this.currTouchEventData = t;
      this.levelNode.emit(r_TYEventType.TYEventType.TOUCH_MOVE, t);
      if (_ctor.selectItem && _ctor.selectItem.activeInHierarchy) {
        if (_ctor.selectItem.draging) {
          _ctor.selectItem.emit(r_TYEventType.TYEventType.DRAG_MOVE, t);
        } else {
          this.startDrag(_ctor.selectItem, t);
        }
      }
    }
  };
  _ctor.prototype.onTouchEnd = function (t) {
    if (!this.mTouchOutDisabled && (this.blockTouchEnd(), !this.mTouchDisabled)) {
      this.isMouseDown = false;
      _ctor.selectItem && _ctor.selectItem.activeInHierarchy && (_ctor.lastSelectItem = _ctor.selectItem);
      this.levelNode.emit(r_TYEventType.TYEventType.TOUCH_END, t);
      if (_ctor.selectItem && _ctor.selectItem.activeInHierarchy) {
        _ctor.selectItem.draging && _ctor.selectItem.emit(r_TYEventType.TYEventType.DRAG_END, t);
        var o = this.clickTest(t);
        o && o.emit(r_TYEventType.TYEventType.CLICK, t);
        _ctor.selectItem.draging = false;
        _ctor.selectItem.emit(r_TYEventType.TYEventType.TOUCH_END, t);
      }
      _ctor.selectItem = null;
      this.currTouchEventData = null;
    }
  };
  _ctor.prototype.findInParent = function (e, t) {
    if (e == t) {
      return true;
    }
    for (var o = e.parent; o;) {
      if (t == o) {
        return true;
      }
      o = o.parent;
    }
  };
  _ctor.prototype.findTargetInNeedCheckNodeOrParent = function (e) {
    for (var t = 0; t < this.needCheckItems.length; t++) {
      var o = this.needCheckItems[t];
      if (this.findInParent(o, e)) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.findTouchNode = function (e, t) {
    if (this.onHitTestFunc) {
      return this.onHitTestFunc(e, this.needCheckItems, t);
    } else {
      return this.hitTest(e, t);
    }
  };
  _ctor.prototype.hitTest = function (e, t) {
    var o = null;
    for (var i = t.childrenCount - 1; i >= 0; i--) {
      var a = t.children[i];
      if (this.findTargetInNeedCheckNodeOrParent(a) && a.activeInHierarchy && !a.__TouchDisabled && (o = this.hitTest(e, a))) {
        break;
      }
    }
    !o && r_CommonFunc.checkTouchNode(e, t) && (o = t);
    return o;
  };
  _ctor.prototype.stopDrag = function () {
    if (_ctor.selectItem) {
      _ctor.selectItem.emit(r_TYEventType.TYEventType.DRAG_END, this.currTouchEventData);
      _ctor.selectItem.emit(r_TYEventType.TYEventType.TOUCH_END, this.currTouchEventData);
      _ctor.selectItem.emit(r_TYEventType.TYEventType.RoboticMoment.ROBOTIC_TOUCH_END, this.currTouchEventData);
      _ctor.selectItem = null;
    }
  };
  _ctor.prototype.startDrag = function (t, o) {
    _ctor.selectItem = t;
    o.getLocation();
    _ctor.selectItem.emit(r_TYEventType.TYEventType.DRAG_BEGIN, o);
    _ctor.selectItem.draging = true;
  };
  _ctor.prototype.clickTest = function (t) {
    var o = t.getLocation();
    if (_ctor.selectItem.draging) {
      if (_ctor.selectItem && Math.abs(this.touchX - o.x) < 10 && Math.abs(this.touchY - o.y) < 10) {
        return _ctor.selectItem;
      } else {
        return undefined;
      }
    } else {
      return _ctor.selectItem;
    }
  };
  _ctor.stepController = null;
  _ctor.selectItem = null;
  _ctor.lastSelectItem = null;
  _ctor.appointedItem = null;
  return _ctor;
}();
exports.TouchMgrLevel = exp_TouchMgrLevel;