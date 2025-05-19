const express = require('express');
const router = express.Router();
const verifyToken  = require('../middlewares/verifyToken');
const firmcontroller = require('../controllers/firmcontroller');

router.post('/add-firm',verifyToken, firmcontroller.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(Path2D.join(__dirname, '..', '/upload', imageName));
});

module.exports = router;