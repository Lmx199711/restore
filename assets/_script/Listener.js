Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Listener = exports.Func = undefined;
var exp_Func = function () {
  function _ctor(e, t) {
    this.func = e;
    this.thisObj = t;
  }
  _ctor.prototype.run = function () {
    var e;
    var t = [];
    for (var o = 0; o < arguments.length; o++) {
      t[o] = arguments[o];
    }
    return (e = this.func).call.apply(e, __spreadArrays([this.thisObj], t));
  };
  return _ctor;
}();
exports.Func = exp_Func;
var exp_Listener = function () {
  function _ctor() {
    this.func = new Array();
  }
  _ctor.create = function (t, o) {
    undefined === o && (o = null);
    var i = new _ctor();
    i.add(t, o);
    return i;
  };
  _ctor.prototype.add = function (e, t) {
    undefined === t && (t = null);
    this.has(e, t) || this.func.push(new exp_Func(e, t));
  };
  _ctor.prototype.remove = function (e, t) {
    undefined === t && (t = null);
    for (var o = this.func.length - 1; o >= 0; o--) {
      var i = this.func[o];
      if (i.func == e && i.thisObj == t) {
        this.func.splice(o, 1);
        break;
      }
    }
  };
  _ctor.prototype.has = function (e, t) {
    return -1 != this.func.findIndex(function (o) {
      return o.thisObj == t && o.func == e;
    });
  };
  _ctor.prototype.run = function () {
    var e;
    var t = [];
    for (var o = 0; o < arguments.length; o++) {
      t[o] = arguments[o];
    }
    for (var n = 0; n < this.func.length; n++) {
      var a = this.func[n];
      (e = a.func).call.apply(e, __spreadArrays([a.thisObj], t));
    }
  };
  return _ctor;
}();
exports.Listener = exp_Listener;