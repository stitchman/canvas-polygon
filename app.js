import { Polygon } from "./polygon.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;
    window.addEventListener("pointerdown", this.onDown.bind(this), false);
    window.addEventListener("pointermove", this.onMove.bind(this), false);
    window.addEventListener("pointerup", this.onUp.bind(this), false);

    this.polygon = new Polygon(
      this.stageWidth / 2,
      (this.stageHeight * 5) / 4,
      400,
      8
    );

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.moveX *= 0.92;

    this.polygon.animate(this.ctx, this.moveX);
  }

  onDown(e) {
    console.log(e);
    this.isDown = true;
    this.moveX = 0;
    this.offsetX = e.clientX;
  }

  onMove(e) {
    if (this.isDown) {
      if (e.clientY > this.polygon.y) {
        this.moveX = e.clientX - this.offsetX;
      } else {
        this.moveX = this.offsetX - e.clientX;
      }
      this.offsetX = e.clientX;
    }
  }

  onUp(e) {
    this.isDown = false;
  }
}

window.onload = () => {
  new App();
};
