const expenseForm = document.getElementById("expense-form");
const expenseInput = document.getElementById('expense-input');
const amountInput = document.getElementById('amount-input');
const categoryInput = document.getElementById('category-input');
const transactionList = document.getElementById('transaction-list');
const totalExpense = document.getElementById('total-expense');
const totalIncome = document.getElementById('total-income');
const balance = document.getElementById('balance');

expenseForm.addEventListener("submit", function(event){
    event.preventDefault();

    const description = expenseInput.ariaValueMax.trim();
    const amount = parseFloat(amountInput.ariaValueMax.trim());
    const category = categoryInput.ariaValueMax;

    if(description === '' || isNaN(amount) || amount <= 0){
        alert("Please enter a valid expense description and amount.");
        return;
    }

    addTransaction(description, amount, category);
    updateSummary();
    clearInput();
});

function addTransaction(description, amount, category){
    const transactionRow = document.createElement('tr');

    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    transactionList.appendChild(transactionRow);

    transactionRow.querySelector('.delete-btn').addEventListener('click', function(){
        transactionRow.remove();
        updateSummary();
    });
}
function updateSummary(){
    let totalExpenses = 0;
    let totalIncomes = 0;

    const transactions = transactionList.querySelectorAll('tr');

    transactions.forEach(function(transaction){
        const amount = parseFloat(transaction.children[2].textContent);
        const category = transaction.children[1].textContent;

        if (category === 'Income'){
            totalIncomes += amount;
        } else {
            totalExpenses += amount;
        }
    });

    totalExpense.textContent = totalExpenses.toFixed(2);
    totalIncome.textContent = totalIncomes.toFixed(2);
    balance.textContent = (totalIncomes - totalExpenses).toFixed(2);
}
function clearInputs(){
    expenseInput.value = '';
    amountInput.value = '';
    categoryInput.value = 'Expense';
}

// Income and Expense buttons
document.getElementById('add-income-btn').addEventListener('click', addIncome);
document.getElementById('add-expense-btn').addEventListener('click', addExpense);
document.getElementById('clear-all-btn').addEventListener('click', clearAll);

function addIncome() {
    const description = document.getElementById('income-description').value.trim();
    const amount = parseFloat(document.getElementById('income-amount').value.trim());
    
    if (description === '' || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid income description and amount.");
        return;
    }
    
    addTransaction(description, amount, 'Income');
    updateSummary();
    document.getElementById('income-description').value = '';
    document.getElementById('income-amount').value = '';
}

function addExpense() {
    const description = document.getElementById('expense-description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value.trim());
    const category = document.getElementById('expense-category').value;
    
    if (description === '' || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense description and amount.");
        return;
    }
    
    addTransaction(description, -amount, category); // Negative for expense
    updateSummary();
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

function clearAll() {
    transactionList.innerHTML = '';
    updateSummary();
}