// dependencies
const express = require("express");
const path = require("path");

// tells node that we are creating express server
const app = express();

// sets initial port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
const tables = [
  {
    customerName: "Brian",
    phoneNumber: "555-323-5454",
    customerEmail: "basfs@aol.com",
    customerId: "Bdub",
  },
  {
    customerName: "Stephanie",
    phoneNumber: "555-893-5454",
    customerEmail: "steph@aol.com",
    customerId: "Stephi",
  },
];

const waitList = [
  {
    customerName: "Sarah",
    phoneNumber: "555-555-5555",
    customerEmail: "sarah@aol.com",
    customerId: "Sarzah",
  }
];

// routes
// basic route that gets user to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/home.html'));
});

// basic route that gets user to tables page
app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

// basic route that gets user to reservation page
app.get("/reservation", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/reservation.html"));
});

// post new reservation
app.post('/api/tables', (req, res) => {
    const newTable = req.body;
    console.log(newTable);
    if (tables.length > 4) {
        waitList.push(newTable)
        res.json(false);
    } else {
        tables.push(newTable);
        res.json(true);
    }
});

// clear out the data

app.post('/api/clear', (req, res) => {
    tables.length = 0;
    waitList.length = 0;

    res.json({ ok: true });
});

// get all tables api
app.get('/api/tables', (req, res) => res.json(tables));

// get waitlist tables api
app.get('/api/waitlist', (req, res) => res.json(waitList));

app.get("/api/waitlist", (req, res) => res.json(waitList));

// start the server
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
