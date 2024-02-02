const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Backend API Facilita Jurídico',
    version: '1.0.0',
  });
});

module.exports = router;