export default class View {
  constructor() {
    this.btnStart = document.getElementById("btnStart");
    this.btnStop = document.getElementById("btnStop");
    this.audioElement = document.getElementById("audio");
  }

  /**
   * Retorna uma closure que executará o comando
   *
   * @param command Comando a ser executado ao clicar no botao gravar
   */
  onRecordClick(command) {
    return () => {
      command();
      this.toggleAudioElementVisible({ visible: false });
    };
  }

  onStopRecordingClick(command) {
    return () => {
      command();
    };
  }

  configureStartRecordingButton(command) {
    this.btnStart.addEventListener("click", this.onRecordClick(command));
  }

  configureStopRecordingButton(command) {
    this.btnStop.addEventListener("click", this.onStopRecordingClick(command));
  }

  toggleAudioElementVisible({ visible }) {
    const classList = this.audioElement.classList;

    visible ? classList.remove("hidden") : classList.add("hidden");
  }

  playAudio(url) {
    const audio = this.audioElement;
    audio.src = url;
    audio.muted = false;
    this.toggleAudioElementVisible({ visible: true });
    audio.addEventListener("loadedmetadata", (_) => audio.play());
  }
}
