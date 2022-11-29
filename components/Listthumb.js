import { usercontexthook } from "../hooks/UsercontextHook"
import { listcontexthook } from "../hooks/Listcontexthook"

const ListThumb = ({ data }) => {
    const base_url = 'https://image.tmdb.org/t/p/original'
    const { user } = usercontexthook()
    const { dispatch } = listcontexthook()
    
    const dataid = data._id

    const deletemovie = async () => {
        const res = await fetch(`http://192.168.128.166:4000/api/downloadlist/deleteinlist/${dataid}`, {
            method: 'DELETE',
            headers: {
                    'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await res.json()

        if (res.ok) {
            dispatch({type: 'delete_movieinlist', payload: data})
        }
    }

    return (
        <div className="w-[182px] md:thumbcontainermobile">
            <div className="h-[280px] w-[180px] border-[2px] relative md:thumbcontmobile">
                <img src={`${base_url}${data.posterurl}`} className="thumbimg" />
                <div className="rounded-full bg-our-green w-fit absolute top-[-12px] right-[-12px]">
                    <div className="p-1 hover:p-[6px]" onClick={deletemovie}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className=" flex justify-between items-center w-full ">
                <div>
                    <h5 className="font-bold text-slate-100 pt-2 hover:text-slate-100/40 text-sm md:text-xs">{ data.title }</h5>
                    <h6 className="text-slate-100/60 text-xs">{ data.year }</h6>
                </div>
                <div className=" flex ">
                    <div className="p-1 mx-1 border border-our-green rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-our-green">
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="p-1 border border-our-green rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-our-green">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ListThumb;