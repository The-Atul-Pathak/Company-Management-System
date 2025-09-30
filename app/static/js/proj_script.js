document.addEventListener("DOMContentLoaded", () => {
  const newProjectBtn = document.getElementById("newProjectBtn");
  const modal = document.getElementById("projectModal");
  const closeBtn = modal.querySelector(".close");
  const form = document.getElementById("projectForm");
  const tableBody = document.getElementById("projectTable").querySelector("tbody");
  const modalTitle = document.getElementById("modalTitle");

  let editRow = null;

  // Open modal
  newProjectBtn.addEventListener("click", () => {
    editRow = null;
    modalTitle.textContent = "Add New Project";
    form.reset();
    modal.style.display = "flex";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Save Project
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("projName").value;
    const client = document.getElementById("projClient").value;
    const price = document.getElementById("projPrice").value;
    const status = document.getElementById("projStatus").value;

    if (editRow) {
      // Update row
      editRow.cells[1].textContent = name;
      editRow.cells[2].textContent = client;
      editRow.cells[3].textContent = price;
      editRow.cells[4].textContent = status;
    } else {
      // Add new row
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td></td>
        <td>${name}</td>
        <td>${client}</td>
        <td>${price}</td>
        <td>${status}</td>
        <td>
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">🗑️</button>
        </td>
      `;
    }

    modal.style.display = "none";
    updateSerials();
    attachRowEvents();
  });

  // Attach Edit/Delete events
  function attachRowEvents() {
    tableBody.querySelectorAll(".edit-btn").forEach(btn => {
      btn.onclick = function () {
        editRow = this.closest("tr");
        modalTitle.textContent = "Edit Project";
        document.getElementById("projName").value = editRow.cells[1].textContent;
        document.getElementById("projClient").value = editRow.cells[2].textContent;
        document.getElementById("projPrice").value = editRow.cells[3].textContent;
        document.getElementById("projStatus").value = editRow.cells[4].textContent;
        modal.style.display = "flex";
      };
    });

    tableBody.querySelectorAll(".delete-btn").forEach(btn => {
      btn.onclick = function () {
        this.closest("tr").remove();
        updateSerials();
      };
    });
  }

  // Update serial numbers
  function updateSerials() {
    [...tableBody.rows].forEach((row, idx) => {
      row.cells[0].textContent = `#${idx + 1}`;
    });
  }

  updateSerials();
  attachRowEvents();
});
