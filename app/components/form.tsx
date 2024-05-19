"use client"

import { ChangeEvent, useState } from "react"

export const Form = () => {
    const [name, setName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('')
        // Replace invalid characters with an empty string
        const cleanedName = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
        console.log({ cleanedName });

        setName(cleanedName.toLocaleLowerCase());
    };

    const handleSave = async () => {
        if (!name) return
        try {
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dns`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug: name })
            });

            if (!response.ok) {
                const error = await response.json();
                console.log(`Error: ${response.status} - ${error}`);
                setErrorMessage(error.message || JSON.stringify(error))
            }

            const result = await response.json();
            console.log(result);
            setSuccessMessage(result.domain || '')
            setName('')
            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    }

    return <>
        {successMessage && <a href={successMessage} target="_blank">Acessar novo subdomínio {successMessage}</a>}
        <fieldset className="flex flex-col">
            <label>Criar novo usuário</label>
            <input onChange={handleChange} value={name} className="py-1 px-4 rounded" />
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </fieldset >
        <button onClick={handleSave} type="button" className="bg-red-600 text-white py-1 px-4 rounded" disabled={loading}>Criar</button>
    </>
}