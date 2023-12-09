
const randomCode = () => {
    let rnm = Math.random().toString(36).slice(2);
    console.log(rnm);
    return rnm.toUpperCase();
}

function onloadPage() {
  console.log('onloadPage');
  document.getElementById("coupon").style.visibility = "visible";
  document.getElementById("header").style.opacity = "0.7";

  let promocode = document.getElementById("promocode");
  promocode.innerText = randomCode();
}

window.onload = onloadPage();

function closeCoupon() {
  document.getElementById("coupon").style.visibility = "hidden";
  document.getElementById("coupon").style.opacity = "1";
}

let btn = document.getElementById("btn");

const changeMode = () => {
  if (btn.innerText === "Light Mode") {
    btn.innerText = "Dark Mode";
    btn.style.color = "#9fa2a6";
    btn.style.fontWeight = "bold";
  } else {
    btn.innerText = "Light Mode";
    btn.style.color = "white";
    btn.style.fontWeight = "normal";
  }

  let lightBody = document.body;
  let lightMain = document.getElementsByTagName("main")[0];
  let lightFooter = document.getElementsByTagName("footer")[0];
  let lightSpan = document.getElementById("contact-link");
  let lightSpanLink = document.getElementById("contact-link-a");
  let lightSelect = document.getElementById("languages");
  let lightAccordionLabel = document.getElementById("first");

  let lightSectionEnjoyTv = document.getElementsByTagName("section")[0];
  let lightSectionDownload = document.getElementsByTagName("section")[1];
  let lightSectionWatch = document.getElementsByTagName("section")[2];
  let lightSectionKids = document.getElementsByTagName("section")[3];
  let lightSectionFaq = document.getElementsByTagName("section")[4];

  let lightHeader = document.getElementById("header");

  /* APPLY LIGHT THEME */

  lightBody.classList.toggle("lightTheme");
  lightMain.classList.toggle("lightTheme");
  lightHeader.classList.toggle("light-header");
  lightSpan.classList.toggle("lightTheme");
  lightSpanLink.classList.toggle("lightTheme");
  lightSelect.classList.toggle("lightTheme");
  lightAccordionLabel.classList.toggle("lightTheme");

  lightSectionEnjoyTv.classList.toggle("light-section");
  lightSectionDownload.classList.toggle("light-section");
  lightSectionWatch.classList.toggle("light-section");
  lightSectionKids.classList.toggle("light-section");
  lightSectionFaq.classList.toggle("light-faq-section");

  lightFooter.classList.toggle("lightTheme");

  //   lightSectionEnjoyTv.classList.toggle("light-section");
  //   lightSectionDownload.classList.toggle("light-section");
  //   lightSectionWatch.classList.toggle("light-section");
  //   lightSectionKids.classList.toggle("light-section");
  //   lightSectionFaq.classList.toggle("light-section");
};
