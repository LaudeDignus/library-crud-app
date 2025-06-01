import { useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css"

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    year: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce livre ?")) return;
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>{editId ? "Modifier un livre" : "Ajouter un livre"}</h2>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
      </form>

      <ul className="book-list">
        {books.map((book) => (
          <li className="book-item" key={book._id}>
            <strong>{book.title}</strong> – {book.author} ({book.year})
            {book.image && <img src={book.image} alt={book.title} />}
            <div className="actions">
              <button onClick={() => handleEdit(book)}>Modifier</button>
              <button onClick={() => handleDelete(book._id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
