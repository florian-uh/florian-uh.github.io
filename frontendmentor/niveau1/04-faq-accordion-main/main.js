function toggleAnswer(questionNumber){
    const question = document.querySelector(`.question-${questionNumber}`);
    const answer = document.querySelector(`.answer-${questionNumber}`);
    const icon = document.querySelector(`.icon-${questionNumber}`);

    question.classList.toggle('active');
    answer.classList.toggle('active');
    icon.classList.toggle('active');
    if (question.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.src = './images/icon-minus.svg';
    } else {
        answer.style.maxHeight = 0;
        icon.src = './images/icon-plus.svg';
    }
    // Close all other answers
    const allQuestions = document.querySelectorAll('.question');
    const allAnswers = document.querySelectorAll('.answer');
    const allIcons = document.querySelectorAll('.icon');
    allQuestions.forEach((q, index) => {
        if (index !== questionNumber - 1) {
            q.classList.remove('active');
            allAnswers[index].style.maxHeight = 0;
            allIcons[index].src = './images/icon-plus.svg';
        }
    });
    // Close all other answers
    allAnswers.forEach((a, index) => {
        if (index !== questionNumber - 1) {
            a.classList.remove('active');
            a.style.maxHeight = 0;
        }
    });
    allIcons.forEach((i, index) => {
        if (index !== questionNumber - 1) {
            i.classList.remove('active');
            i.src = './images/icon-plus.svg';
        }
    });
    // Close all other icons
    allIcons.forEach((i, index) => {
        if (index !== questionNumber - 1) {
            i.classList.remove('active');
            i.src = './images/icon-plus.svg';
        }
    });

}