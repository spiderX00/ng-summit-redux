/* beautify preserve:start */
import {fromJS} from 'immutable';
import {PARTY_SEATED, ORDER_STARTED, ITEM_ADDED, ITEM_REMOVED} from '../actions/table-actions.js';
/* beautify preserve:end */

export const CLEAN = 'CLEAN';
export const DIRTY = 'DIRTY';
export const OCCUPIED = 'OCCUPIED';
export const ORDERING = 'ORDERING';
export const ORDERED = 'ORDERED';
export const HAS_FOOD = 'HAS_FOOD';

export const INITIAL_STATE = fromJS([{
    id: 1,
    numberOfSeats: 2,
    status: CLEAN,
    order: {}
}, {
    id: 2,
    numberOfSeats: 4,
    status: CLEAN,
    order: {}
},
  {
    id: 3,
    numberOfSeats: 4,
    status: CLEAN,
    order: {}
},
  {
    id: 4,
    numberOfSeats: 2,
    status: CLEAN,
    order: {}
}]);

export default function tableReducer(state = INITIAL_STATE, action) {
  let findIndex = (collection, id) => collection.findIndex(n => n.get('id') === id);
  
  if (!action.type || !action.payload) {
    return state;
  }

  let tableIndex = findIndex(state, action.payload.tableId);
  switch (action.type) {
  case PARTY_SEATED:
    {

      return state.setIn([tableIndex, 'status'], OCCUPIED);
    }
  case ORDER_STARTED:
    {

      return state.setIn([tableIndex, 'status'], ORDERING);
    }
  case ITEM_ADDED:
    {
      let result = state.updateIn([tableIndex, 'order', action.payload.menuItemId], 0, value => value + 1);
      console.log('the result',result.toJS());
      return result;
    }
  case ITEM_REMOVED:
    {
      return state;
    }

  case 'CUSTOMER_PAID':
    {

      return state.setIn([tableIndex, 'status'], DIRTY);
    }
  case 'TABLE_CLEANED':
    {

      return state.setIn([tableIndex, 'status'], CLEAN);
    }
  case 'ORDER_PLACED':
    {
      return state;
    }
  default:
    return state;
  }
}
