const express = require("express");
const multer = require("multer");
const { storage } = require("../config/firebase");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload Image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = storage.bucket().file(`images/${Date.now()}_${req.file.originalname}`);
    await file.save(req.file.buffer, { contentType: req.file.mimetype });

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(file.name)}?alt=media`;

    res.json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
