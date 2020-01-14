fetch('http://localhost:3000/pups').then(res => res.json()).then(json => addPup(json))






 function addPup(pups){

    const fDiv = document.querySelector('#filter-div')
    const filter = document.querySelector('#good-dog-filter')
    filter.addEventListener('click',(e) =>{
        const div = document.querySelector('#dog-bar')
        
        if(filter.textContent === 'Filter good dogs: OFF'){
            div.innerHTML = ""
            filter.textContent = 'Filter good dogs: NO'
            pups.forEach( pup => {
                if(pup.isGoodDog){
                    displayPup(pup)
                }
                })
        }else{
            div.innerHTML = ""
            filter.textContent = 'Filter good dogs: OFF'
            pups.forEach( pup => {displayPup(pup)})
        }




    })


     

    



    
     
 }

 function displayPup(pup){
    const div = document.querySelector('#dog-bar')
    const span = document.createElement('span')
    span.textContent = pup.name
    span.addEventListener('click', (e) => {displayPupInfo(pup)} )
    div.appendChild(span)
 }


 function displayPupInfo(pup){
    const div = document.querySelector('#dog-info')
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
    const img = document.createElement('img')
    img.src = pup.image
    div.appendChild(img)

    const h2 = document.createElement('h2')
    h2.textContent = pup.name
    div.appendChild(h2)
    
    const button = document.createElement('button')
    let newStatus
    if(pup.isGoodDog){
        button.textContent = 'Good Dog'
        newStatus = {isGoodDog: false}
    }else{
        button.textContent = 'Bad Dog'
        newStatus = {isGoodDog: true}
    }

    button.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/pups/${pup.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStatus)
        })
        .then(res => res.json())
        .then(pup => displayPupInfo(pup))
    })

    div.appendChild(button)

    
 }