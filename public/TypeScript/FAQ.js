document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".question");
  
    questions.forEach((question) => {
      const answer = question.nextElementSibling;
      answer.style.maxHeight = "0";
      answer.style.overflow = "hidden";
      answer.style.transition = "max-height 0.3s ease-out, padding 0.3s ease-out";
      answer.style.display = "block";
      answer.style.padding = "0";
  
      question.addEventListener("click", function () {
        if (answer.style.maxHeight === "0px" || answer.style.maxHeight === "") {
          answer.style.maxHeight = answer.scrollHeight + "px";
          answer.style.padding = "10px";
        } else {
          answer.style.maxHeight = "0";
          answer.style.padding = "0";
        }
      });
    });
  });
  