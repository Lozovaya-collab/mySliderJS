let carouselSliders
let slidersImg
const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const swipeButton = document.querySelector('#swipe')
let size
let slideInterval
let obj
let counter = 0
let transform = 0
let moving = false
let initialPosition = null

function SliderJS(sliderID, arguments){
    
    obj = arguments
    carouselSliders = document.querySelector(sliderID)
    slidersImg = document.querySelectorAll(sliderID +' img')
    
    size = slidersImg[0].clientWidth
    slideInterval = setInterval(nextSlide, obj.autoplayInterval)
    carouselSliders.addEventListener('transitionend', ()=>{
    
        if (slidersImg[counter].id === 'lastSlide'){
            carouselSliders.style.transition = "none"
            counter = slidersImg.length - 2
            carouselSliders.style.transform = 'translateX(' + (-size * counter) + 'px)'
        } else if (slidersImg[counter].id === 'firstSlide'){
            carouselSliders.style.transition = "none"
            counter = slidersImg.length - counter
            carouselSliders.style.transform = 'translateX(' + (-size * counter) + 'px)'
        }
    
        

    })
    
    if (obj.hideControls === false) {
        prevButton.style.display = 'none'
        nextButton.style.display = 'none'
        swipeButton.style.display = 'none'
    }
    
    nextButton.addEventListener('click', ()=>{
        nextSlide()
        if (obj.playing){
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide,obj.autoplayInterval)
        } 
    })
    
    prevButton.addEventListener('click', ()=>{
        prevSlide() 
        if (obj.playing){
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide,obj.autoplayInterval)
        } 
        
    })
    
    swipeButton.addEventListener('click', ()=>{
        console.log(obj.playing);
        if(obj.playing){
            console.log('pause')
            pauseShow()
        }
        else{
            playShow()
        }
        
    })
    
    window.addEventListener('mousedown', gestureStart)
    window.addEventListener('mousemove', gestureMove)
    window.addEventListener('mouseup', gestureEnd)
    
    
    window.addEventListener('touchstart', gestureStart)
    window.addEventListener('touchmove', gestureMove)
    window.addEventListener('touchend', gestureEnd)
         
}
    


function nextSlide(){
    if(counter >= slidersImg.length - 1) return
    carouselSliders.style.transition = "transform 1s ease-in-out"
    counter++
    carouselSliders.style.transform = 'translateX(' + (-size * counter) + 'px)'
}
function prevSlide(){
    if(counter <= 0) return
    carouselSliders.style.transition = "transform 1s ease-in-out"
    counter--
    carouselSliders.style.transform = 'translateX(' + (-size * counter) + 'px)'
}


function pauseShow() {
    swipeButton.style.color = "red"
    obj.playing = false;
    clearInterval(slideInterval);
}
 
function playShow() {
    swipeButton.style.color = "black"
    obj.playing = true;
    slideInterval = setInterval(nextSlide,obj.autoplayInterval);
}

function gestureStart(event){
    
    initialPosition = event.pageX
    console.log(initialPosition);
    moving = true
    const transformMatrix = window.getComputedStyle(carouselSliders).getPropertyValue('transform')
    console.log(transformMatrix)
    if (transformMatrix != 'none'){
        transform = parseInt(transformMatrix.split(',')[4].trim())
    }
    
    carouselSliders.ondragstart = function() {
        return false;
      };
}

function gestureMove(event){
    if (moving){
        const currentPosition = event.pageX
        console.log(currentPosition);
        const difference = currentPosition - initialPosition
        console.log(transform + difference);
        carouselSliders.style.transform = 'translateX(' + (transform + difference) + 'px)'
    }
}

function gestureEnd(event){
    moving = false
    initialPosition = 0
    
    
}