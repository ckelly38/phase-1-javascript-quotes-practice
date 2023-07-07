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
    //<p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //Integer posuere erat a ante.</p>
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

function addEditListenerToButton(button)
{
    button.addEventListener("click", function(event){
        console.log("edit button clicked!");
        console.log("this.id = " + this.id);
        let myidnumstr = this.id.substring(0, this.id.indexOf("editbtn"));
        let myeditfrmondom = document.getElementById("myeditfrm");
        let mytxts = myeditfrmondom.getElementsByTagName("textarea");
        let myli = document.getElementById(myidnumstr);
        let myqtelem = myli.getElementsByTagName("p")[0];
        let myatrelem = myli.getElementsByTagName("footer")[0];
        mytxts[0].value = "" + myqtelem.textContent;
        mytxts[1].value = "" + myatrelem.textContent;
        let mysbmtbtn = myeditfrmondom.getElementsByTagName("button")[0];
        mysbmtbtn.id = myidnumstr + "edtfrmbtn";
        myeditfrmondom.style.display = "block";
        
        mysbmtbtn.addEventListener("click", function(oevent){
            console.log("done button clicked!");
            console.log("this.id = " + this.id);
            console.log("quote = mytxts[0].value = " + mytxts[0].value);
            console.log("author = mytxts[1].value = " + mytxts[1].value);
            let myoidnumstr = this.id.substring(0, this.id.indexOf("edtfrmbtn"));
            console.log("myoidnumstr = " + myoidnumstr);
            //for each quote:
            //author, id, likes array, quote
            //the likes array has:
            //createdAt, id, quoteId
            //let mylikesarr = new Array();
            //get the original likes array for the quote somehow
            //let qtifnd = false;
            //for (let k = 0; k < myquotes.length; k++)
            //{
            //    let tempidstr = "" + myquotes[k].id;
            //    console.log("tempidstr = " + tempidstr);
            //    console.log("myoidnumstr = " + myoidnumstr);
            //    if (tempidstr === myoidnumstr)
            //    {
            //        console.log("found the quote object at k = " + k + "!");
            //        qtifnd = true;
            //        let mytemplikesarr = myquotes[k].likes;
            //        console.log("myquotes[" + k + "].likes = " + mytemplikesarr);
            //        for (let c = 0; c < mytemplikesarr.length; c++)
            //        {
            //            let mylikeobj = {
            //                createdAt: mytemplikesarr[c].createdAt,
            //                id: mytemplikesarr[c].id,
            //                quoteId: mytemplikesarr[c].quoteId
            //            };
            //            mylikesarr.push(mylikeobj);
            //        }//end of c for loop
            //        break;
            //    }
            //    //else;//do nothing
            //}//end of k for loop
            //console.log("qtifnd = " + qtifnd);
            //if (qtifnd);
            //else throw "the quote id must be found, but it was not!";
            let mynwqtobj = {
                author: mytxts[1].value,
                id: Number(myoidnumstr),
                quote: mytxts[0].value
            };//likes: mylikesarr,

            let myconfigobj = {
                method: "PATCH",
                headers: {
                    "Content-Type" :  "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(mynwqtobj)
            };
            fetch("http://localhost:3000/quotes/" + myoidnumstr, myconfigobj).
            then((oresponse) => oresponse.json()).
            then(function(oresponse){
                console.log("oresponse = " + oresponse);
                console.log("myoidnumstr = " + myoidnumstr);
                //modify the DOM
                let omyli = document.getElementById(myoidnumstr);
                let omyqtelem = omyli.getElementsByTagName("p")[0];
                let omyatrelem = omyli.getElementsByTagName("footer")[0];
                omyqtelem.textContent = "" + oresponse.quote;
                omyatrelem.textContent = "" + oresponse.author;
                
                //eventually we will want to hide the edit form and clear out the values
                let omyeditfrmondom = document.getElementById("myeditfrm");
                let omytxts = omyeditfrmondom.getElementsByTagName("textarea");
                omytxts[0].value = "";
                omytxts[1].value = "";
                omyeditfrmondom.style.display = "none";
                console.log("DONE SAVING THE DATA TO THE DOM!");
                //debugger;
            }).catch(function(err){
                console.error("failed to edit the quote!");
                console.error(err);
            });
            //debugger;
        }.bind(mysbmtbtn));
    }.bind(button));
}

function addDeleteListenerToButton(button)
{
    button.addEventListener("click", function(event){
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
            //debugger;
        }).catch(function(err){
            console.error("failed to delete the quote!");
            console.error(err);
        });
        //debugger;
    }.bind(button));
}

function addLikeListenerToButton(button)
{
    button.addEventListener("click", function(event){
        console.log("like button clicked!");
        console.log("this.id = " + this.id);
        
        let myidnumstr = this.id.substring(0, this.id.indexOf("likebtn"));
        console.log("myidnumstr = " + myidnumstr);
        if (myidnumstr.length < 1) throw "failed to get the id from the id string!";
        //else;//do nothing

        //the createdAt: new Date().getTime();
        //id, quoteId
        //the quoteId will be the id of the quote liked as a string
        //the id will be the id of the new like

        let mylikeobj = {
            createdAt: new Date().getTime(),
            quoteId: Number(myidnumstr)
        };
        let myconfigobj = {
            method: "POST",
            headers: {
                "Content-Type" :  "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(mylikeobj)
        };
        fetch("http://localhost:3000/likes/", myconfigobj).
        then((oresponse) => oresponse.json()).
        then(function(oresponse){
            console.log("oresponse = " + oresponse);
            //"http://localhost:3000/quotes?_embed=likes"
            fetch("http://localhost:3000/quotes/" + myidnumstr + "?_embed=likes").
            then((ooresponse) => ooresponse.json()).
            then(function(ooresponse){
                console.log("ooresponse = " + ooresponse);
                console.log("ooresponse.likes.length = " + ooresponse.likes.length);
                let myqtcard = document.getElementById(myidnumstr);
                let mynumlikes = myqtcard.getElementsByTagName("span")[0];
                mynumlikes.textContent = "" + ooresponse.likes.length;
                //length of the likes array
                console.log("successfully added a new like to the quote!");
                //debugger;
            }).catch(function(err){
                console.error("failed to add the new like to the quote!");
                console.error(err);
            });
            //debugger;
        }).catch(function(err){
            console.error("failed to add the new like to the quote!");
            console.error(err);
        });
        //debugger;
    }.bind(button));
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
        //debugger;

        //now need to set up the buttons here
        //set up the edit form here
        let myeditfrm = document.createElement("div");
        myeditfrm.id = "myeditfrm";
        let myqttxt = document.createElement("textarea");
        let mynl = document.createElement("br");
        let myonl = document.createElement("br");
        let myatrnm = document.createElement("textarea");
        let mydonebtn = document.createElement("button");
        myqttxt.rows = 4;
        myqttxt.cols = 150;
        myqttxt.placeholder = "quote";
        myqttxt.name = "equote";
        myatrnm.cols = 50;
        myatrnm.placeholder = "author's name";
        myatrnm.name = "aname";
        mydonebtn.textContent = "Done";
        myeditfrm.appendChild(myqttxt);
        myeditfrm.appendChild(mynl);
        myeditfrm.appendChild(myatrnm);
        myeditfrm.appendChild(myonl);
        myeditfrm.appendChild(mydonebtn);
        myeditfrm.style.display = "none";
        let firstdiv = document.querySelector("div");
        document.getElementsByTagName("body")[0].insertBefore(myeditfrm, firstdiv);

        //set up the edit buttons here
        for (let n = 0; n < myquotes.length; n++)
        {
            let myeditbtn = document.getElementById(myquotes[n].id + "editbtn");
            addEditListenerToButton(myeditbtn);
        }//end of n for loop
        console.log("the edit buttons are all hooked up!");

        for (let n = 0; n < myquotes.length; n++)
        {
            let mydelbtn = document.getElementById(myquotes[n].id + "delbtn");
            addDeleteListenerToButton(mydelbtn);
        }//end of n for loop
        console.log("the delete buttons are all hooked up!");

        for (let n = 0; n < myquotes.length; n++)
        {
            let mylikebtn = document.getElementById(myquotes[n].id + "likebtn");
            addLikeListenerToButton(mylikebtn);
        }//end of n for loop
        console.log("the like buttons are all hooked up!");

        //set up the add a new quote button
        let myform = document.getElementById("new-quote-form");
        myform.addEventListener("submit", function(event){
            event.preventDefault();
            //now get the data from the form...
            console.log("event.target = " + event.target);
            
            let myqt = event.target[0].value;
            let myatr = event.target[1].value;
            console.log("myqt = event.target[0].value = " + myqt);
            console.log("myatr = event.target[1].value = " + myatr);

            //create the new quote object and load the data in
            //get the id from the server
            //the likes will be an empty array
            //then we will add the response to the dom
            //addQuoteToDOM(qtobj)
            
            //for each quote:
            //author, id, likes array, quote
            //the likes array has:
            //createdAt, id, quoteId
            //let mylikesarr = new Array();
            //get the original likes array for the quote somehow
            let mynwqtobj = {
                author: myatr,
                quote: myqt
            };

            let myconfigobj = {
                method: "POST",
                headers: {
                    "Content-Type" :  "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(mynwqtobj)
            };
            fetch("http://localhost:3000/quotes/", myconfigobj).
            then((oresponse) => oresponse.json()).
            then(function(oresponse){
                console.log("oresponse = " + oresponse);
                console.log("oresponse.id = " + oresponse.id);
                
                let mynwidstr = "" + oresponse.id;
                if (mynwidstr.length < 1) throw "invalid id retrieved from the response!";
                //else;//do nothing
                
                let mynwqtobjtodom = {
                    author: oresponse.author,
                    id: oresponse.id,
                    likes: [],
                    quote: oresponse.quote
                };
                
                //modify the DOM
                let myqtlist = document.getElementById("quote-list");
                myqtlist.appendChild(addQuoteToDOM(mynwqtobjtodom));
                
                //hook up the like edit delete buttons here
                let mynweditbtn = document.getElementById(oresponse.id + "editbtn");
                let mynwdelbtn = document.getElementById(oresponse.id + "delbtn");
                let mynwlikebtn = document.getElementById(oresponse.id + "likebtn");
                addDeleteListenerToButton(mynwdelbtn);
                addEditListenerToButton(mynweditbtn);
                addLikeListenerToButton(mynwlikebtn);
                console.log("successfully added the new quote to the list!");
                //debugger;
            }).catch(function(err){
                console.error("failed to add the quote to the list!");
                console.error(err);
            });
            //debugger;
        });
        console.log("hooked up the add new quote form buttons!");

        //set up the sort by author button
        let mysrtatrbtn = document.createElement("button");
        mysrtatrbtn.id = "sortatrnmbtn";
        mysrtatrbtn.textContent = "Sort By Author: OFF";
        document.getElementsByTagName("body")[0].insertBefore(mysrtatrbtn, firstdiv);
        let mysrtathrbtndom = document.getElementById("sortatrnmbtn");
        mysrtathrbtndom.addEventListener("click", function(event){
            console.log("clicked the sort by author name button!");
            console.error("NOT DONE YET 7-6-2023 5:30 PM!");
            debugger;
        }.bind(mysrtathrbtndom));
        console.log("successfully linked up the sort by author name button!");
    })
    .catch(function(err){
        console.error("there was an error getting the quotes!");
        console.error(err);
    });
}
loadQuotesOnDOM();
