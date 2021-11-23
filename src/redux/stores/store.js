import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['users']
};

const rootReducer = combineReducers({
    authReducer: persistReducer(persistConfig, authReducer)
})

// const configureStore = () => createStore(rootReducer);

// export default configureStore;

export const store = createStore(rootReducer);
export const persistor = persistStore(store);