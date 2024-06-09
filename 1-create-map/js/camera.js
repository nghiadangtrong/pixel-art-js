export class Camera {
  constructor(map, width, height) {
    this.map = map;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.maxX = this.map.cols * this.map.tileSize - this.width;
    this.maxY = this.map.rows * this.map.tileSize - this.height;
    this.speed = 256;
  }

  move(deltaTime, speedX, speedY) {
    console.log(deltaTime);// thời gian render của 1 khung hình / 1000 
    this.x += speedX * this.speed * deltaTime;
    this.y += speedY * this.speed * deltaTime;

    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
  }
}