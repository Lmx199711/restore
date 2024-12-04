Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameDataMgr = require("GameDataMgr");
var r_LevelPreload = require("LevelPreload");
var r_LevelConfig = require("LevelConfig");
var r_ResSystem = require("ResSystem");
var r_SoundMgr = require("SoundMgr");
var r_ViewTipsUI = require("ViewTipsUI");
var r_GameTipUI = require("GameTipUI");
var r_City85UI = require("City85UI");
var r_UtilsSystem = require("UtilsSystem");
var def_LoadMgr = function () {
  function _ctor() {}
  _ctor.preLoadLevel = function (t) {
    return __awaiter(this, undefined, undefined, function () {
      var o;
      var i;
      var c;
      var y;
      var f;
      var m;
      return __generator(this, function (n) {
        switch (n.label) {
          case 0:
            this.isInLoad = true;
            r_ViewTipsUI.ViewTipsUI.reset();
            _ctor.audioCallback = null;
            if (this.runInstance) {
              this.runInstance.destroy();
              this.runInstance = null;
            }
            this.currLv = t;
            o = String(t).padStart(r_GameDataMgr.default.lvLength, "0");
            i = r_LevelConfig.default.levelInfo[t];
            if ((c = "prefab/" + (i.subPrefab || i.prefab)) == this.prevUrl) {
              return [3, 2];
            } else {
              console.log("清理上关预制体资源");
              this.clearCache();
              return [4, this.loadPrefabFunc(c)];
            }
          case 1:
            if (y = n.sent()) {
              this.prevPrefabAsset = y;
              return [3, 3];
            } else {
              console.log("错误关卡:", c);
              return [2];
            }
          case 2:
            console.log("和上一关一样,直接调用上关预制体");
            n.label = 3;
          case 3:
            if ("url" != i.tip1) {
              return [3, 5];
            } else {
              f = this;
              return [4, this.loadResImgFuncByLevel("labelTip/" + o)];
            }
          case 4:
            f.labelTip = n.sent();
            return [3, 6];
          case 5:
            this.labelTip = null;
            n.label = 6;
          case 6:
            if ("url" != i.tip2) {
              return [3, 8];
            } else {
              m = this;
              return [4, this.loadResImgFuncByLevel("ansTip/" + o)];
            }
          case 7:
            m.ansTip = n.sent();
            return [3, 9];
          case 8:
            this.ansTip = null;
            n.label = 9;
          case 9:
            this.runInstance = cc.instantiate(this.prevPrefabAsset);
            this.runInstance.position = cc.Vec3.ZERO;
            cc.director.getScene().getChildByName("Canvas").addChild(this.runInstance);
            r_GameTipUI.GameTipUI.showUI();
            r_City85UI.default.hide();
            r_UtilsSystem.UtilsSystem.showLoading(false);
            return [4, this.runInstance.getComponent(r_LevelPreload.default).loadPreload()];
          case 10:
            n.sent();
            this.runInstance.width = cc.view.getCanvasSize().width / cc.view.getScaleX();
            this.runInstance.height = cc.view.getCanvasSize().height / cc.view.getScaleY();
            0 == this.isRegistFont && this.registFont();
            i.newBgm && "" != i.newBgm && r_SoundMgr.SoundMgr.playMusic(i.newBgm);
            r_ViewTipsUI.ViewTipsUI.needRefreshPage = true;
            this.isInLoad = false;
            return [2, this.runInstance];
        }
      });
    });
  };
  _ctor.reloadAgain = function () {
    return __awaiter(this, undefined, undefined, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            if (this.runInstance) {
              this.runInstance.destroy();
              this.runInstance = null;
            }
            this.runInstance = cc.instantiate(this.prevPrefabAsset);
            this.runInstance.position = cc.Vec3.ZERO;
            this.runInstance.parent = cc.find("Canvas");
            this.runInstance.width = cc.view.getCanvasSize().width / cc.view.getScaleX();
            this.runInstance.height = cc.view.getCanvasSize().height / cc.view.getScaleX();
            return [4, this.runInstance.getComponent(r_LevelPreload.default).loadPreload()];
          case 1:
            e.sent();
            return [2];
        }
      });
    });
  };
  _ctor.clearCache = function () {
    if (this.prevPrefabAsset) {
      cc.assetManager.releaseAsset(this.prevPrefabAsset);
      this.prevPrefabAsset = null;
    }
  };
  _ctor.registFont = function () {};
  _ctor.readNetJson = function (e, t) {
    var o = new XMLHttpRequest();
    o.onreadystatechange = function () {
      if (4 == o.readyState) {
        if (o.status >= 200 && o.status < 400) {
          var e = o.responseText;
          if (e) {
            var i = JSON.parse(e);
            t(i);
          } else {
            t(false);
          }
        } else {
          t(false);
        }
      }
    };
    o.open("GET", e);
    o.send();
  };
  _ctor.loadABprefab = function (e) {
    e = "" + e;
    return new Promise(function (t) {
      cc.assetManager.loadBundle("resources", function (o, i) {
        if (o) {
          console.log("资源不存在AB包里", e);
        } else {
          i.load(e, cc.Prefab, function (e, o) {
            t(o);
          });
        }
      });
    });
  };
  _ctor.loadPrefabFunc = function (e) {
    e = "" + e;
    return new Promise(function (t) {
      r_ResSystem.ResSystem.loadBundleRes("wenzi1", e, cc.Prefab, function (e, o) {
        if (e) {
          console.log("加载预制体错误>:", e);
        } else {
          t(o);
        }
      });
    });
  };
  _ctor.loadResImgFuncByLevel = function (t, o) {
    return __awaiter(this, undefined, undefined, function () {
      return __generator(this, function (i) {
        switch (i.label) {
          case 0:
            undefined === o && (o = _ctor.currLv);
            if (r_LevelConfig.default.localLevel.includes(o)) {
              return [4, this.loadABResImgFunc(t)];
            } else {
              return [3, 2];
            }
          case 1:
            return [2, i.sent()];
          case 2:
            return [4, this.loadResImgFunc(t)];
          case 3:
            return [2, i.sent()];
        }
      });
    });
  };
  _ctor.loadResImgFunc = function (e) {
    return new Promise(function (t) {
      cc.loader.loadRes(e, cc.SpriteFrame, function (e, o) {
        if (e) {
          console.log(e.message);
          t(null);
        } else {
          t(o);
        }
      });
    });
  };
  _ctor.loadABResImgFunc = function (e) {
    return new Promise(function (t) {
      cc.assetManager.loadBundle("resources", function (o, i) {
        if (o) {
          console.log("资源不存在AB包里", e);
        } else {
          i.load(e, cc.SpriteFrame, function (e, o) {
            if (e) {
              console.log(e.message);
              t(null);
            } else {
              t(o);
            }
          });
        }
      });
    });
  };
  _ctor.LoadResImgByLevel = function (t, o, i, n) {
    undefined === i && (i = _ctor.currLv);
    if (r_LevelConfig.default.localLevel.includes(i)) {
      this.LoadABResImg(t, o, n);
    } else {
      this.LoadResImg(t, o, n);
    }
  };
  _ctor.LoadResImg = function (e, t, o) {
    e && t && cc.loader.loadRes(t, cc.SpriteFrame, function (t, i) {
      if (t) {
        console.log("加载本地图片出错 = ", t.message);
      } else {
        e.spriteFrame = i;
        o && o();
      }
    });
  };
  _ctor.LoadABResImg = function (e, t, o) {
    e && t && cc.assetManager.loadBundle("resources1", function (i, n) {
      if (i) {
        console.log("资源不存在AB包里", t);
      } else {
        n.load(t, cc.SpriteFrame, function (t, i) {
          if (t) {
            console.log("加载AB图片出错 = ", t.message);
          } else {
            e.spriteFrame = i;
            o && o();
          }
        });
      }
    });
  };
  _ctor.LoadResImgToGLoader = function (e, t, o) {
    e && t && cc.loader.loadRes(t, cc.SpriteFrame, function (t, i) {
      if (t) {
        console.log("加载本地图片出错 = ", t.message);
      } else {
        e.texture = i;
        o && o();
      }
    });
  };
  _ctor.LoadSpineByLevel = function (t, o, i, n) {
    undefined === i && (i = _ctor.currLv);
    if (r_LevelConfig.default.localLevel.includes(i)) {
      this.LoadABSpine(t, o, n);
    } else {
      this.LoadSpine(t, o, n);
    }
  };
  _ctor.LoadSpine = function (e, t, o) {
    e && t && r_ResSystem.ResSystem.loadBundleRes("resources1", t, sp.SkeletonData, function (t, i) {
      if (t) {
        console.log("加载resource spine出错 = ", t.message);
      } else {
        e.skeletonData = i;
        o && o();
      }
    });
  };
  _ctor.LoadABSpine = function (e, t, o) {
    e && t && cc.assetManager.loadBundle("resources", function (i, n) {
      if (i) {
        console.log("资源不存在AB包里", t);
      } else {
        n.load(t, sp.SkeletonData, function (t, i) {
          if (t) {
            console.log("加载AB spine出错 = ", t.message);
          } else {
            e.skeletonData = i;
            o && o();
          }
        });
      }
    });
  };
  _ctor.LoadSpineFuncByLevel = function (t, o) {
    return __awaiter(this, undefined, undefined, function () {
      return __generator(this, function (i) {
        switch (i.label) {
          case 0:
            undefined === o && (o = _ctor.currLv);
            if (r_LevelConfig.default.localLevel.includes(o)) {
              return [4, this.loadABSpineFunc(t)];
            } else {
              return [3, 2];
            }
          case 1:
            return [2, i.sent()];
          case 2:
            return [4, this.loadSpineFunc(t)];
          case 3:
            return [2, i.sent()];
        }
      });
    });
  };
  _ctor.loadSpineFunc = function (e) {
    return new Promise(function (t) {
      r_ResSystem.ResSystem.loadBundleRes("resources1", e, sp.SkeletonData, function (e, o) {
        if (e) {
          console.log("加载resource spine出错 = ", e.message);
        } else {
          t(o);
        }
      });
    });
  };
  _ctor.loadABSpineFunc = function (e) {
    return new Promise(function (t) {
      cc.assetManager.loadBundle("resources", function (o, i) {
        if (o) {
          console.log("资源不存在AB包里", e);
        } else {
          i.load(e, sp.SkeletonData, function (e, o) {
            if (e) {
              console.log(e.message);
              t(null);
            } else {
              t(o);
            }
          });
        }
      });
    });
  };
  _ctor.loadJsonFunc = function (e) {
    return new Promise(function (t) {
      r_ResSystem.ResSystem.loadBundleRes("resources1", e, cc.JsonAsset, function (e, o) {
        if (e) {
          console.log("加载cc.JsonAsset出错 = ", e.message);
          t(null);
        } else {
          t(o.json);
        }
      });
    });
  };
  _ctor.currLv = 0;
  _ctor.prevUrl = "";
  _ctor.prevPrefabAsset = null;
  _ctor.runInstance = null;
  _ctor.audioCallback = null;
  _ctor.labelTip = null;
  _ctor.ansTip = null;
  _ctor.currLevelList = [];
  _ctor.isRegistFont = false;
  _ctor.isInLoad = false;
  return _ctor;
}();
exports.default = def_LoadMgr;