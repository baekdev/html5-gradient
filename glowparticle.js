const PI2 = Math.PI * 2;

export class GlowParticle {
    constructor(x, y, radius, rgb) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;

        this.vx = Math.random() * 4;
        this.vy = Math.random() * 4;

        this.sinValue = Math.random();

        console.debug("GlowParticle constuctor", "vx", this.vx, "vy", this.vy, "sinValue", this.sinValue);
    }

    animate(ctx, stageWidth, stageHeight) {
        this.sinValue += 0.2;

        this.radius += Math.sin(this.sinValue);

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) { // canvas minimum width
            this.vx *= -1;
            this.x += 10;
            console.debug("GlowParticle animate - canvas minimum width", "x", this.x, "vx", this.vx, "y", this.y, "vy", this.vy, "sinValue", this.sinValue);
        } else if (this.x > stageWidth) { // canvas maximun width
            this.vx *= -1;
            this.x -= 10;
            console.debug("GlowParticle animate - canvas maximun width", "x", this.x, "vx", this.vx, "y", this.y, "vy", this.vy, "sinValue", this.sinValue);
        }

        if (this.y < 0) { // canvas minimum height
            this.vy *= -1;
            this.y += 10;
            console.debug("GlowParticle animate - canvas minimum height", "x", this.x, "vx", this.vx, "y", this.y, "vy", this.vy, "sinValue", this.sinValue);
        } else if (this.y > stageHeight) { // canvas maximum height
            this.vy *= -1;
            this.y -= 10;
            console.debug("GlowParticle animate - canvas maximun height", "x", this.x, "vx", this.vx, "y", this.y, "vy", this.vy, "sinValue", this.sinValue);
        }

        ctx.beginPath();
        const g = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius * 0.01,
            this.x,
            this.y,
            this.radius
        );

        g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`);
        g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`);

        ctx.fillStyle = g;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
        
    }
}