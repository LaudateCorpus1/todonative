const initialState = "";

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FILTER': {
            return action.payload;
        }
        default: return state;
    }
}

export const setFilter = (filter) => dispatch => { dispatch(_setFilter(filter)) };

const _setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter });