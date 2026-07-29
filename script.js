const pages = {
    welcome: document.getElementById("welcomePage"),
    question: document.getElementById("questionPage"),
    date: document.getElementById("datePage"),
    success: document.getElementById("successPage"),
    end: document.getElementById("endPage")
};

const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const placeInput = document.getElementById("placeInput");
const customPlace = document.getElementById("customPlace");
const formError = document.getElementById("formError");

let noCount = 0;

let noScale = 1;
let yesScale = 1;

function showPage(page){

    Object.values(pages).forEach(p=>p.classList.remove("active"));
    page.classList.add("active");

}

startBtn.addEventListener("click",()=>{

    showPage(pages.question);

});

yesBtn.addEventListener("click",()=>{

    showPage(pages.date);

});

noBtn.addEventListener("click",noClicked);

function noClicked(){

    noCount++;

    updateButtons();
    moveButton();

    switch(noCount){

        case 1:

            message.innerHTML="یه گزیته دیگه بهتر نیست انتخاب کنی؟ ";
            break;

        case 2:

            message.innerHTML="یه گزینه دیگه هم هستاااا 😂";
            break;

        case 3:

            message.innerHTML=" تورو خداا... ببین اون خوش رنگ تره 🤣";
            break;

        case 4:

            message.innerHTML="😩 قبول نمی‌کنم نه رو!";
            break;

        case 5:

            message.innerHTML="😒 اصلاااااااا";
            break;

        case 6:

            message.innerHTML="نمی خوای اون گزینه رو بزنی، نه؟؟؟ 😕 ";
            break;

        case 7:

            message.innerHTML="هنوزم اگه جوابت از اون نه قاطعانه هاست که خب برای اخرین بار نه رو بزن 😔";
            break;


        case 8:

            message.innerHTML="آقااااا، عه! 😂";
            break;

        case 9:

            message.innerHTML="سعی کردم خلاقیت به خرج بدم خب 😥";
            break; 

        default:

            message.innerHTML=`
                <a href="#" id="realNo">
                  جدی اگه قطعی می خوای بگی نه، اینجا رو بزن. ولی نزن 🙂 
                </a>
            `;

            document.getElementById("realNo").onclick=function(e){

    e.preventDefault();


    fetch("/api/send", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            status: "جدی اگه قطعی می خوای بگی نه، اینجا رو بزن. ولی نزن 🙂"

        })

    });


    showPage(pages.end);

};

            };

    }



function updateButtons(){

    noScale *= 0.72;
    yesScale *= 1.22;

    if(noScale < 0.30)
        noScale = 0.30;

    if(yesScale > 2.5)
        yesScale = 2.5;

    noBtn.style.transform = `scale(${noScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;

}

function moveButton(){

    const margin = 20;

    const yesRect = yesBtn.getBoundingClientRect();

    let x, y;
    let overlap;

    do{

        x = Math.random() * (window.innerWidth - noBtn.offsetWidth - margin);
        y = Math.random() * (window.innerHeight - noBtn.offsetHeight - margin);

        overlap =
            x < yesRect.right + 30 &&
            x + noBtn.offsetWidth > yesRect.left - 30 &&
            y < yesRect.bottom + 30 &&
            y + noBtn.offsetHeight > yesRect.top - 30;

    }while(overlap);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

}

placeInput.addEventListener("change", () => {

    if(placeInput.value === "other"){

        customPlace.style.display = "inline-block";

    }else{

        customPlace.style.display = "none";

        customPlace.value = "";

    }

});


const dateNextBtn = document.getElementById("dateNextBtn");

dateNextBtn.addEventListener("click", () => {

    formError.textContent = "";

    if(dateInput.value === ""){

        formError.textContent = "بدون تاریخ کجا بریم؟ 🥴";

        return;

    }

    if(timeInput.value === ""){

       formError.textContent = "🕒 ساعت؟";

        return;

    }

    if(placeInput.value === ""){

       formError.textContent = "کجا بریممم؟؟؟ 🤔";

        return;

    }

    if(placeInput.value === "other" && customPlace.value.trim() === ""){

        formError.textContent = "کجا بریم؟";

        return;

    }
    const meeting = {

    date: dateInput.value,

    time: timeInput.value,

    place:
        placeInput.value === "other"
        ? customPlace.value
        : placeInput.value

};

console.log(meeting);


fetch("/api/send", {

    method: "POST",

    headers: {

        "Content-Type": "application/json"

    },

    body: JSON.stringify(meeting)

})

.then(response => response.json())

.then(data => {

    console.log("Sent:", data);

    showPage(pages.success);

})

.catch(error => {

    console.error(error);

    alert("یه مشکلی پیش اومد 😅");

});

});

$(document).ready(function () {

    $("#dateInput").persianDatepicker({

        format: "YYYY/MM/DD",

        initialValue: false,

        autoClose: true

    });

});
