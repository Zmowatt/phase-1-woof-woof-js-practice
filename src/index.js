//Load Content and Fetch Doggos
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    function renderDogs(){
        fetch('http://localhost:3000/pups')
            .then(res => res.json())
            .then((data) => {
                data.forEach((result) => addDog(result))
            })

        //Change Filter
    let dogFilter = document.getElementById('good-dog-filter');
 
    console.log(dogFilter)

    dogFilter.addEventListener('click', changeFilter)

    }

    renderDogs();

function changeFilter(){
    let dogFilter = document.getElementById('good-dog-filter');
    let dogBar = document.getElementById('dog-bar');

    dogBar.innerHTML = '';

    if (dogFilter.innerHTML.includes('Filter good dogs: OFF')){
        dogFilter.innerHTML = 'Filter good dogs: ON';
        fetch('http://localhost:3000/pups?isGoodDog=true')
            .then(res => res.json())
            .then((data) => {
                data.forEach((result) => addDog(result))
            });
    } else if (dogFilter.innerHTML.includes('Filter good dogs: ON')){
        dogFilter.innerHTML = 'Filter good dogs: OFF';
        renderDogs();
    }
}

});

//Add Dogs to Dog Bar

function addDog(dog) {
    let dogBar = document.querySelector('#dog-bar');
    let pupper = document.createElement('span');
    

    pupper.className = 'dog';
    pupper.innerText = `${dog.name}`

    dogBar.appendChild(pupper)

    pupper.addEventListener('click', () => {
        dogDetails(dog)
    });
}



function dogDetails(dog){
    let dogInfo = document.querySelector('#dog-info');
    let pupCard = document.createElement('div')

    dogInfo.innerHTML ='';

    pupCard.innerHTML = `
        <h3>${dog.name}</h3>
        <img src='${dog.image}'>
        <br>
        <button id = 'button'></button>
    `;

    console.log(pupCard);

    dogInfo.appendChild(pupCard);


    let button = document.querySelector('#button')

    function buttonText() {
        if(dog.isGoodDog === true){
            button.innerHTML = 'Good Dog'
        } else if( dog.isGoodDog === false){
            button.innerHTML = 'Bad Dog'
        }
    };

    buttonText();

    button.addEventListener('click', () => {
        goodOrBad(dog)
    });
}

function goodOrBad(dog){
    let button = document.querySelector('#button')

    if(dog.isGoodDog === true) {
        dog.isGoodDog = false;
        button.innerHTML = 'Bad Dog';
    } else if(dog.isGoodDog === false) {
        dog.isGoodDog = true;
        button.innerHTML = 'Good Dog';
    }

    console.log(dog.isGoodDog);

    patchDogStatus(dog);
}

function patchDogStatus(dog){
    fetch(`http://localhost:3000/pups/${dog.id}`,{
        method: 'PATCH',
        headers:  {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({isGoodDog: dog.isGoodDog})
    })
        .then(res => res.json())
        .then((dog) => console.log(dog))
}

