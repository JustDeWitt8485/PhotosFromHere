

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
};

const alternateLocation = { latitude: -14.2350, longitude: 51.9253 }

function constructImageURL(photoObj) {
    return "https://farm" + photoObj.farm +
        ".staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
};


const photos = {
    owner: [],
    pics: []
};
function displayPhoto(coords) {
    console.log("Latitude" + coords.latitude);
    console.log("longitude" + coords.longitude);

    let responsePromise = fetch('https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=076c5c8c85f1dfa3327176fc1827a481&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&page=1&accuracy=16&text=nature&lat' + coords.latitude + '&lon' + coords.longitude)

    let dataPromise = responsePromise.then(function (response) {
        return response.json()
    });

    dataPromise.then(function (data) {

        for (let i = 0; i < data.photos.photo.length; i++) {

            photos.pics.push(constructImageURL(data.photos.photo[i]))

            photos.owner.push(data.photos.photo[i].owner)
            console.log(data)
        }
    })
    console.log(photos)
}

function usePresentLocation(pos) {
    displayPhoto(pos.coords)
}

function useFallbackLocation() {
    displayPhoto(alternateLocation)
}

navigator.geolocation.getCurrentPosition
    (usePresentLocation, useFallbackLocation, options);