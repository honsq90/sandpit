import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { PhoenixSocket, PhoenixChannel } from '../lib/phoenix-rxjs';

import { switchMap, takeUntil, pairwise, tap, mergeMap, filter } from 'rxjs/operators';

const phoenixSocket = new PhoenixSocket('ws://localhost:4000/socket');

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const STROKE_STARTED = 'stroke_started';
const STROKE_ADDED = 'stroke_added';
const STROKE_ENDED = 'stroke_ended';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('appCanvas') canvas;
  @ViewChild('appCanvasContainer') canvasContainer;

  ctx: CanvasRenderingContext2D;
  mouseDown$: Observable<MouseEvent>;
  mouseMove$: Observable<MouseEvent>;
  mouseUp$: Observable<MouseEvent>;
  color: string;
  socketPending = true;
  canvasChannel: PhoenixChannel;

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;

    this.setupCanvas(canvas);
    this.handleCanvas(canvas);
    this.setupWebSockets();
  }

  setupCanvas(canvas) {
    const containerStyle = getComputedStyle(this.canvasContainer.nativeElement);
    canvas.width = parseInt(containerStyle.width, 10);
    canvas.height = parseInt(containerStyle.height, 10);

    this.ctx = canvas.getContext('2d');
    this.ctx.lineWidth = 5;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
  }

  handleCanvas(canvas) {
    this.mouseDown$ = fromEvent(canvas, 'mousedown');
    this.mouseMove$ = fromEvent(canvas, 'mousemove');
    this.mouseUp$ = fromEvent(canvas, 'mouseup');

    this.mouseDown$.pipe(
      tap((mouseDown) => {
        mouseDown.preventDefault();
        mouseDown.stopPropagation();
        this.publishToSocket(STROKE_STARTED, mouseDown);
      }),
      switchMap((_) => this.mouseMove$
        .pipe(
          takeUntil(this.mouseUp$
            .pipe(
              tap((mouseUp) => this.publishToSocket(STROKE_ENDED, mouseUp))
            )),
      )),
    ).subscribe(
      (currentMove) => {
        this.publishToSocket(STROKE_ADDED, currentMove);
      },
    );
  }

  publishToSocket(message: string, currentMove: MouseEvent) {
    this.canvasChannel.push(message, {
      x: currentMove.offsetX,
      y: currentMove.offsetY,
      color: this.color,
    });
  }

  drawStroke(context, [lastMove, currentMove], strokeStyle) {
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.moveTo(lastMove.x, lastMove.y);
    context.lineTo(currentMove.x, currentMove.y);
    context.closePath();
    context.stroke();
  }

  setupWebSockets() {
    this.color = getRandomColor();

    const canvasChannel = phoenixSocket.channel('rooms:canvas', { color: this.color });
    this.canvasChannel = canvasChannel;
    canvasChannel.join()
      .subscribe((_) => {
        this.socketPending = false;
      });

    const strokeStartedEvent$ = canvasChannel.messages(STROKE_STARTED);

    const socketMessageDrawStroke$ = strokeStartedEvent$
      .pipe(
        mergeMap((strokeStarted: StrokeSocketEvent) => {
          const strokeAddedEvent$ = canvasChannel.messages(STROKE_ADDED)
            .pipe(
              filter((stroke: StrokeSocketEvent) => stroke.color === strokeStarted.color),
          );
          const strokeEndedEvent$ = canvasChannel.messages(STROKE_ENDED)
            .pipe(
              filter((stroke: StrokeSocketEvent) => stroke.color === strokeStarted.color),
          );
          return strokeAddedEvent$
            .pipe(
              takeUntil(strokeEndedEvent$),
              pairwise(),
          );
        }),
    );

    socketMessageDrawStroke$
      .subscribe((messages: [StrokeSocketEvent, StrokeSocketEvent]) => {
        this.drawStroke(this.ctx, messages, messages[0].color);
      });
  }
}

class StrokeSocketEvent {
  constructor(public x: string, public y: string, public color: string) { }
}
