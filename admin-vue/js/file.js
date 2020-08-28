import { parentElem, changeToArr } from './utility';
import { sizeSort } from './config';
import Swal from 'sweetalert2';

export default class file {
    
    constructor(){        
        if(!document.getElementById('js-file')){
            return;
        }
        this.$dragArea = document.getElementById('js-dragDectect')
        this.$file = document.getElementById('js-file');
        this.$addSpecBtn = document.getElementById('js-addSpec');
        this.$lightbox = document.getElementById('js-lightbox');
        this.$lightboxBg = document.getElementById('js-lightboxBg');
        this.$lightboxClose = document.getElementById('js-lightboxClose');
        this.$addPdtBtn = document.getElementById('js-addPdt');
        this.$specList = document.getElementById('js-specList')
        this.$publishBtn = document.getElementById('js-publishBtn')
        this.$draftBtn = document.getElementById('js-draftBtn')
        // 建立新商品的資料
        this.$pdtTitle = document.getElementById('js-pdtTitle');
        this.$pdtIntro = document.getElementById('js-pdtIntroTxt');
        this.$originPrice = document.getElementById('js-originPrice');
        this.$discount = document.getElementById('js-discount');


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
        
        this.$dragArea.addEventListener('dragover', (e) => {            
            // 因為圖片拉近瀏覽器時，預設會打開新視窗，所以移除預設事件
            e.preventDefault() 
        })

        this.$dragArea.addEventListener('drop', (e) => {            
            // 因為圖片拉近瀏覽器時，預設會打開新視窗，所以移除預設事件
            e.preventDefault()                        

            // 把檔案帶入用FileReader轉base64，在執行createUploadedImg()
            this.addImgOnWeb(e.dataTransfer.files);
        })

        // 增加spec項目
        this.$addSpecBtn.addEventListener('click', (e) => {
            let content = document.getElementById('js-template').content; 

            let clone = document.importNode(content, true); // 要複製一份（原因還不確定
            document.getElementById('js-specList').appendChild(clone);
        })

        // 關閉lightBox
        this.$lightboxClose.addEventListener('click', (e) => {            
            this.changeLightboxStatus(false)
            this.clearAllData();
        })
        
        this.$lightboxBg.addEventListener('click', (e) => {            
            if(e.target.id === "js-lightboxBg"){                
                this.changeLightboxStatus(false)
                this.clearAllData();
            }            
        })

        // 開啟增加產品表單        
        this.$addPdtBtn.addEventListener('click', (e) => {            
            this.changeLightboxStatus(true)
        })        
        
        // 刪除spec項目
        this.$specList.addEventListener('click', function(e){
            e.stopPropagation();            
            if(changeToArr(e.target.classList).some( item => item === 'js-specClose') ){
                let parentSpec = parentElem(e.target, 'js-spec').pop();                
                parentSpec.innerHTML = '';
            }                        
        })

        // 新建產品項目
        this.$publishBtn.addEventListener('click', (e)=> {
            e.stopPropagation();                        

            // 組新產品資料， 回傳data
            let data = this.getNewPdtData();            
            if(!data){ return; }

            // 去處理spec的排序問題，希望由xs => xxL，config中有排序的對照
            let allKindSpecArr = this.sortSpecByConfig(data);            
            
            // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝  資料處理完畢 =================== //

            // 組好所有html
            let tr = this.combinePdtHtml(allKindSpecArr, data, 'published');
            document.getElementById('js-pdtTbody').appendChild(tr);
                        
            // 關閉視窗
            this.changeLightboxStatus(false)     
            
            // 清除資料
            this.clearAllData();
        })

        this.$draftBtn.addEventListener('click', (e)=> {
            e.stopPropagation();                        
            
            let data = this.getNewPdtData();    
            if(!data){ return; }                    
            let allKindSpecArr = this.sortSpecByConfig(data);                                    
            let tr = this.combinePdtHtml(allKindSpecArr, data, 'unpublished');
            
            document.getElementById('js-pdtTbody').appendChild(tr);
                                    
            this.changeLightboxStatus(false)                                          
            this.clearAllData();
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

    changeLightboxStatus(bool){
        if(bool){
            this.$lightbox.classList.add('active')
            this.$lightboxBg.classList.add('active')
        }else{
            this.$lightbox.classList.remove('active')
            this.$lightboxBg.classList.remove('active')
        }        
    }

    getNewPdtData(){
        let pdtTitle =  this.$pdtTitle.value.trim();
        let originPrice =  this.$originPrice.value;
        let discount =  this.$discount.value;                    
        let imgPreview = document.querySelector('#js-uploaded > li > img');  // 新增後的預覽圖片，預設上傳第一張        

        if(!pdtTitle || !originPrice || !discount || !imgPreview){
            Swal({
                title: 'Ooooooooops',
                text: '尚有項目沒有填完哦',
                type: 'error',                    
            })
            return
        }

        let allSize = changeToArr(document.querySelectorAll('.js-size'))
        let allSizeData = []
        let allColor = changeToArr(document.querySelectorAll('.js-color'))
        let allColorData = []
        let allInventory = changeToArr(document.querySelectorAll('.js-inventory'))
        let allInventoryData = []

        allSize.forEach(item => { allSizeData.push(item.value) });
        allColor.forEach(item => { allColorData.push(item.value.trim()) });
        allInventory.forEach(item => { allInventoryData.push(item.value) });            

        let data = {
            title: pdtTitle,
            originPrice: '$' + Number(originPrice).toFixed(0).replace(/\d(?=(\d{3}))/g, '$&,'),
            discount: '$' + Number(discount).toFixed(0).replace(/\d(?=(\d{3}))/g, '$&,'),
            img: imgPreview.src,
            spec: {}
        };
        
        
        // 處理spec的資料，allSize.length 是隨意用的，反正大家資料長度都一樣
        for (let i=0; i<allSize.length; i++){                   
            
            if(!allSizeData[i]){
                Swal({
                    title: 'Ooooooooops',
                    text: '請將所有尺寸填寫完成',
                    type: 'error',                    
                })
                return
            }else if(!allColorData[i]){
                Swal({
                    title: 'Ooooooooops',
                    text: '請將所有顏色填寫完成',
                    type: 'error',                    
                })
                return
            }else if(!allInventoryData[i]){
                Swal({
                    title: 'Ooooooooops',
                    text: '請將所有數量填寫完成',
                    type: 'error',                    
                })
                return
            }                

            // 如果一開始不在spec 的key中，加1個新key，並加新資料
            if(Object.keys(data.spec).indexOf(allSizeData[i]) === -1){
                data.spec[allSizeData[i]] = [{    
                    color: allColorData[i],
                    inventory: allInventoryData[i],      
                }]
            }else{  // 如果就在spec 的key中，只加新資料
                data.spec[allSizeData[i]].push({    
                    color: allColorData[i],
                    inventory: allInventoryData[i],      
                })
            }
        }

        return data
    }

    sortSpecByConfig(data){
        let allKindSpecArr = Object.keys(data.spec)     
        let sortAllKindSpecArr = allKindSpecArr.map((item) => {
            return `${sizeSort[item]}-${item}`
        })

        sortAllKindSpecArr.sort((a, b) => parseInt(a)- parseInt(b))
        allKindSpecArr = sortAllKindSpecArr.map((item) => {
            return item.split('-').pop()
        })

        return allKindSpecArr;
    }

    combinePdtHtml(allKindSpecArr, data, status){
        let html
        let specHtml
        let nowPdtNum = document.querySelectorAll('#js-pdtTbody > tr').length
        let specContent = ``       
        let btnStatusTxT = status.toUpperCase();                             
        allKindSpecArr.forEach(item => {                
            let title = `<li><p>${item}</p></li>`
            let sizeColorHtml = ''
            let sizeInventoryHtml = ''
            data.spec[item].forEach(item => {
                sizeColorHtml += `<p>${item['color']}</p>`
                sizeInventoryHtml += `<p>${item['inventory']}</p>`
            })
            let itemHtml = `<li><ul>${title}<li>${sizeColorHtml}</li><li>${sizeInventoryHtml}</li></ul></li>`
            specContent += itemHtml;
        })
        specHtml = `<ul class="tdlist">${specContent}</ul>`
                    

        html = `
                <td>                                
                    <div class="check__txt">
                        <input type="checkbox" id="pd0${nowPdtNum + 1}" name="pd0${nowPdtNum + 1}" value="" />
                        <label for="pd0${nowPdtNum + 1}"><span class="bg-light"></span>
                        <div class="previewImg" style="background: url('${data.img}') no-repeat;background-size: cover;"></div>
                            <p>${data.title}</p>
                        </label>
                    </div>                                                                
                </td>
                <td><p>${data.originPrice}</p></td>
                <td><p>${data.discount}</p></td>
                <td colspan="3">${specHtml}</td>                                                                                                             
                <td class="bottom">
                    <div class="btn ${status} js-menu">
                        <span class="js-menuTxt">${btnStatusTxT}</span>                                    
                        <div class="triDown light"></div>
                        <ul class="menubox ulli left">                                        
                            <li>PUBLISHED</li>
                            <li>UNPUBLISHED</li>                                                                                
                        </ul>
                    </div>
                </td>
                `
        let tr = document.createElement('tr')                    
        tr.innerHTML = html;
        tr.classList.add('js-tr');
        if(status) tr.classList.add(status);

        return tr
    }    

    clearAllData(){
        document.getElementById('js-uploaded').innerHTML = '';
        this.$pdtTitle.value = '';
        this.$pdtIntro.value = '';
        this.$originPrice.value = '';
        this.$discount.value = '';

        // 直接重產一個spec
        document.getElementById('js-specList').innerHTML = '';
        let content = document.getElementById('js-template').content; 
        let clone = document.importNode(content, true); // 要複製一份（原因還不確定
        document.getElementById('js-specList').appendChild(clone);
    }
}