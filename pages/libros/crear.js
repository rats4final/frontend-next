import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
const BookCreate = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false);
    const [bookTitle,setBookTitle] = useState('')
    const [errors, setErrors] = useState([]);
    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,{
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })
        if (res.ok) {
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }
        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)
    }
    return (
        <>
            <h1>Hola</h1>
            {/* <p>{JSON.stringify(errors)}</p> */}
            <form onSubmit={handleSubmit}>
                <input
                data-cy="input-book-title" 
                onChange={(e)=>setBookTitle(e.target.value)}
                value={bookTitle}
                disabled={submitting}
                type="text"/><br></br>
                <button 
                    data-cy="button-submit-book" 
                    disabled={submitting}>
                    {submitting ? 'Enviando...' : 'Enviar'}
                </button>
                {errors.title && (
                    <span style={{ 
                        color: 'red',
                        display: 'block'
                     }}>{errors.title}</span>
                )}
            </form>
            <Link href="/libros">Lista de libros</Link>
        </>
    );
}

export default BookCreate;
