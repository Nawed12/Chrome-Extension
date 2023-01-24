
let myLeads=[]

const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
    
}

const tabs=[
    {url:"https://www.linkedin.com/"}
]

tabBtn.addEventListener("click",function(){
    // GRAB the url
    chrome.tabs.query({active:true,currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})
function render(leads){
    let listItems =""
    for(let i=0;i<leads.length;i++){
        // wrap the lead in an achor <a> inside the <li>
       listItems +=`
       <li>
            <a target='_blank'  href='${leads[i]}'>
               ${leads[i]}
            </a>
       </li>`
       
    }
    ulEl.innerHTML=listItems 
    }

// listen for double click on the delete button 
// When clicked,clear localstorage, myLeads and DOM
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads) 
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    // Clear out the input field
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    
})  

