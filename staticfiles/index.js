document.addEventListener('DOMContentLoaded', function() {
    
    

    document.querySelectorAll('.addnotes').forEach((button) => {
        button.addEventListener('click',event => {
            button.parentElement.parentElement.style.display = 'none';
            // console.log(button.parentElement.parentElement.childNodes[7].innerHTML);
            let pretext = button.parentElement.parentElement.childNodes[7].innerHTML;
            if(pretext.slice(0, 3) == '<i>')
            {
                pretext = "";
            }
            const notes= document.createElement('div');
            notes.className = 'notes';
            notes.innerHTML = `<textarea>${pretext}</textarea><br><button class="savenote" value=${button.value}>Edit</button>`;
            button.parentElement.parentElement.parentElement.append(notes);
            

            document.querySelectorAll('.savenote').forEach((savebutton) => {
                savebutton.addEventListener('click',event => {
                console.log((savebutton.parentElement).childNodes);
                let text = (savebutton.parentElement).childNodes[0].value;
                console.log(text);
                let movieid = parseInt(button.value);
                fetch(`addnotes/${movieid}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        notes: text,
                    })
                })
                .then(() => {
                    location.reload();
                    savebutton.parentElement.style.display = 'none';
                    button.parentElement.parentElement.style.display = 'block';
                    
                })
                .catch(err => console.error(err));
                })
            })
        })
    })
    document.querySelectorAll('.removelist').forEach((button) => {
        button.addEventListener('click', event => {
            let movieid = parseInt(button.value);
            fetch(`removewatchlist/${movieid}`, {
                method: 'PUT',
            })
            .then(() => {
                button.parentElement.parentElement.parentElement.style.animationPlayState = 'running';
                button.parentElement.parentElement.parentElement.addEventListener('animationend', () => {
                    button.parentElement.parentElement.parentElement.remove();
                    })
                // button.parentElement.parentElement.parentElement.remove();
            })
        })
    })
    

    
    document.querySelectorAll('.addtowatched').forEach((button) => {
        button.addEventListener('click',event => {
            // console.log(button.parentElement.parentElement.innerHTML);
            // const html = button.parentElement.parentElement.innerHTML;
            // let idbegin = html.indexOf("<input type=\"hidden\" value=\"");
            // idbegin += 28;
            // let idend = html.indexOf('">\n'+
            // '              \n'+
            // '                <p class="info">');
            // const id = html.slice(idbegin, idend);
            let movieid = parseInt(button.value);
            fetch(`addwatchedlist/${movieid}`, {
                method: 'PUT'
            })
            .then(() => {
                button.innerHTML = "watched";
                console.log("sucess");
            })
            .catch(err => console.error(err));

        })

    })
    document.querySelectorAll('.removewatched').forEach((button) => {
        button.addEventListener('click',event => {
            // console.log(button.parentElement.parentElement.innerHTML);
            // const html = button.parentElement.parentElement.innerHTML;
            // let idbegin = html.indexOf("<input type=\"hidden\" value=\"");
            // idbegin += 28;
            // let idend = html.indexOf('">\n'+
            // '              \n'+
            // '                <p class="info">');
            // const id = html.slice(idbegin, idend);
            let movieid = parseInt(button.value);
            fetch(`removewatched/${movieid}`, {
                method: 'PUT'
            })
            .then(() => {
                button.parentElement.parentElement.parentElement.style.animationPlayState = 'running';
                button.parentElement.parentElement.parentElement.addEventListener('animationend', () => {
                    button.parentElement.parentElement.parentElement.remove();
                    })
                // button.parentElement.parentElement.parentElement.remove();
                // console.log("sucess");
            })
            .catch(err => console.error(err));

        })
        
    })
    document.querySelector('#submit').disabled = true;
    document.querySelector('#movie').onkeyup = () => {
        if (document.querySelector('#movie').value.length > 0){
            document.querySelector('#submit').disabled = false;
        }
        else {
            document.querySelector('#submit').disabled = true;
        }
        
    }
    
    
    
    document.querySelector('#form').onsubmit = () => {
        document.querySelector('#movies').innerHTML = "";
        task = document.querySelector('#movie').value;
        console.log(task);
        const user = document.getElementById("watchlist").value;
        let buttonvalue = "watchlist";
        if (user === "AnonymousUser") {
            buttonvalue = "signin to save"
        }

        fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=' + task, {
        method: 'GET',
	    headers: {
	    	'X-RapidAPI-Key': '0c0dad2de9msh56b3aab6b8f43bdp156bb6jsn7b5246cdfa9a',
	    	'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	    }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const list = data.d;
            delete list[0];
            list.map((item) => {
                // console.log(item.id);
                const movie = document.createElement('div');
                movie.className = 'movie';
                const name = item.l;
                const poster = item.i.imageUrl;
                const imdbid = item.id;
                movie.innerHTML = `<li><img src = "${poster}"><h2>${name}</h2><h6>${imdbid}</h6><button class="add">${buttonvalue}</button></li>`;
                document.querySelector('#movies').append(movie); 
            })
        })
        .then(() => {
            document.addEventListener('click', event => {

                const element = event.target;
                if(element.className === 'add')
                {
                    // console.log((element.parentElement.parentElement.innerHTML));
                    const html = element.parentElement.parentElement.innerHTML;

                    const linkbegin = html.indexOf("https://");
                    const linkend = html.indexOf("\"><h2>");
                    const link = html.slice(linkbegin, linkend);
                    link.toString()
                    let titlebegin = html.indexOf("<h2>");
                    titlebegin += 4;
                    const titleend = html.indexOf("</h2>");
                    const title = html.slice(titlebegin, titleend);
                    let idbegin = html.indexOf("<h6>");
                    idbegin += 4;
                    const idend = html.indexOf("</h6");
                    const id = html.slice(idbegin, idend);
                    // console.log(link, title, id);
                    fetch('watchlist', {
                        method: 'PUT',
                        body: JSON.stringify({
                            imdbid: id,
                            title: title,
                            imageurl: link,
                        })
                    })  


                    element.parentElement.parentElement.style.animationPlayState = 'running';
                    element.parentElement.parentElement.addEventListener('animationend', () => {
                        element.parentElement.parentElement.remove();
                    })
                }


            })

        })
        .catch(err => console.error(err));
        
        document.querySelector('#movie').value = '';
        document.querySelector('#submit').disabled = true;

        // stop form from submitting
        return false;

    }
    
    
})



