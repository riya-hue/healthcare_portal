console.log("EL Care loaded");

// IMPORTANT: after deployment, replace with your Vercel backend URL
const BACKEND_URL = "https://healthcare-management.vercel.app";

function toJSON(form) {
  const data = {};
  new FormData(form).forEach((v, k) => (data[k] = Number(v)));
  return data;
}

async function submitForm(form) {
  try {
    const res = await fetch(`${BACKEND_URL}/analyze_heart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toJSON(form)),
    });

    const result = await res.json();

    document.getElementById("result").innerHTML = `
      🩺 Heart Disease: <b>${result.heart_disease}</b><br>
      📊 Risk Probability: <b>${result.risk_probability}%</b>
    `;
  } catch (err) {
    alert("Backend error. Please try again.");
  }
}

document.getElementById("heartForm").onsubmit = (e) => {
  e.preventDefault();
  submitForm(e.target);
};
