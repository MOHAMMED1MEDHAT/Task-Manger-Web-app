// const newUrl="http://127.0.0.1:5500/public/index.html"

const email=document.getElementById("email");
const password=document.getElementById("password");
const register_btn=document.getElementById("register");

const sendData=async(url="",data={})=>{
    await fetch(url,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    }).then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    // alert(response.json());
}

register_btn.addEventListener("click",(event)=>{
    const url=window.location.href
    const newUrl="http://localhost:3000/login"

    console.log(email.value,password.value);

    sendData(url,{
        email:email.value,
        password:password.value
    });
    // console.log(event);
    window.location.assign(newUrl);
    // console.log(window.location.hre);
})