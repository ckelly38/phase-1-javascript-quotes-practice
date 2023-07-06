function removeAllKids(element)
{
    if (element == undefined || element == null) return;
    else
    {
        let mykids = element.children;
        for (let n = 0; n < element.children.length; n++)
        {
            removeAllKids(element.children[n]);
        }
        element.remove();
    }
}

function addQuoteToDOM(qtobj)
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
    myli.id = qtobj.id;
    let mybqt = document.createElement("blockquote");
    mybqt.className = "blockquote";
    let myqt = document.createElement("p");
    myqt.class = "mb-0";
    myqt.textContent = "" + qtobj.quote;
    let myatr = document.createElement("footer");
    myatr.className = "blockquote-footer";
    myatr.textContent = "" + qtobj.author;
    let mynl = document.createElement("br");
    let mylikebtn = document.createElement("button");
    mylikebtn.className = "btn-success";
    mylikebtn.textContent = "Likes: ";
    mylikebtn.id = qtobj.id + "likebtn";
    let mynumlikes = document.createElement("span");
    mynumlikes.textContent = "" + qtobj.likes.length;//length of the likes array
    let myeditbtn = document.createElement("button");
    myeditbtn.textContent = "Edit";
    myeditbtn.id = qtobj.id + "editbtn";
    let mydelbtn = document.createElement("button");
    mydelbtn.textContent = "Delete";
    mydelbtn.id = qtobj.id + "delbtn";
    mylikebtn.appendChild(mynumlikes);
    mybqt.appendChild(myqt);
    mybqt.appendChild(myatr);
    mybqt.appendChild(mynl);
    mybqt.appendChild(mylikebtn);
    mybqt.appendChild(myeditbtn);
    mybqt.appendChild(mydelbtn);
    myli.appendChild(mybqt);
    return myli;
}

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
            myqtlist.appendChild(addQuoteToDOM(myquotes[n]));
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
                console.error("NOT DONE YET 7-6-2023 5:30 PM!");
                debugger;
            }.bind(myeditbtn));
        }//end of n for loop
        console.log("the edit buttons are all hooked up!");

        for (let n = 0; n < myquotes.length; n++)
        {
            let mydelbtn = document.getElementById(myquotes[n].id + "delbtn");
            mydelbtn.addEventListener("click", function(event){
                console.log("delete button clicked!");
                console.log("this.id = " + this.id);
                let myidnumstr = this.id.substring(0, this.id.indexOf("delbtn"));
                console.log("myidnumstr = " + myidnumstr);
                if (myidnumstr.length < 1) throw "failed to get the id from the id string!";
                //else;//do nothing
                let myconfigobj = {
                    method: "DELETE",
                    headers: {
                        "Content-Type" :  "application/json",
                        "Accept" : "application/json"
                    }
                };
                fetch("http://localhost:3000/quotes/" + myidnumstr, myconfigobj).
                then((oresponse) => oresponse.json()).
                then(function(oresponse){
                    console.log("oresponse = " + oresponse);
                    //we also need to remove it from the likes list
                    //it seems that the delete method takes care of that
                    //now remove the quote card and all of its kids from the dom
                    let myqtcard = document.getElementById(myidnumstr);
                    removeAllKids(myqtcard);
                    console.log("done removing all of the elements related to that quote from " +
                        "the DOM");
                    debugger;
                }).catch(function(err){
                    console.error("failed to delete the quote!");
                    console.error(err);
                });
                debugger;
            }.bind(mydelbtn));
        }//end of n for loop
        console.log("the delete buttons are all hooked up!");

        for (let n = 0; n < myquotes.length; n++)
        {
            let mylikebtn = document.getElementById(myquotes[n].id + "likebtn");
            mylikebtn.addEventListener("click", function(event){
                console.log("like button clicked!");
                console.log("this.id = " + this.id);
                console.error("NOT DONE YET 7-6-2023 5:30 PM!");
                //the createdAt: new Date().getTime();
                //id, quoteId
                //the quoteId will be the id of the quote liked as a string
                //the id will be the id of the new like
                debugger;
            }.bind(mylikebtn));
        }//end of n for loop
        console.log("the like buttons are all hooked up!");

        //set up the add a new quote button
        let myform = document.getElementById("new-quote-form");
        myform.addEventListener("submit", function(event){
            event.preventDefault();
            //now get the data from the form...
            console.log("event.target = " + event.target);
            console.error("NOT DONE YET 7-6-2023 5:30 PM!");
            //create the new quote object and load the data in
            //get the id from the server
            //the likes will be an empty array
            //then we will add the response to the dom
            //addQuoteToDOM(qtobj)
            debugger;
        });
        console.log("hooked up the add new quote form buttons!");

        //set up the sort by author button
        console.error("NOT DONE YET 7-6-2023 5:30 PM!");
    })
    .catch(function(err){
        console.error("there was an error getting the quotes!");
        console.error(err);
    });
}
loadQuotesOnDOM();
