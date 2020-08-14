function SliderJS(sliderID, { playing, autoplayInterval, hideControls}){
    
    if(document.getElementById(sliderID).children.length === 2){

        const newSlide1 = document.createElement('img')
        newSlide1.src = document.getElementById(sliderID).children[0].src
        document.getElementById(sliderID).appendChild(newSlide1)

        const newSlide2 = document.createElement('img')
        newSlide2.src = document.getElementById(sliderID).children[1].src
        document.getElementById(sliderID).appendChild(newSlide2)
        
    }

    const carouselSliders = document.getElementById(sliderID)
    const slidersImg = carouselSliders.children

    let prevButton 
    let playButton
    let nextButton

    let slideInterval = setInterval(nextSlide, autoplayInterval)

    let counter = {
        value: 0,
        prev(){

            this.value = this.getLeftSlideIndex()
            return this.value

        },
        next(){

            this.value = this.getRightSlideIndex()
            return this.value

        },
        getLeftSlideIndex(){

            return this.value === 0 ? slidersImg.length - 1 : this.value - 1
        },
        getCurrentSlideIndex(){

            return this.value

        },
        getRightSlideIndex(){

            return this.value === slidersImg.length - 1 ? 0 : this.value + 1
        }    
    }

    function addControls(){
        
        let divButton = document.createElement("div")
        carouselSliders.after(divButton)
        divButton.className = "buttons"
        divButton.style.margin = "auto"
        divButton.style.width = "800px"
        divButton.style.top = "20px"

        prevButton = document.createElement("button")
        divButton.append(prevButton)
        prevButton.style.background = "url('../src/icons/left-arrow.svg') no-repeat"
        prevButton.style.border = "none"
        prevButton.style.outline = "none"
        prevButton.style.width = "40px"
        prevButton.style.height = "40px"

        playButton = document.createElement("button")
        divButton.append(playButton)
        playButton.style.background = "url('../src/icons/pause.svg') no-repeat"
        playButton.style.border = "none"
        playButton.style.outline = "none"
        playButton.style.width = "40px"
        playButton.style.height = "40px"

        nextButton = document.createElement("button")
        divButton.append(nextButton)
        nextButton.style.background = "url('../src/icons/right-arrow.svg') no-repeat"
        nextButton.style.border = "none"
        nextButton.style.outline = "none"
        nextButton.style.width = "40px"
        nextButton.style.height = "40px"
        
        if (hideControls === true) {
            prevButton.style.display = 'none'
            nextButton.style.display = 'none'
            playButton.style.display = 'none'
        }
        
    }
    
    function hideAll(){

        for(let index = 0; index< slidersImg.length; index++){
            slidersImg[index].style.display = 'none'
        }    

    }

    function prepareSlides(){

        hideAll()

        slidersImg[counter.getLeftSlideIndex()].style.transform = "translateX(-800px)"
        slidersImg[counter.getLeftSlideIndex()].style.display = "block"
        slidersImg[counter.getLeftSlideIndex()].style.zIndex = "0"

        slidersImg[counter.getCurrentSlideIndex()].style.transform = "translateX(0)"
        slidersImg[counter.getCurrentSlideIndex()].style.display = "block"
        slidersImg[counter.getCurrentSlideIndex()].style.zIndex = "1"

        slidersImg[counter.getRightSlideIndex()].style.transform = "translateX(800px)"
        slidersImg[counter.getRightSlideIndex()].style.display = "block"
        slidersImg[counter.getRightSlideIndex()].style.zIndex = "0"

    }

    function pauseShow(){

        playButton.style.background = "url('../src/icons/play.svg') no-repeat"
        playing = false;
        clearInterval(slideInterval)

    }
     
    function playShow() {

        playButton.style.background = "url('../src/icons/pause.svg') no-repeat"
        playing = true
        slideInterval = setInterval(nextSlide,autoplayInterval)

    }

    function prevSlide(){

        prepareSlides()

        prevButton.disabled = true
        nextButton.disabled = true
             
        slidersImg[counter.getLeftSlideIndex()].style.zIndex = "1"
        slidersImg[counter.getLeftSlideIndex()].style.transform = "translateX(0)"
        slidersImg[counter.getLeftSlideIndex()].style.display = "block"

        slidersImg[counter.getCurrentSlideIndex()].style.zIndex = "0"
        slidersImg[counter.getCurrentSlideIndex()].style.display = "block"
        slidersImg[counter.getCurrentSlideIndex()].style.transform = "translateX(800px)"

        slidersImg[counter.getRightSlideIndex()].style.zIndex = "0"
        slidersImg[counter.getRightSlideIndex()].style.display = "none"
        slidersImg[counter.getRightSlideIndex()].style.transform = ""
        
        counter.prev()
        
        slidersImg[counter.getLeftSlideIndex()].style.zIndex = "0"
        slidersImg[counter.getLeftSlideIndex()].style.display = "block"
        slidersImg[counter.getLeftSlideIndex()].style.transform = "translateX(-800px)"

    }

    function nextSlide(){

        prepareSlides()

        prevButton.disabled = true
        nextButton.disabled = true
             
        slidersImg[counter.getLeftSlideIndex()].style.zIndex = "0"
        slidersImg[counter.getLeftSlideIndex()].style.transform = ""
        slidersImg[counter.getLeftSlideIndex()].style.display = "none"

        slidersImg[counter.getCurrentSlideIndex()].style.zIndex = "0"
        slidersImg[counter.getCurrentSlideIndex()].style.display = "block"
        slidersImg[counter.getCurrentSlideIndex()].style.transform = "translateX(-800px)"

        slidersImg[counter.getRightSlideIndex()].style.zIndex = "1"
        slidersImg[counter.getRightSlideIndex()].style.display = "block"
        slidersImg[counter.getRightSlideIndex()].style.transform = "translateX(0)"
        
        counter.next()
        
        slidersImg[counter.getRightSlideIndex()].style.zIndex = "0"
        slidersImg[counter.getRightSlideIndex()].style.display = "block"
        slidersImg[counter.getRightSlideIndex()].style.transform = "translateX(800px)"      

    }

    function slideMouseEventStart(event){

        event.preventDefault()
        const imageLeft = slidersImg[counter.getCurrentSlideIndex()].getBoundingClientRect().left
        
        positionClick = event.pageX - imageLeft

    }

    function slideTouchEventStart(event){

        const imageLeft = carouselSliders.getBoundingClientRect().left
        
        positionClick = event.changedTouches[0].pageX - imageLeft

    }

    function slideEventEnd(){
        let size = slidersImg[counter.getCurrentSlideIndex()].clientWidth
        if(positionClick >= size / 2)
        {
            nextSlide()
            if (playing){
                clearInterval(slideInterval)
                slideInterval = setInterval(nextSlide,autoplayInterval)
            }
        }else{
            prevSlide()
            if (playing){
                clearInterval(slideInterval)
                slideInterval = setInterval(nextSlide,autoplayInterval)
            }
        }
    }
    
    if(slidersImg.length === 1){

        playing = false
        hideControls = false
        clearInterval(slideInterval)

        slidersImg[counter.getCurrentSlideIndex()].style.transform = "translateX(0)"
        slidersImg[counter.getCurrentSlideIndex()].style.display = "block"

    } else if(slidersImg.length === 0){

        playing = false
        hideControls = false
        clearInterval(slideInterval)

        console.log(" картинок нет");
    }else{

    prepareSlides()

    addControls()
    
    prevButton.addEventListener('click', ()=>{

        prevSlide()

        if (playing){
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide, autoplayInterval)
        }
    })

    playButton.addEventListener('click', ()=>{
        
        console.log(playing);
        if(playing){
            console.log('pause')
            pauseShow()
        }
        else{
            playShow()
        }

    })

    nextButton.addEventListener('click', ()=>{
        
        nextSlide()

        if (playing){
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide,autoplayInterval)
        }

    })
   
    carouselSliders.addEventListener("transitionend", () => {

        nextButton.disabled = false
        prevButton.disabled = false

    });

    carouselSliders.addEventListener('mousedown', slideMouseEventStart)
    carouselSliders.addEventListener('touchstart', slideTouchEventStart)

    carouselSliders.addEventListener('mouseup', slideEventEnd)
    carouselSliders.addEventListener('touchend', slideEventEnd)

    
    } 
}