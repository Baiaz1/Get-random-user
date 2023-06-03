const user_container = document.getElementById('user-container')
const btn = document.getElementById('btn')
const bluredEl = document.querySelector('#bluredEl')

const getUsers = () => {
    fetch('https://nurbolot.pythonanywhere.com/api/users/')
    .then(res => res.json())
    .then(data => {
        users = data
        console.log(users);
        for(let user of users){
            createUserCard(user)
        }
    })
}

function pickRandomTag(){
    const usersM = document.querySelectorAll('.small-user')
    let users = [...usersM]
    let user =  users[Math.floor(Math.random() * users.length)]
    return user
}

btn.addEventListener('click', randomSelect)












































// -------------------------------------------------------------------


function highlightTag(tag){
    tag.classList.add('highlight')
}

function unHighlightTag(tag){
    tag.classList.remove('highlight')
}

getUsers()

const createUserCard = (user) => {  
    const img = user.user_image
    const getName = user.user_name.split(' ')[0]
    const id = user.user_id
    const userEl = document.createElement('div')
    userEl.id = id
    userEl.classList.add('user')

    let userInnerHTML = `
        <div class="img-container">
            <img src=${img}>
        </div>
        <div class="info">
            <h3 class="name">${getName}</h3>
        </div>
    `
    userEl.innerHTML = userInnerHTML
    user_container.appendChild(userEl)
}

const createSmallUser = (user) =>{
    const userEl = document.createElement('div')
    const img = user.user_image
    const getName = user.user_name
    const id = user.user_id
    userEl.classList.add('small-user')
    let name = getName.split(' ')[0]

    let userInnerHTML = `
        <div id=${id} class="user-img-container">
            <img src=${img}>
        </div>
        <div class="user-info">
            <h3 class="name">${name}</h3>
        </div>
    `
    userEl.innerHTML = userInnerHTML
    user_container.appendChild(userEl)
}

let users = []
let count = 0
let allWinners = []

function randomSelect(){
    user_container.replaceChildren()
    bluredEl.classList.remove('bluredEl')
    const btn = document.querySelector('.repeatButton')
    const mBtn = document.querySelector('#btn')
    if(btn !== null){
        document.body.removeChild(btn)
    }
    if(mBtn !== null){
        document.body.removeChild(mBtn)
    }

    const userCard = document.querySelectorAll('.user')

    for(let user of userCard){
        user.remove()
    }

    for(let user of users){
        createSmallUser(user)
    }

    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()
        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        },250)
    }, 250);

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            let randomTag = pickRandomTag()

            createWinner(randomTag.firstElementChild)
            const reBtn = document.createElement('button')
            bluredEl.classList.add('bluredEl')
            reBtn.classList.add('repeatButton')

            if(count === 2){
                reBtn.textContent = 'FINISH'
                reBtn.addEventListener('click', () => {showAllWinners()})
            }else{
                reBtn.textContent = 'GET ANOTHER USER'
                reBtn.addEventListener('click', () => {
                    deleteUser(randomTag.firstElementChild)
                })
            }
            setTimeout(() => {
                if(users.length > 1){
                    document.body.appendChild(reBtn)
                }
            }, 1500)
            count = count + 1   
        }, 100)
    }, times * 250)
}

function showAllWinners(){
    user_container.replaceChildren()
    document.body.removeChild(document.querySelector('.repeatButton'))
    document.body.removeChild(document.body.firstElementChild)
    const getWinners = document.createElement('div')
    getWinners.classList.add('winners')

    let userInnerHTML = `
    <h2>ПОБЕДИТЕЛИ</h2>
    <div class='winners-firstPlace'>
            <div class="img-container img-winner">
                <img src=${allWinners[2].user_image}>
            </div>
            <div class="info info-winner">
                <h3 class="name">${allWinners[2].user_name}</h3>
            </div>
    </div>

    <div class='winners-second'>
        <div class='winner-card'>
            <div class="img-container img-winner">
                <img src=${allWinners[1].user_image}>
            </div>
            <div class="info info-winner">
                <h3 class="name">${allWinners[1].user_name}</h3>
            </div>
        </div>

        <div class='winner-card'>
            <div class="img-container img-winner">
                <img src=${allWinners[0].user_image}>
            </div>
            <div class="info info-winner">
                <h3 class="name">${allWinners[0].user_name}</h3>
            </div>
        </div>
    </div>
    `
    getWinners.innerHTML = userInnerHTML
    user_container.appendChild(getWinners)
}

function deleteUser(randomTag){
    for(let i = 0; i < users.length; i++){
        if(users[i].user_id === randomTag.id){
            users.splice(i, 1)
        }
    }   
    randomSelect()
}

function createWinner(winner){
    const userEl = document.createElement('div')
    let winUser;
    for(let i = 0; i < users.length; i++){
        if(users[i].user_id === winner.id){
            winUser = users[i]
            allWinners.push(winUser)
        }
    }   
    userEl.classList.add('winner')
    userEl.classList.add('user')

    let userInnerHTML = `
        <div class="img-container img-winner">
            <img src=${winUser.user_image}>
        </div>
        <div class="info info-winner">
            <h3 class="name">${winUser.user_name}</h3>
        </div>
    `
    userEl.innerHTML = userInnerHTML
    user_container.appendChild(userEl)
}