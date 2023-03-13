import React, { useState, useEffect, useContext, useMemo } from 'react'
import WhealthForm from '../../components/WealthForm/WhealthForm';
import { formValue } from '../../context/storeContextValue';
import Loader from '../../components/Loader/Loader'
import "../../index.css"



export default function Home() {

    const [position, setPosition] = useState(null);
    const [defaultValue, setDefaultValue] = useState("Paris");
    const { value } = useContext(formValue)
    const apiUrl = import.meta.env.VITE_API_OPEN_WEATHER

    const getData = useMemo(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?q=${value || defaultValue}&key=${apiUrl}&lang=fr`);
                const data = await response.json();
                return data
            }
            catch (error) {
                console.log(error);
            }
        }
        return fetchData();
    }, [value])

    useEffect(() => {
        getData.then(result => { setPosition(result) })
    }, [getData])

    return (
        <section className='p-4'>
            <WhealthForm />
            {
                position ?
                    (
                        <div className='box card_wealth p-4 relative'>
                            <p className='text-white title'>{position.location.name}</p>
                            <p className='text-white title-md'>{position.location.region || position.location.country}</p>
                            <p className='text-white'>{position.current.temp_c} °C </p>
                            <p className='text-white m-4'>{position.current.condition.text}</p>
                            <img className='absolute img_current_condition' src={position.current.condition.icon} alt={position.current.condition.text} />
                        </div>
                    )
                    :
                    (
                        <Loader />
                    )
            }
        </section>
    )
}
