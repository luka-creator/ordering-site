import {menuArray} from '/data.js'

const menuContainer = document.getElementById('menu')
const orders = []

document.addEventListener('click', e =>{
    if(e.target.dataset.addMenu){
        handleAddMenuClick(e.target.dataset.addMenu)
    }else if(e.target.dataset.removeOrder){
        handleRemoveClick(e.target.dataset.removeOrder)
    }else if(e.target.id === 'complete-order-btn'){
        handleCompleteOrderBtn()
    }
})

document.addEventListener('submit', e=>{
    e.preventDefault()
    handlePayBtn()
})

function handleAddMenuClick(menuId){
    addOrder(menuId)
    renderOrders()
}

function addOrder(menuId){
    const targetedMenuArr = orders.filter(order => order.id === Number(menuId))
    targetedMenuArr.length ? targetedMenuArr[0].quantity++ :
        orders.push({
            id: Number(menuId),
            quantity: 1,
            name: menuArray[menuId].name,
            price: menuArray[menuId].price
        })
}

function renderOrders (menuId){
    const orderedContainer = document.getElementById('ordered-menu')
    
    if(orders.length){
       
        orderedContainer.innerHTML = `
            <h3 class="center">Your Orders</h3>
            ${getOrders()}
            <div class="total-price">
                <h3>Total Price:</h3>
                <div class="order-numbers">
                    $${orders.reduce((total, currentOrder)=> 
                        total + (currentOrder.quantity * currentOrder.price),0)                
                    }
                </div>
            </div>
            <button id="complete-order-btn">Complete Order</button>
        `
    }else{
        orderedContainer.innerHTML = ''
    }
}

function getOrders (){
    return orders.map(order =>`
        <div class="order">
            <div class="order-info">${order.quantity} ${order.name}</div>
            <button class="remove-btn" data-remove-order="${order.id}">remove</button>
            <div class="order-price">$${order.price * order.quantity}</div>
        </div>
    `).join('')
}

function handleRemoveClick(menuId){
  const indexOfEl = orders.findIndex(order => order.id === +menuId)

  if (indexOfEl !== -1) {
    if (orders[indexOfEl].quantity === 1) {
        orders.splice(indexOfEl, 1)
    } else {
            orders[indexOfEl].quantity--
        }
    }
        renderOrders()
}

function handleCompleteOrderBtn(){
    document.getElementById('modal').style.display = 'flex'
}

function handlePayBtn(){
    const getCardForm = document.getElementById('card-form')
    const userformData = new FormData(getCardForm)
    const getUserName = userformData.get('fullName')
    
    document.getElementById('modal').style.display = 'none'
    
    const orderedContainer = document.getElementById('ordered-menu') 
    
    orderedContainer.innerHTML = `
        <div class='final-message'>
            <p>Thanks, ${getUserName} Your order is on its way! 
        </div>
    `
}

function getMenu (arr){
    return arr.map(item => 
    `   <div class="menu-item">
            <p class="emoji">${item.emoji}</p>
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p class="ingredients">${item.ingredients.join(', ')}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button class="add-menu-btn" data-add-menu="${item.id}">+</button>
        </div>
    `).join(' ')
}

menuContainer.innerHTML = getMenu(menuArray)