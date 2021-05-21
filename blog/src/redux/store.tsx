import {createStore,combineReducers} from "redux";
import {currentindex,editbackdrop,editdetails,profilepic,
    addbackdrop,myposts,postpic

} from "./reducers";
const red = combineReducers({
    currentindex,
    editbackdrop,
    editdetails,
    profilepic,
    addbackdrop,
    myposts,
    postpic
});

const Store = createStore(red);

export type RootState = ReturnType<typeof Store.getState>

export default Store;