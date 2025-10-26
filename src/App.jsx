import { useState } from "react";
import BookCard from "./components/BookCard";
import NewButton from "./components/NewButton";
import Modal from "./components/Modal";
import booksData from "../data/books.json";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState(
    booksData.map((b) => ({
      title: b.title || "",
      author: "",
      publisher: "",
      year: "",
      language: "",
      pages: "",
      price: b.price || "N/A",
      url: b.image || "",
      link: b.url || "",
      selected: false,
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
    url: "",
  });

  // Select toggle
  const handleSelect = (index) => {
    setBooks((prev) =>
      prev.map((book, i) => ({
        ...book,
        selected: i === index ? !book.selected : false,
      }))
    );
  };

  // Delete selected book
  const handleDelete = () => {
    setBooks((prev) => prev.filter((book) => !book.selected));
  };

  // Form input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add new book
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      publisher: formData.publisher.trim(),
      year: String(formData.year || "").trim(),
      language: formData.language.trim(),
      pages: String(formData.pages || "").trim(),
      price: "N/A",
      url: (formData.url || "").trim(),
      link: (formData.url || "").trim(),
      selected: false,
    };

    if (!newBook.title || !newBook.author) return;

    setBooks((prev) => [...prev, newBook]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      author: "",
      publisher: "",
      year: "",
      language: "",
      pages: "",
      url: "",
    });
  };

  return (
    <>
      <header>
        <h1>Book Catalog</h1>
      </header>

      <div className="catalog">
        <div className="actions">
          <NewButton onClick={() => setIsModalOpen(true)} />
          <div className="action-buttons">
            <button className="action-btn update-btn" type="button">
              Update
            </button>
            <button
              className="action-btn delete-btn"
              type="button"
              onClick={handleDelete}
              disabled={!books.some((b) => b.selected)}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="books-grid">
          {books.map((book, i) => (
            <BookCard
              key={i}
              title={book.title}
              author={book.author}
              price={book.price}
              image={book.url}
              link={book.link}
              selected={book.selected}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <label htmlFor="title">Title:</label>
          <input id="title" name="title" value={formData.title} onChange={handleChange} required />

          <label htmlFor="author">Author:</label>
          <input id="author" name="author" value={formData.author} onChange={handleChange} required />

          <label htmlFor="publisher">Publisher:</label>
          <input id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />

          <label htmlFor="year">Year:</label>
          <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} />

          <label htmlFor="language">Language:</label>
          <input id="language" name="language" value={formData.language} onChange={handleChange} />

          <label htmlFor="pages">Pages:</label>
          <input type="number" id="pages" name="pages" value={formData.pages} onChange={handleChange} />

          <label htmlFor="url">Cover URL:</label>
          <input id="url" name="url" value={formData.url} onChange={handleChange} placeholder="" />

          <div className="form-submit">
            <button type="submit">Save</button>
          </div>
        </form>
      </Modal>

      <footer>
        <p>&copy; Sharleen Wang 2025</p>
      </footer>
    </>
  );
}
