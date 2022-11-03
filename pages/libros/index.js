import Link from "next/link"
export async function getStaticProps(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await res.json()
    return {
        props: {
            books: data
        }
    }
}
const BookList = ({books}) => {
    async function handleDelete(e,bookId) {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,{
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _method: 'DELETE' //para laravel
            })
        })
        if (res.ok) {
            window.location.href = '/libros'
        }
    }
    return (
        <>        
            <h1>Libros</h1>
            <ul data-cy="book-list">
                {books.map(book=>(
                    <li key={`book-${book.id}`}>
                        <Link 
                        data-cy={`link-to-visit-book-${book.id}`} 
                        href={`/libros/${book.id}`}>
                        {book.title}
                        </Link>
                        {' - '}
                        <Link 
                        data-cy={`link-to-edit-book-${book.id}`}
                        href={`/libros/${book.id}/editar`}>
                        Editar
                        </Link>
                        {' - '}
                        <form 
                        style={{ display: 'inline' }} 
                        onSubmit={(e)=>handleDelete(e,book.id)}>
                            <button 
                            data-cy={`button-to-delete-book-${book.id}`}
                            >Eliminar</button>
                        </form>
                    </li>
                ))}
            </ul>
            <Link href="/libros/crear">Crear un libro</Link>
        </>
    )
}

export default BookList 