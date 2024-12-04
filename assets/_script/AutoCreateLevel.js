var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var p = _decorator.executeInEditMode;
var def_AutoCreateLevel = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.foldName = "999";
    t.startCreate = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.update = function () {};
  _ctor.prototype.readJson = function () {
    return __awaiter(this, undefined, undefined, function () {
      var e;
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
      var p;
      var d;
      var y;
      var f;
      var m;
      return __generator(this, function (g) {
        switch (g.label) {
          case 0:
            e = null;
            t = "levelRes/" + this.foldName + "/_resultPos.json";
            o = null;
            cc.log("开始自动匹配json");
            return [4, new Promise(function (e) {
              cc.log("匹配json中-2");
              Editor.assetdb.queryAssets("db://asset/levelRes/*", "json", function (i, n) {
                if (!i) {
                  cc.log("查找所有json中");
                  for (var a = 0; a < n.length; a++) {
                    var s = n[a];
                    var r = s.url;
                    var c = s.uuid;
                    if (-1 != r.indexOf(t)) {
                      cc.log("找到指定json");
                      o = c;
                      break;
                    }
                  }
                }
                o || cc.log("没找到_resultPos.json");
                e(1);
              });
            })];
          case 1:
            g.sent();
            cc.log("准备读取json内容");
            return [4, new Promise(function (t) {
              cc.assetManager.loadAny([o], function (o, i) {
                if (o) {
                  cc.log("err:" + o);
                } else {
                  cc.log("json内容为:" + JSON.stringify(i.json));
                  e = i.json;
                  t(1);
                }
              });
            })];
          case 2:
            g.sent();
            i = null;
            return [4, new Promise(function (e) {
              cc.log("匹配json中-2");
              Editor.assetdb.queryAssets("db://asset/levelRes/*", "sprite-frame", function (t, o) {
                if (!t) {
                  cc.log("查找所有png中");
                  i = o;
                  cc.log("查找所有png结束");
                }
                e(1);
              });
            })];
          case 3:
            g.sent();
            n = {};
            a = [];
            for (s in e) {
              c = "levelRes/" + this.foldName + "/" + s + ".png";
              l = false;
              for (m = 0; m < i.length; m++) {
                u = i[m];
                h = u.url;
                p = u.uuid;
                d = c.replace(" ", "-");
                if (!(-1 == h.indexOf(c) && -1 == h.indexOf(d))) {
                  cc.log("找到指定图片:" + s);
                  n[s] = p;
                  l = true;
                  a.unshift(s);
                }
              }
              l || cc.log("没找到图片uuid:" + s);
            }
            y = new cc.Node(this.foldName);
            this.node.addChild(y);
            f = function (t) {
              var o;
              var i;
              var s;
              var c;
              return __generator(this, function (r) {
                switch (r.label) {
                  case 0:
                    o = a[t];
                    if (i = n[o]) {
                      s = new cc.Node(o);
                      y.addChild(s);
                      (c = s.addComponent(cc.Sprite)).type = cc.Sprite.Type.SIMPLE;
                      s.x = e[o].x;
                      s.y = e[o].y;
                      return [4, new Promise(function (e) {
                        cc.assetManager.loadAny({
                          uuid: i,
                          type: cc.SpriteFrame
                        }, function (t, o) {
                          if (t) {
                            cc.log("err:" + t);
                          } else {
                            c.spriteFrame = o;
                            c.sizeMode = cc.Sprite.SizeMode.RAW;
                            e(1);
                          }
                        });
                      })];
                    } else {
                      cc.log("没找到图片uuid:" + o);
                      return [2, "continue"];
                    }
                  case 1:
                    r.sent();
                    return [2];
                }
              });
            };
            m = 0;
            g.label = 4;
          case 4:
            if (m < a.length) {
              return [5, f(m)];
            } else {
              return [3, 7];
            }
          case 5:
            g.sent();
            g.label = 6;
          case 6:
            m++;
            return [3, 4];
          case 7:
            return [2];
        }
      });
    });
  };
  __decorate([_property({
    displayName: "levelRes下的关卡文件夹名字",
    type: String
  })], _ctor.prototype, "foldName", undefined);
  __decorate([_property({
    displayName: "开始生成"
  })], _ctor.prototype, "startCreate", undefined);
  return __decorate([_ccclass(), _menu("自动生成关卡"), p], _ctor);
}(cc.Component);
exports.default = def_AutoCreateLevel;