Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResSystem = exports._ResSystem = undefined;
var exp__ResSystem = function () {
  function _ctor() {
    this.bundleMap = {};
  }
  _ctor.prototype.loadBundleRes = function (e, t, o, i) {
    var n = this;
    if (t && "" != t) {
      var a = this.bundleMap[e];
      if (a) {
        var s = a.get(t, o);
        if (s) {
          return void (i && i(0, s));
        }
        a.load(t, o, function (e, t) {
          i && i(e, t);
        });
      } else {
        cc.assetManager.loadBundle(e, {}, function (a, s) {
          if (!a) {
            n.bundleMap[e] = s;
            s.load(t, o, function (e, t) {
              i && i(e, t);
            });
          }
        });
      }
    }
  };
  _ctor.prototype.loadBundleFguiImg = function (e, t, o, i) {
    this.loadBundleRes(t, o, cc.SpriteFrame, function (t, o) {
      e.texture = o;
      i && i();
    });
  };
  _ctor.prototype.loadBundleUIImg = function (e, t, o, i) {
    this.loadBundleRes(t, o, cc.SpriteFrame, function (t, o) {
      e.getComponent(cc.Sprite).spriteFrame = o;
      i && i(t);
    });
  };
  _ctor.prototype.loadImg = function (e, t) {
    var i = new cc.Node(e);
    var n = i.addComponent(cc.Sprite);
    n.type = cc.Sprite.Type.SIMPLE;
    exports.ResSystem.loadBundleRes("resources1", e, cc.SpriteFrame, function (e, o) {
      n.spriteFrame = o;
      n.sizeMode = cc.Sprite.SizeMode.RAW;
      t && t(n);
    });
    return i;
  };
  _ctor.prototype.loadHeadImg = function (e, t) {
    exports.ResSystem.loadBundleRes("resources1", "ui/head/head" + t, cc.SpriteFrame, function (t, o) {
      e.texture = o;
    });
  };
  _ctor.prototype.loadFguiImg = function (e, t) {
    exports.ResSystem.loadBundleRes("resources1", t, cc.SpriteFrame, function (t, o) {
      e.texture = o;
    });
  };
  _ctor.prototype.loadUIImg = function (e, t) {
    exports.ResSystem.loadBundleRes("resources1", t, cc.SpriteFrame, function (t, o) {
      e.getComponent(cc.Sprite).spriteFrame = o;
    });
  };
  return _ctor;
}();
exports._ResSystem = exp__ResSystem;
exports.ResSystem = new exp__ResSystem();