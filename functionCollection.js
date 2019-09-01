function getValues() {
    for (let i = 0; i < 81; i++) {
        //console.log(i%9,Math.floor(i/9));
        if (boardId[i].value) {
            borad[i % 9][Math.floor(i / 9)] = Number(boardId[i].value);
        }
        else {
            borad[i % 9][Math.floor(i / 9)] = 0;
        }

    }
}
function setValues() {
    for (let i = 0; i < 81; i++) {
        boardId[i].value = borad[i % 9][Math.floor(i / 9)];
    }
}

function clearButtonClick() {
    for (let i = 0; i < 81; i++) {
        boardId[i].value = "";
        borad[i % 9][Math.floor(i / 9)] = 0;
    }
}

function solveButtonClick() {
    getValues();

    //Checking before try to solve
    let preFlag = 0;
    for (let row = 0; row < N; row++) {
        let counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let col = 0; col < N; col++) {
            if (borad[row][col] > 0) {
                counter[borad[row][col]]++;
            }

            if (counter[borad[row][col]] > 1) {
                //onsole.log(counter[borad[row][col]]);
                preFlag++;
            }
        }
    }
    for (let col = 0; col < N; col++) {
        let counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let row = 0; row < N; row++) {
            if (borad[row][col] > 0) {
                counter[borad[row][col]]++;
            }
            if (counter[borad[row][col]] > 1) {
                //console.log(counter[borad[row][col]]);
                preFlag++;
            }
        }
    }
    for (let startRow = 0, startCol = 0, i = 0; i < N; i++) {
        let counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (borad[row + startRow][col + startCol] > 0) {
                    counter[borad[row + startRow][col + startCol]]++;
                }
                if (counter[borad[row + startRow][col + startCol]] > 1) {
                    preFlag++;
                }
            }
        }
        startRow = (startRow + 3) % 9;
        if ((i + 1) % 3 == 0) {
            startCol = (startCol + 3) % 9;
        }
    }
    if (preFlag > 0) {
        alert("No solve");
    }
    else {
        SolveSudoku(borad) ? alert("Solved") : alert("No solve");
        setValues();
    }

}


function UsedInRow(grid, row, num) {
    for (let col = 0; col < N; col++)

        if (grid[row][col] === num) {

            return true;
        }
    return false;
}


function UsedInCol(grid, col, num) {
    for (let row = 0; row < N; row++)
        if (grid[row][col] == num)
            return true;
    return false;
}

function UsedInBox(grid, boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++)
        for (let col = 0; col < 3; col++)
            if (grid[row + boxStartRow][col + boxStartCol] == num)
                return true;
    return false;
}
function isSafe(grid, row, col, num) {
    return !UsedInRow(grid, row, num) && !UsedInCol(grid, col, num) && !UsedInBox(grid, row - row % 3, col - col % 3, num) && grid[row][col] == UNASSIGNED;
}

function FindUnassignedLocation(grid, row, col) {
    for (row = 0; row < N; row++)
        for (col = 0; col < N; col++)
            if (grid[row][col] === UNASSIGNED)
                return true;
    return false;
}

function SolveSudoku(grid) {
    let row, col, flag = 0
    for (row = 0; row < N; row++) {
        for (col = 0; col < N; col++) {
            if (grid[row][col] === UNASSIGNED) {
                flag = 1;
                break;
            }
        }
        if (flag === 1)
            break;
    }
    if (flag === 0)
        return true;
    //console.log(row,col);
    // consider digits 1 to 9  
    for (let num = 1; num <= 9; num++) {
        // if looks promising  
        if (isSafe(grid, row, col, num)) {
            // make tentative assignment  
            //console.log(row,col,num,grid);

            grid[row][col] = num;


            // return, if success, yay!  
            if (SolveSudoku(grid))
                return true;

            // failure, unmake & try again  
            grid[row][col] = UNASSIGNED;
        }
        else {
            //console.log("notsafe"+row,col);
        }
    }
    return false; // this triggers backtracking  
}  