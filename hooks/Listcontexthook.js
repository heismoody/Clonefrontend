import { listcontext } from "../context/listcontext";
import { useContext } from "react";

export const listcontexthook = () => {
    const context = useContext(listcontext)

    if (!context) {
        throw Error("used outside of the recontext provider")
    }

    return context
}