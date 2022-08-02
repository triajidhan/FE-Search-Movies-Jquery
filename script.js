function showMovies() {
    $('#movie-list').html('')

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '3afb022f',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search

                $.each(movies, function (i, data) {
                    $('#movie-list').append(
                        `<div class=" col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card">
                            <img src="${data.Poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                            <a href="#" class="card-link see-details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Details</a>
                            </div>
                        </div>
                    </div>`
                    )
                })

                $('#search-input').val('')

            } else {
                $('#movie-list').html(`<h1>${result.Error}</h1>`)
            }
        }
    })
}

$('#search-button').on('click', function () {
    showMovies()
})

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        showMovies()
    }
})

$('#movie-list').on('click', '.see-details', function () {

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '3afb022f',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response == "True") {

                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-5 col-sm-12">
                            <img src="${movie.Poster}" >
                        </div>
                    
                        <div class="col-md-7 col-sm-12">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>${movie.Title}</h3></li>
                                <li class="list-group-item">Released: ${movie.Released}</li>
                                <li class="list-group-item">Actors: ${movie.Actors}</li>
                                <li class="list-group-item">Plot: ${movie.Plot}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `)
            }
        }
    })
})