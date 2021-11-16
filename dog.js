//Set timer slide show for each dog breed

let timer
let deleteFirstPhotoDelay

//Use try catch to avoid throwing huge error. this function is to fetch from public API
async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
  } catch (error) {
    console.log("There was a problem fetching the breed list.")
  }
}

start()

//To display the breed list in dropdown list

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed) {
          return `<option>${breed}</option>`
        }).join('')}
      </select>
  `
}

//Create function to load dogs by breed dynamically

async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json()
    createSlideshow(data.message)
  }
}

//Animate and slide show if there are multiple images in one particular dog breed
function createSlideshow(images) {
  let currentPosition = 0
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `
  currentPosition += 2
  if (images.length == 2) currentPosition = 0
  timer = setInterval(nextSlide, 3000)
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `
  }

  function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove()
    }, 1000)
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0
    } else {
      currentPosition++
    }
  }
}