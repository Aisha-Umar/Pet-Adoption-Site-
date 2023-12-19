
//get data from the api
const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json")
let pets = await petPromise.json()

const template = document.querySelector('#animal-card')
const wrapper = document.createElement('div')

//populate the animal card
pets.forEach(p => {
    const clone = template.content.cloneNode(true)
    clone.querySelector('.pet-name').textContent = p.name
    clone.querySelector('.animal-img').src = p.photo
    clone.querySelector('.species').textContent = p.species
    clone.querySelector('.age').textContent = calculateAge(p.birthYear)
    clone.querySelector('.info').textContent = p.description
    clone.querySelector('.info-btn').textContent = `Adopt ${p.name}`
    //go to pet page when info button clicked
    clone.querySelector('.info-btn').href =`https://learnwebcode.github.io/pet-adoption-data/pets/${p.id}/`
    wrapper.appendChild(clone)
    document.body.querySelector('.animals').appendChild(wrapper)
})

//get age
function calculateAge(byear){
    //substract birth year from current year
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    let petAge = currentYear - byear
    if(!petAge){
        return 'Less than a year old'
    }
    else if(petAge === 1){
        return '1 year old'
    }
    else{
        return `${petAge} years old`
    }
}

const filterButtons = document.querySelectorAll('.pet-links a')
filterButtons.forEach(el => {
    el.addEventListener('click', e => handleFilterClick(e))
})


function handleFilterClick(e){
    let target = e.target
    if(e.target.classList.contains('only-lg-screen')){
        target = e.target.closest('a')
    }

    e.preventDefault()
    filterButtons.forEach(el =>{
        el.classList.remove('active')
    })
    target.classList.add('active')

    let petSpecies = e.target.dataset.filter

    let allPets = document.querySelectorAll('.animal-card')

    allPets.forEach(pet =>{
        if(petSpecies == 'all'){
            pet.style.display=''
        }
        else if(pet.querySelector('.species').textContent == petSpecies){
            pet.style.display=''
        }
        else{
            pet.style.display='none'
        }
    })
}

document.getElementById('adopt-scroll').addEventListener('click', function (e) {
    e.preventDefault()

    // Find the target section
    let targetSection = document.getElementById('scroll-animals')

    // Calculate the target scroll position (slightly below the target section)
    let targetPosition = targetSection.offsetTop 

    // Scroll to the target position with smooth behavior
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    })
})