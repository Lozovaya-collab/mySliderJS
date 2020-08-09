function SliderJS(sliderID, arguments){
    console.log('function');
    let carouselSliders = document.querySelector(sliderID)
    let slidersImg = document.querySelectorAll(sliderID +' img')
    const prevButton = document.querySelector('#prev')
    const nextButton = document.querySelector('#next')
    const playButton = document.querySelector('#swipe')
    let size = slidersImg[0].clientWidth
    let obj = arguments
    let counter = 0

    if (obj.hideControls === false) {
        prevButton.style.display = 'none'
        nextButton.style.display = 'none'
        swipeButton.style.display = 'none'
    }
    prevButton.addEventListener('click', ()=>{
        console.log('prevButton');
        counter--
        carouselSliders.style.transform = 'translateX(' + (-size * counter) + 'px)' 
        
        
    })
    playButton.addEventListener('click', ()=>{
        console.log('playButton');
        
    })
    nextButton.addEventListener('click', ()=>{
        console.log('nextButton');
        counter++
        carouselSliders.style.transform = 'translateX(' + (-size * counter) + 'px)'
    })
}