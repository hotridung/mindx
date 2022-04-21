let arr1 = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],

];
let arr2 = [
    [0, 1, 1, 1, 1, 0],
    [1, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
];
let arr3 = [
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
];



function numGardens(arr) {
    let row = arr.length;
    let col = arr[0].length;

    let count = 0;
    for (let i = 1; i < row - 1; i++) {
        for (let j = 1; j < col - 1; j++) {
            if (arr[i][j] == 0 || arr[i][j] == 2) {
                if (CheckBoder(i, j, row, col, arr)) count++;
            }
        }
    }
    return count;
}

function CheckBoder(i, j, row, col, arr) {
    if (i < 0 || i > row || j < 0 || j > col) return false;
    if (arr[i][j] == 1) return true;

    arr[i][j] = 1;

    if (
        CheckBoder(i - 1, j, row, col, arr) &&
        CheckBoder(i + 1, j, row, col, arr) &&
        CheckBoder(i, j - 1, row, col, arr) &&
        CheckBoder(i, j + 1, row, col, arr)
    ) {
        return true;
    } else {
        arr[i][j] = 0;
        return false;
    }
}
var ketquamau1 = document.getElementById('numGardens');
ketquamau1.innerText = numGardens(arr1);
var ketquamau2 = document.getElementById('numGardens-2');
ketquamau2.innerText = numGardens(arr2);
var ketquamau2 = document.getElementById('numGardens-3');
ketquamau2.innerText = numGardens(arr3);