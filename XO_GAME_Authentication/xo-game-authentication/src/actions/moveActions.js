export function addMove (currentMove) {
  return {
    type: 'ADD_MOVE',
    currentMove,
  };
}
export function resetMove (moveIndex) {
  return {
    type: 'RESET_MOVE',
    moveIndex,
  };
}
