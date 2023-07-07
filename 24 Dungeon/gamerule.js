/*生成随机数 */
function randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

/*定义敌人*/
var enemy = document.getElementsByClassName('enemy');

/*重载页面判定*/
var reload = 0;

/*开始按钮*/
function startGame() {
    if (reload == 1) {
        location.reload();
    }else {
        for (let i = 0; i <= 3; ++i) {
            enemy[i].innerHTML = randomNumber();
        }
        document.getElementById('start').innerHTML = "Restart";
        clearEquation();
        console.log(reload = 1);
    }
}

/*清除*/
function clearEquation() {
    document.getElementById('equation').value = null;
    console.log(blr = 0);
    for (let i = 0; i <= 3; ++i) {
        enemy[i].classList.remove('blink');
    }
}

/*选中敌人*/
function chooseEnemy(e) {
    var chosenEnemy = e.target;
    if (chosenEnemy.classList.contains('blink')) {
        // 如果元素已经被选中，不执行后续操作
        return;
    }
    chosenEnemy.classList.add('blink');
    document.getElementById('equation').value += chosenEnemy.innerHTML;
}

for (let i = 0; i <= 3; ++i) {
    enemy[i].addEventListener('click', chooseEnemy);
}

var blr = 0;

/*选中运算符号*/
function chooseOperator(e) {
    var chosenOperator = e.target.value;
    if (chosenOperator == "()") {
        if (blr == 0) {
            chosenOperator = "(";
            console.log(blr = 1);
        }else {
            chosenOperator = ")";
            console.log(blr = 0);
        }
    }
    document.getElementById('equation').value += chosenOperator;
}

document.getElementById('plus').addEventListener('click', chooseOperator);
document.getElementById('minus').addEventListener('click', chooseOperator);
document.getElementById('multiply').addEventListener('click', chooseOperator);
document.getElementById('divide').addEventListener('click', chooseOperator);
document.getElementById('brackets').addEventListener('click', chooseOperator);

/*计算算式*/
function doMath() {
    var equation = document.getElementById('equation').value;
    var newEquation = equation.replace("×","*").replace("÷","/");
    var result = eval(newEquation);
    if (result == 24) {
        settle();
    }else {
        alert("Oops, that does not equals to 24!");
        clearEquation();
    }
}

function settle() {
    var c = 0;
    var d = 0;
    var score = 0;
    for (i = 0; i <= 3; ++i) {
        if (enemy[i].classList.contains('blink')) {
            /*计算使用的数字个数*/
            console.log(++c);
            /*消除已使用的数字、生成新数字*/
            enemy[i].innerHTML = randomNumber();
        }else {
            /*计算留在场上的数字数量*/
            console.log(++d);
        }
    }
    /*清空计算栏、清除选择特效*/
    clearEquation();
    /*计算积分*/
    for (i = 0; i <= c; ++i) {
        var score = score + i;
    }
    var scoreElement = document.getElementById('score');
    var currentScore = Number(scoreElement.innerHTML);
    scoreElement.innerHTML = currentScore + score;
    /*计算伤害*/
    var healthPoint = document.getElementById('health');
    var currentHealth = Number(healthPoint.value);
    healthPoint.value = currentHealth - d;
    if (healthPoint.value <= 0) {
        alert("Oh no, you are defeated! Start again?")
        clearEquation();
    }
}
