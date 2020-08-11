function SliderJS(sliderID, arguments){
    console.log('function');
    let prevButton = document.createElement("button");
    prevButton.innerText = '<';
    document.body.appendChild(prevButton);
    let playButton = document.createElement("button");
    playButton.innerText = '||';
    document.body.appendChild(playButton);
    let nextButton = document.createElement("button");
    nextButton.innerText = '>';
    document.body.appendChild(nextButton);
    let carouselSliders = document.querySelector(sliderID)
    let slidersImg = document.querySelectorAll(sliderID +' img')
    let size = slidersImg[0].clientWidth
    let obj = arguments
    let counter = 0
    let hideButtons = obj.hideControls
    let autoplayInterval = obj.autoplayInterval
    let slideInterval = setInterval(nextSlide, autoplayInterval)
    let playing = obj.playing

    function hideAll(){
        for(let i = 0; i< slidersImg.length; i++){
            slidersImg[i].style.display = 'none'
        }    
    }

    function showSlides(){
        hideAll()

        slidersImg[getCurrentSlideIndex()].style.left = "0"
        slidersImg[getCurrentSlideIndex()].style.display = "block"
        slidersImg[getCurrentSlideIndex()].style.transform = "none"

        slidersImg[getLeftSlideIndex()].style.left = "-800px"
        slidersImg[getLeftSlideIndex()].style.display = "block"
        slidersImg[getLeftSlideIndex()].style.transform = "none"

        slidersImg[getRightSlideIndex()].style.left = "800px"
        slidersImg[getRightSlideIndex()].style.display = "block"
        slidersImg[getRightSlideIndex()].style.transform = "none"
    }
    showSlides()
    function getCurrentSlideIndex(){
        return counter
    }
    function getLeftSlideIndex(){
        if(counter === 0){
            return slidersImg.length - 1
        }
        else {
            return counter - 1
        }
    }
    function getRightSlideIndex(){
        if(counter === slidersImg.length - 1){
            return 0
        }
        else {
            return counter + 1
        }
    }

    carouselSliders.style.overflow = 'hidden'

    if (hideButtons === false) {
        prevButton.style.display = 'none'
        nextButton.style.display = 'none'
        playButton.style.display = 'none'
    }
    
    prevButton.addEventListener('click', ()=>{
        console.log('prevButton');
        showSlides()
        prevButton.disabled = true
        nextButton.disabled = true
        if(counter <= 0){
            counter = slidersImg.length - 1

            slidersImg[getLeftSlideIndex()].style.left = "-800px"
            slidersImg[getLeftSlideIndex()].style.display = "block"

            slidersImg[getCurrentSlideIndex()].style.transform = "translateX(800px)"

            slidersImg[getRightSlideIndex()].style.left = "800px"
            slidersImg[getRightSlideIndex()].style.display = "none"
            return
        } 
        counter--

        slidersImg[getRightSlideIndex()].style.left = "800px"
        slidersImg[getRightSlideIndex()].style.display = "none"

        slidersImg[getCurrentSlideIndex()].style.transform = "translateX(800px)"

        slidersImg[getLeftSlideIndex()].style.left = "-800px"
        slidersImg[getLeftSlideIndex()].style.display = "block"

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

    function nextSlide(){
        showSlides()
        prevButton.disabled = true
        nextButton.disabled = true
        if(counter >= slidersImg.length - 1){
            counter = 0
            
            slidersImg[getLeftSlideIndex()].style.left = "-800px"
            slidersImg[getLeftSlideIndex()].style.display = "none"

            slidersImg[getCurrentSlideIndex()].style.transform = "translateX(-800px)"

            slidersImg[getRightSlideIndex()].style.left = "800px"
            slidersImg[getRightSlideIndex()].style.display = "block"
            return
        }
        counter++

        slidersImg[getLeftSlideIndex()].style.left = "-800px"
        slidersImg[getLeftSlideIndex()].style.display = "none"

        slidersImg[getCurrentSlideIndex()].style.transform = "translateX(-800px)"

        slidersImg[getRightSlideIndex()].style.left = "800px"
        slidersImg[getRightSlideIndex()].style.display = "block"
    }
    carouselSliders.addEventListener("transitionend", () => {
        nextButton.disabled = false
        prevButton.disabled = false
    });
}