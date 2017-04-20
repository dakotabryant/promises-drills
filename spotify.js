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
    return getFromApi('search',{q: name, limit: 1, type: 'artist'})
    .then(response => {
        console.log(response.artists.items[0].id);
    //   return response.artists.items[0];
      let id = response.artists.items[0].id;
      console.log(`https://api.spotify.com/v1/artists/${id}/related-artists`);
    //   return fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`);
    }).catch(err => {
      console.error(err);
    });
};
