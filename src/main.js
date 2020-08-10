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
    
    
    
    function otherSlidesNone(){
        for(let i = 0; i< slidersImg.length; i++){
            slidersImg[i].style.display = 'none'
        }    
    }
    function getCurrentSlide(n){
        console.log('block');
        slidersImg[n].style.display = 'block'
        let position = slidersImg[n].style.left
        console.log(position); 
        slidersImg[n].style.left = '0'
    }
    function getLeftSlide(n){
        slidersImg[n].style.display = 'block'
        slidersImg[n].style.left = '-800px'
        return slidersImg[n]
    }
    function getRightSlide(n){
        slidersImg[n].style.display = 'block'
        slidersImg[n].style.left = '800px'
        return slidersImg[n]
    }
    carouselSliders.style.overflow = 'hidden'
    
    getCurrentSlide(counter) 
    getLeftSlide(slidersImg.length - 1)
    getRightSlide(counter + 1)

    if (obj.hideControls === false) {
        prevButton.style.display = 'none'
        nextButton.style.display = 'none'
        playButton.style.display = 'none'
    }
    
    prevButton.addEventListener('click', ()=>{
        console.log('prevButton');
        if(counter <= 0){
            console.log('here');
            counter = slidersImg.length - 1
            getCurrentSlide(counter) 
            getLeftSlide(counter - 1)
            getRightSlide(0)
            return
        } 
        otherSlidesNone()
        counter--
        console.log(counter);
        getCurrentSlide(counter)
        if (counter != 0) {
            getLeftSlide(counter - 1)
        } else{
            getLeftSlide(slidersImg.length - 1)
        }
        getRightSlide(slidersImg.length - 1)
    })
    playButton.addEventListener('click', ()=>{
        console.log('playButton');
        
    })
    nextButton.addEventListener('click', ()=>{
        console.log('nextButton');
        if(counter >= slidersImg.length - 1){
            counter = 0
            getCurrentSlide(counter) 
            getLeftSlide(slidersImg.length - 1)
            getRightSlide(counter + 1)
            return
        }
        otherSlidesNone()
        counter++
        console.log(counter);
        getCurrentSlide(counter)
        getLeftSlide(counter - 1)
        if (counter != slidersImg.length - 1) {
            getRightSlide(counter + 1)
        } else{
            getRightSlide(0)
        }
    })
}