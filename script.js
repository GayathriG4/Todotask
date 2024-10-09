document.addEventListener("DOMContentLoaded", () => {
    const entryForm = document.getElementById("entry-form");
    const entryList = document.getElementById("entry-list");
    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const netBalance = document.getElementById("net-balance");
    const filterRadios = document.getElementsByName("filter");

    let entries = [];

    entryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("entry-name").value;
        const amount = parseFloat(document.getElementById("entry-amount").value);
        const type = document.getElementById("entry-type").value;
        const category = document.getElementById("entry-category").value;
        const date = document.getElementById("entry-date").value;

        const entry = {
            id: Date.now(),
            name,
            amount,
            type,
            category,
            date
        };

        entries.push(entry);
        displayEntries(entries);
        updateSummary();

        entryForm.reset();
    });

    entryList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            entries = entries.filter(entry => entry.id !== id);
            displayEntries(entries);
            updateSummary();
        }

        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);
            const entry = entries.find(entry => entry.id === id);

            document.getElementById("entry-name").value = entry.name;
            document.getElementById("entry-amount").value = entry.amount;
            document.getElementById("entry-type").value = entry.type;
            document.getElementById("entry-category").value = entry.category;
            document.getElementById("entry-date").value = entry.date;

            entries = entries.filter(entry => entry.id !== id);
            displayEntries(entries);
            updateSummary();
        }
    });

    filterRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const filterValue = document.querySelector('input[name="filter"]:checked').value;
            filterEntries(filterValue);
        });
    });

    function displayEntries(entries) {
        entryList.innerHTML = "";
        entries.forEach(entry => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${entry.name}</td>
                <td>$${entry.amount.toFixed(2)}</td>
                <td>${entry.type}</td>
                <td>${entry.category}</td>
                <td>${entry.date}</td>
                <td>
                    <button class="edit-btn" data-id="${entry.id}" style="background-color: #28a745; color: white; border: none; padding: 5px 10px; cursor: pointer; font-size: large;">Edit</button>
                    <button class="delete-btn" data-id="${entry.id}"style="background-color: #28a745; color: white; border: none; padding: 5px 10px; cursor: pointer; font-size: large;">Delete</button>
                </td>
            `;

            entryList.appendChild(row);
        });
    }

    function updateSummary() {
        const income = entries.filter(entry => entry.type === "Income").reduce((sum, entry) => sum + entry.amount, 0);
        const expenses = entries.filter(entry => entry.type === "Expense").reduce((sum, entry) => sum + entry.amount, 0);
        const net = income - expenses;

        totalIncome.textContent = income.toFixed(2);
        totalExpenses.textContent = expenses.toFixed(2);
        netBalance.textContent = net.toFixed(2);
    }

    function filterEntries(filterValue) {
        let filteredEntries = entries;

        if (filterValue === "Income") {
            filteredEntries = entries.filter(entry => entry.type === "Income");
        } else if (filterValue === "Expense") {
            filteredEntries = entries.filter(entry => entry.type === "Expense");
        }

        displayEntries(filteredEntries);
    }
});
