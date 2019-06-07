const initialState = {
  country: ''
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_COUNTRY':
      return {
        country: action.country
      }
    default:
      return state
  }
}
export default locationReducer