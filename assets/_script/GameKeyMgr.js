var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameKeyMgr = exports.EventType = undefined;
var r_App = require("App");
var r_Event = require("Event");
var exp_EventType = function (e) {
  function _ctor(o, i) {
    return e.call(this, _ctor.ChangeKey, {
      key: i,
      add: o
    }) || this;
  }
  __extends(_ctor, e);
  _ctor.ChangeKey = "ChangeKey";
  return _ctor;
}(r_Event.Event);
exports.EventType = exp_EventType;
exports.GameKeyMgr = {
  EventType: exp_EventType,
  allKey: [],
  keyGroup: [],
  inputKey: "",
  VarObj: {
    total: 0
  },
  audioID: 0,
  clearInputKey: function () {
    this.add(this.inputKey);
    this.inputKey = "";
  },
  addGroup: function (e) {
    this.keyGroup.push(e);
  },
  add: function (e) {
    var t = this;
    console.log(":添加key：" + e);
    var o = [];
    if (e.includes(",")) {
      o = e.split(",");
    } else {
      e && o.push(e);
    }
    o.forEach(function (e) {
      if (!t.has(e)) {
        t.allKey.push(e);
        r_App.App.inst.dispatchEvent(new exp_EventType(true, e));
        var o = function (o) {
          var i = t.keyGroup[o];
          if (-1 != i.indexOf(e)) {
            var n = function (o) {
              if (i[o] == e) {
                return "continue";
              }
              var n = t.allKey.findIndex(function (e) {
                return e == i[o];
              });
              -1 != n && t.allKey.splice(n, 1);
            };
            for (var a = 0; a < i.length; a++) {
              n(a);
            }
          }
        };
        for (var i = 0; i < t.keyGroup.length; i++) {
          o(i);
        }
      }
    });
  },
  remove: function (e) {
    var t = this;
    console.log(":移除key：" + e);
    var o = [];
    if (e.includes(",")) {
      o = e.split(",");
    } else {
      e && o.push(e);
    }
    o.forEach(function (e) {
      var o = t.allKey.findIndex(function (t) {
        return t == e;
      });
      if (-1 != o) {
        t.allKey.splice(o, 1);
        r_App.App.inst.dispatchEvent(new exp_EventType(false, e));
      }
    });
  },
  clear: function () {
    this.allKey.length = 0;
    this.VarObj = {};
    if (this.keyGroup) {
      this.keyGroup.forEach(function (e) {
        e.length = 0;
      });
      this.keyGroup.length = 0;
    }
    this.keyValueMap = {};
  },
  has: function (e) {
    return -1 != this.allKey.findIndex(function (t) {
      return t == e;
    });
  }
};