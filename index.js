const fs = require("fs");
const { createCanvas } = require("canvas");

// colors
const BLACK = "#000000";
const WHITE = "#ffffff";

class QRBase {
  constructor() {
    this.rectSize = 1;
    this.canvasSize = 25;
    this.canvas = this.#createCanvas();
    this.ctx = this.canvas.getContext("2d");

    this.#addSeperatorPatterns(0, 0);
    this.#addSeperatorPatterns(18, 0);
    this.#addSeperatorPatterns(0, 18);
    this.#addAlignmentPattern(16, 16);
    this.#AddTimingPatterns();
  }

  // creates white canvas.
  #createCanvas = () => {
    const canvas = createCanvas(this.canvasSize, this.canvasSize);
    const ctx = canvas.getContext("2d");

    // Fill the canvas with white color
    ctx.fillStyle = WHITE;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
  };

  #addSeperatorPatterns = (x, y) => {
    this.ctx.fillStyle = BLACK;
    this.ctx.fillRect(x, y, 7, 7);

    this.ctx.fillStyle = WHITE;
    this.ctx.fillRect(x + 1, y + 1, 5, 5);

    this.ctx.fillStyle = BLACK;
    this.ctx.fillRect(x + 2, y + 2, 3, 3);
  };

  #addAlignmentPattern = (x, y) => {
    this.ctx.fillStyle = BLACK;
    this.ctx.fillRect(x, y, 5, 5);

    this.ctx.fillStyle = WHITE;
    this.ctx.fillRect(x + 1, y + 1, 3, 3);

    this.ctx.fillStyle = BLACK;
    this.ctx.fillRect(x + 2, y + 2, 1, 1);
  };

  addBlackDot = (x, y) => {
    this.ctx.fillStyle = BLACK;
    this.ctx.fillRect(x, y, this.rectSize, this.rectSize);
  };

  save = () => {
    // Save the image to disk (132x132.png)
    const filePath = "x.png";
    const out = fs.createWriteStream(filePath);
    const stream = this.canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      console.log(`Image (${filePath}) created successfully.`);
    });
  };
}

const test = new QRBase();
test.save();
