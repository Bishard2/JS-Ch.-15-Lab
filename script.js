document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById("questionContainer");
    const resetBtn = document.getElementById("resetBtn");
    const progressBar = document.getElementById("progressBar");
  
    const STORAGE_KEY = "viewedQuestions";
  
    let viewedQuestions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
    const interviewQuestions = [
      {
        id: 1,
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language. It is used to create web pages."
      },
      {
        id: 2,
        question: "What are HTML elements?",
        answer: "HTML elements are the building blocks of HTML pages. They are represented by tags."
      },
      {
        id: 3,
        question: "What is the purpose of the <head> tag?",
        answer: "The <head> tag contains meta-information about the document, such as the title and links to scripts and styles."
      },
      {
        id: 4,
        question: "What is the function of the <body> tag?",
        answer: "The <body> tag contains the actual content of the web page, such as text, images, and links."
      }
    ];
  
    function updateLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedQuestions));
    }
  
    function updateProgressBar() {
      const viewedCount = viewedQuestions.length;
      const total = interviewQuestions.length;
      const percentage = Math.round((viewedCount / total) * 100);
      progressBar.style.width = percentage + "%";
      progressBar.setAttribute("aria-valuenow", percentage);
      progressBar.textContent = percentage + "%";
    }
  
    function generateQuestionCards() {
      questionContainer.innerHTML = "";
  
      interviewQuestions.forEach(q => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card mb-3 col-md-8";
  
        const headerDiv = document.createElement("div");
        headerDiv.className = "card-header d-flex justify-content-between align-items-center";
        headerDiv.style.cursor = "pointer";
        headerDiv.dataset.questionId = q.id;
  
        const headerText = document.createElement("span");
        headerText.textContent = q.question;
  
        const indicator = document.createElement("span");
        indicator.innerHTML = viewedQuestions.includes(q.id) ? "✔️" : "";
  
        headerDiv.appendChild(headerText);
        headerDiv.appendChild(indicator);
  
        const bodyDiv = document.createElement("div");
        bodyDiv.className = "card-body collapse";
        bodyDiv.id = "answer-" + q.id;
  
        const answerP = document.createElement("p");
        answerP.className = "card-text";
        answerP.textContent = q.answer;
  
        bodyDiv.appendChild(answerP);
  
        cardDiv.appendChild(headerDiv);
        cardDiv.appendChild(bodyDiv);
        questionContainer.appendChild(cardDiv);
  
        headerDiv.addEventListener("click", () => {
          const allBodies = document.querySelectorAll(".card-body");
          allBodies.forEach(b => {
            if (b.id !== bodyDiv.id) {
              b.classList.remove("show");
            }
          });
  
          bodyDiv.classList.toggle("show");
  
          if (bodyDiv.classList.contains("show")) {
            if (!viewedQuestions.includes(q.id)) {
              viewedQuestions.push(q.id);
              updateLocalStorage();
              indicator.innerHTML = "✔️";
              updateProgressBar();
            }
          }
        });
      });
    }
  
    function resetProgress() {
      localStorage.removeItem(STORAGE_KEY);
      viewedQuestions = [];
      updateProgressBar();
      generateQuestionCards();
    }
  
    resetBtn.addEventListener("click", resetProgress);
  
    generateQuestionCards();
    updateProgressBar();
  });
  