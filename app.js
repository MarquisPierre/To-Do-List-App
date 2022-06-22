const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")

const app = express()
const port = 3000
let items = ["study", "cook","code"]
let workItems = []

app.set('view engine' , 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use("/public", express.static("public"))



app.get("/" , (req, res)=>{

    let day = date.getDay()

     res.render("list" , {listTitle: day , newListItems: items })


})
app.post("/" , (req, res)=>{
    console.log(req.body);
    let item = req.body.newItem

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    }
      else {
        items.push(item)
        res.redirect("/")
        
      }

    
     
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