/*生成随机数 */
function randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

/*定义敌人*/
var enemy = document.getElementsByClassName('enemy');
var count = enemy.length;

var health = document.getElementById('health');
var stamina = document.getElementById('stamina');
var refresh = document.getElementById('refreshchance');
var refreshButton = document.getElementById('refresh');
var valueType

/*键盘控制*/
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        doMath();
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
    if (e.classList.contains('elite')) {
        for (let j = 0; j < elite.length; ++j) {
            e.classList.remove(elite[j]);
        }
    }
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
    for (let i = 0; i <= count - 1; ++i) {
        generateEnemy(enemy[i]);
    }
    document.getElementById('ingame').classList.remove('hidden');
    document.getElementById('beforegame').classList.add('hidden');
}

/*重置*/
function resetButton() {
    var result = confirm("Are you sure you want to restart the game?\n你确定要重新开始吗？");
    if (result) {
        goSummary();
    }
}

function reset() {
    for (let i = 0; i <= count - 1; ++i) {
        generateEnemy(enemy[i]);
    }
    document.getElementById('score').innerHTML = 0;
    stamina.value = 0;
    health.value = 20;
    refresh.innerHTML = 0;
    fullyClear();
}

/*清除*/
function fullyClear() {
    document.getElementById('equation').value = null;
    blr = 0;
    for (let i = 0; i <= count - 1; ++i) {
        enemy[i].classList.remove('chosen');
    }
}

/*删除*/
function deletion() {
    var equation = document.getElementById('equation');
    var lastNum = equation.value.slice(-1);
    equation.value = equation.value.slice(0,-1);
    if (lastNum == "(") {
        blr = 0;
    }
    if (lastNum == ")") {
        blr = 1;
    }
    for (let i = 0; i <= count - 1; ++i) {
        if (enemy[i].innerHTML === lastNum && enemy[i].classList.contains('chosen')) {
            enemy[i].classList.remove('chosen');
            break;
        }
    }
}

/*选中敌人*/
function chooseEnemy(e) {
    var chosenEnemy = e.target;
    var refreshChance = Number(refresh.innerHTML);
    if (chosenEnemy.classList.contains('chosen')) {
        // 如果元素已经被选中，不执行后续操作
        return;
    }
    if (refreshButton.classList.contains('refreshing')) {
        --refreshChance;
        refresh.innerHTML = refreshChance;
        refreshButton.classList.remove('refreshing');
        generateEnemy(chosenEnemy);
        return;
    }
    chosenEnemy.classList.add('chosen');
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
            result = 0;
        }
    }
    if (result == 24) {
        settle();
    }else {
        alert(document.getElementById('not24').innerHTML);
        fullyClear();
    }
}

var c = 0;
var d = 0;
var double = 0;

function settle() {
    c = 0;
    d = 0;
    var refreshChance = Number(refresh.innerHTML);
    for (let i = 0; i <= count - 1; ++i) {
        if (enemy[i].classList.contains('chosen')) {
            /*计算使用的数字个数*/
            ++c;
            if (enemy[i].classList.contains('elite')) {
                if (enemy[i].classList.contains('elite-heal')) {
                    valueType = 'heal';
                    showValue(4);
                    health.value = health.value + 4;
                }
                if (enemy[i].classList.contains('elite-refresh')) {
                    refresh.innerHTML = refreshChance + 1;
                }
                if (enemy[i].classList.contains('elite-double')) {
                    ++double;
                }
            }
            /*消除已使用的数字、生成新数字*/
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
    for (let i = 0; i <= c; ++i) {
        var score = score + i;
    }
    score = score * (2 ** double);
    valueType = 'addScore';
    showValue(score);
    double = 0;
    var scoreElement = document.getElementById('score');
    var currentScore = Number(scoreElement.innerHTML);
    scoreElement.innerHTML = currentScore + score;
}

/*计算精力*/
function calStamina() {
    valueType = 'addStamina';
    showValue(c);
    stamina.value = stamina.value + c;
    if (stamina.value == 15) {
        stamina.value = stamina.value - 15;
        var refreshChance = Number(refresh.innerHTML);
        refresh.innerHTML = refreshChance + 1;
    }
}

/*计算伤害*/
function calDamage() {
    valueType = 'damage';
    showValue(d);
    health.value = health.value - d;
    if (health.value <= 0) {
        health.value = 0;
        goSummary();
    }
}

function refreshOne() {
    var refreshChance = Number(refresh.innerHTML);
    if (refreshChance == 0) {
        alert("You don't have enough chance to refresh!");
    }else {
        if (refreshButton.classList.contains('refreshing')){
            refreshButton.classList.remove('refreshing');
        }else {
            refreshButton.classList.add('refreshing');
        }
    }
}

function getTutorial() {
    document.getElementById('tutorial').classList.remove('hidden');
}

function leaveTutorial() {
    document.getElementById('tutorial').classList.add('hidden');
}

function goSummary() {
    document.getElementById('aftergame').classList.remove('hidden');
    finalScore();
}

function finalScore() {
    document.getElementById('finalscore').innerHTML = document.getElementById('score').innerHTML;
}

function restart() {
    reset();
    document.getElementById('aftergame').classList.add('hidden');
}

function backToStart() {
    reset();
    document.getElementById('aftergame').classList.add('hidden');
    document.getElementById('ingame').classList.add('hidden');
    document.getElementById('beforegame').classList.remove('hidden');
}

/*数值显示*/
function showValue(value) {
    var valueElement = document.getElementById(valueType);
    valueElement.classList.remove('hidden');
    if (valueElement.id === 'damage') {
        valueElement.innerHTML = "-" + value;
    }else if (valueElement.id === 'addScore' || valueElement.id === 'addStamina' || valueElement.id === 'heal') {
        valueElement.innerHTML = "+" + value;
    }
    valueElement.style.animation = 'none'; // 重置动画
    setTimeout(function() { // 重新触发动画
        valueElement.style.animation = '';
    }, 10);
    valueElement.addEventListener('animationend', function() {
    this.classList.add('hidden');
});
}
