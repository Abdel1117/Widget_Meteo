import React, { useState, useEffect, useContext } from 'react'
import WhealthForm from '../../components/WealthForm/WhealthForm';
import { formValue } from '../../context/storeContextValue';
import Loader from '../../components/Loader/Loader'
import "../../index.css"


const getPos = () => {
    return new Promise((resolve, reject) => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (succes) => {


                    let lat = succes.coords.latitude;
                    let long = succes.coords.longitude;
                    const Obj = {
                        "Latitude": lat,
                        "Longitude": long
                    };
                    resolve(Obj)
                },
                (error) => {
                    reject(error);
                }
            );
        }
        else {
            reject(new Error('Geolocation not supported'));
        }
    });
};

export default function Home() {

    const [position, setPosition] = useState(null);
    const [defaultValue, setDefaultValue] = useState("Paris");
    const { value } = useContext(formValue)
    const apiUrl = import.meta.env.VITE_API_OPEN_WEATHER
    const objLat = getPos();


    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?q=${value || defaultValue}&key=${apiUrl}&lang=fr`);
                const data = await response.json();
                setPosition(data)
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [value])

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
