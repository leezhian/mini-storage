/*
 * @Author: kim
 * @Date: 2022-06-01 22:48:05
 * @Description: store
 */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import createFetchMiddleware from 'redux-composable-fetch'
import rootReducer from './reducers'

const FetchMiddleware = createFetchMiddleware({
  afterFetch({ action, result }) {
    return result.json().then(data => {
      return Promise.resolve({
        action,
        result: data,
      });
    });
  },
})

const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware, FetchMiddleware)
)(createStore)

const reducer = combineReducers(Object.assign({}, rootReducer))

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState)
  return store
}
