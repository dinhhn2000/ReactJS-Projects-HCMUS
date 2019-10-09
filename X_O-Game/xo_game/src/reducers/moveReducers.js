const initialState = [{value: {player: '', i: -1, j: -1}, label: 'Start move'}];

export default function todos (state = initialState, action) {
  switch (action.type) {
    case 'ADD_MOVE':
      return [
        ...state,
        {value: action.currentMove.value, label: action.currentMove.label},
      ];
    case 'RESET_MOVE':
      return state.slice (0, action.moveIndex + 1);
    default:
      return state;
  }
}
