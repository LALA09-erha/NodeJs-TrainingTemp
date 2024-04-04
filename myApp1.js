require('dotenv').config();
const { urlencoded } = require('body-parser');
let mongoose = require('mongoose')

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});



let Person;

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  var person = new Person({
    name:"dada",
    age:12,
    favoriteFoods:['dafa']
  })

  person.save(function(err,data){
    if(err) console.error(err);
    done(null, data);

  })
};

const createManyPeople = async (arrayOfPeople, done) => {
  var te = await Person.create(arrayOfPeople)
  done(null, te);

};

const findPeopleByName = async (personName, done) => {
  var na = {
    name:personName
  }
  var te = await Person.find(na)
  done(null, te);

};

const findOneByFood =async(food, done) => {
  var na = {
    favoriteFoods:food
  }
  var te = await Person.findOne(na)
  done(null, te);
};

const findPersonById = async(personId, done) => {
  var na = {
    _id:personId
  }
  var te = await Person.findById(na)
  done(null, te);};

const findEditThenSave = async(personId, done) => {
  const foodToAdd = "hamburger";
  var na = {
    _id:personId
  }
  var te = await Person.findById(na)
  te.favoriteFoods.push(foodToAdd)
  te.save(function(err,data){
    if(err) console.error(err);
    done(null, data);

  })
};

const findAndUpdate =  (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) {
       console.log(err);
    }else{
      done(null, updatedDoc);
      console.log(updatedDoc)
    }
  })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
