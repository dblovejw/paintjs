/*
1. canvas 위 마우스 움직임 읽고 마우스 위치 찾아주기 (function onMouseMove)
    --> offset으로 좌표 찾기
    **offset vs client: canvas위 vs 전체화면
2. 마우스를 클릭했을때만 paint 실행 (function onMouseDown,up,stopPainting)
    --> 클릭하면 true 마우스를 떄거나 벗어나면 false
------------------------------------------------

3. 눌렀을떄 paint 되도록 canvas의 context를 만들어 픽셀을 조작
    ** https://developer.mozilla.org/ko/docs/Web/API/CanvasRenderingContext2D

4. 마우스를 움직일때 path를 생성하고 그 생성된 path중 painting = true일떄 선이 만들어지도록 시행
---------------------------------------------------
<change colors>
5. HTML에서 jscolors 가져오기
6. colors을 array로 만든 후 각 color를 클릭시 변경되도록 함
*/

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

//pixel modifier에 사이즈를 줘야지 paint가 시행됨
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(event){
  painting = false;
}

function startPainting(event){
    painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX; 
  const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y); //beginPath로 path를 만들면 마우스의 x,y좌표를 path로 준다.
    } else {
        ctx.lineTo(x, y); //moveTo에서 lineTo까지 path를 만든다.
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  ); //color를 potato로 바꿔도 상관없다.