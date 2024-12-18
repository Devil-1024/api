document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 检查用户是否已经存在
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username === username && user.password === password) {
        // 用户已存在，加载游戏
        loadGame();
    } else {
        // 新用户，注册并保存信息
        const newUser = { username, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        alert('注册成功，请记住您的用户名和密码！');
        loadGame();
    }
});

function loadGame() {
    console.log('Loading game...');
    // 这里可以添加加载游戏的逻辑
    // 例如，跳转到游戏页面
    window.open('App.html', '_blank'); // 假设游戏页面是 game.html
}