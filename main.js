let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');
let nounBox = document.querySelector('.noun');
let exampleBox = document.querySelector('.example');

searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    // Clear Old Data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';
    nounBox.innerText = '';
    exampleBox.innerText = '';

    // Get Input Data
    let word = input.value;

    // call API get data
    if (word === '') {
        alert('Please Enter A Word ..');
        return;
    }
    
    getData(word);
})


async function getData(word) {
    loading.style.display = 'block';
    // Ajax Call 
    const response = await fetch("https://dictionaryapi.com/api/v3/references/sd4/json/"+input.value+"?key=c8a9bdfe-413f-46f1-91b8-64a88c238383");
    const data = await response.json();
    // if empty result 
    if (!data.length) {
        loading.style.display = 'none';
        notFound.innerText = ' No result found';
        return;
    }

    // If result is suggetions
    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'You means?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetion = document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText = element;
            notFound.appendChild(suggetion);
            
        })
        return;
    }

    // Result found 
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination; 
    loading.style.display = 'none';
    let speech = data[0].fl[0];
    nounBox.innerText = speech;
    
    

    // Sound 
   const soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName) {
            renderSound(soundName);
        }

    console.log(data);
}

function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11 (Demo)
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=c8a9bdfe-413f-46f1-91b8-64a88c238383`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}