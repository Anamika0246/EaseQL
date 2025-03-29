const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const outputPath = `output/${req.file.originalname}.csv`;

  exec(`python utils/fileProcessor.py ${filePath} ${outputPath}`, (error) => {
    if (error) return res.status(500).json({ error: "File conversion failed" });
    res.json({ message: "File converted", filePath: outputPath });
  });
});

module.exports = router;
