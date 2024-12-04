var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadWaitUI = undefined;
var r_ResDef = require("ResDef");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_LoadResourceCfg = require("LoadResourceCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_BaseLayer = require("BaseLayer");
var exp_LoadWaitUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.LoadWait, r_UIDef.UIDef.Res.UI.LoadWaitUI) || this;
    t._count = 0;
    t._countSound = 0;
    t.isFinishOne = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LoadWaitUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LoadWaitUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.clickHide = function () {
    this.hide();
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.isFinishOne = false;
    this._count = 0;
    this.process1.value = 0;
    var o;
    var i = this.data.key;
    var n = r_LoadResourceCfg.LoadResourceCfg[i];
    if (n) {
      this.iconShow.icon = n.loadIcon;
      (!(o = n.arr || this.data.arr) || o.length < 1) && cc.warn("预加载失败，检查LoadResourceCfg是否配置,data是否传对");
      if (this.data.arr) {
        console.log("优先用showUI时传入的arr数组  ");
        this.txtDesc.text = "正在开启人生...";
        if (n.tips) {
          this.txtTip.visible = true;
          this.txtTip.text = n.tips[Math.floor(Math.random() * n.tips.length)];
        } else {
          this.txtTip.visible = false;
        }
        cc.tween(this.process1).to(.2, {
          value: 100
        }, {
          easing: cc.easing.sineInOut
        }).delay(.3).call(this.finishLoad.bind(this)).start();
        for (var a = 0; a < o.length; a++) {
          r_ResSystem.ResSystem.loadBundleRes(n.bundleName, o[a], cc.Prefab, function () {
            t._count++;
            if (t._count == o.length) {
              t._countSound = 0;
              for (var e = 0; e < n.sound.length; e++) {
                var i = n.sound[e];
                r_Index.ResMgr.getResAsync(r_ResDef.ResDef.getAudioClipUrl(i), cc.AudioClip, function () {
                  t._countSound++;
                  t._countSound == n.sound.length && t.finishLoad();
                });
              }
              cc.log("finishLoad2");
            }
          });
        }
      } else {
        for (a = 0; a < o.length; a++) {
          r_ResSystem.ResSystem.loadBundleRes(n.bundleName, o[a], cc.Prefab, function () {
            t._count++;
            if (t._count == o.length) {
              t.data.loadedCallback && t.data.loadedCallback();
              t.hide();
            } else {
              t.process1.value = Math.floor(100 / o.length * t._count);
              t.txtDesc.text = "加载中：" + Math.floor(100 / o.length * t._count) + "%";
            }
          });
        }
      }
    } else {
      cc.log("there is no LoadCfg obj,key:" + i);
    }
  };
  _ctor.prototype.finishLoad = function () {
    cc.log("finishLoad");
    if (this.isFinishOne) {
      cc.log("加载完毕");
      this.data.loadedCallback && this.data.loadedCallback();
      this.hide();
    }
    this.isFinishOne = true;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.rewardCoin = 1e10;
  __decorate([r_DecorateFunction1.AutoFind("process1")], _ctor.prototype, "process1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconShow")], _ctor.prototype, "iconShow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtTip")], _ctor.prototype, "txtTip", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.LoadWaitUI = exp_LoadWaitUI;