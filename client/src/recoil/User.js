import {atom} from "recoil";

export const idState = atom ({
    key : "id",
    default : "",
})

export const isLogin = atom({
    key : "bool",
    default : false,
})