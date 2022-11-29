import { usercontexthook } from "./UsercontextHook";
import { usereqcontext } from "./usereqcontext";

export const UserLogout = () => {
    const { dispatch } = usercontexthook()
    const { dispatch: reqdispatch } = usereqcontext()
    
    
    const logout = () => {
        
        //Remove user from the local storage
        localStorage.removeItem('user')

        //Removing user from the context
        dispatch({ type: 'signing_out' })
        reqdispatch({ type: 'show_movies', payload: null })
        
    }

    return {logout}
}