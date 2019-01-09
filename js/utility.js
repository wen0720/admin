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

export {
    parentElem,
}