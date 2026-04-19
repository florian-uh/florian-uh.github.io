document.getElementById('age-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    
    const resYears = document.getElementById('res-years');
    const resMonths = document.getElementById('res-months');
    const resDays = document.getElementById('res-days');
    
    let isValid = true;
    
    const clearErrors = () => {
        document.querySelectorAll('.input-field').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    };
    
    const setError = (id, msg) => {
        const field = document.getElementById(id).parentElement;
        field.classList.add('error');
        field.querySelector('.error-msg').textContent = msg;
        isValid = false;
    };
    
    clearErrors();
    
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
    
    if (!dayInput.value) setError('day', 'This field is required');
    else if (day < 1 || day > 31) setError('day', 'Must be a valid day');
    
    if (!monthInput.value) setError('month', 'This field is required');
    else if (month < 1 || month > 12) setError('month', 'Must be a valid month');
    
    const currentYear = new Date().getFullYear();
    if (!yearInput.value) setError('year', 'This field is required');
    else if (year > currentYear) setError('year', 'Must be in the past');
    
    if (isValid) {
        // Validate date existence (e.g., 31/04 is invalid)
        const dateObj = new Date(year, month - 1, day);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month - 1 || dateObj.getDate() !== day) {
            setError('day', 'Must be a valid date');
            isValid = false;
        }
    }
    
    if (isValid) {
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        
        if (days < 0) {
            months -= 1;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }
        
        if (months < 0) {
            years -= 1;
            months += 12;
        }
        
        // Simple animation
        animateValue(resYears, years);
        animateValue(resMonths, months);
        animateValue(resDays, days);
    }
});

function animateValue(obj, endValue) {
    let startValue = 0;
    let duration = 500;
    let startTime = null;
    
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        obj.textContent = Math.floor(progress * endValue);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}
