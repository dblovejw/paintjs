/*
1. canvas 위 마우스 움직임 읽고 마우스 위치 찾아주기 (function onMouseMove)
    --> offset으로 좌표 찾기
    **offset vs client: canvas위 vs 전체화면
2. 마우스를 클릭했을때 paint 실행 (function onMouseDown)
    --> 클릭하면 true 마우스를 떄거나 벗어나면 false
*/
const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
}