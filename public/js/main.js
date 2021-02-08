let newItemBasket = [];
let currentTab = 0;

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.tab')) showTab(currentTab);
  let nextButton = document.querySelector('#nextButton');
  let prevButton = document.querySelector('#prevButton');

  if (document.querySelector('#nextButton')) {
    nextButton.addEventListener('click', () => {
      step(1);
    });
    prevButton.addEventListener('click', () => {
      step(-1);
    });
  }

  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, []);

  let dropdownTrigger = document.querySelectorAll('.dropdown-trigger');
  let dropdownInstance = M.Dropdown.init(dropdownTrigger, []);

  let modal = document.querySelectorAll('.modal');
  let modalInstance = M.Modal.init(modal, []);

  let newItemTitle = document.querySelector('#item_title');
  let newItemDesc = document.querySelector('#item_desc');
  let newItemList = document.querySelector('#newItemList');
  let addItemButton = document.querySelector('#addItemButton');

  if (document.querySelector('#addItemButton')) {
    addItemButton.addEventListener('click', () => {
      if (!newItemTitle.checkValidity()) {
        invalid('#item_title', 'Please fill in this field.');
      } else {
        valid('#item_title');

        if (newItemList.classList.contains('hidden')) newItemList.classList.remove('hidden');

        let itemLi = newItemList.appendChild(document.createElement('li'));
        itemLi.classList.add('basket-item');

        let titleSpan = itemLi.appendChild(document.createElement('span'));
        titleSpan.classList.add('item-title');
        titleSpan.append(newItemTitle.value);

        let descP = itemLi.appendChild(document.createElement('p'));
        descP.classList.add('item-desc');
        descP.append(newItemDesc.value);

        newItemBasket.push({
          title: newItemTitle.value,
          desc: newItemDesc.value
        });
        newItemTitle.value = "";
        newItemDesc.value = "";
      }
    });
  }
});

let showTab = (tab) => {
  let tabs = document.querySelectorAll('.tab');
  let nextButton = document.querySelector('#nextButton');
  let prevButton = document.querySelector('#prevButton');

  tabs[tab].style.display = 'block';

  if (tab == 0) {
    prevButton.style.display = 'none';
  } else {
    prevButton.style.display = 'inline';
  }
  if (tab == (tabs.length - 1)) {
    nextButton.innerHTML = 'Submit <i class="material-icons right">send</i>';
  } else {
    nextButton.innerHTML = 'Next <i class="material-icons right">arrow_forward</i>';
  }
  updateSteps(tab);
}

let step = (direction) => {
  let tabs = document.querySelectorAll('.tab');
  let form = document.querySelector('#submitItemsForm');

  if (newItemBasket.length > 0) {
    currentTab += direction;

    if (currentTab >= tabs.length) {
      form.submit();
      return false;
    }
    tabs[currentTab - direction].style.display = 'none';
    showTab(currentTab);
  } else {
    invalid('#item_title', 'Please add at least one item before proceeding.')
  }
}

let updateSteps = (tab) => {
  let steps = document.querySelectorAll('.step');

  for (let i = 0; i < steps.length; i++) {
    steps[i].classList.remove('active');
  }

  steps[tab].classList.add('active');
}

let invalid = (elementName, msg) => {
  element = document.querySelector(elementName);
  element.classList.add('invalid');
  element.previousElementSibling.innerHTML = msg;
  element.previousElementSibling.style.display = 'inline-block';
}
let valid = (elementName) => {
  element = document.querySelector(elementName);
  element.classList.remove('invalid');
  element.previousElementSibling.style.display = 'none';
}