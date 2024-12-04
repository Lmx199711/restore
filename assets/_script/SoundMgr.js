Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundMgr = undefined;
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var exp_SoundMgr = function () {
  function _ctor() {}
  _ctor.init = function () {
    this.orignMusicVolume = cc.audioEngine.getMusicVolume();
    this.orignEffectVolume = cc.audioEngine.getEffectsVolume();
  };
  Object.defineProperty(_ctor, "musicMuted", {
    get: function () {
      return 0 == this.musicVolume;
    },
    set: function (e) {
      this.musicVolume = e ? this.orignMusicVolume : 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "soundMuted", {
    get: function () {
      return 0 == this.soundVolume;
    },
    set: function (e) {
      this.soundVolume = e ? this.orignEffectVolume : 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "muted", {
    get: function () {
      return this.musicMuted && this.soundMuted;
    },
    set: function (e) {
      this.musicMuted = e;
      this.soundMuted = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "musicVolume", {
    get: function () {
      return cc.audioEngine.getMusicVolume();
    },
    set: function (e) {
      cc.audioEngine.setMusicVolume(e);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "soundVolume", {
    get: function () {
      return cc.audioEngine.getEffectsVolume();
    },
    set: function (e) {
      cc.audioEngine.setEffectsVolume(e);
      fgui.UIConfig.buttonSoundVolumeScale = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.playMusic = function (e, t) {
    undefined === t && (t = true);
    r_PlatformSystem.PlatformSystem.isLocalMode || this.curMusicName != e && (r_PlayerData.PlayerData.data.isCloseMusic || this.playAudio(e, t, true));
  };
  _ctor.stopMusic = function () {
    this.curMusicName = null;
    cc.audioEngine.stopMusic();
  };
  _ctor.stopAllMusic = function () {
    var e = this;
    this.curEffectMap.forEach(function (t, o) {
      if ("bgm" != t) {
        console.log("停止音乐：" + t);
        cc.audioEngine.stopEffect(o);
        return void e.curEffectMap.delete(o);
      }
    });
  };
  _ctor.pauseMusic = function () {
    cc.audioEngine.pauseMusic();
  };
  _ctor.resumeMusic = function () {
    cc.audioEngine.resumeMusic();
  };
  _ctor.playSound = function (e, t, o) {
    undefined === t && (t = false);
    undefined === o && (o = null);
    r_PlatformSystem.PlatformSystem.isLocalMode || e && (this.soundTimeMap[e] || (this.soundTimeMap[e] = 0), this.muted || r_PlayerData.PlayerData.data.isCloseSound || this.playAudio(e, t, false, o));
  };
  _ctor.stopSound = function (e) {
    var t = this;
    this.curEffectMap.forEach(function (o, i) {
      if (e == o) {
        cc.audioEngine.stopEffect(i);
        return void t.curEffectMap.delete(i);
      }
    });
  };
  _ctor.playAudio = function (e, t, o, i) {
    var n = this;
    undefined === i && (i = null);
    var s = "sound/" + e;
    r_ResSystem.ResSystem.loadBundleRes("resources1", s, cc.AudioClip, function (a, r) {
      if (a) {
        console.error("找不到音效 url=", s);
      } else if (o) {
        n.curMusicId = cc.audioEngine.playMusic(r, t);
        n.curMusicName = e;
      } else {
        var c = cc.audioEngine.playEffect(r, t);
        n.curEffectMap.set(c, e);
        i && i(c);
        cc.audioEngine.setFinishCallback(c, function () {
          n.curEffectMap.delete(c);
        });
      }
    });
  };
  _ctor.stopAllSound = function () {
    var e = this;
    this.curEffectMap.forEach(function (t, o) {
      cc.audioEngine.stopEffect(o);
      e.curEffectMap.delete(o);
    });
  };
  _ctor.curEffectMap = new Map();
  _ctor.soundTimeMap = {};
  return _ctor;
}();
exports.SoundMgr = exp_SoundMgr;