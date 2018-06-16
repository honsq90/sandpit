import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise, tap, filter, map } from 'rxjs/operators';

const socket = new WebSocket('wss://node2.wsninja.io');

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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
  strokeStyle: string;

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
      }),
      switchMap((_) => this.mouseMove$
        .pipe(
          pairwise(),
          takeUntil(this.mouseUp$)
        ))
    ).subscribe(([lastMove, currentMove]) => {
      this.drawStroke(this.ctx, [lastMove, currentMove], this.strokeStyle);
      socket.send(JSON.stringify({
        type: 'drawStroke',
        offsetX: currentMove.offsetX,
        offsetY: currentMove.offsetY,
        strokeStyle: this.strokeStyle
      }));
    });
  }

  drawStroke(context, [lastMove, currentMove], strokeStyle) {
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.moveTo(lastMove.offsetX, lastMove.offsetY);
    context.lineTo(currentMove.offsetX, currentMove.offsetY);
    context.closePath();
    context.stroke();
  }

  setupWebSockets() {
    const socketOpen$ = fromEvent(socket, 'open', { once: true });
    const socketMessageDrawStroke$: Observable<[DrawStrokeSocketEvent, DrawStrokeSocketEvent]> = fromEvent(socket, 'message')
      .pipe(
        map((event: MessageEvent) => JSON.parse(event.data)),
        filter((message: DrawStrokeSocketEvent) => {
          return message.type === 'drawStroke';
        }),
        pairwise(),
    );

    socketOpen$
      .subscribe((_) => {
        this.strokeStyle = getRandomColor();
        socket.send(JSON.stringify({ guid: '2b39803b-cb62-460b-8a04-c8dfc7f3b37c' }));
      });

    socketMessageDrawStroke$
      .subscribe((message) => {
        this.drawStroke(this.ctx, message, message[0].strokeStyle);
      });
  }
}

class DrawStrokeSocketEvent {
  type = 'drawStroke';
  constructor(public offsetX: string, public offsetY: string, public strokeStyle: string) { }
}
