const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


const app = express()
const port = 3000


app.set('view engine' , 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use("/public", express.static("public"))

mongoose.connect('mongodb://localhost:27017/todolistDB')

const itemsSchema = new mongoose.Schema({
  name: String
})


const Item = mongoose.model("items", itemsSchema)

const item1 = new Item({
  name: "Welcome to the TodoList!"
})

const item2 = new Item({
  name: "Hit the + button to add a new item."
})

const item3 = new Item({
  name: "<--Hit this to delete an item."
})


const defaultItems = [item1, item2, item3]




app.get("/" , (req, res)=>{


  Item.find({}, (err, foundItems) => {
    //Checks if items array is empty
    if(foundItems.length === 0){
       Item.insertMany( defaultItems, (err) => {
        if(err){
          console.log(err);
        }else{
          console.log("Items were added to the Database");
        }
       });
        res.redirect("/")
    }else{
      res.render("list" , {listTitle: "Today" , newListItems: foundItems})
    }
  });
});




app.post("/" , (req, res)=>{
   
    const itemName = req.body.newItem

    const item = new Item({
      name: itemName
    });
    
    item.save()
    res.redirect("/")
});


app.post("/delete", (req,res) => {
  const checkedItemId = req.body.checkbox

  Item.findByIdAndRemove(checkedItemId, (err) => {
    if (err) {
      console.log(err);
    }else{
      console.log("Item has been removed.");
      res.redirect("/")
    }
  })


})




app.get("/work" , (req, res) =>{
    res.render("list" , {listTitle: "Work List", newListItems: workItems})
})
app.post("/work" , (req, res) => {
    
    let item = req.body.newItem
    workItems.push(item)
    res.redirect("/work")
})
app.get('/about', (req, res) => {
  res.render("about")
})



app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`)
})