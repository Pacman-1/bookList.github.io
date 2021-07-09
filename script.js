// Book Class: Represents A Book
 class Book {
     constructor(title,author,isbn) {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
     }
 }

//UI Class: Handle UI Tasks
class UI{
    static displayBooks() {
        
    const books = Store.getBooks();

    books.forEach((book)=> UI.addBookToList(book))
    }

    
     static addBookToList(book) {
        const list=document.querySelector("#book-list")

        const row = document.createElement("tr")

      
        row.innerHTML=`
        <Td>${book.title} </td>
        <Td>${book.author} </td>
        <Td>${book.isbn} </td>
        <Td><a href="#" class ="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row)
     }

    static deleteBook(del) {
        if (del.classList.contains("delete")) {
            del.parentElement.parentElement.remove()
        }
    }

    static showAlert (message, ClassName) {
        const div = document.createElement("div")
        div.className=`alert ${ClassName}`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div,form)
    
        //Disappear in 2 seconds
        setTimeout(()=> document.querySelector(".alert").remove(),2000)
    }
     static clearFields() {
         document.querySelector("#title").value="";
         document.querySelector("#author").value="";
         document.querySelector("#isbn").value="";
     }
}

//Store Class: Handles Storage
class Store {
   static getBooks() {
    let books;
    if (localStorage.getItem("books")===null) {
        books=[];
    }
    else {
        books=JSON.parse(localStorage.getItem("books"))
    }
    return books
    }

   static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books",JSON.stringify(books))
    }

   static removeBook(isbn) {
    const books=Store.getBooks();
    books.forEach((book,index)=>{
        if (books.isbn===isbn) {
            books.splice(index,1);
        }
    })
    localStorage.setItem("books",JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded",UI.displayBooks)


// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit",(e)=>{
    // Prevent submit
    e.preventDefault();

    // Grab form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    
    //Confirmation Test

    if (title==="" || author==="" || isbn==="") {
        UI.showAlert("FIll all fields","alert-danger")
    }else {

    //instantiate book

    const book = new Book(title,author,isbn);

    // Add Book To UI
    UI.addBookToList(book)

    // Add book to store
    Store.addBook(book);

    // Add Book Worked Message
    UI.showAlert("Book Added","alert-success");

    // Clear Fields 
    UI.clearFields();
}
})



// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click",(e) =>{

    // Remove book from store
Store.removeBook(e.target.parentElement.previousElementSibling.textConcent);

    UI.deleteBook(e.target)

     // Add Book Worked Message
     UI.showAlert("Book Removed","alert-success");

})
