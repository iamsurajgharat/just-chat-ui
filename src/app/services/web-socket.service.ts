import { Injectable } from '@angular/core';
import { PartialObserver } from 'rxjs';
import { webSocket, WebSocketSubjectConfig, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService<T> {

  constructor() { }

  webSocket(config: WebSocketSubjectConfig<T>): WebSocketSubjectService<T> {
    return new WebSocketSubjectService(webSocket(config))
  }
}

export class WebSocketSubjectService<T> {
  constructor(private subject: WebSocketSubject<T>) { }
  subscribe(observer: PartialObserver<T>) {
    this.subject.subscribe(observer)
  }

  next(arg: T) {
    this.subject.next(arg)
  }
}