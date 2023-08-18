// 设置粒子的数量
var numParticles = 10000; // 增加粒子的数量

// 定义粒子数组
var particles = [];

// 定义形状的控制点集合
var shapePoints = [];
var shapeRadius = 300; // 形状的半径

// 定义粒子的角度
var angle = 0;

function setup() {
  // 创建画布
  createCanvas(windowWidth, windowHeight);

  // 初始化形状的控制点
  for (var i = 0; i < 10; i++) {
    var x = shapeRadius * cos(i * TWO_PI / 10);
    var y = shapeRadius * sin(i * TWO_PI / 10);
    shapePoints.push(createVector(x, y));
  }

  // 初始化粒子
  for (var i = 0; i < numParticles; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  // 清除背景
  background(0);

  // 平移原点到画布中心
  translate(width / 2, height / 2);

  // 更新和显示粒子
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  // 更新粒子的角度
  angle += 0.005;
}

// 粒子对象
function Particle() {
  // 随机选择一个形状的控制点
  var randomPoint = random(shapePoints);
  // 计算粒子初始位置
  this.position = createVector(randomPoint.x, randomPoint.y);

  // 随机初始化粒子速度
  this.velocity = p5.Vector.random2D();
  this.velocity.mult(random(0.1, 0.5)); // 减小速度以使运动减慢

  // 随机初始化粒子大小
  this.size = random(0.5, 2); // 减小粒子大小

  // 更新粒子状态
  this.update = function () {
    // 随机选择一个形状的控制点
    var randomPoint = random(shapePoints);

    // 计算粒子的目标位置
    var target = createVector(
      randomPoint.x + noise(angle) * 50, // 在目标位置上增加噪声
      randomPoint.y + noise(angle + 1000) * 50 // 在目标位置上增加噪声
    );

    // 计算粒子到目标位置的向量
    var direction = p5.Vector.sub(target, this.position);

    // 更新粒子速度和位置
    this.velocity.add(direction);
    this.position.add(this.velocity);

    // 限制粒子在运动范围内
    this.position.x = constrain(
      this.position.x,
      -width / 2,
      width / 2
    );
    this.position.y = constrain(
      this.position.y,
      -height / 2,
      height / 2
    );
  };

  // 显示粒子
  this.display = function () {
    // 设置粒子颜色
    fill(255);
    // 绘制粒子
    ellipse(this.position.x, this.position.y, this.size, this.size);
  };
}

// 调整画布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
