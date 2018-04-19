const clientID = '9049bfffc92641509487915e88217009';
const redirectURI = 'http://thevdude-jammming.surge.sh/';
//const redirectURI = 'http://localhost:3000/';
const baseAPI = 'https://api.spotify.com/v1/';

let userToken;

let Spotify = {
  getAccessToken() {
    if(userToken) {
      return userToken;
    }
    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if(accessToken && expiresIn) {
      userToken = accessToken[1];
      let expires = expiresIn[1];
      window.setTimeout(() => userToken = '', expires * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  },

  search(term) {
    const url = `${baseAPI}search?type=track&q=${term}`;
    const auth = {headers: {Authorization: `Bearer ${userToken}`}};
    Spotify.getAccessToken();

    return fetch(url, auth)
    .then(response => response.json())
    .then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name:track.name,
          artist:track.artists[0].name,
          album:track.album.name,
          uri:track.uri
        };
      });
    });
  },

  savePlaylist(name, trackURIs){
    if(!name || !trackURIs){
      return;
    }
    Spotify.getAccessToken();
    const auth = {Authorization: `Bearer ${userToken}`};
    const playlistHeader = {headers: auth, method:'POST', body: JSON.stringify({name:name})};
    const trackHeader = {headers: auth, method:'POST', body: JSON.stringify({uris: trackURIs})};
    let userID;
    let playlistID;

    return fetch(`${baseAPI}me`, {headers: auth})
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.id){
        userID = jsonResponse.id;
        return fetch(`${baseAPI}users/${userID}/playlists`, playlistHeader)
        .then(response => response.json())
        .then(jsonResponse => {
          if(jsonResponse.id){
            playlistID = jsonResponse.id;
            return fetch(`${baseAPI}users/${userID}/playlists/${playlistID}/tracks`, trackHeader)
          }
        })
      }
    })
  }
}

export default Spotify;