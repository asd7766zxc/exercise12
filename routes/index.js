var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var mongodb = "mongodb+srv://admin:dbadmin@cluster0.zcavz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongodb);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

var Schema = mongoose.Schema;
var studentSchema = new Schema({
  name: String,
  age: Number,
  grade: String,
});
var studentModel = mongoose.model("studentModel", studentSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'students' });
});

router.get('/students', async function(req, res, next) {
  let students = await studentModel.find({});
  res.json((students));
});

router.post('/students',async function(req, res, next) {
  let student = await studentModel.create(req.body);
  res.json((student));
});

router.delete('/students/:id',async function(req, res, next) {
  if(!mongoose.isObjectIdOrHexString(req.params.id)){
    res.end("id format error");  
    return;
  }
  const result = await studentModel.findByIdAndDelete(req.params.id);
  if(result){
    res.end("deleted");
  }else{
    res.end("not found");
  }
})

router.put('/students/:id',async function(req, res, next) {
  if(!mongoose.isObjectIdOrHexString(req.params.id)){
    res.end("id format error");  
    return;
  }
  const result = await studentModel.findOneAndUpdate({_id:req.params.id},req.body);
  if(result){
    res.end("updated");
  }else{
    res.end("failed");
  }
})


module.exports = router;
