Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSymbolNum = exports.clampNum = exports.getRandomNumsFromArr = exports.GetLR = exports.Random1Num = exports.IsValueInWipeArea = exports.HandleData = exports.ARGS = exports.stringKeyToArr = exports.tweenDataByTarget = exports.TweenData = exports.defSortNodes = exports.playSpineAni_Asyc = exports.playSpineAni = exports.checkNodeOverOtherNode = exports.checkTouchNode = exports.changNodeParentV2 = exports.changNodeParent = exports.setNodePosToTargetPos = undefined;
var a = cc.mat4();
var s = cc.v3();
var r = cc.v2();
function exp_checkTouchNode(e, t) {
  if (!t.activeInHierarchy) {
    return false;
  }
  var o = t.getComponent(cc.PolygonCollider);
  if (o) {
    t.convertToNodeSpaceAR(e, r);
    if (cc.Intersection.pointInPolygon(r, o.points)) {
      return true;
    }
  } else {
    t.parent.convertToNodeSpaceAR(e, r);
    t.getWorldMatrix(a);
    a.getScale(s);
    var i = s.x * t.width;
    var n = s.y * t.height;
    if (cc.rect(t.x - .5 * i, t.y - .5 * n, i, n).contains(r)) {
      return true;
    }
  }
  return false;
}
exports.setNodePosToTargetPos = function (e, t) {
  if (e && t) {
    t.convertToWorldSpaceAR(cc.Vec2.ZERO, r);
    e.parent.convertToNodeSpaceAR(r, r);
    e.x = r.x;
    e.y = r.y;
  }
};
exports.changNodeParent = function (e, t, o) {
  undefined === o && (o = true);
  return !(!e || !t || (e.convertToWorldSpaceAR(cc.Vec2.ZERO, r), e.parent = t, t.convertToNodeSpaceAR(r, r), o ? (e.x = r.x, e.y = r.y) : e.x = e.y = 0, 0));
};
exports.changNodeParentV2 = function (e, t, o) {
  return !(!e || !t || (e.parent = t, null == o ? (e.x = 0, e.y = 0) : (t.convertToNodeSpaceAR(o, r), e.x = r.x, e.y = r.y), 0));
};
exports.checkTouchNode = exp_checkTouchNode;
exports.checkNodeOverOtherNode = function (e, t) {
  return !(!e || !t) && (e.convertToWorldSpaceAR(cc.Vec2.ZERO, r), exp_checkTouchNode(r, t));
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
exports.defSortNodes = function (e, t) {
  if (e.activeInHierarchy && !t.activeInHierarchy) {
    return -1;
  } else if (!e.activeInHierarchy && t.activeInHierarchy) {
    return 1;
  } else if (e.activeInHierarchy && t.activeInHierarchy) {
    return t.zIndex - e.zIndex;
  } else {
    return 0;
  }
};
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
exports.stringKeyToArr = function (e) {
  if (e) {
    if (e.includes(",")) {
      return e.split(",");
    } else {
      return [e];
    }
  } else {
    return null;
  }
};
exports.ARGS = {
  args: "args=",
  val: "val="
};
exports.HandleData = function (e) {
  var t = "";
  var i = [];
  if (e && e.length > 0) {
    var n = e.replace(/\s*/g, "");
    for (var a in exports.ARGS) if (n.indexOf(exports.ARGS[a]) > -1) {
      t = exports.ARGS[a];
      var s = n.indexOf(exports.ARGS[a]);
      i = n.substring(s + exports.ARGS[a].length).split("|");
      break;
    }
  }
  return {
    condition: t,
    args: i
  };
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
exports.clampNum = function (e, t, o) {
  if (e < t) {
    return t;
  } else if (e > o) {
    return o;
  } else {
    return e;
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