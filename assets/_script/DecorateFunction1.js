Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneClass = exports.FGUIClass = exports.UIClass = exports.FindTransition = exports.FindCtor = exports.AutoFind = exports.finFguiComponent = undefined;
var r_ClassFactory = require("ClassFactory");
function exp_finFguiComponent(e, t) {
  var o = 0;
  var i = "";
  var n = e;
  if (t.indexOf("/")) {
    for (; o < t.length;) {
      var a = t.charAt(o);
      if ("/" == a) {
        if (".." == i) {
          n = n.parent;
        } else {
          "." != i && (n = n.getChild(i));
        }
        i = "";
      } else {
        i += a;
      }
      o++;
    }
  } else {
    i = t;
  }
  return n.getChild(i);
}
exports.finFguiComponent = exp_finFguiComponent;
exports.AutoFind = function (e, t) {
  undefined === t && (t = true);
  return function (o, n) {
    if (t) {
      var s = o.onInit;
      o.onInit = function () {
        var t = [];
        for (var o = 0; o < arguments.length; o++) {
          t[o] = arguments[o];
        }
        this.needFindCom || (this.needFindCom = {});
        this.needFindCom[n] = e;
        s.call.apply(s, __spreadArrays([this], t));
      };
    } else {
      var r = o.onConstruct;
      o.onConstruct = function () {
        this[n] = exp_finFguiComponent(this, e);
        r.call(this);
      };
    }
  };
};
exports.FindCtor = function (e, t) {
  undefined === t && (t = true);
  return function (o, i) {
    var n = null;
    Object.defineProperty(o, i, {
      get: function () {
        if (!n) {
          var o = t ? this.contentPane : this;
          n = o.getController(e);
        }
        return n;
      }
    });
  };
};
exports.FindTransition = function (e, t) {
  undefined === t && (t = true);
  return function (o, i) {
    var n = null;
    Object.defineProperty(o, i, {
      get: function () {
        if (!n) {
          var o = t ? this.contentPane : this;
          n = o.getTransition(e);
        }
        return n;
      }
    });
  };
};
exports.UIClass = function (e) {
  undefined === e && (e = null);
  return function (e) {
    r_ClassFactory.ClassFactory.regUIClass(e);
  };
};
exports.FGUIClass = function (e) {
  return function (t) {
    r_ClassFactory.ClassFactory.regFguiCom(e, t);
  };
};
exports.SceneClass = function () {
  return function (e) {
    r_ClassFactory.ClassFactory.regSceneClass(e);
  };
};