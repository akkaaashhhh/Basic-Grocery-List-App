
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
let grocList = []
const appSetting = {
    databaseURL: "https://basic-app-using-js-default-rtdb.firebaseio.com/"
}

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

const app = initializeApp(appSetting)
const db = getDatabase(app)
const myList = ref(db,"Grocery")


addButtonEl.addEventListener("click",function(){

        let inputValue = inputFieldEl.value
        push(myList,inputValue)
        grocList.push(inputValue)
        clearInput()
        document.getElementById("shopping-list").innerHTML=getList()
})

function getList(){
    let value=""
    for(let i=0;i<grocList.length;i++){
        value+=`<li>${grocList[i]}</li>`
    }
    return value
}

function clearInput(){
    inputFieldEl.value=""
}