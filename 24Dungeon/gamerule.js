/*生成随机数 */
function randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

/*定义敌人*/
var enemy = document.getElementsByClassName('enemy');

/*确定敌人栏位数量*/
var enemies = document.getElementsByClassName('enemy');
var count = enemies.length;

var health = document.getElementById('health');
var stamina = document.getElementById('stamina');
var refresh = document.getElementById('refreshchance');
var refreshChance = Number(refresh.innerHTML);

/*重载页面判定*/
var reload = 0;

/*键盘控制*/
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (reload ==1) {
            doMath();
        }else {
            startGame();
        }
    }
    if (e.key === 'Backspace') {
        deletion();
    }
});

/*精英敌人相关定义*/
var elite = ['elite-double','elite-heal','elite-refresh'];
var eliteSpawnChance = 0.15;

/*生成敌人*/
function generateEnemy(e) {
    e.innerHTML = randomNumber();
    var enemyType = Math.random();
    if (enemyType <= eliteSpawnChance) {
        var eliteType = elite[Math.floor(Math.random()*elite.length)];
        e.classList.add('elite');
        e.classList.add(eliteType);
    }
}

/*开始按钮*/
function startGame() {
    if (reload == 1) {
        location.reload();
    }else {
        for (let i = 0; i <= count - 1; ++i) {
            generateEnemy(enemy[i]);
        }
        document.getElementById('start').innerHTML = "Restart";
        fullyClear();
        console.log(reload = 1);
    }
}

/*清除*/
function fullyClear() {
    document.getElementById('equation').value = null;
    console.log(blr = 0);
    for (let i = 0; i <= count - 1; ++i) {
        enemy[i].classList.remove('blink');
    }
}

function clearEnemyStatus(e) {
        if (e.classList.contains('elite')) {
            for (let j = 0; j < elite.length; ++j) {
                e.classList.remove(elite[j]);
            }
        }
}

/*删除*/
function deletion() {
    var equation = document.getElementById('equation');
    equation.value = equation.value.slice(0,-1);
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

for (let i = 0; i <= count - 1; ++i) {
    enemy[i].addEventListener('click', chooseEnemy);
}

var blr = 0;

/*选中运算符号*/
function chooseOperator(e) {
    var chosenOperator = e.target.value;
    if (chosenOperator == "()") {
        if (blr == 0) {
            chosenOperator = "(";
            blr = 1;
        }else {
            chosenOperator = ")";
            blr = 0;
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
    var newEquation = equation.replace(/×/g,"*").replace(/÷/g,"/");
    try {
        var result = eval(newEquation);
    } catch (e) {
        if (e instanceof SyntaxError) {
            alert("Oops, that does not equals to 24!");
            fullyClear();
        }
    }
    if (result == 24) {
        settle();
    }else {
        alert("Oops, that does not equals to 24!");
        fullyClear();
    }
}

var c = 0;
var d = 0;
var double = 0;

function settle() {
    c = 0;
    d = 0;
    for (i = 0; i <= count - 1; ++i) {
        if (enemy[i].classList.contains('blink')) {
            /*计算使用的数字个数*/
            ++c;
            if (enemy[i].classList.contains('elite')) {
                if (enemy[i].classList.contains('elite-heal')) {
                    health.value = health.value + 5;
                }
                if (enemy[i].classList.contains('elite-refresh')) {
                    refresh.innerHTML = refreshChance + 1;
                }
                if (enemy[i].classList.contains('elite-double')) {
                    ++double;
                }
            }
            /*消除已使用的数字、生成新数字*/
            clearEnemyStatus(enemy[i]);
            generateEnemy(enemy[i]);
        }else {
            /*计算留在场上的数字造成的伤害*/
            ++d;
            if (enemy[i].classList.contains('elite')) {
                ++d;
            }
        }
    }
    fullyClear();
    calScore();
    calStamina();
    calDamage();
}

/*计算积分*/
function calScore() {
    var score = 0;
    for (i = 0; i <= c; ++i) {
        var score = score + i;
    }
    score = score * (2 ** double);
    double = 0;
    var scoreElement = document.getElementById('score');
    var currentScore = Number(scoreElement.innerHTML);
    scoreElement.innerHTML = currentScore + score;
}

/*计算精力*/
function calStamina() {
    stamina.value = stamina.value + c;
    if (stamina.value == 20) {
        stamina.value = stamina.value - 20;
        refresh.innerHTML = refreshChance + 1;
    }
}

/*计算伤害*/
function calDamage() {
    health.value = health.value - d;
    if (health.value <= 0) {
        alert("Oh no, you are defeated! Start again?")
        fullyClear();
    }
}

function refresh() {
    if (refreshChance == 0) {
        alert("You don't have enough chance to refresh!");
    }else {
        --refresh.innerHTML;
        for (let i = 0; i <= count - 1; ++i) {
            generateEnemy(enemy[i]);
        }
    }
}