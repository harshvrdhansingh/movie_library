$(document).ready(() => {
    $('#searchform').on('submit', (e) => {
        let searchtext = $('#searchtext').val();
        getmovies(searchtext);
        e.preventDefault();
    });
});

function getmovies(searchtext) {
    axios.get('https://www.omdbapi.com/?s='+searchtext)
        .then((response) => {
            console.log(response);
            let movie =  response.data.search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class = "col-md-3">
                <div class="well text-centre">
                <img src="${movie.Poster}">
                <h5> ${ movie.tittle}</h5>
                <a onclick="moiveselected('${movie.imdbID}')" class="btn btn-primary" href="#">movie details</a>  

                </div>
                </div>
               `;
            }); 
            $('movies').html(output);

        })

        .catch((err) => {
            console.log(err);
        });
}
function moiveselected(id){
    sessrionstorage.setitem('movieid', id);
    window.location = 'movie.html';
    return false;

}

function getmovie(){
    let movieid = sessionstorage,getitem ('movieid');
    axios.get('https://www.omdbapi.com/?i='+movieid)
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
        <div class= "row">
        <div class="col-md-4">
        <img src="${movie.Poster}" class= "thumbnail"> 
         </div>
        <div class="col-md-8"> 
        <h2> ${movie.tittle}</h2>
        <ul class = "list-group">
        <li class = "list-group-item"><strong>genre:</strong>${movie.genre}></li>
        <li class = "list-group-item"><strong>released:</strong>${movie.released}></li>
        <li class = "list-group-item"><strong>rated:</strong>${movie.rated}></li>
        <li class = "list-group-item"><strong>imbd rating:</strong>${movie.imbd rating}></li>
        <li class = "list-group-item"><strong>directors:</strong>${movie.directors}></li>
        <li class = "list-group-item"><strong>writer:</strong>${movie.writer}></li>
        <li class = "list-group-item"><strong>actors:</strong>${movie.actors}></li>
        </ul>
        </div>
        </div>
        <div class= " row"></div>
        <div class= " well">
        <h3> plot </h3>
        ${movie.plot}
        <hr>
        <a href= " http:// imdb.com/tittle/${movie.imdbID}"target= "_blank" class= "btn  btn-primary"> view imdb</a>
        < a href = "index.html" class="btn btn-default"> go back  to search </a>
        </div>
        `;


        $('movie').html(output);
        // let movie =  response.data.search;
        // let output = '';
        // $.each(movies, (index, movie) => {
        //     output += `
        //     <div class = "col-md-3">
        //     <div class="well text-centre">
        //     <img src="${movie.Poster}">
        //     <h5> ${ movie.tittle}</h5>
        //     <a onclick="moiveselected('${movie.imdbID}')" class="btn btn-primary" href="#">movie details</a>  

        //     </div>
        //     </div>
        //    `;
        // }); 
        // $('movies').html(output);

    })

    .catch((err) => {
        console.log(err);
    });
}