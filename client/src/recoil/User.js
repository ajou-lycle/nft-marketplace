import {atom} from "recoil";
import { recoilPersist } from "recoil-persist";

// export const nicknameState = atom ({ 
//     // 다른데서 쓸거니까 export
//     key : "id",
//     default : "",
// })

const {persistAtom} = recoilPersist()

export const isLoginState = atom({
    key : "re",
    default : false,
})

export const isLiked = atom ({
    key: 'isliked' ,
    default: "d5_like_false",
    effects_UNSTABLE : [persistAtom],
})

// export const itemImgState = atom({
//     key : "itemImg",
//     default : '',
// })
// export const titleState = atom({
//     key : "title",
//     default : '',
// })
// export const priceState = atom({
//     key : "price",
//     default : '',
// })
// export const contentState = atom({
//     key : "content",
//     default : '',
// })

