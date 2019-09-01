let borad = [] , boardId=[];
let solveBtn= document.getElementById("solve-btn");
let clearBtn= document.getElementById("clear-btn");
const UNASSIGNED =0 , N=9;

for(let i=0;i<9;i++){
    borad[i]= new Array(9);
}
for(let i=0;i<81;i++){
    boardId[i]=document.getElementById("cell-"+ i.toString());
}

solveBtn.addEventListener("click", solveButtonClick);
clearBtn.addEventListener("click", clearButtonClick);