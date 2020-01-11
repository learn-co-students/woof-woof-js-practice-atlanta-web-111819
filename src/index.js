const URL = 'http://localhost:3000/pups'
let DOG_BAR
let DOG_INFO

function loadAllDogs() {
    fetch(URL)
    .then(res => res.json())
    .then(dogs => {
        for (dog of dogs) {
            renderDogIntoBar(dog)
        }
    })
}

function renderDogIntoBar(dog) {
    const span = document.createElement('span')
    span.textContent = dog.name
    span.addEventListener('click', clickOnDogInBar)
    span.setAttribute('data-id', dog.id)
    DOG_BAR.appendChild(span)
}

function clickOnDogInBar(event) {
    //fetchs the dog data by building the url from the global
    //variable and appending the id from the span's "data-id" attribute
    fetch(`${URL}/${event.target.getAttribute('data-id')}`)
    .then(res => res.json())
    .then(dog => {
        renderDogInfo(dog)
    })
}

function setGoodnessButtonText(dog) {
    return Boolean(dog.isGoodDog) ? 'Good dog!' : 'Bad dog'
}

function renderDogInfo(dog) {
    DOG_INFO.innerHTML = ''
    const dogImg = document.createElement('img')
    dogImg.src = dog.image

    const dogName = document.createElement('h2')
    dogName.textContent = dog.name

    const goodnessBtn = document.createElement('button')
    goodnessBtn.textContent = setGoodnessButtonText(dog)
    goodnessBtn.setAttribute('good-dog', dog.isGoodDog)
    goodnessBtn.addEventListener('click', e => {
        //convert the string in the html attribute to a boolean and flip its value
        const goodnessStatus = (e.target.getAttribute('good-dog') !== 'true')
        updateDogGoodness(dog.id, e.target, goodnessStatus)
    })

    DOG_INFO.appendChild(dogImg)
    DOG_INFO.appendChild(dogName)
    DOG_INFO.appendChild(goodnessBtn)
}

function updateDogGoodness(dogId, button, goodnessStatus) {
    options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            isGoodDog: goodnessStatus
        })
    }

    fetch(`${URL}/${dogId}`, options)
    .then(res => res.json())
    .then(dog => {
        if (dog.id) {
            button.textContent = setGoodnessButtonText(dog)
            button.setAttribute('good-dog', dog.isGoodDog)
        }
    })
}

function filterBadDogs() {
    
}


document.addEventListener('DOMContentLoaded', function(e) {
    DOG_BAR = document.querySelector('#dog-bar')
    DOG_INFO = document.querySelector('#dog-info')
    loadAllDogs()
})