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

export const constmemberId = atom({
    key : "constmemberId",
    default : 0,
})


export const serverAddress = atom({
    key : "serverAddress",
    default :'3.38.210.200',
})

export const MetaMaskInstalledRecoil = atom({
    key: "MetaMaskRecoil",
    default:false,
})



