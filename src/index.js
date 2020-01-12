let pups 
let display 

window.addEventListener('DOMContentLoaded', (event) => {
    //Event Listeners
    
   addPups()
});

function addPups() {
     //Add pups to dog bar
     const dogDiv = document.querySelector('#dog-bar')
     fetch("http://localhost:3000/pups")
     .then(res => res.json())
     .then(data => {
         pups = data
         data.forEach(dog => {
             let name = dog.name
             let span = document.createElement("span")
             span.innerHTML = name
             dogDiv.appendChild(span)
             span.addEventListener('click', showPup)
         })
     })
    }
    function showPup(event) {
         let info = document.querySelector('#dog-info')
         info.innerHTML = " "
         let dogName = event.target.innerHTML
         pups.forEach(pup => {
             if(pup.name === dogName) {
                 display = pup
                let img = document.createElement('img') 
                img.src = pup.image
                let name = document.createElement('h2')
                name.innerHTML = pup.name
                let button = document.createElement('button')
                if(pup.isGoodDog === true) {
                    button.innerHTML = "Good Dog!"
                }else {
                    button.innerHTML = "Bad Dog!"
                }
                info.appendChild(img)
                info.appendChild(name)
                info.appendChild(button)
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    updateTemp(event);
                
             })
         }}
         )
    }

    function updateTemp(event) {
       if(event.target.innerHTML === "Bad Dog!") {
           event.target.innerHTML = "Good Dog!"
           display.isGoodDog = "Good Dog!"
       } else {
           event.target.innerHTML = "Bad Dog!"
           display.isGoodDog = "Bad Dog!"

       }
       let newData = {
         isGoodDog: display.isGoodDog
       }
       let configObj = {
        method: 'PATCH',
        headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(newData)
     };
    
       fetch("http://localhost:3000/pups/"+display.id, configObj)
          .then((response) => response.json())
          .then((object) => {
            console.log('Success:', object);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }