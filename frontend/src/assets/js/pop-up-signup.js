function CreateAccountPopUp()
{
    alert("Ta funcionando");

    createAccount = document.getElementById("create-account-btn");
    closePopUpBtn = document.getElementById("close-popup-btn");
    popUp = document.getElementsByClassName("popup")[0];

    createAccount.addEventListener("click", function()
    {
        alert("teste");
        popUp.classList.active("active");
    });

}
