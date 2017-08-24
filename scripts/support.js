    // 获取屏幕宽度
    var document_width = window.screen.availWidth,
        // 大格子的宽度
        grid_container_width = 0.92 * document_width,
        // 小格子的宽度
        grid_cell_width = 0.18 * document_width,
        // 小格子的间距
        grid_cell_space = 0.04 * document_width;

    // 计算格子距离棋盘顶部距离
    function getPosTop(i, j) {
        return grid_cell_space + i * (grid_cell_space + grid_cell_width);
    }

    // 计算格子距离期盼左边距离
    function getPosLeft(i, j) {
        return grid_cell_space + j * (grid_cell_space + grid_cell_width);
    }

    // 获取背景颜色
    function getNumberBackgroundColor(number) {
        switch (number) {
            case 2:
                return '#eee4da';
            case 4:
                return '#ede0c8';
            case 8:
                return '#f2b179';
            case 16:
                return '#f59563';
            case 32:
                return '#f67e5f';
            case 64:
                return '#f65e3b';
            case 128:
                return '#edcf72';
            case 256:
                return '#edcc61';
            case 512:
                return '#9c0';
            case 1024:
                return '#33b5e5';
            case 2048:
                return '#09c';
            case 4096:
                return '#a6c';
            case 8192:
                return '#93c';
        }
    }

    // 获取数字颜色
    function getNumberColor(number) {
        if (number <= 4) {
            return '#776e65';
        }
        return '#fff';
    }

    // 获取数字字体大小
    function getNumberFontSize(number) {
        switch (number) {
            case 2:
            case 4:
            case 8:
            case 16:
            case 32:
            case 64:
                return 0.8 * grid_cell_width;
            case 128:
            case 256:
            case 512:
                return 0.58 * grid_cell_width;
            case 1024:
            case 2048:
            case 4096:
            case 8192:
                return 0.38 * grid_cell_width;
        }
    }

    // 判断是否有空位
    function noSpace() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (!board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    function noMove() {
        if (canMoveLeft() || canMoveUp() || canMoveRight() || canMoveDown()) {
            return false;
        }
        return true;
    }

    // 判断是否能够向左移动
    function canMoveLeft() {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                // 若本身不为零
                if (board[i][j]) {
                    // 且左方为零或左方与自身相等，则可以向左移动
                    if (!board[i][j - 1] || board[i][j] == board[i][j - 1]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // 判断是否能够向上移动
    function canMoveUp() {
        for (var j = 0; j < 4; j++) {
            for (var i = 1; i < 4; i++) {
                // 若本身不为零
                if (board[i][j]) {
                    // 且上方为零或上方与自身相等，则可以向上移动
                    if (!board[i - 1][j] || board[i][j] == board[i - 1][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // 判断是否能够向右移动
    function canMoveRight() {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                // 若本身不为零
                if (board[i][j]) {
                    // 且右方为零或右方与自身相等，则可以向右移动
                    if (!board[i][j + 1] || board[i][j] == board[i][j + 1]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // 判断是否能够向下移动
    function canMoveDown() {
        for (var j = 0; j < 4; j++) {
            for (var i = 2; i >= 0; i--) {
                // 若本身不为零
                if (board[i][j]) {
                    // 且下方为零或下方与自身相等，则可以向下移动
                    if (!board[i + 1][j] || board[i][j] == board[i + 1][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    // 判断中间是否有障碍物（左右方向）
    function noBlockHorizontal(row, col1, col2) {
        for (var j = col1 + 1; j < col2; j++) {
            // 有一个不等于0的元素，就说明有障碍物
            if (board[row][j]) {
                return false;
            }
        }
        return true;
    }
    // 判断中间是否有障碍物（上下方向）
    function noBlockVertical(col, row1, row2) {
        for (var i = row1 + 1; i < row2; i++) {
            // 有一个不等于0的元素，就说明有障碍物
            if (board[i][col]) {
                return false;
            }
        }
        return true;
    }
