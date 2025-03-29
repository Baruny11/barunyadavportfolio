// active hamburger menu
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})



// rotate text js code
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char,i)=>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("");


// switch between about buttons

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    contents.forEach(content => content.style.display = 'none');
    contents[index].style.display = 'block';
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});



// portfolio fillter

var mixer = mixitup('.portfolio-gallery',{
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});


// Initialize swiperjs

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },

    breakpoints: {
        576:{
            slidesPerView:2,
            spaceBetween:10,
        },
        1200:{
            slidesPerView:3,
            spaceBetween:20,
        },
    }
  });



//   skill Progress bar

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll",()=>{
    if(!skillsPlayed)
    skillsCounter();
})


function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight)return true;
    return false;
}

function updateCount(num,maxNum){
    let currentNum = +num.innerText;

    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(()=>{
            updateCount(num,maxNum)
        },12)
    }
}


let skillsPlayed = false;

function skillsCounter(){
    if(!hasReached(first_skill))return;
    skillsPlayed = true;
    sk_counters.forEach((counter,i)=>{
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target",strokeValue);

        setTimeout(()=>{
            updateCount(counter,target);
        },400)
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}


// side progress bar

let calcScrollValue = ()=>{
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100)/calcHeight);

    if(pos > 100){
        scrollProgress.style.display = "grid";
    }else{
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click",()=>{
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// active menu

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);


// scroll reveal
ScrollReveal({
    distance:"90px",
    duration:2000,
    delay:200,
    // reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });


(function(){
    emailjs.init("CdjfDxmXF1-NMGLUy");
})();

window.onload = function() {
    document.getElementById("contactForm").onsubmit = function(event) {
        event.preventDefault();
        sendmail();
    };
};

function sendmail() {
    let parms = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    console.log("Parameters being sent: ", parms);

    emailjs.send("service_k8wn32t", "template_uhrlsf8", parms)
    .then(() => {
        alert(`Dear.${parms.firstname}! ,Thanks for your valuable message!`);
    })
    .catch(error => {
        console.error("Error sending email: ", error);
        alert(`Sorry.${parms.firstname}! , Please try again !`);
    });
}

// Function to show a styled alert message
function showStyledAlert(message, type) {
    let alertDiv = document.createElement("div");
    alertDiv.textContent = message;

    // Apply base styles
    alertDiv.style.position = "fixed";
    alertDiv.style.bottom = "20px";
    alertDiv.style.right = "20px";
    alertDiv.style.padding = "10px 20px";
    alertDiv.style.borderRadius = "5px";
    alertDiv.style.fontFamily = "Arial, sans-serif";
    alertDiv.style.fontSize = "14px";
    alertDiv.style.zIndex = "1000";
    alertDiv.style.color = "white";
    alertDiv.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
    alertDiv.style.transition = "opacity 0.5s ease-in-out";

    // Apply styles based on the type of message (success or error)
    if (type === "success") {
        alertDiv.style.backgroundColor = "#4CAF50"; // Green for success
    } else if (type === "error") {
        alertDiv.style.backgroundColor = "#F44336"; // Red for error
    }

    // Add the alert to the document
    document.body.appendChild(alertDiv);

    // Automatically remove the alert after 2 seconds
    setTimeout(() => {
        alertDiv.style.opacity = "0"; // Fade out effect
        setTimeout(() => {
            alertDiv.remove(); // Remove completely after fade out
        }, 500); // Wait for fade-out transition
    }, 2000); // 2000ms = 2 seconds
}

// Example Usage
document.getElementById("contactForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent page refresh

    let firstName = document.getElementById("firstname").value;

    // Show the alert with a custom message
    showAutoDisappearAlert(`Thanks for your valuable message, ${firstName}!`);

    // Proceed with sending the email
    sendmail();
};
