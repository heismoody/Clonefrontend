import { Usercontext } from "../context/usercontext";
import { useContext } from "react";

export const usercontexthook = () => {
    const context = useContext(Usercontext)

    if (!context) {
        throw Error("used outside of the recontext provider")
    }

    return context
}