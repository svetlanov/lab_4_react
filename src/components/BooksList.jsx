import { useEffect, useState } from 'react';
import booksData from '../data/books.json';
import BookCard from './BookCard';
import Search from './Search';

/**
 * Компонент для отображения списка книг с возможностью поиска.
 * 
 * @component
 * @returns {JSX.Element} JSX-разметка компонента BooksList.
 */
const BooksList = () => {
    /**
     * Состояние для хранения полного списка книг.
     * @type {[Array, Function]}
     */
    const [books, setBooks] = useState([]);

    /**
     * Состояние для хранения отфильтрованного списка книг.
     * @type {[Array, Function]}
     */
    const [filteredBooks, setFilteredBooks] = useState([]);

    /**
     * Эффект для инициализации списка книг из данных.
     */
    useEffect(() => {
        setBooks(booksData);
        setFilteredBooks(booksData);
    }, []); //сработает только 1 раз

    /**
     * Обработчик поиска книг.
     * 
     * @param {string} searchValue - Значение строки поиска.
     */
    const handleSearch = (searchValue) => {
        const filteredBooks = books.filter((book) => {
            return book.title.toLowerCase().includes(searchValue.toLowerCase());
        });

        setFilteredBooks(filteredBooks);
    }; //функ-я

    return (
        <div>
            {/* Компонент поиска */}
            <Search onSearch={handleSearch} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* Карточки книг */}
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id} // Предполагается, что у книги есть уникальный идентификатор
                        book={book}
                    />
                ))}
                {/* Сообщение, если книги не найдены */}
                {(!filteredBooks.length) ? <p style={{ width: '100%', fontSize: 24 }}>Ничего не найдено</p> : null}
            </div>
        </div>
    );
};

export default BooksList;