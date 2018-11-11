import { pipe } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

const getMousePos = (mouseEvent: MouseEvent) => {
  return {
    offsetX: mouseEvent.offsetX,
    offsetY: mouseEvent.offsetY,
  };
};

export const mapMouseEventToStrokeMove = () => map((mouseEvent: MouseEvent) => getMousePos(mouseEvent));

export const mouseEventPreventDefault = () => tap((event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
});

const getTouchPos = (canvasDom, touchEvent) => {
  const rect = canvasDom.getBoundingClientRect();
  return {
    offsetX: touchEvent.changedTouches[0].clientX - rect.left,
    offsetY: touchEvent.changedTouches[0].clientY - rect.top
  };
};

export const touchEventOperators = (canvas) => pipe(
  tap((touchEvent: TouchEvent) => {
    if (touchEvent.target === canvas) {
      touchEvent.preventDefault();
    }
  }),
  filter((touchEvent: TouchEvent) => touchEvent.changedTouches.length > 0),
  map((touchEvent: TouchEvent) => getTouchPos(canvas, touchEvent)),
);
