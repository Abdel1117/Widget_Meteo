import React, { useContext, useMemo } from 'react'
import { useEffect, useState } from 'react'
import { formValue } from '../../context/storeContextValue'
import Loader from '../Loader/Loader'
export default function ForeCast({ day }) {

    const apiKey = import.meta.env.VITE_API_OPEN_WEATHER;
    const [defaultValue, setDefaultValue] = useState('Paris');
    const [data, setdata] = useState(null);
    const [days, setDay] = useState(null);
    const [expend, setIsExpended] = useState(false);
    const { value } = useContext(formValue);

    const getdata = useMemo(() => {
        const fetchData = async () => {
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${value || defaultValue}&days=8&key=${apiKey}&lang=fr`);
            const data = await response.json();

            const dateStr = data.forecast.forecastday[day].date;
            const date = new Date(dateStr);
            const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Merecredi', 'Jeudi', 'Vendredi', 'Samedi'];
            const dayOfWeekStr = daysOfWeek[date.getDay()];
            setDay(dayOfWeekStr);
            return data
        }
        return fetchData()
    }, [value, day])

    useEffect(() => {
        getdata.then(result => {
            setdata(result)
        })
    }, [getdata]);
    const expendHandle = () => {
        setIsExpended(!expend)
    }
    return (
        <section className='p-4'>
            {
                data ? (


                    <div onClick={expendHandle} id='card' className={`  ${expend === true ? 'box' : 'box_min'} card_wealth p-4 m-2 relative`} >
                        <p className='text-white m-4'>{days}</p>
                        <img className={`${expend === true ? 'absolute' : 'initial'} img_current_condition`} src={data.forecast.forecastday[day].day.condition.icon} alt={data.forecast.forecastday[day].day.condition.text} />
                        {expend === true ?
                            <>
                                <p className='text-white title'>{data.location.name}</p>
                                <p className='text-white title-md'>{data.location.region || data.location.country}</p>
                                <p className='text-white'>Température Max : {data.forecast.forecastday[day].day.maxtemp_c} °C </p>
                                <p className='text-white'>Température Min : {data.forecast.forecastday[day].day.mintemp_c} °C </p>
                                <p className='text-white'>Température Moyenne : {data.forecast.forecastday[day].day.avgtemp_c} °C </p>
                                <p className='text-white'> {data.forecast.forecastday[day].day.avgtemp_c} °C </p>
                                <p className='text-white font-bold  m-4'>{data.forecast.forecastday[day].day.condition.text}</p>
                            </>
                            :
                            <>
                                <p className='text-white'> {data.forecast.forecastday[day].day.avgtemp_c} °C </p>
                                <p className='text-white font-bold text-current m-4'>{data.forecast.forecastday[day].day.condition.text}</p>
                            </>
                        }


                    </div>
                )
                    :
                    (
                        <Loader />
                    )
            }
        </section >
    )
}
