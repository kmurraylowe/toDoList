const upVote = document.querySelectorAll('#like')
const deleteOneTask = document.querySelectorAll("#delete")
const downVoteOnce = document.querySelectorAll('#dislike')

Array.from(upVote).forEach((ele)=>{
    ele.addEventListener('click', addUpVote)
})

Array.from(deleteOneTask).forEach((ele)=>{
    ele.addEventListener('click', deleteTask)
})

Array.from(downVoteOnce).forEach((ele)=>{
    ele.addEventListener('click', downvote)
})


async function addUpVote(){
    console.log('working')
    const taskS = this.parentNode.childNodes[1].innerText
    const descriptionS = this.parentNode.childNodes[5].innerText
    const likesS = Number(this.parentNode.childNodes[7].innerText)
    try {
        const res = await fetch('addLike', {
            method: 'put',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                'taskS': taskS,
                'descriptionS': descriptionS,
                'likesS': likesS
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.error(err)}
}

async function downvote(){
    
    const taskS = this.parentNode.childNodes[1].innerText
    const descriptionS = this.parentNode.childNodes[5].innerText
    const likesS = Number(this.parentNode.childNodes[7].innerText)
    try {
        const res = await fetch('removeLike', {
            method: 'put',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                'taskS': taskS,
                'descriptionS': descriptionS,
                'likesS': likesS
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.error(err)}
}



async function deleteTask(){
    const taskS = this.parentNode.childNodes[1].innerText
    const descriptionS = this.parentNode.childNodes[5].innerText
    try {
        const res = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskS': taskS,
                'descriptionS': descriptionS    
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.error(err)}
}



