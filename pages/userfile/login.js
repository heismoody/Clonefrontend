import { useState } from "react";
import { uselogin } from "../../hooks/Userlogin";
import Router from 'next/router';
import Link from "next/link";
import { usercontexthook } from "../../hooks/UsercontextHook";

const Login = () => {
    const { user } = usercontexthook()
    
    if (user) {
        Router.push('/userfile/userpage')
    }
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const {login, error, loading} = uselogin()

    const handlelogin = async(e) => {
        e.preventDefault()

        await login(email, password)
        
    }

    return ( 
        <form onSubmit={handlelogin} className="w-[600px] p-8 sm:w-full">
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
                        placeholder="E-mail"
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
            <button className="thumbbtn w-full text-slate-50 py-3 md:w-full" disabled={loading}>Login</button>
            {error && <div>{error}</div>}
            <p className="text-xs text-center py-2">You don&apos;t have an account yet! <Link href={'/userfile/signup'}><a className="text-blue-400 ">click here</a></Link></p>
        </form>
    );
}
 
export default Login;