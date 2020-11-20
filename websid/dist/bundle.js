/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sid_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cpu_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sid_file_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sprintf_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sprintf_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_sprintf_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__array_loader_js_data_International_Karate_sid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__array_loader_js_data_International_Karate_sid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__array_loader_js_data_International_Karate_sid__);







function initAll() {
  const sid = new __WEBPACK_IMPORTED_MODULE_0__sid_js__["a" /* default */]()
  sid.setVolume(7)
  const cpu = new __WEBPACK_IMPORTED_MODULE_1__cpu_js__["a" /* default */]()
  const sidFile = new __WEBPACK_IMPORTED_MODULE_2__sid_file_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_4__array_loader_js_data_International_Karate_sid__)

  console.log('WebSid version 0.0.1', sid)

  // testNoise(sid)
  // testPulse(sid)
  // testSounds(sid)

  playSidFile(sidFile, sid, cpu)

  render(sid)
}


function playSidFile(sidFile, sid, cpu) {
  console.log('SID file', sidFile.header.name, sidFile.header)
  cpu.set(sidFile.org, sidFile.data)
  cpu.a = sidFile.header.startSong
  console.log('Init SID file')
  cpu.execute(sidFile.header.initAddress)
  const playAddress = sidFile.header.playAddress !== 0 ? sidFile.header.playAddress : cpu.getWord(0x0314)
  console.log('Play SID file', cpu.a=1)
  let params = __WEBPACK_IMPORTED_MODULE_0__sid_js__["a" /* default */].bytesToParams(cpu.memory.slice(0xD400, 0xD400 + 30))
  sid.set(params, 0)
  // console.log('Initial  ', paramsToString(params))
  let prev = params
  let timeTick = 0
  const playTime = 20 * 60
  fillAudioBuffer(50)
  const interval = window.setInterval(() => {
    fillAudioBuffer(50)
    if (timeTick >= playTime * 50)
      window.clearInterval(interval)
  }, 1000)

  sid.start(0)
  sid.stop(playTime)
//  sid.stop()

  function fillAudioBuffer(ticks) {
    for(let i=0; i<ticks; i++) {
      cpu.execute(playAddress)
      params = __WEBPACK_IMPORTED_MODULE_0__sid_js__["a" /* default */].bytesToParams(cpu.memory.slice(0xD400, 0xD400 + 30))
      const delta = changes(prev, params)
      // console.log('Delta', sprintf('%-3d', timeTick), paramsToString(delta))
      sid.set(delta, timeTick / 50)
      prev = params
      timeTick++
    }
  }

}

function paramsToString(params) {
  return params.voices.map(voiceToString).join('  ')
}

function isEmptyParams(p) {
  return Object.values(p).every(e => Array.isArray(e) ? e.every(e2 => isEmptyParams(e2)) : e === undefined)
}

function voiceToString(v) {
  return Object(__WEBPACK_IMPORTED_MODULE_3_sprintf_js__["sprintf"])('G:%s WF:%s%s%s%s FQ:%-5s PW:%-5s ADSR:%s%s%s%s',
    v.gate !== undefined ? v.gate ? '+' : '-' : ' ',
    v.waveNoise !== undefined ? v.waveNoise ? 'N' : '-' : ' ',
    v.waveSquare !== undefined ? v.waveSquare ? 'Q' : '-' : ' ',
    v.waveSawtooth !== undefined ? v.waveSawtooth ? 'S' : '-' : ' ',
    v.waveTriangle !== undefined ? v.waveTriangle ? 'T' : '-' : ' ',
    v.frequency !== undefined ? v.frequency : '',
    v.pulseWidth !== undefined ? v.pulseWidth : '',
    v.attack !== undefined ? v.attack.toString(16).toUpperCase() : ' ',
    v.decay !== undefined ? v.decay.toString(16).toUpperCase() : ' ',
    v.sustain !== undefined ? v.sustain.toString(16).toUpperCase() : ' ',
    v.release !== undefined ? v.release.toString(16).toUpperCase() : ' '
  )
}

function testPulse(sid) {
  console.log('Test pulse waveform')
  sid.getVoice(0).set({waveSquare: true, gate: true, frequency: 7382 / 4, pulseWidth: 0}, 0)
  for(let i=0; i<100; i++)
    sid.getVoice(0).set({pulseWidth: (Math.pow(2, 12)-1) / 100 * i}, i*0.02)
  for(let i=0; i<100; i++)
    sid.getVoice(0).set({pulseWidth: (Math.pow(2, 12)-1) / 100 * (100 - i)}, (100 + i)*0.02)
  sid.start(0)
  sid.stop(4)
}

function testNoise(sid) {
  console.log('Test noise waveform')
  sid.getVoice(0).set({waveNoise: true, gate: true, frequency: 7382}, 0)
  sid.getVoice(0).set({waveNoise: true, gate: true, frequency: 7382 / 2}, 0.5)
  sid.getVoice(0).set({waveNoise: true, gate: true, frequency: 7382 / 4}, 1)
  sid.start(0)
  sid.stop(2)
}

function testSounds(sid) {
  console.log('After 0.5s play 440hz tune for 2 seconds, drop volume after 1 second')
  sid.getVoice(0).set({waveTriangle: true, gate: true, frequency: 7382}, 0)
  sid.getVoice(0).set({gain: 12}, 0.75)
  sid.getVoice(0).set({gain: 0}, 1.5)
  sid.getVoice(0).set({gain: 12}, 2.2)

  sid.getVoice(1).set({waveSawtooth: true, gate: true, frequency: 7382 / 2, gain: 7}, 1)

  sid.getVoice(2).set({waveSquare: true, gate: true, frequency: 7382 / 2 / 2, gain: 4}, 1.5)
  sid.getVoice(2).set({waveTriangle: true, waveSquare: false}, 2.5)

  sid.setVolume(7, 2)
  sid.start(0)
  sid.stop(3.5)
}

function changes(a, b) {
  const res = {}
  Object.keys(a).forEach(key => {
    if (Array.isArray(a[key]))
      res[key] = a[key].map((s, idx) => changes(a[key][idx], b[key][idx]))
    else if (a[key] !== b[key])
      res[key] = b[key]
  })
  return res
}

function render(sid) {
  renderAnalyser(sid.getAnalyser(), '#vis-master')
  sid.getVoices().forEach((voice, i) => renderAnalyser(voice.getAnalyser(), '#vis-voice-' + i))
  if (sid.isActive())
    window.requestAnimationFrame(() => render(sid))
}

function renderAnalyser(analyser, canvasSelector) {
  const canvas = document.querySelector(canvasSelector)
  const h = canvas.clientHeight
  const w = canvas.clientWidth
  const gc = canvas.getContext('2d')
  const buffer = analyser.getTimeDomainBuffer()
  gc.clearRect(0, 0, w, h)
  gc.beginPath()
  gc.moveTo(0, h / 2)
  for (let i = 0; i < buffer.length; i++)
    gc.lineTo(i * w / buffer.length, h / 2 * buffer[i] + h / 2)
  gc.stroke()
}

document.querySelector('button').addEventListener('click', () => initAll())


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const attackRates = [0.002, 0.008, 0.016, 0.024, 0.038, 0.056, 0.068, 0.080, 0.100, 0.250, 0.500, 0.800, 1.000, 3.000, 5.000, 8.000]
const decayReleaseRates = [0.006, 0.024, 0.048, 0.072, 0.114, 0.168, 0.204, 0.240, 0.300, 0.750, 1.500, 2.400, 3.000, 9.000, 15.000, 24.000]

class Sid {
  static bytesToParams(data) {
    const word = n => data[n] + data[n + 1] * 256
    const voice = base => ({
      frequency: word(base),
      pulseWidth: word(base + 2),
      waveNoise: !!(data[base + 4] & 0x80),
      waveSquare: !!(data[base + 4] & 0x40),
      waveSawtooth: !!(data[base + 4] & 0x20),
      waveTriangle: !!(data[base + 4] & 0x10),
      test: !!(data[base + 4] & 0x08),
      ringMod: !!(data[base + 4] & 0x04),
      sync: !!(data[base + 4] & 0x02),
      gate: !!(data[base + 4] & 0x01),
      attack: data[base + 5] >> 4,
      decay: data[base + 5] & 0x0F,
      sustain: data[base + 6] >> 4,
      release: data[base +6] & 0x0F
    })
    return {
      voices: [
        voice(0),
        voice(7),
        voice(14)
      ],
      filter: word(21),
      resonance: data[23] >> 4,
      filtEx: !!(data[23] & 0x08),
      filt3: !!(data[23] & 0x04),
      filt2: !!(data[23] & 0x02),
      filt1: !!(data[23] & 0x01),
      volume: data[24] & 0x0F
    }
  }

  constructor() {
    const ctx = this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    // create nodes
    this.voices = [0, 1, 2].map(id => new Voice(id, ctx))
    this.volume = this.ctx.createGain()
    this.volume.gain.value = 1
    this.analyser = new Analyser(ctx)
    // wire nodes
    this.voices.forEach(v => v.connect(this.volume))
    this.volume.connect(this.analyser.analyser)
    this.analyser.connect(ctx.destination)
  }

  // Convert sid pitch to frequency (eg. 7382 == 440 Hz)
  static frequency(pitch) {
    const clock = 1000000
    const crystalFreq = 16777216
    return pitch * clock / crystalFreq
  }

  // Cnover sid volume 0..15 to web audio volume 0..1.0
  static volume(value) {
    return value / 15
  }

  getAnalyser() {
    return this.analyser
  }

  setVolume(value, time) {
    if (time !== undefined)
      this.volume.gain.setValueAtTime(Sid.volume(value), time)
    else
      this.volume.gain.value = Sid.volume(value)
  }

  getVoice(id) {
    return this.voices[id]
  }

  getVoices() {
    return this.voices
  }

  start(time) {
    this.voices.forEach(v => v.start(time))
  }

  stop(time) {
    this.voices.forEach(v => v.stop(time))
  }

  set(params, time) {
    this.voices.forEach((v, i) => v.set(params.voices[i], time))
  }

  isActive() {
    return this.voices.some(v => v.isActive)
  }
}

class Voice {
  constructor(id, ctx) {
    this.id = id
    this.oscillators = {
      'triangle': new Waveform(ctx, 'triangle'),
      'sawtooth': new Waveform(ctx, 'sawtooth'),
      'square': new Waveform(ctx, 'square'),
      'noise': new Waveform(ctx, 'noise')
    }
    Object.values(this.oscillators).forEach(o => o.oscillator.addEventListener('ended', () => this.isActive = false))
    this.analyser = new Analyser(ctx)
    this.gain = ctx.createGain()
    this.gain.gain.value = 1 / 3
    Object.values(this.oscillators).forEach(o => o.connect(this.gain))
    this.gain.connect(this.analyser.analyser)
    this.isActive = false
    this.attack = this.release = this.decay = 0
    this.sustain = 10
  }

  set(params = {}, time) {
    if (params.attack !== undefined) {
      this.attack = params.attack
    }
    if (params.decay !== undefined) {
      this.decay = params.decay
    }
    if (params.sustain !== undefined) {
      this.sustain = params.sustain
    }
    if (params.release !== undefined) {
      this.release = params.release
    }

    if (params.frequency) {
      const value = Sid.frequency(params.frequency)
      if (time !== undefined)
        Object.values(this.oscillators).forEach(o => o.frequency.setValueAtTime(o.type === 'noise' ? params.frequency : value, time))
      else
        Object.values(this.oscillators).forEach(o => o.frequency = value)
    }

    if (Number.isInteger(params.gain))
      if (time !== undefined)
        this.gain.gain.setValueAtTime(Sid.volume(params.gain), time)
      else
        this.gain.gain = Sid.volume(params.gain)

    if (params.waveTriangle)
      this.setWaveform('triangle', time)
    if (params.waveSquare)
      this.setWaveform('square', time)
    if (params.waveSawtooth)
      this.setWaveform('sawtooth', time)
    if (params.waveNoise)
      this.setWaveform('noise', time)

    if (params.pulseWidth !== undefined) {
      this.oscillators.square.oscillator.setPulseWidthAtTime(params.pulseWidth / 4095, time)
    }

    if (params.gate) {
      if (time !== undefined) {
        this.gain.gain.setValueAtTime(0, time)
        this.gain.gain.linearRampToValueAtTime(1, time + attackRates[this.attack])
        this.gain.gain.linearRampToValueAtTime(this.sustain / 15, time + attackRates[this.attack] + decayReleaseRates[this.decay])
      } else
        this.gain.gain = Sid.volume(1)
    }
    if (!params.gate && params.gate !== undefined) {
      if (time !== undefined) {
        this.gain.gain.setValueAtTime(this.sustain / 15, time)
        this.gain.gain.linearRampToValueAtTime(0, time + decayReleaseRates[this.release])
      } else
        this.gain.gain = Sid.volume(0)
    }
  }

  setWaveform(wave, time) {
    Object.entries(this.oscillators).forEach(([name, o]) => {
      if (wave === name)
        o.on(time)
      else
        o.off(time)
    })
  }

  start(time) {
    this.isActive = true
    Object.values(this.oscillators).forEach(o => o.start(time))
  }

  stop(time) {
    Object.values(this.oscillators).forEach(o => o.stop(time))
  }

  getAnalyser() {
    return this.analyser
  }

  connect(dest) {
    this.analyser.connect(dest)
  }
}

class Waveform {
  constructor(ctx, type) {
    if (['triangle', 'sawtooth', 'square', 'noise'].indexOf(type) < 0)
      throw new Error('Unknown waveform type: ' + type)
    this.type = type
    if (type === 'square') {
      this.oscillator = new Pulse(ctx)
    } else if (type === 'noise') {
      this.oscillator = new Noise(ctx)
    } else {
      this.oscillator = ctx.createOscillator()
      this.oscillator.type = type
    }
    this.gain = ctx.createGain()
    this.gain.gain.value = 0
    this.oscillator.connect(this.gain)
    this.frequency = this.oscillator.frequency
  }

  setGain(value, time) {
    if (time !== undefined)
      this.gain.gain.setValueAtTime(value, time)
    else
      this.gain.gain.value = value
  }

  off(time) {
    this.setGain(0, time)
  }

  on(time) {
    this.setGain(1, time)
  }

  start(time) {
    this.oscillator.start(time)
  }

  stop(time) {
    this.oscillator.stop(time)
  }

  connect(dest) {
    this.gain.connect(dest)
  }
}

class Pulse {
  constructor(ctx) {
    this.st1 = ctx.createOscillator()
    this.st2 = ctx.createOscillator()
    this.gain = ctx.createGain()
    this.clamp = ctx.createGain()
    this.clamp.gain.value = 0.5
    this.st1.type = 'sawtooth'
    this.st2.type = 'sawtooth'
    this.gain2 = ctx.createGain()
    this.gain2.gain.value = -1
    this.delay = ctx.createDelay()
    this.st1.connect(this.clamp)
    this.st2.connect(this.gain2)
    this.gain2.connect(this.delay)
    this.delay.connect(this.clamp)
    this.clamp.connect(this.gain)
    this.const = ctx.createGain()
    this.const.gain.value = 0.5
    this.freqRp = ctx.createConstantSource()
    this.freqRp.connect(this.const)
    this.const.connect(this.delay.delayTime)
    this.frequency = {
      setValueAtTime: (v, t) => {
        this.st1.frequency.setValueAtTime(v, t)
        this.st2.frequency.setValueAtTime(v, t)
        this.freqRp.offset.setValueAtTime(1 / v, t)
      }
    }
    this.setPulseWidthAtTime = (v, t) => this.const.gain.setValueAtTime(v, t)
    this.addEventListener = (event,fn) =>  this.st1.addEventListener(event, fn)
  }

  connect(node) {
    this.gain.connect(node)
  }

  start(t) {
    this.st1.start(t)
    this.st2.start(t)
    this.freqRp.start(t)
  }

  stop(t) {
    this.st1.stop(t)
    this.st2.stop(t)
    this.freqRp.stop(t)
  }
}

class Noise {
  constructor(ctx) {
    this.buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const buf = this.buffer.getChannelData(0)
    for(let i=0; i<buf.length; i++)
      buf[i] = Math.random() * 2 - 1
    this.source = ctx.createBufferSource()
    this.source.loop = true
    this.source.buffer = this.buffer
    this.frequency = {
      setValueAtTime: (v,t) => {
        if (buf.lebgth > 0)
          this.source.playbackRate.setValueAtTime(v / buf.length, t)
      }
    }
    this.addEventListener = (event,fn) =>  this.source.addEventListener(event, fn)
  }

  start(time) {
    this.source.start(time)
  }

  stop(time) {
    this.source.stop(time)
  }

  connect(dest) {
    this.source.connect(dest)
  }
}

class Analyser {
  constructor(ctx) {
    this.analyser = ctx.createAnalyser()
    this.buffer = new Float32Array(2048)
  }

  getTimeDomainBuffer() {
    this.analyser.getFloatTimeDomainData(this.buffer)
    return this.buffer
  }

  connect(dest) {
    this.analyser.connect(dest)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Sid);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cpu {
  constructor() {
    this.memory = new Array(65536)
    this.reset()
  }

  reset() {
    this.memory.fill(0)
    this.a = 0
    this.x = 0
    this.y = 0
    this.pc = 0
    this.sp = 0x1FF
    this.N = this.V = this.B = this.D = this.I = this.Z = this.C = false
    this.instructionCount = 0
  }

  set(addr, data) {
    for (let i = 0; i < data.length; i++)
      this.memory[addr + i] = data[i]
  }

  getWord(addr) {
    return this.memory[addr] + this.memory[addr + 1] * 256
  }

  execute(address, max = 10000) {
    this.instructionCount = 0
    this.pc = address
    if (this.debug)
      console.log('init', this.status())
    let n = max
    while (n-- > 0) {
      if (this.step())
        return
      if (this.debug)
        console.log('step', this.status())
    }
    if (this.debug)
      console.log(`Exiting after reaching max count of ${max} instructions.`)
  }

  step() {
    const zeroPageWord = (addr) => this.memory[addr & 0xFF] + this.memory[(addr + 1) & 0xFF] * 256
    const nextByte = () => this.memory[this.pc++]
    const nextWord = () => this.memory[this.pc++] + this.memory[this.pc++] * 256
    const signedByte = (b) => b & 0x80 ? -((b ^ 0xFF) + 1) : b
    const address = this.pc
    const opcode = this.memory[this.pc++]

    this.instructionCount++

    let param
    switch(opcode & 0x0F) {
      case 0x00:                 // Immediate
      case 0x02:    // LDX imd
        param = opcode === 0x20 ? nextWord() : nextByte()
        break
      case 0x01:                 // Indirect zero page
        param = opcode & 0x10
          ? zeroPageWord(nextByte()) + this.y
          : zeroPageWord(nextByte() + this.x)
        break
      case 0x04:                 // Zeropage
      case 0x05:
      case 0x06:
        param = opcode & 0x10
          ? (nextByte() + this.x) & 0xFF
          : nextByte()
        break
      case 0x09:                 // Immediate or Abs Y
        param = opcode & 0x10
          ? nextWord() + this.y
          : nextByte()
        break
      case 0x0C:                 // Abs or Abs X
      case 0x0D:
      case 0x0E:
        param = opcode & 0x10
          ? nextWord() + (opcode === 0xBE ? this.y : this.x)
          : nextWord()
        break
    }

    const flags = (res) => {
      this.N = !!(res & 0x80)
      this.Z = res === 0
    }

    const signed = n => n & 0x80 ? -((n ^ 0xFF) + 1) : n

    switch (opcode) {
      case 0x00: /* BRK       */ break
      case 0x05: /* ORA zp    */ flags(this.a |= this.memory[param]); break
      case 0x06: /* ASL zp    */ this.C = !!(this.a & 0x80); flags(this.a = (this.a << 1) & 0xFF); break
      case 0x08: /* PHP       */
        this.memory[this.sp--] =
          (this.N ? 0x80 : 0) |
          (this.V ? 0x40 : 0) |
          0x20 |
          (this.B ? 0x10 : 0) |
          (this.D ? 0x08 : 0) |
          (this.I ? 0x04 : 0) |
          (this.Z ? 0x02 : 0) |
          (this.C ? 0x01 : 0);
        break;
      case 0x09: /* ORA #     */ flags(this.a |= param); break
      case 0x0A: /* ASL A     */ this.C = !!(this.a & 0x80); flags(this.a = (this.a << 1) & 0xFF); break
      case 0x0D: /* ORA abs   */ flags(this.a |= this.memory[param]); break
      case 0x10: /* BPL rel   */ this.pc += this.N ? 0 : signedByte(param); break
      case 0x18: /* CLC       */ this.C = false; break
      case 0x19: /* ORA abs,Y */ flags(this.a |= this.memory[param]); break
      case 0x20: /* JSR abs   */ this.pc--; this.memory[this.sp--] = this.pc >> 8; this.memory[this.sp--] = this.pc & 0xFF; this.pc = param; break
      case 0x24: /* BIT zp    */
        this.Z = !(this.a & this.memory[param])
        this.N = !!(this.memory[param] & 0x80)
        this.V = !!(this.memory[param] & 0x40)
        break
      case 0x25: /* AND zp    */ flags(this.a &= this.memory[param]); break
      case 0x28: /* PLP       */ {
        const t = this.memory[--this.sp]
        this.N = !!(t & 0x80)
        this.V = !!(t & 0x40)
        this.B = !!(t & 0x10)
        this.D = !!(t & 0x08)
        this.I = !!(t & 0x04)
        this.Z = !!(t & 0x02)
        this.C = !!(t & 0x01)
        break
      }
      case 0x29: /* AND #     */ flags(this.a &= param); break
      case 0x2C: /* BIT abs   */
        this.Z = !(this.a & this.memory[param])
        this.N = !!(this.memory[param] & 0x80)
        this.V = !!(this.memory[param] & 0x40)
        break
      case 0x2D: /* AND abs   */ flags(this.a &= this.memory[param]); break
      case 0x30: /* BMI rel   */ this.pc += this.N ? signedByte(param) : 0; break
      case 0x38: /* SEC       */ this.C = true; break
      case 0x3D: /* And abs,X */ flags(this.a &= this.memory[param]); break
      case 0x48: /* PHA       */ this.memory[this.sp--] = this.a; break
      case 0x49: /* EOR #     */ flags(this.a ^= param); break
      case 0x4A: /* LSR A     */ this.C = !!(this.a & 0x01); flags(this.a >>= 1); break
      case 0x4C: /* JMP abs   */ this.pc = param; break
      case 0x50: /* BVC rel   */ this.pc += this.V ? 0 : signedByte(param); break
      case 0x58: /* CLI       */ this.I = false; break
      case 0x60: /* RTS       */ this.pc = this.memory[this.sp + 1] + this.memory[this.sp + 2] * 256 + 1; this.sp +=2; break
      case 0x65: /* ADC zp    */ {
        let n = signed(this.a) + signed(this.memory[param]) + (this.C ? 1 : 0)
        this.V = n > 127 || n < -128
        this.a += this.memory[param] + (this.C ? 1 : 0)
        this.C = this.a > 255
        flags(this.a &= 0xFF)
        break
      }
      case 0x66: /* ROR zp    */ {
        const t = this.C
        this.C = !!(this.memory[param] & 1)
        flags(this.memory[param] = (t ? 0x80 : 0) | (this.memory[param] >>> 1))
        break
      }
      case 0x68: /* PLA       */ flags(this.a = this.memory[++this.sp]); break
      case 0x69: /* ADC #     */ {
        let n = signed(this.a) + signed(param) + (this.C ? 1 : 0)
        this.V = n > 127 || n < -128
        this.a += param + (this.C ? 1 : 0)
        this.C = this.a > 255
        flags(this.a &= 0xFF)
        break
      }
      case 0x6A: /* ROR A     */ {
        const t = this.C
        this.C = !!(this.a & 1)
        flags(this.a = (t ? 0x80 : 0) | (this.a >>> 1))
        break
      }
      case 0x6C: /* JMP ind   */ this.pc = this.memory[param]; break
      case 0x6D: /* ADC abs   */ {
        let n = signed(this.a) + signed(this.memory[param]) + (this.C ? 1 : 0)
        this.V = n > 127 || n < -128
        this.a += this.memory[param] + (this.C ? 1 : 0)
        this.C = this.a > 255
        flags(this.a &= 0xFF)
        break
      }
      case 0x6E: /* ROR abs   */ {
        const t = this.C
        this.C = !!(this.memory[param] & 1)
        flags(this.memory[param] = (t ? 0x80 : 0) | (this.memory[param] >>> 1))
        break
      }
      case 0x70: /* BVS rel   */ this.pc += this.V ? signedByte(param) : 0; break
      case 0x78: /* SEI       */ this.I = true; break
      case 0x79: /* ADC abs,Y */ {
        let n = signed(this.a) + signed(this.memory[param]) + (this.C ? 1 : 0)
        this.V = n > 127 || n < -128
        this.a += this.memory[param] + (this.C ? 1 : 0)
        this.C = this.a > 255
        flags(this.a &= 0xFF)
        break
      }
      case 0x7D: /* ADC abs,X */ {
        let n = signed(this.a) + signed(this.memory[param]) + (this.C ? 1 : 0)
        this.V = n > 127 || n < -128
        this.a += this.memory[param] + (this.C ? 1 : 0)
        this.C = this.a > 255
        flags(this.a &= 0xFF)
        break
      }
      case 0x81: /* STA ind,X */ this.memory[param] = this.a; break
      case 0x84: /* STY zp    */ this.memory[param] = this.y; break
      case 0x85: /* STA zp    */ this.memory[param] = this.a; break
      case 0x86: /* STX zp    */ this.memory[param] = this.x; break
      case 0x8A: /* TXA       */ flags(this.a = this.x); break
      case 0x88: /* DEY       */ flags(this.y = (this.y - 1) & 0xFF); break
      case 0x8C: /* STY abs   */ this.memory[param] = this.y; break
      case 0x8D: /* STA abs   */ this.memory[param] = this.a; break
      case 0x8E: /* STX abs   */ this.memory[param] = this.x; break
      case 0x90: /* BCC rel   */ this.pc += this.C ? 0 : signedByte(param); break
      case 0x91: /* STA ind,Y */ this.memory[param] = this.a; break
      case 0x95: /* STA zp,X  */ this.memory[param] = this.a; break
      case 0x98: /* TYA       */ flags(this.a  = this.y); break
      case 0x9D: /* STA abs,X */ this.memory[param] = this.a; break
      case 0x99: /* STA abs,Y */ this.memory[param] = this.a; break
      case 0xA0: /* LDY #     */ flags(this.y = param); break
      case 0xA2: /* LDX #     */ flags(this.x = param); break
      case 0xA4: /* LDY zp    */ flags(this.y = this.memory[param]); break
      case 0xA5: /* LDA zp    */ flags(this.a = this.memory[param]); break
      case 0xA6: /* LDX zp    */ flags(this.x = this.memory[param]); break
      case 0xA8: /* TAY       */ this.y = this.a; break
      case 0xA9: /* LDA #     */ flags(this.a = param); break
      case 0xAA: /* TAX       */ flags(this.x = this.a); break
      case 0xAC: /* LDY abs   */ flags(this.y = this.memory[param]); break
      case 0xAD: /* LDA abs   */ flags(this.a = this.memory[param]); break
      case 0xAE: /* LDX abs   */ flags(this.x = this.memory[param]); break
      case 0xB0: /* BCS rel   */ this.pc += this.C ? signedByte(param) : 0; break
      case 0xB1: /* LDA ind,Y */ flags(this.a = this.memory[param]); break
      case 0xB5: /* LDA zp,X  */ flags(this.a = this.memory[param]); break
      case 0xB9: /* LDA abs,Y */ flags(this.a = this.memory[param]); break
      case 0xBC: /* LDY abs,X */ flags(this.y = this.memory[param]); break
      case 0xBD: /* LDA abs,X */ flags(this.a = this.memory[param]); break
      case 0xBE: /* LDX abs,Y */ flags(this.x = this.memory[param]); break
      case 0xC0: /* CPY #     */ this.C = this.y > param; this.Z = this.y === param; this.N = this.y < param; break
      case 0xC6: /* DEC zp    */ flags(this.memory[param] = (this.memory[param] - 1) & 0xFF); break
      case 0xC8: /* INY       */ flags(this.y = (this.y + 1) & 0xFF); break
      case 0xC9: /* CMP #     */ this.C = this.a > param; this.Z = this.a === param; this.N = this.a < param; break
      case 0xCA: /* DEX       */ flags(this.x = (this.x - 1) & 0xFF); break
      case 0xCD: /* CMP abs   */ this.C = this.a > this.memory[param]; this.Z = this.a === this.memory[param]; this.N = this.a < this.memory[param]; break
      case 0xCE: /* DEC abs   */ flags(this.memory[param] = (this.memory[param] - 1) & 0xFF); break
      case 0xD0: /* BNE rel   */ this.pc += this.Z ? 0 : signedByte(param); break
      case 0xD8: /* CLD       */ this.D = false; break
      case 0xDD: /* CMP abs,X */ this.C = this.a > this.memory[param]; this.Z = this.a === this.memory[param]; this.N = this.a < this.memory[param]; break
      case 0xDE: /* DEC abs,X */ flags(this.memory[param] = (this.memory[param ] - 1) & 0xFF); break
      case 0xE0: /* CPX imd   */ this.C = this.x > param; this.Z = this.x === param; this.N = this.x < param; break
      case 0xE5: /* SBC zp    */ {
        let n = signed(this.a) - signed(this.memory[param]) - (this.C ? 0 : 1)
        this.V = n > 127 || n < -128
        this.a -= this.memory[param] + (this.C ? 0 : 1)
        this.C = !(this.a < 0)
        flags(this.a &= 0xFF)
        break
      }
      case 0xE6: /* INC zp    */ flags(this.memory[param] = ((this.memory[param] + 1) & 0xFF)); break
      case 0xE8: /* INX       */ flags(this.x = (this.x + 1) & 0xFF); break
      case 0xE9: /* SBC #     */ {
        let n = signed(this.a) - signed(param) - (this.C ? 0 : 1)
        this.V = n > 127 || n < -128
        this.a -= param + (this.C ? 0 : 1)
        this.C = !(this.a < 0)
        flags(this.a &= 0xFF)
        break
      }
      case 0xEA: /* NOP       */ break
      case 0xED: /* SBC abs   */ {
        let n = signed(this.a) - signed(this.memory[param]) - (this.C ? 0 : 1)
        this.V = n > 127 || n < -128
        this.a -= this.memory[param] + (this.C ? 0 : 1)
        this.C = !(this.a < 0)
        flags(this.a &= 0xFF)
        break
      }
      case 0xEE: /* INC abs   */ flags(this.memory[param] = (this.memory[param] + 1) & 0xFF); break
      case 0xF0: /* BEQ rel   */ this.pc += this.Z ? signedByte(param) : 0; break
      case 0xF1: /* SBC ind,Y */ {
        let n = signed(this.a) - signed(this.memory[param]) - (this.C ? 0 : 1)
        this.V = n > 127 || n < -128
        this.a -= this.memory[param] + (this.C ? 0 : 1)
        this.C = !(this.a < 0)
        flags(this.a &= 0xFF)
        break
      }
      case 0xF9: /* SBC abs,Y */ {
        let n = signed(this.a) - signed(this.memory[param]) - (this.C ? 0 : 1)
        this.V = n > 127 || n < -128
        this.a -= this.memory[param] + (this.C ? 0 : 1)
        this.C = !(this.a < 0)
        flags(this.a &= 0xFF)
        break
      }
      case 0xFD: /* SBC abs,X */  {
        let n = signed(this.a) - signed(this.memory[param]) - (this.C ? 0 : 1)
        this.V = n > 127 || n < -128
        this.a -= this.memory[param] + (this.C ? 0 : 1)
        this.C = !(this.a < 0)
        flags(this.a &= 0xFF)
        break
      }
      case 0xFE: /* INC abs,X */ flags(this.memory[param] = (this.memory[param] + 1) & 0xFF); break
      default:
        throw new Error(`Illegal opcode ${opcode.toString(16).toUpperCase()} at ${(address).toString(16)}`)
    }
    if (opcode === 0x000) { // BRK
      if (this.debug)
        console.log(`BRK at ${(address).toString(16).toUpperCase()}. Exiting.`)
      return true
    }
    if (this.sp > 0x1FF) {
      if (opcode === 0x60) {  // RTS
        if (this.debug)
          console.log(`Stack underflow at ${(address).toString(16).toUpperCase()} after RTS. Exiting.`)
        this.sp = 0x1FF
        return true
      } else
        throw new Error(`Stack underflow at ${(address).toString(16).toUpperCase()} after opcode ${opcode.toString(16)}`)
    }
    if (this.sp < 0x100)
      throw new Error(`Stack overflow at ${(address).toString(16).toUpperCase()}`)
  }

  status() {
    return `A: ${this.a.toString(16)}, X: ${this.x.toString(16)}, Y: ${this.y.toString(16)}, PC: ${this.pc.toString(16)}, SP: ${this.sp.toString(16)} ` +
      `${this.N ? 'N' : 'n'} ${this.Z ? 'Z' : 'z'} ${this.C ? 'C' : 'c'} ${this.I ? 'I' : 'i'} ${this.D ? 'D' : 'd'} ${this.V ? 'V' : 'v'}`
  }

  hexDump(addr, n = 16) {
    return this.memory.slice(addr, addr + n).map(v => v.toString(16).padStart(2, '0')).join(' ')
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Cpu);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SidFile {
  constructor(data) {
    const byte = n => data[n]
    const word = n => data[n] * 256 + data[n+1]
    const longWord = n => word(n) * 65536 + word(n+2)
    const ascii = (s, n) => String.fromCharCode(...data.slice(s, s+n)).replace(/\0/g, '')
    this.header = {
      magicID: ascii(0, 4),
      version: word(4),
      dataOffset: word(6),
      loadAddress: word(8),
      initAddress: word(10),
      playAddress: word(12),
      songs: word(14),
      startSong: word(16),
      speed: longWord(18),
      name: ascii(22, 32),
      author: ascii(54, 32),
      released: ascii(86, 32),
      flags: word(118),
      startPage: byte(120),
      pageLength: byte(121),
      secondSIDAddress: byte(122),
      thirdSIDAddress: byte(123)
    }
    if (this.header.loadAddress === 0) {
      this.org = data[0x7C] + data[0x7D] * 256
      this.data = data.slice(0x7C + 2)
    } else {
      this.org = this.loadAddress
      this.data = data.slice(0x7C)
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SidFile);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (Array.isArray(parse_tree[i])) {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                        break
                    case 'e':
                        arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                        break
                    case 'g':
                        arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(match[8])) {
                    output += arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }
                parse_tree.push(match)
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (true) {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        }
    }
    /* eslint-enable quote-props */
}()


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = [80,83,73,68,0,2,0,124,0,0,174,0,174,12,0,1,0,1,0,0,0,0,73,110,116,101,114,110,97,116,105,111,110,97,108,32,75,97,114,97,116,101,0,0,0,0,0,0,0,0,0,0,0,0,82,111,98,32,72,117,98,98,97,114,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,49,57,56,54,32,83,121,115,116,101,109,32,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,174,76,144,190,76,169,190,76,175,190,76,187,190,206,232,178,16,6,169,10,141,232,178,96,238,249,178,44,234,178,48,34,80,58,169,0,141,249,178,162,2,169,0,157,189,178,157,192,178,157,195,178,169,20,157,207,178,202,16,237,141,234,178,76,91,174,80,21,169,0,141,4,212,141,11,212,141,18,212,169,15,141,24,212,169,128,141,234,178,76,243,177,162,2,206,230,178,16,6,173,231,178,141,230,178,189,185,178,141,188,178,168,173,230,178,205,231,178,208,21,189,176,179,133,64,189,179,179,133,65,222,195,178,48,9,76,155,175,76,226,177,76,194,175,188,189,178,177,64,201,255,240,10,201,254,208,23,32,3,174,76,243,177,169,0,157,195,178,157,189,178,157,192,178,76,143,174,76,226,177,168,185,182,179,133,66,185,235,179,133,67,169,0,157,241,178,188,192,178,169,255,141,210,178,177,66,157,198,178,141,211,178,41,31,157,195,178,44,211,178,112,77,254,192,178,173,211,178,16,26,200,177,66,16,15,157,241,178,200,177,66,157,244,178,254,192,178,76,252,174,157,207,178,254,192,178,200,177,66,157,204,178,10,168,173,251,178,16,33,185,249,177,141,212,178,185,250,177,172,188,178,153,1,212,157,235,178,173,212,178,153,0,212,157,238,178,76,45,175,206,210,178,172,188,178,189,207,178,142,213,178,10,10,10,170,189,10,179,141,214,178,173,251,178,16,54,189,10,179,45,210,178,153,4,212,189,8,179,153,2,212,72,189,9,179,153,3,212,72,189,11,179,153,5,212,189,12,179,153,6,212,174,213,178,169,0,157,227,178,157,224,178,104,157,5,179,104,157,2,179,173,214,178,174,213,178,157,201,178,254,192,178,188,192,178,177,66,201,255,208,8,169,0,157,192,178,254,189,178,76,226,177,173,251,178,48,3,76,226,177,172,188,178,189,198,178,41,32,208,21,189,195,178,208,16,189,201,178,41,254,153,4,212,169,0,153,5,212,153,6,212,173,251,178,48,3,76,226,177,189,207,178,10,10,10,168,140,233,178,185,15,179,141,247,178,185,14,179,141,216,178,185,13,179,208,3,76,156,176,72,41,120,74,74,74,157,252,178,104,41,7,141,215,178,189,255,178,16,10,222,221,178,208,25,254,255,178,16,20,254,221,178,189,252,178,221,221,178,176,9,157,221,178,222,255,178,222,221,178,189,204,178,10,168,56,185,249,177,249,247,177,141,217,178,185,250,177,249,248,177,206,215,178,48,7,74,110,217,178,76,47,176,141,218,178,185,249,177,141,219,178,185,250,177,141,220,178,189,252,178,74,168,136,48,22,56,173,219,178,237,217,178,141,219,178,173,220,178,237,218,178,141,220,178,76,79,176,189,198,178,41,31,201,1,144,43,188,221,178,136,48,22,24,173,219,178,109,217,178,141,219,178,173,220,178,109,218,178,141,220,178,76,116,176,172,188,178,173,219,178,153,0,212,173,220,178,153,1,212,173,247,178,41,8,240,21,172,233,178,185,8,179,109,216,178,153,8,179,172,188,178,153,2,212,76,22,177,173,216,178,240,89,172,188,178,41,15,222,224,178,16,79,157,224,178,173,216,178,41,240,141,248,178,189,227,178,208,26,173,248,178,24,125,2,179,72,189,5,179,105,0,41,15,72,201,14,208,29,254,227,178,76,8,177,56,189,2,179,237,248,178,72,189,5,179,233,0,41,15,72,201,8,208,3,222,227,178,104,157,5,179,153,3,212,104,157,2,179,153,2,212,172,188,178,189,241,178,240,65,41,126,141,213,178,189,241,178,41,1,240,28,56,189,238,178,237,213,178,157,238,178,153,0,212,189,235,178,253,244,178,157,235,178,153,1,212,76,95,177,24,189,238,178,109,213,178,157,238,178,153,0,212,189,235,178,125,244,178,157,235,178,153,1,212,173,247,178,41,1,240,53,189,235,178,240,48,189,195,178,240,43,189,198,178,41,31,56,233,1,221,195,178,172,188,178,144,16,189,235,178,222,235,178,153,1,212,189,201,178,41,254,208,8,189,235,178,153,1,212,169,128,153,4,212,234,173,247,178,41,4,240,63,173,247,178,74,74,74,74,141,196,177,160,2,201,12,240,2,160,1,140,188,177,173,249,178,41,1,208,9,189,204,178,56,233,5,76,203,177,189,204,178,10,168,185,249,177,141,212,178,185,250,177,172,188,178,153,1,212,173,212,178,153,0,212,160,255,173,250,178,208,1,200,140,251,178,202,48,3,76,104,174,169,255,141,251,178,96,22,1,39,1,56,1,75,1,95,1,115,1,138,1,161,1,186,1,212,1,240,1,14,2,45,2,78,2,113,2,150,2,189,2,231,2,19,3,66,3,116,3,169,3,224,3,27,4,90,4,155,4,226,4,44,5,123,5,206,5,39,6,133,6,232,6,81,7,193,7,55,8,180,8,55,9,196,9,87,10,245,10,156,11,78,12,9,13,208,13,163,14,130,15,110,16,104,17,110,18,136,19,175,20,235,21,57,23,156,24,19,26,161,27,70,29,4,31,220,32,208,34,220,36,16,39,94,41,214,43,114,46,56,49,38,52,66,55,140,58,8,62,184,65,160,69,184,73,32,78,188,82,172,87,228,92,112,98,76,104,132,110,24,117,16,124,112,131,64,139,112,147,64,156,120,165,88,175,200,185,224,196,152,208,8,221,48,234,32,248,46,253,0,7,14,0,1,1,1,0,0,0,12,12,12,95,23,95,0,33,0,46,73,46,20,1,20,255,23,184,1,33,255,0,27,0,130,15,2,1,4,0,0,0,0,0,0,2,2,4,160,20,15,42,15,130,184,130,0,0,0,0,0,0,0,16,153,1,255,5,2,5,255,0,255,0,128,0,0,5,0,0,8,65,10,10,0,32,85,128,5,33,9,10,0,0,85,177,1,65,11,176,29,32,8,0,8,129,15,11,0,0,197,128,8,65,10,8,0,0,197,128,0,21,15,173,16,0,0,32,9,65,109,159,43,20,0,0,8,65,88,0,0,32,84,64,1,65,29,159,43,80,0,0,2,65,9,10,0,48,117,128,0,21,15,173,0,0,245,0,8,65,9,170,0,0,85,0,8,65,15,11,0,0,1,0,8,65,9,8,0,144,85,128,2,65,9,8,0,64,84,0,8,65,15,255,0,0,5,0,2,65,9,11,0,0,5,0,8,65,26,159,17,128,0,128,1,65,28,223,43,33,0,0,2,65,28,223,51,32,0,0,0,0,0,0,0,0,0,32,169,138,180,180,181,133,22,136,172,141,36,52,66,210,10,193,76,82,98,118,237,235,39,88,184,19,112,60,136,160,101,135,173,219,230,243,12,37,67,133,198,41,94,211,52,85,134,163,180,201,222,245,72,88,175,109,126,135,182,185,182,182,184,185,185,185,182,183,184,183,185,185,183,183,184,184,184,185,186,185,186,185,185,186,186,186,186,185,186,187,187,187,187,187,188,188,188,189,189,189,189,189,189,189,189,190,190,184,190,190,190,0,0,8,8,2,3,2,3,9,9,11,11,14,15,15,11,9,9,2,3,2,3,17,18,17,17,0,0,20,20,22,22,20,20,22,22,25,25,26,26,27,27,28,28,28,28,30,30,31,31,30,30,32,32,33,34,33,34,35,36,36,37,37,38,39,39,39,39,39,39,39,39,40,41,38,40,42,43,43,43,43,44,44,44,44,45,45,45,45,46,35,0,0,25,26,27,28,28,30,30,31,31,30,30,32,32,33,34,33,34,20,20,22,22,22,47,47,47,47,0,0,17,18,17,18,2,3,2,3,2,52,0,0,0,0,0,255,49,49,49,49,49,49,4,4,4,4,4,4,4,4,4,4,4,4,10,10,10,10,10,10,10,10,16,16,16,16,16,16,16,16,16,16,10,10,10,10,10,10,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,0,49,49,49,4,4,4,4,4,4,4,4,4,4,4,4,49,49,49,49,0,0,51,0,0,0,0,0,255,0,0,8,12,12,7,7,12,12,7,7,1,5,6,6,1,5,6,6,1,7,12,12,13,5,6,6,1,1,13,13,1,1,13,13,5,5,6,6,5,5,6,6,5,5,6,6,5,5,6,6,5,5,6,6,5,5,6,6,5,5,6,6,5,5,6,6,1,1,13,13,1,1,13,13,1,5,6,6,1,5,6,6,1,7,12,12,13,5,6,6,1,5,6,6,1,5,6,6,1,7,12,12,13,5,6,6,0,19,19,19,21,21,21,21,19,19,21,21,21,21,19,19,23,23,23,23,24,24,24,24,21,21,21,21,24,24,23,23,24,24,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,19,21,21,0,0,19,23,23,24,24,21,21,24,24,23,23,24,24,21,21,19,21,21,19,21,21,19,19,21,21,21,21,0,0,0,0,48,1,5,6,6,1,5,6,6,1,7,12,12,13,5,6,6,1,5,6,6,1,5,6,6,8,50,0,0,0,0,0,255,95,95,255,131,0,63,3,65,3,63,3,65,15,58,71,3,63,3,68,3,65,3,63,7,65,3,63,3,65,3,63,3,61,7,63,7,58,95,255,131,0,63,3,65,3,63,3,65,15,58,71,3,63,3,68,3,70,3,68,3,65,3,63,3,63,3,61,3,63,3,61,7,56,7,58,95,255,151,6,51,35,53,163,253,0,53,63,46,15,46,35,53,163,244,0,53,35,56,163,253,0,56,15,51,15,53,23,51,37,49,161,255,0,49,63,46,15,46,44,56,162,240,0,56,44,58,162,129,1,58,15,53,255,131,7,82,3,82,3,82,3,80,3,80,3,80,3,77,3,80,3,77,3,77,3,77,3,75,3,80,3,80,3,77,3,80,3,82,3,82,3,82,3,80,3,80,3,80,3,77,3,80,3,77,3,77,3,77,3,75,3,75,3,73,3,73,3,70,255,161,8,44,161,254,0,44,19,46,36,51,162,224,0,51,15,53,15,44,33,44,161,254,0,44,19,46,35,56,163,224,0,56,44,58,162,129,1,58,15,53,255,146,8,46,164,160,1,46,7,58,43,56,131,255,0,56,15,53,163,8,51,35,53,35,51,35,49,2,51,164,246,0,51,7,56,43,58,163,161,1,58,15,46,163,8,56,35,58,35,56,3,58,35,61,35,63,35,61,3,63,35,65,35,68,35,65,3,63,2,65,164,177,1,65,7,58,163,8,63,35,65,35,63,3,61,31,58,71,7,58,146,8,58,164,160,2,58,7,70,42,68,132,191,1,68,15,65,23,63,7,65,42,63,132,159,1,63,15,58,255,163,8,63,7,65,35,63,7,65,35,63,35,65,35,63,7,65,3,63,36,65,162,129,1,65,35,61,3,58,35,65,7,68,35,65,7,68,35,65,35,68,35,65,7,68,3,65,35,70,163,169,1,70,35,65,3,61,255,131,11,75,3,77,3,75,3,77,15,70,71,3,75,3,80,3,77,3,75,7,77,3,75,3,77,3,75,3,73,7,75,7,70,131,12,48,7,46,3,44,7,44,131,10,77,3,43,255,131,11,75,3,77,3,75,3,77,15,70,71,3,75,3,80,3,82,3,80,3,77,3,75,3,75,3,73,3,75,3,73,7,68,7,70,131,12,48,7,46,3,44,3,44,131,11,80,3,77,3,75,255,131,1,73,7,70,3,70,131,4,82,3,70,131,1,70,3,73,3,75,3,75,7,73,131,4,70,3,82,131,5,82,3,70,255,131,1,73,7,70,11,70,3,70,3,73,3,75,3,75,23,73,255,131,1,85,3,87,3,85,3,87,131,4,82,131,1,82,131,4,85,131,1,85,3,87,3,85,3,87,3,85,131,4,82,131,5,73,131,4,85,131,5,61,255,131,9,68,3,70,3,70,3,68,131,4,82,131,9,70,131,4,85,131,9,68,131,9,70,3,70,3,68,3,70,131,4,70,131,10,68,131,4,85,131,10,36,255,131,2,18,7,18,3,18,135,3,62,135,2,18,255,131,2,20,7,20,3,20,135,3,62,131,2,20,3,32,255,131,2,22,7,22,3,22,135,3,62,135,2,22,255,131,2,29,7,29,3,29,135,3,62,131,2,29,3,29,255,131,2,27,7,27,3,27,135,3,62,131,2,27,3,39,255,131,2,25,7,25,3,25,135,3,62,135,2,25,255,133,2,31,1,31,131,3,62,135,2,31,1,34,1,36,131,3,62,129,2,41,1,43,255,133,2,26,1,26,131,3,62,135,2,26,1,29,1,31,131,3,62,129,2,36,1,38,255,133,2,29,1,29,131,3,62,135,2,29,1,32,1,34,131,3,62,129,2,39,1,41,255,133,2,24,1,24,131,3,62,135,2,24,1,27,1,29,131,3,62,129,2,34,1,36,5,24,1,24,131,3,62,135,2,24,1,27,1,29,131,3,62,129,2,34,1,36,255,161,12,43,129,16,60,1,48,129,15,91,129,16,55,1,60,129,15,91,129,16,60,161,12,43,129,16,60,1,72,1,48,129,15,91,129,16,60,129,15,91,129,16,48,255,129,13,70,1,72,3,72,3,72,1,72,1,70,3,72,1,72,1,70,1,72,1,75,3,72,1,70,1,72,3,72,3,72,1,70,1,72,7,67,71,255,129,13,74,1,77,3,79,3,79,1,79,1,77,1,79,1,82,1,79,1,82,3,79,3,74,1,74,1,77,1,74,1,77,3,74,3,72,7,74,71,255,133,14,60,5,58,7,60,1,65,1,63,1,65,1,65,3,63,5,60,5,58,7,60,1,65,1,67,1,70,1,72,3,72,255,133,14,62,5,60,7,62,1,65,1,67,1,65,1,67,1,65,1,67,5,62,5,60,7,62,1,72,1,69,1,72,1,74,1,74,1,74,255,131,14,65,1,68,3,65,1,63,7,65,1,68,1,65,1,70,1,68,1,70,1,68,3,65,1,68,3,65,1,63,7,65,1,77,1,75,1,77,1,77,1,75,1,72,255,131,14,67,1,70,3,67,1,65,7,67,1,79,1,77,1,79,1,79,1,77,1,79,255,129,17,72,1,77,1,75,1,72,1,75,1,72,1,70,1,75,1,72,1,70,3,72,71,255,129,17,69,1,74,1,72,1,69,1,72,1,69,1,67,1,69,1,67,1,65,3,62,71,255,131,17,74,1,74,1,72,1,74,1,77,1,74,1,72,3,74,1,74,1,72,1,74,1,77,1,74,1,72,255,129,17,75,1,72,1,75,1,72,35,75,3,77,34,79,160,240,3,79,34,82,160,241,3,82,34,79,160,241,3,79,3,77,1,75,1,72,1,75,1,72,35,75,3,77,34,79,160,241,3,79,34,77,160,241,3,77,34,75,160,241,3,75,3,72,255,1,74,1,77,1,74,1,77,35,74,3,77,34,77,160,240,3,77,34,79,160,241,3,79,34,74,160,240,3,74,3,77,1,74,1,77,1,74,1,77,35,74,3,77,34,74,160,241,3,74,34,72,160,241,3,72,34,70,160,241,3,70,3,67,255,163,18,58,163,192,0,58,15,60,3,60,3,58,35,58,163,192,0,58,15,60,3,60,3,62,35,58,163,224,0,58,15,55,35,53,163,184,0,53,31,55,35,58,163,192,0,58,15,60,3,60,3,63,35,63,163,224,0,63,15,65,3,65,3,67,35,65,163,254,0,65,15,62,35,60,163,208,0,60,161,19,62,33,60,33,62,33,60,33,62,33,60,33,62,33,60,15,62,255,161,128,1,63,33,65,161,128,1,63,37,65,161,128,1,63,37,65,163,241,0,65,3,63,3,60,161,128,1,65,33,67,161,128,1,65,37,67,161,128,1,65,37,67,163,241,0,67,3,65,3,67,255,1,67,33,72,1,70,1,67,33,72,1,70,1,67,33,72,1,70,1,67,33,72,1,70,163,255,0,72,3,70,1,67,33,72,1,70,1,67,33,72,1,70,1,67,33,72,1,70,1,67,33,72,1,70,163,240,0,67,3,69,1,67,33,65,1,62,1,70,33,67,1,65,1,67,33,65,1,62,1,70,33,67,1,65,35,65,163,240,0,65,51,67,0,67,0,66,0,65,0,64,0,63,0,62,0,61,0,60,0,59,0,58,0,57,0,56,255,0,36,0,34,1,36,0,39,0,36,1,39,0,41,0,39,1,41,0,43,0,41,1,43,0,46,0,43,1,46,0,48,0,46,1,48,0,51,0,48,1,51,0,53,0,51,1,53,0,55,0,53,1,55,0,58,0,55,1,58,0,60,0,58,1,60,0,63,0,60,1,63,0,65,0,63,1,65,0,67,0,65,1,67,0,70,0,67,1,70,0,72,0,70,1,72,255,0,65,0,63,0,60,0,63,0,67,0,63,0,60,0,63,0,65,0,63,0,60,0,63,0,67,0,63,0,60,0,63,255,0,67,0,65,0,62,0,65,0,70,0,65,0,62,0,65,0,67,0,65,0,62,0,65,0,70,0,65,0,62,0,65,0,67,0,65,0,62,0,65,0,70,0,65,0,62,0,65,255,167,224,0,70,39,72,167,255,0,72,39,70,0,69,0,68,0,67,0,66,0,65,0,64,0,63,0,62,255,167,208,0,65,39,67,167,223,0,67,39,65,3,63,3,65,255,1,65,1,65,161,128,1,63,1,65,1,65,1,65,161,128,1,63,1,65,255,1,67,1,67,161,128,1,65,1,67,1,67,1,67,161,128,1,65,1,67,255,161,254,0,65,1,67,1,63,1,60,161,128,1,63,1,65,161,128,1,65,1,67,255,161,128,1,65,1,67,1,67,161,128,1,65,1,67,1,67,161,128,1,65,1,67,1,67,161,128,1,65,1,67,1,67,161,128,1,65,1,67,1,67,161,128,1,65,1,67,1,67,161,128,1,65,1,67,1,67,161,128,1,65,1,67,1,67,39,67,0,66,0,65,0,64,0,63,0,62,0,61,0,60,0,59,255,1,77,1,80,1,77,1,80,3,77,3,75,7,77,71,255,71,135,12,48,3,46,11,44,3,48,7,48,7,46,3,46,3,44,3,44,255,191,6,51,63,51,63,51,63,51,63,46,127,127,127,127,127,255,191,6,89,127,127,127,127,127,255,191,6,94,127,127,127,127,127,255,169,0,141,23,212,141,4,212,141,11,212,141,18,212,169,15,141,24,212,169,64,141,234,178,96,169,192,141,234,178,96,169,0,141,250,178,141,4,212,141,11,212,96,162,0,142,4,212,142,11,212,232,142,250,178,96,0,255,0,0,255,255,0,0,255,215,0,0,255,255,0,0,255,255,0,0,215,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,255,255,0,0,253,255,0,0,255,255,0,0,237,255,0,0,168,168,198,120,73,8,182,104,149,103,168,170,168,183,134,118,119,105,73,23,58,103,117,133,147,184,217,186,170,136,120,100,103,88,89,56,69,83,103,121,155,170,185,165,132,169,151,149,152,136,119,117,104,103,104,89,89,85,101,105,123,116,134,151,153,169,184,168,150,150,134,150,134,121,155,118,102,103,121,105,89,86,86,87,86,71,72,89,70,88,104,121,138,137,152,167,182,151,151,167,165,149,166,166,151,151,150,119,119,103,88,89,72,71,57,73,55,72,103,103,135,151,136,167,215,168,133,183,140,117,135,133,168,170,169,120,168,183,135,183,150,119,120,105,86,88,72,104,120,136,135,151,167,183,167,183,168,135,88,167,103,88,104,72,136,135,72,152,151,119,137,57,120,183,70,166,104,104,105,153,118,118,53,87,104,152,107,53,150,182,40,183,121,55,136,118,104,167,56,88,135,100,118,106,102,134,104,89,166,151,86,119,152,136,104,119,101,169,153,72,134,135,183,90,103,183,120,119,149,89,183,104,134,120,103,169,200,87,71,167,183,167,121,168,153,120,167,135,151,151,87,153,152,120,121,137]

/***/ })
/******/ ]);