import { parentElem } from './utility'

export default class file {
    
    constructor(){        
        
        this.dragArea = document.getElementById('js-dragDectect')
        this.$file = document.getElementById('js-file');
        this.$addSpecBtn = document.getElementById('js-addSpec');
        this.$lightbox = document.getElementById('js-lightbox');
        this.$lightboxBg = document.getElementById('js-lightboxBg');
        this.$lightboxClose = document.getElementById('js-lightboxClose');
        this.$addPdtBtn = document.getElementById('js-addPdt');
        this.$specList = document.getElementById('js-specList')

        this.$file.addEventListener('change', (e) => {                            
            
            this.addImgOnWeb(this.$file.files);

            // let fileNum = this.files.length            
            // let num = 1;
            // if(this.files){                           
            //     for ( ;num <= fileNum; num++ ){
            //     let reader = new FileReader();                                                  
            //     reader.onload = function (e){                                         
            //         _this.createUploadedImg(e.target.result)
            //     }                   
            //     reader.readAsDataURL(this.files[num-1])  // 將檔案轉base 64編碼
            //     }                         
            // }            
        })        
        
        this.dragArea.addEventListener('dragover', (e) => {            
            // 因為圖片拉近瀏覽器時，預設會打開新視窗，所以移除預設事件
            e.preventDefault() 
        })

        this.dragArea.addEventListener('drop', (e) => {            
            // 因為圖片拉近瀏覽器時，預設會打開新視窗，所以移除預設事件
            e.preventDefault()                        

            // 把檔案帶入用FileReader轉base64，在執行createUploadedImg()
            this.addImgOnWeb(e.dataTransfer.files);
        })

        this.$addSpecBtn.addEventListener('click', (e) => {
            let content = document.getElementById('js-template').content; 

            let clone = document.importNode(content, true); // 要複製一份（原因還不確定
            document.getElementById('js-specList').appendChild(clone);
        })

        this.$lightboxClose.addEventListener('click', (e) => {
            this.$lightbox.classList.remove('active')
            this.$lightboxBg.classList.remove('active')
        })

        this.$lightboxBg.addEventListener('click', (e) => {            
            if(e.target.id === "js-lightboxBg"){
                this.$lightbox.classList.remove('active')
                this.$lightboxBg.classList.remove('active')
            }            
        })

        this.$addPdtBtn.addEventListener('click', (e) => {
            this.$lightbox.classList.add('active')
            this.$lightboxBg.classList.add('active')
        })        
        
        this.$specList.addEventListener('click', function(e){
            e.stopPropagation();            
            if(Array.prototype.slice.call(e.target.classList).some( item => item === 'js-specClose') ){
                let parentSpec = parentElem(e.target, 'js-spec').pop();                
                parentSpec.innerHTML = '';
            }                        
        })
    }

    createUploadedImg(src){
        let li = document.createElement('li');            
        let img = document.createElement('img');            
        img.src = src;
        li.appendChild(img);
        document.getElementById('js-uploaded').appendChild(li)
    }

    addImgOnWeb(files){
        let fileNum = files.length            
        let num = 1;        
        if(files){                           
            for ( ;num <= fileNum; num++ ){
                let reader = new FileReader();                                                  
                reader.onload = (e) => {                                         
                    this.createUploadedImg(e.target.result)
                }                   
                reader.readAsDataURL(files[num-1])  // 將檔案轉base 64編碼
            }                         
        }
    }    

    
    
}