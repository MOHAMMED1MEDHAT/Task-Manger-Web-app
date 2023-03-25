const email=document.getElementById("email");
const password=document.getElementById("password");
const register_btn=document.getElementById("login");

const sendData=async(url="",data={},newUrl="")=>{
    await fetch(url,{
        method:"POST",
        headers:{

            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    }).then((response) =>response.json())
    .then((data) => {
        console.log("Success:", data);
        if(data.status=="Ok"){
            window.location.assign(newUrl);
        }else{
            console.log(data.status);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    // alert(response.json());
}

register_btn.addEventListener("click",(event)=>{
    const url=window.location.href
    const newUrl="http://localhost:3000/"

    console.log(email.value,password.value);

    sendData(url,{
        email:email.value,
        password:password.value
    },newUrl);
    // console.log(window.location.hre);
})