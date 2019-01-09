import {orderTableDefaultLayout} from './config'

export default class filter{
    constructor(){        
        this.$checkboxList = document.querySelectorAll('.check input[type="checkbox"]')                      
        
        // checkbox篩選表格顯示
        for(let i = 0; i<this.$checkboxList.length; i++){
            this.$checkboxList[i].addEventListener('click', (e)=>{
                e.stopPropagation()
                let _id = e.target.id
                let checked = e.target.checked
                let removeObjClass = `.js-${_id}`
                
                let $thisTh = document.querySelector(`th${removeObjClass}`)  // chekbox點擊時的對應表格標頭
                let $othrThArr = this.siblingElem($thisTh)  // 其餘的表格標頭                
                let $nowCheckedArr = this.nowChecked(true);   // 當下有checked的項目  
                let nowCheckedNum = $nowCheckedArr.length;  // 當下有checked項目的數量           
                let $nowNoCheckedArr = this.nowChecked(false);  // 當下沒checked的項目                              
                let nowEmptyWidth = 0;  // 計算被隱藏項目的寬度，每次點擊都先歸0                
                
                if($nowNoCheckedArr !== []){
                    $nowNoCheckedArr.forEach(item => {                    
                        let mapItem = item.id                    
                        nowEmptyWidth += parseInt(orderTableDefaultLayout[mapItem])
                    })
                }                                

                // 所有class 與 removeObjClass 相符的，都要隱藏或出現
                if(!checked){                                        
                    for(let i = 0; i<document.querySelectorAll(removeObjClass).length; i++){                    
                        document.querySelectorAll(removeObjClass)[i].style.display = 'none'
                    }                    
                }else{
                    for(let i = 0; i<document.querySelectorAll(removeObjClass).length; i++){                    
                        document.querySelectorAll(removeObjClass)[i].style.display = 'table-cell'
                    }
                }   

                // 計算剩餘表格項目的寬度(預設寬度 + 被隱藏項目的總寬度/目前剩餘項目)
                $othrThArr.forEach(item => {                        
                    let mapItem = item.classList.value.split('-').pop()                                                                                   
                    item.style.width = (parseInt(orderTableDefaultLayout[mapItem]) + Math.floor(nowEmptyWidth/nowCheckedNum)) + 'px'                        
                });
            })
        }      
    }   

    nowChecked(bool = true){
        return  Array.prototype.slice.call(this.$checkboxList).filter(item => {
            return bool === true ? item.checked === true : item.checked === false
        })
    }

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
}