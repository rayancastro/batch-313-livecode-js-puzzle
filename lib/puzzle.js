const hintButton = document.querySelector('#show-hint');
// console.log(hintButton)

hintButton.addEventListener('click', () => {
  const hint = document.querySelector('.hint');
  hint.classList.toggle('active');
})

const canMove = (tile) => {
    // Cell index are columns

    const tileColumn = tile.cellIndex;
    const tileRow = tile.parentNode.rowIndex;

    const rightNeighboor = tile.parentNode.querySelectorAll('td')[tileColumn + 1];
    // return if (rightNeighboor.classList.contains('empty'));
    // console.log(rightNeighboor);
    const leftNeighboor = tile.parentNode.querySelectorAll('td')[tileColumn - 1];
    // console.log(leftNeighboor)
    let downNeighboor;
    if (tileRow < 3 ) {
      downNeighboor = tile.parentNode.parentNode.querySelectorAll('tr')[tileRow + 1].querySelectorAll('td')[tileColumn];
    }
    let upNeighboor;
    if (tileRow > 0 ) {
      upNeighboor = tile.parentNode.parentNode.querySelectorAll('tr')[tileRow - 1].querySelectorAll('td')[tileColumn];
      // console.log(upNeighboor);
    }

    // rightNeighboor.classList.contains('empty')
    return (rightNeighboor && rightNeighboor.classList.contains('empty')) ||
    (leftNeighboor && leftNeighboor.classList.contains('empty')) ||
    (downNeighboor && downNeighboor.classList.contains('empty')) ||
    (upNeighboor && upNeighboor.classList.contains('empty'))

    // Returns true or false depending if tile can move
}

const moveTile = (tile) => {
  const emptyTile = document.querySelector('.empty');
  // current tile inner text -> empty tile innerText
  emptyTile.innerText = tile.innerText;
  // current tile add empty class and remove innertext
  tile.classList.add('empty');
  tile.innerText = "";
  // empty tile remove empty class
  emptyTile.classList.remove('empty');
}

const checkIfPlayerWins = () => {
  let tilesOrder = Array.from(document.querySelectorAll('td'));
  tilesOrder = tilesOrder.map(e => parseInt(e.innerText, 10)).join();
  if (tilesOrder === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN") {
    setTimeout(() => {
      alert('gl vPlayer Wins');
    }, 100);
  }
}
// When we click on a tile, if it has empty
//neighboors (horizontally or vertically), move the tile to the empty space

// Pseudo Code
// 1. Select all of the tiles
const tiles = document.querySelectorAll('td');
// console.log(tiles);
// 2. For each tile
tiles.forEach((tile) => {
  // 3. Listen to click events
  tile.addEventListener('click', (event) => {
    const currentTile = event.currentTarget;
    // 4. If it has an empty neighboor
    if (canMove(currentTile)) {
      // 5. Switch the tile with the empty neighboor
      moveTile(currentTile);
      checkIfPlayerWins();
    }
    // 6. Check if the players wins!
  });
});
