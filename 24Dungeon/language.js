var language = document.getElementById('language');

document.addEventListener('DOMContentLoaded', function() {
    changeLanguage();
});

language.addEventListener('click', function() {
    if (language.innerHTML === 'English') {
        language.innerHTML = '中文';
    }else if (language.innerHTML === '中文') {
        language.innerHTML = 'English';
    }
    changeLanguage();
})

function changeLanguage() {
    var currentLanguage = language.innerHTML;
    if (currentLanguage === 'English') {
        document.getElementById('gameIntro').innerHTML =
        'This is a game based on the 24 point game.<br>\
        You wake up in an endless dungeon, where is full of aggresive digit monsters!<br>\
        All you have is five operators: +, -, ×, ÷ and ().<br>\
        It seems like you can defeat those monsters by making them equal to 24!';
        document.getElementById('start').innerHTML = 'Start!';
        document.getElementById('score:').innerHTML = 'Score:';
        document.getElementById('equation').placeholder = 'Defeat digit monsters!';
        document.getElementById('delete').innerHTML = 'Delete';
        document.getElementById('clear').innerHTML = 'Clear';
        document.getElementById('refresh:').innerHTML = 'Refresh:';
        document.getElementById('reset').innerHTML = 'Reset';
        document.getElementById('gettutorial').innerHTML = 'Tutorial';
        document.getElementById('tutorial1').innerHTML =
        'Use operators as weapons, and defeat digit monsters!<br>\
        Make them equal to 24 to eliminate them!<br>';
        document.getElementById('tutorial2').innerHTML =
        'For each round they stay in the fight, they deal 1 damage to you.<br>\
        But when you eliminate them, you gain scores!<br>\
        2 digits = 3 scores<br>\
        3 digits = 6 scores<br>\
        4 digits = 10 scores<br>\
        5 digits = 15 scores,br>';
        document.getElementById('tutorial3').innerHTML =
        'Every enemy you defeat, brings you 1 stamina point.<br>\
        15 stamina points equals 1 refresh chance, which allows you to refresh one digit monsters.<br>';
        document.getElementById('tutorial4').innerHTML =
        'Elite digit monsters deal 2 damages per round,<br>\
        but once defeated, can bring you more benefits!<br>\
        <span style="color: orange;">Orange elite</span>: double the scores you gain this round;<br>\
        <span style="color: greenyellow;">Lime elite</span>: Heal you 4 health points;<br>\
        <span style="color: aqua;">Blue elite</span>: Give you 1 refresh chance.';
        document.getElementById('leavetutorial').innerHTML = 'I see';
        document.getElementById('summary').innerHTML = 
        '<header>Game over!</header>\
        <p>Your final score: <span id="finalscore"></span></p>\
        <p>Start again?</p>\
        <button onclick="restart()" id="restart">Restart</button>\
        <button onclick="backToStart()" id="backtostart">No</button>';
        document.getElementById('not24').innerHTML = 'Oops, that does not equals to 24!';
        document.getElementById('confirm').innerHTML = 'Are you sure you want to restart the game?';

    }else if (currentLanguage === '中文') {
        document.getElementById('gameIntro').innerHTML =
        '这是一个基于24点游戏的游戏。<br>\
        你在一个没有尽头的地牢中醒来，周围满是危险的数字怪兽！<br>\
        你只有加减乘除和括号这五个运算符号，<br>\
        似乎让怪物们等于24就可以消灭他们！<br>';
        document.getElementById('start').innerHTML = '开始';
        document.getElementById('score:').innerHTML = '得分：';
        document.getElementById('equation').placeholder = '打败数字怪兽！';
        document.getElementById('delete').innerHTML = '删除';
        document.getElementById('clear').innerHTML = '清空';
        document.getElementById('refresh:').innerHTML = '刷新：';
        document.getElementById('reset').innerHTML = '重置';
        document.getElementById('gettutorial').innerHTML = '教程';
        document.getElementById('tutorial1').innerHTML =
        '使用数字作为武器，打败数字怪兽！<br>\
        使算式等于24来击败他们！<br>'
        document.getElementById('tutorial2').innerHTML =
        '数字每停留在场上一回合，就会对你造成一点伤害。<br>\
        但当你消灭它们，你将获得积分！<br>\
        2 个数字 = 3  分<br>\
        3 个数字 = 6  分<br>\
        4 个数字 = 10 分<br>\
        5 个数字 = 15 分<br>';
        document.getElementById('tutorial3').innerHTML =
        '每击败一个敌人，你将获得一点精力。<br>\
        每15点精力给予一次刷新机会，让你可以刷新一个数字怪物。<br>';
        document.getElementById('tutorial4').innerHTML =
        '精英数字怪物会造成2点伤害，<br>\
        但一旦打败它们，你能获得更多好处！<br>\
        <span style="color: orange;">橙色精英</span>：使你本回合得分翻倍；<br>\
        <span style="color: greenyellow;">绿色精英</span>：回复4点生命值；<br>\
        <span style="color: aqua;">蓝色精英</span>：给予一次刷新机会。';
        document.getElementById('leavetutorial').innerHTML = '我知道了';
        document.getElementById('summary').innerHTML = 
        '<header>游戏结束！</header>\
        <p>您的最终得分：<span id="finalscore"></span></p>\
        <p>再来一局？</p>\
        <button onclick="restart()" id="restart">重新开始</button>\
        <button onclick="backToStart()" id="backtostart">不了</button>';
        document.getElementById('not24').innerHTML = '呀！这不等于24！';
        document.getElementById('confirm').innerHTML = '您确定要重新开始吗？';
    }
}