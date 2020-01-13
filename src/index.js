let filteredArray = []
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => getPups(json));

    let filterButton = document.getElementById("good-dog-filter")
    filterButton.addEventListener("click", filterPup)


})

function fetchPups(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => getPups(json));
}

function getPups(data){
    let dogBar = document.getElementById("dog-bar")
    while(dogBar.firstChild){
        dogBar.removeChild(dogBar.firstChild)
    }
    renderPupBar(data);
}

function filterPup(e){
    let dogBar = document.getElementById("dog-bar")
    while(dogBar.firstChild){
        dogBar.removeChild(dogBar.firstChild)
    }

    if(e.target.textContent === "Filter good dogs: OFF"){
        fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(json => {
            let filtered = json.filter(pup => pup.isGoodDog === true)
            renderPupBar(filtered)
        })
        e.target.textContent = "Filter good dogs: ON"
    }else{
        fetchPups();
        e.target.textContent = "Filter good dogs: OFF"
    }

}

function renderPupBar(data){
    let dogBar = document.getElementById("dog-bar")

    data.forEach(pup => {
        let span = document.createElement("span")
        span.textContent = pup.name
        span.setAttribute("pupper-id", pup.id)
        span.setAttribute("good-dog", pup.isGoodDog)
        span.addEventListener("click", doggoInfo)
        dogBar.appendChild(span)

    })
}

function doggoInfo(e){
    fetch(`http://localhost:3000/pups/${e.target.getAttribute("pupper-id")}`)
    .then(resp => resp.json())
    .then(json => displayPup(json));
}

function displayPup(pup){
    let dogDisplay = document.getElementById("dog-info")
    var child = dogDisplay.lastElementChild;
    while(child){
        dogDisplay.removeChild(child);
        child = dogDisplay.lastElementChild;
    }

    let div = document.createElement("div")
    
    let img = document.createElement("img")
    img.src = pup.image

    let dogName = document.createElement("h2")
    dogName.textContent = pup.name

    let button = document.createElement("button")
    button.dataset.pupId = pup.id
    if(pup.isGoodDog === true){
        button.textContent = "Good Dog!"
    }else{
        button.textContent = "Bad Dog!"
    }
    button.addEventListener("click", toggleBoy)

    div.appendChild(img)
    div.appendChild(dogName)
    div.appendChild(button)

    dogDisplay.appendChild(div)

}

function toggleBoy(e){
    let boyObj
    if(e.target.textContent === "Good Dog!"){
        boyObj = {isGoodDog: false}
    }else{
        boyObj = {isGoodDog: true}
    }

    
    fetch(`http://localhost:3000/pups/${e.target.dataset.pupId}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(boyObj)
    })
    .then(resp => resp.json())
    .then(json => {
        if(json.isGoodDog === true){
            e.target.textContent = "Good Dog!"
        }else{
            e.target.textContent = "Bad Dog!"
        }
    });

}


