document.addEventListener("DOMContentLoaded", () => {
  const newProjectBtn = document.getElementById("newProjectBtn");
  const modal = document.getElementById("projectModal");
  const closeBtn = modal.querySelector(".close");
  const form = document.getElementById("projectForm");
  const tableBody = document.getElementById("projectTable").querySelector("tbody");

  let editRow = null;

  // Initialize dynamic fields
  initializeDynamicFields();

  function initializeDynamicFields() {
    // Add event listeners for dynamic fields
    document.getElementById('addTask').addEventListener('click', function() {
        addDynamicField('tasksContainer');
    });

    document.getElementById('addTeam').addEventListener('click', function() {
        addDynamicField('teamContainer');
    });

    // Initialize remove buttons for existing items
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.dynamic-item').parentElement;
            if (container.children.length > 1) {
                this.closest('.dynamic-item').remove();
            }
        });
    });
  }

  function addDynamicField(containerId) {
    const container = document.getElementById(containerId);
    const newItem = document.createElement('div');
    newItem.className = 'dynamic-item';
    newItem.innerHTML = `
        <input type="text" class="dynamic-input">
        <button type="button" class="remove-item">✖</button>
    `;
    container.appendChild(newItem);
    
    // Add event listener to the new remove button
    newItem.querySelector('.remove-item').addEventListener('click', function() {
        if (container.children.length > 1) {
            container.removeChild(newItem);
        }
    });
  }

  function clearDynamicFields(containerId) {
    const container = document.getElementById(containerId);
    // Keep only the first item, remove others
    while (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }
    // Clear the first input
    if (container.firstElementChild) {
        container.firstElementChild.querySelector('.dynamic-input').value = '';
    }
  }

  // Open modal
  newProjectBtn.addEventListener("click", () => {
    editRow = null;
    form.reset();
    
    // Clear dynamic fields except first one
    clearDynamicFields('tasksContainer');
    clearDynamicFields('teamContainer');
    
    // Auto-fill start date with today
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("projStart").value = today;
    
    // Ensure modal is properly displayed
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  });

  // Save Project
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("projName").value;
    const client = document.getElementById("projClient").value;
    const startDate = document.getElementById("projStart").value;
    const duration = document.getElementById("projDuration").value;
    const endDate = document.getElementById("projEnd").value;
    const price = document.getElementById("projPrice").value;
    
    // Collect tasks and team members
    const tasks = Array.from(document.querySelectorAll('#tasksContainer .dynamic-input'))
        .map(input => input.value)
        .filter(value => value.trim() !== '');
    
    const team = Array.from(document.querySelectorAll('#teamContainer .dynamic-input'))
        .map(input => input.value)
        .filter(value => value.trim() !== '');

    if (editRow) {
      // Update existing row
      editRow.cells[1].textContent = name;
      editRow.cells[2].textContent = client;
      editRow.cells[3].textContent = price;
      editRow.cells[4].textContent = startDate;
      // Store additional data in data attributes for editing
      editRow.setAttribute('data-duration', duration);
      editRow.setAttribute('data-enddate', endDate);
      editRow.setAttribute('data-tasks', JSON.stringify(tasks));
      editRow.setAttribute('data-team', JSON.stringify(team));
    } else {
      // Add new row
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td></td>
        <td>${name}</td>
        <td>${client}</td>
        <td>${price}</td>
        <td>${startDate}</td>
        <td>In Progress</td>
        <td>
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">🗑️</button>
        </td>
      `;
      // Store additional data in data attributes
      newRow.setAttribute('data-duration', duration);
      newRow.setAttribute('data-enddate', endDate);
      newRow.setAttribute('data-tasks', JSON.stringify(tasks));
      newRow.setAttribute('data-team', JSON.stringify(team));
    }

    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
    updateSerials();
    attachRowEvents();
  });

  // Attach Edit/Delete events
  function attachRowEvents() {
    tableBody.querySelectorAll(".edit-btn").forEach(btn => {
      btn.onclick = function () {
        editRow = this.closest("tr");
        
        // Populate form with row data
        document.getElementById("projName").value = editRow.cells[1].textContent;
        document.getElementById("projClient").value = editRow.cells[2].textContent;
        document.getElementById("projPrice").value = editRow.cells[3].textContent;
        document.getElementById("projStart").value = editRow.cells[4].textContent;
        
        // Populate additional fields from data attributes
        document.getElementById("projDuration").value = editRow.getAttribute('data-duration') || '';
        document.getElementById("projEnd").value = editRow.getAttribute('data-enddate') || '';
        
        // Populate tasks
        const tasks = JSON.parse(editRow.getAttribute('data-tasks') || '[]');
        clearDynamicFields('tasksContainer');
        tasks.forEach((task, index) => {
          if (index === 0) {
            document.querySelector('#tasksContainer .dynamic-input').value = task;
          } else {
            addDynamicField('tasksContainer');
            const inputs = document.querySelectorAll('#tasksContainer .dynamic-input');
            inputs[inputs.length - 1].value = task;
          }
        });
        
        // Populate team
        const team = JSON.parse(editRow.getAttribute('data-team') || '[]');
        clearDynamicFields('teamContainer');
        team.forEach((member, index) => {
          if (index === 0) {
            document.querySelector('#teamContainer .dynamic-input').value = member;
          } else {
            addDynamicField('teamContainer');
            const inputs = document.querySelectorAll('#teamContainer .dynamic-input');
            inputs[inputs.length - 1].value = member;
          }
        });
        
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      };
    });

    tableBody.querySelectorAll(".delete-btn").forEach(btn => {
      btn.onclick = function () {
        if (confirm("Are you sure you want to delete this project?")) {
          this.closest("tr").remove();
          updateSerials();
        }
      };
    });
  }

  // Update serial numbers
  function updateSerials() {
    [...tableBody.rows].forEach((row, idx) => {
      row.cells[0].textContent = `#${idx + 1}`;
    });
  }

  // Search functionality
  const searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();

    [...tableBody.rows].forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      const client = row.cells[2].textContent.toLowerCase();
      const status = row.cells[5].textContent.toLowerCase();

      if (name.includes(filter) || client.includes(filter) || status.includes(filter)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  // Initial setup
  updateSerials();
  attachRowEvents();
});