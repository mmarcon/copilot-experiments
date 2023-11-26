(() => {
  // Let's make a snake game!
  // We'll start with a simple snake that can move around the screen
  // and eat food to grow longer.
  // We'll add more features as we go along.

  // First, let's create a canvas to draw on.
  const canvas = document.querySelector('#game');
  const ctx = canvas.getContext('2d');

  // We'll use the `score` canvas to display the score.
  const score = document.querySelector('#score');
  const scoreCtx = score.getContext('2d');

  // We'll use a 20x20 grid for our game.
  const gridSize = 20;
  const gridWidth = canvas.width / gridSize;
  const gridHeight = canvas.height / gridSize;

  // Let's set things up for the score canvas.
  scoreCtx.font = '40px "Press Start 2P"';
  scoreCtx.textAlign = 'center';
  scoreCtx.textBaseline = 'middle';

  // We'll use an array to store the snake's body.
  // Each element in the array will be an object with x and y properties.
  // The first element will be the head of the snake.
  // The last element will be the tail of the snake.
  // We'll start with a snake that is 3 segments long.
  let snake = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ];

  // Let's create a function to draw the snake.
  // We'll use a different color for the head and the tail.
  function drawSnake() {
    // Draw the head.
    ctx.fillStyle = 'green';
    ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize, gridSize);

    // Draw the tail.
    ctx.fillStyle = 'lightgreen';
    for (let i = 1; i < snake.length; i++) {
      ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }
  }

  // Let's create a function to move the snake.
  // We'll use the arrow keys to control the snake.

  // We'll use a variable to store the direction the snake is moving.
  // We'll use numbers to represent the direction.
  // 0 = up (negative y direction)
  // 1 = right (positive x direction)
  // 2 = down (positive y direction)
  // 3 = left (negative x direction)
  let direction = 0;

  // We'll use another variable to store the next direction the snake will move.
  // This will prevent the snake from turning back on itself.
  let nextDirection = 0;

  let gameScore = 0;

  // We'll use the keydown event to change the direction of the snake.
  document.addEventListener('keydown', (event) => {
    // Check if the arrow keys were pressed.
    if (event.key === 'ArrowUp') {
      nextDirection = 0;
    } else if (event.key === 'ArrowRight') {
      nextDirection = 1;
    } else if (event.key === 'ArrowDown') {
      nextDirection = 2;
    } else if (event.key === 'ArrowLeft') {
      nextDirection = 3;
    }
    moveSnake();
  });

  // Let's create a function to move the snake.
  // We'll use the setInterval function to call this function every 100 milliseconds.
  // This will make the snake move automatically.
  function moveSnake() {
    // Change the direction of the snake.
    direction = nextDirection;

    // Move the head of the snake.
    // We'll use the direction variable to determine which direction to move.
    // We'll use the unshift function to add the new head to the front of the snake.
    // We'll use the pop function to remove the last element from the snake.
    if (direction === 0) {
      snake.unshift({ x: snake[0].x, y: (snake[0].y - 1 + gridHeight) % gridHeight });
      snake.pop();
    } else if (direction === 1) {
      snake.unshift({ x: (snake[0].x + 1) % gridWidth, y: snake[0].y });
      snake.pop();
    } else if (direction === 2) {
      snake.unshift({ x: snake[0].x, y: (snake[0].y + 1) % gridHeight });
      snake.pop();
    } else if (direction === 3) {
      snake.unshift({ x: (snake[0].x - 1 + gridWidth) % gridWidth, y: snake[0].y });
      snake.pop();
    }
  }

  // Now, let's handle the food
  // We'll use an object to store the food's position.
  let food = { x: 15, y: 15 };

  // Let's create a function to draw the food.
  function drawFood() {
    ctx.fillStyle = 'red';
    const cornerRadius = 4; // Adjust the corner radius as needed
    const x = food.x * gridSize;
    const y = food.y * gridSize;
    const width = gridSize;
    const height = gridSize;

    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.lineTo(x + width - cornerRadius, y);
    ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
    ctx.lineTo(x + width, y + height - cornerRadius);
    ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
    ctx.lineTo(x + cornerRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
    ctx.closePath();

    ctx.fill();
  }

  // Let's create a function to check if the snake ate the food.
  // We'll use the unshift function to add a new segment to the snake.
  // We'll use the push function to add a new segment to the snake.
  function checkFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      // Add a new segment to the snake.
      snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });

      // Move the food to a new position.
      food.x = Math.floor(Math.random() * gridWidth);
      food.y = Math.floor(Math.random() * gridHeight);

      // Update the score.
      gameScore++;
    }
  }

  function drawScore() {
    scoreCtx.clearRect(0, 0, score.width, score.height);
    scoreCtx.fillStyle = 'black';
    scoreCtx.fillRect(0, 0, score.width, score.height);
    scoreCtx.fillStyle = 'yellow';
    scoreCtx.fillText(gameScore, score.width / 2, score.height / 2);
  }

  let lastRenderTime = 0;
  const SNAKE_SPEED = 10;
  // Let's create a function to draw the game.
  // We'll use the requestAnimationFrame function to call this function every frame.
  function draw(currentTime) {
    requestAnimationFrame(draw);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();

    checkFood();

    // Draw the snake.
    drawSnake();

    // Draw the food.
    drawFood();

    // Draw the score.
    drawScore();
  }

  draw();


})();