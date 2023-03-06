import { createContext, useState } from "react";


export const formValue = createContext();
export const FormProvier = ({ children }) => {
    const [value, setValue] = useState("");

    const handleForm = (newValue) => {
        setValue(newValue)
    };

    return (
        <formValue.Provider value={{ value, handleForm }} >
            {children}

        </formValue.Provider>
    )


}

export default FormProvier