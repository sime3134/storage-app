document.addEventListener("DOMContentLoaded", function (event) {
  //NOTIFICATION DROPDOWN
  document.querySelector('#noti_icon').addEventListener('click', () => {
    if (document.getElementById("sideNav").offsetWidth != "0") {
      document.getElementById("sideNav").style.width = "0";
      document.body.style.backgroundColor = "rgba(92, 219, 149, 1)";
      const collapseBars = document.querySelector('.collapseContainer');
      collapseBars.classList.toggle('change');
    }
    const noti_dropdown = document.querySelector('.noti_dropdown');
    noti_dropdown.classList.toggle('show');
  });

  //SIDENAV
  document.querySelector('#toggleSideNav_button').addEventListener('click', () => {
    if (document.getElementById("sideNav").offsetWidth == "0") {
      const collapseBars = document.querySelector('.collapseContainer');
      collapseBars.classList.toggle('change');
      const noti_dropdown = document.querySelector('.noti_dropdown');
      noti_dropdown.classList.remove('show');
      document.getElementById("sideNav").style.width = "250px";
      document.body.style.backgroundColor = "rgba(92, 219, 149, 0.4)";
    } else if (document.getElementById("sideNav").offsetWidth == "250") {
      const collapseBars = document.querySelector('.collapseContainer');
      collapseBars.classList.toggle('change');
      document.getElementById("sideNav").style.width = "0";
      document.body.style.backgroundColor = "rgba(92, 219, 149, 1)";
    }
  });

  //FORM LABEL - SELECT TAG
  let occup = document.querySelector('#occup');
  occup.addEventListener('change', () => {
      document.querySelector('#occup-label').classList.replace("label-text", "label-text-up")
  });

  let gender = document.querySelector('#gender');
  gender.addEventListener('change', () => {
      document.querySelector('#gender-label').classList.replace("label-text", "label-text-up")
  });

  //RIPPLE EFFECT
  let rippleButton = document.querySelector('#submitButton');
  rippleButton.addEventListener('click', createRipple);
});

function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}