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
---------------------------------------------------
<Bruch size>
7. HTML에서 jsRange 가져오기
8. range의 input 변경시 ctx로 range 변경해주기
9. filling모드와 paint 모드 만들어주기 (7번 후 input을 변경)
----------------------------------------------------
<Filling mode>
10. 색 click시 ctx에 색을 fillstyle로 저장하고 canvas 클릭시 fillrect로 canvas 칠해지도록 함.
----------------------------------------------------
<save image>
11. 사진 저장시 투명해짐 -> html에서만 white로 저장되었기 때문에 canvas 자체를 하얀색으로 해줘야함
    --> ctx.fillstyle & ctx.fillRect 사용. 
12. 우클릭으로 사진저장 방지
    --> contextMenu (우클릭 event)사용한 다음 preventDefault 사용
13. save버튼 누를시 사진 저장
    --> 1) canvas에 있는 image를 URL로 변환 -> canvas.toDataURL
            ** https://developer.mozilla.org/ko/docs/Web/API/HTMLCanvasElement/toDataURL
        2) 앵커(a)에 href & download를 이용해 넣은다음 이를 클릭해 실행하도록 함
*/

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //처음 canvas 화면을 하얀색으로 해주기 위해 --> 이거 안하면 사진 저장시 투명색으로 나옴
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
    //**https://developer.mozilla.org/ko/docs/Web/API/Event/target#Example
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true) {
        filling = false;
        mode.innerText = "Filling"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
  }

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  ); //color를 potato로 바꿔도 상관없다.

if(range) {
    range.addEventListener("input",handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }