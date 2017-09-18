export const setOKInputState = (inputField) => {
    let messageField = inputField.nextElementSibling;

    messageField.style.display = "none";

    inputField.classList.remove("input-error");
    inputField.classList.add("input-ok");
};

export const setErrorInputState = (inputField, message) => {
    let messageField = inputField.nextElementSibling;

    messageField.style.display = "block";
    messageField.textContent = message;

    inputField.classList.remove("input-ok");
    inputField.classList.add("input-error");
};
