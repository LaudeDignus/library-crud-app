import { useState, useEffect, useCallback } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    year: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 3;

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = useCallback(() => {
    let result = [...books];

    if (searchQuery) {
      result = result.filter((book) =>
        book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    setFilteredBooks(result.slice(start, end));
  }, [books, searchQuery, currentPage, booksPerPage]);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/books/${editId}`, newBook);
        setEditId(null);
      } else {
        await API.post("/books", newBook);
      }
      setNewBook({ title: "", author: "", year: "", image: "" });
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la soumission");
    }
  };

  const handleEdit = (book) => {
    setEditId(book._id);
    setNewBook({
      title: book.title,
      author: book.author,
      year: book.year,
      image: book.image || "",
    });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNewBook({ title: "", author: "", year: "", image: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce livre ?")) return;
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(
    books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / booksPerPage
  );

  return (
    <div className="container">
      <h2>{editId ? "Modifier un livre" : "Ajouter un livre"}</h2>

      <form onSubmit={handleSubmit} className="form-add-book">
        <div className="input-row">
          <input
            name="title"
            placeholder="Titre"
            value={newBook.title}
            onChange={handleChange}
            required
          />
          <input
            name="author"
            placeholder="Auteur"
            value={newBook.author}
            onChange={handleChange}
            required
          />
          <input
            name="year"
            type="number"
            placeholder="Année"
            value={newBook.year}
            onChange={handleChange}
            required
          />
          <input
            name="image"
            placeholder="Lien de l'image"
            value={newBook.image}
            onChange={handleChange}
          />
        </div>

        <div className="btn-row">
          <button type="submit" className="submit-button">
            {editId ? "Modifier" : "Ajouter"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn-cancel"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Rechercher par titre"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <ul className="book-list">
        {filteredBooks.map((book) => (
          <li className="book-item" key={book._id}>
            {book.image && (
              <img
                src={book.image}
                className="book-image"
                alt={book.title}
                width="100"
              />
            )}
            <strong>{book.title}</strong> {book.author} ({book.year})
            <div className="actions">
              <button className="btn-edit" onClick={() => handleEdit(book)}>
                Modifier
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(book._id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
