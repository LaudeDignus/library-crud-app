const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  const { title, author, year, image } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      year,
      image,
      userId: req.user.id,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création du livre",
      error: err.message,
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.id }); 
    res.json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.updateBook = async (req, res, next) => {
  const { id } = req.params;

  const updateFields = (({ title, author, year, image }) => ({
    title,
    author,
    year,
    image,
  }))(req.body);

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateFields,
      { new: true }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ message: "⛔ Livre non trouvé ou accès interdit" });
    }

    res.status(200).json({ message: "✅ Livre mis à jour", book: updatedBook });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Book.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deleted)
      return res
        .status(404)
        .json({ message: "Livre non trouvé ou non autorisé" });

    res.json({ message: "Livre supprimé avec succès" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression", error: err.message });
  }
};
