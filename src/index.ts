let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

canvas = document.getElementById("canvas") as HTMLCanvasElement;
ctx = canvas.getContext("2d");
ctx.font = "30px ariel";

class HelloWorld {
    protected ctx: CanvasRenderingContext2D;
    private text: string;
    private x: number;
    private y: number;
    private sy: number;
    private sx: number;
    private x_max: number;
    private y_max: number;

    constructor(ctx: CanvasRenderingContext2D, text: string, x_max: number, y_max: number) {
        this.ctx = ctx;
        this.text = text;
        this.x = 0;
        this.y = ctx.measureText(this.text).actualBoundingBoxAscent;
        this.sy = 1.1;
        this.sx = 1.5;
        this.x_max = x_max;
        this.y_max = y_max;
    }
    update() {
        this.x += this.sx;
        this.y += this.sy;
        if (this.x > this.x_max - ctx.measureText(this.text).width ||
            this.x < 0) {
            this.sx = -this.sx;
        }
        if (this.y > this.y_max ||
            this.y - ctx.measureText(this.text).actualBoundingBoxAscent < 0) {
            this.sy = -this.sy;
        }
    }
    draw() {
        ctx.fillText(this.text, this.x, this.y);
    }
}

let hello: HelloWorld = new HelloWorld(ctx, "hello world!", canvas.width, canvas.height);

let last_time = 0;
function animate(time: number = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hello.update();
    hello.draw();
    let delta = time - last_time;
    last_time = time;

    ctx.fillText(Number((1 / delta) * 1000).toPrecision(2).toString() + "fps", 0, 21);
    requestAnimationFrame(animate);
}

animate();
