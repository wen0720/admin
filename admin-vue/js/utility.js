function parentElem(elem, parentClass){
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

function childElem(elem, childClass){
    let _nodes = [],            
        isChildClass
    
        // elem = Array.prototype.slice.call(elem.childNodes)                                    
        elem.forEach((element, idx) => {
            if(element.nodeType === 1){
                let bool = element.classList.value.split(' ').some(item => item === childClass)  // 找此階層的child有沒有我要的class                    
                if(bool) {
                    _nodes.push(elment)
                }
                console.log(bool, element, elem)
            }            
        });                                      
    return _nodes
}

function changeToArr(el){
    return Array.prototype.slice.call(el)
}

export {
    parentElem,
    childElem,
    changeToArr
}

