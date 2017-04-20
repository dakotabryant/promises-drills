var getFromApi = function(endpoint, query={}) {
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    return fetch(url).then(function(response) {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    });
};

var artist;
var getArtist = function(name) {
    return getFromApi('search',{q: name, limit: 10, type: 'artist'})
    .then(response => {
    //   return response.artists.items[0];
      artist = response.artists.items[0];
      let id = artist.id;
      // console.log(`this is response 1 ${response}`);
      // console.log(response);
      console.log(artist, "hey, this is the 1st");
      return getFromApi(`artists/${id}/related-artists`, {q: name, limit: 10, type: 'artist'});
    }).then(relatedResponse => {
      // console.log(`this is response 2 ${response}`);
        artist.related = relatedResponse.artists;
        return artist;

    }).catch(err => {
      console.error(err);
    });
};
