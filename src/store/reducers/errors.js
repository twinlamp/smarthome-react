const reducer = (state = {}, action) => {
  const { type, errors } = action;
  const matches = /(.*)_(START|FAIL)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'FAIL' ? errors : null,
  };
};

export default reducer;