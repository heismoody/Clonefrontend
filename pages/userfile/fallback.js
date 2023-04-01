import React from "react";

const Fallback = () => {
    return ( 
        <>
            <div className="text-center">
                <h4 className="text-md font-bold py-3">OOPPSS!!</h4>
                <p className="text-sm pb-3">We are very sorry :(</p>
                <p className="text-sm pb-3">Check your internet connection or Wi-Fi if it&ampos;s well connected</p>
                <button className="thumbbtn text-slate-50 py-3">Go To HomePage</button>
            </div>
        </>
    );
}
 
export default Fallback;