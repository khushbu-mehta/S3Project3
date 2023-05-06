let img;
let ripples = [];

function preload() {
  img = loadImage('background.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let aspectRatio = img.width / img.height;
  let canvasAspectRatio = width / height;
  
  if (aspectRatio > canvasAspectRatio) {
    imgWidth = width;
    imgHeight = width / aspectRatio;
  } else {
    imgWidth = height * aspectRatio;
    imgHeight = height;
  }
  
  image(img, 0, 0, imgWidth, imgHeight);
  
 
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].display();
    if (ripples[i].isFinished()) {
      ripples.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= imgWidth && mouseY >= 0 && mouseY <= imgHeight) {
    ripples.push(new Ripple(mouseX, mouseY));
  }
}

function mouseDragged() {
  // A new ripple at the mouse position while dragging the mouse cursor
  if (mouseX >= 0 && mouseX <= imgWidth && mouseY >= 0 && mouseY <= imgHeight) {
    ripples.push(new Ripple(mouseX, mouseY));
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = max(width, height) * 0.1; // 10% of canvas size
    this.opacity = 255;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }
  
  update() {
    // this updates the position of the ripple as per the mouse click
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x <= 0 || this.x >= imgWidth) {
      this.speedX *= -1;
    }
    if (this.y <= 0 || this.y >= imgHeight) {
      this.speedY *= -1;
    }
    

    this.radius += 2
    this.opacity -= 3;
  }
  
  display() {

    let color = img.get(this.x * (img.width / imgWidth), this.y * (img.height / imgHeight));
    color[3] = this.opacity;
    fill(color);
    stroke(255); 
    strokeWeight(0.5); 
    ellipse(this.x, this.y, this.radius);
  }
  
  isFinished() {

    return this.opacity < 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}