import { reqcontext } from "../context/reqcontext";
import { useContext } from "react";

export const usereqcontext = () => {
    const context = useContext(reqcontext)

    if (!context) {
        throw Error("used outside of the recontext provider")
    }

    return context
}