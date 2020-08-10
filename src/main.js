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
    slidersImg[getCurrentSlideIndex()].style.display = "block"
    function otherSlidesNone(){
        for(let i = 0; i< slidersImg.length; i++){
            slidersImg[i].style.display = 'none'
        }    
    }
    function getCurrentSlideIndex(){
        console.log('block');
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

    if (obj.hideControls === false) {
        prevButton.style.display = 'none'
        nextButton.style.display = 'none'
        playButton.style.display = 'none'
    }
    
    prevButton.addEventListener('click', ()=>{
        console.log('prevButton');
        if(counter <= 0){
            slidersImg[getLeftSlideIndex()].style.display = "block"
            counter = slidersImg.length - 1
            otherSlidesNone()
            console.log(counter);
            slidersImg[getCurrentSlideIndex()].style.display = "block"
            slidersImg[getLeftSlideIndex()].style.left = "-800px"
            slidersImg[getCurrentSlideIndex()].style.left = "0"
            slidersImg[getRightSlideIndex()].style.display = "800px"
            console.log('current: ', getCurrentSlideIndex())
            console.log('prev: ', getLeftSlideIndex())
            console.log('next: ', getRightSlideIndex())
            return
        } 
        otherSlidesNone() 
        slidersImg[getCurrentSlideIndex()].style.left = "0"
        slidersImg[getLeftSlideIndex()].style.left = "-800px"
        slidersImg[getRightSlideIndex()].style.left = "800px"
        slidersImg[getLeftSlideIndex()].style.display = "block"
        counter--
        slidersImg[getLeftSlideIndex()].style.left = "-800px"
        slidersImg[getCurrentSlideIndex()].style.left = "0"
        slidersImg[getRightSlideIndex()].style.left = "800px"
        console.log('current: ', getCurrentSlideIndex())
        console.log('prev: ', getLeftSlideIndex())
        console.log('next: ', getRightSlideIndex())
        
    })
    playButton.addEventListener('click', ()=>{
        console.log('playButton');
        
    })
    nextButton.addEventListener('click', ()=>{
        console.log('nextButton');
        if(counter >= slidersImg.length - 1){
            counter = 0
            otherSlidesNone()
            console.log(counter);
            slidersImg[getCurrentSlideIndex()].style.display = "block"
            slidersImg[getLeftSlideIndex()].style.left = "-800px"
            slidersImg[getCurrentSlideIndex()].style.left = "0"
            slidersImg[getRightSlideIndex()].style.display = "800px"
            console.log('current: ', getCurrentSlideIndex())
            console.log('prev: ', getLeftSlideIndex())
            console.log('next: ', getRightSlideIndex())
            return
        }
        otherSlidesNone() 
        slidersImg[getCurrentSlideIndex()].style.left = "0"
        slidersImg[getLeftSlideIndex()].style.left = "-800px"
        slidersImg[getRightSlideIndex()].style.left = "800px"
        slidersImg[getRightSlideIndex()].style.display = "block"
        slidersImg[getRightSlideIndex()].style.transition = "transform 0.5s ease-in-out"
        counter++
        slidersImg[getLeftSlideIndex()].style.left = "-800px"
        slidersImg[getCurrentSlideIndex()].style.transform = "translateX(-800px)"
        slidersImg[getRightSlideIndex()].style.display = "800px"
        console.log('current: ', getCurrentSlideIndex())
        console.log('prev: ', getLeftSlideIndex())
        console.log('next: ', getRightSlideIndex())
    })
}