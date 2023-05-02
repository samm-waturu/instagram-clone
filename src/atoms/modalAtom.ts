import {atom} from "recoil";
// import {AtomProps} from "../../typings";

export const modalState =  atom({
    key: 'modalState',
    //this is the state name we will alter
    default: false
});
