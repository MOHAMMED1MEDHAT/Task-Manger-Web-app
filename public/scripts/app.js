// const addUncheckedTasks=require('./etractTasks')

const url=window.location.href
console.log(url);

//task box initialization
let done=document.getElementById("Done-1");
let checkBox=document.getElementById("checkBox-1");
let add=document.getElementById("Add");
let del=document.getElementById("Delete");
//set the text of the taskbox
let textVal=document.getElementById("text-1");
let txt=document.getElementById("task-1");
let submitTxt=document.getElementById("card-submitTxt-1");



// auto mail sending clint-side code
const data={
    tasks:"default task"
};

const addUncheckedTasks=(data)=>{
    data.tasks=""
    let elments=document.querySelectorAll(".card");
    for (i = 1; i < elments.length; i++) {
        if(elments[i].getAttribute("class")=="cardDeleted"){
            continue
        }
        //TODO: to get the elment text that is not Checked
        const checked=elments[i].childNodes[1].childNodes[0].childNodes[1].checked;
        console.log(checked);
        if(!checked){
            data.tasks+="\n"+elments[i].childNodes[0].childNodes[0].innerText;
        }
    }
    
};

//TODO:finish the mail sending functionallity
const sendmail=(url,data)=>{
    //test
    // console.log(document.cookie.split(";")[1].split("=")[1])
    return fetch(url,{
        method:"POST",
        headers:{
            "x-auth-token":document.cookie.split(";")[1].split("=")[1],
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(response=>{
        return response.json();
    });
};

//TODO:finish the mail sending functionallity
const sendMial=()=>{
    addUncheckedTasks(data);
    console.log(data);
    sendmail("http://localhost:3000/api/sendMail",data).then(data=>{
    console.log(data);
    });
};
//TODO: make time: 6 hours
setInterval(sendMial, 6 * 60 * 60 * 1000);

submitTxt.addEventListener("click",(event)=>{
    let val=textVal.value;
    txt.innerHTML=val;
});

done.onclick=function check(){
    checkBox.checked=!checkBox.checked;
    if(checkBox.checked){
        console.log("Checked");
    }else{
        console.log("UnChecked");
    }
};


//TODO:finish the add functionallity
add.onclick=function add(){
    //get the task number
    let taskList=document.querySelectorAll("figure");

    //figure creation section
    let fig=document.createElement("figure");
    fig.setAttribute("class","card");
    fig.setAttribute("id",`card-${taskList.length-1}`);
    document.body.appendChild(fig);

    //text section craetion
    let div=document.createElement("div");
    div.setAttribute("class","card__title-box");
    fig.appendChild(div);

    let h2=document.createElement("h2");
    h2.setAttribute("class","card__title");
    h2.setAttribute("id",`task-${taskList.length-1}`);
    div.appendChild(h2);

    let input=document.createElement("input");
    input.setAttribute("id",`text-${taskList.length-1}`);
    input.setAttribute("placeholder","Type your task and then click on done.");
    input.setAttribute("type", "text");
    input.setAttribute("size", "90%");
    input.setAttribute("style", "border-color: #00e3ae;");
    h2.appendChild(input);

    //submit buttom section creation
    let a=document.createElement("a");
    a.setAttribute("href","#");
    a.setAttribute("class","card__link");
    a.setAttribute("id",`card-submitTxt-${taskList.length-1}`);
    fig.appendChild(a);

    let buttom=document.createElement("button");
    buttom.setAttribute("id",`Done-${taskList.length-1}`);
    buttom.innerText="Done";
    a.appendChild(buttom);

    let checkBox=document.createElement("input");
    checkBox.setAttribute("id",`checkBox-${taskList.length-1}`,)
    checkBox.setAttribute("type","checkbox");
    buttom.appendChild(checkBox);

    let script=document.createElement("script");
    script.innerHTML=`let done${taskList.length-1}=document.getElementById("Done-"+${taskList.length-1});
                    let checkBox${taskList.length-1}=document.getElementById("checkBox-"+${taskList.length-1});
                    //set the text of the taskbox
                    let textVal${taskList.length-1}=document.getElementById("text-"+${taskList.length-1});
                    let txt${taskList.length-1}=document.getElementById("task-"+${taskList.length-1});
                    let submitTxt${taskList.length-1}=document.getElementById("card-submitTxt-"+${taskList.length-1});
                    submitTxt${taskList.length-1}.addEventListener("click",(event)=>{
                        event.preventDefault();
                        let val${taskList.length-1}=textVal${taskList.length-1}.value;
                        txt${taskList.length-1}.innerHTML=val${taskList.length-1};
                    });
                    done${taskList.length-1}.addEventListener("click",(event)=>{
                        event.preventDefault();
                        checkBox${taskList.length-1}.checked=!checkBox${taskList.length-1}.checked;
                        if(checkBox${taskList.length-1}.checked){
                            console.log("Checked");
                        }else{
                            console.log("UnChecked");
                        }
                    });`;
    fig.appendChild(script);
};


//TODO:finish the Delete functionallity
del.onclick=function del(){
    let elms=document.querySelectorAll(".card");
    console.log(elms);
    for (i = 1; i < elms.length; i++) {
        if(elms[i].innerHTML==``){
            continue
        }
        //TODO: see if the card is checked or not
        let checked=elms[i].childNodes[1].childNodes[0].childNodes[1].checked;
        console.log(checked);
        if(checked){
            // elms[i].innerHTML=``;
            // document.body.removeChild(elms[i].childNodes[0]);
            // document.body.removeChild(elms[i].childNodes[1]);
            elms[i].setAttribute("class","cardDeleted");
        }
    }
};