const express = require('express')
const MongoClient  = require('mongodb').MongoClient
const app = express()
const PORT = 3000


let db,
    connectionString = "mongodb+srv://kmurraylowe:kye18jay@cluster0.7050u.mongodb.net/toDoList?retryWrites=true&w=majority"
    dbName = "toDoList"

MongoClient.connect(connectionString, {useUnifiedTopology: true})
 .then(client=>{
     console.log(`Connected to ${dbName} Database`)
     db = client.db(dbName)
 })
 .catch(err => console.error(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req,res)=>{
    db.collection('toDoList').find().sort({likes: -1}).toArray()
    .then( data => {
        res.render('index.ejs', {list: data})
    })
    .catch(err => console.error(err)) 
})

app.post('/addToDo', (req,res)=>{
    db.collection('toDoList').insertOne({task: req.body.task, description: req.body.description, likes: 0})
    .then(result=>{
        console.log("Item added")
        res.redirect('/')
    })
    .catch(err => console.error(err)) 
})

app.put('/addLike', (req,res)=>{
    db.collection('toDoList').updateOne({task: req.body.taskS, description: req.body.descriptionS, likes: req.body.likesS },{
        $set: {
            likes: req.body.likesS + 1
        }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result=>{
        console.log("added a like")
        res.json('like added')
    })
    .catch(err => console.err(err))
})

app.put('/removeLike', (req,res)=>{
    db.collection('toDoList').updateOne({task: req.body.taskS, description: req.body.descriptionS, likes: req.body.likesS },{
        $set: {
            likes: req.body.likesS - 1
        }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result=>{
        console.log("removed a like")
        res.json('like removed')
    })
    .catch(err => console.err(err))
})

app.delete('/deleteTask', (req,res)=>{
    db.collection('toDoList').deleteOne({task: req.body.taskS, description: req.body.descriptionS })
    .then(result => {
        console.log('Task Deleted')
        res.json("Task deleted")
    })
    .catch(err=> console.error(err))
})



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})