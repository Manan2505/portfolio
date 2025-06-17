const navLinks=document.querySelectorAll('header nav a');
const logoLink=document.querySelector('.logo')
const sections=document.querySelectorAll('section');
const menuIcon=document.querySelector('#menu-icon')
const navbar=document.querySelector('header nav')
menuIcon.addEventListener('click',()=>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active')
})
const activePage=()=>{
    const header=document.querySelector('header');
    const barsBox=document.querySelector('.bars-box');
    header.classList.remove('active');
    setTimeout(()=>{
        header.classList.add('active');
    },1100)
    navLinks.forEach(link=>{
        link.classList.remove('active');
    })
    barsBox.classList.remove('active');
    setTimeout(()=>{
        barsBox.classList.add('active');
    },1100)
    sections.forEach(section=>{
        section.classList.remove('active');
    })
     menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active')
}
navLinks.forEach((link,idx)=>{
    link.addEventListener('click',()=>{
        if(!link.classList.contains('active')){
            activePage();
            link.classList.add('active');
            setTimeout(()=>{
                sections[idx].classList.add('active')
            },1100)
        }
    })
})

logoLink.addEventListener('click',()=>{
    if(!navLinks[0].classList.contains('active')){
        activePage()

        navLinks[0].classList.add('active');
        setTimeout(()=>{
                sections[0].classList.add('active')
            },1100)
    }
})

const arrowRight=document.querySelector('.portfolio-box .navigation .arrow-right')
const arrowLeft=document.querySelector('.portfolio-box .navigation .arrow-left')
let index=0;
const activePortfolio=()=>{
    const imgSlide=document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails=document.querySelectorAll('.portfolio-detail')
    imgSlide.style.transform=`translateX(calc(${index*-100}% - ${index*2}rem))`;
    portfolioDetails.forEach(detail=>{
        detail.classList.remove('active');
    })
    portfolioDetails[index].classList.add('active');

}
arrowRight.addEventListener('click',()=>{
    if(index<1){
        index++;
        arrowLeft.classList.remove('disabled');
    }else{
        index=2;
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
})

arrowLeft.addEventListener('click',()=>{
    if(index>1){
        index--;
        arrowRight.classList.remove('disabled');
    }else{
        index=0;
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
})


//form data handling

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Prepare form data
    const formData = {
        name,
        email,
        message
    };

    // Send POST request to backend
    fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Success message
        document.getElementById("contactForm").reset(); // Clear form
    })
    .catch(error => {
        console.error("Error:", error);
        // alert("Something went wrong. Please try again.");
    });
});

