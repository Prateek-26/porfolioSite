const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{
    res.send("From Router");
});

router.post('/register', (req, res)=>{
    console.log(req.body);
    // res.send("Aa gaya");
    res.json({message: req.body});
})

module.exports = router;