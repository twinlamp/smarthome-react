const reducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(START|FINISH|FAIL)/.exec(type);
  
  if (!matches) return state;  
  
  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'START',
  };
};

export default reducer;