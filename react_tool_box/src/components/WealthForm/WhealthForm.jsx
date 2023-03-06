import React, { useState } from 'react'
import { useContext } from 'react'
import { formValue } from "../../context/storeContextValue"

export default function WhealthForm() {

    const { value, handleForm } = useContext(formValue)
    const setValueForm = (e) => {
        handleForm(e.target.value)
    }

    const Town_Of_France = [
        "Paris", "Nice", "Toulouse", "Saint-Denis", "Aulnay-sous-Bois", "Sevran"
    ]

    return (
        <div className='ville_selection'>
            <form action="">
                <label className='label_ville_selection' htmlFor="Ville">Votre Ville</label>
                <select onChange={(e) => setValueForm(e)} name="ville_select" id="">
                    <optgroup label='Europe'>
                        {Town_Of_France.map((towns, index) =>
                            <option key={index} >{towns}</option>
                        )}
                    </optgroup>
                </select>
            </form>
        </div>
    )
}
