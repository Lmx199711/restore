Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clampNum = exports.GetLR = exports.getRandomNumsFromArr = exports.getSymbolNum = exports.IsValueInWipeArea = exports.Random1Num = exports.chekHasStringKeys = exports.stringKeyToArr = exports.tweenDataByTarget = exports.TweenData = exports.defSortNodes = exports.findPlaceTargetIndex = exports.findPlaceTarget = exports.playSpineAni_Asyc = exports.playSpineAni = exports.checkNodeOverOtherNode = exports.checkTouchNode2 = exports.checkTouchNode = exports.checkExploreNode = exports.changNodeParentV2 = exports.changNodeParent = exports.setNodePosToTargetPos = exports.findValueFromObj = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var s = cc.mat4();
var r = cc.v3();
var c = cc.v2();
function exp_checkTouchNode(e, t) {
  if (!t.activeInHierarchy) {
    return false;
  }
  var o = t.getComponent(cc.PolygonCollider);
  if (o) {
    t.convertToNodeSpaceAR(e, c);
    if (cc.Intersection.pointInPolygon(c, o.points)) {
      return true;
    }
  } else {
    t.parent.convertToNodeSpaceAR(e, c);
    t.getWorldMatrix(s);
    s.getScale(r);
    var i = r.x * t.width;
    var n = r.y * t.height;
    if (cc.rect(t.x - i * t.getAnchorPoint().x, t.y - n * t.getAnchorPoint().y, i, n).contains(c)) {
      return true;
    }
  }
  return false;
}
function exp_defSortNodes(e, t) {
  if (e.activeInHierarchy && !t.activeInHierarchy) {
    return -1;
  } else if (!e.activeInHierarchy && t.activeInHierarchy) {
    return 1;
  } else if (e.activeInHierarchy && t.activeInHierarchy) {
    return t.zIndex - e.zIndex;
  } else {
    return 0;
  }
}
exports.findValueFromObj = function (e, t) {
  var o = e;
  var i = e;
  if (!e || !t) {
    return o;
  }
  if ((e += "") && -1 != e.toString().indexOf("#")) {
    var n = t[e.substring(e.indexOf("#") + 1)];
    n && (o = n.toString());
  } else {
    var a = /{(\S+?)}/;
    for (var s = 0; null != a.exec(e);) {
      var r = a.exec(e);
      e = e.replace(a, t[r[1]] || "0");
      if (++s > 5) {
        console.log(cc.warn("error replaceKey:" + i));
        e = i;
        break;
      }
    }
    o = e;
  }
  return o;
};
exports.setNodePosToTargetPos = function (e, t) {
  if (e && t) {
    t.convertToWorldSpaceAR(cc.Vec2.ZERO, c);
    e.parent.convertToNodeSpaceAR(c, c);
    e.x = c.x;
    e.y = c.y;
  }
};
exports.changNodeParent = function (e, t, o) {
  undefined === o && (o = true);
  return !(!e || !t || (e.convertToWorldSpaceAR(cc.Vec2.ZERO, c), e.parent = t, t.convertToNodeSpaceAR(c, c), o ? (e.x = c.x, e.y = c.y) : e.x = e.y = 0, 0));
};
exports.changNodeParentV2 = function (e, t, o) {
  return !(!e || !t || (e.parent = t, null == o ? (e.x = 0, e.y = 0) : (t.convertToNodeSpaceAR(o, c), e.x = c.x, e.y = c.y), 0));
};
exports.checkExploreNode = function (e, t) {
  var o = t.getComponent(cc.PolygonCollider);
  if (o) {
    t.convertToNodeSpaceAR(e, c);
    if (cc.Intersection.pointInPolygon(c, o.points)) {
      return true;
    }
  } else {
    t.parent.convertToNodeSpaceAR(e, c);
    t.getWorldMatrix(s);
    s.getScale(r);
    var i = r.x * t.width;
    var n = r.y * t.height;
    if (cc.rect(t.x - .5 * i, t.y - .5 * n, i, n).contains(c)) {
      return true;
    }
  }
  return false;
};
exports.checkTouchNode = exp_checkTouchNode;
exports.checkTouchNode2 = function (e, t) {
  if (!t.activeInHierarchy) {
    return false;
  }
  var o = t.getComponent(cc.PolygonCollider);
  if (o) {
    t.convertToNodeSpaceAR(e, c);
    if (o.offset.len() > 0) {
      var i = 0;
      for (var n = o.points; i < n.length; i++) {
        var a = n[i];
        a.add(o.offset, a);
      }
      o.offset = new cc.Vec2(0, 0);
    }
    if (cc.Intersection.pointInPolygon(c, o.points)) {
      return true;
    }
  } else {
    t.parent.convertToNodeSpaceAR(e, c);
    t.getWorldMatrix(s);
    s.getScale(r);
    var l = r.x * t.width;
    var u = r.y * t.height;
    if (cc.rect(t.x - .5 * l, t.y - .5 * u, l, u).contains(c)) {
      return true;
    }
  }
  return false;
};
exports.checkNodeOverOtherNode = function (e, t) {
  return !(!e || !t) && (e.convertToWorldSpaceAR(cc.Vec2.ZERO, c), exp_checkTouchNode(c, t));
};
exports.playSpineAni = function (e, t, o, i) {
  if (e) {
    e.setCompleteListener(function () {});
    "" != i && e.setSkin(i);
    "" != t && e.setAnimation(0, t, o);
  }
};
exports.playSpineAni_Asyc = function (e, t, o, a, s) {
  return __awaiter(this, undefined, undefined, function () {
    return __generator(this, function () {
      if (e) {
        e.setCompleteListener(function () {
          s.active = false;
        });
        "" != a && e.setSkin(a);
        "" != t && e.setAnimation(0, t, o);
      }
      return [2];
    });
  });
};
exports.findPlaceTarget = function (e, t, o) {
  undefined === o && (o = null);
  o || (o = function (e, t) {
    return exp_defSortNodes(e.targetArea, t.targetArea);
  });
  var i = [];
  t.forEach(function (e) {
    i.push(e);
  });
  i.sort(o);
  for (var n = 0; n < i.length; n++) {
    var a = i[n];
    if (exp_checkTouchNode(e, a.targetArea)) {
      return a;
    }
  }
  return null;
};
exports.findPlaceTargetIndex = function (e, t, o) {
  undefined === o && (o = null);
  o || (o = function (e, t) {
    return exp_defSortNodes(e.targetArea, t.targetArea);
  });
  var i = [];
  t.forEach(function (e) {
    i.push(e);
  });
  i.sort(o);
  for (var n = 0; n < i.length; n++) {
    if (exp_checkTouchNode(e, i[n].targetArea)) {
      return n;
    }
  }
  return -1;
};
exports.defSortNodes = exp_defSortNodes;
function exp_stringKeyToArr(e) {
  if (e) {
    if (e.includes(",")) {
      return e.split(",");
    } else {
      return [e];
    }
  } else {
    return null;
  }
}
exports.TweenData = function () {
  this.originData = null;
  this.to = null;
  this.target = null;
  this.duration = 0;
};
exports.tweenDataByTarget = function (e) {
  if (0 != e.duration) {
    if (e.originData) {
      for (var t in e.originData) e.target[t] = e.originData[t];
    }
    return cc.tween(e.target).to(e.duration, e.to, {
      easing: e.easing ? e.easing : cc.easing.smooth
    }).start();
  }
  if (e.to && e.target) {
    for (var t in e.to) e.target[t] = e.to[t];
  }
};
exports.stringKeyToArr = exp_stringKeyToArr;
exports.chekHasStringKeys = function (e) {
  if (!e) {
    return true;
  }
  if (e.includes(",")) {
    var t = exp_stringKeyToArr(e);
    if (t && t.length > 0) {
      for (var o = 0; o < t.length; o++) {
        var i = t[o];
        if (!r_GameKeyMgr.GameKeyMgr.has(i)) {
          return false;
        }
      }
      return true;
    }
    return true;
  }
  return r_GameKeyMgr.GameKeyMgr.has(e);
};
exports.Random1Num = function (e) {
  var t = 0;
  if ("number" == typeof e) {
    t = e;
  } else if ("string" == typeof e && -1 != e.indexOf(">")) {
    var o = e.split(">");
    var i = parseInt(o[0]);
    var n = parseInt(o[1]);
    t = Math.floor(Math.random() * (n - i + 1) + i);
  } else {
    t = isNaN(Number(e)) ? 0 : Number(e);
  }
  return t;
};
exports.IsValueInWipeArea = function (e, t, o) {
  var i = e.slice();
  for (var n = 0; n < t.length; n++) {
    var a = i.indexOf(t[n]);
    if (!(a > -1)) {
      return false;
    }
    i.splice(a, 1);
  }
  if (null != o) {
    return i.indexOf(o) > -1;
  } else {
    return i.length < 1;
  }
};
exports.getSymbolNum = function (e) {
  if (e < 0) {
    return -1;
  } else if (e > 0) {
    return 1;
  } else {
    return undefined;
  }
};
exports.getRandomNumsFromArr = function (e, t) {
  var o = [];
  if (t > e.length) {
    cc.warn("从数组中取出n个数失败,count > arr len");
    return o;
  }
  for (; t > 0;) {
    var i = Math.floor(Math.random() * e.length);
    o.push(e.splice(i, 1)[0]);
    t--;
  }
  return o;
};
exports.GetLR = function (e) {
  var t = [0];
  if ("number" == typeof e) {
    t = [e];
  } else if ("string" == typeof e && -1 != e.indexOf(">")) {
    var o = e.split(">");
    t = [Number(o[0]), Number(o[1])];
  } else {
    isNaN(Number(e)) || (t = [Number(e)]);
  }
  return t;
};
exports.clampNum = function (e, t, o) {
  if (e < t) {
    return t;
  } else if (e > o) {
    return o;
  } else {
    return e;
  }
};