function addRow() {
  const subjects = document.getElementById("subjects");

  const row = document.createElement("div");
  row.className = "row";

  row.innerHTML = `
    <select>
      <option value="">Grade Point</option>
      <option value="4.0">4.0</option>
      <option value="3.5">3.5</option>
      <option value="3.0">3.0</option>
      <option value="2.5">2.5</option>
      <option value="2.0">2.0</option>
      <option value="1.5">1.5</option>
      <option value="1.0">1.0</option>
      <option value="0.5">0.5</option>
    </select>

    <input type="number" step="0.01" placeholder="Units" min="0.01">
    <button class="delete-btn" onclick="deleteRow(this)">✖</button>
  `;

  subjects.appendChild(row);
}

function deleteRow(button) {
  const rows = document.querySelectorAll(".row");
  if (rows.length === 1) {
    alert("At least one subject is required.");
    return;
  }
  button.parentElement.remove();
}

function calculateGPA() {
  const rows = document.querySelectorAll(".row");
  let totalWeighted = 0;
  let totalUnits = 0;
  let hasEmptyFields = false;

  rows.forEach(row => {
    const grade = parseFloat(row.children[0].value);
    const units = parseFloat(row.children[1].value);

    if (!isNaN(grade) && !isNaN(units) && units > 0) {
      totalWeighted += grade * units;
      totalUnits += units;
    } else if (row.children[0].value !== "" || row.children[1].value !== "") {
      hasEmptyFields = true;
    }
  });

  const result = document.getElementById("result");

  if (totalUnits === 0) {
    if (hasEmptyFields) {
      result.innerHTML = "Please complete all fields with valid values.";
    } else {
      result.innerHTML = "Please enter grade points and units.";
    }
    return;
  }
const gpa = totalWeighted / totalUnits;

let message = "";
let emoji = "";

// Custom messages
if (gpa >= 2.0) {
  message = "saur galing"; 
  emoji = "🏆🎉";
} else {
  message = "aray";
  emoji = "😢📘";
}

// Optional: color based on GPA
let gpaColor = gpa >= 2.0 ? "#28a745" : "#dc3545";

result.innerHTML = `
  <span style="color: ${gpaColor}; font-size: 24px;">GPA: ${gpa.toFixed(2)}</span><br>
  <small>${message} ${emoji}</small>
`;

if (gpa >= 2.0) {
  launchConfetti();
}
}

function launchConfetti() {
  document.querySelectorAll('.confetti').forEach(c => c.remove());
  
  for (let i = 0; i < 75; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    
    confetti.style.left = Math.random() * 100 + "vw";
    
    const hue = Math.random() * 360;
    confetti.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;
    

    const size = Math.random() * 15 + 5;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    
    confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
    
    confetti.style.animationDelay = Math.random() * 1 + "s";
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.remove();
      }
    }, 5000);
  }
}

function clearAll() {
  const subjects = document.getElementById("subjects");
  subjects.innerHTML = `
    <div class="row">
      <select>
        <option value="">Grade Point</option>
        <option value="4.0">4.0</option>
        <option value="3.5">3.5</option>
        <option value="3.0">3.0</option>
        <option value="2.5">2.5</option>
        <option value="2.0">2.0</option>
        <option value="1.5">1.5</option>
        <option value="1.0">1.0</option>
        <option value="0.5">0.5</option>
      </select>

      <input type="number" step="0.01" placeholder="Units" min="0.01">
      <button class="delete-btn" onclick="deleteRow(this)">✖</button>
    </div>
  `;
  document.getElementById("result").innerHTML = "Enter your grade points and units";
}