var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RevertPosition = undefined;
var c;
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var d = _decorator.executeInEditMode;
(function (e) {
  e[e["数字块"] = 0] = "数字块";
  e[e["原名"] = 1] = "原名";
})(c || (c = {}));
var exp_RevertPosition = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.curLevel = 0;
    t.isNature = true;
    t.specifiedJson = null;
    t.jsType = c.原名;
    t.layerCount = 0;
    t.sbIndexObj = {};
    t.rootNodeReg = /\d+/;
    t.nodeNameReg = /\d+_*\d+/;
    t.beginIt = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.update = function () {};
  _ctor.prototype.findLevelJson = function () {
    return __awaiter(this, undefined, undefined, function () {
      var e;
      var t;
      var o;
      return __generator(this, function (i) {
        switch (i.label) {
          case 0:
            e = {};
            if (this.specifiedJson) {
              return [3, 3];
            } else {
              t = "levelRes/" + this.curLevel + "/_resultPos.json";
              o = "";
              cc.log("开始自动匹配json");
              return [4, new Promise(function (e) {
                Editor.assetdb.queryAssets("db://asset/levelRes/*", "json", function (i, n) {
                  if (!i) {
                    for (var a = 0; a < n.length; a++) {
                      var s = n[a];
                      var r = s.url;
                      var c = s.uuid;
                      if (-1 != r.indexOf(t)) {
                        o = c;
                        break;
                      }
                    }
                  }
                  e(1);
                });
              })];
            }
          case 1:
            i.sent();
            return [4, new Promise(function (t) {
              cc.assetManager.loadAny([o], function (o, i) {
                if (o) {
                  cc.log("err:" + o);
                } else {
                  e = i.json;
                  t(1);
                }
              });
            })];
          case 2:
            i.sent();
            return [3, 4];
          case 3:
            cc.log("使用您所指定的json");
            e = this.specifiedJson.json;
            i.label = 4;
          case 4:
            this.layerCount = Object.keys(e).length;
            switch (this.jsType) {
              case c.原名:
                this.RevertPosName(e);
                break;
              case c.数字块:
                this.revertPos(e);
            }
            return [2];
        }
      });
    });
  };
  _ctor.prototype.findNumInName = function (e, t) {
    if (!t) {
      return -1;
    }
    var o = e.pos;
    for (var i = 0; i < o.length; i++) {
      if (o[i].name == t) {
        return i;
      }
    }
    return -1;
  };
  _ctor.prototype.revertPos = function (e) {
    return __awaiter(this, undefined, undefined, function () {
      var t;
      var o;
      var i;
      var n;
      var a;
      var s;
      var c;
      var l;
      var u;
      var h;
      return __generator(this, function (r) {
        switch (r.label) {
          case 0:
            this.sbIndexObj = {};
            t = this.node.children;
            c = 0;
            r.label = 1;
          case 1:
            if (c < t.length) {
              o = t[c].name;
              if (i = o.match(this.nodeNameReg)) {
                if ((n = this.findNumInName(e, i[0])) > -1) {
                  t[c].x = e.pos[n].x;
                  t[c].y = e.pos[n].y;
                  if (this.sbIndexObj.hasOwnProperty(i[0])) {
                    this.sbIndexObj[i[0]].push(o);
                  } else {
                    this.sbIndexObj[i[0]] = [o];
                  }
                } else {
                  cc.log("无法在json中找到key" + i[0]);
                }
              } else {
                cc.log("提取数字块失败:" + o);
              }
              return [4, new Promise(function (e) {
                setTimeout(function () {
                  e(1);
                }, 10);
              })];
            } else {
              return [3, 4];
            }
          case 2:
            r.sent();
            r.label = 3;
          case 3:
            c++;
            return [3, 1];
          case 4:
            (a = Object.keys(this.sbIndexObj)).sort();
            s = this.node.childrenCount;
            c = 0;
            r.label = 5;
          case 5:
            if (!(c < a.length)) {
              return [3, 12];
            }
            l = a[c];
            u = 0;
            r.label = 6;
          case 6:
            if (u < this.sbIndexObj[l].length) {
              h = this.sbIndexObj[l][u];
              this.node.getChildByName(h).setSiblingIndex(s);
              return [4, new Promise(function (e) {
                setTimeout(function () {
                  e(1);
                }, 10);
              })];
            } else {
              return [3, 9];
            }
          case 7:
            r.sent();
            r.label = 8;
          case 8:
            u++;
            return [3, 6];
          case 9:
            return [4, new Promise(function (e) {
              setTimeout(function () {
                e(1);
              }, 50);
            })];
          case 10:
            r.sent();
            r.label = 11;
          case 11:
            c++;
            return [3, 5];
          case 12:
            cc.log("--完成Position");
            return [2];
        }
      });
    });
  };
  _ctor.prototype.RevertPosName = function (e) {
    return __awaiter(this, undefined, undefined, function () {
      var t;
      var o;
      var i;
      var n;
      var a;
      var s;
      var c;
      return __generator(this, function (r) {
        switch (r.label) {
          case 0:
            this.node.childrenCount;
            if (!e) {
              return [3, 4];
            }
            t = e.pos;
            o = 0;
            i = t;
            r.label = 1;
          case 1:
            if (o < i.length) {
              n = i[o];
              a = n.name;
              if (s = this.node.getChildByName(a)) {
                c = a.split("@");
                s.parent = this.CreateHierarchy(a, this.node);
                s.name = c[c.length - 1];
                s.setSiblingIndex(0);
                s.x = n.x;
                s.y = n.y;
              }
              return [4, new Promise(function (e) {
                setTimeout(function () {
                  e(1);
                }, 10);
              })];
            } else {
              return [3, 4];
            }
          case 2:
            r.sent();
            r.label = 3;
          case 3:
            o++;
            return [3, 1];
          case 4:
            return [4, new Promise(function (e) {
              setTimeout(function () {
                e(1);
              }, 50);
            })];
          case 5:
            r.sent();
            cc.log("--完成Position");
            return [2];
        }
      });
    });
  };
  _ctor.prototype.CreateHierarchy = function (e, t) {
    if (e.split("@").length > 1) {
      var o = e.slice(0, e.indexOf("@"));
      e = e.slice(e.indexOf("@") + 1);
      var i = t.getChildByName(o);
      if (!i) {
        (i = new cc.Node()).name = o;
        i.parent = t;
        i.setSiblingIndex(0);
      }
      return this.CreateHierarchy(e, i);
    }
    return t;
  };
  __decorate([_property({
    displayName: "关卡数",
    tooltip: "不填则默认从节点名称得到关卡数",
    range: [0, 9999, 1]
  })], _ctor.prototype, "curLevel", undefined);
  __decorate([_property({
    displayName: "根->叶为递增",
    tooltip: "默认勾选，取决于美术的导出选项"
  })], _ctor.prototype, "isNature", undefined);
  __decorate([_property({
    displayName: "看情况手动指定json",
    tooltip: "1.不填自动找asset>levelRes>关卡数>json;2.填了优先用填写的json",
    type: cc.JsonAsset
  })], _ctor.prototype, "specifiedJson", undefined);
  __decorate([_property({
    displayName: "检索依据",
    type: cc.Enum(c)
  })], _ctor.prototype, "jsType", undefined);
  __decorate([_property({
    displayName: "检测配置并还原<<<<"
  })], _ctor.prototype, "beginIt", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/还原坐标"), d], _ctor);
}(cc.Component);
exports.RevertPosition = exp_RevertPosition;