let petals = []; // 儲存花瓣的陣列
let introText = ''; // 儲存自我介紹內容
let showIntro = false; // 控制是否顯示自我介紹
let img; // 儲存圖片
let maskedImg; // 儲存去背後的圖片

function preload() {
  // 載入圖片
  img = loadImage('libraries/圖/669bc439b98d68vZ.gif'); // 確保路徑正確
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 設置畫布為全螢幕
  createMenu(); // 建立選單

  // 去背處理
  let mask = createGraphics(img.width, img.height);
  mask.background(0); // 黑色背景
  mask.fill(255); // 白色遮罩
  mask.ellipse(mask.width / 2, mask.height / 2, mask.width, mask.height); // 圓形遮罩
  img.mask(mask); // 將遮罩應用到圖片
  maskedImg = img; // 儲存去背後的圖片
}

function draw() {
  background(255, 255, 245); // 設置背景顏色為更淺的淡黃色 (RGB: 255, 255, 245)

  // 每幀新增一個花瓣
  if (frameCount % 10 === 0) {
    petals.push(new Petal(random(width), 0, random(2, 5))); // 隨機位置和速度
  }

  // 更新並顯示所有花瓣
  for (let i = petals.length - 1; i >= 0; i--) {
    petals[i].update();
    petals[i].display();

    // 如果花瓣超出畫布，將其移除
    if (petals[i].y > height) {
      petals.splice(i, 1);
    }
  }

  // 顯示自我介紹內容
  if (showIntro) {
    textSize(20);
    textAlign(CENTER, CENTER);
    let textWidthValue = textWidth(introText);
    let padding = 40;
    let rectWidth = textWidthValue + padding;
    let rectHeight = 100;

    fill(255, 240, 245);
    stroke(255, 182, 193);
    strokeWeight(4);
    rectMode(CENTER);
    rect(width / 2, height / 2, rectWidth, rectHeight, 20);

    fill(50);
    noStroke();
    text(introText, width / 2, height / 2);
  }

  // 顯示去背後的圖片在右上角
  push();
  imageMode(CORNER);
  let imgWidth = 200; // 調整圖片顯示寬度 (縮小到 200 像素)
  let imgHeight = (maskedImg.height / maskedImg.width) * imgWidth; // 等比例縮放高度
  image(maskedImg, width - imgWidth, 0, imgWidth, imgHeight); // 顯示圖片，緊貼右上角
  pop();
}

function createMenu() {
  // 建立選單容器
  let menu = createDiv().id('menu').style('position', 'absolute').style('top', '10px').style('left', '10px');

  // 建立按鈕並設定樣式
  let introButton = createButton('自我介紹').parent(menu).style('background-color', '#FFC0CB').style('font-size', '20px').style('padding', '10px 20px').style('margin', '5px').style('border', 'none').style('border-radius', '5px');
  let portfolioButton = createButton('筆記').parent(menu).style('background-color', '#FFC0CB').style('font-size', '20px').style('padding', '10px 20px').style('margin', '5px').style('border', 'none').style('border-radius', '5px');
  let quizButton = createButton('測驗卷').parent(menu).style('background-color', '#FFC0CB').style('font-size', '20px').style('padding', '10px 20px').style('margin', '5px').style('border', 'none').style('border-radius', '5px');
  let tutorialButton = createButton('教學影片').parent(menu).style('background-color', '#FFC0CB').style('font-size', '20px').style('padding', '10px 20px').style('margin', '5px').style('border', 'none').style('border-radius', '5px');

  // 建立下拉式選單取代作品集按鈕
  let portfolio2Dropdown = createSelect().parent(menu).style('background-color', '#FFC0CB').style('font-size', '20px').style('padding', '10px 20px').style('margin', '5px').style('border', 'none').style('border-radius', '5px');
  portfolio2Dropdown.option('作品集');
  portfolio2Dropdown.option('作品1');
  portfolio2Dropdown.option('作品2');
  portfolio2Dropdown.option('作品3');

  portfolio2Dropdown.changed(() => {
    let selected = portfolio2Dropdown.value();
    let iframeContainer = document.getElementById('iframe-container');
    let iframe = document.getElementById('portfolio-iframe');

    if (selected === '作品1') {
      iframe.src = 'https://paopaopoq.github.io/20250310-2/'; // 設定作品1的網址
      iframeContainer.style.display = 'block'; // 顯示 iframe 容器
    } else if (selected === '作品2') {
      iframe.src = 'https://paopaopoq.github.io/20250310./'; // 設定作品2的網址
      iframeContainer.style.display = 'block'; // 顯示 iframe 容器
    } else if (selected === '作品3') {
      iframe.src = 'https://paopaopoq.github.io/20250317/'; // 替換為作品3的實際網址
      iframeContainer.style.display = 'block'; // 顯示 iframe 容器
    }
  });

  // 設定按鈕事件
  introButton.mousePressed(() => {
    showIntro = !showIntro; // 切換顯示狀態
    if (showIntro) {
      introText = '大家好，我是林家妤，獅子座，座標北部，喜歡看漫畫、電影、動漫、玩電腦遊戲。';
    } else {
      introText = ''; // 清空文字
    }
  });

  portfolioButton.mousePressed(() => {
    let iframeContainer = document.getElementById('iframe-container');
    let iframe = document.getElementById('portfolio-iframe');
    iframe.src = 'https://hackmd.io/@jPkCWNa-Qb2F4R0G9w5A2w/rJel9KjxR1g'; // 設定 iframe 的來源
    iframeContainer.style.display = 'block'; // 顯示 iframe 容器
  });

  let closeIframeButton = document.getElementById('close-iframe');
  closeIframeButton.addEventListener('click', () => {
    let iframeContainer = document.getElementById('iframe-container');
    iframeContainer.style.display = 'none'; // 隱藏 iframe 容器
    let iframe = document.getElementById('portfolio-iframe');
    iframe.src = ''; // 清空 iframe 的來源
  });

  quizButton.mousePressed(() => {
    let quizContainer = document.getElementById('quiz-container');
    let quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = generateQuizHTML(); // 生成測驗內容
    quizContainer.style.display = 'block'; // 顯示測驗容器

    let submitQuizButton = document.getElementById('submit-quiz');
    submitQuizButton.style.display = 'inline-block';

    submitQuizButton.addEventListener('click', () => {
      let result = calculateQuizResult(); // 計算測驗結果
      quizContent.innerHTML = `
        <h2>🎉 測驗結束！ 🎉</h2>
        <p style="color: green; font-size: 20px;">正確題數: ${result.correct}</p>
        <p style="color: red; font-size: 20px;">錯誤題數: ${result.incorrect}</p>
        <button id="restart-quiz" style="padding: 10px 20px; font-size: 16px; background-color: #FFC0CB; border: none; border-radius: 5px; cursor: pointer;">重新開始</button>
      `;

      submitQuizButton.style.display = 'none'; // 隱藏提交按鈕

      // 設定重新開始按鈕的事件
      let restartQuizButton = document.getElementById('restart-quiz');
      restartQuizButton.addEventListener('click', () => {
        quizContent.innerHTML = generateQuizHTML(); // 重新生成測驗內容
        submitQuizButton.style.display = 'inline-block'; // 顯示提交按鈕
      });
    });

    let closeQuizButton = document.getElementById('close-quiz');
    closeQuizButton.addEventListener('click', () => {
      quizContainer.style.display = 'none'; // 隱藏測驗容器
    });
  });

  tutorialButton.mousePressed(() => {
    let iframeContainer = document.getElementById('iframe-container');
    let iframe = document.getElementById('portfolio-iframe');
    iframe.src = 'https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/B2/week8/20250407_111447.mp4'; // 設定 iframe 的來源
    iframeContainer.style.display = 'block'; // 顯示 iframe 容器
  });

  let closeQuizButton = document.getElementById('close-quiz');
  closeQuizButton.addEventListener('click', () => {
    let quizContainer = document.getElementById('quiz-container');
    quizContainer.style.display = 'none'; // 隱藏測驗容器
  });
}

// 生成測驗內容的 HTML
function generateQuizHTML() {
  return `
    <h2>🎉 歡迎來參加簡單測驗！ 🎉</h2>
    <p>問題 1: 1 + 1 = ?</p>
    <input type="radio" name="q1" value="A"> A. 1<br>
    <input type="radio" name="q1" value="B"> B. 2<br>
    <input type="radio" name="q1" value="C"> C. 3<br>
    <input type="radio" name="q1" value="D"> D. 4<br>

    <p>問題 2: 哪一個是水果？</p>
    <input type="radio" name="q2" value="A"> A. 蘋果<br>
    <input type="radio" name="q2" value="B"> B. 鉛筆<br>
    <input type="radio" name="q2" value="C"> C. 汽車<br>
    <input type="radio" name="q2" value="D"> D. 書本<br>

    <p>問題 3: 4 - 2 = ?</p>
    <input type="radio" name="q3" value="A"> A. 0<br>
    <input type="radio" name="q3" value="B"> B. 2<br>
    <input type="radio" name="q3" value="C"> C. 3<br>
    <input type="radio" name="q3" value="D"> D. 4<br>

    <p>問題 4: 太陽是什麼顏色？</p>
    <input type="radio" name="q4" value="A"> A. 藍色<br>
    <input type="radio" name="q4" value="B"> B. 紅色<br>
    <input type="radio" name="q4" value="C"> C. 黃色<br>
    <input type="radio" name="q4" value="D"> D. 綠色<br>
  `;
}

// 計算測驗結果
function calculateQuizResult() {
  let correctAnswers = {
    q1: 'B', // 問題 1 的正確答案
    q2: 'A', // 問題 2 的正確答案
    q3: 'B', // 問題 3 的正確答案
    q4: 'C', // 問題 4 的正確答案
  };

  let correct = 0;
  let incorrect = 0;

  for (let question in correctAnswers) {
    let selected = document.querySelector(`input[name="${question}"]:checked`);
    if (selected) {
      if (selected.value === correctAnswers[question]) {
        correct++; // 答對
      } else {
        incorrect++; // 答錯
      }
    } else {
      incorrect++; // 未選擇答案，計為錯誤
    }
  }

  return { correct, incorrect };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
}

function mousePressed() {
  // 在滑鼠點擊的位置新增一個花瓣
  petals.push(new Petal(mouseX, mouseY, random(2, 5))); // 隨機速度
}

function mouseDragged() {
  // 在滑鼠拖曳的位置新增一個花瓣
  petals.push(new Petal(mouseX, mouseY, random(2, 5))); // 隨機速度
}

// 花瓣類別
class Petal {
  constructor(x, y, speed) {
    this.x = x; // 花的 x 座標
    this.y = y; // 花的 y 座標
    this.speed = speed; // 花的下落速度
    this.size = random(3, 7); // 花的大小 (縮小範圍)
    this.wind = random(-0.5, 0.5); // 隨機的水平風力 (減小風力範圍)
  }

  update() {
    this.y += this.speed * 0.5; // 花緩慢向下移動
    this.x += sin(this.y * 0.02) * 1 + this.wind; // 花左右輕微擺動並受風力影響 (減小擺動幅度)
  }

  display() {
    noStroke();
    fill(255, 182, 193, 200); // 淺粉色 (RGB: 255, 182, 193) 並加透明度

    // 繪製花的五片花瓣
    for (let i = 0; i < 5; i++) {
      let angle = TWO_PI / 5 * i; // 每片花瓣的角度
      let petalX = this.x + cos(angle) * this.size;
      let petalY = this.y + sin(angle) * this.size;
      ellipse(petalX, petalY, this.size, this.size * 0.6); // 橢圓形花瓣
    }

    // 繪製花的中心
    fill(255, 215, 0, 200); // 金黃色 (RGB: 255, 215, 0)
    ellipse(this.x, this.y, this.size * 0.7, this.size * 0.7); // 花的中心 (增大比例)
  }
}