/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserConstructor } from "../model/User";

const { persistAtom } = recoilPersist();

export const authenticated = atom({
    key: "authenticated",
    default:{
        check: false,
        user: UserConstructor
    },
    effects_UNSTABLE: [persistAtom],
})

export const tokenPersisted = atom({
    key: "token",
    default:{
        check: false,
        token: ""
    },
    effects_UNSTABLE: [persistAtom],
})