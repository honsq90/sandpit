import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise, map, tap } from 'rxjs/operators';

const colors = ['blue', 'red', 'purple', 'gray'];

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

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;

    this.setupCanvas(canvas);
    this.handleCanvas(canvas);
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
      tap(mouseDown => {
        mouseDown.preventDefault();
        mouseDown.stopPropagation();
      }),
      switchMap(_ => this.mouseMove$
        .pipe(
          pairwise(),
          takeUntil(this.mouseUp$)
        ))
    ).subscribe(([lastMove, currentMove]) => {
      this.ctx.strokeStyle = colors[currentMove.offsetX % colors.length];
      this.ctx.beginPath();
      this.ctx.moveTo(lastMove.offsetX, lastMove.offsetY);
      this.ctx.lineTo(currentMove.offsetX, currentMove.offsetY);
      this.ctx.closePath();
      this.ctx.stroke();
    });
  }

}
