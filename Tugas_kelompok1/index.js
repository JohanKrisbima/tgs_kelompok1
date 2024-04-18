import express from "express";
import session from "express-session";
import flash from "connect-flash";
import router from "./routes/index.js";
import methodOverride from "method-override";

const app = express();
const port = 3000;

// Middleware

// Serve static files
app.use(express.static('public'));

// Body parser middleware (Express 4.16+ includes this functionality)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Flash middleware
app.use(flash());

// Method override middleware
app.use(methodOverride("_method"));

// Set view engine
app.set("view engine", "ejs");

// Routes
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
