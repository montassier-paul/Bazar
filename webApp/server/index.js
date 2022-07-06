const express = require("express"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require('morgan'); 
const cors = require('cors');
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const tagsRoute = require("./routes/tags");
const postsRoute = require("./routes/posts");
const messagesRoute = require("./routes/messages");


port = process.env.PORT || 8800

const app = express(); 


dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );


app.use(express.json());
app.use(cors({ origin: true }))
app.use(helmet());
app.use(morgan("common"));
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/tags", tagsRoute);
app.use("/api/posts", postsRoute);
app.use("/api/messages", messagesRoute);

app.listen(port, ()=> {
    console.log("Backend server is running")
})