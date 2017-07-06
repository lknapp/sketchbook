var cols, rows, cellSize, brusselator;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 100);
  cellSize = 5;
  cols = floor(window.innerWidth / cellSize);
  rows = floor(window.innerHeight / cellSize);
  brusselator = new Brusselator(cols, rows);
}

function draw() {
  brusselator.update();
  brusselator.render();
}

function Brusselator(cols, rows) {
  this.cols = cols;
  this.rows = rows;
  this.a = 4.5;
  this.b = 8;
  this.d = 8;
  this.x = createEmptyDataGrid(cols, rows);
  this.y = createEmptyDataGrid(cols, rows);
  this.tempX = createEmptyDataGrid(cols, rows);
  this.tempY = createEmptyDataGrid(cols, rows);
  perturbGrid(this.x);
  setGrid(this.y, 5);

  this.update = function() {
    var i, j, dx, dy, y, x;
    for (i = this.cols; i < 2*this.cols; i ++) {
      for (j = this.rows; j < 2*this.rows; j ++) {
        //change in x and y by diffusion
        dx = this.x[(i)%this.cols][(j-1)%this.rows] + this.x[(i-1)%this.cols][(j)%this.rows] + this.x[(i+1)%this.cols][(j)%this.rows] + this.x[(i)%this.cols][(j+1)%this.rows] - 4*this.x[(i)%this.cols][(j)%this.rows];
        dy = this.y[(i)%this.cols][(j-1)%this.rows] + this.y[(i-1)%this.cols][(j)%this.rows] + this.y[(i+1)%this.cols][(j)%this.rows] + this.y[(i)%this.cols][(j+1)%this.rows] - 4*this.y[(i)%this.cols][(j)%this.rows];

        x = this.x[(i)%cols][(j)%rows];
        y = this.y[(i)%cols][(j)%rows];

        //change in x and y by reaction + diffusion
        this.tempX[(i)%this.cols][(j)%this.rows] += .02*(this.a - (this.b + 1)*x + x*x*y + dx);
        this.tempY[(i)%this.cols][(j)%this.rows] += .02*(this.b*x - x*x*y + this.d*dy);
      }
    }

    this.x = this.tempX;
    this.y = this.tempY;

  };

  this.render = function() {
    for (var i = 0; i < this.cols; i ++) {
      for (var j = 0; j < this.rows; j ++) {
        noStroke();
        if(this.x[i][j] < 4.5) {
          fill(0, 0, 0);
        } else {
          fill(0, 0, 100);
        }
        rect(i*cellSize, j*cellSize, cellSize, cellSize);
      }
    }
  };

  return this;
}

function perturbGrid(grid) {
  for (var i = 0; i < grid.length; i ++) {
    for (var j = 0; j < grid[0].length; j ++) {
      grid[i][j] = 3 + Math.random()*4;
    }
  }
}

function setGrid(grid, initialValue) {
  for (var i = 0; i < grid.length; i ++) {
    for (var j = 0; j < grid[0].length; j ++) {
      grid[i][j] = initialValue;
    }
  }
}

function createEmptyDataGrid(cols, rows) {
  var grid = new Array(cols);
  for (var i = 0; i < cols; i ++) {
    grid[i] = new Array(rows).fill(0);
  }
  return grid;
}
