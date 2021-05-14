export default class Recorder {
  constructor() {
    this.audioType = "audio/webm;codecs=opus";
    this.mediaRecorder = {};

    this.recordedBlobs = [];
  }

  _setup() {
    const options = { mimeType: this.audioType };
    const isSupported = MediaRecorder.isTypeSupported(options.mimeType);

    if (!isSupported) {
      const message = `The coded ${options.mimeType} isn't supported!`;
      alert(message);

      throw new Error(message);
    }

    return options;
  }

  startRecording(stream) {
    const options = this._setup();
    this.mediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.onstop = (event) => {
      console.log("Recorded blobs", this.recordedBlobs);
    };

    this.mediaRecorder.ondataavaliable = (event) => {
      if (!event.data || !event.data.size) return;

      this.recordedBlobs.push(event.data);
    };

    this.mediaRecorder.start();

    console.log("media recorder started", this.mediaRecorder);
  }

  async stopRecording() {
    console.log('this.mediaRecorder', this.mediaRecorder)
    if (this.mediaRecorder.state === "inactive") return;

    this.mediaRecorder.stop();

    console.log("media recorder stopped");
  }
}
