import { applyMiddleware } from 'redux';
import reducer from '../../state';
// Saga Realted
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../../sagas'
// Dev Tools
import { composeWithDevTools } from 'remote-redux-devtools';
import Reactotron from 'reactotron-react-native'
// Redux Persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { authTypes } from '../../state/auth';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};


const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(initialState) {

  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = (state, action) => {
    if (action.type === authTypes.UNAUTHENTICATED) {
      state = {};
    }
    return persistedReducer(state, action);
  };

  const store = Reactotron.createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ));
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)

  return {store, persistor};
}
