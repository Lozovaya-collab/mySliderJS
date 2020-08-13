function SliderJS(sliderID, arguments){
    console.log('function');
    let carouselSliders = document.querySelector(sliderID)
    let slidersImg = document.querySelectorAll(sliderID +' img')
    let size = slidersImg[0].clientWidth

    let obj = arguments
    let hideButtons = obj.hideControls
    let autoplayInterval = obj.autoplayInterval
    let playing = obj.playing

    let prevButton 
    let playButton
    let nextButton
    addControls()

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

            let currentValue = this.value
            let prevValue = this.value - 1

            if(currentValue === 0){
                prevValue = slidersImg.length - 1
            }

            return prevValue
        },
        getCurrentSlideIndex(){

            return this.value

        },
        getRightSlideIndex(){

            let currentValue = this.value
            let nextValue = this.value + 1

            if(currentValue === slidersImg.length - 1){
                nextValue = 0
            }

            return nextValue
        }    
    }

    function addControls(){

        prevButton = document.createElement("button")
        prevButton.innerText = '<'
        document.body.appendChild(prevButton)

        playButton = document.createElement("button")
        playButton.innerText = '||'
        document.body.appendChild(playButton)

        nextButton = document.createElement("button")
        nextButton.innerText = '>'
        document.body.appendChild(nextButton);
        
        if (hideButtons === false) {
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

    prepareSlides()
    
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

    function pauseShow(){

        playButton.innerHTML = "&#9658;"
        playing = false;
        clearInterval(slideInterval)

    }
     
    function playShow() {

        playButton.innerHTML = "||"
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
    
    carouselSliders.addEventListener("transitionend", () => {

        nextButton.disabled = false
        prevButton.disabled = false

    });

    carouselSliders.addEventListener('mousedown', slideMouseEventStart)
    carouselSliders.addEventListener('touchstart', slideTouchEventStart)

    carouselSliders.addEventListener('mouseup', slideEventEnd)
    carouselSliders.addEventListener('touchend', slideEventEnd)

    function slideMouseEventStart(event){

        event.preventDefault()
        let imageLeft = carouselSliders.getBoundingClientRect().left
        
        positionClick = event.pageX - imageLeft

    }

    function slideTouchEventStart(event){

        let imageLeft = carouselSliders.getBoundingClientRect().left
        
        positionClick = event.changedTouches[0].pageX - imageLeft

    }

    function slideEventEnd(){
        
        if(positionClick >= 400)
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
    
}