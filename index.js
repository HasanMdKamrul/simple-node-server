// ** import extress + cors
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 15000;
// ** mongo db
const { MongoClient, ServerApiVersion } = require("mongodb");

// ** use cors or give excess the data to others

app.use(cors());

// ** making of fake data

const users = [
  {
    id: 1,
    name: "Hasan",
    email: "hasan@gmail.com",
  },
  {
    id: 2,
    name: "Tanmoy",
    email: "tanmoy@gmail.com",
  },
  {
    id: 3,
    name: "Kamrul",
    email: "kamrul@gmail.com",
  },
];

// ** Initial server or api endpoint

app.get("/", (req, res) => {
  res.send("Simple node server making done");
});

// ** get posted data from client
app.use(express.json());

// *** Database integration

//  username : HasanMdKamrul
//  password : y6D6kbMfERfxNKwt

const uri =
  "mongodb+srv://HasanMdKamrul:y6D6kbMfERfxNKwt@cluster0.7ikallh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("users");

    // ** app.get

    app.get("/users", async (req, res) => {
      const cursor = await userCollection.find({});

      const users = await cursor.toArray();

      res.send(users);
    });

    // ** app.post
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);

      user._id = result.insertedId;
      console.log(result);

      res.send(user);
    });

    // ** mongo db te eikhane theke maal pathabo
  } finally {
  }
}

run().catch((err) => console.log(err));

// ** app listen
app.listen(port, () => console.log(`Server is running at port : ${port}`));
