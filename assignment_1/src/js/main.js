export default function dropDownLogic() {

    const buttonActiveState = (dropDown, listItem) => {

        let currentDropDown = document.getElementById(dropDown);
        let currentButton = document.getElementById(listItem);

        currentButton.addEventListener("click", (event) => {
            // console.log(event.target);
            currentDropDown.innerHTML = event.target.innerText;
        })
    }

    buttonActiveState("filter-1", "menu-1");

}