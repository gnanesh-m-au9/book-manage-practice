/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export const BookItem = ({ book, deleteBook, updateBook }) => {
    return(
      <div style={{width:"400px", height:"200px", padding:"10px", margin:"10px", textAlign:"center",overflow:"hidden", background:"lightblue"}}>
        <p>{book.title}</p>
        <p>{book.content}</p>
        <p>{book.published}</p>
        <p>{book.author}</p>
        <button onClick={()=>{deleteBook(book.id)}}>Delete</button>&nbsp;
        <button onClick={()=>{updateBook(book)}}>Update</button>
      </div>
    )
  
  }