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
    
    
    function getCurrentSlide(){
        console.log('block');
        return counter
        
    }
    function getLeftSlide(){
        if(counter === 0){
            return sliderID.length - 1
        }
        else {
            return counter - 1
        }
    }
    function getRightSlide(){
        if(counter === sliderID.length - 1){
            return 0
        }
        else {
            return counter + 1
        }
    }
    carouselSliders.style.overflow = 'hidden'
    console.log(sliderID.length - 1)
    console.log('current: ', getCurrentSlide())
    console.log('prev: ', getLeftSlide())
    console.log('next: ', getRightSlide())

    if (obj.hideControls === false) {
        prevButton.style.display = 'none'
        nextButton.style.display = 'none'
        playButton.style.display = 'none'
    }
    
    prevButton.addEventListener('click', ()=>{
        console.log('prevButton');
        if(counter <= 0){
            console.log('here');
            slidersImg[counter].style.display = 'none'
            counter = slidersImg.length - 1
            slidersImg[counter].style.display = 'block'
            console.log('current: ', getCurrentSlide())
            console.log('prev: ', getLeftSlide())
            console.log('next: ', getRightSlide())
            return
        } 
        slidersImg[counter].style.display = 'none'
        counter--
        slidersImg[counter].style.display = 'block'
        console.log('current: ', getCurrentSlide())
        console.log('prev: ', getLeftSlide())
        console.log('next: ', getRightSlide())
        
    })
    playButton.addEventListener('click', ()=>{
        console.log('playButton');
        
    })
    nextButton.addEventListener('click', ()=>{
        console.log('nextButton');
        if(counter >= slidersImg.length - 1){
            slidersImg[counter].style.display = 'none'
            counter = 0
            slidersImg[counter].style.display = 'block'
            console.log('current: ', getCurrentSlide())
            console.log('prev: ', getLeftSlide())
            console.log('next: ', getRightSlide())
            return
        }
        slidersImg[counter].style.display = 'none'
        counter++
        slidersImg[counter].style.display = 'block'
        console.log('current: ', getCurrentSlide())
        console.log('prev: ', getLeftSlide())
        console.log('next: ', getRightSlide())
    })
}