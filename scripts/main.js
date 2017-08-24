var board = [],
    score = 0,
    highest_score = 0,
    // 是否有过叠加
    hasConflicted = [],
    // 触控坐标
    startx = 0,
    starty = 0,
    endx = 0,
    endy = 0;

$(document).ready(function() {
    prepareForMobile();
    newGame();
    runGame();
    $('#newgame_button').click(function() {
        newGame();
        // 每次点击按钮都会运行一个新的newGame()，导致按下一次键盘，触发多个事件
        // runGame();
    });
    $('.back-btn').click(function() {
        if(confirm("您确定要退出游戏吗？")) {
            var opened=window.open('about:blank','_self');
            opened.opener=null;
            opened.close();
        }
    });
});

function prepareForMobile() {

    if (document_width > 500) {
        grid_container_width = 375;
        grid_cell_width = 75;
        grid_cell_space = 15;
    }
    $('#grid_container').css({
        'width': grid_container_width - 2 * grid_cell_space,
        'height': grid_container_width - 2 * grid_cell_space,
        'padding': grid_cell_space,
        'border-radius': 0.02 * grid_container_width
    });
    $('.grid_cell').css({
        'width': grid_cell_width,
        'height': grid_cell_width,
        'border-radius': 0.06 * grid_cell_width
    });
    $('#scorediv').css({
        'width': grid_container_width - 2 * grid_cell_space
    });
}

function newGame() {
    // 初始化棋盘
    init();
    // 在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    // 初始化每一个小格的位置
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var grid_cell = $('#grid_cell_' + i + '_' + j);
            grid_cell.css({
                'top': getPosTop(i, j),
               'left': getPosLeft(i, j),
           });
       }
    }
    // 初始化二维数组
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    score = 0;

    // 初始化gameOver()
    $('#gameover').css({
        'font-size': '0px',
        'width': 0,
        'height': 0,
        'top': (grid_container_width - 2 * grid_cell_space) / 2,
        'left': (grid_container_width - 2 * grid_cell_space) / 2,
        'border-radius': 0.02 * grid_container_width
    });
    // 更新棋盘
    updateBoardView();
}

function updateBoardView() {
    // 若棋盘上有数字，则删除
    $('.number_cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid_container').append('<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>');
            var this_number_cell = $('#number_cell_' + i + '_' + j);
            // 当前位置没有数字
            if (!board[i][j]) {
                this_number_cell.css({
                    'width': '0px', // 使number_cell隐藏
                    'height': '0px',
                    'top': getPosTop(i, j),
                    'left': getPosLeft(i, j),
                    'border-radius': 0.06 * grid_cell_width,
                    'line-height': grid_cell_width + 'px',
                    // font-size不起作用，放在了showNumberWithAnimation()中
                    // 'font-size': getNumberFontSize(board[i][j]),
                });
            } else {
                this_number_cell.css({
                    'width': grid_cell_width,
                    'height': grid_cell_width,
                    'top': getPosTop(i, j),
                    'left': getPosLeft(i, j),
                    'background': getNumberBackgroundColor(board[i][j]),
                    'color': getNumberColor(board[i][j]),
                    'font-size': getNumberFontSize(board[i][j]),
                    'border-radius': 0.06 * grid_cell_width,
                    'line-height': grid_cell_width + 'px',
                });
                this_number_cell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $('#score').text(score);
    $('#highest_score').text(highest_score);
}

// 生成随机数
function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }
    // 随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4)), // 随机生成0-3的随机数
        randy = parseInt(Math.floor(Math.random() * 4));

    // 检查随机出来的位置是否为0
    while (true) {
        if (!board[randx][randy]) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    // 随机一个数字
    var rand_number = Math.random() < 0.5 ? 2 : 4;
    // 显示随机数
    showNumberWithAnimation(randx, randy, rand_number);
    return true;
}

function runGame() {

    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37: // left
                //取消浏览器默认行为
                event.preventDefault();
                if (moveLeft()) {
                    // 加setTimeout是为了动画播放完整
                    setTimeout(function() {
                        updateBoardView();
                    }, 200);
                    setTimeout(function() {
                        generateOneNumber();
                    }, 210);
                    setTimeout(function() {
                        isGameOver();
                    }, 300);
                }
                break;
            case 38: // up
                //取消浏览器默认行为
                event.preventDefault();
                if (moveUp()) {
                    // 加setTimeout是为了动画播放完整
                    setTimeout(function() {
                        updateBoardView();
                    }, 200);
                    setTimeout(function() {
                        generateOneNumber();
                    }, 210);
                    setTimeout(function() {
                        isGameOver();
                    }, 300);
                }
                break;
            case 39: // right
                //取消浏览器默认行为
                event.preventDefault();
                if (moveRight()) {
                    // 加setTimeout是为了动画播放完整
                    setTimeout(function() {
                        updateBoardView();
                    }, 200);
                    setTimeout(function() {
                        generateOneNumber();
                    }, 210);
                    setTimeout(function() {
                        isGameOver();
                    }, 300);
                }
                break;
            case 40: // down
                //取消浏览器默认行为
                event.preventDefault();
                if (moveDown()) {
                    // 加setTimeout是为了动画播放完整
                    setTimeout(function() {
                        updateBoardView();
                    }, 200);
                    setTimeout(function() {
                        generateOneNumber();
                    }, 210);
                    setTimeout(function() {
                        isGameOver();
                    }, 300);
                }
                break;
        }
    });

    // 触摸屏操作
    document.addEventListener('touchstart', function(event) {
        startx = event.touches[0].pageX;
        starty = event.touches[0].pageY;
    });

    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    });

    document.addEventListener('touchend', function(event) {
        endx = event.changedTouches[0].pageX;
        endy = event.changedTouches[0].pageY;

        var deltax = endx - startx,
            deltay = endy - starty;

        if (Math.abs(deltax) < 0.1 * document_width && Math.abs(deltay) < 0.1 * document_width) {
            return;
        }
        if (Math.abs(deltax) > Math.abs(deltay)) {
            // 在x轴滑动
            if (deltax > 0) {
                // 向右滑动

                if (moveRight()) {
                    // 加setTimeout是为了动画播放完整
                    setTimeout(function() {
                        updateBoardView();
                    }, 200);
                    setTimeout(function() {
                        generateOneNumber();
                    }, 210);
                    setTimeout(function() {
                        isGameOver();
                    }, 300);
                }

            } else {
                // 向左滑动

                if (moveLeft()) {
                    // 加setTimeout是为了动画播放完整
                    setTimeout(function() {
                        updateBoardView();
                    }, 200);
                    setTimeout(function() {
                        generateOneNumber();
                    }, 210);
                    setTimeout(function() {
                        isGameOver();
                    }, 300);
                }

            }

        } else {
            // 在y轴滑动
            if (deltay > 0) {
                // 向下滑动

                if (moveDown()) {
                    // 加setTimeout是为了动画播放完整
                    setTimeout(function() {
                        updateBoardView();
                    }, 200);
                    setTimeout(function() {
                        generateOneNumber();
                    }, 210);
                    setTimeout(function() {
                        isGameOver();
                    }, 300);
                }

            } else {
                // 向上滑动

                if (moveUp()) {
                    // 加setTimeout是为了动画播放完整
                    setTimeout(function() {
                        updateBoardView();
                    }, 200);
                    setTimeout(function() {
                        generateOneNumber();
                    }, 210);
                    setTimeout(function() {
                        isGameOver();
                    }, 300);
                }

            }
        }
    });

}

// 向左移动
function moveLeft() {
    if (!canMoveLeft()) {
        return false;
    }
    // moveleft
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            // 若当前位置有数字
            if (board[i][j]) {
                // 查看左侧所有位置
                for (var k = 0; k < j; k++) {
                    // 若左侧为空，且中间没有障碍物，则可以移动
                    if (!board[i][k] && noBlockHorizontal(i, k, j)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        // 若左侧与自身相等，且中间没有障碍物，且左侧方格没有过叠加操作，则可以移动
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j) && !hasConflicted[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[i][k];
                        if (score > highest_score) {
                            highest_score = score;
                        }
                        // already conflicted
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    return true;
}

// 向上移动
function moveUp() {
    if (!canMoveUp()) {
        return false;
    }
    // moveup
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            // 若当前位置有数字
            if (board[i][j]) {
                // 查看上侧所有位置
                for (var k = 0; k < i; k++) {
                    // 若上侧为空，且中间没有障碍物，则可以移动
                    if (!board[k][j] && noBlockVertical(j, k, i)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        // 若上侧与自身相等，且中间没有障碍物，且上侧方格没有过叠加操作，，则可以移动
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i) && !hasConflicted[k][j]) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[k][j];
                        if (score > highest_score) {
                            highest_score = score;
                        }
                        // already conflicted
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    return true;
}

// 向右移动
function moveRight() {
    if (!canMoveRight()) {
        return false;
    }
    // moveright
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            // 若当前位置有数字
            if (board[i][j]) {
                // 查看右侧所有位置
                for (var k = 3; k > j; k--) {
                    // 若右侧为空，且中间没有障碍物，则可以移动
                    if (!board[i][k] && noBlockHorizontal(i, j, k)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        // 若右侧与自身相等，且中间没有障碍物，且右侧方格没有过叠加操作，，则可以移动
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k) && !hasConflicted[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[i][k];
                        if (score > highest_score) {
                            highest_score = score;
                        }
                        // already conflicted
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    return true;
}

// 向下移动
function moveDown() {
    if (!canMoveDown()) {
        return false;
    }
    // movedown
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            // 若当前位置有数字
            if (board[i][j]) {
                // 查看下侧所有位置
                for (var k = 3; k > i; k--) {
                    // 若下侧为空，且中间没有障碍物，则可以移动
                    if (!board[k][j] && noBlockVertical(j, i, k)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                        // 若下侧与自身相等，且中间没有障碍物，且下侧方格没有过叠加操作，，则可以移动
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k) && !hasConflicted[k][j]) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[k][j];
                        if (score > highest_score) {
                            highest_score = score;
                        }
                        // already conflicted
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    return true;
}

// 判断游戏是否结束
function isGameOver() {
    if (noSpace() && noMove()) {
        gameOverAnimation();
    }
}
