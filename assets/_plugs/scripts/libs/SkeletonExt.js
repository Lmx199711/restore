cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
  cc.js.mixin(sp.Skeleton.prototype, {
    update: function update(i) {
      if (!this.paused) if (i *= this.timeScale * sp.timeScale, this.isAnimationCached()) {
        if (this._isAniComplete) {
          if (0 === this._animationQueue.length && !this._headAniInfo) {
            var _i = this._frameCache;
            if (_i && _i.isInvalid()) {
              _i.updateToFrame();
              var e = _i.frames;
              this._curFrame = e[e.length - 1];
            }
            return;
          }
          if (this._headAniInfo || (this._headAniInfo = this._animationQueue.shift()), this._accTime += i, this._accTime > this._headAniInfo.delay) {
            var _i2 = this._headAniInfo;
            this._headAniInfo = null, this.setAnimation(0, _i2.animationName, _i2.loop);
          }
          return;
        }
        this._updateCache(i);
      } else this._updateRealtime(i);
    }
  });
});