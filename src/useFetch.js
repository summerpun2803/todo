import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { View } from "./store/taskSlice";

const useFetch = (url) => {
    const[data, setData] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
    
        async function fetchData() {
            try {
                const res = await fetch(url);

                if (!res.ok) {
                    throw error("could not fetch the data");
                }

                const data = await res.json();
                setData(data);
                setError(null);
                dispatch(View(data));

            } catch (error) {
                setError(error);
            }
        }

        fetchData();
    }, []);  
    
    return { error };
}
export default useFetch;