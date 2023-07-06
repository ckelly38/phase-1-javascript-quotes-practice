function loadQuotesOnDOM()
{
    fetch("http://localhost:3000/quotes?_embed=likes").then((response) => response.json()).
    then(function(response){
        console.log("response = " + response);
        //debugger;
        let myquotes = response;
        let myqtlist = document.getElementById("quote-list");
        for (let n = 0; n < myquotes.length; n++)
        {
            //for each quote:
            //author, id, likes array, quote
            //the likes array has:
            //createdAt, id, quoteId
            //<li class='quote-card'>
            //<blockquote class="blockquote">
            //<p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            //<footer class="blockquote-footer">Someone famous</footer>
            //<br>
            //<button class='btn-success'>Likes: <span>0</span></button>
            //<button class='btn-danger'>Delete</button>
            //</blockquote>
            //</li>
            let myli = document.createElement("li");
            myli.className = "quote-card";
            myli.id = myquotes[n].id;
            let mybqt = document.createElement("blockquote");
            mybqt.className = "blockquote";
            let myqt = document.createElement("p");
            myqt.class = "mb-0";
            myqt.textContent = "" + myquotes[n].quote;
            let myatr = document.createElement("footer");
            myatr.className = "blockquote-footer";
            myatr.textContent = "" + myquotes[n].author;
            let mynl = document.createElement("br");
            let mylikebtn = document.createElement("button");
            mylikebtn.className = "btn-success";
            mylikebtn.textContent = "Likes: ";
            mylikebtn.id = myquotes[n].id + "likebtn";
            let mynumlikes = document.createElement("span");
            mynumlikes.textContent = "" + myquotes[n].likes.length;//length of the likes array
            let myeditbtn = document.createElement("button");
            myeditbtn.textContent = "Edit";
            myeditbtn.id = myquotes[n].id + "editbtn";
            let mydelbtn = document.createElement("button");
            mydelbtn.textContent = "Delete";
            mydelbtn.id = myquotes[n].id + "delbtn";
            mylikebtn.appendChild(mynumlikes);
            mybqt.appendChild(myqt);
            mybqt.appendChild(myatr);
            mybqt.appendChild(mynl);
            mybqt.appendChild(mylikebtn);
            mybqt.appendChild(myeditbtn);
            mybqt.appendChild(mydelbtn);
            myli.appendChild(mybqt);
            myqtlist.appendChild(myli);
        }//end of n for loop
        console.log("successfully added the quotes!");
        debugger;

        //now need to set up the buttons here
        for (let n = 0; n < myquotes.length; n++)
        {
            let myeditbtn = document.getElementById(myquotes[n].id + "editbtn");
            myeditbtn.addEventListener("click", function(event){
                console.log("edit button clicked!");
                console.log("this.id = " + this.id);
                debugger;
            }.bind(myeditbtn));
        }//end of n for loop

        for (let n = 0; n < myquotes.length; n++)
        {
            let mydelbtn = document.getElementById(myquotes[n].id + "delbtn");
            mydelbtn.addEventListener("click", function(event){
                console.log("delete button clicked!");
                console.log("this.id = " + this.id);
                debugger;
            }.bind(mydelbtn));
        }//end of n for loop

        for (let n = 0; n < myquotes.length; n++)
        {
            let mylikebtn = document.getElementById(myquotes[n].id + "likebtn");
            mylikebtn.addEventListener("click", function(event){
                console.log("like button clicked!");
                console.log("this.id = " + this.id);
                debugger;
            }.bind(mylikebtn));
        }//end of n for loop
    })
    .catch(function(err){
        console.error("there was an error getting the quotes!");
        console.error(err);
    });
}
loadQuotesOnDOM();
