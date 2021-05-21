import {createStore,combineReducers} from "redux";
import {currentindex,editbackdrop,editdetails,profilepic,
    addbackdrop,myposts,postpic,onsearch,currentprofile

} from "./reducers";
const red = combineReducers({
    currentindex,
    editbackdrop,
    editdetails,
    profilepic,
    addbackdrop,
    myposts,
    postpic,
    onsearch,
    currentprofile,
});

const Store = createStore(red);

export type RootState = ReturnType<typeof Store.getState>

export default Store;