//to update the time every second
function updateTime(){
    let today = new Date();
    let timeAndDate = today.toLocaleString();
    document.getElementById("dateAndTime").innerHTML = timeAndDate;
}
setInterval(updateTime, 1000);
