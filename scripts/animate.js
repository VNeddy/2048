function showNumberWithAnimation(randx, randy, rand_number) {
    number_cell = $('#number_cell_' + randx + '_' + randy);
    number_cell.css({
        'background': getNumberBackgroundColor(rand_number),
        'color': getNumberColor(rand_number),
        'font-size': getNumberFontSize(rand_number),
    });
    // 在棋盘上显示
    number_cell.text(rand_number);
    // 并赋值给数组
    board[randx][randy] = rand_number;

    number_cell.animate({
        width: grid_cell_width,
        height: grid_cell_width,
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy) {
    var number_cell = $('#number_cell_' + fromx + '_' + fromy);
    number_cell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy),
    }, 200);
}

function gameOverAnimation() {
    $('#gameover').animate({
        fontSize: 0.6 * grid_cell_width,
        width: grid_container_width,
        height: grid_container_width,
        top: 0,
        left: 0,
    }, 200);
}
