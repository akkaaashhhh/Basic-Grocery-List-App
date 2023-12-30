
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSetting = {
    databaseURL: "https://basic-app-using-js-default-rtdb.firebaseio.com/"
}

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

const app = initializeApp(appSetting)
const db = getDatabase(app)
const myList = ref(db,"Grocery")

window.onload = function(){
    UpdateList()
}

addButtonEl.addEventListener("click",function(){

        let inputValue = inputFieldEl.value
        if(inputValue){
            push(myList,inputValue)
            clearInput()
            UpdateList()
        }
})

function UpdateList(){
    const List = ref(db,"Grocery")

    onValue(List,function(snapshot){
        document.getElementById("shopping-list").innerHTML=""
        if(snapshot.exists()){
            let temp = Object.entries(snapshot.val())
            for(let i=0;i<temp.length;i++){
                let CurrentItemID = temp[i][0]
                let CurrentItem = temp[i][1]
                let value = document.createElement("li")
                value.textContent=CurrentItem 
                value.addEventListener("click",function(){
                    let SelectedItem = ref(db, `Grocery/${CurrentItemID}`)
                    remove(SelectedItem)
                })
                document.getElementById("shopping-list").append(value)
            }
        }
        else{
            let EmptyList = document.createElement("p")
            EmptyList.textContent="List Empty"
            EmptyList.className="EmptyListText"
            document.getElementById("shopping-list").append(EmptyList)
        }
    })
}

function clearInput(){
    inputFieldEl.value=""
}