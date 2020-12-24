const express = require("express");
const connectDB = require("./project/connectDB");
const Person = require("./models/Person");

// init express
const app = express();

//connect database
connectDB();

//parsing the body
app.use(express.json());

//create and save

var createAndSavePerson = function (done) {
  let meriem = new Person({
    name: "meriem3",
    age: 20,
    favoriteFoods: ["Poisson"],
  });

  meriem.save((err, data) => {
    if (err) {
      return console.log(err);
    } else {
      done(null, data);
    }
  });
};

// Create Many Records with model.create()

var arrayOfPeople = [
  {
    name: "hamza",
    age: 30,
    favoriteFoods: ["Poisson", "Viande"],
    created_at: Date.now(),
  },
  {
    name: "meriem",
    age: 30,
    favoriteFoods: ["Poisson", "Viande"],
    created_at: Date.now(),
  },
];

var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, (err, createdPeople) => {
    if (err) {
      console.log(error);
    } else {
      done(null, createdPeople);
    }
  });
};

//Use model.find() to Search Your Database

Person.find({ name: "Aymen" }, (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(data);
  }
});

// //Use model.findOne()

Person.find({ name: "meriem" }, (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(data);
  }
});
// Use model.findById()

Person.findById("5fe48b6bee0f4323a0971d21", (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(data);
  }
});

//Perform Classic Updates Running Find, Edit, Save

Person.findById("5fe48b6bee0f4323a0971d21", (err, result) => {
  if (err) {
    console.log(error);
  } else {
    result.favoriteFoods.push("Spaghetti");
    console.log(result);
  }
});

//Perform New Updates on a Document Using model.findOneAndUpdate()

Person.findOneAndUpdate(
  { name: "meriem" },
  { age: 20 },
  { new: true },
  (err, data) => {
    if (err) {
      console.log(error);
    } else {
      console.log(data);
    }
  }
);

//Delete One Document Using model.findByIdAndRemove

Person.findByIdAndRemove("5fe3be9838bb150984e30d62", (err, deleted) => {
  if (!err) {
    console.log(deleted);
  }
});

//Delete Many Documents with model.remove()

Person.remove({ name: "Aymen" }, (err, data) => {
  if (!err) {
    console.log(data);
  }
});

//Chain Search Query Helpers to Narrow Search Results

Person.find({ favoriteFoods: { $all: ["burrito"] } })
  .sort({ age: "asc" })
  .limit(2)
  .select("name favoriteFoods")
  .exec((err, data) => {
    if (!err) {
      console.log(data);
    }
  });

// //Add new person
app.post("/", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson
    .save()
    .then((Person) => res.status(201).send(Person))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
