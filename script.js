let studies = JSON.parse(localStorage.getItem("studies")) || [];

function saveStudy() {
  const subject = document.getElementById("subject").value;
  const minutes = Number(document.getElementById("minutes").value);

  if (!subject || !minutes) {
    alert("入力してください！");
    return;
  }

  const today = new Date();
  const date =
    today.getFullYear() + "/" +
    (today.getMonth() + 1) + "/" +
    today.getDate();

  studies.push({
    subject,
    minutes,
    date
  });

  localStorage.setItem("studies", JSON.stringify(studies));

  displayStudies();
}

function displayStudies() {
  const list = document.getElementById("studyList");

  list.innerHTML = "";

  let total = 0;

  const today = new Date();
  const todayDate =
    today.getFullYear() + "/" +
    (today.getMonth() + 1) + "/" +
    today.getDate();

  studies.slice().reverse().forEach((study) => {
    const li = document.createElement("li");

    li.innerHTML =
      "📅 " + study.date +
      "<br>📖 " + study.subject +
      "<br>⏰ " + study.minutes + "分";

    list.appendChild(li);

    if (study.date === todayDate) {
      total += study.minutes;
    }
  });

  document.getElementById("todayTotal").innerText =
    "今日の合計：" + total + "分";

  drawChart();
}

function drawChart() {

  if (window.myChart) {
    window.myChart.destroy();
  }

  const subjects = {};

  studies.forEach((study) => {
    if (subjects[study.subject]) {
      subjects[study.subject] += study.minutes;
    } else {
      subjects[study.subject] = study.minutes;
    }
  });

  const ctx = document.getElementById("studyChart");

  window.myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(subjects),
      datasets: [{
        label: "勉強時間",
        data: Object.values(subjects)
      }]
    }
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "on");
  } else {
    localStorage.setItem("darkMode", "off");
  }
}

if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark");
}

displayStudies();
