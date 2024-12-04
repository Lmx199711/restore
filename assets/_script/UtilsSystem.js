Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UtilsSystem = exports._UtilsSystem = undefined;
var r_jsbi = require("jsbi");
var r_AlertUI = require("AlertUI");
var r_BigNumSystem = require("BigNumSystem");
var r_PoolSystem = require("PoolSystem");
var r_TimeSystem = require("TimeSystem");
var exp__UtilsSystem = function () {
  function _ctor() {
    this.lastPlayCoinTime = 0;
    this.numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this._gid = 0;
    this.showList = [["大", "1000000000000000000000000000000000000000000000000000000000000000000000000"], ["无", "100000000000000000000000000000000000000000000000000000000000000000000"], ["不", "10000000000000000000000000000000000000000000000000000000000000000"], ["那", "1000000000000000000000000000000000000000000000000000000000000"], ["阿", "100000000000000000000000000000000000000000000000000000000"], ["恒", "10000000000000000000000000000000000000000000000000000"], ["极", "1000000000000000000000000000000000000000000000000"], ["载", "100000000000000000000000000000000000000000000"], ["正", "10000000000000000000000000000000000000000"], ["涧", "1000000000000000000000000000000000000"], ["沟", "100000000000000000000000000000000"], ["穰", "10000000000000000000000000000"], ["秭", "1000000000000000000000000"], ["垓", "100000000000000000000"], ["京", "10000000000000000"], ["兆", "1000000000000"], ["亿", "100000000"], ["万", "10000"], ["元", "1"]];
    this.lastTime = null;
  }
  Object.defineProperty(_ctor.prototype, "GID", {
    get: function () {
      return this._gid++;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.resetGID = function () {
    this._gid = 0;
  };
  _ctor.prototype.getRandomNum = function (e, t) {
    var o = t - e;
    var i = Math.random();
    return e + Math.round(i * o);
  };
  _ctor.prototype.getMapNum = function (e) {
    var t = 0;
    for (var o in e) t++;
    return t;
  };
  _ctor.prototype.showTip = function (e, t) {
    undefined === t && (t = 0);
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.TipCom);
    o.getChild("content").text = e;
    o.x = fgui.GRoot.inst.width / 2;
    o.y = 1 * fgui.GRoot.inst.height / 3;
    o.getController("state").selectedIndex = t;
    r_TimeSystem.TimeSystem.timeUpdate(1, function (e) {
      o.y = 1 * cc.winSize.height / 3 - 200 * e;
      1 == e && r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.TipCom, o);
    });
  };
  _ctor.prototype.showTipTrash = function (e, t) {
    undefined === t && (t = 0);
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.TrashTipCom);
    o.getChild("content").text = e;
    o.x = fgui.GRoot.inst.width / 2;
    o.y = 1 * fgui.GRoot.inst.height / 3;
    o.getController("state").selectedIndex = t;
    r_TimeSystem.TimeSystem.timeUpdate(2, function (e) {
      o.y = 1 * cc.winSize.height / 3 - 350 * e;
      1 == e && r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.TrashTipCom, o);
    });
  };
  _ctor.prototype.showLoading = function (e) {
    cc.director.getScene().getChildByName("loading").active = e;
  };
  _ctor.prototype.showSecretTip = function (e) {
    var t = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.WordImg);
    t.getChild("content").text = e;
    t.x = fgui.GRoot.inst.width / 2 + 150;
    t.y = 1 * fgui.GRoot.inst.height / 4;
    r_TimeSystem.TimeSystem.timeUpdate(1, function (e) {
      t.y = 1 * cc.winSize.height / 4 - 200 * e;
      1 == e && r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.WordImg, t);
    });
  };
  _ctor.prototype.showCoinTip = function (e, t, o) {
    undefined === o && (o = "");
    var i = t || cc.v2(fgui.GRoot.inst.width / 2, fgui.GRoot.inst.height / 3);
    var n = r_PoolSystem.PoolSystem.createObj(o);
    n.getChild("content") && (n.getChild("content").text = e);
    n.x = i.x;
    n.y = i.y;
    n.alpha = 1;
    r_TimeSystem.TimeSystem.timeUpdate(1, function (e) {
      n.y = i.y - 200 * e;
      n.alpha = 1 - e;
      1 == e && r_PoolSystem.PoolSystem.revert(o, n);
    });
  };
  _ctor.prototype.lerp = function (e, t, o) {
    return e + o * (t - e);
  };
  _ctor.prototype.getRandomFromArr = function (e) {
    return e[Math.floor(Math.random() * e.length)];
  };
  _ctor.prototype.getRandomFromArrExcept = function (e, t) {
    var o = [];
    for (var i = 0; i < e.length; i++) {
      e[i] != t && o.push(e[i]);
    }
    return this.getRandomFromArr(o);
  };
  _ctor.prototype.getRandomFromArrExceptList = function (e, t) {
    var o = [];
    for (var i = 0; i < e.length; i++) {
      -1 == t.indexOf(e[i]) && o.push(e[i]);
    }
    return this.getRandomFromArr(o);
  };
  _ctor.prototype.getShuffleFromArrExceptList = function (e, t) {
    var o = [];
    for (var i = 0; i < e.length; i++) {
      -1 == t.indexOf(e[i]) && o.push(e[i]);
    }
    return this.shuffle(o);
  };
  _ctor.prototype.fixLabel = function (e, t, o) {
    undefined === o && (o = 1);
    var i = Math.min(o, t / e.actualWidth);
    e.scaleX = i;
    e.scaleY = i;
  };
  _ctor.prototype.scheduleOnce = function (e, t) {
    setTimeout(function () {
      t && t();
    }, e);
  };
  _ctor.prototype.shuffle = function (e) {
    var t;
    var o;
    for (var i = e.length; i;) {
      o = Math.floor(Math.random() * i--);
      t = e[i];
      e[i] = e[o];
      e[o] = t;
    }
    return e;
  };
  _ctor.prototype.isPad = function () {
    return cc.winSize.width / cc.winSize.height >= .75;
  };
  _ctor.prototype.addLineFeed = function (e) {
    var t = "";
    for (var o = 0; o < e.length; o++) {
      t += e[o];
      o < e.length - 1 && (t += "\n");
    }
    return t;
  };
  _ctor.prototype.checkTouchNode = function (e, t) {
    var o = e.convertToNodeSpaceAR(t);
    return o.x > -e.width / 2 && o.x < e.width / 2 && o.y > -e.height / 2 && o.y < e.height / 2;
  };
  _ctor.prototype.touchInNode = function (e, t) {
    var o = e.convertToNodeSpaceAR(t);
    var i = e.getComponent(cc.PolygonCollider);
    if (i) {
      return !!cc.Intersection.pointInPolygon(o, i.points);
    } else {
      return o.x > -e.width / 2 && o.x < e.width / 2 && o.y > -e.height / 2 && o.y < e.height / 2;
    }
  };
  _ctor.prototype.computeArea = function (e, t, o, i, n, a, s, r) {
    var c = (o - e) * (i - t);
    var l = (s - n) * (r - a);
    var u = Math.min(o, s) - Math.max(e, n);
    var h = Math.min(i, r) - Math.max(t, a);
    return c + l - Math.max(u, 0) * Math.max(h, 0);
  };
  _ctor.prototype.removeFromArray = function (e, t) {
    for (var o = e.length - 1; o >= 0; o--) {
      e[o] == t && e.splice(o, 1);
    }
  };
  _ctor.prototype.randomPercentFromArray = function (e) {
    var t = 0;
    e.forEach(function (e) {
      return t += parseFloat(e.pr);
    });
    var o = Math.random() * t;
    var i = 0;
    for (var n = 0; n < e.length; n++) {
      if (o <= (i += parseFloat(e[n].pr))) {
        return e[n];
      }
    }
    return this.getRandomFromArr(e);
  };
  _ctor.prototype.isRandomSuccess = function (e) {
    return this.getRandomNum(0, 100) <= e;
  };
  _ctor.prototype.touchScaleNode = function (e, t, o) {
    undefined === o && (o = false);
    e.off(cc.Node.EventType.TOUCH_START);
    e.off(cc.Node.EventType.TOUCH_MOVE);
    e.off(cc.Node.EventType.TOUCH_END);
    e.off(cc.Node.EventType.TOUCH_CANCEL);
    var i = null;
    var n = false;
    e.on(cc.Node.EventType.TOUCH_START, function (t) {
      i = t.touch.getLocation();
      n = false;
      cc.Tween.stopAllByTarget(e);
      cc.tween(e).to(.1, {
        scale: .98
      }).start();
    }, this);
    e.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      var t = e.touch.getLocation();
      (Math.abs(t.x - i.x) > 20 || Math.abs(t.y - i.y)) && (n = true);
    }, this);
    e.on(cc.Node.EventType.TOUCH_END, function () {
      cc.Tween.stopAllByTarget(e);
      cc.tween(e).to(.1, {
        scale: 1
      }).start();
      n || t && t();
    }, this);
    e.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      cc.Tween.stopAllByTarget(e);
      cc.tween(e).to(.1, {
        scale: 1
      }).start();
    }, this);
    o || e._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.getShowCoin = function (e, t, o) {
    undefined === t && (t = 2);
    undefined === o && (o = true);
    "number" == typeof e && (e = Math.ceil(e));
    e = r_jsbi.default.BigInt(e);
    if (r_jsbi.default.GT(r_BigNumSystem.BigNumSystem.getNum("10000"), e)) {
      return r_jsbi.default.toNumber(e) + (o ? "元" : "");
    }
    var n = 0;
    var s = "";
    for (var r = 0; n < this.showList.length; n++) {
      var c = this.showList[n];
      var l = r_BigNumSystem.BigNumSystem.getNum(c[1]);
      if (r_jsbi.default.GE(e, l)) {
        var u = r_jsbi.default.divide(e, l);
        if (n != this.showList.length - 1 || o) {
          s = s + u.toString() + c[0];
        } else {
          s += u.toString();
        }
        var h = r_jsbi.default.multiply(u, l);
        e = r_jsbi.default.subtract(e, h);
        if ((r += 1) >= t) {
          break;
        }
      }
    }
    return s;
  };
  _ctor.prototype.addWan = function (e, t, o, i) {
    var n = this.getDigit(e);
    if (n > 3) {
      var a = n % 8;
      a >= 5 && (a = 4);
      if (i) {
        return Math.round(t / Math.pow(10, a + o - i)) / Math.pow(10, i) + "万";
      } else {
        return t / Math.pow(10, a + o) + "万";
      }
    }
    if (i) {
      return Math.round(t / Math.pow(10, o - i)) / Math.pow(10, i);
    } else {
      return t / Math.pow(10, o);
    }
  };
  _ctor.prototype.getDigit = function (e) {
    for (var t = -1; e >= 1;) {
      t++;
      e /= 10;
    }
    return t;
  };
  _ctor.prototype.numFormats = function (e, t) {
    undefined === t && (t = 1);
    e = Math.round(e);
    return this.getShowCoin(e, t);
  };
  _ctor.prototype.getBigNumFix = function (e, t, o) {
    var n = r_BigNumSystem.BigNumSystem.getNum(10);
    var s = r_jsbi.default.divide(t, n);
    var r = r_jsbi.default.divide(e, s).toString();
    return r.substring(0, r.length - 1) + "." + r.substring(r.length - 1, r.length) + o;
  };
  _ctor.prototype.getDeepChildByName = function (e, t) {
    if (e.name == t) {
      return e;
    }
    for (var o = 0; o < e.children.length; o++) {
      var i = e.children[o];
      if (i.name == t) {
        return i;
      }
      var n = this.getDeepChildByName(i, t);
      if (n) {
        return n;
      }
    }
    return null;
  };
  _ctor.prototype.clamp = function (e, t, o) {
    if (e > t) {
      var i = e;
      e = t;
      t = i;
    }
    if (o < e) {
      return e;
    } else if (o > t) {
      return t;
    } else {
      return o;
    }
  };
  _ctor.prototype.interval = function (e, t, o) {
    if (e > t) {
      var i = e;
      e = t;
      t = i;
    }
    return o >= e && o < t;
  };
  _ctor.prototype.interval2 = function (e, t, o) {
    if (e > t) {
      var i = e;
      e = t;
      t = i;
    }
    return o >= e && o <= t;
  };
  _ctor.prototype.formatVertexArr = function (e) {
    var t = [];
    var o = 0;
    for (var i = e; o < i.length; o++) {
      var n = i[o];
      t.push(n.x);
      t.push(n.y);
    }
    return t;
  };
  _ctor.prototype.dblcmp = function (e, t) {
    if (Math.abs(e - t) <= 1e-6) {
      return 0;
    } else if (e > t) {
      return 1;
    } else {
      return -1;
    }
  };
  _ctor.prototype.changeParent = function (e, t) {
    var o = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
    var i = t.convertToNodeSpaceAR(o);
    e.parent = t;
    e.x = i.x;
    e.y = i.y;
  };
  _ctor.prototype.randomArrayDiffItem = function (e, t) {
    var o = e.concat();
    o.splice(o.indexOf(t), 1);
    return o[this.getRandomNum(0, o.length - 1)];
  };
  _ctor.prototype.showAlert = function (e, t, o, i, a, s, r, c) {
    undefined === t && (t = 0);
    undefined === o && (o = null);
    undefined === i && (i = null);
    undefined === a && (a = "提示");
    undefined === s && (s = "确定");
    undefined === r && (r = "取消");
    undefined === c && (c = null);
    var l = {
      desc: e,
      type: t,
      okFun: o,
      title: a,
      target: i,
      okTxt: s,
      noTxt: r,
      noFun: c
    };
    r_AlertUI.AlertUI.showUI(l);
  };
  _ctor.prototype.getWeight = function (e) {
    var t = 0;
    e.forEach(function (e) {
      t += e;
    });
    var o = this.getRandomNum(0, t);
    var i = 0;
    for (var n = 0; n < e.length; n++) {
      if ((i += e[n]) >= o) {
        return n;
      }
    }
    return 0;
  };
  _ctor.prototype.playAnim = function (e, t, o) {
    undefined === o && (o = false);
    if (e) {
      e.visible || (e.visible = true);
      e.playing = false;
      e.loop = o;
      e.animationName = t;
      e.playing = true;
    }
  };
  _ctor.prototype.dropDataRandom = function (e, t) {
    var o = [];
    e.length < t && console.error("随机删库: 玩我呢？");
    for (var i = 0; i < t; i++) {
      var n = e.filter(function (e) {
        return !o.includes(e);
      });
      if (n.length <= 0) {
        break;
      }
      var a = n[this.getRandomNum(0, n.length - 1)];
      o.push(a);
    }
    return o;
  };
  _ctor.prototype.getWeightAny = function (e) {
    var t = 0;
    var o = [];
    for (var i = 0; i < e.length; i++) {
      var n = parseInt(e[i] || 0);
      o.push(t + n);
      t = o[i];
    }
    var a = Math.random() * t;
    for (var s = 0; s < e.length && !(a < o[s]); s++) {
      ;
    }
    return s;
  };
  _ctor.prototype.getTime = function (e) {
    if (e <= 0) {
      return "00:00";
    }
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t >= 10 ? "" + t : "0" + t) + ":" + (o >= 10 ? "" + o : "0" + o);
  };
  _ctor.prototype.getRepNum = function (e) {
    return parseInt(e.replace(/\D/g, ""));
  };
  _ctor.prototype.showBubble = function (e, t, o) {
    e.alpha = 0;
    e.text = t;
    e.visible = true;
    cc.Tween.stopAllByTarget(e);
    cc.tween(e).to(.5, {
      alpha: 1
    }).delay(2).to(.5, {
      alpha: 0
    }).call(function () {
      o && o();
    }).start();
  };
  _ctor.prototype.showLabelOneByOne = function (e, t, o, i) {
    undefined === o && (o = .05);
    if (e) {
      var n = 0;
      e.text = "";
      r_TimeSystem.TimeSystem.scheduleClear("wordOneByOne");
      r_TimeSystem.TimeSystem.schedule("wordOneByOne", o, function () {
        e.text += t[n];
        if (++n >= t.length) {
          i && i();
          r_TimeSystem.TimeSystem.scheduleClear("wordOneByOne");
        }
      });
    }
  };
  _ctor.prototype.stopLabelOneByOne = function (e, t, o) {
    r_TimeSystem.TimeSystem.scheduleClear("wordOneByOne");
    e && (e.text = t);
    o && o();
  };
  _ctor.prototype.makeRichTextTyper = function (e, t, o, i) {
    undefined === o && (o = .05);
    var n = /<.+?\/?>/g;
    var a = t.match(n);
    var s = ["✁", "✂", "✃", "✄", "✺", "✻", "✼", "❄", "❅", "❆", "❇", "❈", "❉", "❊"].find(function (e) {
      return -1 == t.indexOf(e);
    });
    var c = t.replace(n, s);
    var l = [];
    var u = [];
    var h = {};
    var p = 0;
    for (var d = 0; d < c.length; d++) {
      if (c[d] == s) {
        u.push(d);
        if (u.length >= 2) {
          h.endStr = a[2 * l.length + 1];
          h.endtIdx = d - p;
          l.push(h);
          u = [];
          h = {};
        } else {
          h.startIdx = d - p;
          h.startStr = a[2 * l.length];
        }
        p += 1;
      }
    }
    var y = t.replace(n, "").split("");
    var f = [];
    for (d = 1; d <= y.length; d++) {
      var m = y.join("").slice(0, d);
      var g = 0;
      for (var v = 0; v < l.length; v++) {
        var C = l[v];
        var S = C.startIdx;
        var I = C.endtIdx;
        if (d > S && d <= I) {
          m = m.slice(0, S + g) + C.startStr + m.slice(S + g) + C.endStr;
          g += C.startStr.length + C.endStr.length;
        } else if (d > I) {
          m = m.slice(0, S + g) + C.startStr + m.slice(S + g, I + g) + C.endStr + m.slice(I + g);
          g += C.startStr.length + C.endStr.length;
        }
      }
      f.unshift(m);
    }
    r_TimeSystem.TimeSystem.scheduleClear("wordOneByOne");
    r_TimeSystem.TimeSystem.schedule("wordOneByOne", o, function () {
      if (f.length) {
        e.text = f.pop();
      } else {
        i && i();
        r_TimeSystem.TimeSystem.scheduleClear("wordOneByOne");
      }
    });
  };
  _ctor.prototype.getCountDown = function (e) {
    if (e <= 0) {
      return "00:00";
    }
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t >= 10 ? "" + t : "0" + t) + ":" + (o >= 10 ? "" + o : "0" + o);
  };
  return _ctor;
}();
exports._UtilsSystem = exp__UtilsSystem;
exports.UtilsSystem = new exp__UtilsSystem();