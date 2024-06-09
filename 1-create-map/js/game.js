import { Map } from "./map.js"
import { Camera } from './camera.js';

const GAME_WIDTH = 220.22; // Max: 768 x 768
const GAME_HEIGHT = 500.333;

class Game {
  constructor() {
    this.map = new Map();
    this.camera = new Camera(this.map, GAME_WIDTH, GAME_HEIGHT);
    this.keys = [];

    window.addEventListener('keydown', e => {
      if (this.keys.indexOf(e.key) === -1) {
        this.keys.unshift(e.key);
      }
      console.log(this.keys)
    })

    window.addEventListener('keyup', e => {
      let index = this.keys.indexOf(e.key);
      if (index > -1) {
        this.keys.splice(index, 1)
      }
      console.log(this.keys)
    })
  }

  update(deltaTime) {
    let speedX = 0;
    let speedY = 0;

    if (this.keys[0] === 'ArrowLeft') speedX = -1;
    else if (this.keys[0] === 'ArrowRight') speedX = 1;
    else if (this.keys[0] === 'ArrowUp') speedY = -1;
    else if (this.keys[0] === 'ArrowDown') speedY = 1;

    this.camera.move(deltaTime, speedX, speedY)
  }

  renderLayer(ctx, layer) {
    const startCol = Math.floor(this.camera.x / this.map.tileSize);
    const endCol = Math.ceil(startCol + (this.camera.width / this.map.tileSize));
    const startRow = Math.floor(this.camera.y / this.map.tileSize);
    const endRow = Math.ceil(startRow + (this.camera.height / this.map.tileSize));

    const offsetX = startCol * this.map.tileSize - this.camera.x;
    const offsetY = startRow * this.map.tileSize - this.camera.y;

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        let tile = this.map.getTile(layer, row, col);

        const x = (col - startCol) * this.map.tileSize + offsetX;
        const y = (row - startRow) * this.map.tileSize + offsetY;

        ctx.drawImage(
          this.map.image,
          (tile - 1) * this.map.image_tile % this.map.image.width,
          Math.floor((tile - 1) / this.map.image_cols) * this.map.image_tile,
          this.map.image_tile,
          this.map.image_tile,
          Math.round(x),
          Math.round(y),
          this.map.tileSize,
          this.map.tileSize
        );

        ctx.strokeRect(
          Math.round(x),
          Math.round(y),
          this.map.tileSize,
          this.map.tileSize,
        )
      }
    }

  }

  render(ctx) {
    this.renderLayer(ctx, 0)
    this.renderLayer(ctx, 1)
  }
}

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  const game = new Game();

  let lastTime = 0;
  function animate(timeStamp) {
    let deltaTime = (timeStamp - lastTime) / 1000;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.render(ctx);
    requestAnimationFrame(animate);
    console.log('animate')
  }
  requestAnimationFrame(animate);
})