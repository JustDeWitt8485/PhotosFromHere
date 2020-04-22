const pics = [];
const alternateLocation = { latitude: -14.2350, longitude: 51.9253 }
let j = 0;
let frame = document.getElementById("image");
let page = document.getElementById("a")
let button = document.getElementById("button");
button.addEventListener("click", buttonCl,  ) 

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
};

function constructImageURL(photoObj) {
    return "https://farm" + photoObj.farm +
        ".staticflickr.com/" + photoObj.server +
        "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
};

function buttonCl (event) {
    if(j < 5){
    j++
    frame.src = pics[j];
    } 
    if(j > 4) {
        j = 0
        frame.src = pics[0];
    }
}

// site: from Randy's demo
function displayPhoto(coords) {
    console.log("Latitude" + coords.latitude);
    console.log("longitude" + coords.longitude);
    
    let responsePromise = fetch('https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=076c5c8c85f1dfa3327176fc1827a481&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&page=1&accuracy=6&text=rain_forest&lat' + coords.latitude + '&lon' + coords.longitude)
    
    let dataPromise = responsePromise.then(function (response) {
        return response.json()
    });
    dataPromise.then(function (data) {
        
        for (let i = 0; i < data.photos.photo.length; i++) {
            
            const imagUrl = constructImageURL(data.photos.photo[i])
            pics.push(imagUrl)
            frame.src = pics[j];
            console.log(data.photos.photo)
        }
    })
    console.log(pics)


    // pics.forEach(function picReel() {
    //     let img = document.createElement("image");
    //     // let frame = document.querySelector("slideShow")
    //     img.src = pics[0];
    //     // frame.appendChild(img)
    //     // setTimeout(frame, 10)
    //     document.body.appendChild("img");
    // })

}

function usePresentLocation(pos) {
    displayPhoto(pos.coords)
}

function useFallbackLocation() {
    displayPhoto(alternateLocation)
}

navigator.geolocation.getCurrentPosition
    (usePresentLocation, useFallbackLocation, options);