// const data={
//     send:true,
//     tasks:["default task"]
// };

// const addUncheckedTasks=(data)=>{
//     data.tasks=[];
//     let elments=document.querySelectorAll(".card");
//     for (i = 1; i < elments.length; i++) {
//         if(elments[i].getAttribute("class")=="cardDeleted"){
//             continue
//         }
//         //TODO: to get the elment text that is not Checked
//         const checked=elments[i].childNodes[1].childNodes[0].childNodes[1].checked;
//         console.log(checked);
//         if(!checked){
//             data.tasks.push(elments[i].childNodes[0].childNodes[0].innerText);
//         }
//     }
// };

// addUncheckedTasks(data);


// module.exports =data;