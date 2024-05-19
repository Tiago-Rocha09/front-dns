"use client"

import { ChangeEvent, useState } from "react"

export const Form = () => {
    const [name, setName] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Replace invalid characters with an empty string
        const cleanedName = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
        console.log({ cleanedName });

        setName(cleanedName);
    };

    const handleSave = async () => {
        if (!name) return

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ slug: name })
        });

        if (!response.ok) {
            const error = await response.text();
            console.log(`Error: ${response.status} - ${error}`);
        }

        const result = await response.json();
        console.log(result);
    }

    return <>
        <fieldset className="flex flex-col">
            <label>Criar novo usuário</label>
            <input onChange={handleChange} value={name} className="py-1 px-4 rounded" />
        </fieldset>
        <button onClick={handleSave} type="button" className="bg-red-600 text-white py-1 px-4 rounded">Criar</button>
    </>
}