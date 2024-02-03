import { useEffect, useState } from 'react'
import './App.css'
import { BookItem } from './BookItem'

function App() {
  const [newBookDetails, setNewBookDetails ] = useState({title:'', content:'', published:false, author:''})
  const [books, setBooks] = useState()
  const [selectedBook, setSelectedBook] = useState();

  useEffect(()=>{
    fetch('http://localhost:3000/books', {
      method:"GET",
    })
    .then((res)=> res.json())
    .then((data)=>{
      setBooks(data["books"])
    })
  }, [])

  const saveNewBook = async() => {
    if(newBookDetails.author != '' && newBookDetails.content !="" && newBookDetails.title !=""){
      await fetch("http://localhost:3000/newbooks", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          title:newBookDetails.title,
          content:newBookDetails.content,
          published:newBookDetails.published,
          author:newBookDetails.author,
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
        setBooks([...books, data])
        setNewBookDetails({title:'', content:'', published:false, author:''})
      })
    }
  }
  
  const deleteBook= async(id) => {
    await fetch(`http://localhost:3000/books/${id}`, {
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res)=>res.json())
      .then((data)=>{
        setBooks(books.filter((item => item.id != id)))
      })
  }

  const updateBook = async() => {
    await fetch(`http://localhost:3000/books/${selectedBook.id}`, {
      method:"PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        title:newBookDetails.title,
        content:newBookDetails.content,
        published:newBookDetails.published,
        author:newBookDetails.author,
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
      setBooks(books.map((item)=> item.id == selectedBook.id ? data : item))
      setSelectedBook(null)
      setNewBookDetails({title:'', content:'', published:false, author:''})
    })
  }

  const updateBookInfo= async(book) => {
    setSelectedBook(book)
    setNewBookDetails({
      title: book.title,
      content:book.content, 
      published:book.published, 
      author:book.author
    })
  }
  return(
    <>
    {books && books.map((item => (
      <div key={item.id}>
      <BookItem book={item} deleteBook={deleteBook} updateBook={updateBookInfo}/>
      </div>
    )))}
    <div>
      Title: <input type="text" name="title" value={newBookDetails.title} onChange={(e)=>setNewBookDetails({...newBookDetails, title:e.target.value})}  />
      Content: <input type="text" name="content" value={newBookDetails.content} onChange={(e)=>setNewBookDetails({...newBookDetails, content:e.target.value})} />
      Author: <input type="text" name="author" value={newBookDetails.author} onChange={(e)=>setNewBookDetails({...newBookDetails, author:e.target.value})} />
      <button onClick={selectedBook ? updateBook: saveNewBook}>{selectedBook ? "UpdateBook" : "Add New Book"}</button>
    </div>
    </>
  )
}


export default App
