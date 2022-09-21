import {atom} from "recoil";

export const nicknameState = atom ({ 
    // 다른데서 쓸거니까 export
    key : "id",
    default : "",
})
export const isLogin = atom({
    key : "bool",
    default : false,
})
export const itemImgState = atom({
    key : "itemImg",
    default : '',
})
export const titleState = atom({
    key : "title",
    default : '',
})
export const priceState = atom({
    key : "price",
    default : '',
})
export const contentState = atom({
    key : "content",
    default : '',
})

