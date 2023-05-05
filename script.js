console.log("OK");
let userIP ="";
const token = "fa33fdbd9827a7";
var apiData=[];
let pdata=[];

// 
const getDataBtn = document.getElementById("getData");
const mainContainer = document.getElementById("main-container");
getDataBtn.addEventListener("click",getDataFromApi)

function getIpAddress() {
    // console.log("Ok");
    $.getJSON("https://api.ipify.org?format=json", function(data) {
         
    // Setting text of element P with id gfg
    userIP = data.ip;
    // console.log(userIP);
})
    
}

getIpAddress();

async function getDataFromApi() {
    
    getDataBtn.style.display = "none";
    mainContainer.style.display = "block";
    // console.log(userIP);
    
    const url = `https://ipinfo.io/${userIP}/geo?token=${token}`;
    const res = await fetch(url);
    apiData = await res.json();
    // console.log(apiData);
    getPostalCode();
}

// getDataFromApi();
// console.log(apiData);
async function getPostalCode(){
    const postalCode = apiData.postal;
    console.log(apiData.loc);
    console.log(postalCode);
    const response = await fetch(`https://api.postalpincode.in/pincode/${postalCode}`);
    const data = await response.json();
    // console.log(pdata);
    pdata = data[0];
    // console.log(pdata[0].PostOffice);
    // console.log("pdata",pdata);
  
    showData();

}

function showData() {
    const location = apiData.loc;
    const lat = document.getElementById("lat");
    const long = document.getElementById("long");
    const city = document.getElementById("city");
    const region = document.getElementById("region");
    const organization = document.getElementById("organization");
    const hostname = document.getElementById("hostname");

    lat.innerText = location.split(",")[0];
    long.innerText = location.split(",")[1];
    city.innerText = apiData.city;
    region.innerText = apiData.region;
    organization.innerText = apiData.org;
    hostname.innerText = apiData.hostname;

    const map = document.getElementById("map");

    map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${location}&z=15&output=embed" width="100%" height="50%" frameborder="0" style="border:0"></iframe>`

    let datetime_str = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    const  dataContainer = document.getElementById("dataContainer");
    const postOffices = pdata.PostOffice;
    const postnames = [];
    const postBranch=[];
    // postOffices.forEach(el => {
    //     postnames.push(el.Name);
    //     postBranch.push(el.BranchType);
    // })
    // console.log(postnames,postBranch);
    postOffices.forEach(element => {

        dataContainer.innerHTML +=`<div class="card">
        <p>Name :<span>${element.Name}</span></p>
        <p>Branch Type : <span>${element.BranchType}</span></p>
        <p>Delivery Status : <span>${element.DeliveryStatus}</span></p>
        <p>District : <span>${element.District}</span></p>
        <p>Division : <span>${element.Division}</span></p>
    </div>`;
        // console.log( "main",element.Name);
    });
    // console.log( "main",postOffices);

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input",searchData);

    function searchData() {
        const searchValue = document.getElementById("search").value;
        var newArr = postOffices.filter((element) =>
          element.Name.toLowerCase().includes(searchValue.trim().toLowerCase())
        );

        dataContainer.innerHTML = '';
        newArr.forEach(element => {

            dataContainer.innerHTML +=`<div class="card">
            <p>Name :<span>${element.Name}</span></p>
            <p>Branch Type : <span>${element.BranchType}</span></p>
            <p>Delivery Status : <span>${element.DeliveryStatus}</span></p>
            <p>District : <span>${element.District}</span></p>
            <p>Division : <span>${element.Division}</span></p>
        </div>`;
            
        });

    }


    document.getElementById("timeZone").innerText = apiData.timezone;
    document.getElementById("dnt").innerText = datetime_str;
    document.getElementById("pincode").innerText = apiData.postal;
    document.getElementById("msg").innerText =pdata.Message;
    
    
}

