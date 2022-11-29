import { useState } from "react";
import { useregister } from "../../hooks/Userregister";
import Router from 'next/router';
import Link from "next/link";
import { usercontexthook } from "../../hooks/UsercontextHook";

const Signup = () => {
    const { user } = usercontexthook()
    
    if (user) {
        Router.push('/userfile/userpage')
    }
    
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')

    const { Register, error, loading} = useregister()
    

    const handleregister = async(e) => {
        e.preventDefault()

        if (password === confirmpassword) {

            await Register(username, email, password)

        } else {

            throw "check your passwords"

        }
        
    }

    return ( 
        <form className="w-[600px] p-8 md:w-full">
            <div className="signupdiv">
                <div className="px-2">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black/10">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setusername(e.target.value)}
                        value={username}
                        className="signupfield"
                    />
                </div>
            </div>
            <div className="signupdiv">
                <div className="px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black/10">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="E-mail(no confirmation needed)"
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        className="signupfield"
                    />
                </div>
            </div>
            <div className="signupdiv">
                <div className="px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black/10">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setpassword(e.target.value)}
                        value={password}
                        className="signupfield"
                    />
                </div>
            </div>
            <div className="signupdiv">
                <div className="px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black/10">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Comfirm Password"
                        onChange={(e) => setconfirmpassword(e.target.value)}
                        value={confirmpassword}
                        className="signupfield"
                    />
                </div>
            </div>
            <button onClick={handleregister} disabled={loading} className="thumbbtn w-full text-slate-50 py-3">Register</button>
            {error && <div>{error}</div>}
            
            <p className="text-xs text-center py-2">You have an account already? <Link href={'/userfile/login'}><a className="text-blue-400 ">Log in</a></Link></p>
        </form>
    );
}
 
export default Signup;