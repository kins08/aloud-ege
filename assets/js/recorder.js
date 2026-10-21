const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function rmsOf(buffer) {
  let sum = 0;
  for (let i = 0; i < buffer.length; i += 1) sum += buffer[i] * buffer[i];
  return Math.sqrt(sum / buffer.length);
}

function estimatePitch(buffer, sampleRate) {
  const size = buffer.length;
  const step = 2;
  const effectiveRate = sampleRate / step;
  const minLag = Math.floor(effectiveRate / 340);
  const maxLag = Math.floor(effectiveRate / 70);
  let bestLag = -1;
  let bestScore = 0;
  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let corr = 0;
    let energyA = 0;
    let energyB = 0;
    for (let i = 0; i + lag * step < size; i += step) {
      const a = buffer[i];
      const b = buffer[i + lag * step];
      corr += a * b;
      energyA += a * a;
      energyB += b * b;
    }
    const score = corr / Math.sqrt(energyA * energyB + 1e-12);
    if (score > bestScore) {
      bestScore = score;
      bestLag = lag;
    }
  }
  if (bestScore < 0.42 || bestLag < 0) return null;
  const f0 = sampleRate / (bestLag * step);
  return f0 >= 70 && f0 <= 350 ? f0 : null;
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * p)));
  return sorted[index];
}

export class ReadingRecorder {
  constructor({ lang = 'en-GB', onLevel, onTranscript, onAsrError, onStateChange } = {}) {
    this.lang = lang;
    this.onLevel = onLevel;
    this.onTranscript = onTranscript;
    this.onAsrError = onAsrError;
    this.onStateChange = onStateChange;
    this.state = 'idle';
    this.asrSupported = Boolean(SpeechRecognitionCtor);
    this.finalParts = [];
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.asrError = '';
    this.frames = [];
    this.pitchFrames = [];
    this.sampleTimer = null;
    this.stream = null;
    this.audioContext = null;
    this.analyser = null;
    this.buffer = null;
    this.mediaRecorder = null;
    this.chunks = [];
    this.recognition = null;
    this.startedAt = 0;
    this.stoppedAt = 0;
    this.audioUrl = null;
    this._stopResolver = null;
    this._pitchCounter = 0;
  }

  get isRecording() {
    return this.state === 'recording';
  }

  elapsed() {
    if (!this.startedAt) return 0;
    const end = this.stoppedAt || performance.now();
    return (end - this.startedAt) / 1000;
  }

  async start() {
    if (this.state === 'recording') return;
    if (!window.isSecureContext) {
      throw new Error('Микрофон доступен только на localhost или по https. Запустите сайт через start.bat.');
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Браузер не поддерживает запись с микрофона. Откройте сайт в Chrome, Edge или Safari.');
    }
    this.reset();
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
    } catch (error) {
      throw new Error(this.permissionMessage(error));
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioCtx();
    await this.audioContext.resume();
    const source = this.audioContext.createMediaStreamSource(this.stream);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.35;
    source.connect(this.analyser);
    this.buffer = new Float32Array(this.analyser.fftSize);

    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
    const mimeType = candidates.find(type => window.MediaRecorder?.isTypeSupported?.(type));
    try {
      this.mediaRecorder = mimeType
        ? new MediaRecorder(this.stream, { mimeType })
        : new MediaRecorder(this.stream);
    } catch (error) {
      this.cleanup();
      throw new Error('Не удалось начать запись аудио в этом браузере.');
    }
    this.chunks = [];
    this.mediaRecorder.addEventListener('dataavailable', event => {
      if (event.data && event.data.size > 0) this.chunks.push(event.data);
    });
    this.mediaRecorder.addEventListener('stop', () => {
      const type = this.mediaRecorder?.mimeType || 'audio/webm';
      const blob = new Blob(this.chunks, { type });
      if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = URL.createObjectURL(blob);
      if (this._stopResolver) this._stopResolver();
    });
    this.mediaRecorder.start(250);

    this.startedAt = performance.now();
    this.stoppedAt = 0;
    this.setState('recording');
    this.sampleTimer = setInterval(() => this.sample(), 100);
    this._startAsr();
    return true;
  }

  permissionMessage(error) {
    const name = error?.name || '';
    if (name === 'NotAllowedError' || name === 'SecurityError') {
      return 'Доступ к микрофону запрещён. Разрешите его в настройках браузера для этой страницы и попробуйте снова.';
    }
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      return 'Микрофон не найден. Подключите микрофон или гарнитуру и попробуйте снова.';
    }
    if (name === 'NotReadableError' || name === 'TrackStartError') {
      return 'Микрофон занят другим приложением. Закройте его и повторите запись.';
    }
    return 'Не удалось включить микрофон. Проверьте разрешения браузера и попробуйте снова.';
  }

  setState(state) {
    this.state = state;
    this.onStateChange?.(state);
  }

  _startAsr() {
    if (!SpeechRecognitionCtor) {
      this.onAsrError?.('Автоматическое распознавание речи недоступно. Запись и аудиометрия работают, но текст нужно будет вставить вручную.');
      return;
    }
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = this.lang;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const text = String(result[0]?.transcript || '').trim();
        if (result.isFinal) {
          if (text) this.finalParts.push(text);
        } else if (text) {
          interim += `${text} `;
        }
      }
      this.finalTranscript = this.finalParts.join(' ').replace(/\s+/g, ' ').trim();
      this.interimTranscript = interim.trim();
      this.onTranscript?.(this.finalTranscript, this.interimTranscript);
    };
    recognition.onerror = event => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.asrError = 'Распознавание речи заблокировано браузером. Вставьте текст вручную после записи.';
      } else if (event.error === 'network') {
        this.asrError = 'Распознаванию речи нужен интернет. Запись сохранена — вставьте транскрипт вручную.';
      } else {
        this.asrError = `Распознавание остановилось (${event.error}). Можно вставить текст вручную.`;
      }
      this.onAsrError?.(this.asrError);
    };
    recognition.onend = () => {
      if (this.state === 'recording' && !this.asrError) {
        setTimeout(() => {
          if (this.state === 'recording') {
            try {
              recognition.start();
            } catch {
              /* уже запущено */
            }
          }
        }, 250);
      }
    };
    this.recognition = recognition;
    try {
      recognition.start();
    } catch {
      /* старт может не сработать с первого раза */
    }
  }

  sample() {
    if (!this.analyser || !this.buffer) return;
    this.analyser.getFloatTimeDomainData(this.buffer);
    const rms = rmsOf(this.buffer);
    const t = (performance.now() - this.startedAt) / 1000;
    this.frames.push({ t, rms });
    this.onLevel?.(Math.min(1, rms * 9));
    this._pitchCounter += 1;
    if (this._pitchCounter % 2 === 0 && rms > 0.012) {
      const pitch = estimatePitch(this.buffer, this.audioContext.sampleRate);
      if (pitch) this.pitchFrames.push(pitch);
    }
  }

  async stop() {
    if (this.state !== 'recording') {
      return {
        transcript: this.finalTranscript.trim(),
        metrics: this.computeMetrics(),
        audioUrl: this.audioUrl,
        asrSupported: this.asrSupported,
        asrError: this.asrError
      };
    }
    this.stoppedAt = performance.now();
    this.setState('stopping');
    clearInterval(this.sampleTimer);
    this.sampleTimer = null;
    this.onLevel?.(0);

    const recorderStopped = new Promise(resolve => {
      this._stopResolver = resolve;
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        try {
          this.mediaRecorder.stop();
        } catch {
          resolve();
        }
      } else {
        resolve();
      }
    });

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        /* уже остановлено */
      }
    }

    await Promise.race([recorderStopped, delay(1800)]);
    await delay(this.asrSupported ? 800 : 80);
    const metrics = this.computeMetrics();
    const result = {
      transcript: this.finalTranscript.trim(),
      metrics,
      audioUrl: this.audioUrl,
      asrSupported: this.asrSupported,
      asrError: this.asrError
    };
    this.cleanup();
    this.setState('stopped');
    return result;
  }

  computeMetrics() {
    const duration = (this.stoppedAt - this.startedAt) / 1000;
    const frames = this.frames;
    if (!frames.length || duration <= 0) {
      return {
        durationSec: Math.max(0, duration),
        speechDurationSec: 0,
        speechRatio: 0,
        pauseCount: 0,
        longestPause: 0,
        longPauses: [],
        pitchRangeSemitones: null,
        flatRatio: null
      };
    }
    const rmsValues = frames.map(frame => frame.rms);
    const noiseFloor = percentile(rmsValues, 0.2);
    const maxRms = Math.max(...rmsValues);
    const threshold = Math.max(0.004, noiseFloor * 2.3);
    const voiced = frames.map(frame => frame.rms > threshold);
    const voicedCount = voiced.filter(Boolean).length;
    const speechRatio = voicedCount / frames.length;

    const firstVoiced = voiced.indexOf(true);
    const lastVoiced = voiced.lastIndexOf(true);
    const longPauses = [];
    let silentRun = 0;
    for (let i = Math.max(0, firstVoiced); i <= lastVoiced; i += 1) {
      if (voiced[i]) {
        if (silentRun > 0) {
          const runStart = i - silentRun;
          const pauseDuration = silentRun * 0.1;
          if (pauseDuration >= 0.8) {
            longPauses.push({
              start: Number(frames[runStart].t.toFixed(1)),
              duration: Number(pauseDuration.toFixed(1))
            });
          }
          silentRun = 0;
        }
      } else {
        silentRun += 1;
      }
    }

    let pitchRange = null;
    let flatRatio = null;
    if (this.pitchFrames.length >= 8) {
      const p10 = percentile(this.pitchFrames, 0.1);
      const p90 = percentile(this.pitchFrames, 0.9);
      pitchRange = Number((12 * Math.log2(p90 / p10)).toFixed(1));
      const median = percentile(this.pitchFrames, 0.5);
      const low = median * Math.pow(2, -1.2 / 12);
      const high = median * Math.pow(2, 1.2 / 12);
      flatRatio = Number((this.pitchFrames.filter(v => v >= low && v <= high).length / this.pitchFrames.length).toFixed(2));
    }

    return {
      durationSec: Number(duration.toFixed(1)),
      speechDurationSec: Number((duration * speechRatio).toFixed(1)),
      speechRatio: Number(speechRatio.toFixed(2)),
      pauseCount: longPauses.length,
      longestPause: longPauses.reduce((max, pause) => Math.max(max, pause.duration), 0),
      longPauses,
      pitchRangeSemitones: pitchRange,
      flatRatio,
      noiseFloor: Number(noiseFloor.toFixed(4)),
      peakLevel: Number(maxRms.toFixed(3))
    };
  }

  cleanup() {
    clearInterval(this.sampleTimer);
    this.sampleTimer = null;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(() => {});
    }
    this.audioContext = null;
    this.analyser = null;
  }

  releaseAudio() {
    this.audioUrl = null;
  }

  reset() {
    this.finalParts = [];
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.asrError = '';
    this.frames = [];
    this.pitchFrames = [];
    this._pitchCounter = 0;
    this.startedAt = 0;
    this.stoppedAt = 0;
    this.chunks = [];
    this._stopResolver = null;
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
  }

  destroy() {
    this.cleanup();
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        /* ignore */
      }
    }
    this.reset();
    this.setState('idle');
  }
}
