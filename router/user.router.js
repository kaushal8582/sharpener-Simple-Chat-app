const express = require("express");
const file = require("fs");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send(`
        <form onsubmit="saveToLocalStorage()" action="/product" method="POST">
            <input id="username" type="text" name="title" placeholder="Enter username">
            <button type="submit">Add</button>
        </form>
        <script>
            function saveToLocalStorage() {
                const username = document.getElementById("username").value;
                localStorage.setItem("username", username);
            }
        </script>
    `);
});

router.post("/product", (req, res) => {
  // Handle form submission on the server
  // res.send("Form submitted! Check your browser's localStorage for saved data.");
  res.redirect("/");
});

router.get("/", (req, res) => {

    let data = file.readFileSync("data.txt").toString()
    

  res.send(`
        <h1>${data}</h1>
        <form action="/" method="post" onsubmit=" document.querySelector('#username').value = localStorage.getItem('username')" >
        <input type="text" name="message" placeholder="enter message" >
        <input  type="text" name="username" id="username">
        <button type="submit">add</button>
    </form>`);
});

router.post("/", (req, res) => {
  console.log(req.body.username, req.body.message);
  try {
    // Append data to 'data.txt' file
    file.appendFile(
      "data.txt",
      `${req.body.username}: ${req.body.message}\n`, // Properly concatenate the data
      (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("Data appended successfully!");
        }
      }
    );
  } catch (error) {
    console.error("Error in try-catch block:", error);
  }
  res.redirect("/");
});

module.exports = router;
