
export default class Menu{
    constructor(){        
        const _this = this
        this.isOpen = false;

        this.menuBtn = document.querySelectorAll('.js-menu');        
        this.body = document.querySelector('body');      
        this.menubox = document.querySelectorAll('.menubox');

        // showMenu
        for (let i=0; i< this.menuBtn.length; i++){
            this.menuBtn[i].addEventListener('click', this.showMenu)
        }        

        // closeMenu
        this.body.addEventListener('click', function(){
            if(!document.querySelector('.menubox.active')){
                return;
            }
            _this.ifOneMenuOpen();            
            _this.closeMenu();                        
        });

        // 
        for (let i=0; i< this.menubox.length; i++){
            this.menubox[i].addEventListener('click', function(e){          
                _this.ifOneMenuOpen();      
                let txt = e.target.textContent;                
                let parent = this.parentNode;
                let sib = _this.siblingElem(this);
                let menuTxtItem = sib.filter((item) => {
                    let classArr = Array.prototype.slice.call(item.classList);
                    let menuTxt = classArr.some((item) => {
                        return item === 'js-menuTxt'
                    })
                    return menuTxt;
                })
                menuTxtItem[0].textContent = txt;                
                _this.closeMenu();                  
            })
        }

        
    }

    showMenu(e){        
        e.stopPropagation()     

        let btnChildren = this.children;     
        console.log(e.target)   
        for (let i=0, max=btnChildren.length; i<max; i++){                           
            if(btnChildren[i].nodeName === 'UL' && !( e.target.nodeName === 'LI' ) ) {                                
                console.log('click1')                
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

    closeMenu(e){                               
        if(this.isOpen){                 
            console.log('click2')       
            let openMenu = document.querySelector('.menubox.active');
            openMenu.classList.remove('active');
        }                    
        this.isOpen = false;
    }       

    ifOneMenuOpen(){
        let menuboxAll = document.querySelectorAll('.menubox');
        let arr = Array.from(menuboxAll);
        this.isOpen = arr.some((item) => {
            let classArr = Array.from(item.classList);
            let hasActive = classArr.some((item) =>{ 
                return item === 'active'
            })
            return hasActive
        })        
    }

    replaceWord(){                
        if(this.isOpen){            
            
        }  
    }

    //find siblingElem
    siblingElem(elem) {
        var _nodes = [],
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
}