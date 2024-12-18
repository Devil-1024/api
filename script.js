// 获取背景音乐和战斗音乐的元素
const backgroundMusic = document.getElementById("backgroundMusic");
const battleMusic = document.getElementById("battleMusic");

class TreasureMap {
  static async getInitialClue()
  {
    return new Promise((resolve) => 
    {
      setTimeout(() => {resolve("在行政辖区里找到了第一个线索...");}, 1000);
    });
  }

  static async decodeAncientScript(clue) 
  {
    return new Promise((resolve, reject) => 
    {
      setTimeout(() => 
      {
        if (!clue) 
        {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座水泥厂中...");
      }, 1500);
    });
  }

    
  static async searchTemple(location) 
  {
    return new Promise((resolve, reject) => 
    {
      setTimeout(() => 
      {
        const random = Math.random();
        if (random > 0.3) 
        {
            // 遇到赛伊德，返回该信息
            resolve("布豪!遇到了大树守卫（#赛伊德#）!");
        } else {
            resolve("找到了一个神秘的保险箱...");
        }
      }, 2000);
    });
  }

  static async openTreasureBox() 
  {
    return new Promise((resolve) => 
    {
      setTimeout(() => 
      {
        resolve("恭喜!你找到了军用终端*1!");
      }, 1000);
    });
  }

  static async unlockBook() 
  {
    return new Promise(async (resolve, reject) => 
    {
      const correctPassword = "1024"; 
      let userInput = prompt("请输入解锁密码门的密码(·----|-----|··---|····-)："); 
      let wrong = 1;
        while (userInput != correctPassword && wrong > 0) 
        {
          alert("密码错误，请重新输入！");
          userInput = prompt("请输入解锁密码门的密码(·----|-----|··---|····-)："); 
          wrong--;
        }

        if (userInput != correctPassword && wrong === 0) {
          reject("布豪！导弹来袭！");
        }
      resolve("密码正确，密码门解锁成功！");
    });
  }
}

function fightWithSayed() {
  return new Promise((resolve, reject) => 
  {
    const fightOptions = document.getElementById("fight-options");
    fightOptions.style.display = "block";  // 显示战斗选项

      // 正面刀战选项
      document.getElementById("fight-button").onclick = function() 
      {
          fightOptions.style.display = "none";  // 隐藏战斗选项
          alert("选择了正面刀战！");
          resolve("你胜利了！获得了赛伊德的怀表*1");
      };

      // 偏头试探选项
      document.getElementById("run-button").onclick = function() 
      {
          fightOptions.style.display = "none";  // 隐藏战斗选项
          alert("选择了偏头试探！");
          reject("你被赛伊德三枪锁头带走了！");
      };
  });
}

// 加载library.txt文件的函数
function loadLibraryText() 
{
  const textContent = document.getElementById('textContent');
  fetch('library.txt')
  .then(response => response.text())
  .then(data => 
  {
      // 将文件内容显示在页面上
      textContent.innerHTML = `<pre>${data}</pre>`;
  })
  
  .catch(error => 
  {
      console.error('Error loading the file:', error);
      textContent.textContent = 'Failed to load the file.';
  });
}

// 切换到战斗音乐的函数
function switchToBattleMusic() {
  // 暂停背景音乐
  backgroundMusic.pause();
  // 播放战斗音乐
  battleMusic.play();
}

// 切换回背景音乐的函数
function switchToBackgroundMusic() {
  // 暂停战斗音乐
  battleMusic.pause();
  // 播放背景音乐
  backgroundMusic.play();
}


  // 更新进度条的函数
function updateProgressBar(progress, message = "") 
{
  const progressElement = document.getElementById("progress");
  progressElement.style.width = `${progress}%`;
  progressElement.innerText = `${progress}% ${message}`;

  const treasureIcon = document.getElementById("treasure-icon");
  treasureIcon.style.left = `calc(${progress}% - 15px)`; // 调整图标位置，-15px 以确保图标不超出进度条
}

// 显示重开按钮
function showRestartButton() 
{
  const restartButton = document.getElementById("restartButton");
  restartButton.classList.remove("hidden");
}

// 重开游戏
function restartGame() 
{
  // 隐藏日志和进度条
  document.getElementById("log").classList.add("hidden");
  document.getElementById("progress-bar").classList.add("hidden");

  // 重置进度条
  const progressElement = document.getElementById("progress");
  progressElement.style.width = "0%";
  progressElement.innerText = "0%";

  // 隐藏重开按钮
  document.getElementById("restartButton").classList.add("hidden");

  // 启用开始按钮
  document.getElementById("startButton").disabled = false;

  // 清空日志
  document.getElementById("log").innerHTML = "";
}

// 使用async/await重写寻宝过程
async function findTreasureWithAsync() 
{
  const logElement = document.getElementById("log");
  const progressBar = document.getElementById("progress-bar");
  let progress = 0;

    try 
    {
      logElement.innerHTML = "";
      logElement.classList.remove("hidden");
      progressBar.classList.remove("hidden");
      
      progress = 10;
      updateProgressBar(progress, "开始摸金...");
      await new Promise(resolve => setTimeout(resolve, 1000));

      const clue = await TreasureMap.getInitialClue();
      logElement.innerHTML += `<p>${clue}</p>`;
      progress = 30;
      updateProgressBar(progress);

      const bookUnlock = await TreasureMap.unlockBook();
      logElement.innerHTML += `<p>${bookUnlock}</p>`;
      progress = 50;
      updateProgressBar(progress);

      const location = await TreasureMap.decodeAncientScript(clue);
      logElement.innerHTML += `<p>${location}</p>`;
      progress = 60;
      updateProgressBar(progress);

      const encounter = await TreasureMap.searchTemple(location);
      logElement.innerHTML += `<p>${encounter}</p>`;
      progress = 80;
      updateProgressBar(progress);

      // 处理遇到赛伊德的情况
      if (encounter.includes("遇到了大树守卫")) {
          const fightResult = await fightWithSayed();
          logElement.innerHTML += `<p>${fightResult}</p>`;
          // 战斗胜利后继续游戏
          logElement.innerHTML += `<p>找到了一个神秘的保险箱...</p>`;
      }

      const treasure = await TreasureMap.openTreasureBox();
      logElement.innerHTML += `<p>${treasure}</p>`;
      progress = 100;
      updateProgressBar(progress);

      logElement.innerHTML += "<p>撤离成功！</p>";
      showRestartButton();
    } 

    catch (error) 
    {
      logElement.innerHTML += `<p style="color: red;">撤离失败: ${error}</p>`;
      progress = 0;
      updateProgressBar(progress);
      showRestartButton();
    }
}

// 开始按钮点击事件
document.getElementById("startButton").addEventListener("click", function() 
{ 
  // 获取背景音乐元素
  var backgroundMusic = document.getElementById("backgroundMusic");
  // 播放音乐
  backgroundMusic.play();
  //
  loadLibraryText();
  // 禁用开始按钮
  document.getElementById("startButton").disabled = true;
  // 调用寻宝函数
  findTreasureWithAsync();
});

// 战斗选项按钮点击事件
document.getElementById("fight-button").addEventListener("click", function() {
  // 切换到战斗音乐
  switchToBattleMusic();
  // 隐藏战斗选项
  const fightOptions = document.getElementById("fight-options");
  fightOptions.style.display = "none";
  // 战斗逻辑...
});

// 重开按钮点击事件
document.getElementById("restartButton").addEventListener("click", function() {
  // 切换回背景音乐
  switchToBackgroundMusic();
  // 重置游戏状态
  restartGame();
});