function SliderJS(sliderID, { playing, autoplayInterval, hideControls}){
    console.log("tap");
    
    let prevButton 
    let playButton
    let nextButton

    let positionStartClick
    let positionEndClick
    let direction

    let slideInterval
    let carouselSliders
    let slidersImg

    let counter

    function addControls(){
            
        let divButton = document.createElement("div")
        carouselSliders.after(divButton)
        divButton.className = "slider-buttons"

        prevButton = document.createElement("button")
        prevButton.className = "prev-button"
        divButton.append(prevButton)

        playButton = document.createElement("button")
        playButton.className = "play-button"
        divButton.append(playButton)

        nextButton = document.createElement("button")
        nextButton.className = "next-button"
        divButton.append(nextButton)
        
        
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
        
        positionStartClick = event.pageX 

    }

    function slideTouchEventStart(event){
        
        positionStartClick = event.changedTouches[0].pageX 

    }

    function slideMouseEventEnd(event){

        positionEndClick = event.clientX
        
        if(positionStartClick > positionEndClick){
            direction = "next"
        } else if(positionStartClick < positionEndClick){
            direction = "prev"
        }
    

        if(positionStartClick!= 0) {
            swipeAction()
        }

        positionStartClick = 0
        positionEndClick = 0
        
    }

    function slideTouchEventEnd(event){

        positionEndClick = event.changedTouches[0].clientX
        
        if(positionStartClick > positionEndClick){
            direction = "next"
        } else if(positionStartClick < positionEndClick){
            direction = "prev"
        }
    

        if(positionStartClick!= 0) {
            swipeAction()
        }

        positionStartClick = 0
        positionEndClick = 0
    }

    function swipeAction(){

        if(direction === "next"){

            direction = "none"
            nextSlide()
            if (playing){
                clearInterval(slideInterval)
                slideInterval = setInterval(nextSlide,autoplayInterval)
            }
        }else if(direction === "prev"){

            direction = "none"
            prevSlide()
            if (playing){
                clearInterval(slideInterval)
                slideInterval = setInterval(nextSlide,autoplayInterval)
            }
        }

    }

    function init(){

        if(!document.getElementById(sliderID)){
            return
        }

        if(document.getElementById(sliderID).children.length === 2){

            const newSlide1 = document.createElement('img')
            newSlide1.src = document.getElementById(sliderID).children[0].src
            document.getElementById(sliderID).appendChild(newSlide1)

            const newSlide2 = document.createElement('img')
            newSlide2.src = document.getElementById(sliderID).children[1].src
            document.getElementById(sliderID).appendChild(newSlide2)
                
        }

        carouselSliders = document.getElementById(sliderID)
        slidersImg = carouselSliders.children

        carouselSliders.className = "carousel-slider"
  
        slideInterval = setInterval(nextSlide, autoplayInterval)

        counter = {
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

        if(slidersImg.length === 1){

            playing = false
            hideControls = false
            clearInterval(slideInterval)

            slidersImg[counter.getCurrentSlideIndex()].style.transform = "translateX(0)"
            slidersImg[counter.getCurrentSlideIndex()].style.display = "block"

            return

            } else if(slidersImg.length === 0){

                playing = false
                hideControls = false
                clearInterval(slideInterval)

                console.log("Картинок в слайдере нет")
                
                return
            }

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
                    
                if(playing){
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

            })

            carouselSliders.addEventListener('mousedown', slideMouseEventStart)
            carouselSliders.addEventListener('touchstart', slideTouchEventStart)

            document.addEventListener('mouseup', slideMouseEventEnd)
            document.addEventListener('touchend', slideTouchEventEnd)

        
    }
    
    init()
}