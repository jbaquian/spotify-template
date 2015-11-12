var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.getArtists = function() {
    $http.get(baseUrl + $scope.artist).success(function(response){
      data = $scope.artists = response.artists.items
    })
  }
  $scope.check = function(artist) {
    //This searches Spotify for all the albums the passed in artist is matched with
    $http.get('https://api.spotify.com/v1/search?q=artist:'+artist.name+'&type=album').success(function(response){
      data2=$scope.albums = response.albums.items
    var count = 0;
    var str = '';
      //this loops through all of the artist matched albums which corresponds to the value passed to the function
      $.each(data2, function(key, value) {
        //this searches for all the tracks on the album passed through
        $http.get('https://api.spotify.com/v1/search?q=artist:'+artist.name+'%20album:'+value.name+'&type=track').success(function(response){
          data3=$scope.tracks=response.tracks.items
          count = 0;
          $.each(data3, function(key, value){
            //this looks at whether a specific song is considered explicit and if it is will be counted
            if(value.explicit == true){
              count++
            }
          })
          if(count >0){
            str = value.name + ' is not safe for children, this album has ' +  count +' explicit song(s)'
          } else {
            str = value.name +' is safe for children'
          }
          //this sends an alert to the user telling how many or little explicit songs are on a specific album
          alert(str)
        })
      })
    })
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
