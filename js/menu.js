
export default class Menu{
    constructor(){        
        const _this = this
        this.isOpen = false;

        this.menuBtn = document.querySelectorAll('.js-menu');        
        this.body = document.querySelector('body');      
        this.menubox = document.querySelectorAll('.menubox');

        // showMenu
        for (let i=0; i< this.menuBtn.length; i++){
            this.menuBtn[i].addEventListener('click', function(e){                                
                    // .bind(this)(e) 把點擊的物件(this)傳進showMenu裡，並帶事件參數e進去
                if(!_this.isOpen){  // 如果沒有任何menu開啟
                    _this.showMenu.bind(this)(e)  
                    _this.ifOneMenuOpen(); // 有任一menu開啟，this.open = true      
                }                                     
            })                  
        }        

        // body 綁定 closeMenu事件
        this.body.addEventListener('click', function(){            
            if(!document.querySelector('.menubox.active')){
                return;
            }                                 
            _this.closeMenu();                        
        });

        // changeMenuContent
        for (let i=0; i< this.menubox.length; i++){
            this.menubox[i].addEventListener('click', function(e){ 
                e.stopPropagation()                                                                         
                let txt = e.target.textContent;                
                let parent = this.parentNode;
                let sib = _this.siblingElem(this);
                let isBtn = parent.classList.value.split(' ').some(item => item === 'btn')

                let menuTxtItem = sib.filter((item) => {           //抓js-menuTxt         
                    let classArr = Array.prototype.slice.call(item.classList);
                    let menuTxt = classArr.some((item) => {
                        return item === 'js-menuTxt'
                    })
                    return menuTxt;
                })                                                
                            
                
                // change btn & tr status
                if(isBtn){                    
                    let parentTr = _this.parentElem(this,'js-tr').pop();                                            
                    let parentClassArr = parentTr.classList.value.split(' ');
                    let oldStatusIsUnpaid = parentClassArr.some(item => item === 'unpaid')
                    let oldStatusIsDone = parentClassArr.some(item => item === 'done')
                    
                    parent.classList.remove(menuTxtItem[0].textContent.toLowerCase())
                    parent.classList.add(txt.toLowerCase())

                    if(txt.toLowerCase() === 'done'){                                                                                        
                        if(oldStatusIsUnpaid){
                            parentTr.classList.remove('unpaid')
                        }                        
                        parentTr.classList.add('done')
                    }

                    if(txt.toLowerCase() === 'unpaid'){                                                                                      
                        if(oldStatusIsDone){
                            parentTr.classList.remove('done')
                        }                        
                        parentTr.classList.add('unpaid')
                    }

                    if(txt.toLowerCase() === 'shipping' || txt.toLowerCase() === 'paid'){
                        parentTr.classList.remove('done')
                        parentTr.classList.remove('unpaid')
                    }                                                                            
                }

                // change text
                if(menuTxtItem.length) {       
                    if(isBtn){
                        menuTxtItem[0].textContent = txt.toUpperCase();                
                    }else{
                        menuTxtItem[0].textContent = txt;                
                    }                                 
                    _this.closeMenu();                  
                }

            })
        }

        
    }

    showMenu(e){                
        e.stopPropagation()             
        let btnChildren = this.children;     
        // console.log(e.target)           
        for (let i=0, max=btnChildren.length; i<max; i++){                           
            if(btnChildren[i].nodeName === 'UL' && !( e.target.nodeName === 'LI' ) ) {                                                
                let arr = [];
                let likeArr = btnChildren[i].classList;
                for (let x=0; x<likeArr.length; x++){
                    arr.push(likeArr[x])                    
                }          

                let isMenu = arr.some( (item) => item === 'menubox' )
                let isActive = arr.some( (item) => item === 'active' )
                if(!isActive && isMenu)  btnChildren[i].classList.add('active')                                    
            }            
        }                        
    }

    closeMenu(){                               
        if(this.isOpen){                             
            console.log('click2')       
            let openMenu = document.querySelector('.menubox.active');
            openMenu.classList.remove('active');
            this.isOpen = false;
        }                            
    }       

    ifOneMenuOpen(){        
        if(!document.querySelectorAll('.menubox.active').length) return
        this.isOpen = true        
    }    

    // *******  Utilities *********** //


    //find siblingElem
    siblingElem(elem) {
        let _nodes = [],
            //把elem 另外先存在_elem 
            _elem = elem;
            //elem的前一個node存在的話 
        while ((elem = elem.previousSibling)) {
            if (elem.nodeType === 1) {
                _nodes.push(elem);
            }
        }
            //把elem帶回來
        elem = _elem;
            //elem的後一個node存在的話
        while ((elem = elem.nextSibling)) {
            if (elem.nodeType === 1) {
                _nodes.push(elem);
            }
        }
        return _nodes;
    }

    // find parentNode
    /**** 
     * {
     *  elem: 當下的元素
     *  parentClass: 想要找到的父層class
     * }
    */
    parentElem(elem, parentClass){
        let _nodes = [],            
            isParentClass

        do{
            elem = elem.parentNode
            _nodes.push(elem)
            isParentClass = elem.classList.value.split(' ').some(item => {
                return item === parentClass
            })                
        }while(!isParentClass)        

        return _nodes
    }
}