/**
 * Компонент страницы книги.
 * Отображает информацию о книге, включая название, автора, год, жанр и издания.
 * Если `bookId` некорректен или книга не найдена, перенаправляет на страницу 404.
 *
 * @component
 */

import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react'; 

import BookEdition from '../BookEdition';
import BooksCollection from '../../data/books.json';

import './index.css';

/**
 * Компонент `BookPage`.
 * Использует `useParams` для получения идентификатора книги из URL и отображает данные книги.
 *
 * @returns {JSX.Element} Разметка страницы книги.
 */
function BookPage() {
    const navigate = useNavigate();
    const { bookId } = useParams();

    if (!bookId || isNaN(Number(bookId))) {
        navigate('/404', { replace: true });
    }

    const [book, setBook] = useState({});
    const [selectedEdition, setSelectedEdition] = useState();


    useEffect(() => {
        /**
         * Поиск книги по идентификатору.
         * Если книга не найдена, перенаправляет на страницу 404.
         */
        let bookById = BooksCollection.find((book) => book.id === Number(bookId));
        if (!bookById?.id) {
            navigate('/404');
        }

        setBook(bookById);
        setSelectedEdition(bookById.editions.filter(edition => edition.inStock)[0]);
    }, [bookId, navigate]);

    if (!book?.id) {
        return (
            <>
                <h2>Книга не найдена</h2>
            </>
        );
    }

    const onEditionSelect = (edition) => {
        console.log('Selected edition:', edition);
        setSelectedEdition(edition);
    }

    return (
        <>
            <div className="book-page-main">
                <div className="left-side">
                    <img src={book.imageUrl} alt={book.title} />
                </div>
                <div className="right-side">
                    <h2>{book.title}</h2>
                    <p>Автор: {book.author}</p>
                    <p>Год: {book.year}</p>
                    <p>Жанр: {book.genre}</p>
                    <p>Издания:</p>
                    {book.editions.map((edition) => (
                        <BookEdition onSelect={onEditionSelect} key={edition.id} edition={edition} selected={selectedEdition.edition === edition.edition} />
                    ))}
                    <div class="book-page-buy-row"> 
                        <button class="add-to-cart" disabled={!selectedEdition?.id}>В корзину</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookPage;