export const tournamentReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FROM_DB":
      return { tournaments: action.payload };
      break;

    default:
      break;
  }
};
