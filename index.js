import { catsData } from "/data.js" 

// Getting DOM elements
const emotionRadios = document.getElementById('emotion-radios')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const getImgBtn = document.getElementById('get-img-btn')
const memeModal = document.getElementById('meme-modal')
const closeModalBtn = document.getElementById('close-btn')
const memeModalInner = document.getElementById('meme-modal-inner')

// Event listeners
emotionRadios.addEventListener('change', highlightCheckedOption)    // Listen for changes in emotion radios
getImgBtn.addEventListener('click', renderCatMeme)  // Listen for clicks on the "Get Image" button
closeModalBtn.addEventListener('click', closeModal) // Listen for clicks on the close button in meme modal
document.addEventListener('click', (e) => {
    if (e.target.parentElement.id != 'meme-modal' && e.target.id != 'get-img-btn') {
        closeModal()
    }
})

// Function to highlight the checked emotion radio
function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio') // Parent element of each radio
    
    for (let radio of radios) {
        radio.classList.remove('highlight') 
    }
    
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

// Function to render a cat meme in the modal
function renderCatMeme() {
    const catObject = getSingleCatArray() // Get a random cat object
    
    memeModalInner.innerHTML = `
    <img src="images/${catObject.image}" alt="${catObject.alt}" class="cat-img">
    `
    
    memeModal.style.display = 'flex' // Displaying the modal
}

// Function to get a random cat object
function getSingleCatArray() {
    const catsArray = getMatchingEmotionArray() // Get the matching emotions with the selected emotion 
    
    // Randomly selecting a cat object from the cats array
    return catsArray[Math.floor(Math.random() * catsArray.length)] 
}


// Function to get matching emotions
function getMatchingEmotionArray() {
    // If only the emotion radio is checked, then...
    if (document.querySelector('input[type="radio"]:checked')) {
        // Get the checked radio's value
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        // Check if the gifs-only button is checked and return a boolean
        const isGif = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter((cat) => {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })

        return matchingCatsArray
    }
}

// Function to close the meme modal
function closeModal() {
    memeModal.style.display = 'none'
}

// Function to get all the emotion from catsData
function getEmotionArray(cats) {
    const catEmotionsArray = []
    
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            // Check if the catEmotionsArray hasn't include the following emotion, only then push it to the array
            if (!catEmotionsArray.includes(emotion)) {
                catEmotionsArray.push(emotion)
            }
        }
    }

    return catEmotionsArray
}

// Function to render all the emotions
function renderEmotionRadios(cats) {
    const emotions = getEmotionArray(cats)

    for (let emotion of emotions) {
        emotionRadios.innerHTML += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" name="emotions" id="${emotion}" value="${emotion}">
            </div>
        `
    }
}

renderEmotionRadios(catsData)