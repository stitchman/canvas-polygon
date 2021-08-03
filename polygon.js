const PI2 = Math.PI * 2;

const COLORS = [
  "#2b8a3e",
  "#2f9e44",
  "#37b24d",
  "#40c057",
  "#51cf66",
  "#69db7c",
  "#8ce99a",
  "#b2f2bb",
  "#d3f9d8",
];

export class Polygon {
  constructor(x, y, radius, sides) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.rotate = 0;
  }

  animate(ctx, moveX) {
    ctx.save();
    //ctx.fillStyle = "#12b886";
    // ctx.beginPath();

    const angle = PI2 / this.sides;
    // const angle2 = PI2 / 4;

    ctx.translate(this.x, this.y);

    this.rotate -= moveX * 0.008;
    ctx.rotate(this.rotate);

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);

      //   i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      ctx.save();
      ctx.fillStyle = COLORS[i];
      ctx.translate(x, y);
      ctx.rotate(angle * i - Math.PI / 2);
      ctx.beginPath();
      const cardWidth = 120;
      const cardHeight = 120;
      ctx.rect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
      ctx.fill();
      ctx.restore();
    }

    //ctx.closePath();
    //ctx.fill();
    ctx.restore();
  }
}
