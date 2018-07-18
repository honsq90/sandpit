import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Socket, Channel } from 'phoenix';

export class PhoenixChannel {
  private channel: Channel;

  constructor(socket: Socket, topic: string, params = {}) {
    this.channel = socket.channel(topic, params);
  }

  join() {
    return new Observable((observer) => {
      this.channel.join()
        .receive('ok', (resp) => {
          observer.next(resp);
        })
        .receive('error', (resp) => {
          observer.error(resp);
        });
    });
  }

  push(message: string, payload: any, timeout?: number) {
    this.channel.push(message, payload, timeout);
  }

  leave(timeout?: number) {
    this.channel.leave(timeout);
  }

  messages(message) {
    return new Observable((observer) => {
      this.channel.on(message, (resp) => {
        observer.next(resp);
      });
    }).pipe(
      share(),
    );
  }
}

export class PhoenixSocket {
  private socket: Socket;

  constructor(socketUrl) {
    this.socket = new Socket(socketUrl);
    this.socket.connect();
  }

  channel(topic, params = {}): PhoenixChannel {
    return new PhoenixChannel(this.socket, topic, params);
  }
}

