document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm-password");

    if (password.value !== confirm.value) {
        password.classList.add("error");
        confirm.classList.add("error");
        alert("Passwords do not match!");
    } else {
        password.classList.remove("error");
        confirm.classList.remove("error");
        alert("Account created successfully!");
        this.reset();
    }
});
