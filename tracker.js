let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromStorage = JSON.parse( localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromStorage){
    myLeads = leadsFromStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentwindow: true}, function(tabs){
        console.log("getting here")
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(Leads){
    let listItems = ""
    for (let i = 0; i < Leads.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${Leads[i]}'>
                    ${Leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    
    render(myLeads)
    console.log( localStorage.getItem("myLeads"))
    
})



