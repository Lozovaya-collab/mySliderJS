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
        function currentSlideBlock(n){
            
            slidersImg[n].style.display = 'block'
            
            
        }
        otherSlidesNone()
        currentSlideBlock(counter) 
        if (obj.hideControls === false) {
            prevButton.style.display = 'none'
            nextButton.style.display = 'none'
            playButton.style.display = 'none'
        }
        
        prevButton.addEventListener('click', ()=>{
            console.log('prevButton');
            if(counter <= 0){
                otherSlidesNone()
                counter = slidersImg.length - 1
                currentSlideBlock(counter)
                return
            } 
            otherSlidesNone()
            counter--
            currentSlideBlock(counter)
            
            
            
        })
        playButton.addEventListener('click', ()=>{
            console.log('playButton');
            
        })
        nextButton.addEventListener('click', ()=>{
            console.log('nextButton');
            if(counter >= slidersImg.length - 1){
                otherSlidesNone()
                counter = 0
                currentSlideBlock(counter)
                return
            }
            otherSlidesNone()
            counter++
            currentSlideBlock(counter)
        })
    
}