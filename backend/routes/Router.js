const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));

//test
router.get("/", ( req, res )=>{
    res.send("test-api");
});

router.get("/api/test", (req, res) => {
    res.send("Test API funcionando");
  });
  

module.exports = router