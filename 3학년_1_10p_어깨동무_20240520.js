(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.title = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#278345").s().p("ADZD9QgagHgTgOQgSgOgKgVQgKgTAAgZQAAgYAKgTQAKgUASgOQASgPAagIQAagJAfAAQAfAAAZAJQAaAIASAPQATAOAKATQAKAUAAAYQAAAYgKAUQgKAUgTAPQgSAOgaAHQgZAJgfgBQgfABgZgJgAD0B8QgPALAAASQAAASAPAMQAPAMAYAAQAXAAAPgMQAQgMAAgSQAAgSgQgLQgQgNgWAAQgZAAgOANgAKrDOQgRAAAAgQIgBhnIiKACQgIABgEgEQgFgFAAgIIAAgtQAAgHAFgFQAEgFAIAAIF5gBQAIAAAEAFQAEAFAAAHIAAAnQAAAIgEAEQgEAEgIAAIiKADIgCBpQgBAQgPAAgAgrC0QgRAAAAgQIAAitIgfAAIgDCtQAAAQgQAAIgrAAQgRAAAAgQIgFl/QAAgQAQAAIA4AAQAQAAAAAQIgDB9IAegBIAAiCQAAgQAQAAIA3AAQARAAgBAQIgMGFQAAAQgPAAgAozC0QgRAAAAgQIAAjFIgsAAQgDAMgEALQgLAbgUAVQgUAVgbAKQgbALghAAQggAAgcgLQgbgKgUgVQgUgUgMgcQgLgcAAgjQAAgkALgdQAMgeAUgUQAUgVAbgLQAcgMAgAAQAhAAAbAMQAbALAUAVQAUAUALAeIAGAUIAtAAIAAhrQAAgQAQAAIBDAAQARAAAAAQIgNGFQAAAQgQAAgAskh/QgPAUAAAiQAAAgAPAUQARATAaAAQAbAAAQgTQAQgUAAggQAAgigQgUQgQgTgbAAQgbAAgQATgAkABzIgrgJQgHgBgEgHQgEgFADgJQAQg0AHg4QAIg3ABg1IghAAQgCA1gNA2QgMA2gTAzQgHASgRgEIgmgMQgIgCgCgHQgDgGADgHQAQgvAJgqQAJgrADgsIghAAQgNABAAgOIAAg/QAAgOANgBIBLAAIAAgCQAAgOANAAIBuAAQAOAAAJAIQAKAIAAARIAAALQAABIgKBGQgJBGgUBCQgFAQgNAAIgEAAgABHAZQgEgFAAgHIAAgnQAAgHAEgFQAEgFAIAAICNAAIgBgfIhUABQggAAgBghIgCh4QgBgTAIgHQAJgHARAAIEfgCQAIABAGAFQAFAFAAAJIAAAjQAAAJgFAGQgGAFgIAAIjfACIAAAlIDhABQASAAAAAPIAAAmQAAAPgPAAIhsACIAAAgICMgBQAHAAAFAFQAEAEAAAIIAAAhQAAAHgEAEQgFAFgHAAIl6AIIgBABQgHAAgEgFgAIogcQgHgIgBgMIgCiqQgBgNAIgHQAHgIANAAIElAAQAMgBAIAHQAIAIgBANIgDCoQgBANgHAIQgHAHgNAAIkeACQgNAAgHgHgAJ8ipIABBFICggBIgBhFg");
	this.shape.setTransform(96.925,33.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.9,7.8,184.1,52.300000000000004);


(lib.menubtn_over = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABYBuQgLAAgFgFQgEgDgBgLIAAglQABgMAEgEQAFgFALACIB2AAQAGAAACADQACADAAAGQAAAEgCAEQgCAEgGgBIhnAAQAAAAgBABQgBAAAAAAQgBAAAAAAQAAABAAAAIgBAFIAAAPQAAAAAAABQAAABAAAAQAAABAAAAQAAABABAAIADABIBpAAQAFAAADAEQACADAAAGQAAAFgCADQgDAEgFAAgAGZBeQgFgEAAgGIAAi0QAAgHAFgDQAEgDAGAAQAGAAAFADQAEADAAAHIAAC0QAAAGgEAEQgFADgGAAQgGAAgEgDgAg6BeQgEgDAAgGIAAhhIgSAAIAABXQgBAGgEADQgEADgGAAQgFAAgEgDQgEgDAAgGIAAiqQAAgGAEgDQAEgCAFAAQAGAAAEACQAEADABAGIAAA5IASAAIAAg7QAAgGAEgDQAFgDAGAAQAFAAAEADQAEADAAAGIAAC2QAAAGgEADQgEADgFAAQgGAAgFgDgAmmBNQgFAAgDgDQgDgEAAgFQAAgGADgDQADgEAFgBIBKAAIAAgrIgnAAQgLgBgFgEQgEgDAAgLIAAhKQABgGADgDQAFgEAGABQAHgBAEAEQAEADABAGIAAA+QAAABAAABQAAABAAAAQAAABAAAAQAAABAAAAIAFABIBqAAQAGAAACADQADAEAAAGQAAAEgDADQgCAEgGABIg0AAIAAArIBKAAQAGABADAEQACADgBAGQABAFgCAEQgDADgGAAgAERAzQgFgCgDgEQgCgFgBgFQAAgGAGgDQAYgPAOgJQAOgKAGgHQAHgHABgIQACgHAAgLIAAgNQAAgBAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIg4AAQgFAAgDgDQgDgFAAgFQAAgFADgEQADgEAFAAIBHAAQAMAAAEAFQAFADAAAMIAAAaQAAAOgEAMQgDALgIAKQgJAJgQAMQgQANgcAQQgDACgCAAIgFgBgAjUAqQgFgFAAgLIAAgqQAAgLAFgFQAEgEALAAIAhAAIADgBIABgEIAAgVIgBgEIgDgBIgqAAQgFAAgDgEQgDgDAAgGQAAgGADgDQADgEAFAAIA4AAQALAAAFAFQAEADgBAMIAAAqQABAMgEAEQgFAEgLAAIggAAIgFABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAAAABIAAAVQAAABAAAAQAAABAAAAQABABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAABAAQAAAAABAAIAbAAIAYgCQAHgBACADQADAEABAFQAAAEgBAFQgDAEgEAAQgIACgSABQgRABgcAAIgCAAQgJAAgEgEgAA1ARQgFAAgDgEQgDgEAAgFQAAgEADgEQADgDAFAAICzAAQAGAAACADQACAEABAEQgBAFgCAEQgCAEgGAAgABZgYQgMAAgEgFQgFgEABgLIAAgmQgBgLAFgEQAEgFAMAAIB1AAQAEABADADQADADAAAGQAAAFgDAEQgDADgEAAIhmAAIgEABIgBAFIAAARIABADQAAABABAAQAAAAABABQAAAAABAAQAAAAABAAIBoAAQAFABADADQACADAAAFQAAAFgCAEQgDADgFABg");
	this.shape.setTransform(89.1,25.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AA6BkQgRgLAAgVQAAgWARgLQAQgKAeAAQAeAAARAKQARALAAAWQAAAVgRALQgRAKgeAAQgeAAgQgKgABMA2QgIAEAAAKQAAAIAIAFQAJAGATAAQATAAAJgGQAIgFAAgIQAAgKgIgEQgJgFgTAAQgTAAgJAFgAEmBrQgKgBgEgEQgFgEAAgKIAAgkQAAgLAFgFQAEgEAKABIBqAAQAGgBACAEQACAEAAAEQAAAFgCAEQgCADgGAAIhcAAIgEACIgBAEIAAAPIABAEIAEABIBfAAQAFAAACAEQACADAAAFQAAAGgCADQgCADgFABgAl6BqQgKgBgEgEQgFgEAAgKIAAglQABgGAEgDQAEgDAGAAQAFAAAEADQAEADAAAGIAAAZIABAEQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAIBhAAQAFABACADQADAEAAAFQAAAFgDADQgCAEgFABgAotBpQgKAAgFgFQgDgEAAgLIAAgrQAAgHAEgDQAEgDAGAAQAFAAAEADQAEADABAHIAAAgIABAEQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAAAIBdAAQAFABACADQADAEAAAFQAAAFgDAEQgCADgFABgAJJBbQgEgDAAgHIAAivQAAgHAEgDQAEgCAFgBQAGABAEACQAEADAAAHIAACvQAAAHgEADQgEADgGAAQgFAAgEgDgAhgBbQgEgDgBgHIAAivQABgHAEgDQAEgCAGgBQAFABAEACQAEADAAAHIAAA3IAUAAQAGAAACAEQACADAAAGQAAAFgCAEQgCAEgGAAIgUAAIAABeQAAAHgEADQgEADgFAAQgGAAgEgDgAlQA7QgDgDAAgGIAAgbIhHAAQgFAAgCgEQgDgDAAgGQAAgFADgEQACgCAFAAICjAAQAFAAACACQACAEAAAFQAAAGgCADQgCAEgFAAIhBAAIAAAbQAAAGgEADQgEACgGABQgGgBgEgCgAHOAxQgFgCgCgEQgDgFAAgEQAAgHAFgCIAigZQANgIAGgIQAGgGACgIQABgHAAgKIAAgOQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBgBAAIgEgBIgzAAQgEAAgDgEQgCgDAAgGQAAgEACgFQADgDAEAAIBBAAQALAAAEAEQAEAEAAALIAAAaQAAANgDAMQgDALgIAKQgHAJgPALQgPAMgZAQQgCACgDAAIgEgBgAnUAuQgEgCAAgHIAAhAIgZAAQgGAAgCgDQgCgEAAgFQAAgGACgDQACgEAGAAIAZAAIAAgqQAAgHAEgDQAEgCAFgBQAGABAEACQAEADAAAHIAACDQAAAHgEACQgEAEgGAAQgFAAgEgEgAjWAxQgFgCgCgEQgDgEAAgGQAAgGAFgCIAigZQAMgIAHgIQAGgGABgIQACgHAAgKIAAgOIgBgDIgEgBIgzAAQgEgBgDgEQgCgDAAgGQAAgFACgDQADgEAEAAIBBAAQAKAAAEAEQAEAEAAALIAAAaQAAAOgDALQgCAKgIAKQgIAKgPALQgOALgZAQQgDACgDAAIgDAAgACPAVQgDgDgBgHIAAhpQABgHADgDQAFgCAFgBQAGABAEACQAEADAAAHIAAAnIAUAAQAFAAACADQADAFAAAEQAAAGgDADQgCAFgFAAIgUAAIAAAoQAAAHgEADQgEACgGABQgFgBgFgCgApVAWQgFgCgDgDQgDgFABgFQAAgFAEgDIAOgLIANgMQAHgHADgHQADgIAAgKIAAgNIgfAAQgFAAgDgDQgCgDAAgGQAAgFACgDQADgEAFAAIBYAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFAAIgdAAIAAAMQAAALADAHQADAIAHAGIANAMIALAJQAEAEAAADQAAAFgCAEQgDAEgFABQgEACgFgDIgKgIIgLgJIgLgKQgDgFAAgCIgBAAQAAADgEAEIgLALIgMAKIgMAKQgDACgEAAIgCAAgAAWASQgFgCgCgDQgDgFAAgEQABgFAFgDIANgKIAPgLQAGgFADgGQADgGAAgJIAAgGIgiAAQgFAAgCgFQgCgDAAgFQAAgFACgEQACgDAFAAIAiAAIAAgPQAAgGAEgDQAEgDAFAAQAGAAAEADQAEADAAAGIAAAPIAfAAQAFAAACADQADAEAAAFQAAAFgDADQgCAFgFAAIgfAAIAAAFQAAAJADAGQADAGAGAFIANAKIALAIQAFAEAAAEQABAEgDAFQgDAEgEACQgFABgFgDIgJgHQgFgDgGgEIgLgKQgEgEAAgDIgBAAQAAAEgEAFIgMAJIgLAIIgNAJQgDACgDAAIgDgBgAEGAQQgFAAgCgDQgDgFAAgEQAAgFADgDQACgEAFAAICjAAQAEAAADAEQACADAAAFQAAAEgCAFQgDADgEAAgAl6gSQgKAAgEgEQgEgFAAgKIAAgrQAAgLAEgEQAEgEAKAAIBiAAQALAAAEAEQAEAEAAALIAAArQAAAKgEAFQgEAEgLAAgAlwhJIgBAEIAAAVIABAEQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAIBHAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAIABgEIAAgVIgBgEQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAIhHAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAABgBAAgAEmgZQgKAAgEgDQgEgFAAgLIAAglQAAgKAEgFQAEgEAKAAIBqAAQAFAAACAEQADADAAAFQAAAGgDADQgCAEgFAAIhcAAIgDABIgBAEIAAAQIABAFIADABIBfAAQAEAAACADQADADAAAFQAAAGgDADQgCADgEAAg");
	this.shape_1.setTransform(89.0714,26.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAYBsQgFgEAAgGIAAg8IhIAAQgFABgDgEQgDgEAAgFQAAgFADgDQADgEAFgBICvAAQAGABACAEQADADAAAFQAAAFgDAEQgCAEgGgBIhJAAIAAA8QAAAGgFAEQgEACgGAAQgGAAgEgCgAH4BbQgFgEAAgGIAAixQAAgHAFgDQAEgDAGAAQAGAAAEADQAFADAAAHIAACxQAAAGgFAEQgEACgGAAQgGAAgEgCgAi2BbQgEgEAAgGIAAixQAAgHAEgDQAFgDAGAAQAGAAAEADQAEADABAHIAAA3IAWAAQAFABADAEQADADAAAGQAAAFgDAEQgDAEgFAAIgWAAIAABfQgBAGgEAEQgEACgGAAQgGAAgFgCgAmBBbQgFgDAAgHIAAiyQAAgGAFgDQAEgDAGAAQAGAAAEADQAEADAAAGIAAA4IAUAAQAFABADAEQACADAAAGQAAAFgCAEQgDAEgFgBIgUAAIAABgQAAAHgEADQgEACgGAAQgGAAgEgCgACaBLQgGAAgCgEQgDgEAAgEQAAgGADgEQACgEAGAAICwAAQAFAAADAEQACAEAAAGQAAAEgCAEQgDAEgFAAgAFyAwQgFgCgDgDQgCgFAAgFQAAgGAFgDQAYgOANgKQAOgJAHgHQAGgIACgIQABgGAAgLIAAgNQAAgBAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBIgEgBIg3AAQgFABgDgEQgCgEAAgFQAAgFACgEQADgEAFAAIBGAAQAMAAAEAEQAEAEAAAMIAAAZQAAAOgDAMQgDAKgIALQgJAIgQAMQgQANgaAPQgEACgDAAIgEgBgAk5AoQgEgDAAgLIAAgrQAAgMAEgEQAFgEALAAIAsAAIAEgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAgWQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBgBIgEgBIg2AAQgFAAgDgDQgCgEAAgFQAAgFACgDQADgFAFAAIBFAAQALAAAFAFQAEAEAAALIAAArQAAALgEAEQgFAFgLgBIgtAAIgEACIgBADIAAAXIABAEIAEABIAngBQASgBARgCQAFgBAEADQACAEABAFQABAFgCAEQgCADgGABIgVADIgeACIgoAAQgLAAgFgFgAnIAkQgFgEABgLIAAheQgBgLAFgFQAEgEALAAIAbAAQAFAAADAEQADAEAAAFQAAAFgDAEQgDAEgFgBIgNAAIgEABQAAABAAAAQAAABgBAAQAAABAAAAQAAABAAABIAABIIABAEQAAAAABABQAAAAABAAQAAAAABAAQABAAAAAAIAJAAIAIgBQAFAAADACQAEADAAAFQABAGgCAEQgCAEgFAAIgQACIgTAAIgCAAQgJAAgEgEgAoLAkQgFgEAAgLIAAheQAAgLAFgFQAEgEALAAIAcAAQAFAAADAEQACAEAAAFQAAAFgCAEQgDAEgFgBIgOAAIgEABQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAABIAABIIABAEQAAAAABABQAAAAAAAAQABAAABAAQAAAAABAAIAJAAIAHgBQAGAAACADQADACABAGQAAAFgBAEQgDADgFABIgOACIgTAAIgCAAQgJAAgEgEgACtAQQgEgEAAgLIAAgfQAAgLAEgEQAFgFAKAAIBbAAIAEgBIABgDIAAgLIgBgFIgEgBIhkAAQgFAAgDgDQgCgEAAgFQAAgFACgEQADgEAFAAIBzAAQALAAAEAFQAFAEAAAKIAAAhQAAAKgFAFQgEAEgLAAIhbAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBABAAAAIgBAEIAAALIABAEIAEABIBpAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFAAIh4AAIgCAAQgJAAgEgEgAgTgGQgKABgFgFQgFgEABgLIAAhBQAAgHAFgCQAEgDAFgBQAGABAFADQAEACAAAHIAAAPIBXAAIAAgPQAAgHAEgCQAFgDAGgBQAFABAFADQAEACABAHIAABBQAAALgFAEQgFAFgKgBgAgJgiQAAABAAABQABAAAAABQABAAAAAAQABAAABAAIBPAAQABAAABAAQAAAAABAAQAAgBABAAQAAgBAAgBIAAgQIhXAAg");
	this.shape_2.setTransform(89.675,26.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AiEBrQgEgDAAgHIAAg9IhIAAQgGAAgDgDQgDgEAAgFQAAgGADgDQADgDAGgBICvAAQAGABACADQACADAAAGQAAAFgCAEQgCADgGAAIhKAAIAAA9QABAHgFADQgEADgGAAQgFAAgGgDgABRBrQgMgBgEgEQgEgEAAgLIAAgkQAAgLAEgEQAEgEAMAAIBzAAQAGAAACAEQACADAAAFQAAAGgCADQgCADgGAAIhkAAQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAIgBAFIAAAOIABAFQAAABAAAAQABAAAAAAQABAAAAAAQABAAABAAIBmAAQAGAAACADQACAEAAAFQAAAFgCADQgCAFgGAAgAl3BpQgKAAgFgFQgFgFABgKIAAgrQAAgGAEgDQAFgDAGgBQAGABAEADQAFADAAAGIAAAfQAAAEACABQAAAAAAABQABAAAAAAQABAAAAAAQABAAABAAIBhAAQAEAAADAEQADADAAAGQAAAFgDADQgDAFgEAAgAGKBbQgEgEgBgGIAAiyQABgGAEgDQAEgDAFAAQAHAAADADQAGADAAAGIAACyQAAAGgGAEQgDACgHAAQgFAAgEgCgAkZAtQgFgDgBgGIAAiFQABgGAFgDQADgDAHAAQAGAAAEADQAEADABAGIAAAuIAVAAQAGABADADQACADAAAGQAAAFgCAFQgDACgGABIgVAAIAAA9QgBAGgEADQgEAEgGAAQgHAAgDgEgAEEAxQgFgDgDgEQgCgEAAgFQAAgGAFgDQAYgPANgJQAOgJAHgIQAGgHACgHQABgIAAgKIAAgNQABgEgBgBQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBgBgBAAIg3AAQgFAAgDgCQgCgEAAgFQAAgFACgEQADgEAFAAIBGAAQAMAAAEAEQAEAEAAAMIAAAZQAAAPgDAKQgDALgIALQgIAIgRAMQgQAMgbAQQgDACgEAAIgDAAgAAuAPQgGAAgCgEQgCgEgBgFQABgEACgDQACgFAGABICxAAQAEgBADAFQACADAAAEQAAAFgCAEQgDAEgEAAgAmOAMQgLAAgEgFQgFgEAAgJIAAhQQAAgGAFgDQAEgCAGAAQAFAAAEACQAFADAAAGIAAAZIAtAAIAAgZQAAgGAEgDQAFgCAGAAQAFAAAFACQAEADAAAGIAABQQAAAJgEAEQgFAFgLAAgAmFgRQAAABAAAAQAAABAAAAQABABAAAAQAAABABAAIAEABIAiAAIAEgBIABgEIAAgTIgtAAgAjBgEQgFgBgCgGQgDgFABgFQABgFAEgCIAUgJIAWgKQAKgGAEgGQAFgFAAgIIAAgBIgyAAQgFgBgCgEQgEgCAAgHQAAgFAEgEQACgDAFAAICCAAQAFAAADADQACAEAAAFQAAAHgCACQgDAEgFABIgyAAIAAABQAAAIAEAFQAFAGAKAGIAVAKIAUAJQAFACABAFQABAEgCAFQgDAGgFACQgFACgEgCIgWgKIgUgKQgLgFgEgEQgFgEAAgEIgBAAQgBAEgEAEQgGAFgLAFIgUAJIgUAKIgGACIgEgCgABRgZQgLAAgFgEQgEgFAAgLIAAglQAAgMAEgDQAFgFALgBIBzAAQAGABABAEQADADAAAGQAAAFgDAEQgBACgGAAIhkAAQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAIgBAFIAAARIABADQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAIBmAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFABg");
	this.shape_3.setTransform(88.45,26.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).wait(12));

	// 레이어_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#278345").s().p("Am5ERQhyAAhPhQQhQhRAAhwQAAhxBQhPQBPhQByAAINzAAQBxAABQBQQBQBPAABxQAABwhQBRQhQBQhxAAg");
	this.shape_4.setTransform(90.1,26.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3).to({_off:true},1).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(18.6,-0.7,143,54.6);


(lib.ment = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ment
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#636466").s().p("AjDBFQgCgCgBgEIAAgnIgvAAQgEAAgBgDQgBgCgBgDQABgEABgCQABgCAEgBIByAAQADABABACQACACAAAEQAAADgCACQgBADgDAAIgwAAIAAAnQAAAEgCACQgDACgEAAQgEAAgDgCgAheBEQgIAAgCgDQgEgDAAgHIAAgXQAAgEAEgCQADgCADAAQAEAAADACQADACAAAEIAAAQIAAADIAEABIBCAAQAEAAACACQACACAAAEQAAADgCADQgCACgEAAgADtA6QgEgCAAgEIAAhyQAAgEAEgCQACgCAEAAQAEAAACACQADACAAAEIAAByQAAAEgDACQgCACgEAAQgEAAgCgCgAAQAwQgDAAgBgCQgCgDAAgDQAAgDACgDQABgCADAAIAvAAIAAgUQABgEADgCQADgCADAAQAEAAADACQADACAAAEIAAAUIAvAAQADAAACACQABADAAADQAAADgBADQgCACgDAAgACVAbQgDgDgBgHIAAgcQABgHADgDQACgCAIAAIAcAAIADgBQAAAAAAgBQABAAAAAAQAAAAAAgBQAAAAgBgBIAAgOQABAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAIgDAAIgjAAQgEAAgBgDQgCgCAAgDQAAgEACgCQABgCAEgBIAtAAQAHAAADADQADADAAAHIAAAcQAAAHgDADQgDACgHAAIgdAAIgCABIgBADIAAAOIABACQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAABAAIAagBIAWgCQAEAAACACQACACAAADQABAEgCACQgBADgDAAIgOACIgUABIgaAAQgIAAgCgCgAh1APQgEAAgBgDQgCgCAAgDQAAgEACgCQABgBAEAAIByAAQADAAAAABQACACAAAEQAAADgCACQAAADgDAAgAAaAHQgDgBgCgDQgCgDAAgCQABgEADgBIANgIIANgIQAIgFADgGQAEgGgBgIIAAgIQAAgEAEgCQADgCADAAQAEAAADACQADACAAAEIAAAIQAAAIAEAGQADAGAHAFIAOAIIANAIQACABABAEQAAACgCADQgCADgCABQgEABgDgBIgOgHIgNgIIgJgIQgEgEgBgDQAAADgEAEIgKAIIgNAIIgNAHIgEABIgDgBgAjrgCQgDgBgBgEQgCgDAAgDQACgDADgCIAMgGIAOgGQAGgDAEgEQACgEAAgFIAAgBIggAAQgDAAgCgCQgCgDABgDQgBgEACgCQACgCADAAIBUAAQADAAABACQACACAAAEQAAADgCADQgBACgDAAIghAAIAAABQAAAFADAEQADAEAHADIANAGIANAGQADACAAADQACADgCADQgBADgEACQgDABgCgBIgPgGIgMgHIgKgGQgEgDAAgCQgBADgDADIgKAGIgNAGIgNAGIgEABIgDgBgAhegNQgIAAgCgDQgEgDABgHIAAggQAAgEADgCQADgCADAAQAEAAADACQADACAAAEIAAAZIABADQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAABAAIBCAAQAEABACACQABACAAAEQAAADgBACQgCADgEAAg");
	this.shape.setTransform(47.2,12.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#636466").s().p("AjdBGQgIgBgCgCQgDgDAAgHIAAgcQAAgHADgDQACgCAIAAIBHAAQADgBABADQACADAAADQAAADgCACQgBADgDAAIg9AAIgDABIgBACIAAAOIABADIADAAIA+AAQAEABABACQACACAAAEQAAADgCACQgBACgEABgAhgBFQgIAAgCgDQgEgCAAgIIAAgWQAAgFAEgCQADgBADAAQAEAAADABQADACAAAFIAAAQIAAACIAEABIBCAAQAEAAACACQACACAAAEQAAAEgCACQgCACgEAAgADrA8QgEgCAAgFIAAhyQAAgDAEgCQACgDAEAAQAEAAACADQADACAAADIAAByQAAAFgDACQgCACgEAAQgEAAgCgCgAAOAyQgDgBgBgCQgCgCAAgDQAAgEACgCQABgDADAAIAvAAIAAgUQABgEADgCQADgCADAAQAEAAADACQADACAAAEIAAAUIAvAAQADAAACADQABACAAAEQAAADgBACQgCACgDABgACTAcQgDgDgBgHIAAgbQABgIADgCQACgDAIAAIAcAAIADgBQAAAAAAAAQABgBAAAAQAAAAAAgBQAAAAgBgBIAAgNQABgBAAAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgDAAIgjAAQgEAAgBgCQgCgDAAgDQAAgDACgDQABgCAEgBIAtAAQAHAAADAEQADACAAAHIAAAcQAAAHgDADQgDADgHgBIgdAAIgCABIgBADIAAAOIABADQAAAAAAAAQAAAAAAAAQABAAAAAAQAAAAABAAIAaAAIAWgDQAEAAACACQACACAAADQABAEgCADQgBACgDAAIgOACIgUABIgaAAQgIAAgCgCgAh3AQQgEAAgBgCQgCgDAAgDQAAgEACgCQABgCAEAAIByAAQADAAABACQABACAAAEQAAADgBADQgBACgDAAgAiiAJQgDgCAAgFIAAg/QAAgDADgCQADgDAEAAQAEAAADADQADACgBADIAAAYIAPAAQAEAAABACQACADAAADQAAADgCADQgBADgEAAIgPAAIAAAWQABAFgDACQgDABgEAAQgEAAgDgBgAAYAJQgDgBgCgDQgCgDAAgDQABgDADgCIANgIIANgIQAIgEADgHQAEgGgBgIIAAgHQAAgEAEgDQADgCADAAQAEAAADACQADADAAAEIAAAHQAAAIAEAGQADAHAHAEIAOAIIANAIQACACABADQAAADgCACQgCADgCABQgEACgDgCIgOgIIgNgHIgJgIQgEgEgBgCQAAADgEADIgKAIIgNAHIgNAIIgEABIgDAAgAjtADQgGAAgEgDQgCgBAAgHIAAguQAAgEACgDQADgCAEAAQAEAAACACQAEADAAAEIAAANIAcAAIAAgNQAAgEADgDQADgCADAAQAEAAADACQADADAAAEIAAAuQAAAHgDABQgCADgIAAgAjmgPIABADIACABIAWAAIADgBIAAgDIAAgLIgcAAgAhggMQgIAAgCgDQgEgCABgIIAAggQAAgEADgCQADgCADAAQAEAAADACQADACAAAEIAAAZIABADQAAAAAAAAQABABAAAAQAAAAABAAQAAAAABAAIBCAAQAEAAACACQABADAAADQAAADgBACQgCADgEAAg");
	this.shape_1.setTransform(47.2,12.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},2).to({state:[{t:this.shape_1}]},1).to({state:[]},1).wait(1));

	// bg
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFA8A8").ss(2,1,1).p("AFih8QAzAAAlAkQAlAlAAAzQAAAzglAlQglAlgzAAIrDAAQg0AAglglQgkglAAgzQAAgzAkglQAlgkA0AAg");
	this.shape_2.setTransform(47.9,12.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFD8E2").s().p("AlhB9Qg0AAglgkQgkgmAAgzQAAgzAkglQAlgkA0AAILDAAQAzAAAlAkQAlAlAAAzQAAAzglAmQglAkgzAAg");
	this.shape_3.setTransform(47.9,12.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#0CB1D6").ss(2,1,1).p("AFih8QAzAAAlAkQAlAlAAAzQAAAzglAlQglAlgzAAIrDAAQg0AAglglQgkglAAgzQAAgzAkglQAlgkA0AAg");
	this.shape_4.setTransform(47.9,12.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C1EEF1").s().p("AlhB9Qg0AAglgkQgkgmAAgzQAAgzAkglQAlgkA0AAILDAAQAzAAAlAkQAlAlAAAzQAAAzglAmQglAkgzAAg");
	this.shape_5.setTransform(47.9,12.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,97.8,27);


(lib.main_title = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// maintitle
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#636466").s().p("AEBCQQgHgGABgPIAAgXQgBgPAHgGQAGgGAPAAICCAAQAFAAAAgFIAAgFQAAgFgFAAIiQAAQgHAAgDgFQgEgEAAgHQAAgGAEgEQADgFAHAAICiAAQAPAAAFAGQAHAGAAAOIAAAYQAAAPgHAGQgFAGgPgBIiDAAQgEAAAAAFIAAAGQAAAFAEAAICXAAQAGAAADAFQAEAEAAAGQAAAHgEAEQgDAFgGAAIioAAIgCAAQgNAAgGgGgAl7CQQgGgGABgPIAAgXQgBgPAGgGQAHgGAPAAICBAAQAFAAABgFIAAgFQgBgFgFAAIiQAAQgGAAgEgFQgDgEAAgHQAAgGADgEQAEgFAGAAIBFAAIAAgVIhmAAQgHAAgEgEQgDgEABgHQgBgHADgFQAEgEAHgBIDzAAQAHABAEAEQADAFAAAHQAAAHgDAEQgEAEgHAAIhlAAIAAAVIA1AAQAPAAAGAGQAGAGAAAOIAAAYQAAAPgGAGQgGAGgPgBIiCAAQgFAAAAAFIAAAGQAAAFAFAAICWAAQAHAAADAFQADAEABAGQgBAHgDAEQgDAFgHAAIinAAIgDAAQgNAAgGgGgALIB+QgGgFAAgIIAAiDIgwAAQgDAmgTAUQgTAVgiAAQgmAAgTgZQgTgZAAguQAAgwATgYQATgZAmAAQAiAAATAUQATAUADAoIAwAAIAAhQQAAgIAGgFQAGgEAIAAQAIAAAGAEQAGAFAAAIIAAD1QAAAIgGAFQgGAEgIAAQgIAAgGgEgAIqhRQgIAQAAAeQAAAeAIAPQAJAPAUAAQAUAAAIgPQAJgPAAgeQAAgegJgQQgIgQgUAAQgUAAgJAQgABMB+QgHgFAAgIIAAhhIgcAAQgHAAgDgFQgEgFAAgGQAAgHAEgFQADgFAHgBIAcAAIAAgjIgcAAQgHAAgDgFQgEgFAAgHQAAgIAEgEQADgFAHgBIAcAAIAAgsQAAgIAHgFQAFgEAIAAQAJAAAFAEQAGAFABAIIAAD1QgBAIgGAFQgFAEgJAAQgIAAgFgEgAnrB+QgGgFgBgIIAAj1QABgIAGgFQAGgEAIAAQAJAAAFAEQAGAFABAIIAAD1QgBAIgGAFQgFAEgJAAQgIAAgGgEgAtHB+QgGgFAAgIIAAj1QAAgIAGgFQAGgEAJAAQAHAAAGAEQAHAFAAAIIAAD1QAAAIgHAFQgGAEgHAAQgJAAgGgEgAvIB6QgHgEAAgJIAAhbIgfABIggAAQgGAAgEgFQgDgFAAgHQAAgHADgEQAEgFAGgBIA2AAIA2gBQAEgQACgQIACgfIAAgJQAAgEgBgBQgCgCgEAAIhaAAQgHAAgEgFQgDgFAAgIQAAgHADgFQAEgFAHAAIBuAAQAQAAAGAGQAGAFAAAPIAAAWQAAAQgDARQgDARgDANIAIAAIAJgBQAHgBAEAFQAEAEAAAHQABAGgDAGQgDAFgHABIgeACIgiACIAABcQgBAJgFAEQgHAFgIAAQgHAAgGgFgAMcBoQgHgBgDgFQgFgEABgIQgBgHAFgEQADgFAHgBIA1AAIAAgdQAAgJAGgEQAFgFAJAAQAIAAAHAFQAFAEAAAJIAAAdIA3AAIAAgdQABgJAFgEQAHgFAIAAQAJAAAFAFQAHAEgBAJIAAAdIA1AAQAHABAEAFQADAEAAAHQAAAIgDAEQgEAFgHABgAqiBEQgHgDgEgGQgEgGABgHQAAgIAGgEQAhgUATgNQATgMAIgLQAKgKACgKQACgKABgOIAAgTQgBgEgBgCQgCgBgEAAIhLAAQgIAAgDgFQgEgFAAgHQAAgIAEgFQADgFAIAAIBgAAQAPAAAGAGQAHAGgBAPIAAAjQAAAUgEAPQgEAPgMAOQgLANgWAQQgXAQgkAWQgEACgFAAIgFAAgAhuAkQgSgZgBguQABgwASgYQATgZAlAAQAmAAASAZQATAYAAAwQAAAugTAZQgSAZgmAAQglAAgTgZgAhRhRQgJAQABAeQgBAeAJAPQAIAPATAAQAVAAAIgPQAHgPAAgeQAAgegHgQQgIgQgVAAQgTAAgIAQgANfAIQgXgIgMgRQgMgRAAgZQAAgZAMgSQAMgRAXgJQAXgKAfAAQAfAAAXAKQAXAJAMARQAMASAAAZQAAAZgMARQgMARgXAIQgXAJgfABQgfgBgXgJgANzhhQgOAFgGAKQgGAKAAANQAAAMAGAKQAGAKAOAFQANAGAVAAQAVAAANgGQAOgFAGgKQAGgKAAgMQAAgNgGgKQgGgKgOgFQgNgGgVAAQgVAAgNAGgADnAIQgIgBgDgEQgDgEAAgHQAAgHADgFQADgEAIgBIDyAAQAIABADAEQAEAFAAAHQAAAHgEAEQgDAEgIABgAlRgtQgWgGgNgLQgMgMABgTQgBgTAMgLQANgMAWgFQAWgGAgAAQAfAAAXAGQAWAFAMAMQAMALAAATQAAATgMAMQgMALgWAGQgXAFgfAAQggAAgWgFgAlJhsQgOAFAAAKQAAAKAOAGQAOAFAgAAQAfAAAOgFQAOgGAAgKQAAgKgOgFQgOgGgfAAQggAAgOAGgAEXgsQgPAAgGgFQgHgHABgOIAAguQgBgOAHgGQAGgGAPAAICeAAQAHAAADAFQAEAEAAAHQAAAHgEAFQgDAFgHAAIiIAAQgEAAgCACQgCABAAAEIAAASQAAAEACACQACABAEAAICLAAQAHAAAEAFQADAFAAAHQAAAHgDAEQgEAFgHAAg");
	this.shape.setTransform(102.15,18.3769);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.1,3.4,210.5,30.4);


(lib.main_no = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// maintitle_복사본
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAWB1QgHgEAAgKIAAitIgqAZQgJAFgHgDQgHgDgEgHQgEgHABgIQACgHAHgFIA4gfQAJgFAGgCQAHgCAGAAQAJAAAHAEQAGAFAAAJIAADNQAAAKgGAEQgHAEgIAAQgJAAgGgEg");
	this.shape.setTransform(28.0545,29.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(15));

	// maintitle
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2).p("AElAAQAAB6hWBWQhWBVh5AAQh5AAhVhVQhWhWAAh6QAAh4BWhWQBVhWB5AAQB5AABWBWQBWBWAAB4g");
	this.shape_1.setTransform(30.4476,30.4115,0.8876,0.8876);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#278345").s().p("AjODQQhWhWAAh6QAAh4BWhWQBVhWB5AAQB5AABWBWQBWBWAAB4QAAB6hWBWQhWBVh5AAQh5AAhVhVg");
	this.shape_2.setTransform(30.4476,30.4115,0.8876,0.8876);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[]},1).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3.4,3.4,54.1,54.1);


(lib.cdwn_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#278345").s().p("AkwEwQh+h+AAiyQAAixB+h+QB/h+CxAAQCzAAB9B+QB+B+AACxQAACyh+B+QgzA1g9AeQhOAnhcAEIgWAAQixABh/h/gAjBkUQgZAYAAAiIAAEUQAAAjAZAYQAZAYAhAAICPAAIAABEQABAjAYAXQAZAZAhAAQAjAAAYgZQAZgYAAgiIAAhCQATAAAOgIQAKgFAKgKQAVgWAAgiQAAgigVgXQgQgPgUgFQgIgCgHAAIgCAAIAAjLQAAgigZgYQgYgZgjAAQghAAgZAZQgYAYgBAiIAADQIg7AAIAAjQQAAgigZgYQgYgZgjAAQghAAgZAZg");
	this.shape.setTransform(35.0205,34.9967,0.813,0.813);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70,70);


(lib.cdwn_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#278345").s().p("AkwEwQh+h+AAiyQAAixB+h+QB/h+CxAAQCzAAB9B+QB+B+AACxQAACyh+B+Qh9B/izgBQixABh/h/gAiVCkIgIAKQgRAWAAAbQAAAhAZAaQAYAYAiAAIBqAAQBHAAA2grQBCgzgBhgQABg+gegsQAegugBg8QABhfhCg1Qg3grhGAAIhqAAQgiAAgYAYQgZAaAAAhQAAAeATAYIAGAFQAYAZAigBIBpAAQAZAAAAAZIAAADQgCAUgXgBIhpAAQgiAAgYAZQgZAZAAAiQAAAhAZAYQAYAZAiAAIBpAAQAYAAABAVIAAADQAAAYgZAAIhpAAQgiAAgYAYg");
	this.shape.setTransform(35.0205,34.9967,0.813,0.813);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70,70);


(lib.cdwn_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#278345").s().p("AkwEwQh+h+AAiyQAAixB+h+QAzgzA8geQBXguBqABQBpgBBYAtQA8AeAzA0QB+B+AACxQAACyh+B+Qh9B/izgBQixABh/h/gAhokkQgaAEgTATQgZAZAAAiQAAAeATAXIAGAGQAYAYAiAAIBpAAQAZAAAAAYQAAAWgZACQhEABg2AqQhCAzAABfIAABrQAAAhAZAZQAYAZAiAAIDVAAQAjAAAYgZQAZgYgBgiQABgfgUgXIgFgFQgYgZgjAAIiCAAIAAgXQAAgXAYgBQBGAAA2gsQAUgPAPgWQAfgrgBhBQABgdgHgZQgOg6gtgjQg3grhGAAIhqAAIgNABg");
	this.shape.setTransform(35.0205,34.9967,0.813,0.813);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70,70);


(lib.cdwn_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#278345").s().p("AkvEwQh+h+gBiyQABixB+h+QBjhjCEgWQAjgFAlAAQBOAABDAXQBZAgBGBHQB+B+AACxQAACyh+B+Qh9B/izgBQixABh+h/gAh1j6QgYAYAAAiQAAAiAYAZQAZAXAiAAIAYAAIAAFZQAAAjAYAXQAXAZAjAAQAiAAAYgZQAagYAAgiIAAmrQAAghgagZQgYgZgiAAIhqAAQgiAAgZAZg");
	this.shape.setTransform(35.0205,34.9967,0.813,0.813);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70,70);


(lib.stop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhABcQgLABgIgJQgJgIABgLIAAiAQgBgMAJgJQAIgHALAAICAAAQAMAAAJAHQAHAJAAAMIAACAQAAALgHAIQgJAJgMgBg");
	this.shape.setTransform(48.3,48.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#636466").s().p("AizC0QhKhKAAhqQAAhoBKhLQBKhKBpAAQBpAABLBKQBKBLAABoQAABqhKBKQhLBLhpgBQhpABhKhLgAhUhUQgIAJAAAMIAACAQAAALAIAIQAJAJALgBICAAAQAMABAIgJQAIgIAAgLIAAiAQAAgMgIgJQgIgHgMAAIiAAAQgLAAgJAHg");
	this.shape_1.setTransform(48.325,48.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AizC0QhKhKAAhqQAAhoBKhLQBLhKBoAAQBqAABKBKQBKBLAABoQAABqhKBKQhKBLhqgBQhoABhLhLgAhUhUQgIAJAAAMIAACAQAAALAIAIQAJAJALgBICAAAQAMABAIgJQAIgIAAgLIAAiAQAAgMgIgJQgIgHgMAAIiAAAQgLAAgJAHg");
	this.shape_2.setTransform(48.325,48.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_2}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(22.9,23,50.9,50.900000000000006);


(lib.singalongno = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAYBsQgFgEAAgGIAAg8IhIAAQgFABgDgEQgDgEAAgFQAAgFADgDQADgEAFgBICvAAQAGABACAEQADADAAAFQAAAFgDAEQgCAEgGgBIhJAAIAAA8QAAAGgFAEQgEACgGAAQgGAAgEgCgAH4BbQgFgEAAgGIAAixQAAgHAFgDQAEgDAGAAQAGAAAEADQAFADAAAHIAACxQAAAGgFAEQgEACgGAAQgGAAgEgCgAi2BbQgEgEAAgGIAAixQAAgHAEgDQAFgDAGAAQAGAAAEADQAEADABAHIAAA3IAWAAQAFABADAEQADADAAAGQAAAFgDAEQgDAEgFAAIgWAAIAABfQgBAGgEAEQgEACgGAAQgGAAgFgCgAmBBbQgFgDAAgHIAAiyQAAgGAFgDQAEgDAGAAQAGAAAEADQAEADAAAGIAAA4IAUAAQAFABADAEQACADAAAGQAAAFgCAEQgDAEgFgBIgUAAIAABgQAAAHgEADQgEACgGAAQgGAAgEgCgACaBLQgGAAgCgEQgDgEAAgEQAAgGADgEQACgEAGAAICwAAQAFAAADAEQACAEAAAGQAAAEgCAEQgDAEgFAAgAFyAwQgFgCgDgDQgCgFAAgFQAAgGAFgDQAYgOANgKQAOgJAHgHQAGgIACgIQABgGAAgLIAAgNQAAgBAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBIgEgBIg3AAQgFABgDgEQgCgEAAgFQAAgFACgEQADgEAFAAIBGAAQAMAAAEAEQAEAEAAAMIAAAZQAAAOgDAMQgDAKgIALQgJAIgQAMQgQANgaAPQgEACgDAAIgEgBgAk5AoQgEgDAAgLIAAgrQAAgMAEgEQAFgEALAAIAsAAIAEgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAgWQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBgBIgEgBIg2AAQgFAAgDgDQgCgEAAgFQAAgFACgDQADgFAFAAIBFAAQALAAAFAFQAEAEAAALIAAArQAAALgEAEQgFAFgLgBIgtAAIgEACIgBADIAAAXIABAEIAEABIAngBQASgBARgCQAFgBAEADQACAEABAFQABAFgCAEQgCADgGABIgVADIgeACIgoAAQgLAAgFgFgAnIAkQgFgEABgLIAAheQgBgLAFgFQAEgEALAAIAbAAQAFAAADAEQADAEAAAFQAAAFgDAEQgDAEgFgBIgNAAIgEABQAAABAAAAQAAABgBAAQAAABAAAAQAAABAAABIAABIIABAEQAAAAABABQAAAAABAAQAAAAABAAQABAAAAAAIAJAAIAIgBQAFAAADACQAEADAAAFQABAGgCAEQgCAEgFAAIgQACIgTAAIgCAAQgJAAgEgEgAoLAkQgFgEAAgLIAAheQAAgLAFgFQAEgEALAAIAcAAQAFAAADAEQACAEAAAFQAAAFgCAEQgDAEgFgBIgOAAIgEABQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAABIAABIIABAEQAAAAABABQAAAAAAAAQABAAABAAQAAAAABAAIAJAAIAHgBQAGAAACADQADACABAGQAAAFgBAEQgDADgFABIgOACIgTAAIgCAAQgJAAgEgEgACtAQQgEgEAAgLIAAgfQAAgLAEgEQAFgFAKAAIBbAAIAEgBIABgDIAAgLIgBgFIgEgBIhkAAQgFAAgDgDQgCgEAAgFQAAgFACgEQADgEAFAAIBzAAQALAAAEAFQAFAEAAAKIAAAhQAAAKgFAFQgEAEgLAAIhbAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBABAAAAIgBAEIAAALIABAEIAEABIBpAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFAAIh4AAIgCAAQgJAAgEgEgAgTgGQgKABgFgFQgFgEABgLIAAhBQAAgHAFgCQAEgDAFgBQAGABAFADQAEACAAAHIAAAPIBXAAIAAgPQAAgHAEgCQAFgDAGgBQAFABAFADQAEACABAHIAABBQAAALgFAEQgFAFgKgBgAgJgiQAAABAAABQABAAAAABQABAAAAAAQABAAABAAIBPAAQABAAABAAQAAAAABAAQAAgBABAAQAAgBAAgBIAAgQIhXAAg");
	this.shape.setTransform(62.275,23.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// 레이어_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCC012").s().p("Am5D8QhpAAhJhJQhLhLABhoQgBhnBLhLQBJhJBpgBIN0AAQBoABBKBJQBKBLAABnQAABohKBLQhKBJhoAAg");
	this.shape_1.setTransform(63.65,23.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Am5ERQhwAAhRhQQhQhRAAhwQAAhwBQhQQBQhQBxAAIN0AAQBwAABQBQQBQBQAABwQAABwhQBRQhQBQhwAAgApriyQhLBLABBnQgBBoBLBLQBJBJBpAAIN0AAQBoAABKhJQBKhLAAhoQAAhnhKhLQhKhJhogBIt0AAQhpABhJBJg");
	this.shape_2.setTransform(63.65,23.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCE37C").s().p("Am5D8QhpAAhJhJQhLhLABhoQgBhnBLhLQBJhJBpgBIN0AAQBoABBKBJQBKBLAABnQAABohKBLQhKBJhoAAg");
	this.shape_3.setTransform(63.65,23.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_3}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.8,-3.8,143,54.599999999999994);


(lib.play_bg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#444444").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBqgBBKBLQBKBKAABpQAABphKBLQhKBKhqAAQhoAAhLhKgAg+hmQgQAJAAATIAACWQAAASAQAJQAHAEAJAAQAJAAAHgEICChMQAQgIAAgTQAAgSgQgJIiChLQgIgFgIAAQgIAAgIAFg");
	this.shape.setTransform(48.325,48.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhRBnQgPgJAAgSIAAiWQAAgTAQgJQAQgKAPAKICCBMQAQAJAAARQAAATgQAJIiCBLQgHAFgJAAQgIAAgIgFg");
	this.shape_1.setTransform(50.175,48.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(22.9,23.3,50.9,50.900000000000006);


(lib.play = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhRBnQgPgJAAgSIAAiWQAAgTAQgJQAQgKAPAKICCBMQAQAJAAARQAAATgQAJIiCBLQgHAFgJAAQgIAAgIgFg");
	this.shape.setTransform(50.175,48.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#636466").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBqgBBKBLQBKBKAABpQAABphKBLQhKBKhqAAQhoAAhLhKgAg+hmQgQAJAAATIAACWQAAASAQAJQAHAEAJAAQAJAAAHgEICChMQAQgIAAgTQAAgSgQgJIiChLQgIgFgIAAQgIAAgIAFg");
	this.shape_1.setTransform(48.325,48.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBqgBBKBLQBKBKAABpQAABphKBLQhKBKhqAAQhoAAhLhKgAg+hmQgQAJAAATIAACWQAAASAQAJQAHAEAJAAQAJAAAHgEICChMQAQgIAAgTQAAgSgQgJIiChLQgIgFgIAAQgIAAgIAFg");
	this.shape_2.setTransform(48.325,48.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_2}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(22.9,23.3,50.9,50.900000000000006);


(lib.pause = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAfBhQgLgKAAgQIAAiNQAAgPALgLQAKgKAPgBQAPABALAKQAKALAAAPIAACNQAAAQgKAKQgLALgPgBQgPABgKgLgAhRBhQgKgKAAgQIAAiNQAAgPAKgLQALgKAPgBQAPABAKAKQALALAAAPIAACNQAAAQgLAKQgKALgPgBQgPABgLgLg");
	this.shape.setTransform(48.625,49.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#636466").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBpgBBLBLQBKBKAABpQAABphKBLQhLBKhpAAQhoAAhLhKgAAfhgQgLALAAAPIAACOQAAAPALAKQAKALAPgBQAPABALgLQAKgKAAgPIAAiOQAAgPgKgLQgLgKgPgBQgPABgKAKgAhRhgQgKALAAAPIAACOQAAAPAKAKQALALAPgBQAPABAKgLQALgKAAgPIAAiOQAAgPgLgLQgKgKgPgBQgPABgLAKg");
	this.shape_1.setTransform(48.625,49.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBqgBBKBLQBKBKAABpQAABphKBLQhKBKhqAAQhoAAhLhKgAAfhgQgLALAAAPIAACOQAAAPALAKQAKALAPgBQAPABALgLQAKgKAAgPIAAiOQAAgPgKgLQgLgKgPgBQgPABgKAKgAhRhgQgKALAAAPIAACOQAAAPAKAKQALALAPgBQAPABAKgLQALgKAAgPIAAiOQAAgPgLgLQgKgKgPgBQgPABgLAKg");
	this.shape_2.setTransform(48.625,49.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_2}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(23.2,23.7,50.89999999999999,50.89999999999999);


(lib.Listening = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiEBrQgEgDAAgHIAAg9IhIAAQgGAAgDgDQgDgEAAgFQAAgGADgDQADgDAGgBICvAAQAGABACADQACADAAAGQAAAFgCAEQgCADgGAAIhKAAIAAA9QABAHgFADQgEADgGAAQgFAAgGgDgABRBrQgMgBgEgEQgEgEAAgLIAAgkQAAgLAEgEQAEgEAMAAIBzAAQAGAAACAEQACADAAAFQAAAGgCADQgCADgGAAIhkAAQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAIgBAFIAAAOIABAFQAAABAAAAQABAAAAAAQABAAAAAAQABAAABAAIBmAAQAGAAACADQACAEAAAFQAAAFgCADQgCAFgGAAgAl3BpQgKAAgFgFQgFgFABgKIAAgrQAAgGAEgDQAFgDAGgBQAGABAEADQAFADAAAGIAAAfQAAAEACABQAAAAAAABQABAAAAAAQABAAAAAAQABAAABAAIBhAAQAEAAADAEQADADAAAGQAAAFgDADQgDAFgEAAgAGKBbQgEgEgBgGIAAiyQABgGAEgDQAEgDAFAAQAHAAADADQAGADAAAGIAACyQAAAGgGAEQgDACgHAAQgFAAgEgCgAkZAtQgFgDgBgGIAAiFQABgGAFgDQADgDAHAAQAGAAAEADQAEADABAGIAAAuIAVAAQAGABADADQACADAAAGQAAAFgCAFQgDACgGABIgVAAIAAA9QgBAGgEADQgEAEgGAAQgHAAgDgEgAEEAxQgFgDgDgEQgCgEAAgFQAAgGAFgDQAYgPANgJQAOgJAHgIQAGgHACgHQABgIAAgKIAAgNQABgEgBgBQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBgBgBAAIg3AAQgFAAgDgCQgCgEAAgFQAAgFACgEQADgEAFAAIBGAAQAMAAAEAEQAEAEAAAMIAAAZQAAAPgDAKQgDALgIALQgIAIgRAMQgQAMgbAQQgDACgEAAIgDAAgAAuAPQgGAAgCgEQgCgEgBgFQABgEACgDQACgFAGABICxAAQAEgBADAFQACADAAAEQAAAFgCAEQgDAEgEAAgAmOAMQgLAAgEgFQgFgEAAgJIAAhQQAAgGAFgDQAEgCAGAAQAFAAAEACQAFADAAAGIAAAZIAtAAIAAgZQAAgGAEgDQAFgCAGAAQAFAAAFACQAEADAAAGIAABQQAAAJgEAEQgFAFgLAAgAmFgRQAAABAAAAQAAABAAAAQABABAAAAQAAABABAAIAEABIAiAAIAEgBIABgEIAAgTIgtAAgAjBgEQgFgBgCgGQgDgFABgFQABgFAEgCIAUgJIAWgKQAKgGAEgGQAFgFAAgIIAAgBIgyAAQgFgBgCgEQgEgCAAgHQAAgFAEgEQACgDAFAAICCAAQAFAAADADQACAEAAAFQAAAHgCACQgDAEgFABIgyAAIAAABQAAAIAEAFQAFAGAKAGIAVAKIAUAJQAFACABAFQABAEgCAFQgDAGgFACQgFACgEgCIgWgKIgUgKQgLgFgEgEQgFgEAAgEIgBAAQgBAEgEAEQgGAFgLAFIgUAJIgUAKIgGACIgEgCgABRgZQgLAAgFgEQgEgFAAgLIAAglQAAgMAEgDQAFgFALgBIBzAAQAGABABAEQADADAAAGQAAAFgDAEQgBACgGAAIhkAAQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAIgBAFIAAARIABADQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAIBmAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFABg");
	this.shape.setTransform(62.7,22.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// 레이어_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Am5ERQhwAAhRhQQhQhRAAhwQAAhwBQhQQBQhQBxAAINzAAQBxAABQBQQBQBQAABwQAABwhQBRQhQBQhxAAgApsiyQhJBLAABnQAABpBJBJQBLBLBogBINzAAQBoABBLhLQBJhJAAhpQAAhnhJhLQhLhJhogBItzAAQhoABhLBJg");
	this.shape_1.setTransform(63.5,23.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FCC012").s().p("Am5D8QhoABhLhLQhJhJAAhpQAAhnBJhLQBLhJBogBINzAAQBoABBLBJQBJBLAABnQAABphJBJQhLBLhogBg");
	this.shape_2.setTransform(63.5,23.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCE37C").s().p("Am5D8QhoABhLhLQhJhJAAhpQAAhnBJhLQBLhJBogBINzAAQBoABBLBJQBJBLAABnQAABphJBJQhLBLhogBg");
	this.shape_3.setTransform(63.5,23.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_1},{t:this.shape_3}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-3.6,143,54.6);


(lib.listentosongno = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABYBuQgLAAgEgEQgGgEAAgMIAAglQAAgKAGgFQAEgEALABIB1AAQAHAAABADQADADAAAFQAAAGgDADQgBAEgHAAIhmAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAIgBAEIAAAQQAAAAAAABQAAABAAAAQAAABAAAAQAAABABAAIADABIBpAAQAGAAACAEQACADAAAFQAAAFgCAEQgCAEgGAAgAGZBeQgFgEAAgGIAAi0QAAgHAFgDQAEgDAGAAQAGAAAEADQAFADAAAHIAAC0QAAAGgFAEQgEADgGAAQgGAAgEgDgAg6BeQgDgDAAgGIAAhhIgTAAIAABYQAAAFgFADQgEADgGAAQgFAAgEgDQgEgDgBgFIAAirQABgGAEgCQAEgEAFAAQAGAAAEAEQAFACAAAGIAAA6IATAAIAAg9QAAgFADgDQAFgDAFAAQAGAAAEADQAEADAAAFIAAC3QAAAGgEADQgEADgGAAQgFAAgFgDgAmmBOQgGgBgCgEQgDgDAAgFQAAgGADgEQACgDAGAAIBLAAIAAgtIgoAAQgLAAgEgDQgGgEAAgLIAAhJQABgHAFgDQAEgDAGgBQAGABAFADQAFADAAAHIAAA+QAAAAAAABQAAABAAAAQAAABAAAAQAAABABAAIAEABIBqAAQAGAAACAEQADAEAAAFQAAAEgDAEQgCADgGAAIg1AAIAAAtIBLAAQAFAAADADQADAEAAAGQAAAFgDADQgDAEgFABgAESAzQgGgCgDgFQgDgEABgFQAAgGAEgEQAZgOAOgKQANgIAIgIQAGgHACgIQABgHAAgLIAAgOQAAAAAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIg4AAQgFAAgDgEQgCgEgBgFQABgFACgEQADgEAFABIBHAAQAMgBAFAEQADAFAAALIAAAaQAAAOgCAMQgDALgJAKQgIAKgRAMQgRALgbARQgCACgEAAIgDgBgAjUAqQgFgFAAgLIAAgqQAAgLAFgFQAFgEALAAIAfAAIAFgBIABgEIAAgVIgBgEIgFgBIgpAAQgGAAgCgEQgDgEAAgFQAAgGADgDQACgEAGABIA4AAQALgBAFAEQAEAFgBALIAAArQABAKgEAEQgFAFgLAAIggAAIgEABQgBAAAAABQAAAAgBABQAAAAAAABQAAAAAAABIAAAVQAAABAAAAQAAABAAABQABAAAAAAQAAABABAAQAAAAAAABQABAAAAAAQABAAABAAQAAAAABAAIAaAAIAZgDQAGAAADADQADADAAAFQABAGgCAEQgCAEgFABQgIABgRAAQgRACgbAAIgDAAQgJAAgEgEgAA0ARQgFAAgCgDQgDgEAAgGQAAgEADgDQACgFAFAAIC0AAQAFAAADAFQADADAAAEQAAAGgDAEQgDADgFAAgABYgZQgLAAgEgDQgEgFgBgLIAAgmQABgLAEgFQAEgEALAAIB1AAQAGAAACAEQADADAAAGQAAAFgDADQgCAEgGAAIhlAAIgEABIgBAFIAAARIABADQAAABABAAQAAAAABABQAAAAABAAQAAAAABAAIBoAAQAFAAADAEQACAEAAAEQAAAGgCADQgDAEgFgBg");
	this.shape.setTransform(60.4,22.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// 레이어_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AmxEMQhugBhPhOQhOhOAAhvQAAhuBOhOQBPhPBuAAINjAAQBuAABPBPQBOBOAABuQAABvhOBOQhPBOhuABgApgiuQhIBIAABmQAABnBIBIQBJBIBmABINjAAQBmgBBIhIQBJhIAAhnQAAhmhJhIQhIhIhmAAItjAAQhmAAhJBIg");
	this.shape_1.setTransform(61.1252,23.2365,1.0198,1.0204);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FCC012").s().p("AmxECQhqgBhMhLQhLhMAAhqQAAhpBLhMQBMhLBqgBINjAAQBqABBLBLQBMBMAABpQAABqhMBMQhLBLhqABg");
	this.shape_2.setTransform(61.1252,23.2365,1.0198,1.0204);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCE37C").s().p("Am5D9QhogBhLhJQhJhLAAhoQAAhnBJhKQBLhKBoAAINzAAQBpAABKBKQBJBKAABnQAABohJBLQhKBJhpABg");
	this.shape_3.setTransform(61.25,23.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Am5ERQhwAAhRhQQhQhQAAhxQAAhwBQhQQBQhQBxAAINzAAQBxAABQBQQBQBQAABwQAABxhQBQQhQBQhxAAgApsixQhJBKAABnQAABoBJBLQBLBJBoABINzAAQBpgBBKhJQBJhLAAhoQAAhnhJhKQhKhKhpAAItzAAQhoAAhLBKg");
	this.shape_4.setTransform(61.25,23.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.3,-4,143.10000000000002,54.6);


(lib.expert_no = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AA6BkQgRgLAAgWQAAgUARgLQAQgLAeABQAegBARALQARALAAAUQAAAWgRALQgRAKgeAAQgeAAgQgKgABMA2QgIAFAAAIQAAAKAIAEQAJAFATABQATgBAJgFQAIgEAAgKQAAgIgIgFQgJgFgTgBQgTABgJAFgAEmBrQgKgBgEgEQgFgEAAgKIAAgkQAAgMAFgEQAEgEAKABIBqAAQAGAAACADQACAEAAAFQAAAEgCAEQgCAEgGgBIhcAAIgEABIgBAFIAAAOIABAFIAEABIBfAAQAFABACADQACADAAAFQAAAFgCADQgCAFgFAAgAl6BqQgKAAgEgFQgFgEAAgKIAAglQABgGAEgDQAEgDAGAAQAFAAAEADQAEADAAAGIAAAZIABAEQABAAAAABQAAAAABAAQAAAAABAAQABABAAAAIBhAAQAFAAACADQADADAAAGQAAAFgDADQgCAEgFABgAotBpQgKgBgFgEQgDgEAAgLIAAgrQAAgHAEgDQAEgCAGgBQAFABAEACQAEADABAHIAAAgIABAEQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAAAIBdAAQAFAAACAEQADAEAAAFQAAAFgDAEQgCAEgFAAgAJJBbQgEgEAAgGIAAiwQAAgGAEgDQAEgCAFgBQAGABAEACQAEADAAAGIAACwQAAAGgEAEQgEACgGAAQgFAAgEgCgAhgBbQgEgEgBgGIAAiwQABgGAEgDQAEgCAGgBQAFABAEACQAEADAAAGIAAA4IAUAAQAGAAACAEQACAEAAAFQAAAGgCADQgCAEgGAAIgUAAIAABeQAAAGgEAEQgEACgFAAQgGAAgEgCgAlQA6QgDgCAAgHIAAgbIhHAAQgFAAgCgDQgDgEAAgFQAAgFADgEQACgCAFAAICjAAQAFAAACACQACAEAAAFQAAAFgCAEQgCADgFAAIhBAAIAAAbQAAAHgEACQgEAEgGAAQgGAAgEgEgAHOAxQgFgCgCgEQgDgEAAgFQAAgHAFgCIAigZQANgIAGgIQAGgGACgIQABgIAAgJIAAgOQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBgBAAIgEgBIgzAAQgEAAgDgEQgCgEAAgFQAAgFACgEQADgDAEAAIBBAAQALgBAEAFQAEAEAAAMIAAAZQAAAOgDALQgDALgIAKQgHAIgPAMQgPAMgZAQQgCACgDAAIgEgBgAnUAuQgEgCAAgHIAAg/IgZAAQgGgBgCgEQgCgDAAgGQAAgFACgDQACgEAGAAIAZAAIAAgrQAAgGAEgDQAEgCAFgBQAGABAEACQAEADAAAGIAACEQAAAHgEACQgEADgGAAQgFAAgEgDgAjWAwQgFgBgCgEQgDgFAAgFQAAgGAFgCIAigZQAMgIAHgIQAGgGABgIQACgIAAgJIAAgOIgBgDIgEgBIgzAAQgEgBgDgEQgCgDAAgGQAAgEACgEQADgEAEAAIBBAAQAKAAAEAEQAEAEAAAMIAAAZQAAAOgDAKQgCALgIALQgIAJgPALQgOAMgZAPQgDACgDAAIgDgBgACPAVQgDgDgBgHIAAhqQABgGADgDQAFgCAFgBQAGABAEACQAEADAAAGIAAAoIAUAAQAFAAACADQADAEAAAFQAAAGgDADQgCAEgFABIgUAAIAAAoQAAAHgEADQgEADgGAAQgFAAgFgDgApVAWQgFgBgDgEQgDgFABgFQAAgGAEgCIAOgLIANgMQAHgGADgIQADgIAAgKIAAgNIgfAAQgFAAgDgCQgCgEAAgGQAAgFACgDQADgEAFAAIBYAAQAFAAADAEQACADAAAFQAAAGgCAEQgDACgFAAIgdAAIAAAMQAAAKADAIQADAIAHAGIANALIALAJQAEAEAAAEQAAAFgCAEQgDAEgFACQgEABgFgDIgKgHIgLgKIgLgKQgDgFAAgCIgBAAQAAADgEAEIgLALIgMAKIgMAKQgDACgEAAIgCAAgAAWASQgFgBgCgFQgDgDAAgGQABgDAFgFIANgJIAPgLQAGgFADgGQADgGAAgJIAAgHIgiAAQgFAAgCgDQgCgEAAgFQAAgFACgEQACgEAFABIAiAAIAAgPQAAgGAEgDQAEgDAFAAQAGAAAEADQAEADAAAGIAAAPIAfAAQAFgBACAEQADAEAAAFQAAAFgDAEQgCADgFAAIgfAAIAAAGQAAAJADAGQADAGAGAFIANAKIALAIQAFAEAAAEQABAEgDAFQgDAEgEACQgFABgFgDIgJgHQgFgDgGgEIgLgKQgEgEAAgDIgBAAQAAAEgEAFIgMAJIgLAJIgNAJQgDABgDAAIgDgBgAEGAQQgFAAgCgEQgDgDAAgGQAAgEADgDQACgEAFAAICjAAQAEAAADAEQACADAAAEQAAAGgCADQgDAEgEAAgAl6gSQgKAAgEgFQgEgEAAgKIAAgqQAAgMAEgEQAEgEAKAAIBiAAQALAAAEAEQAEAEAAAMIAAAqQAAAKgEAEQgEAFgLAAgAlwhJIgBAEIAAAVIABAEQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAIBHAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAIABgEIAAgVIgBgEQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAIhHAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAABgBAAgAEmgZQgKAAgEgDQgEgFAAgLIAAglQAAgKAEgFQAEgEAKAAIBqAAQAFAAACAEQADAEAAAEQAAAFgDAEQgCADgFAAIhcAAIgDACIgBAEIAAARIABADIADABIBfAAQAEABACAEQADADAAAEQAAAGgDAEQgCACgEAAg");
	this.shape.setTransform(85.4714,23.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// 레이어_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCC012").s().p("AmxD3QhmAAhIhIQhJhIAAhnQAAhmBJhIQBIhIBmgBINiAAQBnABBJBIQBIBIAABmQAABnhIBIQhJBIhnAAg");
	this.shape_1.setTransform(85.8788,23.4392,1.021,1.0206);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AmxEMQhtAAhQhPQhOhOAAhvQAAhuBOhOQBPhOBugBINiAAQBvABBOBOQBPBOAABuQAABvhPBOQhOBPhvAAgApfiuQhJBIAABmQAABnBJBIQBIBIBmAAINiAAQBnAABJhIQBIhIAAhnQAAhmhIhIQhJhIhngBItiAAQhmABhIBIg");
	this.shape_2.setTransform(85.8788,23.4392,1.021,1.0206);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCE37C").s().p("AmxD3QhmAAhIhIQhJhIAAhnQAAhmBJhIQBIhIBmgBINiAAQBnABBJBIQBIBIAABmQAABnhIBIQhJBIhnAAg");
	this.shape_3.setTransform(85.8788,23.4392,1.021,1.0206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_3}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(14.3,-3.8,143.2,54.599999999999994);


(lib.countdown = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.cdwn_4("single",0);
	this.instance.setTransform(-510,74.85,1,1,0,0,0,35,35);

	this.instance_1 = new lib.cdwn_3("single",0);
	this.instance_1.setTransform(-510,74.85,1,1,0,0,0,35,35);

	this.instance_2 = new lib.cdwn_2("single",0);
	this.instance_2.setTransform(-510,74.85,1,1,0,0,0,35,35);

	this.instance_3 = new lib.cdwn_1("single",0);
	this.instance_3.setTransform(-510,74.85,1,1,0,0,0,35,35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},14).to({state:[{t:this.instance_2}]},14).to({state:[{t:this.instance_3}]},14).to({state:[{t:this.instance_3}]},16).to({state:[]},1).wait(32));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-545,39.9,70,70);


// stage content:
(lib._3학년_1_10p_어깨동무_20240520 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {노래듣기:0,전문가창:645,따라부르:1298,반주듣기:2401};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,643,644,645,1296,1297,1298,2399,2400,2401,3049];
	this.streamSoundSymbolsList[0] = [{id:"stos_student",startFrame:0,endFrame:645,loop:1,offset:0}];
	this.streamSoundSymbolsList[645] = [{id:"stos_expert",startFrame:645,endFrame:1298,loop:1,offset:0}];
	this.streamSoundSymbolsList[1298] = [{id:"stos_singtosong",startFrame:1298,endFrame:2401,loop:1,offset:0}];
	this.streamSoundSymbolsList[2401] = [{id:"stos_music",startFrame:2401,endFrame:3050,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("stos_student",0);
		this.InsertIntoSoundStreamData(soundInstance,0,645,1);
		this.stop();
		
		var _this = this;
		
		/*메뉴 네비게이션*/
		
		_this.listen_btn.on('click', function () {
		
			_this.gotoAndStop('노래듣기');
			_this.play_btn.visible = true;
		});
		
		_this.expert_btn.on('click', function () {
		
			_this.gotoAndStop('전문가창');
			_this.play_btn.visible = true;
		});
		
		_this.listen2_btn.on('click', function () {
		
			_this.gotoAndStop('반주듣기');
			_this.play_btn.visible = true;
		});
		
		_this.singAlong_btn.on('click', function () {
		
			_this.gotoAndStop('따라부르');
			_this.play_btn.visible = true;
		});
		
		
		/*플레이컨트롤*/
		
		_this.play_btn.on('click', function () {
		
			_this.play();
			_this.play_btn.visible = false;
		});
		
		_this.pause_btn.on('click', function () {
		
			_this.stop();
			_this.play_btn.visible = true;
		});
		
		_this.stop1_btn.on('click', function () {
		
			_this.gotoAndStop('노래듣기');
			_this.play_btn.visible = true;
		});
		
		_this.stop2_btn.on('click', function () {
		
			_this.gotoAndStop('전문가창');
			_this.play_btn.visible = true;
		});
		
		_this.stop4_btn.on('click', function () {
		
			_this.gotoAndStop('반주듣기');
			_this.play_btn.visible = true;
		});
		
		_this.stop3_btn.on('click', function(){
		
			_this.gotoAndStop('따라부르');
			_this.play_btn.visible = true;
		});
	}
	this.frame_643 = function() {
		this.gotoAndStop('노래듣기');
		this.play_btn.visible = true;
	}
	this.frame_644 = function() {
		this.gotoAndStop('노래듣기');
		this.play_btn.visible = true;
	}
	this.frame_645 = function() {
		var soundInstance = playSound("stos_expert",0);
		this.InsertIntoSoundStreamData(soundInstance,645,1298,1);
		this.stop();
	}
	this.frame_1296 = function() {
		this.gotoAndStop('전문가창');
		this.play_btn.visible = true;
	}
	this.frame_1297 = function() {
		this.gotoAndStop('전문가창');
		this.play_btn.visible = true;
	}
	this.frame_1298 = function() {
		var soundInstance = playSound("stos_singtosong",0);
		this.InsertIntoSoundStreamData(soundInstance,1298,2401,1);
		this.stop();
	}
	this.frame_2399 = function() {
		this.gotoAndStop('따라부르');
		this.play_btn.visible = true;
	}
	this.frame_2400 = function() {
		this.gotoAndStop('따라부르');
		this.play_btn.visible = true;
	}
	this.frame_2401 = function() {
		var soundInstance = playSound("stos_music",0);
		this.InsertIntoSoundStreamData(soundInstance,2401,3050,1);
		this.stop();
	}
	this.frame_3049 = function() {
		this.gotoAndStop('반주듣기');
		this.play_btn.visible = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(643).call(this.frame_643).wait(1).call(this.frame_644).wait(1).call(this.frame_645).wait(651).call(this.frame_1296).wait(1).call(this.frame_1297).wait(1).call(this.frame_1298).wait(1101).call(this.frame_2399).wait(1).call(this.frame_2400).wait(1).call(this.frame_2401).wait(648).call(this.frame_3049).wait(1));

	// chapter_no
	this.instance = new lib.main_no("single",0);
	this.instance.setTransform(55.55,75.25,1,1,0,0,0,30.4,30.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3050));

	// chapter
	this.instance_1 = new lib.main_title("single",0);
	this.instance_1.setTransform(202.75,74.7,1,1,0,0,0,98.9,18.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3050));

	// title
	this.instance_2 = new lib.title("single",0);
	this.instance_2.setTransform(640.25,212.1,1,1,0,0,0,95.7,32.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3050));

	// song_info
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231916").s().p("AEhBZQgSgIAAgSQAAgSASgLQAUgKAiAAQAiAAAVAKQASALAAASQAAASgSAIQgTALgkAAQgjAAgTgLgAEvAsQgPAIAAALQAAAJAPAJQAOAFAaAAQAbAAANgFQAQgJAAgJQAAgKgQgJQgNgGgbAAQgaAAgOAGgACsBgIAAjDIARAAIAADDgAn2BgIAAjDIAQAAIAABQIAhAAIAAAOIghAAIAABlgAHvBbIAAg/IARAAIAAAyIB7AAIAAANgAmFBbIAAg9IARAAIAAAwIB/AAIAAANgAjSBGIAAgPIBZAAIAAgwIg9AAIAAhXICNAAIAABXIg+AAIAAAwIBZAAIAAAPgAilgGIBqAAIAAg7IhqAAgAqRAzIAUgPQAKgIAIgMQAKgNAGgRQAGgQAAgOIAAgTIgwAAIAAgOIBxAAIAAAOIgwAAIAAATQAAAQAFAOQAFAOAIANQAJALAKAJIAQAKIgLANIgOgKQgMgKgGgHIgNgVIgGgOIgGAOIgMAUIgTAVIgTAOgAAfgSIBQAAIAAgvIhQAAIAAgPIBfAAIAABLIhPAAIAAAwIBRgDIAcgEIAAAPIgcADIhhACgAJkArIAAiOIAQAAIAAA3IAeAAIAAAOIgeAAIAABJgAkKAqIAAiNIAQAAIAACNgAGKATIAAh2IAQAAIAAAvIAdAAIAAAPIgdAAIAAA4gAmrAGIASgLQAHgDANgNQAKgKAEgLQAEgLAAgOIAAgGIgsAAIAAgOIBrAAIAAAOIgtAAIAAAGQAAAMAFALQAEALAHAHQAGAHANAKIATAJIgLANIgOgJQgNgGgGgGIgLgLIgIgOIgHAPIgNAOIgSANIgPAJgADwAAIASgJIAVgRQAJgMADgGQAGgLAAgMIAAgGIgtAAIAAgOIBrAAIAAAOIgtAAIAAAFQAAANAFALIANARIATANIASAIIgKAMIgOgGQgHgCgMgLIgNgMIgHgMIgJAOIgOAOQgFAFgMAHIgPAHgAHahWIBjAAIAAAPIhSAAIAAA/IBqgHIAAAOIgbADIhgACg");
	this.shape.setTransform(206.225,265.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#231916").s().p("AEJDtIAAg2Ih8AAIAAgNICMAAIAABDgAAsDtIAAgwIiAAAIAAgNIA/AAIAAgpIhXAAIAAgOICPAAIALg6IiCAAIAAgOICVAAIgJA7IgEANIAjAAIAAAOIhbAAIAAApIBBAAIAAA9gAmIDtIAAgwIiBAAIAAgNIA+AAIAAgpIhXAAIAAgOICQAAIALg6IiEAAIAAgOICWAAIgBAUIgLA0IAkAAIAAAOIhdAAIAAApIBCAAIAAA9gAkgDqIAAhJIARAAIAAAVIBnAAIAAgVIASAAIAABJgAkPDcIBnAAIAAgYIhnAAgAFzDoIAAgwIARAAIAAAiICAAAIAAAOgAHtDCIAAgbIg0AAIAAgMIA0AAIAAhzIASAAIAACagAGECwIAAglIgzAAIAAgOIBMAAQAMAAAegDIAfgDIAAANIhSAHIAAAlgAEICcIAAh0IARAAIAAAuIAeAAIAAAOIgeAAIAAA4gAimCVIAAhtIAQAAIAABtgAk3BbIBSAAIAAgbIhSAAIAAgNIBjAAIAAA2IhSAAIAAAZIBWgDIAZgEIAAAOIgbAEIhlADgACFCAQgPgOAAgTQAAgUAPgPQAQgNAXAAQAWAAAQANQAPAPAAAUQAAATgPAOQgQAPgWAAQgXAAgQgPgACQBHQgIAJAAAPQAAAOAIAJQAJAJATAAQASAAAJgJQAJgJAAgOQAAgPgJgJQgKgKgRAAQgSAAgKAKgAFwBkQgOgLAAgOQAAgPAOgLQAQgKAWAAQAWAAARAKQANALAAAPQAAAOgNALQgOAKgZAAQgbAAgLgKgAF7A7QgJAHAAAJQAAAHAJAIQAKAGARAAQASAAAKgGQAJgIAAgHQAAgHgJgJQgJgHgTAAQgRAAgKAHgACyguQgTgLAAgQQAAgRATgJQATgLAlAAQAlAAATALQAUAJAAARQAAAQgUALQgUAKgkAAQgkAAgUgKgADAhaQgPAGAAALQAAANAPAEQANAGAdAAQAcAAANgGQAQgEAAgNQAAgKgQgHQgQgHgZAAQgYAAgSAHgABUgoIAAhoIgdAAIAABgIgQAAIAAi4IAQAAIAABJIAdAAIAAhNIAQAAIAADEgAj4gtIAAg9IAQAAIAAAwICAAAIAAANgAFfg/IAAgPIA1AAIAAgrIARAAIAAArIA3AAIAAgrIASAAIAAArIA1AAIAAAPgAhAibIA5AAIAAgtIg5AAIAAgNIBIAAIAABHIg3AAIAAAwIBOgFIAAAOIhfAEgAh+hdIAAhRIguAAIAAgNIAuAAIAAgxIAQAAIAACPgAkgiCIATgMQAHgDANgMQAIgIAFgOQAFgLAAgOIAAgGIgsAAIAAgNIBqAAIAAANIgsAAIAAAGQAAAMAEALIAKASQANANAIAEIARAJIgJAOIgOgIQgJgEgKgKIgLgMQgFgGgDgHIgIAOIgNAQIgSAOIgOAIgACIh9IAAgPIBZAAIAAgaIg/AAIAAg+ICQAAIAAAOIh/AAIAAAiICCAAIAAAOIhCAAIAAAaIBZAAIAAAPgAGKiMQgVgPAAgVQAAgVAVgPQAVgOAiAAQAhAAAWAOQATAPAAAVQAAAVgTAPQgTAOgkAAQgkAAgTgOgAGYjKQgSAKAAAQQAAAQASAKQAUAKAVAAQAVAAAUgKQAQgJAAgRQAAgSgRgIQgSgKgWAAQgVAAgUAKg");
	this.shape_1.setTransform(1149.225,252.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(3050));

	// ment
	this.instance_3 = new lib.ment("single",2);
	this.instance_3.setTransform(239.3,297.55,1,1,0,0,0,47.9,12.5);

	this.instance_4 = new lib.ment("single",3);
	this.instance_4.setTransform(754.65,297.55,1,1,0,0,0,47.9,12.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3}]}).wait(3050));

	// menu_over
	this.instance_5 = new lib.menubtn_over("single",0);
	this.instance_5.setTransform(714.75,75.4,1,1,0,0,0,70.1,26.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(645).to({x:862.4,startPosition:1},0).wait(653).to({x:1010.05,startPosition:2},0).wait(1103).to({x:1157.8,startPosition:3},0).wait(649));

	// menu_button
	this.singAlong_btn = new lib.singalongno();
	this.singAlong_btn.name = "singAlong_btn";
	this.singAlong_btn.setTransform(1042.2,80.8,1,1,0,0,0,75.8,29.1);
	new cjs.ButtonHelper(this.singAlong_btn, 0, 1, 2, false, new lib.singalongno(), 3);

	this.listen2_btn = new lib.Listening();
	this.listen2_btn.name = "listen2_btn";
	this.listen2_btn.setTransform(1190.1,80.6,1,1,0,0,0,75.8,29.1);
	new cjs.ButtonHelper(this.listen2_btn, 0, 1, 2, false, new lib.Listening(), 3);

	this.expert_btn = new lib.expert_no();
	this.expert_btn.name = "expert_btn";
	this.expert_btn.setTransform(872.35,80.8,1,1,0,0,0,75.8,29.1);
	new cjs.ButtonHelper(this.expert_btn, 0, 1, 2, false, new lib.expert_no(), 3);

	this.listen_btn = new lib.listentosongno();
	this.listen_btn.name = "listen_btn";
	this.listen_btn.setTransform(673.5,51.9);
	new cjs.ButtonHelper(this.listen_btn, 0, 1, 2, false, new lib.listentosongno(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.expert_btn,p:{regX:75.8,regY:29.1,scaleX:1,x:872.35,y:80.8}},{t:this.listen2_btn,p:{regX:75.8,regY:29.1,x:1190.1,y:80.6}},{t:this.singAlong_btn}]}).to({state:[{t:this.listen2_btn,p:{regX:75.8,regY:29.1,x:1190.1,y:80.6}},{t:this.singAlong_btn},{t:this.listen_btn}]},645).to({state:[{t:this.listen_btn},{t:this.expert_btn,p:{regX:0,regY:0,scaleX:0.9989,x:796.55,y:51.7}},{t:this.listen2_btn,p:{regX:0,regY:0,x:1114.3,y:51.5}}]},653).to({state:[{t:this.singAlong_btn},{t:this.listen_btn},{t:this.expert_btn,p:{regX:0,regY:0,scaleX:1,x:796.55,y:51.7}}]},1103).wait(649));

	// play_button
	this.stop1_btn = new lib.stop();
	this.stop1_btn.name = "stop1_btn";
	this.stop1_btn.setTransform(697.5,730.3,1.0005,0.9995,0,0,0,28.5,28.5);
	new cjs.ButtonHelper(this.stop1_btn, 0, 1, 2, false, new lib.stop(), 3);

	this.pause_btn = new lib.pause();
	this.pause_btn.name = "pause_btn";
	this.pause_btn.setTransform(640,750.3,1.0005,0.9995,0,0,0,48.7,49.1);
	new cjs.ButtonHelper(this.pause_btn, 0, 1, 2, false, new lib.pause(), 3);

	this.play_btn = new lib.play();
	this.play_btn.name = "play_btn";
	this.play_btn.setTransform(561.3,748.7,1.0005,1.0005,0,0,0,47.1,47.2);
	new cjs.ButtonHelper(this.play_btn, 0, 1, 2, false, new lib.play(), 3);

	this.stop2_btn = new lib.stop();
	this.stop2_btn.name = "stop2_btn";
	this.stop2_btn.setTransform(697.5,730.4,1.0005,0.9995,0,0,0,28.5,28.6);
	new cjs.ButtonHelper(this.stop2_btn, 0, 1, 2, false, new lib.stop(), 3);

	this.stop3_btn = new lib.stop();
	this.stop3_btn.name = "stop3_btn";
	this.stop3_btn.setTransform(697.4,730.3,1.0005,0.9995,0,0,0,28.4,28.5);
	new cjs.ButtonHelper(this.stop3_btn, 0, 1, 2, false, new lib.stop(), 3);

	this.stop4_btn = new lib.stop();
	this.stop4_btn.name = "stop4_btn";
	this.stop4_btn.setTransform(715.8,748.65,1.0013,0.9975,0,0,0,46.8,46.8);
	new cjs.ButtonHelper(this.stop4_btn, 0, 1, 2, false, new lib.stop(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.play_btn,p:{regX:47.1,regY:47.2,scaleY:1.0005,x:561.3,y:748.7,scaleX:1.0005}},{t:this.pause_btn,p:{regX:48.7,regY:49.1,x:640,y:750.3,scaleX:1.0005,scaleY:0.9995}},{t:this.stop1_btn}]}).to({state:[{t:this.play_btn,p:{regX:28.4,regY:28.4,scaleY:0.9995,x:542.6,y:730,scaleX:1.0005}},{t:this.pause_btn,p:{regX:54.6,regY:38.9,x:645.95,y:740.15,scaleX:1.0005,scaleY:0.9995}},{t:this.stop2_btn}]},645).to({state:[{t:this.play_btn,p:{regX:28.4,regY:28.4,scaleY:0.9995,x:542.6,y:730,scaleX:1.0005}},{t:this.pause_btn,p:{regX:54.6,regY:38.9,x:645.95,y:740.15,scaleX:1.0005,scaleY:0.9995}},{t:this.stop3_btn}]},653).to({state:[{t:this.play_btn,p:{regX:47.1,regY:47.4,scaleY:0.9994,x:561.3,y:748.95,scaleX:1.0013}},{t:this.pause_btn,p:{regX:89.2,regY:63.6,x:680.55,y:764.8,scaleX:1.0013,scaleY:0.9994}},{t:this.stop4_btn}]},1103).wait(649));

	// countdown
	this.instance_6 = new lib.countdown("synched",0);
	this.instance_6.setTransform(113.45,456.1,1,1,0,0,0,-497.6,83.8);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(76).to({_off:false},0).to({_off:true},59).wait(586).to({_off:false},0).to({_off:true},59).wait(583).to({_off:false},0).to({_off:true},58).wait(1056).to({_off:false},0).to({_off:true},59).wait(514));

	// red_mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_135 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_145 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_150 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_159 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_164 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_174 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_179 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_184 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_194 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_199 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_209 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_219 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_224 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_234 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_239 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_244 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_252 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_262 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_267 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_276 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_281 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_291 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_296 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_301 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_311 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_316 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_326 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_336 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_341 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_351 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_356 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_360 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_370 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_380 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_385 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_394 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_399 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_409 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_414 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_419 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_429 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_434 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_448 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_454 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_460 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_470 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_475 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_480 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_489 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_499 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_504 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_513 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_518 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_528 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_533 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_538 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_548 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_553 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_563 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_573 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_578 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_588 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_593 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_598 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_780 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_790 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_795 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_804 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_809 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_819 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_824 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_829 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_839 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_844 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_854 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_864 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_869 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_878 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_883 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_888 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_897 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_907 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_912 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_921 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_926 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_937 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_942 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_947 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_955 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_960 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_970 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_980 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_985 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_995 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_1000 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1004 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1015 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1025 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1030 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1039 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1044 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1054 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_1059 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1064 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1074 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1079 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1093 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_1099 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1104 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1114 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1119 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1124 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1134 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_1144 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1149 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1158 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1163 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1173 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1178 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1183 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1192 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1197 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1207 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1217 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1222 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_1232 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_1237 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1242 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1421 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1431 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1436 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1445 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1450 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1460 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_1465 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1470 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1480 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1484 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1495 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_1505 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1510 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1520 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1525 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1530 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1539 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1549 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1554 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1563 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1568 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1578 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_1583 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1588 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1597 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1601 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1612 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_1622 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1627 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1637 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1641 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1645 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1656 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_1667 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1672 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1681 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1686 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1696 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1701 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1706 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1715 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1720 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1730 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1740 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1745 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_1754 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_1759 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1764 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1774 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_1784 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1789 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1798 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1803 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1813 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1818 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1823 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1833 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1838 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1848 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1858 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1863 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_1872 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_1877 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1882 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1892 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1903 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1908 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1917 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_1922 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1932 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_1937 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1942 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1951 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1956 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_1967 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_1977 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1982 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_1992 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_1997 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2002 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2011 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2021 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2026 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2035 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2040 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2050 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_2055 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2060 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2070 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2074 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2084 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_2094 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2099 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2109 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2114 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2118 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2129 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_2139 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2144 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2154 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2159 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2169 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2174 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2179 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2189 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2194 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2204 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2214 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2219 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_2229 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_2234 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2239 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2247 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_2257 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2262 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2271 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2276 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2286 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2291 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2296 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2306 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2311 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2321 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2331 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2336 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_2346 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_2351 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2356 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2536 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2546 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2551 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2560 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2565 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2575 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_2580 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2585 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2594 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2599 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2609 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_2619 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2624 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2634 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2639 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2644 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2653 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_2663 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2668 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2677 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2682 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2692 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2697 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2702 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2712 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2717 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2727 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2737 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2742 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_2752 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_2757 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2761 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2771 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2781 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2786 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2796 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2801 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2811 = new cjs.Graphics().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	var mask_graphics_2816 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2821 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2830 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2835 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2849 = new cjs.Graphics().p("AizIQIAAwfIFoAAIAAQfg");
	var mask_graphics_2855 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2860 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2870 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2875 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2880 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2890 = new cjs.Graphics().p("Ai0IQIAAwfIFoAAIAAQfg");
	var mask_graphics_2900 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2905 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2914 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2919 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2929 = new cjs.Graphics().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2934 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	var mask_graphics_2939 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2949 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2954 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2964 = new cjs.Graphics().p("AizIQIAAwfIFnAAIAAQfg");
	var mask_graphics_2974 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	var mask_graphics_2979 = new cjs.Graphics().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	var mask_graphics_2989 = new cjs.Graphics().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	var mask_graphics_2994 = new cjs.Graphics().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	var mask_graphics_2999 = new cjs.Graphics().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(135).to({graphics:mask_graphics_135,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_145,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_150,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_159,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_164,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_174,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_179,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_184,x:619.825,y:370.875}).wait(10).to({graphics:mask_graphics_194,x:715.125,y:364.175}).wait(5).to({graphics:mask_graphics_199,x:758.475,y:364.175}).wait(10).to({graphics:mask_graphics_209,x:840.9,y:354.9}).wait(10).to({graphics:mask_graphics_219,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_224,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_234,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_239,x:1092.9,y:373.45}).wait(5).to({graphics:mask_graphics_244,x:1133.075,y:373.45}).wait(8).to({graphics:mask_graphics_252,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_262,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_267,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_276,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_281,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_291,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_296,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_301,x:597,y:575.375}).wait(10).to({graphics:mask_graphics_311,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_316,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_326,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_336,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_341,x:955.8,y:560}).wait(10).to({graphics:mask_graphics_351,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_356,x:1087.75,y:579.6}).wait(4).to({graphics:mask_graphics_360,x:1133.075,y:579.6}).wait(10).to({graphics:mask_graphics_370,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_380,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_385,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_394,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_399,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_409,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_414,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_419,x:619.825,y:370.875}).wait(10).to({graphics:mask_graphics_429,x:715.125,y:364.175}).wait(5).to({graphics:mask_graphics_434,x:758.475,y:364.175}).wait(14).to({graphics:mask_graphics_448,x:840.9,y:354.9}).wait(6).to({graphics:mask_graphics_454,x:927.975,y:352.85}).wait(6).to({graphics:mask_graphics_460,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_470,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_475,x:1092.9,y:373.45}).wait(5).to({graphics:mask_graphics_480,x:1133.075,y:373.45}).wait(9).to({graphics:mask_graphics_489,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_499,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_504,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_513,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_518,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_528,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_533,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_538,x:597,y:575.375}).wait(10).to({graphics:mask_graphics_548,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_553,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_563,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_573,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_578,x:955.8,y:560}).wait(10).to({graphics:mask_graphics_588,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_593,x:1087.75,y:579.6}).wait(5).to({graphics:mask_graphics_598,x:1133.075,y:579.6}).wait(14).to({graphics:null,x:0,y:0}).wait(168).to({graphics:mask_graphics_780,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_790,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_795,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_804,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_809,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_819,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_824,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_829,x:619.825,y:370.875}).wait(10).to({graphics:mask_graphics_839,x:715.125,y:364.175}).wait(5).to({graphics:mask_graphics_844,x:758.475,y:364.175}).wait(10).to({graphics:mask_graphics_854,x:840.9,y:354.9}).wait(10).to({graphics:mask_graphics_864,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_869,x:968.15,y:352.85}).wait(9).to({graphics:mask_graphics_878,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_883,x:1092.9,y:373.45}).wait(5).to({graphics:mask_graphics_888,x:1133.075,y:373.45}).wait(9).to({graphics:mask_graphics_897,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_907,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_912,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_921,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_926,x:425.65,y:548.725}).wait(11).to({graphics:mask_graphics_937,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_942,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_947,x:597,y:575.375}).wait(8).to({graphics:mask_graphics_955,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_960,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_970,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_980,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_985,x:955.8,y:560}).wait(10).to({graphics:mask_graphics_995,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_1000,x:1087.75,y:579.6}).wait(4).to({graphics:mask_graphics_1004,x:1133.075,y:579.6}).wait(11).to({graphics:mask_graphics_1015,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_1025,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_1030,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_1039,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_1044,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_1054,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_1059,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_1064,x:619.825,y:370.875}).wait(10).to({graphics:mask_graphics_1074,x:715.125,y:364.175}).wait(5).to({graphics:mask_graphics_1079,x:758.475,y:364.175}).wait(14).to({graphics:mask_graphics_1093,x:840.9,y:354.9}).wait(6).to({graphics:mask_graphics_1099,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_1104,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_1114,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_1119,x:1092.9,y:373.45}).wait(5).to({graphics:mask_graphics_1124,x:1133.075,y:373.45}).wait(10).to({graphics:mask_graphics_1134,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_1144,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_1149,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_1158,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_1163,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_1173,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_1178,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_1183,x:597,y:575.375}).wait(9).to({graphics:mask_graphics_1192,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_1197,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_1207,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_1217,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_1222,x:955.8,y:560}).wait(10).to({graphics:mask_graphics_1232,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_1237,x:1087.75,y:579.6}).wait(5).to({graphics:mask_graphics_1242,x:1133.075,y:579.6}).wait(14).to({graphics:null,x:0,y:0}).wait(165).to({graphics:mask_graphics_1421,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_1431,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_1436,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_1445,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_1450,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_1460,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_1465,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_1470,x:619.825,y:370.875}).wait(10).to({graphics:mask_graphics_1480,x:715.125,y:364.175}).wait(4).to({graphics:mask_graphics_1484,x:758.475,y:364.175}).wait(11).to({graphics:mask_graphics_1495,x:840.9,y:354.9}).wait(10).to({graphics:mask_graphics_1505,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_1510,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_1520,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_1525,x:1092.9,y:373.45}).wait(5).to({graphics:mask_graphics_1530,x:1133.075,y:373.45}).wait(9).to({graphics:mask_graphics_1539,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_1549,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_1554,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_1563,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_1568,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_1578,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_1583,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_1588,x:619.825,y:370.875}).wait(9).to({graphics:mask_graphics_1597,x:715.125,y:364.175}).wait(4).to({graphics:mask_graphics_1601,x:758.475,y:364.175}).wait(11).to({graphics:mask_graphics_1612,x:840.9,y:354.9}).wait(10).to({graphics:mask_graphics_1622,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_1627,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_1637,x:1051.675,y:359.025}).wait(4).to({graphics:mask_graphics_1641,x:1092.9,y:373.45}).wait(4).to({graphics:mask_graphics_1645,x:1133.075,y:373.45}).wait(11).to({graphics:mask_graphics_1656,x:160,y:550.075}).wait(11).to({graphics:mask_graphics_1667,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_1672,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_1681,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_1686,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_1696,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_1701,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_1706,x:597,y:575.375}).wait(9).to({graphics:mask_graphics_1715,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_1720,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_1730,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_1740,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_1745,x:955.8,y:560}).wait(9).to({graphics:mask_graphics_1754,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_1759,x:1087.75,y:579.6}).wait(5).to({graphics:mask_graphics_1764,x:1133.075,y:579.6}).wait(10).to({graphics:mask_graphics_1774,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_1784,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_1789,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_1798,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_1803,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_1813,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_1818,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_1823,x:597,y:575.375}).wait(10).to({graphics:mask_graphics_1833,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_1838,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_1848,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_1858,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_1863,x:955.8,y:560}).wait(9).to({graphics:mask_graphics_1872,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_1877,x:1087.75,y:579.6}).wait(5).to({graphics:mask_graphics_1882,x:1133.075,y:579.6}).wait(10).to({graphics:mask_graphics_1892,x:201.225,y:343.925}).wait(11).to({graphics:mask_graphics_1903,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_1908,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_1917,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_1922,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_1932,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_1937,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_1942,x:619.825,y:370.875}).wait(9).to({graphics:mask_graphics_1951,x:715.125,y:364.175}).wait(5).to({graphics:mask_graphics_1956,x:758.475,y:364.175}).wait(11).to({graphics:mask_graphics_1967,x:840.9,y:354.9}).wait(10).to({graphics:mask_graphics_1977,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_1982,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_1992,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_1997,x:1092.9,y:373.45}).wait(5).to({graphics:mask_graphics_2002,x:1133.075,y:373.45}).wait(9).to({graphics:mask_graphics_2011,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_2021,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_2026,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_2035,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_2040,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_2050,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_2055,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_2060,x:619.825,y:370.875}).wait(10).to({graphics:mask_graphics_2070,x:715.125,y:364.175}).wait(4).to({graphics:mask_graphics_2074,x:758.475,y:364.175}).wait(10).to({graphics:mask_graphics_2084,x:840.9,y:354.9}).wait(10).to({graphics:mask_graphics_2094,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_2099,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_2109,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_2114,x:1092.9,y:373.45}).wait(4).to({graphics:mask_graphics_2118,x:1133.075,y:373.45}).wait(11).to({graphics:mask_graphics_2129,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_2139,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_2144,x:295.5,y:552.125}).wait(10).to({graphics:mask_graphics_2154,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_2159,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_2169,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_2174,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_2179,x:597,y:575.375}).wait(10).to({graphics:mask_graphics_2189,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_2194,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_2204,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_2214,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_2219,x:955.8,y:560}).wait(10).to({graphics:mask_graphics_2229,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_2234,x:1087.75,y:579.6}).wait(5).to({graphics:mask_graphics_2239,x:1133.075,y:579.6}).wait(8).to({graphics:mask_graphics_2247,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_2257,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_2262,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_2271,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_2276,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_2286,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_2291,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_2296,x:597,y:575.375}).wait(10).to({graphics:mask_graphics_2306,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_2311,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_2321,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_2331,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_2336,x:955.8,y:560}).wait(10).to({graphics:mask_graphics_2346,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_2351,x:1087.75,y:579.6}).wait(5).to({graphics:mask_graphics_2356,x:1133.075,y:579.6}).wait(13).to({graphics:null,x:0,y:0}).wait(167).to({graphics:mask_graphics_2536,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_2546,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_2551,x:333.625,y:345.975}).wait(9).to({graphics:mask_graphics_2560,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_2565,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_2575,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_2580,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_2585,x:619.825,y:370.875}).wait(9).to({graphics:mask_graphics_2594,x:715.125,y:364.175}).wait(5).to({graphics:mask_graphics_2599,x:758.475,y:364.175}).wait(10).to({graphics:mask_graphics_2609,x:840.9,y:354.9}).wait(10).to({graphics:mask_graphics_2619,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_2624,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_2634,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_2639,x:1092.9,y:373.45}).wait(5).to({graphics:mask_graphics_2644,x:1133.075,y:373.45}).wait(9).to({graphics:mask_graphics_2653,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_2663,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_2668,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_2677,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_2682,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_2692,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_2697,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_2702,x:597,y:575.375}).wait(10).to({graphics:mask_graphics_2712,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_2717,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_2727,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_2737,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_2742,x:955.8,y:560}).wait(10).to({graphics:mask_graphics_2752,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_2757,x:1087.75,y:579.6}).wait(4).to({graphics:mask_graphics_2761,x:1133.075,y:579.6}).wait(10).to({graphics:mask_graphics_2771,x:201.225,y:343.925}).wait(10).to({graphics:mask_graphics_2781,x:293.45,y:345.975}).wait(5).to({graphics:mask_graphics_2786,x:333.625,y:345.975}).wait(10).to({graphics:mask_graphics_2796,x:417.15,y:345.975}).wait(5).to({graphics:mask_graphics_2801,x:455.275,y:345.975}).wait(10).to({graphics:mask_graphics_2811,x:539.775,y:355.25}).wait(5).to({graphics:mask_graphics_2816,x:580.675,y:370.875}).wait(5).to({graphics:mask_graphics_2821,x:619.825,y:370.875}).wait(9).to({graphics:mask_graphics_2830,x:715.125,y:364.175}).wait(5).to({graphics:mask_graphics_2835,x:758.475,y:364.175}).wait(14).to({graphics:mask_graphics_2849,x:840.9,y:354.9}).wait(6).to({graphics:mask_graphics_2855,x:927.975,y:352.85}).wait(5).to({graphics:mask_graphics_2860,x:968.15,y:352.85}).wait(10).to({graphics:mask_graphics_2870,x:1051.675,y:359.025}).wait(5).to({graphics:mask_graphics_2875,x:1092.9,y:373.45}).wait(5).to({graphics:mask_graphics_2880,x:1133.075,y:373.45}).wait(10).to({graphics:mask_graphics_2890,x:160,y:550.075}).wait(10).to({graphics:mask_graphics_2900,x:253.25,y:552.125}).wait(5).to({graphics:mask_graphics_2905,x:295.5,y:552.125}).wait(9).to({graphics:mask_graphics_2914,x:384.175,y:552.125}).wait(5).to({graphics:mask_graphics_2919,x:425.65,y:548.725}).wait(10).to({graphics:mask_graphics_2929,x:510.9,y:561.4}).wait(5).to({graphics:mask_graphics_2934,x:556.925,y:573.4}).wait(5).to({graphics:mask_graphics_2939,x:597,y:575.375}).wait(10).to({graphics:mask_graphics_2949,x:693.5,y:570.325}).wait(5).to({graphics:mask_graphics_2954,x:736.425,y:567.65}).wait(10).to({graphics:mask_graphics_2964,x:824.425,y:561.05}).wait(10).to({graphics:mask_graphics_2974,x:915.6,y:558.975}).wait(5).to({graphics:mask_graphics_2979,x:955.8,y:560}).wait(10).to({graphics:mask_graphics_2989,x:1046.525,y:565.15}).wait(5).to({graphics:mask_graphics_2994,x:1087.75,y:579.6}).wait(5).to({graphics:mask_graphics_2999,x:1133.075,y:579.6}).wait(14).to({graphics:null,x:0,y:0}).wait(37));

	// note_red_l
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_2.setTransform(1136.4569,562.3616,2.4309,2.431);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_3.setTransform(1136.4569,562.3616,2.4309,2.431);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_4.setTransform(1092.8221,562.3616,2.4309,2.431);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_5.setTransform(1092.8221,562.3616,2.4309,2.431);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_6.setTransform(1049.795,548.3832,2.4309,2.431);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_7.setTransform(1049.795,548.3832,2.4309,2.431);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_8.setTransform(963.1331,541.394,2.4309,2.431);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_9.setTransform(963.1331,541.394,2.4309,2.431);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_10.setTransform(919.4983,541.394,2.4309,2.431);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_11.setTransform(919.4983,541.394,2.4309,2.431);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_12.setTransform(832.8365,541.394,2.4309,2.431);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_13.setTransform(832.8365,541.394,2.4309,2.431);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_14.setTransform(727.6997,578.6495,2.4309,2.431);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_15.setTransform(727.6997,578.6495,2.4309,2.431);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_16.setTransform(684.6726,578.6495,2.4309,2.431);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_17.setTransform(684.6726,578.6495,2.4309,2.431);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_18.setTransform(598.4969,562.3616,2.4309,2.431);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_19.setTransform(598.4969,562.3616,2.4309,2.431);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_20.setTransform(555.4698,562.3616,2.4309,2.431);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_21.setTransform(555.4698,562.3616,2.4309,2.431);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_22.setTransform(511.835,548.3832,2.4309,2.431);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_23.setTransform(511.835,548.3832,2.4309,2.431);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_24.setTransform(425.7201,541.394,2.4309,2.431);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_25.setTransform(425.7201,541.394,2.4309,2.431);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_26.setTransform(382.1461,541.394,2.4309,2.431);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_27.setTransform(382.1461,541.394,2.4309,2.431);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_28.setTransform(296.0311,541.394,2.4309,2.431);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_29.setTransform(296.0311,541.394,2.4309,2.431);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_30.setTransform(252.4571,541.394,2.4309,2.431);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_31.setTransform(252.4571,541.394,2.4309,2.431);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_32.setTransform(166.2814,541.394,2.4309,2.431);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_33.setTransform(166.2814,541.394,2.4309,2.431);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_34.setTransform(1138.1585,357.2065,2.4309,2.431);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_35.setTransform(1138.1585,357.2065,2.4309,2.431);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_36.setTransform(1096.9546,357.2065,2.4309,2.431);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_37.setTransform(1096.9546,357.2065,2.4309,2.431);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_38.setTransform(1055.6292,343.228,2.4309,2.431);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_39.setTransform(1055.6292,343.228,2.4309,2.431);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_40.setTransform(972.9783,336.2388,2.4309,2.431);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_41.setTransform(972.9783,336.2388,2.4309,2.431);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_42.setTransform(931.1667,336.2388,2.4309,2.431);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_43.setTransform(931.1667,336.2388,2.4309,2.431);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_44.setTransform(848.5158,336.2388,2.4309,2.431);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_45.setTransform(848.5158,336.2388,2.4309,2.431);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_46.setTransform(747.5116,373.4336,2.4309,2.431);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_47.setTransform(747.5116,373.4336,2.4309,2.431);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_48.setTransform(706.1861,373.4336,2.4309,2.431);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_49.setTransform(706.1861,373.4336,2.4309,2.431);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_50.setTransform(623.4745,357.2065,2.4309,2.431);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_51.setTransform(623.4745,357.2065,2.4309,2.431);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_52.setTransform(582.2098,357.2065,2.4309,2.431);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_53.setTransform(582.2098,357.2065,2.4309,2.431);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_54.setTransform(540.2766,343.228,2.4309,2.431);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_55.setTransform(540.2766,343.228,2.4309,2.431);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_56.setTransform(457.7473,336.2388,2.4309,2.431);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_57.setTransform(457.7473,336.2388,2.4309,2.431);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_58.setTransform(415.8141,336.2388,2.4309,2.431);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_59.setTransform(415.8141,336.2388,2.4309,2.431);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_60.setTransform(333.2848,336.2388,2.4309,2.431);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_61.setTransform(333.2848,336.2388,2.4309,2.431);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_62.setTransform(291.3516,336.2388,2.4309,2.431);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_63.setTransform(291.3516,336.2388,2.4309,2.431);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_64.setTransform(208.8223,336.2388,2.4309,2.431);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_65.setTransform(208.8223,336.2388,2.4309,2.431);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.shape_49,this.shape_50,this.shape_51,this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64,this.shape_65];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},135).to({state:[]},477).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},168).to({state:[]},476).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},165).to({state:[]},948).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},167).to({state:[]},477).wait(37));

	// note_red_o
	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgHQgBgFACgHQAEgIAEgFIANgKQAHgFAHgCQAGgCAKAAQAJAAAFACQAHADADAFQADAEACAGQABAHgDAFQgDAIgFAFQgGAHgHAEQgHAFgIACQgIACgHAAQgIAAgGgCg");
	this.shape_66.setTransform(1127.6023,588.1305,2.4309,2.431);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_67.setTransform(1136.4569,562.3616,2.4309,2.431);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgHQgBgFACgHQAEgIAEgFIANgKQAHgFAIgCQAFgCAKAAQAJAAAFACQAHADADAFQAEAEABAGQABAHgDAFQgDAIgFAFQgFAGgHAFQgJAFgHACQgHACgIAAQgIAAgGgCg");
	this.shape_68.setTransform(1083.9675,588.1305,2.4309,2.431);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_69.setTransform(1092.8221,562.3616,2.4309,2.431);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#ED1C24").s().p("AAKBcQAFgHAFgJQAJgTAAgTQAAgPgGgPQgIgQgPgNQgOgNgRgCIgDAAIAAg4IADAAIADAMQAEANAMALQAbAbAKARQAKAOAAAYIgBAPQgIAigPASg");
	this.shape_70.setTransform(1101.3303,558.5935,2.4309,2.431);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgGACgHQADgHAFgFQAGgHAHgEQAHgFAHgCQAGgCAKAAQAIAAAGACQAHADADAFQADAEACAGQABAHgDAFQgDAIgFAFQgGAHgHAEQgHAFgIACQgGACgJAAQgIAAgGgCg");
	this.shape_71.setTransform(1040.9404,574.1521,2.4309,2.431);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_72.setTransform(1049.795,548.3832,2.4309,2.431);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#ED1C24").s().p("AAKBcQAGgHADgJQAKgTAAgTQAAgPgGgPQgIgQgPgNQgPgNgRgCIgCAAIAAg4IADAAIADAMQAEANAMALQAZAZAMATQAKAQAAAWQAAAIgBAHQgIAigPASg");
	this.shape_73.setTransform(1058.3032,544.6151,2.4309,2.431);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#ED1C24").s().p("AgaAeQgFgBgEgGQgEgFgBgGQgBgFADgHQADgHAFgGQAFgGAHgEQAFgEAKgDQAIgCAHAAQAJAAAGACQAGADAEAEQADAFABAGQABAGgDAHQgCAHgGAFQgFAHgHAEQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_74.setTransform(954.256,567.1629,2.4309,2.431);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_75.setTransform(963.1331,541.394,2.4309,2.431);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#ED1C24").s().p("AgaAeQgFgBgEgGQgEgFgBgGQgBgFADgHQADgHAFgGQAFgGAHgEQAFgEAKgDQAIgCAHAAQAJAAAGACQAGADAEAEQAEAFAAAGQABAGgDAHQgCAHgGAFQgFAHgHAEQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_76.setTransform(910.6212,567.1629,2.4309,2.431);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_77.setTransform(919.4983,541.394,2.4309,2.431);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgHgQgQgNQgPgNgQgCIgDAAIAAg4IAEAAIACAMQAEANAMALQAbAbAKARQAKAOAAAXIgBAQQgIAigPASg");
	this.shape_78.setTransform(928.0065,537.6866,2.4309,2.431);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#ED1C24").s().p("AgaAeQgFgBgEgGQgEgFgBgGQgBgFADgHQADgHAFgGQAFgGAHgEQAFgEAKgDQAIgCAHAAQAJAAAGACQAGADAEAEQAEAFAAAGQABAGgDAHQgCAHgGAFQgFAHgHAEQgIAFgHACQgIACgHAAQgIAAgHgDg");
	this.shape_79.setTransform(823.9593,567.1629,2.4309,2.431);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_80.setTransform(832.8365,541.394,2.4309,2.431);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#ED1C24").s().p("AgaAeQgFgCgEgFQgEgEgBgHQgBgGADgGQADgIAFgFQAFgGAHgEQAFgEAKgDQAGgCAJAAQAKAAAFACQAHAEADADQADAFABAGQABAGgDAGQgCAIgGAFQgFAGgHAFQgIAFgHACQgIACgHAAQgIAAgHgDg");
	this.shape_81.setTransform(737.2974,553.2452,2.4309,2.431);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_82.setTransform(727.6997,578.6495,2.4309,2.431);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#ED1C24").s().p("AgaAeQgFgCgEgFQgEgEgBgHQgBgGADgGQADgIAFgFQAFgGAHgEQAFgEAKgDQAGgCAJAAQAKAAAFACQAHAEADADQADAFABAGQABAGgDAGQgCAIgGAFQgFAGgHAFQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_83.setTransform(694.2703,553.2452,2.4309,2.431);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_84.setTransform(684.6726,578.6495,2.4309,2.431);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#ED1C24").s().p("AgiBeIAAg5IADAAQAQgCAPgNQAPgMAIgSQAGgOAAgPQAAgSgJgUQgFgLgFgFIABgBQAQASAHAiIABAPQAAAYgKAOQgKARgbAbQgMALgEANIgDANg");
	this.shape_85.setTransform(692.6946,582.3568,2.4309,2.431);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgHQgBgGADgGQACgGAGgHQAGgGAGgEQAIgFAHgCQAGgCAJAAQAJAAAGACQAHAEACAEQAEAEABAGQABAFgDAHQgCAGgGAHQgFAHgHAEQgIAFgHACQgIACgHAAQgIAAgHgCg");
	this.shape_86.setTransform(589.5271,588.1305,2.4309,2.431);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_87.setTransform(598.4969,562.3616,2.4309,2.431);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgHQgBgGADgGQACgGAGgHQAGgGAGgEQAHgFAIgCQAGgCAJAAQAJAAAGACQAFADAEAFQAEAEABAGQABAGgDAGQgDAIgFAFQgEAFgIAGQgIAFgHACQgIACgHAAQgIAAgHgCg");
	this.shape_88.setTransform(546.5001,588.1305,2.4309,2.431);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_89.setTransform(555.4698,562.3616,2.4309,2.431);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#ED1C24").s().p("AAJBcQAFgEAGgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgOgNgRgCIgDAAIAAg4IADAAIACAMQAGAOALAKQAZAYAMAUQAKAQAAAWQAAAIgCAHQgGAigQASg");
	this.shape_90.setTransform(563.978,558.5935,2.4309,2.431);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgFADgIQACgFAGgHQAFgGAHgFQAIgFAHgCQAGgCAJAAQAHAAAIACQAHAEACAEQAEAEABAGQABAFgDAHQgCAGgGAHQgFAHgHAEQgIAFgHACQgGACgJAAQgIAAgHgCg");
	this.shape_91.setTransform(502.8653,574.1521,2.4309,2.431);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_92.setTransform(511.835,548.3832,2.4309,2.431);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#ED1C24").s().p("AAJBcQAFgEAFgMQAKgTgBgTQAAgPgFgPQgHgQgQgNQgOgMgSgDIgCAAIAAg4IADAAIADAMQAFANAKALQAYAXAOAVQAKAQAAAWQAAAIgBAHQgIAigPASg");
	this.shape_93.setTransform(520.3432,544.6151,2.4309,2.431);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#ED1C24").s().p("AgZAeQgGgCgEgFQgEgFgBgGQgBgGADgGQADgHAFgGQAGgFAGgFQAFgEAKgDQAIgCAIAAQAIAAAGACQAGACAEAFQAEAFAAAGQABAGgCAHQgEAHgEAFQgFAFgIAGQgHAFgIACQgIACgHAAQgIAAgGgDg");
	this.shape_94.setTransform(416.7683,567.1629,2.4309,2.431);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_95.setTransform(425.7201,541.394,2.4309,2.431);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#ED1C24").s().p("AgaAeQgGgCgEgFQgEgFAAgGQgBgGADgGQACgGAGgHQAFgFAHgFQAFgEAKgDQAIgCAHAAQAIAAAHACQAFACAEAFQAEAFABAGQABAFgDAIQgCAGgGAGQgEAFgIAGQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_96.setTransform(373.156,567.1629,2.4309,2.431);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_97.setTransform(382.1461,541.394,2.4309,2.431);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#ED1C24").s().p("AAJBcQAFgEAFgMQAJgTAAgTQAAgPgFgPQgHgQgQgNQgOgNgRgCIgDAAIAAg4IADAAIADAMQAFAOALAKQAZAYAMAUQAKAQAAAVQAAAJgBAHQgHAigQASg");
	this.shape_98.setTransform(390.6542,537.6866,2.4309,2.431);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#ED1C24").s().p("AgZAeQgGgCgEgFQgEgFgBgGQgBgGADgGQADgGAFgHQAEgEAIgGQAFgEAKgDQAIgCAHAAQAJAAAGACQAGACAEAFQAEAFAAAGQABAGgCAHQgEAHgEAFQgHAHgGAEQgHAFgIACQgIACgHAAQgIAAgGgDg");
	this.shape_99.setTransform(287.0793,567.1629,2.4309,2.431);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_100.setTransform(296.0311,541.394,2.4309,2.431);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#ED1C24").s().p("AgZAeQgGgCgEgFQgEgFgBgGQgBgGADgGQADgHAFgGQAGgFAGgFQAFgEAKgDQAIgCAIAAQAIAAAGACQAGACAEAFQAEAFAAAGQABAGgCAHQgEAHgEAFQgFAFgIAGQgHAFgIACQgIACgHAAQgIAAgGgDg");
	this.shape_101.setTransform(243.4445,567.1629,2.4309,2.431);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_102.setTransform(252.4571,541.394,2.4309,2.431);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#ED1C24").s().p("AAJBcQAFgEAGgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgOgNgRgCIgDAAIAAg4IADAAIACAMQAFANAMALQAZAZALATQALAPAAAWQAAAJgCAHQgGAigQASg");
	this.shape_103.setTransform(260.9653,537.6866,2.4309,2.431);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#ED1C24").s().p("AgZAeQgGgCgEgFQgEgFgBgGQgBgGADgGQADgGAFgHQAEgEAIgGQAFgEAKgDQAIgCAHAAQAJAAAGACQAGACAEAFQAEAFAAAGQABAGgCAHQgEAHgEAFQgHAHgGAEQgHAEgIADQgIACgHAAQgIAAgGgDg");
	this.shape_104.setTransform(157.3904,567.1629,2.4309,2.431);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_105.setTransform(166.2814,541.394,2.4309,2.431);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#ED1C24").s().p("AgZAeQgGgCgEgEQgEgGgBgGQgBgGADgGQADgHAFgGQAEgFAIgFQAFgDAKgEQAIgCAHgBQAJAAAGAEQAGACAEAEQAEAFAAAGQABAGgCAGQgEAJgEAEQgHAHgGAEQgHAEgIADQgIADgHAAQgIAAgGgEg");
	this.shape_106.setTransform(1129.2675,382.9754,2.4309,2.431);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_107.setTransform(1138.1585,357.2065,2.4309,2.431);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#ED1C24").s().p("AgZAeQgGgCgEgEQgEgGgBgGQgBgGADgGQACgGAGgHQAGgGAGgEQAFgDAKgEQAIgCAIgBQAIAAAGAEQAGACAEAEQAEAFAAAGQABAGgCAGQgEAJgEAEQgFAGgIAFQgHAFgIACQgIADgHAAQgIAAgGgEg");
	this.shape_108.setTransform(1087.942,382.9754,2.4309,2.431);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_109.setTransform(1096.9546,357.2065,2.4309,2.431);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#ED1C24").s().p("AAJBcQAFgEAGgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgOgNgRgCIgDAAIAAg4IADAAIACAMQAFANAMALQAZAZALATQALAPAAAWQAAAIgCAIQgGAigQASg");
	this.shape_110.setTransform(1105.4628,353.4991,2.4309,2.431);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#ED1C24").s().p("AgaAeQgGgCgEgFQgEgFAAgGQgBgFADgHQADgIAFgFQAFgGAHgEIAPgHQAGgCAJAAQAKAAAFACQAHAEACADQADAEACAHQABAGgDAGQgCAGgGAHQgFAHgHAEQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_111.setTransform(1046.7159,369.0577,2.4309,2.431);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_112.setTransform(1055.6292,343.228,2.4309,2.431);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#ED1C24").s().p("AAKBcQADgEAHgMQAJgUAAgSQAAgPgGgPQgIgQgPgNQgPgNgQgCIgDAAIAAg4IAEAAIACAMQAEAOALAKQAbAaALASQAKAQAAAVQAAAJgCAHQgGAigQASg");
	this.shape_113.setTransform(1064.1374,339.5207,2.4309,2.431);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgGAFgGQAFgFAIgGQAHgFAIgCQAIgCAHAAQAIAAAGADQAGACAEAFQAEAEABAGQABAGgDAGQgDAHgFAGIgMALQgEADgLAEQgHACgJAAQgJAAgFgCg");
	this.shape_114.setTransform(964.1098,362.0078,2.4309,2.431);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_115.setTransform(972.9783,336.2388,2.4309,2.431);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgFADgIQACgFAGgHQAFgGAHgFQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACADAFQAEAEABAGQABAHgDAFQgBAGgHAHQgGAIgGADQgFAEgKADQgHACgIAAQgKAAgFgCg");
	this.shape_116.setTransform(922.2534,362.0078,2.4309,2.431);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_117.setTransform(931.1667,336.2388,2.4309,2.431);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#ED1C24").s().p("AAKBcQAEgEAGgMQAJgVAAgRQAAgPgGgPQgIgRgPgMQgPgMgRgDIgCAAIAAg4IADAAIADALQAFAPAKAKQAbAbALARQAKAQAAAVQAAAJgCAHQgGAhgQAUg");
	this.shape_118.setTransform(939.6749,332.5315,2.4309,2.431);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgGAFgGQAFgFAIgGQAHgFAIgCQAIgCAHAAQAIAAAGADQAGACAEAFQAEAEABAGQABAGgDAGQgDAHgFAGIgMALQgEADgLAEQgHACgJAAQgJAAgFgCg");
	this.shape_119.setTransform(839.6473,362.0078,2.4309,2.431);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_120.setTransform(848.5158,336.2388,2.4309,2.431);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgFgBgFQgBgFADgIQACgFAGgIQAFgFAHgFQAIgFAHgCQAIgDAHABQAJAAAGACQAGADADAFQAEADABAHQABAHgDAFQgBAFgHAIQgFAHgHAEQgFADgKAEQgIADgHgBQgJAAgGgCg");
	this.shape_121.setTransform(757.0731,348.0901,2.4309,2.431);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_122.setTransform(747.5116,373.4336,2.4309,2.431);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#ED1C24").s().p("AgaAfQgFgCgEgGQgEgFgBgFQgBgHADgGQADgIAFgFQAFgGAHgEQAIgFAHgCQAIgDAHABQAJAAAGACQAGADAEAFQAEAEAAAGQABAHgDAFQgCAHgGAGQgFAGgHAFIgPAHQgIADgHgBQgJAAgGgCg");
	this.shape_123.setTransform(715.7839,348.0901,2.4309,2.431);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_124.setTransform(706.1861,373.4336,2.4309,2.431);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#ED1C24").s().p("AgiBdIAAg4IADAAQAQgCAPgNQARgOAGgPQAGgOAAgQQAAgTgJgTQgFgKgFgGIABgBQARATAGAhIABAQQAAAXgKAOQgKARgbAbQgLALgFANIgCAMg");
	this.shape_125.setTransform(714.2081,377.2017,2.4309,2.431);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#ED1C24").s().p("AgZAeQgGgCgEgEQgEgGgBgGQgBgGADgGQADgHAFgGQAGgGAGgEQAFgDAKgEQAIgCAIgBQAIAAAGAEQAGACAEAEQAEAFAAAGQABAGgCAGQgEAJgEAEQgFAGgIAFQgHAFgIACQgIADgHAAQgIAAgGgEg");
	this.shape_126.setTransform(614.5227,382.9754,2.4309,2.431);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_127.setTransform(623.4745,357.2065,2.4309,2.431);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#ED1C24").s().p("AgaAeQgGgCgEgEQgEgGAAgGQgBgFADgHQACgGAGgHQAFgGAHgEIAPgHQAIgCAHgBQAIAAAHAEQAGACADAEQAEAFABAGQABAFgDAHQgCAGgGAHQgFAHgHAEQgIAFgHACQgIADgHAAQgJAAgGgEg");
	this.shape_128.setTransform(573.2401,382.9754,2.4309,2.431);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_129.setTransform(582.2098,357.2065,2.4309,2.431);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#ED1C24").s().p("AAKBcQADgEAHgMQAIgTABgTQgBgPgFgPQgIgQgPgNQgPgNgRgCIgCAAIAAg4IADAAIADAMQAEAOALAKQAaAYAMAUQAKAQAAAVQAAAIgCAIQgGAigQASg");
	this.shape_130.setTransform(590.718,353.4991,2.4309,2.431);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#ED1C24").s().p("AgaAeQgFgCgEgFQgEgFgBgGQgBgGADgGQADgIAFgFQAFgGAHgEQAFgEAKgDQAGgCAJAAQAKAAAFACQAHAEADADQADAFABAGQABAGgCAGQgEAIgFAFQgFAGgHAFQgIAFgHACQgIACgHAAQgIAAgHgDg");
	this.shape_131.setTransform(531.3813,369.0577,2.4309,2.431);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_132.setTransform(540.2766,343.228,2.4309,2.431);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgGgPgRgOQgPgNgQgCIgDAAIAAg4IADAAIADAMQAFANALALQAbAbAKARQAKAOAAAXIgBAQQgGAhgRATg");
	this.shape_133.setTransform(548.7848,339.5207,2.4309,2.431);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAIgFAHgCQAIgCAHAAQAIAAAHADQAGACADAFQAEAEABAGQABAFgDAHQgBAGgHAHQgGAIgGADQgFAEgKADQgHACgIAAQgKAAgFgCg");
	this.shape_134.setTransform(448.7573,362.0078,2.4309,2.431);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_135.setTransform(457.7473,336.2388,2.4309,2.431);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#ED1C24").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgGAGQgGAHgGAEIgPAHQgGACgJAAQgJAAgGgCg");
	this.shape_136.setTransform(406.937,362.0078,2.4309,2.431);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_137.setTransform(415.8141,336.2388,2.4309,2.431);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgGgPgRgOQgPgNgQgCIgDAAIAAg4IAEAAIACALQAFAOALALQAbAbAKARQAKAPAAAWIgBAQQgGAggRAVg");
	this.shape_138.setTransform(424.3223,332.5315,2.4309,2.431);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAIgFAHgCQAIgCAHAAQAIAAAHADQAGACADAFQAEAEABAGQABAFgDAHQgBAGgHAHQgFAHgHAEQgFAEgKADQgHACgIAAQgKAAgFgCg");
	this.shape_139.setTransform(324.2948,362.0078,2.4309,2.431);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_140.setTransform(333.2848,336.2388,2.4309,2.431);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#ED1C24").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgGAGQgGAHgGAEIgPAHQgGACgJAAQgJAAgGgCg");
	this.shape_141.setTransform(282.4745,362.0078,2.4309,2.431);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_142.setTransform(291.3516,336.2388,2.4309,2.431);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgGgPgRgOQgPgNgQgCIgDAAIAAg4IAEAAIACALQAFAOALALQAbAbAKARQAKAPAAAWIgBAQQgHAhgQAUg");
	this.shape_143.setTransform(299.8598,332.5315,2.4309,2.431);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAHgFAIgCQAIgCAHAAQAIAAAHADQAFACAEAFQAEAEABAGQABAFgDAHQgBAGgHAHQgFAHgHAEQgFAEgKADQgHACgIAAQgKAAgFgCg");
	this.shape_144.setTransform(199.8323,362.0078,2.4309,2.431);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_145.setTransform(208.8223,336.2388,2.4309,2.431);

	var maskedShapeInstanceList = [this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72,this.shape_73,this.shape_74,this.shape_75,this.shape_76,this.shape_77,this.shape_78,this.shape_79,this.shape_80,this.shape_81,this.shape_82,this.shape_83,this.shape_84,this.shape_85,this.shape_86,this.shape_87,this.shape_88,this.shape_89,this.shape_90,this.shape_91,this.shape_92,this.shape_93,this.shape_94,this.shape_95,this.shape_96,this.shape_97,this.shape_98,this.shape_99,this.shape_100,this.shape_101,this.shape_102,this.shape_103,this.shape_104,this.shape_105,this.shape_106,this.shape_107,this.shape_108,this.shape_109,this.shape_110,this.shape_111,this.shape_112,this.shape_113,this.shape_114,this.shape_115,this.shape_116,this.shape_117,this.shape_118,this.shape_119,this.shape_120,this.shape_121,this.shape_122,this.shape_123,this.shape_124,this.shape_125,this.shape_126,this.shape_127,this.shape_128,this.shape_129,this.shape_130,this.shape_131,this.shape_132,this.shape_133,this.shape_134,this.shape_135,this.shape_136,this.shape_137,this.shape_138,this.shape_139,this.shape_140,this.shape_141,this.shape_142,this.shape_143,this.shape_144,this.shape_145];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66}]},135).to({state:[]},477).to({state:[{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66}]},168).to({state:[]},476).to({state:[{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66}]},165).to({state:[]},948).to({state:[{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66}]},167).to({state:[]},477).wait(37));

	// black_line
	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#231916").s().p("AgOAhIAIgHQAGgGADgHIAEgNQAAAAAAAAQAAgBAAAAQgBAAAAAAQAAAAAAAAIgFABIgHAAQgGAAgEgFQgDgFAAgHQAAgFAFgFQAGgGAIAAQAIAAAGAHQAGAIAAAMQAAAMgOAPQgMANgGAAg");
	this.shape_146.setTransform(660.3027,522.4927,2.4309,2.431);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_147.setTransform(639.1538,587.9482,2.4309,2.431);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_148.setTransform(639.1538,573.9698,2.4309,2.431);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_149.setTransform(639.1538,559.9914,2.4309,2.431);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_150.setTransform(639.1538,546.0129,2.4309,2.431);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_151.setTransform(639.1538,532.0345,2.4309,2.431);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_152.setTransform(1189.2684,559.9914,2.4309,2.431);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#231916").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_153.setTransform(1200.6936,559.9914,2.4309,2.431);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_154.setTransform(667.1093,559.9914,2.4309,2.431);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#231916").s().p("AgNDVQgIgCgIgEQgHgEgGgGQgGgHAAgJIABgLQAAgFAEgFQADgEAEgDQAGgEAGAAIAIABIAIAFQAEADACAEQACAEAAAFQABAJgFAHQgGAIgPAEQADADAGADQAGADAKAAQAJAAAKgGQAKgHAEgIQADgGAAgKIgBgTIgGgnIgOABQgHABgHgBIgMgBIgJgDQgSgJgLgJQgLgKgGgKQgFgJgDgMIgDgWQgBgOADgKQADgMAFgKIANgUIAOgQIAlggIgEgpIAAgQIADgTQAAgEAEgKQADgJAGgIQADgHAHgIQAGgGAFAAQACAAAEAEIAGAIIAFAMIAFANIAFAZQAAALgBAKQgBAKgDAHIgLAZIgQAVIgIAIIgJAHIAIAtIALAAIALABIAKADIAHADQAMAJAFAMQAGAMAAAMQABAKgCAKQgDAKgFAIQgFAJgJAHQgIAHgMAFIAHA/QgBAKgCAEIgGAJIgIAIQgEADgHADQgGACgIABIgCAAIgLgBgAgTgeIgOAPQgHAHgFAHQgJAOgEAKQgFAKABANQACARAHAKQAJANAMAJQAMAIAQADQANAEATgEIgOhSQgJABgFADQgFACgFAGQgDAEgCAGIgBAJIACAJIAEAIIAGAHQADADADABIgCADQgGgDgGgFIgHgHIgIgMIgCgHIgBgIIABgLIAEgLIAHgKIAKgKIAJgFIAJgDIgHgqgAAUAYIANBQQAKgEAGgFQAFgFADgHQADgHAAgGIAAgMIgCgKQgCgHgEgFQgDgFgIgEQgHgDgLAAIgDAAgAASipQgHAJgEANQgEAOgCAOQgBANACARQAHgGAJgIQAHgIAIgKQAIgKADgIQAEgJgBgJIAAgGIgDgHIgEgFQgCgCgEAAQgKAAgGAIg");
	this.shape_155.setTransform(99.4999,560.5535,2.4309,2.431);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#231916").s().p("AgOAhIAIgHQAHgHACgGIAEgNIgBgCIgFABQgBABgGAAQgGAAgEgGQgDgFAAgGQAAgFAFgFQAHgGAHAAQAIAAAGAHQAGAIAAAMQgBAMgNAOQgMAOgGAAg");
	this.shape_156.setTransform(1196.5611,317.3983,2.4309,2.431);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#231916").s().p("AgOAhIAIgHQAGgGADgHIAEgNQAAAAAAgBQAAAAAAAAQgBAAAAgBQAAAAAAAAIgFABQgBABgGAAQgGAAgEgGQgDgFAAgGQAAgFAFgFQAHgGAHAAQAIAAAGAHQAGAIAAAMQAAALgOAPQgMAOgGAAg");
	this.shape_157.setTransform(681.8163,317.3983,2.4309,2.431);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#231916").s().p("AgHAIQgDgEAAgEQAAgEADgDQAEgDADAAQAEAAAEADQADADAAAEQAAAEgDAEQgEADgEAAQgDAAgEgDg");
	this.shape_158.setTransform(162.8781,362.0078,2.4309,2.431);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#231916").s().p("AghBrIAAiyIACgIQADgHADgEIAKgIQAHgEAGgCQAEgCAIAAQAHAAAFACQAFADADADQADAEAAAFQABAFgCAFQgBAEgFAHIgKAJQgHAEgGABQgFACgHAAQgGAAgGgCQgFgDgDgDIAACng");
	this.shape_159.setTransform(148.5705,381.0913,2.4309,2.431);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#231916").s().p("AgJA7IAAgGIAGgBIADgDQABgCAAgDIAAgQIgrAAIgFgFIAVgeIAKgWIAGgdIAoAAQgCAHgJAKIg2A+IAkAAIAAgdIAeggIAAA9IARAAIAAAHIgRAAIAAAPQgBAEACACIAEADIAFABIAAAGg");
	this.shape_160.setTransform(148.2927,340.6147,2.4309,2.431);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_161.setTransform(639.1538,382.7931,2.4309,2.431);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_162.setTransform(639.1538,368.8754,2.4309,2.431);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_163.setTransform(639.1538,354.897,2.4309,2.431);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_164.setTransform(639.1538,340.9186,2.4309,2.431);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_165.setTransform(639.1538,326.9401,2.4309,2.431);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_166.setTransform(1203.2461,354.8362,2.4309,2.431);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_167.setTransform(688.6228,354.8362,2.4309,2.431);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#231916").s().p("AgNDVQgIgCgIgEQgHgEgGgGQgGgHAAgJIABgLQAAgFAEgFQADgFAEgDQAFgDAHAAQADAAAFABIAIAFQAEACACAEQACAFAAAEQABAKgFAHQgGAIgPAEQADADAGADQAGADAKAAQAJAAAKgGQAKgHAEgIQADgGAAgKIgBgTIgGgnQgGABgIAAIgOAAQgGAAgGgCQgFAAgEgDQgSgIgLgKQgKgIgHgLQgFgJgDgNIgDgWQgBgNADgKQAEgNAEgJQAGgMAHgIQAHgKAHgGIAlggIAAgFIgCgKIgCgaIAAgQIADgTIAEgOQADgJAGgIQADgHAHgIQAGgGAFAAQADAAADADIAGAJIAKAZIAFAZQAAALgBAKQgBAKgDAGQgCAJgDAFIgGAMIgQAUQgEAGgEADIgJAHIAIAtIALAAIALABIAKADIAHADQAMAJAFAMQAGAMAAAMQABAKgCAJQgDALgFAIQgGAJgIAHQgIAHgMAFIAHA/QgBAKgCAEIgGAJIgIAIIgLAGQgGACgIABgAgFgpIgOALIgOAPQgHAHgFAHQgJAOgEAJQgFALABANQACAQAHALQAJAOAMAHQAKAIASAEQAQADAQgEIgOhRQgKABgEADQgFACgFAGQgDAEgCAGIgBAJIACAJIAEAIIAGAHQADADADABIgBABIgBABIAAABQgGgDgGgFIgHgHIgFgGIgDgGIgCgHIgBgJIABgKIAEgLIAHgKIAKgKIAJgFQAAgBABAAQAAAAAAAAQABgBABAAQAAAAABAAIAFgBIgHgqIgIAHgAAUAXIANBRQAKgEAGgFIAIgMQADgHAAgGIAAgMIgCgKQgCgHgEgFQgEgGgHgEQgHgDgLAAIgDAAgAASipQgHAIgEAOQgEAOgCAOQgBANACAQIAQgNQAHgIAIgKQAHgKAEgIQAEgKgBgIIAAgHIgDgGIgEgFIgGgCQgJAAgHAIg");
	this.shape_168.setTransform(99.4999,355.444,2.4309,2.431);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146}]}).to({state:[{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146}]},645).to({state:[{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146}]},653).to({state:[{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146}]},1103).wait(649));

	// mask_text (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_135 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_145 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_150 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_159 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_164 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_174 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_179 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_184 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_194 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_199 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_209 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_219 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_224 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_234 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_239 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_244 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_252 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_262 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_267 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_276 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_281 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_291 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_296 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_301 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_311 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_316 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_326 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_336 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_341 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_351 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_356 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_360 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_370 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_380 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_385 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_394 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_399 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_409 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_414 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_419 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_429 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_434 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_448 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_454 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_460 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_470 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_475 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_480 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_489 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_499 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_504 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_513 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_518 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_528 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_533 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_538 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_548 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_553 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_563 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_573 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_578 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_588 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_593 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_598 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_780 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_790 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_795 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_804 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_809 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_819 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_824 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_829 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_839 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_844 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_854 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_864 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_869 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_878 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_883 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_888 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_897 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_907 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_912 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_921 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_926 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_937 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_942 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_947 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_955 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_960 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_970 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_980 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_985 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_995 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1000 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1004 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1015 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1025 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1030 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1039 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1044 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1054 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1059 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1064 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1074 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1079 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1093 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1099 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1104 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_1114 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1119 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1124 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1134 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1144 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1149 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1158 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1163 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1173 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1178 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1183 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1192 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1197 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1207 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1217 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1222 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1232 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1237 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1242 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1421 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1431 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1436 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1445 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1450 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1460 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1465 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1470 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1480 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1484 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1495 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1505 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1510 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_1520 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1525 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1530 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1539 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1549 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1554 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1563 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1568 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1578 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1583 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1588 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1597 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1601 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1612 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1622 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1627 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_1637 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1641 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1645 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1656 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1667 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1672 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1681 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1686 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1696 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1701 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1706 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1715 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1720 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1730 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1740 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1745 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1754 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1759 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1764 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1774 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1784 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1789 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1798 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1803 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1813 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1818 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1823 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1833 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1838 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1848 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1858 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1863 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1872 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1877 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1882 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1892 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_1903 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1908 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1917 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_1922 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1932 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_1937 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1942 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1951 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1956 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1967 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1977 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_1982 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_1992 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_1997 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2002 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2011 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2021 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2026 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2035 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2040 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2050 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2055 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2060 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2070 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2074 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2084 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2094 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2099 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_2109 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2114 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2118 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2129 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2139 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2144 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2154 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2159 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2169 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2174 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2179 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2189 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2194 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2204 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2214 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2219 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2229 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2234 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2239 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2247 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2257 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2262 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2271 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2276 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2286 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2291 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2296 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2306 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2311 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2321 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2331 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2336 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2346 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2351 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2356 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2536 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2546 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2551 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2560 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2565 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2575 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2580 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2585 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2594 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2599 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2609 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2619 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2624 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_2634 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2639 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2644 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2653 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2663 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2668 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2677 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2682 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2692 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2697 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2702 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2712 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2717 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2727 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2737 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2742 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2752 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2757 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2761 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2771 = new cjs.Graphics().p("AiZDyIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2781 = new cjs.Graphics().p("AiZDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2786 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2796 = new cjs.Graphics().p("AiaDyIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2801 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2811 = new cjs.Graphics().p("AiaDyIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2816 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2821 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2830 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2835 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2849 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2855 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2860 = new cjs.Graphics().p("AiZDzIAAnlIEzAAIAAHlg");
	var mask_1_graphics_2870 = new cjs.Graphics().p("AiZDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2875 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2880 = new cjs.Graphics().p("AiaDzIAAnlIE0AAIAAHlg");
	var mask_1_graphics_2890 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2900 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2905 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2914 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2919 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2929 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2934 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2939 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2949 = new cjs.Graphics().p("AiZDzIAAnkIEzAAIAAHkg");
	var mask_1_graphics_2954 = new cjs.Graphics().p("AiaDzIAAnlIE1AAIAAHlg");
	var mask_1_graphics_2964 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2974 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2979 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2989 = new cjs.Graphics().p("AiZDzIAAnkIE0AAIAAHkg");
	var mask_1_graphics_2994 = new cjs.Graphics().p("AiaDzIAAnkIE1AAIAAHkg");
	var mask_1_graphics_2999 = new cjs.Graphics().p("AiaDzIAAnkIE0AAIAAHkg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(135).to({graphics:mask_1_graphics_135,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_145,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_150,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_159,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_164,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_174,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_179,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_184,x:611.425,y:440.275}).wait(10).to({graphics:mask_1_graphics_194,x:715.5,y:442.85}).wait(5).to({graphics:mask_1_graphics_199,x:758.825,y:442.85}).wait(10).to({graphics:mask_1_graphics_209,x:841.25,y:441.825}).wait(10).to({graphics:mask_1_graphics_219,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_224,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_234,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_239,x:1085.525,y:441.825}).wait(5).to({graphics:mask_1_graphics_244,x:1125.7,y:441.825}).wait(8).to({graphics:mask_1_graphics_252,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_262,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_267,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_276,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_281,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_291,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_296,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_301,x:591.85,y:652.45}).wait(10).to({graphics:mask_1_graphics_311,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_316,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_326,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_336,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_341,x:956.675,y:652.45}).wait(10).to({graphics:mask_1_graphics_351,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_356,x:1085.525,y:652.45}).wait(4).to({graphics:mask_1_graphics_360,x:1125.7,y:652.45}).wait(10).to({graphics:mask_1_graphics_370,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_380,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_385,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_394,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_399,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_409,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_414,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_419,x:611.425,y:440.275}).wait(10).to({graphics:mask_1_graphics_429,x:715.5,y:442.85}).wait(5).to({graphics:mask_1_graphics_434,x:758.825,y:442.85}).wait(14).to({graphics:mask_1_graphics_448,x:841.25,y:441.825}).wait(6).to({graphics:mask_1_graphics_454,x:920.6,y:441.825}).wait(6).to({graphics:mask_1_graphics_460,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_470,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_475,x:1085.525,y:441.825}).wait(5).to({graphics:mask_1_graphics_480,x:1125.7,y:441.825}).wait(9).to({graphics:mask_1_graphics_489,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_499,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_504,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_513,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_518,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_528,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_533,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_538,x:591.85,y:652.45}).wait(10).to({graphics:mask_1_graphics_548,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_553,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_563,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_573,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_578,x:956.675,y:652.45}).wait(10).to({graphics:mask_1_graphics_588,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_593,x:1085.525,y:652.45}).wait(5).to({graphics:mask_1_graphics_598,x:1125.7,y:652.45}).wait(14).to({graphics:null,x:0,y:0}).wait(168).to({graphics:mask_1_graphics_780,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_790,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_795,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_804,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_809,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_819,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_824,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_829,x:611.425,y:440.275}).wait(10).to({graphics:mask_1_graphics_839,x:715.5,y:442.85}).wait(5).to({graphics:mask_1_graphics_844,x:758.825,y:442.85}).wait(10).to({graphics:mask_1_graphics_854,x:841.25,y:441.825}).wait(10).to({graphics:mask_1_graphics_864,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_869,x:960.8,y:441.825}).wait(9).to({graphics:mask_1_graphics_878,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_883,x:1085.525,y:441.825}).wait(5).to({graphics:mask_1_graphics_888,x:1125.7,y:441.825}).wait(9).to({graphics:mask_1_graphics_897,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_907,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_912,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_921,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_926,x:417.25,y:652.45}).wait(11).to({graphics:mask_1_graphics_937,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_942,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_947,x:591.85,y:652.45}).wait(8).to({graphics:mask_1_graphics_955,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_960,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_970,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_980,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_985,x:956.675,y:652.45}).wait(10).to({graphics:mask_1_graphics_995,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_1000,x:1085.525,y:652.45}).wait(4).to({graphics:mask_1_graphics_1004,x:1125.7,y:652.45}).wait(11).to({graphics:mask_1_graphics_1015,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_1025,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_1030,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_1039,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_1044,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_1054,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_1059,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_1064,x:611.425,y:440.275}).wait(10).to({graphics:mask_1_graphics_1074,x:715.5,y:442.85}).wait(5).to({graphics:mask_1_graphics_1079,x:758.825,y:442.85}).wait(14).to({graphics:mask_1_graphics_1093,x:841.25,y:441.825}).wait(6).to({graphics:mask_1_graphics_1099,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_1104,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_1114,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_1119,x:1085.525,y:441.825}).wait(5).to({graphics:mask_1_graphics_1124,x:1125.7,y:441.825}).wait(10).to({graphics:mask_1_graphics_1134,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_1144,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_1149,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_1158,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_1163,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_1173,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_1178,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_1183,x:591.85,y:652.45}).wait(9).to({graphics:mask_1_graphics_1192,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_1197,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_1207,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_1217,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_1222,x:956.675,y:652.45}).wait(10).to({graphics:mask_1_graphics_1232,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_1237,x:1085.525,y:652.45}).wait(5).to({graphics:mask_1_graphics_1242,x:1125.7,y:652.45}).wait(14).to({graphics:null,x:0,y:0}).wait(165).to({graphics:mask_1_graphics_1421,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_1431,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_1436,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_1445,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_1450,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_1460,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_1465,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_1470,x:611.425,y:440.275}).wait(10).to({graphics:mask_1_graphics_1480,x:715.5,y:442.85}).wait(4).to({graphics:mask_1_graphics_1484,x:758.825,y:442.85}).wait(11).to({graphics:mask_1_graphics_1495,x:841.25,y:441.825}).wait(10).to({graphics:mask_1_graphics_1505,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_1510,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_1520,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_1525,x:1085.525,y:441.825}).wait(5).to({graphics:mask_1_graphics_1530,x:1125.7,y:441.825}).wait(9).to({graphics:mask_1_graphics_1539,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_1549,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_1554,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_1563,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_1568,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_1578,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_1583,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_1588,x:611.425,y:440.275}).wait(9).to({graphics:mask_1_graphics_1597,x:715.5,y:442.85}).wait(4).to({graphics:mask_1_graphics_1601,x:758.825,y:442.85}).wait(11).to({graphics:mask_1_graphics_1612,x:841.25,y:441.825}).wait(10).to({graphics:mask_1_graphics_1622,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_1627,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_1637,x:1044.3,y:441.825}).wait(4).to({graphics:mask_1_graphics_1641,x:1085.525,y:441.825}).wait(4).to({graphics:mask_1_graphics_1645,x:1125.7,y:441.825}).wait(11).to({graphics:mask_1_graphics_1656,x:159.35,y:652.45}).wait(11).to({graphics:mask_1_graphics_1667,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_1672,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_1681,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_1686,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_1696,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_1701,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_1706,x:591.85,y:652.45}).wait(9).to({graphics:mask_1_graphics_1715,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_1720,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_1730,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_1740,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_1745,x:956.675,y:652.45}).wait(9).to({graphics:mask_1_graphics_1754,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_1759,x:1085.525,y:652.45}).wait(5).to({graphics:mask_1_graphics_1764,x:1125.7,y:652.45}).wait(10).to({graphics:mask_1_graphics_1774,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_1784,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_1789,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_1798,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_1803,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_1813,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_1818,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_1823,x:591.85,y:652.45}).wait(10).to({graphics:mask_1_graphics_1833,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_1838,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_1848,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_1858,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_1863,x:956.675,y:652.45}).wait(9).to({graphics:mask_1_graphics_1872,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_1877,x:1085.525,y:652.45}).wait(5).to({graphics:mask_1_graphics_1882,x:1125.7,y:652.45}).wait(10).to({graphics:mask_1_graphics_1892,x:200.55,y:446.3}).wait(11).to({graphics:mask_1_graphics_1903,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_1908,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_1917,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_1922,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_1932,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_1937,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_1942,x:611.425,y:440.275}).wait(9).to({graphics:mask_1_graphics_1951,x:715.5,y:442.85}).wait(5).to({graphics:mask_1_graphics_1956,x:758.825,y:442.85}).wait(11).to({graphics:mask_1_graphics_1967,x:841.25,y:441.825}).wait(10).to({graphics:mask_1_graphics_1977,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_1982,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_1992,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_1997,x:1085.525,y:441.825}).wait(5).to({graphics:mask_1_graphics_2002,x:1125.7,y:441.825}).wait(9).to({graphics:mask_1_graphics_2011,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_2021,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_2026,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_2035,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_2040,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_2050,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_2055,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_2060,x:611.425,y:440.275}).wait(10).to({graphics:mask_1_graphics_2070,x:715.5,y:442.85}).wait(4).to({graphics:mask_1_graphics_2074,x:758.825,y:442.85}).wait(10).to({graphics:mask_1_graphics_2084,x:841.25,y:441.825}).wait(10).to({graphics:mask_1_graphics_2094,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_2099,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_2109,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_2114,x:1085.525,y:441.825}).wait(4).to({graphics:mask_1_graphics_2118,x:1125.7,y:441.825}).wait(11).to({graphics:mask_1_graphics_2129,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_2139,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_2144,x:287.1,y:652.45}).wait(10).to({graphics:mask_1_graphics_2154,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_2159,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_2169,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_2174,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_2179,x:591.85,y:652.45}).wait(10).to({graphics:mask_1_graphics_2189,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_2194,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_2204,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_2214,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_2219,x:956.675,y:652.45}).wait(10).to({graphics:mask_1_graphics_2229,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_2234,x:1085.525,y:652.45}).wait(5).to({graphics:mask_1_graphics_2239,x:1125.7,y:652.45}).wait(8).to({graphics:mask_1_graphics_2247,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_2257,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_2262,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_2271,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_2276,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_2286,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_2291,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_2296,x:591.85,y:652.45}).wait(10).to({graphics:mask_1_graphics_2306,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_2311,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_2321,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_2331,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_2336,x:956.675,y:652.45}).wait(10).to({graphics:mask_1_graphics_2346,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_2351,x:1085.525,y:652.45}).wait(5).to({graphics:mask_1_graphics_2356,x:1125.7,y:652.45}).wait(13).to({graphics:null,x:0,y:0}).wait(167).to({graphics:mask_1_graphics_2536,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_2546,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_2551,x:325.25,y:446.3}).wait(9).to({graphics:mask_1_graphics_2560,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_2565,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_2575,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_2580,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_2585,x:611.425,y:440.275}).wait(9).to({graphics:mask_1_graphics_2594,x:715.5,y:442.85}).wait(5).to({graphics:mask_1_graphics_2599,x:758.825,y:442.85}).wait(10).to({graphics:mask_1_graphics_2609,x:841.25,y:441.825}).wait(10).to({graphics:mask_1_graphics_2619,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_2624,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_2634,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_2639,x:1085.525,y:441.825}).wait(5).to({graphics:mask_1_graphics_2644,x:1125.7,y:441.825}).wait(9).to({graphics:mask_1_graphics_2653,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_2663,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_2668,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_2677,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_2682,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_2692,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_2697,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_2702,x:591.85,y:652.45}).wait(10).to({graphics:mask_1_graphics_2712,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_2717,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_2727,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_2737,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_2742,x:956.675,y:652.45}).wait(10).to({graphics:mask_1_graphics_2752,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_2757,x:1085.525,y:652.45}).wait(4).to({graphics:mask_1_graphics_2761,x:1125.7,y:652.45}).wait(10).to({graphics:mask_1_graphics_2771,x:200.55,y:446.3}).wait(10).to({graphics:mask_1_graphics_2781,x:285.05,y:446.3}).wait(5).to({graphics:mask_1_graphics_2786,x:325.25,y:446.3}).wait(10).to({graphics:mask_1_graphics_2796,x:408.75,y:446.3}).wait(5).to({graphics:mask_1_graphics_2801,x:446.875,y:446.3}).wait(10).to({graphics:mask_1_graphics_2811,x:531.35,y:446.3}).wait(5).to({graphics:mask_1_graphics_2816,x:572.275,y:440.275}).wait(5).to({graphics:mask_1_graphics_2821,x:611.425,y:440.275}).wait(9).to({graphics:mask_1_graphics_2830,x:715.5,y:442.85}).wait(5).to({graphics:mask_1_graphics_2835,x:758.825,y:442.85}).wait(14).to({graphics:mask_1_graphics_2849,x:841.25,y:441.825}).wait(6).to({graphics:mask_1_graphics_2855,x:920.6,y:441.825}).wait(5).to({graphics:mask_1_graphics_2860,x:960.8,y:441.825}).wait(10).to({graphics:mask_1_graphics_2870,x:1044.3,y:441.825}).wait(5).to({graphics:mask_1_graphics_2875,x:1085.525,y:441.825}).wait(5).to({graphics:mask_1_graphics_2880,x:1125.7,y:441.825}).wait(10).to({graphics:mask_1_graphics_2890,x:159.35,y:652.45}).wait(10).to({graphics:mask_1_graphics_2900,x:244.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_2905,x:287.1,y:652.45}).wait(9).to({graphics:mask_1_graphics_2914,x:372.7,y:652.45}).wait(5).to({graphics:mask_1_graphics_2919,x:417.25,y:652.45}).wait(10).to({graphics:mask_1_graphics_2929,x:502.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_2934,x:547.5,y:652.45}).wait(5).to({graphics:mask_1_graphics_2939,x:591.85,y:652.45}).wait(10).to({graphics:mask_1_graphics_2949,x:693.85,y:652.45}).wait(5).to({graphics:mask_1_graphics_2954,x:736.775,y:649.775}).wait(10).to({graphics:mask_1_graphics_2964,x:824.775,y:652.45}).wait(10).to({graphics:mask_1_graphics_2974,x:911.325,y:652.45}).wait(5).to({graphics:mask_1_graphics_2979,x:956.675,y:652.45}).wait(10).to({graphics:mask_1_graphics_2989,x:1044.3,y:652.45}).wait(5).to({graphics:mask_1_graphics_2994,x:1085.525,y:652.45}).wait(5).to({graphics:mask_1_graphics_2999,x:1125.7,y:652.45}).wait(14).to({graphics:null,x:0,y:0}).wait(37));

	// text_red
	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#ED1C24").s().p("AgtAfQgBAAgBgBQAAAAgBAAQAAgBAAAAQAAAAABAAQABgBAFAAIAIAAIAZABIAAgdQAAAAAAAAQAAgBAAAAQAAgBgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBgBgBAAQAAAAgBAAQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAABAAIAIABQABAAABAAQAAAAABABQAAAAAAAAQAAABAAAAIgBADIAAAdIAZgBQAHgDAIABQAKAAAAADQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgIAAIg5ABIgIACIgCAAQgEAAgLgEgAAUAQQAAgBAAAAQAAAAgBgBQAAAAAAgBQAAgBAAAAIADgMIADgdIgjABIgJACQgEACgKgFIgCgCQAAgBAGAAQAFABAYAAQAUgBADgBIAFgBIAEAAQABABABAAQABAAAAABQABAAAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAAAQgBABAAAAIgFAcIgEALQAAABgBABQAAAAAAABQgBAAAAABQAAAAgBAAIgBAAg");
	this.shape_169.setTransform(1127.8474,650.3422,2.4309,2.431);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#ED1C24").s().p("AgUAvQgEgCAAgEIAAgIQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgDgBIgDgCQAAAAAAAAQAAAAABAAQAAgBABAAQABAAABAAIAFAAIAGABIAlAAIAAgNIgdAAIgKACQgDABgIgEIgBgCIAFAAIAGAAIAWAAQAPAAACgBIADgBIAFAAQABABAAAAQABABAAAAQAAAAAAAAQAAABAAAAIgCADIgCAMIACAAQABAAAAAAQAAAAAAAAQAAABABAAQAAAAAAABIgBABIgEABIgqAAIAAAJQAAABAAAAQAAABABAAQAAAAAAABQAAAAABAAIADABIAbgBIAEgBIAFgBIAHAAQAFACgBABQAAACgFABIgrAAgAgugCQgCAAAAAAQgBgBAAAAQgBAAAAAAQABgBAAAAIAGAAIAJAAIAhABIAAgOIgOAAQgEAAgDgCQgEAAAAgFIAAgNQAAAAAAgBQgBgBAAAAQAAgBAAAAQAAgBgBAAIgFgBIgDgCQAAAAAAgBQAAAAABAAQABAAABgBQAAAAACAAIAJAAQABABABAAQAAAAABAAQAAAAAAABQAAAAAAAAIAAAFIAAAPIABADIADAAIAZAAIAEAAIAEgBQACgCADAAIAHABQAFAAgBADQAAADgFAAIgYAAIAAAOIAOAAIAHgBQAGgCAKAAQAJABAAACQAAABgBABQAAAAAAAAQgBABgBAAQAAAAgBAAIhFAAIgIABIgCAAQgFAAgJgDg");
	this.shape_170.setTransform(1084.7596,650.9886,2.4309,2.431);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#ED1C24").s().p("AAgAtIgBhTQAAgEgCgCIgGgDIgCgCQABgBAEAAIAFABIAFACQABAAABAAQAAABABAAQAAAAAAABQAAAAAAABIgBAGIgBBSQgBAHgCAAQgCAAAAgGgAggAGQgGgGAAgHQAAgIAEgEQAEgFAIgDIADAAIABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgCgCQABgCAEAAQAFAAABACIABACIgBACIABABIAEABQAGACAEAFQAEAFAAAHQAAAHgHAGQgGAHgLAAQgLAAgHgHgAgagTQgFAFAAAHQAAAHAFAEQAFAEAHAAQAIAAAEgEQAEgEAAgHQAAgHgEgFQgEgFgIAAQgHAAgFAFg");
	this.shape_171.setTransform(1041.0524,651.0494,2.4309,2.431);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#ED1C24").s().p("AgSAwQgEgCAAgFIAAgUQAAgEgDgBIgFgBIgCgCIAFgBIAMABIAXAAIAFgBIAFgBIAGAAQAFACAAACQgBACgEAAIgnAAIAAANIAWgBIAEgBIAGgBIAGAAQAGACgBABQgBACgFAAIglABIAAAJQAAABAAAAQAAABAAAAQAAAAABAAQAAABAAAAIAEABIARAAIAEgBIAEgBIAGgBIAGAAQAFACAAACQgBACgFAAIgkAAIgIgBgAgwALQAJgFAMgJQAOgNAHgQIgUABIgCABIgFABQgCAAgHgDQgBAAgBAAQAAgBAAAAQgBAAAAgBQAAAAABAAIAFgBIAEABIATAAIAJgCQAAAAABAAQAAAAABgBQAAAAABAAQABAAABAAIADABQAEABgCACIgDAFQgJAQgMAKQgLAJgKAEIgGACQgBgBAAAAQAAAAAAAAQAAAAAAAAQABgBAAAAgAAVADIgBgnQAAgEgCgCIgGgDQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQABAAABAAIAFABIAGACQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABIgBAGIAAAUIAFgBQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAIAEgBIAFAAQAGABgBACQgBADgEAAIgSAAIAAAFIgBAKQgBAGgCAAQAAAAgBgBQAAAAAAAAQgBgBAAgBQAAgBAAgBg");
	this.shape_172.setTransform(956.1456,650.5632,2.4309,2.431);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#ED1C24").s().p("AAhAtIgBhTQAAgEgCgCIgGgDQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABAAABAAIAFABIAGACQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAGIAABAIgBASQAAAHgDAAQgCAAAAgGgAgnAWIAAgCQAJgEANgPQAOgOAGgQIgQABIgDAAIgCABIgFABQgDAAgGgDQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIAFAAIAKABIANgBQAHAAABgBIAFgBIAEABQABAAABAAQABABAAAAQAAABAAAAQAAABgBAAIgQAZIALAJIADABIADABIAEAFIADAEQAAABAAABQABABgBAAQAAABAAAAQgBAAgBAAQgCABgEgEIgSgSQgJAIgHAGIgMAIIgGACIAAAAg");
	this.shape_173.setTransform(910.3926,651.0494,2.4309,2.431);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#ED1C24").s().p("AgVAtQgDgBAAgGIAAgJQAAAAAAgBQAAgBgBAAQAAgBAAAAQAAgBgBAAQgBgCgEAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAgBgBIAFgBIAEAAIAFAAQABAAABAAQAAABABAAQAAAAABABQAAAAAAAAIgBAFIAAALQAAABAAABQAAAAAAABQAAAAABAAQAAAAAAABIADABIAdgBIAEgCQACgBAEAAIAGAAQAGABgBADQgBACgFABIgsAAgAguAHQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABgBIAOAAIAMAAIALABIAegBIAIAAQAGgCAJAAQAKABAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIhNABIgCABQgFAAgJgEgAgWgKQgEgCAAgFIAAgSQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgCgCgEgBIgCgBQAAAAAAgBQABAAAAAAQABAAABAAQABgBABAAIAFAAIAHACIAYAAIAIgCIAGgBIAGABQAFABAAACQgBADgFAAIgsAAIAAAWIACACIADABIAVAAIAIgCQACgBAEAAIAGAAQAFACgBACQgBACgEABIgpAAg");
	this.shape_174.setTransform(823.0434,651.1102,2.4309,2.431);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#ED1C24").s().p("AAkAtIgBhUQAAgDgBgCIgHgDQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABAAIAFABIAGACQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABIgBAGIgBBSQgBAHgDAAQgCAAABgGgAARApIgBgtIAAAAIgEAAIgEACQgCAAgHgDQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAgBAEABIAPgBIAAgaQAAgEgBgCIgHgDIgBgCQAAAAAAAAQAAAAABgBQAAAAABAAQABAAABAAIAKADQABAAABABQAAAAAAAAQABABAAAAQAAABAAAAIgBAGIAAA4IgBASQgBAHgDAAQgBAAAAgGgAgpAWQAAAAgBgBQAAAAAAAAQAAAAAAAAQABAAAAgBQAKgHAJgMQAKgMAGgRIgOACIgCAAIgFABQgCAAgHgDQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABAAIAEABIAQAAIAGgCIAGAAIACAAQABABABAAQAAAAAAABQAAAAAAAAQAAABAAAAIgNAYIAIAIIAFADIAEAFIABAFQABABAAABQgBAAAAABQAAAAAAABQgBAAAAAAQgDAAgEgFIgMgRQgJAJgEAEIgLAJIgEACIgBAAg");
	this.shape_175.setTransform(736.0863,651.0494,2.4309,2.431);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#ED1C24").s().p("AgEAxIgIgBQgDgCAAgFIAAgLQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAgBgBAAIgFgCIgDgCIAEgBIAKABQABAAABAAQABAAAAAAQABAAAAABQAAAAgBAAIAAAFIAAAOIABAEIADAAIAVAAIAEAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFABAAADQgBACgFABgAAaAbIgBgnIgBAAIgBAAIgKACQgBABgIgDIgBAHQgCAEgCABQgDADgEABQgEACgGAAQgLABgHgHQgFgFAAgHQAAgGAEgGQAEgEAIgDIACAAQABAAAAgBQABAAAAAAQAAgBAAAAQgBAAAAAAIgCgCQAAgCAFAAQAEAAACACIAAACIAAACIABAAQAGACAFAEQAEAEABAGIABABIAUgBIAAgUQAAgEgCgCIgGgDQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQABgBABAAIAFABIAGADQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAABIgBAGIAAAxIgBALQgBAGgCAAQAAAAAAAAQgBgBAAAAQAAgBAAgBQgBAAAAgBgAgdgXQgFAFAAAGQAAAGAFAEQAEAFAHAAQAHAAAEgFQAFgEAAgGQAAgGgFgFQgEgFgHAAQgHAAgEAFg");
	this.shape_176.setTransform(694.0371,650.3808,2.4309,2.431);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAIAGgBIAIAAIAMABIAYAAIAXgCQAHgBAIAAQAKAAAAADQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgrAAIAAAjQgCAIgBAAQgCAAAAgHgAgWgJIgBgEIgCgaQAAgBgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAIgEgCQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABgBAEAAIAHAAIAFABIARAAIASgBIAFgBIAFAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAABIgtABIgBADIgDABgAgRgQIAkAAIABgaIgmAAg");
	this.shape_177.setTransform(589.7977,651.6976,2.4309,2.431);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#ED1C24").s().p("AgPArQgGgGAAgHQAAgHAFgEQAEgFAJgBIABgBIAAgBIgBgBIgBgBQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABAAQAFAAABACIAAABIAAACIAAAAIAAABQAJABAEAFQAEAFAAAGQAAAHgGAGQgHAFgJAAQgJAAgHgFgAgJAUQgEAEAAAGQAAAFAEAFQAEAEAGAAQAGAAAFgEQAEgEAAgGQAAgGgEgEQgEgEgHAAQgGAAgEAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAQABgBAFAAIAJAAIALABIAVAAIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCIgCgBQAAgBAAAAQAAAAABgBQABAAAAAAQABAAACAAIAFAAIAHACIAYAAIAEgBQABAAAAAAQABAAAAAAQABAAABgBQAAAAABAAIAFgBIAGAAQAFABAAADQgBACgEAAIgtAAIAAATIACADIADABIAVgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAGABgBACQgBADgFAAIgWAAIAAAOIAOAAIAIgBQAHgCAJAAQAJAAAAAEQAAAAgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIhFAAIgIACIgDAAQgFAAgIgEg");
	this.shape_178.setTransform(546.2081,651.414,2.4309,2.431);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#ED1C24").s().p("AAkAtIAAgtIgMAAIAAAWIgBASQgBAHgCAAQgCAAAAgGIgBhLQAAgEgCgCIgFgDIgCgCQAAAAAAAAQABAAAAgBQABAAAAAAQABAAABAAIAKADQABAAABABQAAAAAAAAQAAABABAAQAAABgBAAIgBAGIABAeIAMAAIgBgjQAAgDgBgCIgGgDQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABAAABAAIAEABIAGACQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAGIAABAIgBASQAAAHgDAAQgCAAAAgGgAgUAYQAFgEAIgPQAIgNACgSIgEABIgDAAIgCABIgDAAIgBABIAAACQgEANgIALQgKAMgEAEQgEADgCAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAFgEAJgOQAIgNADgPIgGABIgEAAIgDACQgDAAgFgDIgCgCQAAAAAAAAQABgBAAAAQABAAAAAAQABABABAAIAJAAIAFAAIAEgBQABAAAAgBQABAAABAAQAAAAABAAQAAAAABAAIADAAIABABIABABIADAAIALgCIAEAAQABABAAAAQAAAAAAABQABAAgBABQAAAAAAABIgDAFQgDAOgHAMQgIANgGAFQgEAEgCAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQABAAAAgBg");
	this.shape_179.setTransform(501.8813,651.0494,2.4309,2.431);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#ED1C24").s().p("AAgAtIgBg0IgCAAIgKACIgJgCQAAAHgHAGQgFAHgMAAQgLAAgHgHQgGgGAAgHQAAgHAEgGQAEgEAJgDIACAAIABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgCgCQABgCAFAAQAEABABABIABACIgBACIABABIAEABQAFACAEAEQAEAEAAAFIACABIAUgBIAAgbQAAgEgCgCIgGgDIgCgCQABgBAEAAIAEABIAGACQABAAABAAQAAABABAAQAAAAAAABQAAAAAAABIgBAGIgBBSQgBAHgCAAQgCAAAAgGgAgagTQgFAFAAAHQAAAHAFAEQAFAEAHAAQAIAAAEgEQAEgEAAgHQAAgGgDgGQgFgFgIAAQgHAAgFAFg");
	this.shape_180.setTransform(415.8228,651.0494,2.4309,2.431);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAIAGgBIAIAAIAMABIAYAAIAXgCQAHgBAIAAQAKAAAAADQAAABAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIgqAAIgBAjQgCAIgBAAQgCAAAAgHgAgWgJIgBgEIgCgaQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAIgFgCQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABgBAEAAIAHAAIAFABIARAAIASgBIAFgBIAFAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAABIgtABIgBADIgCABgAgRgQIAkAAIABgaIgmAAg");
	this.shape_181.setTransform(372.8392,651.6976,2.4309,2.431);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#ED1C24").s().p("AgPArQgGgGAAgHQAAgHAFgEQAEgFAJgBIABgBIAAgBIgBgBIgBgBQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABAAQAEAAACACIAAABIAAACIAAAAIAAABQAJABAEAFQAEAEAAAHQAAAHgGAGQgHAFgKAAQgIAAgHgFgAgKAUQgDAEAAAGQAAAGAEAEQAEAEAFAAQAHAAAFgEQAEgEAAgGQAAgGgEgEQgEgEgIAAQgFAAgFAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAQABgBAFAAIAIAAIAMABIAIAAIANAAIAAgOIgNAAQgEAAgDgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCIgCgBQAAgCAFAAIAFAAIAHACIAYAAIAEgBQABAAAAAAQABAAAAAAQABAAABgBQAAAAABAAIAFgBIAGAAQAGABgBADQgBACgEAAIgtAAIAAATIACADIACABIAWgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAGABgBACQgBADgFAAIgWAAIAAAOIAWgBQAIgCAIAAQAJAAAAAEQAAAAgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIg+AAIgPACIgDAAQgEAAgJgEg");
	this.shape_182.setTransform(286.8302,651.414,2.4309,2.431);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#ED1C24").s().p("AgBAqIgBgkIgSABIgJACQgEABgMgFQgCAAAAgBQgBAAAAAAQgBgBAAAAQABAAAAAAIAGgBIAJAAIALABIAYAAIAXgCQAHgBAJAAQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIgqAAIgBAjQgBAIgCAAQgBAAAAgHgAgWgJIgBgEIgCgaQAAgBgBgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgFgCQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAFAAIAGAAIAFABIARAAIATgBIAEgBIAFAAQABABABAAQAAABAAAAQABAAgBABQAAAAAAAAIgCAEIgEAXIADAAQAAAAAAAAQABAAAAAAQAAABAAAAQABAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBAAAAABIgtABIgBADIgCABgAgQgQIAkAAIABgaIgmAAg");
	this.shape_183.setTransform(243.6949,651.6976,2.4309,2.431);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#ED1C24").s().p("AgPArQgGgGAAgHQAAgHAEgEQAGgFAIgBIAAgBIABgBIgBgBIgBgBQAAgCAEAAQAEAAABACIABABIgBACIAAAAIABABQAIABAFAFQAEAEAAAHQAAAHgGAGQgHAFgKAAQgIAAgHgFgAgKAUQgEAFAAAFQAAAFAEAFQAFAEAFAAQAHAAAEgEQAEgEAAgGQAAgGgDgEQgFgEgHAAQgGAAgEAEgAgvAAQgBAAAAAAQgBAAAAAAQgBAAABAAQAAgBAAAAQABgBAFAAIAIAAIAMABIAIAAIANAAIAAgOIgNAAIgIgBQgDgCAAgFIAAgOQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAIgFgCIgCgBQAAgBAAAAQAAAAABgBQAAAAABAAQABAAABAAIAGAAIAHACIAYAAIAEgBQABAAAAAAQABAAABAAQAAAAABgBQAAAAAAAAIAGgBIAGAAQAGABgBADQgBACgFAAIgsAAIAAATIABADIADABIAWgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAFABgBACQgBADgEAAIgXAAIAAAOIAPAAIAIgBQAHgCAIAAQAKAAgBAEQAAAAAAAAQAAABgBAAQAAAAgBABQgBAAgBAAIg9AAIgPACIgCAAQgFAAgKgEg");
	this.shape_184.setTransform(158.2815,651.414,2.4309,2.431);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#ED1C24").s().p("AgEAFQgDgCAAgDQAAgCADgCQACgDACAAQADAAACADQADACAAACQAAADgDACQgCADgDAAQgCAAgCgDg");
	this.shape_185.setTransform(162.5743,459.1541,2.4309,2.431);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#ED1C24").s().p("AgSArQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQALAAACgBQACgCAAgFIAAgwIgBgHQgBgCgFAAIgIAAQAAAAgBAAQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAAAgBQAJAAAEgCQAFgCAAgGQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABIAABHQAAAGACABQACABAKAAQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBAAgBAAg");
	this.shape_186.setTransform(150.5413,446.5735,2.4309,2.431);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#ED1C24").s().p("AgsAgQgBgBgBAAQgBgBAAAAQgBgBAAAAQAAAAABAAIAGgBIAIABIAMAAQABABAEgBIAIAAIAAgcQAAgBAAAAQAAAAAAgBQAAAAgBgBQAAAAAAAAIgFgCQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAAAIAFgBIAEAAIAEABQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABIgBACIAAAdIAQAAIAJgBQAGgCAKAAQAJABAAADQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAIhJADIgDAAQgEAAgJgDgAAUAQQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBIAEgZIABgQIgjACIgJABQgEACgKgFQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAAAQgBgCAHABQAKABATAAQATAAAEgBIAFgCIAEABQABAAABAAQABAAAAABQAAAAAAAAQAAABAAAAIgCAFIgFAbIgEALQgCAEgCAAIAAAAg");
	this.shape_187.setTransform(1126.7089,445.0997,2.4309,2.431);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#ED1C24").s().p("AAUAtIgBhUQAAgDgBgCIgHgDQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgBAEAAIALACQAAABABAAQAAAAABABQAAAAAAABQAAAAAAAAIgBAGIAAAlIAFgBQABAAAAAAQABgBAAAAQABAAAAAAQABgBAAAAIAEgBIAGAAQAEACAAACQAAACgFAAIgSAAIAAAsQgCAHgCAAQgCAAAAgGgAgvAbQgBAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAQAJgFAMgPQAMgMAJgUIgUAAIgEABIgBAAIgFABIgJgDQgBAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIAFgBIAKABIAPAAIAKgBIAFgBIADAAQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAIgEAFQgHAQgNAOQgMANgJAFIgGACIAAAAg");
	this.shape_188.setTransform(1085.512,445.905,2.4309,2.431);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#ED1C24").s().p("AAgAtIgBhUQAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAABAAQABAAABAAIALACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAIgBAGIAABBIgBASQAAAHgDAAQgBAAgBgGgAggAGQgGgGAAgHQAAgHAEgGQAFgFAIgCIADgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgDAFABQAFABABABIAAACIgBACIABABIAEABQAGACAEAFQAEAEAAAIQAAAHgHAGQgFAHgMAAQgMAAgGgHgAgagTQgFAEAAAIQAAAHAFADQAFAFAHAAQAIAAAFgEQADgEAAgHQAAgHgDgFQgFgFgIAAQgHAAgFAFg");
	this.shape_189.setTransform(1042.7758,445.905,2.4309,2.431);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#ED1C24").s().p("AgSAwQgEgCAAgFIAAgUQAAgEgDgBIgEgBIgCgCIAEgBIAHAAIAGABIAXAAIAEgBIAFgBIAHAAQAFABgBACQAAACgFAAIgnABIAAAMIAWAAIAKgCIAGAAQAGABgBACQgBACgFAAIglABIAAAJQAAAAAAABQAAAAABABQAAAAAAAAQAAABABAAIADABIAVgBIAKgCIAGAAQAGABgBACQgBADgEAAIglAAIgIgBgAgwAMQgBAAAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAJgEANgLQANgLAHgRIgJAAIgLABIgCABIgFABQgDAAgGgDIgCgCQABgBAAAAQAAAAABAAQAAAAABAAQABAAABAAIAEABIATgBQAHAAACgBIAFgBIADABQABAAABAAQABABAAAAQAAABAAAAQAAABgBAAIgDAFQgIAQgNAKQgMAJgJAEIgFABIgBAAgAAVADIgBgoQAAgDgBgCIgHgDQAAAAgBgBQAAAAAAAAQAAAAgBgBQAAAAAAAAQABgBAEAAIALACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAIgBAGIABAVIAEgBIAEgCIAEAAIAGAAQAEABAAACQAAADgFAAIgRAAIAAAFQAAAGgCAEQAAAFgDAAIAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQgBgBAAgBg");
	this.shape_190.setTransform(963.0611,445.4188,2.4309,2.431);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#ED1C24").s().p("AAiAtIgBhUQAAgDgCgCIgGgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAFAAIAKACQABABABAAQAAAAABABQAAAAAAABQAAAAAAAAIgBAGIgBBTQgBAHgCAAQgCAAAAgGgAgmAWQgEAAAEgCQAJgEANgPQANgNAHgRIgJAAIgKABIgCAAIgFACIgJgDQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQACgBADABIAEAAIATAAIAIgBQACgBADAAIAEABQABAAABAAQAAABAAAAQAAAAAAABQAAAAAAABIgQAZIAKAIIADABIADACQADABACAEIACAEQABABAAABQAAABAAAAQAAABgBAAQAAAAgBAAQgDABgEgFIgSgRQgIAIgIAGIgLAIIgFACIgBAAg");
	this.shape_191.setTransform(920.129,445.905,2.4309,2.431);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#ED1C24").s().p("AgUAtQgEgCAAgFIAAgJQAAgBAAAAQAAgBAAgBQgBAAAAgBQAAAAAAgBIgGgBIgCgCQgBAAAAAAQABAAAAAAQABgBAAAAQABAAACAAIAJAAQABAAABAAQAAAAABABQAAAAAAAAQABABAAAAIgBAFIAAAMQAAAAAAAAQAAABAAAAQABAAAAABQAAAAABAAIADABIAYAAIAEgBQABAAAAAAQABAAABAAQAAAAABAAQAAgBABAAIAFgBIAHAAQAFACgBACQgBADgEAAIgtAAgAguAHQgCAAAAgBQgBAAAAAAQgBgBAAAAQABAAAAgBIAGgBIA9ABIAIAAQAGgCAKAAQAKAAgBAEQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIhEAAQgFAAgEACIgBAAQgEAAgLgEgAgOgKIgIgBQgDgBAAgFIAAgSQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgBAAAAIgFgCQgBAAAAAAQgBAAAAAAQAAgBAAAAQgBAAAAAAQAAgBAFgBIAGABIAHABIAYAAIADAAQABAAAAgBQABAAABAAQAAAAABAAQAAgBABAAIAFgBIAHABQAEABAAACQgBADgEgBIgsAAIAAAWQAAABAAAAQAAABAAAAQAAAAAAABQABAAAAAAIADABIAVAAIAEgBQABAAAAAAQABAAAAAAQABAAAAAAQABgBABAAIAFgBIAGAAQAFABAAADQgBACgFAAg");
	this.shape_192.setTransform(839.8831,445.9658,2.4309,2.431);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#ED1C24").s().p("AAgAtIgBgnQgJAEgRAFQgQAEgIAAQgFAAgBgCQgCgBAAgFIAAggQAAgBAAAAQAAgBgBgBQAAAAAAgBQgBAAAAAAIgGgCIgDgBQAAgBAAAAQAAAAABAAQAAgBABAAQABAAACAAIAFAAIAIABIAIAAQAGABACgCQACgCAEAAIAIABQABAAABAAQABABAAAAQABAAAAABQAAAAAAABQAAABgGABIgdABIAAAiIACADIADABQAIAAAOgDQAOgDALgEIAAgqQAAgDgCgCIgGgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAFAAIAKACQABABABAAQAAAAABABQAAAAAAABQAAAAgBAAIAAAGIgBBTQgBAHgCAAQgCAAAAgGg");
	this.shape_193.setTransform(756.6457,445.905,2.4309,2.431);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#ED1C24").s().p("AAgAtIgBg1IgBABIgBAAIgKACQgEAAgFgDQAAAIgGAGQgGAHgMAAQgMAAgGgHQgGgHAAgGQAAgHAEgGQAFgFAIgCIACAAIABgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgDAFABQAFABABABIAAACIgBACIABABIAEABQAGACADAEQAEADABAGIABAAIACABIASgBIAAgcQAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAABAAQABAAABAAIALACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAIgBAGIAABBIgBASQAAAHgDAAQgBAAgBgGgAgagTQgFAFAAAHQAAAGAFAEQAFAFAHAAQAIAAAFgEQADgEAAgHQAAgHgDgFQgFgFgIAAQgHAAgFAFg");
	this.shape_194.setTransform(715.3324,445.905,2.4309,2.431);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgDABgNgFQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAQABgBAFAAIAJAAIAjAAQATAAAEgBQAHgBAJAAQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgqgBIAAASIgBASQgBAHgCABQgBAAgBgHgAgWgJIgBgFIgCgZIgCgEIgFgBQgBAAAAAAQAAAAAAgBQgBAAABAAQAAAAAAgBIAFgBIAHABIAFABIARgBIASAAIAFgCIAFABQABABAAAAQABAAAAABQABAAgBABQAAAAAAAAIgDAEIgDAXIACAAQABAAAAAAQABAAAAABQAAAAABAAQAAAAAAABQAAAAAAAAQgBABAAAAQAAAAAAAAQAAAAgBAAIgDABIgqAAQAAABAAABQAAAAAAABQAAAAgBAAQAAABAAAAIgCABIgCgBgAgRgQIAkgBIACgZIgnAAg");
	this.shape_195.setTransform(613.0418,446.5128,2.4309,2.431);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#ED1C24").s().p("AgPAqQgGgFAAgHQAAgGAFgFQAEgFAJgCIABAAIAAgBIgBgBIgBgBQAAgBABAAQAAAAAAgBQABAAABAAQABAAAAAAIAGACIAAACIAAABIAAAAIAAABQAJACAEAEQAEAFAAAGQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgDAEAAAGQAAAGAEADQAEAFAFAAQAHAAAFgEQAEgFAAgFQAAgFgEgFQgEgFgIAAQgGAAgEAFgAguABQgBgBgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAFgBIAFABIAHABIAcAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAASQAAABAAABQAAAAABAAQAAABAAAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAAAQABABAAAAIAWAAIAEgBQABAAAAAAQABAAABAAQAAgBAAAAQABAAAAgBIAGgBIAGAAQAFACAAADQgBACgFAAIgWAAIAAAOIAOAAIAIgBQAGgCAJAAQAKABAAADQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIgJAAIg1AAIgHAAIgIACIgCAAQgEAAgKgDg");
	this.shape_196.setTransform(571.2013,446.2089,2.4309,2.431);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#ED1C24").s().p("AAkAtIAAgtIgMAAIgBAoQAAAHgDAAQgCAAAAgGIgBhLQAAgEgBgCIgGgDQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAAAIAFgBIAKADQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIgBAGIAAAeIAMAAIAAgjQAAgEgCgBIgFgDIgDgCQABgBAEAAIAKACQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgBAGIAABTQgBAHgCAAQgCAAgBgGgAgUAYQAGgFAIgOQAIgPACgQIgFABIgCAAIgDABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgCADQgEAOgIAJQgIAMgGAFQgEAEgBgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQABgBAAAAQAGgGAIgMQAIgMADgQIgJABIgEABIgIgCIgCgCIAEgBIAEABIAKAAIAFgCIAEAAIADAAIACABIAAABIADAAIAHgCQABAAAAAAQABAAAAAAQABAAABAAQAAAAABAAIADAAQABAAAAABQAAAAABAAQAAABAAAAQAAABgBABIgCAFQgEAOgHAMQgHANgHAFQgEAEgBAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAgBg");
	this.shape_197.setTransform(529.7565,445.905,2.4309,2.431);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#ED1C24").s().p("AAgAtIgBg1IgBABIgBAAIgKACQgEAAgFgDQAAAIgGAGQgGAHgMAAQgMAAgGgHQgGgGAAgHQAAgHAEgGQAFgFAIgCIADgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgDAFABQAFABABABIAAACIgBACIABABIAEABQAFACAEAEQADADACAGIABAAIACABIASgBIAAgcQAAgDgCgCIgGgDQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAFAAIALACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAIgBAGIgBBTQAAAGgDABQgBAAgBgGgAgagTQgFAEAAAIQAAAHAFADQAFAFAHAAQAIAAAFgEQADgEAAgHQAAgHgDgFQgFgFgIAAQgHAAgFAFg");
	this.shape_198.setTransform(447.811,445.905,2.4309,2.431);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#ED1C24").s().p("AgBAqIgBgkIgSABIgJACQgDABgNgFQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAQABgBAFAAIAJAAIAjAAQAUAAADgBQAHgBAJAAQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgqgBIAAASQAAALgBAHQgBAHgCABQgBAAAAgHgAgWgJQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAgBAAgBIgCgZQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgFgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAGgBIALACIAkgBIAEgCIAFABQABABABAAQAAAAAAABQABAAgBABQAAAAAAAAIgDAEIgDAXIADAAQAAAAAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgDABIgqAAIgBAEIgCABQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAAAgAgQgQIAkgBIABgZIgnAAg");
	this.shape_199.setTransform(406.5627,446.5128,2.4309,2.431);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#ED1C24").s().p("AgPAqQgGgFAAgHQAAgHAFgEQAEgFAJgCIABAAIAAgBIgBgBIgBgBQAAgBABAAQAAAAAAgBQABAAABAAQABAAAAAAIAGACIAAACIAAABIAAABQAIACAFAEQAEAFAAAGQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgDAEAAAGQAAAGAEADQAEAFAFAAQAHAAAEgEQAFgFAAgFQAAgFgEgFQgEgFgIAAQgGAAgEAFgAguABQgBgBgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAFgBIAFABIAHABIAcAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAASQAAABAAABQAAAAABAAQAAABAAAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAAAQABABAAAAIAWAAIAEgBQAAAAABAAQABAAAAAAQABgBAAAAQABAAAAgBIAGgBIAGAAQAFACAAADQgBACgFAAIgWAAIAAAOIAOAAIAIgBQAFgCAKAAQAKABAAADQgBABgEABIgIAAIg1AAIgHAAIgIACIgCAAQgEAAgKgDg");
	this.shape_200.setTransform(325.1934,446.2089,2.4309,2.431);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgDABgNgFQgBAAgBAAQgBgBAAAAQgBAAAAgBQAAAAABAAIAGgBIAIAAIAkAAQAUAAADgBQAHgBAIAAQAKAAAAADQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAIgrgBIAAAkQgCAHgBABQgCAAAAgHgAgWgJQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAgBAAgBIgCgZIgDgEIgEgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAFgBIAHABIAFABIAjgBIAFgCIAFABQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgDABIgqAAIgBAEIgDABIgBgBgAgRgQIAkgBIABgZIgmAAg");
	this.shape_201.setTransform(283.8679,446.5128,2.4309,2.431);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#ED1C24").s().p("AgPAqQgGgFAAgHQAAgHAFgEQAEgFAJgCIABAAIAAgBIgBgBIgBgBQAAgBABAAQAAAAAAgBQABAAABAAQABAAAAAAIAGACIAAACIAAABIAAABQAIACAFAEQAEAFAAAGQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgEAFAAAFQAAAGAFADQAEAFAFAAQAHAAAEgEQAFgFAAgFQAAgFgEgFQgEgFgIAAQgGAAgEAFgAgvABQgBgBgBAAQAAAAgBAAQAAAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAFgBIAFABIAHABIAcAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAASQAAABAAABQAAAAABAAQAAABAAAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAAAQABABAAAAIAWAAIAEgBQAAAAABAAQABAAAAAAQABgBAAAAQABAAAAgBIAGgBIAGAAQAFACAAADQgBACgFAAIgWAAIAAAOIAOAAIAIgBQAFgCAKAAQAKABAAADQgBABgEABIgIAAIg1AAIgHAAIgIACIgCAAQgEAAgLgDg");
	this.shape_202.setTransform(200.7255,446.2089,2.4309,2.431);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#ED1C24").s().p("AgtAfQgBAAgBAAQAAgBgBAAQAAAAAAgBQAAAAABAAQABgBAFAAIAIAAIAZABIAAgdQAAAAAAAAQAAAAAAgBQAAAAgBgBQAAAAgBgBIgEgBQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQABAAAAgBQAAAAABAAQAAAAABAAQABAAABAAIAEAAIAEABQABAAABAAQAAABABAAQAAAAAAABQAAAAAAAAIgBADIAAAdIAQgBQAIAAABgBQAIgCAHABQAKAAAAADQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAQgEABgEgBIgzAAIgGABIgIACIgCAAQgEAAgLgEgAAUAQQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIADgMIADgdIgjABIgJACQgEACgKgFIgCgCQAAgBAGAAQAGABAXgBQATAAAEgBIAFgBIAEAAQACABAAAAQABAAAAABQABAAAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAAAQgBABAAAAIgFAcIgEALQAAABgBABQAAABAAAAQgBABAAAAQAAAAgBAAIgBAAg");
	this.shape_203.setTransform(1127.8474,650.3427,2.4309,2.431);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#ED1C24").s().p("AgUAuQgEgBAAgEIAAgIQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgDgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIAEgBIAFAAIAGABIAlAAIAAgNIgdAAIgKACQgDABgIgFIgBgBQACgBADAAIAGABIAWAAQAOAAADgBIADgBIAFAAQABABAAAAQABABAAAAQAAAAAAAAQAAABAAAAIgCADIgCAMIACAAQABAAAAAAQAAAAAAAAQAAABABAAQAAAAAAAAIgBACIguAAIAAAKIACADIADABIAbAAIAJgDIAHAAQAFABgBACQAAACgFAAIgrABgAgugBQgCgBAAAAQgBgBAAAAQgBAAAAAAQABgBAAAAIAGgBIAJABIAhABIAAgOIgOAAQgEAAgDgBQgEgCAAgFIAAgLQAAgBAAgBQgBgBAAAAQAAgBAAAAQAAgBgBAAIgFgCIgDgBQAAAAAAgBQAAAAABAAQABgBABAAQAAAAACAAIAJABQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAIAAAFIAAAOIABAEIADABIAZAAIAEgBIAEgCIAFgBIAHAAQAFABgBADQAAACgFAAIgYABIAAAOIAVgCQAGgCAKAAQAJABAAAEQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAIhFAAIgIABIgCAAQgFAAgJgCg");
	this.shape_204.setTransform(1084.7596,651.0195,2.4309,2.431);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#ED1C24").s().p("AAUAtIgBgiQgHADgQAFQgPAEgLAAQgFAAgCgCQgCgBAAgFIAAgQQAAgBAAAAQAAgBgBgBQAAAAAAgBQAAAAgBAAIgFgCQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAABAAIAEgCIAMACIAXAAIABgWIgQABIgEAAIgCAAIgEABQgEABgHgEQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAIAFAAIAZABIAHgBIAEgCIAEABQABAAAAABQAAAAABAAQAAABAAAAQAAAAgBABIgBADIgCAUIABAAIABABIAAACIgEAAIgcAAIAAATIABACIADABQAHAAAQgCQAQgEAIgDIAAgvQAAgDgCgCIgGgDQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQABgBAEAAIAKACQABABABAAQAAAAAAABQABAAAAABQAAAAAAABIgBAFIAAAjIAEgBIAFgCIAEgBIAFAAQAFABAAADQgBACgFAAIgRAAIgBAuQgBAHgCAAQgCAAAAgGg");
	this.shape_205.setTransform(1042.6846,651.0803,2.4309,2.431);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#ED1C24").s().p("AAVAtIgBglQgHAFgGACQgHADgFAAIgEgCQgDgCAAgCIgKAEQgGADgEAAQgDAAgCgCQgCgBAAgEIAAghQAAgEgDgBIgFgCQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAIAEAAIAIABIAHAAIAMgCIAFAAIADABIACAAIADgBIAEgBIAFAAQABAAAAABQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQgBABgBAAIgOAAIAAAiIAAADQABABAAAAQAAAAABAAQAAABABAAQAAAAABAAQADAAAHgDIAMgEIAAgtQAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAFAAIAKACQABABAAAAQABAAAAABQAAAAAAABQABAAgBABIAAAFIAAAjIAEgBIAEgCIAEAAIAGAAQAFABgBACQAAADgFAAIgRAAIgBAtQgBAHgCAAQgCAAAAgGgAghAKQAAABAAAAQABABAAAAQAAAAAAABQABAAAAAAIACAAIAJgBIAHgDIAAgjIgUAAg");
	this.shape_206.setTransform(956.1093,651.0803,2.4309,2.431);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#ED1C24").s().p("AgtAgQgBAAgBgBQgBAAAAAAQAAgBAAAAQAAAAABAAIAGgBIAIAAIAMABQABABAGgBIAMAAIAAgZIgPAAQgEAAgDgCQgEgBAAgEIAAgWQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAgBAAIgFgCIgCgCIAEgBIANABIAdAAIAIgBQABgCAEAAIAHABQAFABgBACQAAADgFAAIgxAAIAAAaQAAABAAAAQAAABABAAQAAAAAAAAQAAAAABAAIACABIAaAAIAEgBQABAAAAAAQABAAABAAQAAAAABAAQAAAAABAAIAFgBIAGAAQAGABgBACQgBACgEAAIgZABIAAAZIANAAIAIgBQAFgCAKAAQAJAAAAAEQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAQgEABgEgBIgzAAIgGABQgEAAgEACIgCAAQgFAAgKgEg");
	this.shape_207.setTransform(911.4358,650.2516,2.4309,2.431);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#ED1C24").s().p("AAUAtIAAgpQgKAFgOAEQgPAFgJAAQgEAAgDgCQgCgCAAgEIAAggQAAgBAAgBQAAAAgBgBQAAAAAAgBQgBAAAAAAIgGgCIgDgCQgBgBAGAAIAJAAQABABABAAQABAAAAAAQABABAAAAQAAAAAAAAIAAAlQAAAAAAABQAAAAAAABQABAAAAAAQAAABABAAQAAAAAAAAQAAAAABABQAAAAAAAAQABAAABAAQAJAAANgEIAXgHIgBgoQAAgDgBgCIgHgDQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgBAEAAIALACQAAABABAAQAAAAABABQAAAAAAABQAAAAAAABIgBAFIAAAiIAFgBIAEgCIAEgBIAGABQAEABAAACQgBADgEAAIgSAAIAAAuQgCAHgCAAQgCAAAAgGg");
	this.shape_208.setTransform(823.5816,651.0803,2.4309,2.431);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#ED1C24").s().p("AgsAgQgCAAgBgBQAAAAgBAAQAAgBAAAAQAAAAABAAIAGgBIAIAAIAMABQACABAFgBIAMAAIAAgZIgPAAIgHgCQgEgBAAgEIAAgWQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAAAAAIgGgCIgCgCQAAgBAFAAIAMABIAdAAIAIgBQACgCADAAIAHABQAFABgBACQAAADgFAAIgxAAIAAAaQAAABAAAAQAAABAAAAQABAAAAAAQAAAAABAAIADABIAaAAIADgBQABAAAAAAQABAAABAAQAAAAABAAQAAAAABAAIAFgBIAHAAQAFABgBACQAAACgFAAIgZABIAAAZIANAAIAIgBQAFgCAKAAQAKABgBADQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAAAAAIgJAAIgyAAIgHABIgIACIgCAAQgEAAgKgEg");
	this.shape_209.setTransform(736.9315,650.2516,2.4309,2.431);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#ED1C24").s().p("AAgAtIgBg5IgGAAIgIABIgCAAIgEABQgDABgIgDIgBgCQAAgCAFABQAEABAJgBIAOgBIAAgXQAAgDgCgCIgGgDQgBgBgBAAQAAAAAAAAQgBgBAAAAQAAAAABAAQABgBAEAAIAKACQABABABAAQAAAAAAABQABAAAAABQAAAAAAABQgBABAAAEIgBBTQgBAHgCAAQgCAAAAgGgAgZARQgCgBAAgFIAAghQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgGgCQgBAAAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAIAFgCIAJABQABAAABAAQABAAAAABQABAAAAAAQAAABAAAAIAAAFIAAAhIABADIADABQAJAAAJgCIARgFQABgBAAAAQAAAAABAAQAAABAAAAQAAAAAAABIgCACIgTAHQgKADgIAAQgFAAgCgCg");
	this.shape_210.setTransform(692.1508,651.0803,2.4309,2.431);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAIAGgBIAIAAIAMABIAYgBQAUAAADgBQAHgBAIAAQAKAAAAADQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgrgBIAAAkQgCAIgBAAQgCAAAAgHgAgWgJIgBgEIgCgaQAAgBgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAIgEgCQgBAAAAAAQgBgBAAAAQAAAAABAAQAAAAAAAAIAFgCIAMACIARAAIASgBIAFgBIAFAAQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgDABIgqABIgBADIgDABgAgRgQIAkgBIABgZIgmAAg");
	this.shape_211.setTransform(589.7977,651.7286,2.4309,2.431);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#ED1C24").s().p("AgPArQgGgGAAgHQAAgHAFgEQAFgGAIAAIABgCIgCgCQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABAAQAFAAABACIAAABIAAACIAAAAIAAABQAJABAEAFQAEAFAAAGQAAAHgGAGQgHAFgJAAQgJAAgHgFgAgJAUQgEAEAAAGQAAAFAEAFQAEAEAGAAQAGAAAFgEQAEgFAAgFQAAgFgEgFQgEgEgHAAQgHAAgDAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAgBQAAAAABAAIAPgBIALABIAVAAIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBIAFgBIAFAAIAHACIAYAAIAEgBQABAAAAAAQABAAAAAAQABAAABgBQAAAAABAAIAFgBIAGAAQAFABAAADQgBACgEAAIgtAAIAAATIACADIADABIAVgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAFABAAACQgBADgFAAIgWAAIAAAOIAOAAIAIgBQAHgCAJAAQAJAAAAAEQAAAAgBAAQAAAAAAABQgBAAgBAAQAAAAgBABIhFAAIgIACIgDAAQgFAAgIgEg");
	this.shape_212.setTransform(546.2081,651.445,2.4309,2.431);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#ED1C24").s().p("AAlAtIgBgtIgMAAIAAAWIgBASQAAAHgDAAQgCAAAAgGIgBhLQAAgEgBgCIgGgDIgCgCQAAAAAAAAQABAAAAAAQABgBABAAQAAAAACAAIAKADQAAAAABABQAAAAABAAQAAABAAAAQAAAAAAABIgBAGIAAAeIAMAAIAAgjQAAgDgCgCIgFgDIgCgCQAAAAAAgBQAAAAABAAQAAAAABAAQABAAABAAIAKACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAFIABBBIgBASQgBAHgCAAQgCAAAAgGgAgUAYQAGgEAIgPQAHgNADgSIgEABIgDAAIgCABIgDAAIgBABIgBACQgEANgIALQgJAMgFAEQgDADgCAAQgBAAAAAAQAAAAAAgBQAAAAAAAAQABgBAAAAQAFgEAJgOQAJgNACgPIgGABIgDAAIgEACIgIgDQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAIAEgBIAJABIAFAAIAJgCIAEAAIABABIAAABIADAAIAMgCIADAAQABABAAAAQAAAAABABQAAAAAAABQgBAAAAABIgCAFQgEAOgHAMQgHANgHAFQgDAEgCAAQgBAAAAAAQAAgBAAAAQAAAAAAgBQABAAAAgBg");
	this.shape_213.setTransform(501.8611,651.0803,2.4309,2.431);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#ED1C24").s().p("AAgAtIgBg0IgCAAIgKACIgJgCQAAAHgHAGQgFAHgMAAQgLAAgHgHQgGgGAAgHQAAgHAEgGQAEgEAJgDIACAAIABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgCgCQABgDAFABQAEABABABIABACIgBACIABABIAEABQAFACAEAEQAEAEAAAFIACAAIACABIASgBIAAgcQAAgDgCgCIgGgDQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQABgBAEAAIAKACQABABABAAQAAAAABABQAAAAAAABQAAAAAAABIgBAFIgBBTQgBAHgCAAQgCAAAAgGgAgagTQgFAEAAAIQAAAHAFAEQAFAEAHAAQAIAAAEgEQAEgEAAgHQAAgGgDgGQgFgFgIAAQgHAAgFAFg");
	this.shape_214.setTransform(415.8228,651.0803,2.4309,2.431);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAIAGgBIAIAAIAMABIAYgBQAUAAADgBQAHgBAIAAQAKAAAAADQAAABAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIgqgBIgBAkQgCAIgBAAQgCAAAAgHgAgWgJIgBgEIgCgaQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAIgFgCQgBAAAAAAQgBgBAAAAQAAAAABAAQAAAAAAAAIAFgCIAMACIARAAIASgBIAFgBIAFAAQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgDABIgqABIgBADIgCABIgCgBgAgRgQIAkgBIABgZIgmAAg");
	this.shape_215.setTransform(372.8392,651.7286,2.4309,2.431);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#ED1C24").s().p("AgPArQgGgGAAgHQAAgHAFgEQAFgGAIAAIABgBIAAgBIgBgBIgBgBQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABAAQAEAAACACIAAABIAAACIAAAAIAAABQAJABAEAFQAEAEAAAHQAAAHgGAGQgHAFgKAAQgIAAgHgFgAgKAUQgDAEAAAGQAAAGAEAEQAEAEAFAAQAHAAAFgEQAEgFAAgFQAAgFgEgFQgEgEgIAAQgGAAgEAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAgBQAAAAABAAIAOgBIAMABIAVAAIAAgOIgNAAQgEAAgDgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAgBAFAAIAFAAIAHACIAYAAIAEgBQABAAAAAAQABAAAAAAQABAAABgBQAAAAABAAIAFgBIAGAAQAGABgBADQgBACgEAAIgtAAIAAATIACADIACABIAWgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAFABAAACQgBADgFAAIgWAAIAAAOIAWgBQAIgCAIAAQAJAAAAAEQAAAAgBAAQAAAAAAABQgBAAgBAAQAAAAgBABIg+AAIgHAAIgIACIgDAAQgEAAgJgEg");
	this.shape_216.setTransform(286.8302,651.445,2.4309,2.431);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#ED1C24").s().p("AgBAqIgBgkIgSABIgJACQgEABgMgFQgCAAAAgBQgBAAAAAAQgBgBAAAAQABAAAAAAIAGgBIAJAAIALABIAYgBQAUAAADgBQAHgBAJAAQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIgqgBIgBAkQgBAIgCAAQgBAAAAgHgAgWgJIgBgEIgCgaQAAgBgBgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgFgCQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAIAFgCIALACIARAAIATgBIAEgBIAFAAQABAAABABQAAAAAAABQABAAgBAAQAAABAAAAIgCAEIgEAXIADAAQAAAAAAAAQABAAAAAAQAAABAAAAQABAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgDABIgqABIgBADIgCABgAgQgQIAkgBIABgZIgmAAg");
	this.shape_217.setTransform(243.6949,651.7286,2.4309,2.431);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#ED1C24").s().p("AgPArQgGgGAAgHQAAgHAEgEQAHgGAHAAIABgCIgCgCQAAgCAEAAQAFAAAAACIABABIgBACIAAAAIABABQAIABAFAFQAEAEAAAHQAAAHgGAGQgHAFgKAAQgIAAgHgFgAgKAUQgEAFAAAFQAAAFAEAFQAFAEAFAAQAHAAAEgEQAEgEAAgGQAAgGgDgEQgEgEgIAAQgGAAgEAEgAgvAAQgBAAAAAAQgBAAAAAAQgBAAABgBQAAAAAAAAIAOgBIAMABIAVAAIAAgOIgNAAIgIgBQgDgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAgBgBAAIgFgCQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIAEgBIAGAAIAHACIAYAAIAEgBQABAAAAAAQABAAABAAQAAAAABgBQAAAAAAAAIAGgBIAGAAQAGABgBADQgBACgFAAIgsAAIAAATIABADIADABIAWgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAFABgBACQgBADgEAAIgXAAIAAAOIAPAAIAIgBQAHgCAIAAQAKAAgBAEQAAAAAAAAQAAAAgBABQAAAAgBAAQgBAAgBABIg9AAIgHAAIgIACIgCAAQgFAAgKgEg");
	this.shape_218.setTransform(158.2815,651.445,2.4309,2.431);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#ED1C24").s().p("AgYArIgBgBIAAgCQAAgCAMgNIAageQAFgGgBgJQAAgHgFgGQgGgEgHAAQgFgBgGAFQgFADAAAHQAAABAAAAQAAABABAAQAAAAAAAAQAAABABAAIACABIADACIAAADQAAADgCACIgEABQgEAAgCgDQgCgCAAgGIABgFIACgFIAFgGIAGgEIAGgCIAFgBQAJAAAIAHQAIAGAAALQAAAIgFAHIgKAKIgSASIgKALIAeAAQAFAAACgEIADgNQAAgBAAAAQAAgBABAAQAAAAAAgBQAAAAABABQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAIgCAWIAAABIgCABg");
	this.shape_219.setTransform(150.4319,446.7045,2.4309,2.431);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#ED1C24").s().p("AgsAfQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAQADgBADAAIAIAAIAMABIANAAIAAgcQAAgBAAAAQAAAAAAgBQAAAAgBgBQAAAAAAAAIgFgCQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAAAIAFgBIAIABQABAAAAABQABAAAAAAQABAAAAABQAAAAAAAAIgBADIAAAdIAQAAIAJgBQAGgCAKAAQAJABAAADQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAIhJADIgDAAQgFAAgIgEgAAUAQQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBIACgMIADgdIgjACQgFAAgEABQgEACgKgFIgCgCQgBgCAHABQAKABATAAQATAAAEgBIAFgCIAEABQABAAABAAQABAAAAABQAAAAAAAAQAAABAAAAIgCAFIgFAbIgEALQgCAEgCAAIAAAAg");
	this.shape_220.setTransform(1126.7089,445.2272,2.4309,2.431);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#ED1C24").s().p("AgtAjQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQABgBAFAAIAJABIAfAAIAAgWQgJgBgHgGQgHgEAAgJQAAgHAFgGQAFgFAJgCIACgBQABAAAAAAQABgBAAAAQAAAAAAgBQgBAAAAAAIgCgCQABgDAEABQAFABABABQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAIAAACIAAAAIACABQALADADAFQAEAEAAAIQAAAJgHAEQgGAGgJABIAAAWIANAAIAHgBQAGgCAKAAQAJAAAAADQAAABAAABQgBAAAAAAQgBABAAAAQgBAAgBAAIgpAAQgJAAgJABIgOACIgCAAQgEAAgLgDgAgMgWQgFAEAAAIQAAAHAFAEQAFAFAHAAQAJAAAFgFQAFgEAAgHQAAgGgFgGQgFgGgJAAQgHAAgFAGg");
	this.shape_221.setTransform(1084.715,444.5322,2.4309,2.431);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#ED1C24").s().p("AAUAtIgBgiIgXAHQgRAFgJAAQgFAAgCgCQgCgCAAgEIAAgQQAAgBAAAAQAAgBgBgBQAAAAAAAAQAAgBgBAAIgFgCQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAABAAQAAgBABAAIAkACIAAgWIgHAAIgJABIgEAAIgGABQgDABgIgEQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBIAFAAIAMAAQAIABAFgBIAHgBIAEgBIAEABQABAAAAABQABAAAAAAQABAAgBABQAAAAAAAAIgCAEIgCAUIABAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAAACIgEAAIgcAAIAAASQAAABAAABQAAAAAAAAQAAABABAAQAAAAAAAAIADABQAKAAAOgDQAOgCAJgEIAAgvQAAgEgCgBIgGgDQAAAAgBgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABAAABAAQABAAABAAIALACQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgBAGIAAAiIAFAAIAEgCIAEgBIAFAAQAFABAAADQgBACgFAAIgRAAIAAAcIgBASQgBAHgCAAIAAAAQgBAAgBgGg");
	this.shape_222.setTransform(1044.3641,445.9795,2.4309,2.431);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#ED1C24").s().p("AAVAtIgBglQgEAEgJADIgLACIgFgBIgDgEIgJAEQgGACgEAAIgGgBQgCgCAAgEIAAggQAAgBgBgBQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAABAAIAEgCIAMACQABABAGgBIAIgBQABgBAEAAIAEAAIABABIACAAIAFgBIAEgBIAFAAQAAAAABABQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAIgOABIAAAiIABADQAAAAAAABQAAAAABAAQAAAAAAAAQABAAABAAQAFAAAGgCIALgEIAAgtQAAgEgCgBIgGgDQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgBAEAAIAKACQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAIgBAGIAAAjIAFgBIAEgCIAEgBIAFABQAFABAAACQgBADgFAAIgRAAIgBAtQAAAGgDABQgCAAAAgGgAggAJQAAABAAABQAAAAAAABQAAAAAAAAQAAABABAAIACAAIAJgBQAFgBACgCIAAgjIgTAAg");
	this.shape_223.setTransform(963.121,446.036,2.4309,2.431);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#ED1C24").s().p("AgtAgQgBAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAIAGgBIAJAAIAfABIAAgZIgPAAIgIgCQgDgBAAgEIAAgWQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAIgFgCIgDgCQAAgBAFAAIAGAAIAHABIAcAAIAEAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIAFgBIAGABQAGABgBACQgBADgEAAIgxAAIAAAaIABACIADABIAaAAIAEgBIAKgCIAGABQAFABAAACQgBACgFAAIgYABIAAAZIAUgBQAGgCAKAAQAKAAgBAEQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAIg7AAIgOACIgBABQgEAAgMgEg");
	this.shape_224.setTransform(920.7161,445.1486,2.4309,2.431);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#ED1C24").s().p("AgSAwQgDgBAAgFIAAgIQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBAAAAIgEgBIgCgCQAAAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIAGAAIAGABIAgAAIAAgOIgYAAIgEABIgGABQgEABgHgEIgBgCQAAAAAAAAQABAAAAAAQABAAABAAQAAAAABAAIAogBIAEgBIAFABQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgCADIgCANIACAAQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAABIgBABIgpAAIAAALQAAAAAAABQAAAAAAABQAAAAABAAQAAABAAAAIADABIAYgBQAAAAABAAQABAAAAAAQABAAAAgBQABAAAAAAIAFgBIAHAAQAFABgBACQgBADgEAAIgnAAgAAVACIgBgMQgFADgTAGQgRADgJAAQgEAAgDgBQgCgBAAgEIAAgVQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAgBAAIgGgCIgCgCIAEgBIAGAAIAIABIAJAAQAHAAACgBQADgCAEAAIAGAAQAFABAAACQgBADgEAAIggAAIAAAYQAAAAAAABQAAAAABABQAAAAAAAAQAAABABAAIADABQAKAAAOgEQAPgDAIgEIAAgYQAAgEgCgBIgGgDQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAFAAIALACQAAABABAAQAAABABAAQAAAAAAABQAAAAAAAAIgBAGIAAAUIAFgBQAAAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIAEAAIAFAAQAFABAAACQgBADgFAAIgRAAIgBAPQgBAGgCAAQAAAAgBgBQAAAAAAAAQAAgBgBgBQAAgBAAgBg");
	this.shape_225.setTransform(840.3054,445.5498,2.4309,2.431);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#ED1C24").s().p("AgtAgQgBAAgBAAQgBgBAAAAQAAAAAAgBQAAAAAAAAIAHgBIAIAAIAfABIAAgZIgPAAIgIgCQgDgBAAgEIAAgWQAAgBAAAAQAAgBgBgBQAAAAAAAAQAAgBgBAAIgFgCIgDgCQAAgBAFAAIAGAAIAHABIAcAAIAEAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIAFgBIAGABQAGABgBACQAAADgFAAIgxAAIAAAaIABACIADABIAaAAIAEgBIAKgCIAGABQAFABAAACQgBACgFAAIgYABIAAAZIAUgBQAGgCAKAAQAJAAAAAEQAAAAAAABQAAAAgBAAQAAABgBAAQgBAAgBAAIg7AAIgOACIgCABQgEAAgLgEg");
	this.shape_226.setTransform(757.895,445.1486,2.4309,2.431);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#ED1C24").s().p("AAkAtIAAgqIgNAAIgBAlQgCAHgCAAQgCAAAAgGIgBhLQAAgEgBgCIgGgDQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAIAFgBIAKADQABAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIgBAGIABAiIANAAIAAgnQAAgDgCgCIgGgDQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBIAFAAIAKACQABABAAAAQABABAAAAQAAABAAAAQAAAAAAAAIgBAGIAABTQgCAHgCAAIAAAAQgCAAAAgGgAgbASQgGgFAAgHQAAgHAEgDQAEgEAGgCIADAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAABAAQAAAAABAAQAEABACABQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIgBACIABAAIACAAQAFABAEAFQAEAEAAAGQAAAIgHAEQgFAFgIAAQgHAAgHgFgAgWgDQgEAEAAAFQAAAFAEAEQADAEAGAAQAGAAAEgEQADgEAAgFQAAgGgDgDQgEgEgGAAQgFAAgEAEgAgngTQgBgBgBAAQgBgBAAAAQAAAAAAgBQAAAAAAAAIAFgBIAGAAIAIABIAJAAQAFAAAEgCIAHgBIAHABQABABABAAQAAABABAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAIgcAAIgIACIgCABQgDAAgGgDgAgTghIgGgDQgBAAAAAAQgBgBAAAAQAAAAABgBQAAAAAAAAIAFAAIAOABQAGAAAAACQAAABAAABQAAAAgBAAQAAABgBAAQgBAAgBAAIgLAAg");
	this.shape_227.setTransform(715.3589,445.9904,2.4309,2.431);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgCAAAAAAQgBgBAAAAQgBAAAAAAQABgBAAAAQABgBAFAAIAJAAIAjAAQATAAAEgBQAGgCAKABQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIgqgBIAAASIgBASQgBAHgCAAIAAABQgBAAgBgHgAgWgJIgBgFIgCgZQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBAAAAgBIgFgBQgBAAAAAAQAAAAAAAAQgBgBABAAQAAAAAAgBIAFgBIAHABIAFABIARgBIASAAIAFgCIAFABQABABAAAAQABABAAAAQABAAgBABQAAAAAAAAIgDAEIgDAXIACAAQABAAAAABQABAAAAAAQAAAAABAAQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAAAAAQAAAAgBAAIgDABIgqAAQAAABAAABQAAAAAAABQAAAAgBABQAAAAAAAAIgCABIgCgBgAgSgqIABAaIAkgBIACgag");
	this.shape_228.setTransform(613.0418,446.5873,2.4309,2.431);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#ED1C24").s().p("AgPAqQgGgFAAgHQAAgFAFgHQAEgEAJgBIABgBIAAgBIgBgBIgBgBQAAAAABgBQAAAAAAAAQABgBABAAQABAAAAAAIAGACIAAACIAAABIAAABIAAAAQAJACAEAEQAEAEAAAHQAAAIgGAEQgGAGgLAAQgJAAgGgGgAgKAUQgDAEAAAGQAAAGAEAEQAEAEAFAAQAHAAAFgEQAEgFAAgFQAAgFgEgFQgEgEgIgBQgGABgEAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAQgEAAgDgCQgEAAAAgGIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAFgBIAFAAIAHACIAcgBIAFgBIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAATQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAIACABIAWAAIAEAAIAEgBIAGgBIAGAAQAFABAAACQgBADgFAAIgWAAIAAAOIAWgBQAGgCAJAAQAKABAAADQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIg+AAIgHABIgIABIgCAAQgEAAgKgEg");
	this.shape_229.setTransform(571.2013,446.3398,2.4309,2.431);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#ED1C24").s().p("AAkAtIAAgtIgMAAIgBAoQAAAHgDAAQgCAAAAgGIgBhLQAAgEgBgCIgGgDQAAAAgBAAQAAgBgBAAQAAAAAAAAQAAgBAAAAIAFgBIAKADQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIgBAGIAAAeIAMAAIAAgjQAAgEgCgBIgFgDQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBIAFAAIAKACQABABAAAAQABABAAAAQAAABAAAAQAAAAAAAAIgBAGIAABTQgBAHgCAAIAAAAQgCAAgBgGgAgUAYQAGgFAIgOQAIgPACgQIgFABIgCAAIgDABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgCADQgEAOgIAJQgHALgHAFQgEAEgBAAQgBAAAAAAQAAAAAAgBQAAAAAAAAQABgBAAAAQAGgGAIgMQAIgMADgQIgGABIgHABQgBABgHgDQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIAEgBIAEABIAKAAIAFgCIAEAAIADAAIACABIAAABIADAAIAMgDIADABQABAAAAABQAAAAAAAAQAAABAAABQAAAAAAABIgCAFQgEAOgHAMQgHANgHAFQgEAEgBAAQgBAAAAAAQAAgBAAAAQAAAAAAgBQABAAAAgBg");
	this.shape_230.setTransform(529.7565,445.9795,2.4309,2.431);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#ED1C24").s().p("AAgAtIgBg1IgBAAIgBABIgDAAIgCABIgFABQgEAAgFgDQAAAIgGAGQgGAHgMAAQgMAAgGgHQgGgGAAgHQAAgIAEgFQAFgFAIgCIACAAIABgBQABAAAAgBQAAAAAAAAQAAAAgBgBQAAAAAAAAIgBgCQAAgDAFABQAFABABABIAAACIgBACIABABIAEABQAFACAEAEQADADACAGIADAAIAIABIAKgBIAAgcQAAgEgCgBIgGgDQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAgBAFAAIALACQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgBAGIgBBTQgBAHgCAAIAAAAQgBAAgBgGgAgagTQgFAEAAAIQAAAHAFADQAFAFAHAAQAIAAAFgFQADgDAAgHQAAgHgDgFQgFgFgIAAQgHAAgFAFg");
	this.shape_231.setTransform(447.811,445.9795,2.4309,2.431);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#ED1C24").s().p("AgBAqIgBgkIgSABIgJACQgEABgMgFQgCAAAAAAQgBgBAAAAQgBAAAAAAQABgBAAAAQABgBAFAAIAJAAIAjAAQAUAAADgBQAGgCAKABQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIgqgBIAAASQAAALgBAHQgBAHgCAAIAAABQgBAAAAgHgAgWgJQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAgBIgCgZQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgFgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIAGgBIALACIAkgBIAEgCIAFABQABABABAAQAAABAAAAQABAAgBABQAAAAAAAAIgDAEIgDAXIADAAQAAAAAAABQABAAAAAAQAAAAAAAAQABABAAAAQAAAAgBABQAAAAAAAAQAAAAAAAAQgBAAAAAAIgDABIgqAAIgBAEIgCABQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAgAgSgqIACAaIAkgBIABgag");
	this.shape_232.setTransform(406.5627,446.5873,2.4309,2.431);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#ED1C24").s().p("AgPAqQgGgFAAgHQAAgGAFgGQAEgEAJgBIABgBIAAgBIgBgBIgBgBQAAAAABgBQAAAAAAAAQABgBABAAQABAAAAAAIAGACIAAACIAAABIAAABQAIACAFAEQAEAEAAAHQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgDAEAAAGQAAAGAEAEQAEAEAFAAQAHAAAEgEQAFgEAAgGQAAgFgEgFQgEgEgIgBQgGABgEAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAQgEAAgDgCQgEAAAAgGIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAFgBIAFAAIAHACIAcgBIAFgBIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAATQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAIACABIAWAAIAEAAIAEgBIAGgBIAGAAQAFABAAACQgBADgFAAIgWAAIAAAOIAWgBQAFgCAKAAQAKABAAADQgBACgEAAIg9AAIgHABIgIABIgCAAQgEAAgKgEg");
	this.shape_233.setTransform(325.1934,446.3398,2.4309,2.431);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgFABgLgFQgBAAgBAAQgBgBAAAAQgBAAAAgBQAAAAABAAIAGgBIAIAAIAkAAQAUAAADgBQAFgCAKABQAKAAAAADQAAABgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgrgBIAAAkQgCAHgBAAIAAABQgCAAAAgHgAgWgJQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAgBAAgBIgCgZQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAAAgBgBIgEgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIAFgBIAHABIAFABIAjgBIAFgCIAFABQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBABAAAAQgBABAAAAQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAABQABAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAIgDABIgqAAIgBAEIgDABIgBgBgAgSgqIABAaIAkgBIABgag");
	this.shape_234.setTransform(283.8679,446.5981,2.4309,2.431);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#ED1C24").s().p("AgPAqQgGgFAAgHQAAgGAFgGQAEgEAJgBIABgBIAAgBIgBgBIgBgBQAAAAABgBQAAAAAAAAQABgBABAAQABAAAAAAIAGACIAAACIAAABIAAABQAIACAFAEQAEAEAAAHQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgEAFAAAFQAAAGAFAEQAEAEAFAAQAHAAAEgEQAFgEAAgGQAAgFgEgFQgEgEgIgBQgGABgEAEgAgvAAQgBAAgBAAQAAAAgBAAQAAAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAQgEAAgDgCQgEAAAAgGIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAFgBIAFAAIAHACIAcgBIAFgBIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAATQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAIACABIAWAAIAEAAIAEgBIAGgBIAGAAQAFABAAACQgBADgFAAIgWAAIAAAOIAWgBQAFgCAKAAQAKABAAADQgBACgEAAIg9AAIgHABIgIABIgCAAQgEAAgLgEg");
	this.shape_235.setTransform(200.7255,446.3398,2.4309,2.431);

	var maskedShapeInstanceList = [this.shape_169,this.shape_170,this.shape_171,this.shape_172,this.shape_173,this.shape_174,this.shape_175,this.shape_176,this.shape_177,this.shape_178,this.shape_179,this.shape_180,this.shape_181,this.shape_182,this.shape_183,this.shape_184,this.shape_185,this.shape_186,this.shape_187,this.shape_188,this.shape_189,this.shape_190,this.shape_191,this.shape_192,this.shape_193,this.shape_194,this.shape_195,this.shape_196,this.shape_197,this.shape_198,this.shape_199,this.shape_200,this.shape_201,this.shape_202,this.shape_203,this.shape_204,this.shape_205,this.shape_206,this.shape_207,this.shape_208,this.shape_209,this.shape_210,this.shape_211,this.shape_212,this.shape_213,this.shape_214,this.shape_215,this.shape_216,this.shape_217,this.shape_218,this.shape_219,this.shape_220,this.shape_221,this.shape_222,this.shape_223,this.shape_224,this.shape_225,this.shape_226,this.shape_227,this.shape_228,this.shape_229,this.shape_230,this.shape_231,this.shape_232,this.shape_233,this.shape_234,this.shape_235];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185,p:{x:162.5743,y:459.1541}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]},135).to({state:[{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_185,p:{x:165.0052,y:459.1635}},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203}]},235).to({state:[]},242).to({state:[{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185,p:{x:162.5743,y:459.1541}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]},168).to({state:[{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_185,p:{x:165.0052,y:459.1635}},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203}]},235).to({state:[]},241).to({state:[{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185,p:{x:162.5743,y:459.1541}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]},165).to({state:[{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185,p:{x:162.5743,y:459.1541}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]},74).to({state:[{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185,p:{x:162.5743,y:459.1541}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]},279).to({state:[{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_185,p:{x:165.0052,y:459.1635}},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203}]},118).to({state:[]},477).to({state:[{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185,p:{x:162.5743,y:459.1541}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]},167).to({state:[{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_185,p:{x:165.0052,y:459.1635}},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203}]},235).to({state:[]},242).wait(37));

	// red_white
	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AizIQIAAwfIFnAAIAAQfg");
	this.shape_236.setTransform(201.225,343.925);
	this.shape_236._off = true;

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	this.shape_237.setTransform(293.45,345.975);
	this.shape_237._off = true;

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC9IAAGCg");
	this.shape_238.setTransform(333.625,345.975);
	this.shape_238._off = true;

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC9IAAGCg");
	this.shape_239.setTransform(417.15,345.975);
	this.shape_239._off = true;

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AkBIQIAAmCIDBigIAAn9IFCAAIAAHgIjFC+IAAGBg");
	this.shape_240.setTransform(539.775,355.25);
	this.shape_240._off = true;

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AizIQIAAwfIFoAAIAAQfg");
	this.shape_241.setTransform(840.9,354.9);
	this.shape_241._off = true;

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjDC9IAAGCg");
	this.shape_242.setTransform(968.15,352.85);
	this.shape_242._off = true;

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AkBIQIAAmCIDCigIAAn9IFAAAIAAHgIjEC9IAAGCg");
	this.shape_243.setTransform(1092.9,373.45);
	this.shape_243._off = true;

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("Ai0IQIAAwfIFoAAIAAQfg");
	this.shape_244.setTransform(160,550.075);
	this.shape_244._off = true;

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AkAIQIAAmCIDAigIAAn9IFCAAIAAHgIjFC9IAAGCg");
	this.shape_245.setTransform(253.25,552.125);
	this.shape_245._off = true;

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AkAIQIAAmDIDBifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	this.shape_246.setTransform(510.9,561.4);
	this.shape_246._off = true;

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AkAIQIAAmCIDAigIAAn9IFBAAIAAHgIjEC+IAAGBg");
	this.shape_247.setTransform(955.8,560);
	this.shape_247._off = true;

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AkBIQIAAmCIDCigIAAn9IFBAAIAAHgIjFC+IAAGBg");
	this.shape_248.setTransform(1046.525,565.15);
	this.shape_248._off = true;

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AkBIQIAAmDIDBifIAAn9IFBAAIAAHgIjEC9IAAGCg");
	this.shape_249.setTransform(1087.75,579.6);
	this.shape_249._off = true;

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AkBIQIAAmDIDCifIAAn9IFBAAIAAHgIjFC9IAAGCg");
	this.shape_250.setTransform(1133.075,579.6);
	this.shape_250._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_236).wait(135).to({_off:false},0).to({_off:true},10).wait(49).to({_off:false,x:715.125,y:364.175},0).wait(5).to({x:758.475},0).to({_off:true},10).wait(102).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(34).to({_off:false,x:201.225,y:343.925},0).to({_off:true},10).wait(49).to({_off:false,x:715.125,y:364.175},0).wait(5).to({x:758.475},0).to({_off:true},14).wait(100).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(207).to({_off:false,x:201.225,y:343.925},0).to({_off:true},10).wait(49).to({_off:false,x:715.125,y:364.175},0).wait(5).to({x:758.475},0).to({_off:true},10).wait(101).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(35).to({_off:false,x:201.225,y:343.925},0).to({_off:true},10).wait(49).to({_off:false,x:715.125,y:364.175},0).wait(5).to({x:758.475},0).to({_off:true},14).wait(99).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(204).to({_off:false,x:201.225,y:343.925},0).to({_off:true},10).wait(49).to({_off:false,x:715.125,y:364.175},0).wait(4).to({x:758.475},0).to({_off:true},11).wait(44).to({_off:false,x:201.225,y:343.925},0).to({_off:true},10).wait(48).to({_off:false,x:715.125,y:364.175},0).wait(4).to({x:758.475},0).to({_off:true},11).wait(103).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(93).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(34).to({_off:false,x:201.225,y:343.925},0).to({_off:true},11).wait(48).to({_off:false,x:715.125,y:364.175},0).wait(5).to({x:758.475},0).to({_off:true},11).wait(44).to({_off:false,x:201.225,y:343.925},0).to({_off:true},10).wait(49).to({_off:false,x:715.125,y:364.175},0).wait(4).to({x:758.475},0).to({_off:true},10).wait(105).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(92).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(205).to({_off:false,x:201.225,y:343.925},0).to({_off:true},10).wait(48).to({_off:false,x:715.125,y:364.175},0).wait(5).to({x:758.475},0).to({_off:true},10).wait(103).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(34).to({_off:false,x:201.225,y:343.925},0).to({_off:true},10).wait(49).to({_off:false,x:715.125,y:364.175},0).wait(5).to({x:758.475},0).to({_off:true},14).wait(100).to({_off:false,x:693.5,y:570.325},0).wait(5).to({x:736.425,y:567.65},0).wait(10).to({x:824.425,y:561.05},0).to({_off:true},10).wait(76));
	this.timeline.addTween(cjs.Tween.get(this.shape_237).wait(145).to({_off:false},0).to({_off:true},5).wait(131).to({_off:false,x:425.65,y:548.725},0).to({_off:true},10).wait(89).to({_off:false,x:293.45,y:345.975},0).to({_off:true},5).wait(133).to({_off:false,x:425.65,y:548.725},0).to({_off:true},10).wait(262).to({_off:false,x:293.45,y:345.975},0).to({_off:true},5).wait(131).to({_off:false,x:425.65,y:548.725},0).to({_off:true},11).wait(88).to({_off:false,x:293.45,y:345.975},0).to({_off:true},5).wait(133).to({_off:false,x:425.65,y:548.725},0).to({_off:true},10).wait(258).to({_off:false,x:293.45,y:345.975},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(132).to({_off:false,x:425.65,y:548.725},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(90).to({_off:false,x:293.45,y:345.975},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(133).to({_off:false,x:425.65,y:548.725},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(260).to({_off:false,x:293.45,y:345.975},0).to({_off:true},5).wait(131).to({_off:false,x:425.65,y:548.725},0).to({_off:true},10).wait(89).to({_off:false,x:293.45,y:345.975},0).to({_off:true},5).wait(133).to({_off:false,x:425.65,y:548.725},0).to({_off:true},10).wait(121));
	this.timeline.addTween(cjs.Tween.get(this.shape_238).wait(150).to({_off:false},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},10).wait(25).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(5).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},8).wait(24).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(84).to({_off:false,x:333.625,y:345.975},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},10).wait(25).to({_off:false,x:927.975,y:352.85},0).to({_off:true},6).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(5).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},9).wait(24).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(257).to({_off:false,x:333.625,y:345.975},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},10).wait(25).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(9).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(5).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},9).wait(24).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(16).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(83).to({_off:false,x:333.625,y:345.975},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},10).wait(25).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(5).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},10).wait(24).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(253).to({_off:false,x:333.625,y:345.975},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},10).wait(25).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(5).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},9).wait(15).to({_off:false,x:333.625,y:345.975},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},9).wait(25).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},4).wait(4).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},11).wait(25).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(92).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(85).to({_off:false,x:333.625,y:345.975},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},9).wait(26).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(5).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},9).wait(15).to({_off:false,x:333.625,y:345.975},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},10).wait(24).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(4).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},11).wait(25).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(92).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(255).to({_off:false,x:333.625,y:345.975},0).to({_off:true},9).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},9).wait(25).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(5).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},9).wait(24).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(84).to({_off:false,x:333.625,y:345.975},0).to({_off:true},10).wait(5).to({_off:false,x:455.275},0).to({_off:true},10).wait(5).to({_off:false,x:580.675,y:370.875},0).wait(5).to({x:619.825},0).to({_off:true},9).wait(25).to({_off:false,x:927.975,y:352.85},0).to({_off:true},5).wait(10).to({_off:false,x:1051.675,y:359.025},0).to({_off:true},5).wait(5).to({_off:false,x:1133.075,y:373.45},0).to({_off:true},10).wait(24).to({_off:false,x:384.175,y:552.125},0).to({_off:true},5).wait(15).to({_off:false,x:556.925,y:573.4},0).to({_off:true},5).wait(111));
	this.timeline.addTween(cjs.Tween.get(this.shape_239).wait(159).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(405).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(349).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(520).to({_off:false},0).to({_off:true},5).wait(231).to({_off:false},0).to({_off:true},5).wait(249));
	this.timeline.addTween(cjs.Tween.get(this.shape_240).wait(174).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(405).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(349).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(520).to({_off:false},0).to({_off:true},5).wait(231).to({_off:false},0).to({_off:true},5).wait(234));
	this.timeline.addTween(cjs.Tween.get(this.shape_241).wait(209).to({_off:false},0).to({_off:true},10).wait(229).to({_off:false},0).to({_off:true},6).wait(400).to({_off:false},0).to({_off:true},10).wait(229).to({_off:false},0).to({_off:true},6).wait(396).to({_off:false},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(345).to({_off:false},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(515).to({_off:false},0).to({_off:true},10).wait(230).to({_off:false},0).to({_off:true},6).wait(195));
	this.timeline.addTween(cjs.Tween.get(this.shape_242).wait(224).to({_off:false},0).to({_off:true},10).wait(33).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},10).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(119).to({_off:false,x:968.15,y:352.85},0).to({_off:true},10).wait(34).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},10).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(291).to({_off:false,x:968.15,y:352.85},0).to({_off:true},9).wait(34).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(26).to({_off:false,x:597,y:575.375},0).to({_off:true},8).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(119).to({_off:false,x:968.15,y:352.85},0).to({_off:true},10).wait(35).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},9).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(288).to({_off:false,x:968.15,y:352.85},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(35).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},9).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(44).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},10).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(119).to({_off:false,x:968.15,y:352.85},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(35).to({_off:false,x:295.5,y:552.125},0).to({_off:true},10).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},10).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(43).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},10).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(288).to({_off:false,x:968.15,y:352.85},0).to({_off:true},10).wait(34).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},10).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(118).to({_off:false,x:968.15,y:352.85},0).to({_off:true},10).wait(35).to({_off:false,x:295.5,y:552.125},0).to({_off:true},9).wait(25).to({_off:false,x:597,y:575.375},0).to({_off:true},10).wait(25).to({_off:false,x:915.6,y:558.975},0).to({_off:true},5).wait(71));
	this.timeline.addTween(cjs.Tween.get(this.shape_243).wait(239).to({_off:false},0).to({_off:true},5).wait(231).to({_off:false},0).to({_off:true},5).wait(403).to({_off:false},0).to({_off:true},5).wait(231).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},5).wait(111).to({_off:false},0).to({_off:true},4).wait(352).to({_off:false},0).to({_off:true},5).wait(112).to({_off:false},0).to({_off:true},4).wait(521).to({_off:false},0).to({_off:true},5).wait(231).to({_off:false},0).to({_off:true},5).wait(170));
	this.timeline.addTween(cjs.Tween.get(this.shape_244).wait(252).to({_off:false},0).to({_off:true},10).wait(227).to({_off:false},0).to({_off:true},10).wait(398).to({_off:false},0).to({_off:true},10).wait(227).to({_off:false},0).to({_off:true},10).wait(512).to({_off:false},0).to({_off:true},11).wait(107).to({_off:false},0).to({_off:true},10).wait(345).to({_off:false},0).to({_off:true},10).wait(108).to({_off:false},0).to({_off:true},10).wait(396).to({_off:false},0).to({_off:true},10).wait(227).to({_off:false},0).to({_off:true},10).wait(150));
	this.timeline.addTween(cjs.Tween.get(this.shape_245).wait(262).to({_off:false},0).to({_off:true},5).wait(232).to({_off:false},0).to({_off:true},5).wait(403).to({_off:false},0).to({_off:true},5).wait(232).to({_off:false},0).to({_off:true},5).wait(518).to({_off:false},0).to({_off:true},5).wait(112).to({_off:false},0).to({_off:true},5).wait(350).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},5).wait(232).to({_off:false},0).to({_off:true},5).wait(145));
	this.timeline.addTween(cjs.Tween.get(this.shape_246).wait(291).to({_off:false},0).to({_off:true},5).wait(232).to({_off:false},0).to({_off:true},5).wait(404).to({_off:false},0).to({_off:true},5).wait(231).to({_off:false},0).to({_off:true},5).wait(518).to({_off:false},0).to({_off:true},5).wait(112).to({_off:false},0).to({_off:true},5).wait(351).to({_off:false},0).to({_off:true},5).wait(112).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},5).wait(232).to({_off:false},0).to({_off:true},5).wait(116));
	this.timeline.addTween(cjs.Tween.get(this.shape_247).wait(341).to({_off:false},0).to({_off:true},10).wait(227).to({_off:false},0).to({_off:true},10).wait(397).to({_off:false},0).to({_off:true},10).wait(227).to({_off:false},0).to({_off:true},10).wait(513).to({_off:false},0).to({_off:true},9).wait(109).to({_off:false},0).to({_off:true},9).wait(347).to({_off:false},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(396).to({_off:false},0).to({_off:true},10).wait(227).to({_off:false},0).to({_off:true},10).wait(61));
	this.timeline.addTween(cjs.Tween.get(this.shape_248).wait(351).to({_off:false},0).to({_off:true},5).wait(232).to({_off:false},0).to({_off:true},5).wait(402).to({_off:false},0).to({_off:true},5).wait(232).to({_off:false},0).to({_off:true},5).wait(517).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(352).to({_off:false},0).to({_off:true},5).wait(112).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},5).wait(232).to({_off:false},0).to({_off:true},5).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.shape_249).wait(356).to({_off:false},0).to({_off:true},4).wait(233).to({_off:false},0).to({_off:true},5).wait(402).to({_off:false},0).to({_off:true},4).wait(233).to({_off:false},0).to({_off:true},5).wait(517).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(352).to({_off:false},0).to({_off:true},5).wait(112).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},4).wait(233).to({_off:false},0).to({_off:true},5).wait(51));
	this.timeline.addTween(cjs.Tween.get(this.shape_250).wait(360).to({_off:false},0).to({_off:true},10).wait(228).to({_off:false},0).to({_off:true},14).wait(392).to({_off:false},0).to({_off:true},11).wait(227).to({_off:false},0).to({_off:true},14).wait(508).to({_off:false},0).to({_off:true},10).wait(108).to({_off:false},0).to({_off:true},10).wait(347).to({_off:false},0).to({_off:true},8).wait(109).to({_off:false},0).to({_off:true},13).wait(392).to({_off:false},0).to({_off:true},10).wait(228).to({_off:false},0).to({_off:true},14).wait(37));

	// mask_white
	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AiZDyIAAnkIEzAAIAAHkg");
	this.shape_251.setTransform(200.55,446.3);
	this.shape_251._off = true;

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AiZDyIAAnkIE0AAIAAHkg");
	this.shape_252.setTransform(285.05,446.3);
	this.shape_252._off = true;

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AiaDyIAAnkIE1AAIAAHkg");
	this.shape_253.setTransform(325.25,446.3);
	this.shape_253._off = true;

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AiaDyIAAnkIE0AAIAAHkg");
	this.shape_254.setTransform(408.75,446.3);
	this.shape_254._off = true;

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AiaDzIAAnlIE1AAIAAHlg");
	this.shape_255.setTransform(572.275,440.275);
	this.shape_255._off = true;

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AiZDzIAAnlIE0AAIAAHlg");
	this.shape_256.setTransform(841.25,441.825);
	this.shape_256._off = true;

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AiZDzIAAnlIEzAAIAAHlg");
	this.shape_257.setTransform(960.8,441.825);
	this.shape_257._off = true;

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AiaDzIAAnlIE0AAIAAHlg");
	this.shape_258.setTransform(1125.7,441.825);
	this.shape_258._off = true;

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AiZDzIAAnkIEzAAIAAHkg");
	this.shape_259.setTransform(159.35,652.45);
	this.shape_259._off = true;

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AiaDzIAAnkIE1AAIAAHkg");
	this.shape_260.setTransform(287.1,652.45);
	this.shape_260._off = true;

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AiZDzIAAnkIE0AAIAAHkg");
	this.shape_261.setTransform(502.5,652.45);
	this.shape_261._off = true;

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AiaDzIAAnkIE0AAIAAHkg");
	this.shape_262.setTransform(1125.7,652.45);
	this.shape_262._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_251).wait(135).to({_off:false},0).to({_off:true},10).wait(225).to({_off:false},0).to({_off:true},10).wait(400).to({_off:false},0).to({_off:true},10).wait(225).to({_off:false},0).to({_off:true},10).wait(396).to({_off:false},0).to({_off:true},10).wait(108).to({_off:false},0).to({_off:true},10).wait(343).to({_off:false},0).to({_off:true},11).wait(108).to({_off:false},0).to({_off:true},10).wait(515).to({_off:false},0).to({_off:true},10).wait(225).to({_off:false},0).to({_off:true},10).wait(269));
	this.timeline.addTween(cjs.Tween.get(this.shape_252).wait(145).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(405).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(349).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(520).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(264));
	this.timeline.addTween(cjs.Tween.get(this.shape_253).wait(150).to({_off:false},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(206).to({_off:false,x:325.25},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(381).to({_off:false,x:325.25},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(206).to({_off:false,x:325.25},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(377).to({_off:false,x:325.25},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(89).to({_off:false,x:325.25},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(325).to({_off:false,x:325.25},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(89).to({_off:false,x:325.25},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(496).to({_off:false,x:325.25},0).to({_off:true},9).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(206).to({_off:false,x:325.25},0).to({_off:true},10).wait(5).to({_off:false,x:446.875},0).wait(10).to({x:531.35},0).to({_off:true},5).wait(234));
	this.timeline.addTween(cjs.Tween.get(this.shape_254).wait(159).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(405).to({_off:false},0).to({_off:true},5).wait(230).to({_off:false},0).to({_off:true},5).wait(401).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(349).to({_off:false},0).to({_off:true},5).wait(113).to({_off:false},0).to({_off:true},5).wait(520).to({_off:false},0).to({_off:true},5).wait(231).to({_off:false},0).to({_off:true},5).wait(249));
	this.timeline.addTween(cjs.Tween.get(this.shape_255).wait(179).to({_off:false},0).wait(5).to({x:611.425},0).wait(10).to({x:715.5,y:442.85},0).wait(5).to({x:758.825},0).to({_off:true},10).wait(10).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(15).to({_off:false,x:1085.525},0).to({_off:true},5).wait(72).to({_off:false,x:736.775,y:649.775},0).to({_off:true},10).wait(88).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(10).to({x:715.5,y:442.85},0).wait(5).to({x:758.825},0).to({_off:true},14).wait(6).to({_off:false,x:920.6,y:441.825},0).to({_off:true},6).wait(15).to({_off:false,x:1085.525},0).to({_off:true},5).wait(73).to({_off:false,x:736.775,y:649.775},0).to({_off:true},10).wait(261).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(10).to({x:715.5,y:442.85},0).wait(5).to({x:758.825},0).to({_off:true},10).wait(10).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(14).to({_off:false,x:1085.525},0).to({_off:true},5).wait(72).to({_off:false,x:736.775,y:649.775},0).to({_off:true},10).wait(89).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(10).to({x:715.5,y:442.85},0).wait(5).to({x:758.825},0).to({_off:true},14).wait(6).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(15).to({_off:false,x:1085.525},0).to({_off:true},5).wait(73).to({_off:false,x:736.775,y:649.775},0).to({_off:true},10).wait(258).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(10).to({x:715.5,y:442.85},0).wait(4).to({x:758.825},0).to({_off:true},11).wait(10).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(15).to({_off:false,x:1085.525},0).to({_off:true},5).wait(53).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(9).to({x:715.5,y:442.85},0).wait(4).to({x:758.825},0).to({_off:true},11).wait(10).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(14).to({_off:false,x:1085.525},0).to({_off:true},4).wait(75).to({_off:false,x:736.775,y:649.775},0).to({_off:true},10).wait(108).to({_off:false},0).to({_off:true},10).wait(89).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(9).to({x:715.5,y:442.85},0).wait(5).to({x:758.825},0).to({_off:true},11).wait(10).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(15).to({_off:false,x:1085.525},0).to({_off:true},5).wait(53).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(10).to({x:715.5,y:442.85},0).wait(4).to({x:758.825},0).to({_off:true},10).wait(10).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(15).to({_off:false,x:1085.525},0).to({_off:true},4).wait(76).to({_off:false,x:736.775,y:649.775},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(259).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(9).to({x:715.5,y:442.85},0).wait(5).to({x:758.825},0).to({_off:true},10).wait(10).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(15).to({_off:false,x:1085.525},0).to({_off:true},5).wait(73).to({_off:false,x:736.775,y:649.775},0).to({_off:true},10).wait(89).to({_off:false,x:572.275,y:440.275},0).wait(5).to({x:611.425},0).wait(9).to({x:715.5,y:442.85},0).wait(5).to({x:758.825},0).to({_off:true},14).wait(6).to({_off:false,x:920.6,y:441.825},0).to({_off:true},5).wait(15).to({_off:false,x:1085.525},0).to({_off:true},5).wait(74).to({_off:false,x:736.775,y:649.775},0).to({_off:true},10).wait(86));
	this.timeline.addTween(cjs.Tween.get(this.shape_256).wait(209).to({_off:false},0).to({_off:true},10).wait(15).to({_off:false,x:1044.3},0).to({_off:true},5).wait(209).to({_off:false,x:841.25},0).to({_off:true},6).wait(16).to({_off:false,x:1044.3},0).to({_off:true},5).wait(379).to({_off:false,x:841.25},0).to({_off:true},10).wait(14).to({_off:false,x:1044.3},0).to({_off:true},5).wait(210).to({_off:false,x:841.25},0).to({_off:true},6).wait(15).to({_off:false,x:1044.3},0).to({_off:true},5).wait(376).to({_off:false,x:841.25},0).to({_off:true},10).wait(15).to({_off:false,x:1044.3},0).to({_off:true},5).wait(87).to({_off:false,x:841.25},0).to({_off:true},10).wait(15).to({_off:false,x:1044.3},0).to({_off:true},4).wait(326).to({_off:false,x:841.25},0).to({_off:true},10).wait(15).to({_off:false,x:1044.3},0).to({_off:true},5).wait(87).to({_off:false,x:841.25},0).to({_off:true},10).wait(15).to({_off:false,x:1044.3},0).to({_off:true},5).wait(495).to({_off:false,x:841.25},0).to({_off:true},10).wait(15).to({_off:false,x:1044.3},0).to({_off:true},5).wait(210).to({_off:false,x:841.25},0).to({_off:true},6).wait(15).to({_off:false,x:1044.3},0).to({_off:true},5).wait(175));
	this.timeline.addTween(cjs.Tween.get(this.shape_257).wait(224).to({_off:false},0).to({_off:true},10).wait(226).to({_off:false},0).to({_off:true},10).wait(399).to({_off:false},0).to({_off:true},9).wait(226).to({_off:false},0).to({_off:true},10).wait(396).to({_off:false},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(345).to({_off:false},0).to({_off:true},10).wait(107).to({_off:false},0).to({_off:true},10).wait(515).to({_off:false},0).to({_off:true},10).wait(226).to({_off:false},0).to({_off:true},10).wait(180));
	this.timeline.addTween(cjs.Tween.get(this.shape_258).wait(244).to({_off:false},0).to({_off:true},8).wait(228).to({_off:false},0).to({_off:true},9).wait(399).to({_off:false},0).to({_off:true},9).wait(227).to({_off:false},0).to({_off:true},10).wait(396).to({_off:false},0).to({_off:true},9).wait(106).to({_off:false},0).to({_off:true},11).wait(346).to({_off:false},0).to({_off:true},9).wait(107).to({_off:false},0).to({_off:true},11).wait(515).to({_off:false},0).to({_off:true},9).wait(227).to({_off:false},0).to({_off:true},10).wait(160));
	this.timeline.addTween(cjs.Tween.get(this.shape_259).wait(252).to({_off:false},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(44).to({_off:false,x:693.85},0).to({_off:true},5).wait(173).to({_off:false,x:159.35},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(44).to({_off:false,x:693.85},0).to({_off:true},5).wait(344).to({_off:false,x:159.35},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(43).to({_off:false,x:693.85},0).to({_off:true},5).wait(174).to({_off:false,x:159.35},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(43).to({_off:false,x:693.85},0).to({_off:true},5).wait(459).to({_off:false,x:159.35},0).wait(11).to({x:244.85},0).to({_off:true},5).wait(43).to({_off:false,x:693.85},0).to({_off:true},5).wait(54).to({_off:false,x:159.35},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(44).to({_off:false,x:693.85},0).to({_off:true},5).wait(291).to({_off:false,x:159.35},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(45).to({_off:false,x:693.85},0).to({_off:true},5).wait(53).to({_off:false,x:159.35},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(44).to({_off:false,x:693.85},0).to({_off:true},5).wait(342).to({_off:false,x:159.35},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(44).to({_off:false,x:693.85},0).to({_off:true},5).wait(173).to({_off:false,x:159.35},0).wait(10).to({x:244.85},0).to({_off:true},5).wait(44).to({_off:false,x:693.85},0).to({_off:true},5).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.shape_260).wait(267).to({_off:false},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},10).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},10).wait(5).to({_off:false,x:1085.525},0).to({_off:true},4).wait(144).to({_off:false,x:287.1},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},10).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},10).wait(5).to({_off:false,x:1085.525},0).to({_off:true},5).wait(314).to({_off:false,x:287.1},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},11).wait(10).to({_off:false,x:591.85},0).to({_off:true},8).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},10).wait(5).to({_off:false,x:1085.525},0).to({_off:true},4).wait(145).to({_off:false,x:287.1},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},9).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},10).wait(5).to({_off:false,x:1085.525},0).to({_off:true},5).wait(430).to({_off:false,x:287.1},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},9).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},9).wait(5).to({_off:false,x:1085.525},0).to({_off:true},5).wait(25).to({_off:false,x:287.1},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},10).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},9).wait(5).to({_off:false,x:1085.525},0).to({_off:true},5).wait(262).to({_off:false,x:287.1},0).wait(10).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},10).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},10).wait(5).to({_off:false,x:1085.525},0).to({_off:true},5).wait(23).to({_off:false,x:287.1},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},10).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},10).wait(5).to({_off:false,x:1085.525},0).to({_off:true},5).wait(312).to({_off:false,x:287.1},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},10).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},10).wait(5).to({_off:false,x:1085.525},0).to({_off:true},4).wait(144).to({_off:false,x:287.1},0).wait(9).to({x:372.7},0).wait(5).to({x:417.25},0).to({_off:true},10).wait(10).to({_off:false,x:591.85},0).to({_off:true},10).wait(15).to({_off:false,x:824.775},0).wait(10).to({x:911.325},0).wait(5).to({x:956.675},0).to({_off:true},10).wait(5).to({_off:false,x:1085.525},0).to({_off:true},5).wait(51));
	this.timeline.addTween(cjs.Tween.get(this.shape_261).wait(291).to({_off:false},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(50).to({_off:false,x:1044.3},0).to({_off:true},5).wait(172).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(50).to({_off:false,x:1044.3},0).to({_off:true},5).wait(344).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(48).to({_off:false,x:1044.3},0).to({_off:true},5).wait(173).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(49).to({_off:false,x:1044.3},0).to({_off:true},5).wait(459).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(48).to({_off:false,x:1044.3},0).to({_off:true},5).wait(54).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(49).to({_off:false,x:1044.3},0).to({_off:true},5).wait(292).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(50).to({_off:false,x:1044.3},0).to({_off:true},5).wait(52).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(50).to({_off:false,x:1044.3},0).to({_off:true},5).wait(341).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(50).to({_off:false,x:1044.3},0).to({_off:true},5).wait(172).to({_off:false,x:502.5},0).wait(5).to({x:547.5},0).to({_off:true},5).wait(50).to({_off:false,x:1044.3},0).to({_off:true},5).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.shape_262).wait(360).to({_off:false},0).to({_off:true},10).wait(228).to({_off:false},0).to({_off:true},14).wait(392).to({_off:false},0).to({_off:true},11).wait(227).to({_off:false},0).to({_off:true},14).wait(508).to({_off:false},0).to({_off:true},10).wait(108).to({_off:false},0).to({_off:true},10).wait(347).to({_off:false},0).to({_off:true},8).wait(109).to({_off:false},0).to({_off:true},13).wait(392).to({_off:false},0).to({_off:true},10).wait(228).to({_off:false},0).to({_off:true},14).wait(37));

	// black_note_l
	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_263.setTransform(1136.4569,562.3616,2.4309,2.431);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_264.setTransform(1136.4569,562.3616,2.4309,2.431);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_265.setTransform(1092.8221,562.3616,2.4309,2.431);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_266.setTransform(1092.8221,562.3616,2.4309,2.431);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_267.setTransform(1049.795,548.3832,2.4309,2.431);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_268.setTransform(1049.795,548.3832,2.4309,2.431);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_269.setTransform(963.1331,541.394,2.4309,2.431);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_270.setTransform(963.1331,541.394,2.4309,2.431);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_271.setTransform(919.4983,541.394,2.4309,2.431);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_272.setTransform(919.4983,541.394,2.4309,2.431);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_273.setTransform(832.8365,541.394,2.4309,2.431);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_274.setTransform(832.8365,541.394,2.4309,2.431);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_275.setTransform(727.6997,578.6495,2.4309,2.431);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_276.setTransform(727.6997,578.6495,2.4309,2.431);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_277.setTransform(684.6726,578.6495,2.4309,2.431);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_278.setTransform(684.6726,578.6495,2.4309,2.431);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_279.setTransform(598.4969,562.3616,2.4309,2.431);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_280.setTransform(598.4969,562.3616,2.4309,2.431);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_281.setTransform(555.4698,562.3616,2.4309,2.431);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_282.setTransform(555.4698,562.3616,2.4309,2.431);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_283.setTransform(511.835,548.3832,2.4309,2.431);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_284.setTransform(511.835,548.3832,2.4309,2.431);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_285.setTransform(425.7201,541.394,2.4309,2.431);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_286.setTransform(425.7201,541.394,2.4309,2.431);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_287.setTransform(382.1461,541.394,2.4309,2.431);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_288.setTransform(382.1461,541.394,2.4309,2.431);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_289.setTransform(296.0311,541.394,2.4309,2.431);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_290.setTransform(296.0311,541.394,2.4309,2.431);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_291.setTransform(252.4571,541.394,2.4309,2.431);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_292.setTransform(252.4571,541.394,2.4309,2.431);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_293.setTransform(166.2814,541.394,2.4309,2.431);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_294.setTransform(166.2814,541.394,2.4309,2.431);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_295.setTransform(1138.1585,357.2065,2.4309,2.431);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_296.setTransform(1138.1585,357.2065,2.4309,2.431);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_297.setTransform(1096.9546,357.2065,2.4309,2.431);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_298.setTransform(1096.9546,357.2065,2.4309,2.431);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_299.setTransform(1055.6292,343.228,2.4309,2.431);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_300.setTransform(1055.6292,343.228,2.4309,2.431);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_301.setTransform(972.9783,336.2388,2.4309,2.431);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_302.setTransform(972.9783,336.2388,2.4309,2.431);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_303.setTransform(931.1667,336.2388,2.4309,2.431);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_304.setTransform(931.1667,336.2388,2.4309,2.431);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_305.setTransform(848.5158,336.2388,2.4309,2.431);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_306.setTransform(848.5158,336.2388,2.4309,2.431);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_307.setTransform(747.5116,373.4336,2.4309,2.431);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_308.setTransform(747.5116,373.4336,2.4309,2.431);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_309.setTransform(706.1861,373.4336,2.4309,2.431);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_310.setTransform(706.1861,373.4336,2.4309,2.431);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_311.setTransform(623.4745,357.2065,2.4309,2.431);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_312.setTransform(623.4745,357.2065,2.4309,2.431);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_313.setTransform(582.2098,357.2065,2.4309,2.431);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_314.setTransform(582.2098,357.2065,2.4309,2.431);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_315.setTransform(540.2766,343.228,2.4309,2.431);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_316.setTransform(540.2766,343.228,2.4309,2.431);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_317.setTransform(457.7473,336.2388,2.4309,2.431);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_318.setTransform(457.7473,336.2388,2.4309,2.431);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_319.setTransform(415.8141,336.2388,2.4309,2.431);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_320.setTransform(415.8141,336.2388,2.4309,2.431);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_321.setTransform(333.2848,336.2388,2.4309,2.431);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_322.setTransform(333.2848,336.2388,2.4309,2.431);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_323.setTransform(291.3516,336.2388,2.4309,2.431);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_324.setTransform(291.3516,336.2388,2.4309,2.431);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_325.setTransform(208.8223,336.2388,2.4309,2.431);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_326.setTransform(208.8223,336.2388,2.4309,2.431);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263}]}).to({state:[{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263}]},645).to({state:[{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263}]},653).to({state:[{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263}]},1103).wait(649));

	// black_note_o
	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgHQgBgFACgHQAEgIAEgFIANgKQAHgFAHgCQAGgCAKAAQAJAAAFACQAHADADAFQADAEACAGQABAHgDAFQgDAIgFAFQgGAHgHAEQgHAFgIACQgIACgHAAQgIAAgGgCg");
	this.shape_327.setTransform(1127.6023,588.1305,2.4309,2.431);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgHQgBgFACgHQAEgIAEgFIANgKQAHgFAIgCQAFgCAKAAQAJAAAFACQAHADADAFQAEAEABAGQABAHgDAFQgDAIgFAFQgFAGgHAFQgJAFgHACQgHACgIAAQgIAAgGgCg");
	this.shape_328.setTransform(1083.9675,588.1305,2.4309,2.431);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#000000").s().p("AAKBcQAFgHAFgJQAJgTAAgTQAAgPgGgPQgIgQgPgNQgOgNgRgCIgDAAIAAg4IADAAIADAMQAEANAMALQAbAbAKARQAKAOAAAYIgBAPQgIAigPASg");
	this.shape_329.setTransform(1101.3303,558.5935,2.4309,2.431);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgGACgHQADgHAFgFQAGgHAHgEQAHgFAHgCQAGgCAKAAQAIAAAGACQAHADADAFQADAEACAGQABAHgDAFQgDAIgFAFQgGAHgHAEQgHAFgIACQgGACgJAAQgIAAgGgCg");
	this.shape_330.setTransform(1040.9404,574.1521,2.4309,2.431);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#000000").s().p("AAKBcQAGgHADgJQAKgTAAgTQAAgPgGgPQgIgQgPgNQgPgNgRgCIgCAAIAAg4IADAAIADAMQAEANAMALQAZAZAMATQAKAQAAAWQAAAIgBAHQgIAigPASg");
	this.shape_331.setTransform(1058.3032,544.6151,2.4309,2.431);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#000000").s().p("AgaAeQgFgBgEgGQgEgFgBgGQgBgFADgHQADgHAFgGQAFgGAHgEQAFgEAKgDQAIgCAHAAQAJAAAGACQAGADAEAEQADAFABAGQABAGgDAHQgCAHgGAFQgFAHgHAEQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_332.setTransform(954.256,567.1629,2.4309,2.431);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#000000").s().p("AgaAeQgFgBgEgGQgEgFgBgGQgBgFADgHQADgHAFgGQAFgGAHgEQAFgEAKgDQAIgCAHAAQAJAAAGACQAGADAEAEQAEAFAAAGQABAGgDAHQgCAHgGAFQgFAHgHAEQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_333.setTransform(910.6212,567.1629,2.4309,2.431);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#000000").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgHgQgQgNQgPgNgQgCIgDAAIAAg4IAEAAIACAMQAEANAMALQAbAbAKARQAKAOAAAXIgBAQQgIAigPASg");
	this.shape_334.setTransform(928.0065,537.6866,2.4309,2.431);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#000000").s().p("AgaAeQgFgBgEgGQgEgFgBgGQgBgFADgHQADgHAFgGQAFgGAHgEQAFgEAKgDQAIgCAHAAQAJAAAGACQAGADAEAEQAEAFAAAGQABAGgDAHQgCAHgGAFQgFAHgHAEQgIAFgHACQgIACgHAAQgIAAgHgDg");
	this.shape_335.setTransform(823.9593,567.1629,2.4309,2.431);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#000000").s().p("AgaAeQgFgCgEgFQgEgEgBgHQgBgGADgGQADgIAFgFQAFgGAHgEQAFgEAKgDQAGgCAJAAQAKAAAFACQAHAEADADQADAFABAGQABAGgDAGQgCAIgGAFQgFAGgHAFQgIAFgHACQgIACgHAAQgIAAgHgDg");
	this.shape_336.setTransform(737.2974,553.2452,2.4309,2.431);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#000000").s().p("AgaAeQgFgCgEgFQgEgEgBgHQgBgGADgGQADgIAFgFQAFgGAHgEQAFgEAKgDQAGgCAJAAQAKAAAFACQAHAEADADQADAFABAGQABAGgDAGQgCAIgGAFQgFAGgHAFQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_337.setTransform(694.2703,553.2452,2.4309,2.431);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#000000").s().p("AgiBeIAAg5IADAAQAQgCAPgNQAPgMAIgSQAGgOAAgPQAAgSgJgUQgFgLgFgFIABgBQAQASAHAiIABAPQAAAYgKAOQgKARgbAbQgMALgEANIgDANg");
	this.shape_338.setTransform(692.6946,582.3568,2.4309,2.431);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgHQgBgGADgGQACgGAGgHQAGgGAGgEQAIgFAHgCQAGgCAJAAQAJAAAGACQAHAEACAEQAEAEABAGQABAFgDAHQgCAGgGAHQgFAHgHAEQgIAFgHACQgIACgHAAQgIAAgHgCg");
	this.shape_339.setTransform(589.5271,588.1305,2.4309,2.431);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgHQgBgGADgGQACgGAGgHQAGgGAGgEQAHgFAIgCQAGgCAJAAQAJAAAGACQAFADAEAFQAEAEABAGQABAGgDAGQgDAIgFAFQgEAFgIAGQgIAFgHACQgIACgHAAQgIAAgHgCg");
	this.shape_340.setTransform(546.5001,588.1305,2.4309,2.431);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#000000").s().p("AAJBcQAFgEAGgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgOgNgRgCIgDAAIAAg4IADAAIACAMQAGAOALAKQAZAYAMAUQAKAQAAAWQAAAIgCAHQgGAigQASg");
	this.shape_341.setTransform(563.978,558.5935,2.4309,2.431);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgFADgIQACgFAGgHQAFgGAHgFQAIgFAHgCQAGgCAJAAQAHAAAIACQAHAEACAEQAEAEABAGQABAFgDAHQgCAGgGAHQgFAHgHAEQgIAFgHACQgGACgJAAQgIAAgHgCg");
	this.shape_342.setTransform(502.8653,574.1521,2.4309,2.431);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#000000").s().p("AAJBcQAFgEAFgMQAKgTgBgTQAAgPgFgPQgHgQgQgNQgOgMgSgDIgCAAIAAg4IADAAIADAMQAFANAKALQAYAXAOAVQAKAQAAAWQAAAIgBAHQgIAigPASg");
	this.shape_343.setTransform(520.3432,544.6151,2.4309,2.431);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#000000").s().p("AgZAeQgGgCgEgFQgEgFgBgGQgBgGADgGQADgHAFgGQAGgFAGgFQAFgEAKgDQAIgCAIAAQAIAAAGACQAGACAEAFQAEAFAAAGQABAGgCAHQgEAHgEAFQgFAFgIAGQgHAFgIACQgIACgHAAQgIAAgGgDg");
	this.shape_344.setTransform(416.7683,567.1629,2.4309,2.431);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#000000").s().p("AgaAeQgGgCgEgFQgEgFAAgGQgBgGADgGQACgGAGgHQAFgFAHgFQAFgEAKgDQAIgCAHAAQAIAAAHACQAFACAEAFQAEAFABAGQABAFgDAIQgCAGgGAGQgEAFgIAGQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_345.setTransform(373.156,567.1629,2.4309,2.431);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#000000").s().p("AAJBcQAFgEAFgMQAJgTAAgTQAAgPgFgPQgHgQgQgNQgOgNgRgCIgDAAIAAg4IADAAIADAMQAFAOALAKQAZAYAMAUQAKAQAAAVQAAAJgBAHQgHAigQASg");
	this.shape_346.setTransform(390.6542,537.6866,2.4309,2.431);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#000000").s().p("AgZAeQgGgCgEgFQgEgFgBgGQgBgGADgGQADgGAFgHQAEgEAIgGQAFgEAKgDQAIgCAHAAQAJAAAGACQAGACAEAFQAEAFAAAGQABAGgCAHQgEAHgEAFQgHAHgGAEQgHAFgIACQgIACgHAAQgIAAgGgDg");
	this.shape_347.setTransform(287.0793,567.1629,2.4309,2.431);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#000000").s().p("AgZAeQgGgCgEgFQgEgFgBgGQgBgGADgGQADgHAFgGQAGgFAGgFQAFgEAKgDQAIgCAIAAQAIAAAGACQAGACAEAFQAEAFAAAGQABAGgCAHQgEAHgEAFQgFAFgIAGQgHAFgIACQgIACgHAAQgIAAgGgDg");
	this.shape_348.setTransform(243.4445,567.1629,2.4309,2.431);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#000000").s().p("AAJBcQAFgEAGgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgOgNgRgCIgDAAIAAg4IADAAIACAMQAFANAMALQAZAZALATQALAPAAAWQAAAJgCAHQgGAigQASg");
	this.shape_349.setTransform(260.9653,537.6866,2.4309,2.431);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#000000").s().p("AgZAeQgGgCgEgFQgEgFgBgGQgBgGADgGQADgGAFgHQAEgEAIgGQAFgEAKgDQAIgCAHAAQAJAAAGACQAGACAEAFQAEAFAAAGQABAGgCAHQgEAHgEAFQgHAHgGAEQgHAEgIADQgIACgHAAQgIAAgGgDg");
	this.shape_350.setTransform(157.3904,567.1629,2.4309,2.431);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#000000").s().p("AgZAeQgGgCgEgEQgEgGgBgGQgBgGADgGQADgHAFgGQAEgFAIgFQAFgDAKgEQAIgCAHgBQAJAAAGAEQAGACAEAEQAEAFAAAGQABAGgCAGQgEAJgEAEQgHAHgGAEQgHAEgIADQgIADgHAAQgIAAgGgEg");
	this.shape_351.setTransform(1129.2675,382.9754,2.4309,2.431);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#000000").s().p("AgZAeQgGgCgEgEQgEgGgBgGQgBgGADgGQACgGAGgHQAGgGAGgEQAFgDAKgEQAIgCAIgBQAIAAAGAEQAGACAEAEQAEAFAAAGQABAGgCAGQgEAJgEAEQgFAGgIAFQgHAFgIACQgIADgHAAQgIAAgGgEg");
	this.shape_352.setTransform(1087.942,382.9754,2.4309,2.431);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#000000").s().p("AAJBcQAFgEAGgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgOgNgRgCIgDAAIAAg4IADAAIACAMQAFANAMALQAZAZALATQALAPAAAWQAAAIgCAIQgGAigQASg");
	this.shape_353.setTransform(1105.4628,353.4991,2.4309,2.431);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#000000").s().p("AgaAeQgGgCgEgFQgEgFAAgGQgBgFADgHQADgIAFgFQAFgGAHgEIAPgHQAGgCAJAAQAKAAAFACQAHAEACADQADAEACAHQABAGgDAGQgCAGgGAHQgFAHgHAEQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_354.setTransform(1046.7159,369.0577,2.4309,2.431);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#000000").s().p("AAKBcQADgEAHgMQAJgUAAgSQAAgPgGgPQgIgQgPgNQgPgNgQgCIgDAAIAAg4IAEAAIACAMQAEAOALAKQAbAaALASQAKAQAAAVQAAAJgCAHQgGAigQASg");
	this.shape_355.setTransform(1064.1374,339.5207,2.4309,2.431);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgGAFgGQAFgFAIgGQAHgFAIgCQAIgCAHAAQAIAAAGADQAGACAEAFQAEAEABAGQABAGgDAGQgDAHgFAGIgMALQgEADgLAEQgHACgJAAQgJAAgFgCg");
	this.shape_356.setTransform(964.1098,362.0078,2.4309,2.431);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgFADgIQACgFAGgHQAFgGAHgFQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACADAFQAEAEABAGQABAHgDAFQgBAGgHAHQgGAIgGADQgFAEgKADQgHACgIAAQgKAAgFgCg");
	this.shape_357.setTransform(922.2534,362.0078,2.4309,2.431);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#000000").s().p("AAKBcQAEgEAGgMQAJgVAAgRQAAgPgGgPQgIgRgPgMQgPgMgRgDIgCAAIAAg4IADAAIADALQAFAPAKAKQAbAbALARQAKAQAAAVQAAAJgCAHQgGAhgQAUg");
	this.shape_358.setTransform(939.6749,332.5315,2.4309,2.431);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgGAFgGQAFgFAIgGQAHgFAIgCQAIgCAHAAQAIAAAGADQAGACAEAFQAEAEABAGQABAGgDAGQgDAHgFAGIgMALQgEADgLAEQgHACgJAAQgJAAgFgCg");
	this.shape_359.setTransform(839.6473,362.0078,2.4309,2.431);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgFgBgFQgBgFADgIQACgFAGgIQAFgFAHgFQAIgFAHgCQAIgDAHABQAJAAAGACQAGADADAFQAEADABAHQABAHgDAFQgBAFgHAIQgFAHgHAEQgFADgKAEQgIADgHgBQgJAAgGgCg");
	this.shape_360.setTransform(757.0731,348.0901,2.4309,2.431);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#000000").s().p("AgaAfQgFgCgEgGQgEgFgBgFQgBgHADgGQADgIAFgFQAFgGAHgEQAIgFAHgCQAIgDAHABQAJAAAGACQAGADAEAFQAEAEAAAGQABAHgDAFQgCAHgGAGQgFAGgHAFIgPAHQgIADgHgBQgJAAgGgCg");
	this.shape_361.setTransform(715.7839,348.0901,2.4309,2.431);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#000000").s().p("AgiBdIAAg4IADAAQAQgCAPgNQARgOAGgPQAGgOAAgQQAAgTgJgTQgFgKgFgGIABgBQARATAGAhIABAQQAAAXgKAOQgKARgbAbQgLALgFANIgCAMg");
	this.shape_362.setTransform(714.2081,377.2017,2.4309,2.431);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#000000").s().p("AgZAeQgGgCgEgEQgEgGgBgGQgBgGADgGQADgHAFgGQAGgGAGgEQAFgDAKgEQAIgCAIgBQAIAAAGAEQAGACAEAEQAEAFAAAGQABAGgCAGQgEAJgEAEQgFAGgIAFQgHAFgIACQgIADgHAAQgIAAgGgEg");
	this.shape_363.setTransform(614.5227,382.9754,2.4309,2.431);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#000000").s().p("AgaAeQgGgCgEgEQgEgGAAgGQgBgFADgHQACgGAGgHQAFgGAHgEIAPgHQAIgCAHgBQAIAAAHAEQAGACADAEQAEAFABAGQABAFgDAHQgCAGgGAHQgFAHgHAEQgIAFgHACQgIADgHAAQgJAAgGgEg");
	this.shape_364.setTransform(573.2401,382.9754,2.4309,2.431);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#000000").s().p("AAKBcQADgEAHgMQAIgTABgTQgBgPgFgPQgIgQgPgNQgPgNgRgCIgCAAIAAg4IADAAIADAMQAEAOALAKQAaAYAMAUQAKAQAAAVQAAAIgCAIQgGAigQASg");
	this.shape_365.setTransform(590.718,353.4991,2.4309,2.431);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#000000").s().p("AgaAeQgFgCgEgFQgEgFgBgGQgBgGADgGQADgIAFgFQAFgGAHgEQAFgEAKgDQAGgCAJAAQAKAAAFACQAHAEADADQADAFABAGQABAGgCAGQgEAIgFAFQgFAGgHAFQgIAFgHACQgIACgHAAQgIAAgHgDg");
	this.shape_366.setTransform(531.3813,369.0577,2.4309,2.431);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#000000").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgGgPgRgOQgPgNgQgCIgDAAIAAg4IADAAIADAMQAFANALALQAbAbAKARQAKAOAAAXIgBAQQgGAhgRATg");
	this.shape_367.setTransform(548.7848,339.5207,2.4309,2.431);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAIgFAHgCQAIgCAHAAQAIAAAHADQAGACADAFQAEAEABAGQABAFgDAHQgBAGgHAHQgGAIgGADQgFAEgKADQgHACgIAAQgKAAgFgCg");
	this.shape_368.setTransform(448.7573,362.0078,2.4309,2.431);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#000000").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgGAGQgGAHgGAEIgPAHQgGACgJAAQgJAAgGgCg");
	this.shape_369.setTransform(406.937,362.0078,2.4309,2.431);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#000000").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgGgPgRgOQgPgNgQgCIgDAAIAAg4IAEAAIACALQAFAOALALQAbAbAKARQAKAPAAAWIgBAQQgGAggRAVg");
	this.shape_370.setTransform(424.3223,332.5315,2.4309,2.431);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAIgFAHgCQAIgCAHAAQAIAAAHADQAGACADAFQAEAEABAGQABAFgDAHQgBAGgHAHQgFAHgHAEQgFAEgKADQgHACgIAAQgKAAgFgCg");
	this.shape_371.setTransform(324.2948,362.0078,2.4309,2.431);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#000000").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgGAGQgGAHgGAEIgPAHQgGACgJAAQgJAAgGgCg");
	this.shape_372.setTransform(282.4745,362.0078,2.4309,2.431);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#000000").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgGgPgRgOQgPgNgQgCIgDAAIAAg4IAEAAIACALQAFAOALALQAbAbAKARQAKAPAAAWIgBAQQgHAhgQAUg");
	this.shape_373.setTransform(299.8598,332.5315,2.4309,2.431);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#000000").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAHgFAIgCQAIgCAHAAQAIAAAHADQAFACAEAFQAEAEABAGQABAFgDAHQgBAGgHAHQgFAHgHAEQgFAEgKADQgHACgIAAQgKAAgFgCg");
	this.shape_374.setTransform(199.8323,362.0078,2.4309,2.431);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327}]}).to({state:[{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327}]},645).to({state:[{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327}]},653).to({state:[{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327}]},1103).wait(649));

	// black_text
	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#000000").s().p("AgtAfQgBAAgBgBQAAAAgBAAQAAgBAAAAQAAAAABAAQABgBAFAAIAIAAIAZABIAAgdQAAAAAAAAQAAgBAAAAQAAgBgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAQgBgBgBAAQAAAAgBAAQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAABAAIAIABQABAAABAAQAAAAABABQAAAAAAAAQAAABAAAAIgBADIAAAdIAZgBQAHgDAIABQAKAAAAADQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgIAAIg5ABIgIACIgCAAQgEAAgLgEgAAUAQQAAgBAAAAQAAAAgBgBQAAAAAAgBQAAgBAAAAIADgMIADgdIgjABIgJACQgEACgKgFIgCgCQAAgBAGAAQAFABAYAAQAUgBADgBIAFgBIAEAAQABABABAAQABAAAAABQABAAAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAAAQgBABAAAAIgFAcIgEALQAAABgBABQAAAAAAABQgBAAAAABQAAAAgBAAIgBAAg");
	this.shape_375.setTransform(1127.8474,650.3422,2.4309,2.431);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#000000").s().p("AgUAvQgEgCAAgEIAAgIQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgDgBIgDgCQAAAAAAAAQAAAAABAAQAAgBABAAQABAAABAAIAFAAIAGABIAlAAIAAgNIgdAAIgKACQgDABgIgEIgBgCIAFAAIAGAAIAWAAQAPAAACgBIADgBIAFAAQABABAAAAQABABAAAAQAAAAAAAAQAAABAAAAIgCADIgCAMIACAAQABAAAAAAQAAAAAAAAQAAABABAAQAAAAAAABIgBABIgEABIgqAAIAAAJQAAABAAAAQAAABABAAQAAAAAAABQAAAAABAAIADABIAbgBIAEgBIAFgBIAHAAQAFACgBABQAAACgFABIgrAAgAgugCQgCAAAAAAQgBgBAAAAQgBAAAAAAQABgBAAAAIAGAAIAJAAIAhABIAAgOIgOAAQgEAAgDgCQgEAAAAgFIAAgNQAAAAAAgBQgBgBAAAAQAAgBAAAAQAAgBgBAAIgFgBIgDgCQAAAAAAgBQAAAAABAAQABAAABgBQAAAAACAAIAJAAQABABABAAQAAAAABAAQAAAAAAABQAAAAAAAAIAAAFIAAAPIABADIADAAIAZAAIAEAAIAEgBQACgCADAAIAHABQAFAAgBADQAAADgFAAIgYAAIAAAOIAOAAIAHgBQAGgCAKAAQAJABAAACQAAABgBABQAAAAAAAAQgBABgBAAQAAAAgBAAIhFAAIgIABIgCAAQgFAAgJgDg");
	this.shape_376.setTransform(1084.7596,650.9886,2.4309,2.431);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#000000").s().p("AAgAtIgBhTQAAgEgCgCIgGgDIgCgCQABgBAEAAIAFABIAFACQABAAABAAQAAABABAAQAAAAAAABQAAAAAAABIgBAGIgBBSQgBAHgCAAQgCAAAAgGgAggAGQgGgGAAgHQAAgIAEgEQAEgFAIgDIADAAIABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgCgCQABgCAEAAQAFAAABACIABACIgBACIABABIAEABQAGACAEAFQAEAFAAAHQAAAHgHAGQgGAHgLAAQgLAAgHgHgAgagTQgFAFAAAHQAAAHAFAEQAFAEAHAAQAIAAAEgEQAEgEAAgHQAAgHgEgFQgEgFgIAAQgHAAgFAFg");
	this.shape_377.setTransform(1041.0524,651.0494,2.4309,2.431);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#000000").s().p("AgSAwQgEgCAAgFIAAgUQAAgEgDgBIgFgBIgCgCIAFgBIAMABIAXAAIAFgBIAFgBIAGAAQAFACAAACQgBACgEAAIgnAAIAAANIAWgBIAEgBIAGgBIAGAAQAGACgBABQgBACgFAAIglABIAAAJQAAABAAAAQAAABAAAAQAAAAABAAQAAABAAAAIAEABIARAAIAEgBIAEgBIAGgBIAGAAQAFACAAACQgBACgFAAIgkAAIgIgBgAgwALQAJgFAMgJQAOgNAHgQIgUABIgCABIgFABQgCAAgHgDQgBAAgBAAQAAgBAAAAQgBAAAAgBQAAAAABAAIAFgBIAEABIATAAIAJgCQAAAAABAAQAAAAABgBQAAAAABAAQABAAABAAIADABQAEABgCACIgDAFQgJAQgMAKQgLAJgKAEIgGACQgBgBAAAAQAAAAAAAAQAAAAAAAAQABgBAAAAgAAVADIgBgnQAAgEgCgCIgGgDQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQABAAABAAIAFABIAGACQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABIgBAGIAAAUIAFgBQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAIAEgBIAFAAQAGABgBACQgBADgEAAIgSAAIAAAFIgBAKQgBAGgCAAQAAAAgBgBQAAAAAAAAQgBgBAAgBQAAgBAAgBg");
	this.shape_378.setTransform(956.1456,650.5632,2.4309,2.431);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#000000").s().p("AAhAtIgBhTQAAgEgCgCIgGgDQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABAAABAAIAFABIAGACQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAGIAABAIgBASQAAAHgDAAQgCAAAAgGgAgnAWIAAgCQAJgEANgPQAOgOAGgQIgQABIgDAAIgCABIgFABQgDAAgGgDQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIAFAAIAKABIANgBQAHAAABgBIAFgBIAEABQABAAABAAQABABAAAAQAAABAAAAQAAABgBAAIgQAZIALAJIADABIADABIAEAFIADAEQAAABAAABQABABgBAAQAAABAAAAQgBAAgBAAQgCABgEgEIgSgSQgJAIgHAGIgMAIIgGACIAAAAg");
	this.shape_379.setTransform(910.3926,651.0494,2.4309,2.431);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#000000").s().p("AgVAtQgDgBAAgGIAAgJQAAAAAAgBQAAgBgBAAQAAgBAAAAQAAgBgBAAQgBgCgEAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAgBgBIAFgBIAEAAIAFAAQABAAABAAQAAABABAAQAAAAABABQAAAAAAAAIgBAFIAAALQAAABAAABQAAAAAAABQAAAAABAAQAAAAAAABIADABIAdgBIAEgCQACgBAEAAIAGAAQAGABgBADQgBACgFABIgsAAgAguAHQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABgBIAOAAIAMAAIALABIAegBIAIAAQAGgCAJAAQAKABAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIhNABIgCABQgFAAgJgEgAgWgKQgEgCAAgFIAAgSQAAAAAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAQgCgCgEgBIgCgBQAAAAAAgBQABAAAAAAQABAAABAAQABgBABAAIAFAAIAHACIAYAAIAIgCIAGgBIAGABQAFABAAACQgBADgFAAIgsAAIAAAWIACACIADABIAVAAIAIgCQACgBAEAAIAGAAQAFACgBACQgBACgEABIgpAAg");
	this.shape_380.setTransform(823.0434,651.1102,2.4309,2.431);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#000000").s().p("AAkAtIgBhUQAAgDgBgCIgHgDQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABAAIAFABIAGACQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABIgBAGIgBBSQgBAHgDAAQgCAAABgGgAARApIgBgtIAAAAIgEAAIgEACQgCAAgHgDQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAgBAEABIAPgBIAAgaQAAgEgBgCIgHgDIgBgCQAAAAAAAAQAAAAABgBQAAAAABAAQABAAABAAIAKADQABAAABABQAAAAAAAAQABABAAAAQAAABAAAAIgBAGIAAA4IgBASQgBAHgDAAQgBAAAAgGgAgpAWQAAAAgBgBQAAAAAAAAQAAAAAAAAQABAAAAgBQAKgHAJgMQAKgMAGgRIgOACIgCAAIgFABQgCAAgHgDQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABAAIAEABIAQAAIAGgCIAGAAIACAAQABABABAAQAAAAAAABQAAAAAAAAQAAABAAAAIgNAYIAIAIIAFADIAEAFIABAFQABABAAABQgBAAAAABQAAAAAAABQgBAAAAAAQgDAAgEgFIgMgRQgJAJgEAEIgLAJIgEACIgBAAg");
	this.shape_381.setTransform(736.0863,651.0494,2.4309,2.431);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#000000").s().p("AgEAxIgIgBQgDgCAAgFIAAgLQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAgBgBAAIgFgCIgDgCIAEgBIAKABQABAAABAAQABAAAAAAQABAAAAABQAAAAgBAAIAAAFIAAAOIABAEIADAAIAVAAIAEAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFABAAADQgBACgFABgAAaAbIgBgnIgBAAIgBAAIgKACQgBABgIgDIgBAHQgCAEgCABQgDADgEABQgEACgGAAQgLABgHgHQgFgFAAgHQAAgGAEgGQAEgEAIgDIACAAQABAAAAgBQABAAAAAAQAAgBAAAAQgBAAAAAAIgCgCQAAgCAFAAQAEAAACACIAAACIAAACIABAAQAGACAFAEQAEAEABAGIABABIAUgBIAAgUQAAgEgCgCIgGgDQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQABgBABAAIAFABIAGADQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAABIgBAGIAAAxIgBALQgBAGgCAAQAAAAAAAAQgBgBAAAAQAAgBAAgBQgBAAAAgBgAgdgXQgFAFAAAGQAAAGAFAEQAEAFAHAAQAHAAAEgFQAFgEAAgGQAAgGgFgFQgEgFgHAAQgHAAgEAFg");
	this.shape_382.setTransform(694.0371,650.3808,2.4309,2.431);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#000000").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAIAGgBIAIAAIAMABIAYAAIAXgCQAHgBAIAAQAKAAAAADQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgrAAIAAAjQgCAIgBAAQgCAAAAgHgAgWgJIgBgEIgCgaQAAgBgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAIgEgCQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABgBAEAAIAHAAIAFABIARAAIASgBIAFgBIAFAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAABIgtABIgBADIgDABgAgRgQIAkAAIABgaIgmAAg");
	this.shape_383.setTransform(589.7977,651.6976,2.4309,2.431);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#000000").s().p("AgPArQgGgGAAgHQAAgHAFgEQAEgFAJgBIABgBIAAgBIgBgBIgBgBQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABAAQAFAAABACIAAABIAAACIAAAAIAAABQAJABAEAFQAEAFAAAGQAAAHgGAGQgHAFgJAAQgJAAgHgFgAgJAUQgEAEAAAGQAAAFAEAFQAEAEAGAAQAGAAAFgEQAEgEAAgGQAAgGgEgEQgEgEgHAAQgGAAgEAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAQABgBAFAAIAJAAIALABIAVAAIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCIgCgBQAAgBAAAAQAAAAABgBQABAAAAAAQABAAACAAIAFAAIAHACIAYAAIAEgBQABAAAAAAQABAAAAAAQABAAABgBQAAAAABAAIAFgBIAGAAQAFABAAADQgBACgEAAIgtAAIAAATIACADIADABIAVgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAGABgBACQgBADgFAAIgWAAIAAAOIAOAAIAIgBQAHgCAJAAQAJAAAAAEQAAAAgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIhFAAIgIACIgDAAQgFAAgIgEg");
	this.shape_384.setTransform(546.2081,651.414,2.4309,2.431);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#000000").s().p("AAkAtIAAgtIgMAAIAAAWIgBASQgBAHgCAAQgCAAAAgGIgBhLQAAgEgCgCIgFgDIgCgCQAAAAAAAAQABAAAAgBQABAAAAAAQABAAABAAIAKADQABAAABABQAAAAAAAAQAAABABAAQAAABgBAAIgBAGIABAeIAMAAIgBgjQAAgDgBgCIgGgDQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABAAABAAIAEABIAGACQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAGIAABAIgBASQAAAHgDAAQgCAAAAgGgAgUAYQAFgEAIgPQAIgNACgSIgEABIgDAAIgCABIgDAAIgBABIAAACQgEANgIALQgKAMgEAEQgEADgCAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAFgEAJgOQAIgNADgPIgGABIgEAAIgDACQgDAAgFgDIgCgCQAAAAAAAAQABgBAAAAQABAAAAAAQABABABAAIAJAAIAFAAIAEgBQABAAAAgBQABAAABAAQAAAAABAAQAAAAABAAIADAAIABABIABABIADAAIALgCIAEAAQABABAAAAQAAAAAAABQABAAgBABQAAAAAAABIgDAFQgDAOgHAMQgIANgGAFQgEAEgCAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQABAAAAgBg");
	this.shape_385.setTransform(501.8813,651.0494,2.4309,2.431);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#000000").s().p("AAgAtIgBg0IgCAAIgKACIgJgCQAAAHgHAGQgFAHgMAAQgLAAgHgHQgGgGAAgHQAAgHAEgGQAEgEAJgDIACAAIABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgCgCQABgCAFAAQAEABABABIABACIgBACIABABIAEABQAFACAEAEQAEAEAAAFIACABIAUgBIAAgbQAAgEgCgCIgGgDIgCgCQABgBAEAAIAEABIAGACQABAAABAAQAAABABAAQAAAAAAABQAAAAAAABIgBAGIgBBSQgBAHgCAAQgCAAAAgGgAgagTQgFAFAAAHQAAAHAFAEQAFAEAHAAQAIAAAEgEQAEgEAAgHQAAgGgDgGQgFgFgIAAQgHAAgFAFg");
	this.shape_386.setTransform(415.8228,651.0494,2.4309,2.431);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#000000").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAIAGgBIAIAAIAMABIAYAAIAXgCQAHgBAIAAQAKAAAAADQAAABAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIgqAAIgBAjQgCAIgBAAQgCAAAAgHgAgWgJIgBgEIgCgaQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAIgFgCQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABgBAEAAIAHAAIAFABIARAAIASgBIAFgBIAFAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAABIgtABIgBADIgCABgAgRgQIAkAAIABgaIgmAAg");
	this.shape_387.setTransform(372.8392,651.6976,2.4309,2.431);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#000000").s().p("AgPArQgGgGAAgHQAAgHAFgEQAEgFAJgBIABgBIAAgBIgBgBIgBgBQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABAAQAEAAACACIAAABIAAACIAAAAIAAABQAJABAEAFQAEAEAAAHQAAAHgGAGQgHAFgKAAQgIAAgHgFgAgKAUQgDAEAAAGQAAAGAEAEQAEAEAFAAQAHAAAFgEQAEgEAAgGQAAgGgEgEQgEgEgIAAQgFAAgFAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAQABgBAFAAIAIAAIAMABIAIAAIANAAIAAgOIgNAAQgEAAgDgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCIgCgBQAAgCAFAAIAFAAIAHACIAYAAIAEgBQABAAAAAAQABAAAAAAQABAAABgBQAAAAABAAIAFgBIAGAAQAGABgBADQgBACgEAAIgtAAIAAATIACADIACABIAWgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAGABgBACQgBADgFAAIgWAAIAAAOIAWgBQAIgCAIAAQAJAAAAAEQAAAAgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIg+AAIgPACIgDAAQgEAAgJgEg");
	this.shape_388.setTransform(286.8302,651.414,2.4309,2.431);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#000000").s().p("AgBAqIgBgkIgSABIgJACQgEABgMgFQgCAAAAgBQgBAAAAAAQgBgBAAAAQABAAAAAAIAGgBIAJAAIALABIAYAAIAXgCQAHgBAJAAQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIgqAAIgBAjQgBAIgCAAQgBAAAAgHgAgWgJIgBgEIgCgaQAAgBgBgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgFgCQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAFAAIAGAAIAFABIARAAIATgBIAEgBIAFAAQABABABAAQAAABAAAAQABAAgBABQAAAAAAAAIgCAEIgEAXIADAAQAAAAAAAAQABAAAAAAQAAABAAAAQABAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBAAAAABIgtABIgBADIgCABgAgQgQIAkAAIABgaIgmAAg");
	this.shape_389.setTransform(243.6949,651.6976,2.4309,2.431);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#000000").s().p("AgPArQgGgGAAgHQAAgHAEgEQAGgFAIgBIAAgBIABgBIgBgBIgBgBQAAgCAEAAQAEAAABACIABABIgBACIAAAAIABABQAIABAFAFQAEAEAAAHQAAAHgGAGQgHAFgKAAQgIAAgHgFgAgKAUQgEAFAAAFQAAAFAEAFQAFAEAFAAQAHAAAEgEQAEgEAAgGQAAgGgDgEQgFgEgHAAQgGAAgEAEgAgvAAQgBAAAAAAQgBAAAAAAQgBAAABAAQAAgBAAAAQABgBAFAAIAIAAIAMABIAIAAIANAAIAAgOIgNAAIgIgBQgDgCAAgFIAAgOQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAIgFgCIgCgBQAAgBAAAAQAAAAABgBQAAAAABAAQABAAABAAIAGAAIAHACIAYAAIAEgBQABAAAAAAQABAAABAAQAAAAABgBQAAAAAAAAIAGgBIAGAAQAGABgBADQgBACgFAAIgsAAIAAATIABADIADABIAWgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAFABgBACQgBADgEAAIgXAAIAAAOIAPAAIAIgBQAHgCAIAAQAKAAgBAEQAAAAAAAAQAAABgBAAQAAAAgBABQgBAAgBAAIg9AAIgPACIgCAAQgFAAgKgEg");
	this.shape_390.setTransform(158.2815,651.414,2.4309,2.431);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#000000").s().p("AgEAFQgDgCAAgDQAAgCADgCQACgDACAAQADAAACADQADACAAACQAAADgDACQgCADgDAAQgCAAgCgDg");
	this.shape_391.setTransform(162.5743,459.1541,2.4309,2.431);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#000000").s().p("AgSArQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQALAAACgBQACgCAAgFIAAgwIgBgHQgBgCgFAAIgIAAQAAAAgBAAQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAAAgBQAJAAAEgCQAFgCAAgGQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABIAABHQAAAGACABQACABAKAAQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBAAgBAAg");
	this.shape_392.setTransform(150.5413,446.5735,2.4309,2.431);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#000000").s().p("AgsAgQgBgBgBAAQgBgBAAAAQgBgBAAAAQAAAAABAAIAGgBIAIABIAMAAQABABAEgBIAIAAIAAgcQAAgBAAAAQAAAAAAgBQAAAAgBgBQAAAAAAAAIgFgCQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAAAIAFgBIAEAAIAEABQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABIgBACIAAAdIAQAAIAJgBQAGgCAKAAQAJABAAADQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAIhJADIgDAAQgEAAgJgDgAAUAQQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBIAEgZIABgQIgjACIgJABQgEACgKgFQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAAAQgBgCAHABQAKABATAAQATAAAEgBIAFgCIAEABQABAAABAAQABAAAAABQAAAAAAAAQAAABAAAAIgCAFIgFAbIgEALQgCAEgCAAIAAAAg");
	this.shape_393.setTransform(1126.7089,445.0997,2.4309,2.431);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#000000").s().p("AAUAtIgBhUQAAgDgBgCIgHgDQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgBAEAAIALACQAAABABAAQAAAAABABQAAAAAAABQAAAAAAAAIgBAGIAAAlIAFgBQABAAAAAAQABgBAAAAQABAAAAAAQABgBAAAAIAEgBIAGAAQAEACAAACQAAACgFAAIgSAAIAAAsQgCAHgCAAQgCAAAAgGgAgvAbQgBAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAQAJgFAMgPQAMgMAJgUIgUAAIgEABIgBAAIgFABIgJgDQgBAAgBgBQAAAAAAAAQAAgBAAAAQAAAAAAAAIAFgBIAKABIAPAAIAKgBIAFgBIADAAQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAIgEAFQgHAQgNAOQgMANgJAFIgGACIAAAAg");
	this.shape_394.setTransform(1085.512,445.905,2.4309,2.431);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#000000").s().p("AAgAtIgBhUQAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAABAAQABAAABAAIALACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAIgBAGIAABBIgBASQAAAHgDAAQgBAAgBgGgAggAGQgGgGAAgHQAAgHAEgGQAFgFAIgCIADgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgDAFABQAFABABABIAAACIgBACIABABIAEABQAGACAEAFQAEAEAAAIQAAAHgHAGQgFAHgMAAQgMAAgGgHgAgagTQgFAEAAAIQAAAHAFADQAFAFAHAAQAIAAAFgEQADgEAAgHQAAgHgDgFQgFgFgIAAQgHAAgFAFg");
	this.shape_395.setTransform(1042.7758,445.905,2.4309,2.431);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#000000").s().p("AgSAwQgEgCAAgFIAAgUQAAgEgDgBIgEgBIgCgCIAEgBIAHAAIAGABIAXAAIAEgBIAFgBIAHAAQAFABgBACQAAACgFAAIgnABIAAAMIAWAAIAKgCIAGAAQAGABgBACQgBACgFAAIglABIAAAJQAAAAAAABQAAAAABABQAAAAAAAAQAAABABAAIADABIAVgBIAKgCIAGAAQAGABgBACQgBADgEAAIglAAIgIgBgAgwAMQgBAAAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAJgEANgLQANgLAHgRIgJAAIgLABIgCABIgFABQgDAAgGgDIgCgCQABgBAAAAQAAAAABAAQAAAAABAAQABAAABAAIAEABIATgBQAHAAACgBIAFgBIADABQABAAABAAQABABAAAAQAAABAAAAQAAABgBAAIgDAFQgIAQgNAKQgMAJgJAEIgFABIgBAAgAAVADIgBgoQAAgDgBgCIgHgDQAAAAgBgBQAAAAAAAAQAAAAgBgBQAAAAAAAAQABgBAEAAIALACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAIgBAGIABAVIAEgBIAEgCIAEAAIAGAAQAEABAAACQAAADgFAAIgRAAIAAAFQAAAGgCAEQAAAFgDAAIAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQgBgBAAgBg");
	this.shape_396.setTransform(963.0611,445.4188,2.4309,2.431);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#000000").s().p("AAiAtIgBhUQAAgDgCgCIgGgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAFAAIAKACQABABABAAQAAAAABABQAAAAAAABQAAAAAAAAIgBAGIgBBTQgBAHgCAAQgCAAAAgGgAgmAWQgEAAAEgCQAJgEANgPQANgNAHgRIgJAAIgKABIgCAAIgFACIgJgDQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQACgBADABIAEAAIATAAIAIgBQACgBADAAIAEABQABAAABAAQAAABAAAAQAAAAAAABQAAAAAAABIgQAZIAKAIIADABIADACQADABACAEIACAEQABABAAABQAAABAAAAQAAABgBAAQAAAAgBAAQgDABgEgFIgSgRQgIAIgIAGIgLAIIgFACIgBAAg");
	this.shape_397.setTransform(920.129,445.905,2.4309,2.431);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#000000").s().p("AgUAtQgEgCAAgFIAAgJQAAgBAAAAQAAgBAAgBQgBAAAAgBQAAAAAAgBIgGgBIgCgCQgBAAAAAAQABAAAAAAQABgBAAAAQABAAACAAIAJAAQABAAABAAQAAAAABABQAAAAAAAAQABABAAAAIgBAFIAAAMQAAAAAAAAQAAABAAAAQABAAAAABQAAAAABAAIADABIAYAAIAEgBQABAAAAAAQABAAABAAQAAAAABAAQAAgBABAAIAFgBIAHAAQAFACgBACQgBADgEAAIgtAAgAguAHQgCAAAAgBQgBAAAAAAQgBgBAAAAQABAAAAgBIAGgBIA9ABIAIAAQAGgCAKAAQAKAAgBAEQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIhEAAQgFAAgEACIgBAAQgEAAgLgEgAgOgKIgIgBQgDgBAAgFIAAgSQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgBAAAAIgFgCQgBAAAAAAQgBAAAAAAQAAgBAAAAQgBAAAAAAQAAgBAFgBIAGABIAHABIAYAAIADAAQABAAAAgBQABAAABAAQAAAAABAAQAAgBABAAIAFgBIAHABQAEABAAACQgBADgEgBIgsAAIAAAWQAAABAAAAQAAABAAAAQAAAAAAABQABAAAAAAIADABIAVAAIAEgBQABAAAAAAQABAAAAAAQABAAAAAAQABgBABAAIAFgBIAGAAQAFABAAADQgBACgFAAg");
	this.shape_398.setTransform(839.8831,445.9658,2.4309,2.431);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#000000").s().p("AAgAtIgBgnQgJAEgRAFQgQAEgIAAQgFAAgBgCQgCgBAAgFIAAggQAAgBAAAAQAAgBgBgBQAAAAAAgBQgBAAAAAAIgGgCIgDgBQAAgBAAAAQAAAAABAAQAAgBABAAQABAAACAAIAFAAIAIABIAIAAQAGABACgCQACgCAEAAIAIABQABAAABAAQABABAAAAQABAAAAABQAAAAAAABQAAABgGABIgdABIAAAiIACADIADABQAIAAAOgDQAOgDALgEIAAgqQAAgDgCgCIgGgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAFAAIAKACQABABABAAQAAAAABABQAAAAAAABQAAAAgBAAIAAAGIgBBTQgBAHgCAAQgCAAAAgGg");
	this.shape_399.setTransform(756.6457,445.905,2.4309,2.431);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#000000").s().p("AAgAtIgBg1IgBABIgBAAIgKACQgEAAgFgDQAAAIgGAGQgGAHgMAAQgMAAgGgHQgGgHAAgGQAAgHAEgGQAFgFAIgCIACAAIABgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgDAFABQAFABABABIAAACIgBACIABABIAEABQAGACADAEQAEADABAGIABAAIACABIASgBIAAgcQAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAABAAQABAAABAAIALACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAIgBAGIAABBIgBASQAAAHgDAAQgBAAgBgGgAgagTQgFAFAAAHQAAAGAFAEQAFAFAHAAQAIAAAFgEQADgEAAgHQAAgHgDgFQgFgFgIAAQgHAAgFAFg");
	this.shape_400.setTransform(715.3324,445.905,2.4309,2.431);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#000000").s().p("AgCAqIAAgkIgTABIgIACQgDABgNgFQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAQABgBAFAAIAJAAIAjAAQATAAAEgBQAHgBAJAAQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgqgBIAAASIgBASQgBAHgCABQgBAAgBgHgAgWgJIgBgFIgCgZIgCgEIgFgBQgBAAAAAAQAAAAAAgBQgBAAABAAQAAAAAAgBIAFgBIAHABIAFABIARgBIASAAIAFgCIAFABQABABAAAAQABAAAAABQABAAgBABQAAAAAAAAIgDAEIgDAXIACAAQABAAAAAAQABAAAAABQAAAAABAAQAAAAAAABQAAAAAAAAQgBABAAAAQAAAAAAAAQAAAAgBAAIgDABIgqAAQAAABAAABQAAAAAAABQAAAAgBAAQAAABAAAAIgCABIgCgBgAgRgQIAkgBIACgZIgnAAg");
	this.shape_401.setTransform(613.0418,446.5128,2.4309,2.431);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#000000").s().p("AgPAqQgGgFAAgHQAAgGAFgFQAEgFAJgCIABAAIAAgBIgBgBIgBgBQAAgBABAAQAAAAAAgBQABAAABAAQABAAAAAAIAGACIAAACIAAABIAAAAIAAABQAJACAEAEQAEAFAAAGQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgDAEAAAGQAAAGAEADQAEAFAFAAQAHAAAFgEQAEgFAAgFQAAgFgEgFQgEgFgIAAQgGAAgEAFgAguABQgBgBgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAFgBIAFABIAHABIAcAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAASQAAABAAABQAAAAABAAQAAABAAAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAAAQABABAAAAIAWAAIAEgBQABAAAAAAQABAAABAAQAAgBAAAAQABAAAAgBIAGgBIAGAAQAFACAAADQgBACgFAAIgWAAIAAAOIAOAAIAIgBQAGgCAJAAQAKABAAADQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIgJAAIg1AAIgHAAIgIACIgCAAQgEAAgKgDg");
	this.shape_402.setTransform(571.2013,446.2089,2.4309,2.431);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#000000").s().p("AAkAtIAAgtIgMAAIgBAoQAAAHgDAAQgCAAAAgGIgBhLQAAgEgBgCIgGgDQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAAAIAFgBIAKADQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIgBAGIAAAeIAMAAIAAgjQAAgEgCgBIgFgDIgDgCQABgBAEAAIAKACQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgBAGIAABTQgBAHgCAAQgCAAgBgGgAgUAYQAGgFAIgOQAIgPACgQIgFABIgCAAIgDABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgCADQgEAOgIAJQgIAMgGAFQgEAEgBgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQABgBAAAAQAGgGAIgMQAIgMADgQIgJABIgEABIgIgCIgCgCIAEgBIAEABIAKAAIAFgCIAEAAIADAAIACABIAAABIADAAIAHgCQABAAAAAAQABAAAAAAQABAAABAAQAAAAABAAIADAAQABAAAAABQAAAAABAAQAAABAAAAQAAABgBABIgCAFQgEAOgHAMQgHANgHAFQgEAEgBAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAgBg");
	this.shape_403.setTransform(529.7565,445.905,2.4309,2.431);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#000000").s().p("AAgAtIgBg1IgBABIgBAAIgKACQgEAAgFgDQAAAIgGAGQgGAHgMAAQgMAAgGgHQgGgGAAgHQAAgHAEgGQAFgFAIgCIADgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgDAFABQAFABABABIAAACIgBACIABABIAEABQAFACAEAEQADADACAGIABAAIACABIASgBIAAgcQAAgDgCgCIgGgDQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAFAAIALACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAIgBAGIgBBTQAAAGgDABQgBAAgBgGgAgagTQgFAEAAAIQAAAHAFADQAFAFAHAAQAIAAAFgEQADgEAAgHQAAgHgDgFQgFgFgIAAQgHAAgFAFg");
	this.shape_404.setTransform(447.811,445.905,2.4309,2.431);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#000000").s().p("AgBAqIgBgkIgSABIgJACQgDABgNgFQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAQABgBAFAAIAJAAIAjAAQAUAAADgBQAHgBAJAAQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgqgBIAAASQAAALgBAHQgBAHgCABQgBAAAAgHgAgWgJQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAgBAAgBIgCgZQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgFgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAGgBIALACIAkgBIAEgCIAFABQABABABAAQAAAAAAABQABAAgBABQAAAAAAAAIgDAEIgDAXIADAAQAAAAAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgDABIgqAAIgBAEIgCABQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAAAgAgQgQIAkgBIABgZIgnAAg");
	this.shape_405.setTransform(406.5627,446.5128,2.4309,2.431);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#000000").s().p("AgPAqQgGgFAAgHQAAgHAFgEQAEgFAJgCIABAAIAAgBIgBgBIgBgBQAAgBABAAQAAAAAAgBQABAAABAAQABAAAAAAIAGACIAAACIAAABIAAABQAIACAFAEQAEAFAAAGQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgDAEAAAGQAAAGAEADQAEAFAFAAQAHAAAEgEQAFgFAAgFQAAgFgEgFQgEgFgIAAQgGAAgEAFgAguABQgBgBgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAFgBIAFABIAHABIAcAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAASQAAABAAABQAAAAABAAQAAABAAAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAAAQABABAAAAIAWAAIAEgBQAAAAABAAQABAAAAAAQABgBAAAAQABAAAAgBIAGgBIAGAAQAFACAAADQgBACgFAAIgWAAIAAAOIAOAAIAIgBQAFgCAKAAQAKABAAADQgBABgEABIgIAAIg1AAIgHAAIgIACIgCAAQgEAAgKgDg");
	this.shape_406.setTransform(325.1934,446.2089,2.4309,2.431);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#000000").s().p("AgCAqIAAgkIgTABIgIACQgDABgNgFQgBAAgBAAQgBgBAAAAQgBAAAAgBQAAAAABAAIAGgBIAIAAIAkAAQAUAAADgBQAHgBAIAAQAKAAAAADQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAIgrgBIAAAkQgCAHgBABQgCAAAAgHgAgWgJQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAgBAAgBIgCgZIgDgEIgEgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAFgBIAHABIAFABIAjgBIAFgCIAFABQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgDABIgqAAIgBAEIgDABIgBgBgAgRgQIAkgBIABgZIgmAAg");
	this.shape_407.setTransform(283.8679,446.5128,2.4309,2.431);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#000000").s().p("AgPAqQgGgFAAgHQAAgHAFgEQAEgFAJgCIABAAIAAgBIgBgBIgBgBQAAgBABAAQAAAAAAgBQABAAABAAQABAAAAAAIAGACIAAACIAAABIAAABQAIACAFAEQAEAFAAAGQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgEAFAAAFQAAAGAFADQAEAFAFAAQAHAAAEgEQAFgFAAgFQAAgFgEgFQgEgFgIAAQgGAAgEAFgAgvABQgBgBgBAAQAAAAgBAAQAAAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAFgBIAFABIAHABIAcAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAASQAAABAAABQAAAAABAAQAAABAAAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAAAQABABAAAAIAWAAIAEgBQAAAAABAAQABAAAAAAQABgBAAAAQABAAAAgBIAGgBIAGAAQAFACAAADQgBACgFAAIgWAAIAAAOIAOAAIAIgBQAFgCAKAAQAKABAAADQgBABgEABIgIAAIg1AAIgHAAIgIACIgCAAQgEAAgLgDg");
	this.shape_408.setTransform(200.7255,446.2089,2.4309,2.431);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#000000").s().p("AgtAfQgBAAgBAAQAAgBgBAAQAAAAAAgBQAAAAABAAQABgBAFAAIAIAAIAZABIAAgdQAAAAAAAAQAAAAAAgBQAAAAgBgBQAAAAgBgBIgEgBQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQABAAAAgBQAAAAABAAQAAAAABAAQABAAABAAIAEAAIAEABQABAAABAAQAAABABAAQAAAAAAABQAAAAAAAAIgBADIAAAdIAQgBQAIAAABgBQAIgCAHABQAKAAAAADQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAQgEABgEgBIgzAAIgGABIgIACIgCAAQgEAAgLgEgAAUAQQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBIADgMIADgdIgjABIgJACQgEACgKgFIgCgCQAAgBAGAAQAGABAXgBQATAAAEgBIAFgBIAEAAQACABAAAAQABAAAAABQABAAAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAAAQgBABAAAAIgFAcIgEALQAAABgBABQAAABAAAAQgBABAAAAQAAAAgBAAIgBAAg");
	this.shape_409.setTransform(1127.8474,650.3427,2.4309,2.431);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#000000").s().p("AgUAuQgEgBAAgEIAAgIQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgDgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAIAEgBIAFAAIAGABIAlAAIAAgNIgdAAIgKACQgDABgIgFIgBgBQACgBADAAIAGABIAWAAQAOAAADgBIADgBIAFAAQABABAAAAQABABAAAAQAAAAAAAAQAAABAAAAIgCADIgCAMIACAAQABAAAAAAQAAAAAAAAQAAABABAAQAAAAAAAAIgBACIguAAIAAAKIACADIADABIAbAAIAJgDIAHAAQAFABgBACQAAACgFAAIgrABgAgugBQgCgBAAAAQgBgBAAAAQgBAAAAAAQABgBAAAAIAGgBIAJABIAhABIAAgOIgOAAQgEAAgDgBQgEgCAAgFIAAgLQAAgBAAgBQgBgBAAAAQAAgBAAAAQAAgBgBAAIgFgCIgDgBQAAAAAAgBQAAAAABAAQABgBABAAQAAAAACAAIAJABQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAIAAAFIAAAOIABAEIADABIAZAAIAEgBIAEgCIAFgBIAHAAQAFABgBADQAAACgFAAIgYABIAAAOIAVgCQAGgCAKAAQAJABAAAEQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAIhFAAIgIABIgCAAQgFAAgJgCg");
	this.shape_410.setTransform(1084.7596,651.0195,2.4309,2.431);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#000000").s().p("AAUAtIgBgiQgHADgQAFQgPAEgLAAQgFAAgCgCQgCgBAAgFIAAgQQAAgBAAAAQAAgBgBgBQAAAAAAgBQAAAAgBAAIgFgCQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAABAAIAEgCIAMACIAXAAIABgWIgQABIgEAAIgCAAIgEABQgEABgHgEQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAIAFAAIAZABIAHgBIAEgCIAEABQABAAAAABQAAAAABAAQAAABAAAAQAAAAgBABIgBADIgCAUIABAAIABABIAAACIgEAAIgcAAIAAATIABACIADABQAHAAAQgCQAQgEAIgDIAAgvQAAgDgCgCIgGgDQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQABgBAEAAIAKACQABABABAAQAAAAAAABQABAAAAABQAAAAAAABIgBAFIAAAjIAEgBIAFgCIAEgBIAFAAQAFABAAADQgBACgFAAIgRAAIgBAuQgBAHgCAAQgCAAAAgGg");
	this.shape_411.setTransform(1042.6846,651.0803,2.4309,2.431);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#000000").s().p("AAVAtIgBglQgHAFgGACQgHADgFAAIgEgCQgDgCAAgCIgKAEQgGADgEAAQgDAAgCgCQgCgBAAgEIAAghQAAgEgDgBIgFgCQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAIAEAAIAIABIAHAAIAMgCIAFAAIADABIACAAIADgBIAEgBIAFAAQABAAAAABQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQgBABgBAAIgOAAIAAAiIAAADQABABAAAAQAAAAABAAQAAABABAAQAAAAABAAQADAAAHgDIAMgEIAAgtQAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAFAAIAKACQABABAAAAQABAAAAABQAAAAAAABQABAAgBABIAAAFIAAAjIAEgBIAEgCIAEAAIAGAAQAFABgBACQAAADgFAAIgRAAIgBAtQgBAHgCAAQgCAAAAgGgAghAKQAAABAAAAQABABAAAAQAAAAAAABQABAAAAAAIACAAIAJgBIAHgDIAAgjIgUAAg");
	this.shape_412.setTransform(956.1093,651.0803,2.4309,2.431);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#000000").s().p("AgtAgQgBAAgBgBQgBAAAAAAQAAgBAAAAQAAAAABAAIAGgBIAIAAIAMABQABABAGgBIAMAAIAAgZIgPAAQgEAAgDgCQgEgBAAgEIAAgWQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAgBAAIgFgCIgCgCIAEgBIANABIAdAAIAIgBQABgCAEAAIAHABQAFABgBACQAAADgFAAIgxAAIAAAaQAAABAAAAQAAABABAAQAAAAAAAAQAAAAABAAIACABIAaAAIAEgBQABAAAAAAQABAAABAAQAAAAABAAQAAAAABAAIAFgBIAGAAQAGABgBACQgBACgEAAIgZABIAAAZIANAAIAIgBQAFgCAKAAQAJAAAAAEQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAQgEABgEgBIgzAAIgGABQgEAAgEACIgCAAQgFAAgKgEg");
	this.shape_413.setTransform(911.4358,650.2516,2.4309,2.431);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#000000").s().p("AAUAtIAAgpQgKAFgOAEQgPAFgJAAQgEAAgDgCQgCgCAAgEIAAggQAAgBAAgBQAAAAgBgBQAAAAAAgBQgBAAAAAAIgGgCIgDgCQgBgBAGAAIAJAAQABABABAAQABAAAAAAQABABAAAAQAAAAAAAAIAAAlQAAAAAAABQAAAAAAABQABAAAAAAQAAABABAAQAAAAAAAAQAAAAABABQAAAAAAAAQABAAABAAQAJAAANgEIAXgHIgBgoQAAgDgBgCIgHgDQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgBAEAAIALACQAAABABAAQAAAAABABQAAAAAAABQAAAAAAABIgBAFIAAAiIAFgBIAEgCIAEgBIAGABQAEABAAACQgBADgEAAIgSAAIAAAuQgCAHgCAAQgCAAAAgGg");
	this.shape_414.setTransform(823.5816,651.0803,2.4309,2.431);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#000000").s().p("AgsAgQgCAAgBgBQAAAAgBAAQAAgBAAAAQAAAAABAAIAGgBIAIAAIAMABQACABAFgBIAMAAIAAgZIgPAAIgHgCQgEgBAAgEIAAgWQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAAAAAIgGgCIgCgCQAAgBAFAAIAMABIAdAAIAIgBQACgCADAAIAHABQAFABgBACQAAADgFAAIgxAAIAAAaQAAABAAAAQAAABAAAAQABAAAAAAQAAAAABAAIADABIAaAAIADgBQABAAAAAAQABAAABAAQAAAAABAAQAAAAABAAIAFgBIAHAAQAFABgBACQAAACgFAAIgZABIAAAZIANAAIAIgBQAFgCAKAAQAKABgBADQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAAAAAIgJAAIgyAAIgHABIgIACIgCAAQgEAAgKgEg");
	this.shape_415.setTransform(736.9315,650.2516,2.4309,2.431);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#000000").s().p("AAgAtIgBg5IgGAAIgIABIgCAAIgEABQgDABgIgDIgBgCQAAgCAFABQAEABAJgBIAOgBIAAgXQAAgDgCgCIgGgDQgBgBgBAAQAAAAAAAAQgBgBAAAAQAAAAABAAQABgBAEAAIAKACQABABABAAQAAAAAAABQABAAAAABQAAAAAAABQgBABAAAEIgBBTQgBAHgCAAQgCAAAAgGgAgZARQgCgBAAgFIAAghQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBgBAAAAIgGgCQgBAAAAAAQAAAAgBAAQAAAAAAgBQgBAAAAAAIAFgCIAJABQABAAABAAQABAAAAABQABAAAAAAQAAABAAAAIAAAFIAAAhIABADIADABQAJAAAJgCIARgFQABgBAAAAQAAAAABAAQAAABAAAAQAAAAAAABIgCACIgTAHQgKADgIAAQgFAAgCgCg");
	this.shape_416.setTransform(692.1508,651.0803,2.4309,2.431);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#000000").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAIAGgBIAIAAIAMABIAYgBQAUAAADgBQAHgBAIAAQAKAAAAADQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgrgBIAAAkQgCAIgBAAQgCAAAAgHgAgWgJIgBgEIgCgaQAAgBgBgBQAAAAAAAAQgBgBAAAAQAAAAgBAAIgEgCQgBAAAAAAQgBgBAAAAQAAAAABAAQAAAAAAAAIAFgCIAMACIARAAIASgBIAFgBIAFAAQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgDABIgqABIgBADIgDABgAgRgQIAkgBIABgZIgmAAg");
	this.shape_417.setTransform(589.7977,651.7286,2.4309,2.431);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#000000").s().p("AgPArQgGgGAAgHQAAgHAFgEQAFgGAIAAIABgCIgCgCQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABAAQAFAAABACIAAABIAAACIAAAAIAAABQAJABAEAFQAEAFAAAGQAAAHgGAGQgHAFgJAAQgJAAgHgFgAgJAUQgEAEAAAGQAAAFAEAFQAEAEAGAAQAGAAAFgEQAEgFAAgFQAAgFgEgFQgEgEgHAAQgHAAgDAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAgBQAAAAABAAIAPgBIALABIAVAAIAAgOIgNAAIgHgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBIAFgBIAFAAIAHACIAYAAIAEgBQABAAAAAAQABAAAAAAQABAAABgBQAAAAABAAIAFgBIAGAAQAFABAAADQgBACgEAAIgtAAIAAATIACADIADABIAVgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAFABAAACQgBADgFAAIgWAAIAAAOIAOAAIAIgBQAHgCAJAAQAJAAAAAEQAAAAgBAAQAAAAAAABQgBAAgBAAQAAAAgBABIhFAAIgIACIgDAAQgFAAgIgEg");
	this.shape_418.setTransform(546.2081,651.445,2.4309,2.431);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#000000").s().p("AAlAtIgBgtIgMAAIAAAWIgBASQAAAHgDAAQgCAAAAgGIgBhLQAAgEgBgCIgGgDIgCgCQAAAAAAAAQABAAAAAAQABgBABAAQAAAAACAAIAKADQAAAAABABQAAAAABAAQAAABAAAAQAAAAAAABIgBAGIAAAeIAMAAIAAgjQAAgDgCgCIgFgDIgCgCQAAAAAAgBQAAAAABAAQAAAAABAAQABAAABAAIAKACQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAFIABBBIgBASQgBAHgCAAQgCAAAAgGgAgUAYQAGgEAIgPQAHgNADgSIgEABIgDAAIgCABIgDAAIgBABIgBACQgEANgIALQgJAMgFAEQgDADgCAAQgBAAAAAAQAAAAAAgBQAAAAAAAAQABgBAAAAQAFgEAJgOQAJgNACgPIgGABIgDAAIgEACIgIgDQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAIAEgBIAJABIAFAAIAJgCIAEAAIABABIAAABIADAAIAMgCIADAAQABABAAAAQAAAAABABQAAAAAAABQgBAAAAABIgCAFQgEAOgHAMQgHANgHAFQgDAEgCAAQgBAAAAAAQAAgBAAAAQAAAAAAgBQABAAAAgBg");
	this.shape_419.setTransform(501.8611,651.0803,2.4309,2.431);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#000000").s().p("AAgAtIgBg0IgCAAIgKACIgJgCQAAAHgHAGQgFAHgMAAQgLAAgHgHQgGgGAAgHQAAgHAEgGQAEgEAJgDIACAAIABgBQAAAAABAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgCgCQABgDAFABQAEABABABIABACIgBACIABABIAEABQAFACAEAEQAEAEAAAFIACAAIACABIASgBIAAgcQAAgDgCgCIgGgDQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQABgBAEAAIAKACQABABABAAQAAAAABABQAAAAAAABQAAAAAAABIgBAFIgBBTQgBAHgCAAQgCAAAAgGgAgagTQgFAEAAAIQAAAHAFAEQAFAEAHAAQAIAAAEgEQAEgEAAgHQAAgGgDgGQgFgFgIAAQgHAAgFAFg");
	this.shape_420.setTransform(415.8228,651.0803,2.4309,2.431);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#000000").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAIAGgBIAIAAIAMABIAYgBQAUAAADgBQAHgBAIAAQAKAAAAADQAAABAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIgqgBIgBAkQgCAIgBAAQgCAAAAgHgAgWgJIgBgEIgCgaQAAgBAAAAQAAgBgBAAQAAgBAAAAQgBAAAAAAIgFgCQgBAAAAAAQgBgBAAAAQAAAAABAAQAAAAAAAAIAFgCIAMACIARAAIASgBIAFgBIAFAAQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAAAABQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgDABIgqABIgBADIgCABIgCgBgAgRgQIAkgBIABgZIgmAAg");
	this.shape_421.setTransform(372.8392,651.7286,2.4309,2.431);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#000000").s().p("AgPArQgGgGAAgHQAAgHAFgEQAFgGAIAAIABgBIAAgBIgBgBIgBgBQAAgBAAAAQABAAAAgBQABAAABAAQAAAAABAAQAEAAACACIAAABIAAACIAAAAIAAABQAJABAEAFQAEAEAAAHQAAAHgGAGQgHAFgKAAQgIAAgHgFgAgKAUQgDAEAAAGQAAAGAEAEQAEAEAFAAQAHAAAFgEQAEgFAAgFQAAgFgEgFQgEgEgIAAQgGAAgEAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAgBQAAAAABAAIAOgBIAMABIAVAAIAAgOIgNAAQgEAAgDgBQgEgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAgBAFAAIAFAAIAHACIAYAAIAEgBQABAAAAAAQABAAAAAAQABAAABgBQAAAAABAAIAFgBIAGAAQAGABgBADQgBACgEAAIgtAAIAAATIACADIACABIAWgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAFABAAACQgBADgFAAIgWAAIAAAOIAWgBQAIgCAIAAQAJAAAAAEQAAAAgBAAQAAAAAAABQgBAAgBAAQAAAAgBABIg+AAIgHAAIgIACIgDAAQgEAAgJgEg");
	this.shape_422.setTransform(286.8302,651.445,2.4309,2.431);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#000000").s().p("AgBAqIgBgkIgSABIgJACQgEABgMgFQgCAAAAgBQgBAAAAAAQgBgBAAAAQABAAAAAAIAGgBIAJAAIALABIAYgBQAUAAADgBQAHgBAJAAQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIgqgBIgBAkQgBAIgCAAQgBAAAAgHgAgWgJIgBgEIgCgaQAAgBgBgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgFgCQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAIAFgCIALACIARAAIATgBIAEgBIAFAAQABAAABABQAAAAAAABQABAAgBAAQAAABAAAAIgCAEIgEAXIADAAQAAAAAAAAQABAAAAAAQAAABAAAAQABAAAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAIgDABIgqABIgBADIgCABgAgQgQIAkgBIABgZIgmAAg");
	this.shape_423.setTransform(243.6949,651.7286,2.4309,2.431);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#000000").s().p("AgPArQgGgGAAgHQAAgHAEgEQAHgGAHAAIABgCIgCgCQAAgCAEAAQAFAAAAACIABABIgBACIAAAAIABABQAIABAFAFQAEAEAAAHQAAAHgGAGQgHAFgKAAQgIAAgHgFgAgKAUQgEAFAAAFQAAAFAEAFQAFAEAFAAQAHAAAEgEQAEgEAAgGQAAgGgDgEQgEgEgIAAQgGAAgEAEgAgvAAQgBAAAAAAQgBAAAAAAQgBAAABgBQAAAAAAAAIAOgBIAMABIAVAAIAAgOIgNAAIgIgBQgDgCAAgFIAAgOQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAgBgBAAIgFgCQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBIAEgBIAGAAIAHACIAYAAIAEgBQABAAAAAAQABAAABAAQAAAAABgBQAAAAAAAAIAGgBIAGAAQAGABgBADQgBACgFAAIgsAAIAAATIABADIADABIAWgBIAEAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAgBIAGgBIAGABQAFABgBACQgBADgEAAIgXAAIAAAOIAPAAIAIgBQAHgCAIAAQAKAAgBAEQAAAAAAAAQAAAAgBABQAAAAgBAAQgBAAgBABIg9AAIgHAAIgIACIgCAAQgFAAgKgEg");
	this.shape_424.setTransform(158.2815,651.445,2.4309,2.431);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#000000").s().p("AgYArIgBgBIAAgCQAAgCAMgNIAageQAFgGgBgJQAAgHgFgGQgGgEgHAAQgFgBgGAFQgFADAAAHQAAABAAAAQAAABABAAQAAAAAAAAQAAABABAAIACABIADACIAAADQAAADgCACIgEABQgEAAgCgDQgCgCAAgGIABgFIACgFIAFgGIAGgEIAGgCIAFgBQAJAAAIAHQAIAGAAALQAAAIgFAHIgKAKIgSASIgKALIAeAAQAFAAACgEIADgNQAAgBAAAAQAAgBABAAQAAAAAAgBQAAAAABABQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAIgCAWIAAABIgCABg");
	this.shape_425.setTransform(150.4319,446.7045,2.4309,2.431);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#000000").s().p("AgsAfQgBAAgBgBQgBAAAAAAQgBgBAAAAQAAAAABAAQADgBADAAIAIAAIAMABIANAAIAAgcQAAgBAAAAQAAAAAAgBQAAAAgBgBQAAAAAAAAIgFgCQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAAAIAFgBIAIABQABAAAAABQABAAAAAAQABAAAAABQAAAAAAAAIgBADIAAAdIAQAAIAJgBQAGgCAKAAQAJABAAADQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAIhJADIgDAAQgFAAgIgEgAAUAQQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBIACgMIADgdIgjACQgFAAgEABQgEACgKgFIgCgCQgBgCAHABQAKABATAAQATAAAEgBIAFgCIAEABQABAAABAAQABAAAAABQAAAAAAAAQAAABAAAAIgCAFIgFAbIgEALQgCAEgCAAIAAAAg");
	this.shape_426.setTransform(1126.7089,445.2272,2.4309,2.431);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#000000").s().p("AgtAjQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQABgBAFAAIAJABIAfAAIAAgWQgJgBgHgGQgHgEAAgJQAAgHAFgGQAFgFAJgCIACgBQABAAAAAAQABgBAAAAQAAAAAAgBQgBAAAAAAIgCgCQABgDAEABQAFABABABQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAIAAACIAAAAIACABQALADADAFQAEAEAAAIQAAAJgHAEQgGAGgJABIAAAWIANAAIAHgBQAGgCAKAAQAJAAAAADQAAABAAABQgBAAAAAAQgBABAAAAQgBAAgBAAIgpAAQgJAAgJABIgOACIgCAAQgEAAgLgDgAgMgWQgFAEAAAIQAAAHAFAEQAFAFAHAAQAJAAAFgFQAFgEAAgHQAAgGgFgGQgFgGgJAAQgHAAgFAGg");
	this.shape_427.setTransform(1084.715,444.5322,2.4309,2.431);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#000000").s().p("AAUAtIgBgiIgXAHQgRAFgJAAQgFAAgCgCQgCgCAAgEIAAgQQAAgBAAAAQAAgBgBgBQAAAAAAAAQAAgBgBAAIgFgCQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAABAAQAAAAAAgBQABAAAAAAQABAAABAAQAAgBABAAIAkACIAAgWIgHAAIgJABIgEAAIgGABQgDABgIgEQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBIAFAAIAMAAQAIABAFgBIAHgBIAEgBIAEABQABAAAAABQABAAAAAAQABAAgBABQAAAAAAAAIgCAEIgCAUIABAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIAAACIgEAAIgcAAIAAASQAAABAAABQAAAAAAAAQAAABABAAQAAAAAAAAIADABQAKAAAOgDQAOgCAJgEIAAgvQAAgEgCgBIgGgDQAAAAgBgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABAAABAAQABAAABAAIALACQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgBAGIAAAiIAFAAIAEgCIAEgBIAFAAQAFABAAADQgBACgFAAIgRAAIAAAcIgBASQgBAHgCAAIAAAAQgBAAgBgGg");
	this.shape_428.setTransform(1044.3641,445.9795,2.4309,2.431);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#000000").s().p("AAVAtIgBglQgEAEgJADIgLACIgFgBIgDgEIgJAEQgGACgEAAIgGgBQgCgCAAgEIAAggQAAgBgBgBQAAgBAAAAQAAgBgBAAQAAgBAAAAIgGgCQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAABAAIAEgCIAMACQABABAGgBIAIgBQABgBAEAAIAEAAIABABIACAAIAFgBIAEgBIAFAAQAAAAABABQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAIgOABIAAAiIABADQAAAAAAABQAAAAABAAQAAAAAAAAQABAAABAAQAFAAAGgCIALgEIAAgtQAAgEgCgBIgGgDQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgBAEAAIAKACQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAIgBAGIAAAjIAFgBIAEgCIAEgBIAFABQAFABAAACQgBADgFAAIgRAAIgBAtQAAAGgDABQgCAAAAgGgAggAJQAAABAAABQAAAAAAABQAAAAAAAAQAAABABAAIACAAIAJgBQAFgBACgCIAAgjIgTAAg");
	this.shape_429.setTransform(963.121,446.036,2.4309,2.431);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#000000").s().p("AgtAgQgBAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAIAGgBIAJAAIAfABIAAgZIgPAAIgIgCQgDgBAAgEIAAgWQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAIgFgCIgDgCQAAgBAFAAIAGAAIAHABIAcAAIAEAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIAFgBIAGABQAGABgBACQgBADgEAAIgxAAIAAAaIABACIADABIAaAAIAEgBIAKgCIAGABQAFABAAACQgBACgFAAIgYABIAAAZIAUgBQAGgCAKAAQAKAAgBAEQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAIg7AAIgOACIgBABQgEAAgMgEg");
	this.shape_430.setTransform(920.7161,445.1486,2.4309,2.431);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#000000").s().p("AgSAwQgDgBAAgFIAAgIQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAgBAAAAIgEgBIgCgCQAAAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIAGAAIAGABIAgAAIAAgOIgYAAIgEABIgGABQgEABgHgEIgBgCQAAAAAAAAQABAAAAAAQABAAABAAQAAAAABAAIAogBIAEgBIAFABQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgCADIgCANIACAAQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAABIgBABIgpAAIAAALQAAAAAAABQAAAAAAABQAAAAABAAQAAABAAAAIADABIAYgBQAAAAABAAQABAAAAAAQABAAAAgBQABAAAAAAIAFgBIAHAAQAFABgBACQgBADgEAAIgnAAgAAVACIgBgMQgFADgTAGQgRADgJAAQgEAAgDgBQgCgBAAgEIAAgVQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAgBAAIgGgCIgCgCIAEgBIAGAAIAIABIAJAAQAHAAACgBQADgCAEAAIAGAAQAFABAAACQgBADgEAAIggAAIAAAYQAAAAAAABQAAAAABABQAAAAAAAAQAAABABAAIADABQAKAAAOgEQAPgDAIgEIAAgYQAAgEgCgBIgGgDQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAFAAIALACQAAABABAAQAAABABAAQAAAAAAABQAAAAAAAAIgBAGIAAAUIAFgBQAAAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIAEAAIAFAAQAFABAAACQgBADgFAAIgRAAIgBAPQgBAGgCAAQAAAAgBgBQAAAAAAAAQAAgBgBgBQAAgBAAgBg");
	this.shape_431.setTransform(840.3054,445.5498,2.4309,2.431);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#000000").s().p("AgtAgQgBAAgBAAQgBgBAAAAQAAAAAAgBQAAAAAAAAIAHgBIAIAAIAfABIAAgZIgPAAIgIgCQgDgBAAgEIAAgWQAAgBAAAAQAAgBgBgBQAAAAAAAAQAAgBgBAAIgFgCIgDgCQAAgBAFAAIAGAAIAHABIAcAAIAEAAQABAAABAAQAAAAABAAQAAgBABAAQAAAAABgBIAFgBIAGABQAGABgBACQAAADgFAAIgxAAIAAAaIABACIADABIAaAAIAEgBIAKgCIAGABQAFABAAACQgBACgFAAIgYABIAAAZIAUgBQAGgCAKAAQAJAAAAAEQAAAAAAABQAAAAgBAAQAAABgBAAQgBAAgBAAIg7AAIgOACIgCABQgEAAgLgEg");
	this.shape_432.setTransform(757.895,445.1486,2.4309,2.431);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#000000").s().p("AAkAtIAAgqIgNAAIgBAlQgCAHgCAAQgCAAAAgGIgBhLQAAgEgBgCIgGgDQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAIAFgBIAKADQABAAAAAAQABABAAAAQAAABAAAAQAAAAAAABIgBAGIABAiIANAAIAAgnQAAgDgCgCIgGgDQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBIAFAAIAKACQABABAAAAQABABAAAAQAAABAAAAQAAAAAAAAIgBAGIAABTQgCAHgCAAIAAAAQgCAAAAgGgAgbASQgGgFAAgHQAAgHAEgDQAEgEAGgCIADAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAABAAQAAAAABAAQAEABACABQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIgBACIABAAIACAAQAFABAEAFQAEAEAAAGQAAAIgHAEQgFAFgIAAQgHAAgHgFgAgWgDQgEAEAAAFQAAAFAEAEQADAEAGAAQAGAAAEgEQADgEAAgFQAAgGgDgDQgEgEgGAAQgFAAgEAEgAgngTQgBgBgBAAQgBgBAAAAQAAAAAAgBQAAAAAAAAIAFgBIAGAAIAIABIAJAAQAFAAAEgCIAHgBIAHABQABABABAAQAAABABAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAIgcAAIgIACIgCABQgDAAgGgDgAgTghIgGgDQgBAAAAAAQgBgBAAAAQAAAAABgBQAAAAAAAAIAFAAIAOABQAGAAAAACQAAABAAABQAAAAgBAAQAAABgBAAQgBAAgBAAIgLAAg");
	this.shape_433.setTransform(715.3589,445.9904,2.4309,2.431);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#000000").s().p("AgCAqIAAgkIgTABIgIACQgEABgMgFQgCAAAAAAQgBgBAAAAQgBAAAAAAQABgBAAAAQABgBAFAAIAJAAIAjAAQATAAAEgBQAGgCAKABQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIgqgBIAAASIgBASQgBAHgCAAIAAABQgBAAgBgHgAgWgJIgBgFIgCgZQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBAAAAgBIgFgBQgBAAAAAAQAAAAAAAAQgBgBABAAQAAAAAAgBIAFgBIAHABIAFABIARgBIASAAIAFgCIAFABQABABAAAAQABABAAAAQABAAgBABQAAAAAAAAIgDAEIgDAXIACAAQABAAAAABQABAAAAAAQAAAAABAAQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAAAAAQAAAAgBAAIgDABIgqAAQAAABAAABQAAAAAAABQAAAAgBABQAAAAAAAAIgCABIgCgBgAgSgqIABAaIAkgBIACgag");
	this.shape_434.setTransform(613.0418,446.5873,2.4309,2.431);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#000000").s().p("AgPAqQgGgFAAgHQAAgFAFgHQAEgEAJgBIABgBIAAgBIgBgBIgBgBQAAAAABgBQAAAAAAAAQABgBABAAQABAAAAAAIAGACIAAACIAAABIAAABIAAAAQAJACAEAEQAEAEAAAHQAAAIgGAEQgGAGgLAAQgJAAgGgGgAgKAUQgDAEAAAGQAAAGAEAEQAEAEAFAAQAHAAAFgEQAEgFAAgFQAAgFgEgFQgEgEgIgBQgGABgEAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAQgEAAgDgCQgEAAAAgGIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAFgBIAFAAIAHACIAcgBIAFgBIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAATQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAIACABIAWAAIAEAAIAEgBIAGgBIAGAAQAFABAAACQgBADgFAAIgWAAIAAAOIAWgBQAGgCAJAAQAKABAAADQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABgBAAIg+AAIgHABIgIABIgCAAQgEAAgKgEg");
	this.shape_435.setTransform(571.2013,446.3398,2.4309,2.431);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#000000").s().p("AAkAtIAAgtIgMAAIgBAoQAAAHgDAAQgCAAAAgGIgBhLQAAgEgBgCIgGgDQAAAAgBAAQAAgBgBAAQAAAAAAAAQAAgBAAAAIAFgBIAKADQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIgBAGIAAAeIAMAAIAAgjQAAgEgCgBIgFgDQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBIAFAAIAKACQABABAAAAQABABAAAAQAAABAAAAQAAAAAAAAIgBAGIAABTQgBAHgCAAIAAAAQgCAAgBgGgAgUAYQAGgFAIgOQAIgPACgQIgFABIgCAAIgDABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAIgCADQgEAOgIAJQgHALgHAFQgEAEgBAAQgBAAAAAAQAAAAAAgBQAAAAAAAAQABgBAAAAQAGgGAIgMQAIgMADgQIgGABIgHABQgBABgHgDQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIAEgBIAEABIAKAAIAFgCIAEAAIADAAIACABIAAABIADAAIAMgDIADABQABAAAAABQAAAAAAAAQAAABAAABQAAAAAAABIgCAFQgEAOgHAMQgHANgHAFQgEAEgBAAQgBAAAAAAQAAgBAAAAQAAAAAAgBQABAAAAgBg");
	this.shape_436.setTransform(529.7565,445.9795,2.4309,2.431);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#000000").s().p("AAgAtIgBg1IgBAAIgBABIgDAAIgCABIgFABQgEAAgFgDQAAAIgGAGQgGAHgMAAQgMAAgGgHQgGgGAAgHQAAgIAEgFQAFgFAIgCIACAAIABgBQABAAAAgBQAAAAAAAAQAAAAgBgBQAAAAAAAAIgBgCQAAgDAFABQAFABABABIAAACIgBACIABABIAEABQAFACAEAEQADADACAGIADAAIAIABIAKgBIAAgcQAAgEgCgBIgGgDQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAgBAAAAQAAgBAFAAIALACQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAIgBAGIgBBTQgBAHgCAAIAAAAQgBAAgBgGgAgagTQgFAEAAAIQAAAHAFADQAFAFAHAAQAIAAAFgFQADgDAAgHQAAgHgDgFQgFgFgIAAQgHAAgFAFg");
	this.shape_437.setTransform(447.811,445.9795,2.4309,2.431);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#000000").s().p("AgBAqIgBgkIgSABIgJACQgEABgMgFQgCAAAAAAQgBgBAAAAQgBAAAAAAQABgBAAAAQABgBAFAAIAJAAIAjAAQAUAAADgBQAGgCAKABQAJAAAAADQAAABgBAAQAAABAAAAQgBAAgBAAQAAABgBAAIgqgBIAAASQAAALgBAHQgBAHgCAAIAAABQgBAAAAgHgAgWgJQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAgBIgCgZQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgFgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIAGgBIALACIAkgBIAEgCIAFABQABABABAAQAAABAAAAQABAAgBABQAAAAAAAAIgDAEIgDAXIADAAQAAAAAAABQABAAAAAAQAAAAAAAAQABABAAAAQAAAAgBABQAAAAAAAAQAAAAAAAAQgBAAAAAAIgDABIgqAAIgBAEIgCABQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAgAgSgqIACAaIAkgBIABgag");
	this.shape_438.setTransform(406.5627,446.5873,2.4309,2.431);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#000000").s().p("AgPAqQgGgFAAgHQAAgGAFgGQAEgEAJgBIABgBIAAgBIgBgBIgBgBQAAAAABgBQAAAAAAAAQABgBABAAQABAAAAAAIAGACIAAACIAAABIAAABQAIACAFAEQAEAEAAAHQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgDAEAAAGQAAAGAEAEQAEAEAFAAQAHAAAEgEQAFgEAAgGQAAgFgEgFQgEgEgIgBQgGABgEAEgAguAAQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAQgEAAgDgCQgEAAAAgGIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAFgBIAFAAIAHACIAcgBIAFgBIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAATQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAIACABIAWAAIAEAAIAEgBIAGgBIAGAAQAFABAAACQgBADgFAAIgWAAIAAAOIAWgBQAFgCAKAAQAKABAAADQgBACgEAAIg9AAIgHABIgIABIgCAAQgEAAgKgEg");
	this.shape_439.setTransform(325.1934,446.3398,2.4309,2.431);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#000000").s().p("AgCAqIAAgkIgTABIgIACQgFABgLgFQgBAAgBAAQgBgBAAAAQgBAAAAgBQAAAAABAAIAGgBIAIAAIAkAAQAUAAADgBQAFgCAKABQAKAAAAADQAAABgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgrgBIAAAkQgCAHgBAAIAAABQgCAAAAgHgAgWgJQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAgBAAgBIgCgZQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAAAgBgBIgEgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAAAAAgBIAFgBIAHABIAFABIAjgBIAFgCIAFABQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBABAAAAQgBABAAAAQAAAAgBABQAAAAAAABIgDAXIACAAQABAAAAABQABAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAIgDABIgqAAIgBAEIgDABIgBgBgAgSgqIABAaIAkgBIABgag");
	this.shape_440.setTransform(283.8679,446.5981,2.4309,2.431);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#000000").s().p("AgPAqQgGgFAAgHQAAgGAFgGQAEgEAJgBIABgBIAAgBIgBgBIgBgBQAAAAABgBQAAAAAAAAQABgBABAAQABAAAAAAIAGACIAAACIAAABIAAABQAIACAFAEQAEAEAAAHQAAAHgGAFQgGAGgLAAQgJAAgGgGgAgKAUQgEAFAAAFQAAAGAFAEQAEAEAFAAQAHAAAEgEQAFgEAAgGQAAgFgEgFQgEgEgIgBQgGABgEAEgAgvAAQgBAAgBAAQAAAAgBAAQAAAAAAAAQAAgBABAAIAGgBIApABIAAgOIgNAAQgEAAgDgCQgEAAAAgGIAAgOQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAFgBIAFAAIAHACIAcgBIAFgBIAFgBIAGAAQAFACAAACQgBACgFAAIgsAAIAAATQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAIACABIAWAAIAEAAIAEgBIAGgBIAGAAQAFABAAACQgBADgFAAIgWAAIAAAOIAWgBQAFgCAKAAQAKABAAADQgBACgEAAIg9AAIgHABIgIABIgCAAQgEAAgLgEg");
	this.shape_441.setTransform(200.7255,446.3398,2.4309,2.431);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391,p:{x:162.5743,y:459.1541}},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375}]}).to({state:[{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_391,p:{x:165.0052,y:459.1635}},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409}]},370).to({state:[{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391,p:{x:162.5743,y:459.1541}},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375}]},275).to({state:[{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_391,p:{x:165.0052,y:459.1635}},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409}]},370).to({state:[{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391,p:{x:162.5743,y:459.1541}},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375}]},283).to({state:[{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_391,p:{x:165.0052,y:459.1635}},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409}]},594).to({state:[{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391,p:{x:162.5743,y:459.1541}},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375}]},509).to({state:[{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_391,p:{x:165.0052,y:459.1635}},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409}]},370).wait(279));

	// bg
	this.instance_7 = new lib.play_bg("synched",0);
	this.instance_7.setTransform(562.5,750.25,1,1,0,0,0,48.3,48.8);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FFFFFF").s().p("EAbGAwvQh5AAhWhWQhWhWAAh6QAAh6hWhWQhWhVh6AAMgjnAAAQh5AAhWBVQhWBWAAB6QAAB6hWBWQhWBWh6AAMg7mAAAQjsAAioioQininAAjsMAAAhPnQAAjsCnioQCoinDsAAMCs7AAAQDsAACoCnQCnCoAADsMAAABPnQAADsinCnQioCojsAAg");
	this.shape_442.setTransform(639.325,457.45);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#FCC012").s().p("Ehj/A+gMAAAh8/MDH/AAAMAAAB8/g");
	this.shape_443.setTransform(640.5,400);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f().s("#ED1C24").ss(0.8,1,1).p("ABUldIAAInIvPAAAt7FeIioAAIAAq7ICoAAAt7FeIAAiUIAAonIPPAAIPQAAIAAK7g");
	this.shape_444.setTransform(1097.175,248.575);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#ED1C24").s().p("At7FeIAAiUIPPAAIAAonIPQAAIAAK7gAwjFeIAAq7ICoAAIAAInIAACUgAt7DKIAAonIPPAAIAAIngAt7DKgAt7ldg");
	this.shape_445.setTransform(1097.175,248.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.instance_7}]}).wait(3050));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(640.5,400,640,400);
// library properties:
lib.properties = {
	id: 'D9BA16A548848F44B4EF264F80D1018A',
	width: 1280,
	height: 800,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/stos_expert.mp3", id:"stos_expert"},
		{src:"sounds/stos_music.mp3", id:"stos_music"},
		{src:"sounds/stos_singtosong.mp3", id:"stos_singtosong"},
		{src:"sounds/stos_student.mp3", id:"stos_student"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['D9BA16A548848F44B4EF264F80D1018A'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;