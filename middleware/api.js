const API_ROOT = '/api/';


const callApi = (endpoint) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl)
    .then(response => { 
      return response.json(); 
    }, err => console.log(err))
    .then(json => {
        if (!json.ok) {
          return Promise.reject(json)
        }
        return json.payload;    
    });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, types } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction =  {...action, ...data};
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
