function toggleMenu(){
    //targeting the menu and icon elements
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const nameElement = document.querySelector('.typing-text');
const nameText = "Lucia Weiner";
let charIndex = 0;

function typeAnimation(){
    if (charIndex < nameText.length) {
        nameElement.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeAnimation, 200); // Adjust typing speed (ms per character)
    } else {
        setTimeout(() =>{
            nameElement.textContent = "";
            charIndex = 0;
            typeAnimation();
        }, 5000);
    }
}

typeAnimation();