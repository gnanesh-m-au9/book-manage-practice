const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors());
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

app.get("/healthcheck", (req, res)=>{
    res.send("health check OK")
})

app.get("/books", async (req, res)=>{
    const allBooks = await prisma.book.findMany()
    res.json({books: allBooks})
})

app.post('/newbooks', async(req, res)=>{
    const {title, content, published, author} = req.body;
    const newTodo = await prisma.book.create({
        data: {
            title: title,
            content: content,
            published: published,
            author: author,
        },
      })
    return res.send(newTodo)
})

app.delete('/books/:bookid', async(req, res)=>{
    const bookId = parseInt(req.params.bookid, 10)
    try{
        await prisma.book.delete({
            where:{
                id: bookId
            }
        })
        return res.send({success:true, msg:"new book deleted"})
    }catch(Err){
        console.log(Err)
    }
})

app.put('/books/:bookid', async(req, res)=>{
    const bookId = parseInt(req.params.bookid, 10);
    const {title, content, published, author} = req.body;
    try{
        const existingBook = await prisma.book.findUnique({
            where:{
                id: bookId
            },
        });
        if(!existingBook){
            return res.send({success:"false"})
        }
        const updatedBook = await prisma.book.update({
            where:{
                id: bookId,
            },
            data:{
                title: title,
                content: content, 
                published: published,
                author: author
            }
        })
    return res.send(updatedBook)
    }catch(Err){
        console.log(Err)
    }
})

app.listen(3000, ()=>{
    console.log("Server is running at 3000")
})