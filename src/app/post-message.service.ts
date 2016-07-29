import {Injectable} from '@angular/core';

@Injectable()
export class PostMessageService {
  private observer: MutationObserver = null;
  private target: Window = null;

  constructor() {
    if (window.self === window.top) { return; }
    this.target = window.top;

    window.addEventListener("message", this.receiveMessage, false);

    this.observer = new MutationObserver(mutations => {
      this.sendMessage("height", window.document.documentElement.scrollHeight);
    });
    let config: MutationObserverInit = { attributes: true, childList: true, characterData: true, subtree: true };
    this.observer.observe(document.body, config);
  }

  sendMessage(messageType: string, data: any) {
    if (this.target === null) { return; }
    let message: IPostMessage = {
      messageType: messageType,
      data: data
    };
    this.target.postMessage(message, "*");
  }

  private receiveMessage(event: Event) {

  }
}
interface IPostMessage {
  messageType: string
  data: any
}
