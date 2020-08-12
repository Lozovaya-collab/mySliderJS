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
            if (counter.value === 0){
                counter.value = slidersImg.length - 1
                return counter.value
            }else{
                counter.value = counter.value - 1
            } 
            return counter.value
        },
        getCurrentSlideIndex(){
            return counter.value
        },
        next(){
            if (counter.value === slidersImg.length - 1){
                counter.value = 0
            }
            else{
                counter.value = counter.value + 1
            } 
            return counter.value
        },
        getRightSlideIndex(){
            let currentValue = counter.value
            let nextValue = counter.value + 1
            if(currentValue === slidersImg.length - 1){
                nextValue = 0
            }
            return nextValue
        },
        getLeftSlideIndex(){
            let currentValue = counter.value
            let prevValue = counter.value - 1
            if(currentValue === 0){
                prevValue = slidersImg.length - 1
            }
            return prevValue
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

    function showSlides(){
        hideAll()

        slidersImg[counter.getCurrentSlideIndex()].style.left = "0"
        slidersImg[counter.getCurrentSlideIndex()].style.display = "block"
        slidersImg[counter.getCurrentSlideIndex()].style.transform = "none"

        slidersImg[counter.getLeftSlideIndex()].style.left = "-800px"
        slidersImg[counter.getLeftSlideIndex()].style.display = "block"
        slidersImg[counter.getLeftSlideIndex()].style.transform = "none"

        slidersImg[counter.getRightSlideIndex()].style.left = "800px"
        slidersImg[counter.getRightSlideIndex()].style.display = "block"
        slidersImg[counter.getRightSlideIndex()].style.transform = "none"
    }

    showSlides()
    
    prevButton.addEventListener('click', ()=>{
        console.log('prevButton');
        prevSlide()

        if (playing){
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide, autoplayInterval)
        }
    })

    playButton.addEventListener('click', ()=>{
        console.log('playButton');
        console.log(playing);
        if(playing){
            console.log('pause')
            pauseShow()
        }
        else{
            playShow()
        }
    })

    function pauseShow() {
        playButton.innerHTML = "&#9658;"
        playing = false;
        clearInterval(slideInterval);
    }
     
    function playShow() {
        playButton.innerHTML = "||"
        playing = true;
        slideInterval = setInterval(nextSlide,autoplayInterval);
    }
    nextButton.addEventListener('click', ()=>{
        console.log('nextButton');
        nextSlide()
        if (playing){
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide,autoplayInterval)
        }
    })

    function prevSlide(){
        showSlides()

        prevButton.disabled = true
        nextButton.disabled = true

        counter.prev()

        slidersImg[counter.getRightSlideIndex()].style.transform = "translateX(800px)"

        slidersImg[counter.getCurrentSlideIndex()].style.transform = "translateX(800px)"

        slidersImg[counter.getLeftSlideIndex()].style.transform = "translateX(800px)"
        slidersImg[counter.getLeftSlideIndex()].style.display = "none"

    }

    function nextSlide(){
        showSlides()

        prevButton.disabled = true
        nextButton.disabled = true
        
        counter.next()
        
        slidersImg[counter.getLeftSlideIndex()].style.transform = "translateX(-800px)"

        slidersImg[counter.getCurrentSlideIndex()].style.transform = "translateX(-800px)"

        slidersImg[counter.getRightSlideIndex()].style.transform = "translateX(-800px)"
        slidersImg[counter.getRightSlideIndex()].style.display = "none"

        
    }
    
    carouselSliders.addEventListener("transitionend", () => {
        nextButton.disabled = false
        prevButton.disabled = false
    });

    carouselSliders.addEventListener('mousedown', slideEventStart)
    //carouselSliders.addEventListener('touchstart', slideEventStart)

    carouselSliders.addEventListener('mouseup', slideEventEnd)
    //carouselSliders.addEventListener('touchend', slideEventEnd)

    function slideEventStart(){
        let imageLeft = carouselSliders.getBoundingClientRect().left
        console.log(imageLeft);
        console.log(event.clientX);
        positionClick = event.pageX - imageLeft
    }

    function slideEventEnd(){
        console.log('end');
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