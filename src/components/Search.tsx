import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { SearchIcon } from "lucide-react";


function Search() {

    const { setShowSearch, setSearch, showSearch, search } = useContext(ShopContext)!;


    return (
        <>
            {showSearch ? (
                <div className="w-full hidden    max-w-5/12 my-6 py-6  bg-opacity-40 md:flex items-center justify-center z-50">
                    <div className="bg-white  shadow-lg    flex justify-between items-center
                              gap-4 border border-gray-300 w-full rounded px-4  focus:outline-none focus:ring-2 
                             focus:ring-green-700">
                        <input
                            value={search}
                            onChange={(e) => setSearch!(e.target.value)}
                            type="text"
                            placeholder="Buscar produtos..."
                            className="w-full p-2 outline-none"
                        />
                        <SearchIcon className="cursor-pointer " color="#15803d" size={25} />
                    </div>


                </div>
            ) : null}
        </>
    );
}

export default Search