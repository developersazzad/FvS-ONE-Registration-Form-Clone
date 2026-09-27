// Application State
const state = {
    currentStep: -1, // -1 = landing page, 0-13 = questions
    answers: {},
    started: false
};

// DOM Elements
const landingPage = document.getElementById('landing-page');
const questionContainer = document.getElementById('question-container');
const successScreen = document.getElementById('success-screen');
const chevronUp = document.getElementById('chevron-up');
const chevronDown = document.getElementById('chevron-down');
const progressCounter = document.getElementById('progress-counter');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderLandingPage();
    setupEventListeners();
});

// Render Landing Page
function renderLandingPage() {
    landingPage.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-light text-white mb-16">
            Vermögen anlegen ist ganz einfach ...
        </h1>
        
        <!-- 3 Step Illustration -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
            <!-- Step 1 -->
            <div class="flex flex-col items-center text-center flex-1 relative">
                <div class="phone-illustration mb-4">
                    <i class="fas fa-arrows-alt text-white text-3xl"></i>
                </div>
                <p class="text-white/90 text-sm max-w-xs leading-relaxed">
                    Ermitteln Sie unverbindlich<br/>die passende Anlagestrategie<br/>für das Vermögen Ihres Kindes.
                </p>
                <!-- Arrow -->
                <div class="hidden md:block absolute top-20 -right-16 text-white/50">
                    <i class="fas fa-chevron-right text-2xl"></i>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center text-center flex-1 relative">
                <div class="phone-illustration mb-4">
                    <div class="flex gap-1">
                        <div class="w-2 h-2 rounded-full bg-white"></div>
                        <div class="w-2 h-2 rounded-full bg-white"></div>
                        <div class="w-2 h-2 rounded-full bg-white"></div>
                        <div class="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                </div>
                <p class="text-white/90 text-sm max-w-xs leading-relaxed">
                    Erstellen Sie<br/>einen Account.
                </p>
                <!-- Arrow -->
                <div class="hidden md:block absolute top-20 -right-16 text-white/50">
                    <i class="fas fa-chevron-right text-2xl"></i>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center text-center flex-1">
                <div class="phone-illustration mb-4">
                    <i class="fas fa-chart-line text-white text-3xl"></i>
                </div>
                <p class="text-white/90 text-sm max-w-xs leading-relaxed">
                    Wir investieren<br/>Ihr Vermögen.
                </p>
            </div>
        </div>

        <!-- Progress Dots -->
        <div class="progress-dots justify-center mb-16">
            <div class="progress-dot"></div>
            <div class="progress-line"></div>
            <div class="progress-dot"></div>
            <div class="progress-line"></div>
            <div class="progress-dot"></div>
        </div>

        <!-- CTA Button -->
        <button onclick="startQuestionnaire()" class="px-12 py-4 border-2 border-white/70 text-white rounded-full text-lg font-light hover:bg-white hover:text-[#00365a] transition-all duration-300">
            Jetzt Anlagestrategie ermitteln
        </button>
    `;
}

// Start Questionnaire
function startQuestionnaire() {
    state.started = true;
    state.currentStep = 0;

    landingPage.classList.add('fade-out');
    setTimeout(() => {
        landingPage.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        questionContainer.classList.add('fade-in');
        progressCounter.classList.remove('hidden');
        renderQuestion(0);
        updateNavigationButtons();
    }, 300);
}

// Render Question
function renderQuestion(index) {
    const question = QUESTIONS[index];

    questionContainer.innerHTML = `
        <!-- Info Icon -->
        <div class="info-icon">i</div>
        
        <!-- Question Title -->
        <h2 class="text-3xl md:text-4xl font-light text-white mb-4 text-center">
            ${question.title}
        </h2>
        
        ${question.subtitle ? `
            <p class="text-white/70 text-base mb-12 max-w-2xl mx-auto leading-relaxed text-center">
                ${question.subtitle}
            </p>
        ` : '<div class="mb-12"></div>'}
        
        <!-- Dynamic Component -->
        <div id="question-component" class="mb-12"></div>
    `;

    const componentContainer = document.getElementById('question-component');

    switch (question.type) {
        case 'buttons':
            renderButtonsComponent(componentContainer, question);
            break;
        case 'buttons-grid':
            renderButtonsGridComponent(componentContainer, question);
            break;
        case 'slider':
            renderSliderComponent(componentContainer, question);
            break;
        case 'slider-duration':
            renderSliderDurationComponent(componentContainer, question);
            break;
        case 'beneficiary':
            renderBeneficiaryComponent(componentContainer, question);
            break;
        case 'registration':
            renderRegistrationComponent(componentContainer, question);
            break;
    }

    updateProgressCounter();
}

// Render Button Component
function renderButtonsComponent(container, question) {
    const html = `
        <div class="flex flex-wrap justify-center gap-6">
            ${question.options.map(opt => `
                <button 
                    onclick="selectOption('${opt.id}')" 
                    data-option-id="${opt.id}"
                    class="pill-button min-w-[280px]">
                    ${opt.label}
                </button>
            `).join('')}
        </div>
    `;
    container.innerHTML = html;
}

// Render Buttons Grid Component
function renderButtonsGridComponent(container, question) {
    const html = `
        <div class="grid grid-cols-2 gap-4 max-w-xl mx-auto">
            ${question.options.map(opt => `
                <button 
                    onclick="selectOption('${opt.id}')" 
                    data-option-id="${opt.id}"
                    class="pill-button">
                    ${opt.label}
                </button>
            `).join('')}
        </div>
        ${question.customAmount ? `
            <button onclick="showCustomAmount()" class="mt-8 text-white/60 underline hover:text-white transition-colors">
                Individual amount
            </button>
        ` : ''}
    `;
    container.innerHTML = html;
}

// Render Slider Component
function renderSliderComponent(container, question) {
    const currentValue = state.answers[question.id] || question.default;

    const html = `
        <div class="max-w-2xl mx-auto">
            <!-- Step Indicator with Tooltips -->
            <div class="step-indicator-container active">
                <div class="step-indicator">
                    <span class="step-label">konservativ</span>
                    <span class="step-arrow"><i class="fas fa-arrow-left"></i></span>
                    
                    <!-- Line Segment -->
                    <div class="step-line"></div>
                    
                    ${Array.from({ length: question.max - question.min + 1 }, (_, i) => i + question.min).map((num, index, arr) => `
                        <div 
                            onclick="selectStepNumber(${question.id}, ${num})" 
                            data-step-number="${num}"
                            class="step-item ${num === currentValue ? 'active' : ''}">
                            ${num}
                            <div class="step-tooltip">
                                Renditeerwartung bis<br>zu ${num} % jährlich
                            </div>
                        </div>
                        ${index < arr.length - 1 ? '<div class="step-line"></div>' : ''}
                    `).join('')}
                    
                    <!-- Line Segment -->
                    <div class="step-line"></div>
                    
                    <span class="step-arrow"><i class="fas fa-arrow-right"></i></span>
                    <span class="step-label">wachstumsorientiert</span>
                </div>
            </div>
            
            <button onclick="showInfo('${question.id}')" class="text-white/60 text-sm underline hover:text-white transition-colors">
                Erläuterungen zur Renditeerwartung <i class="fas fa-info-circle ml-1"></i>
            </button>
        </div>
    `;
    container.innerHTML = html;

    // Auto-enable next if value exists
    if (state.answers[question.id]) {
        enableChevronDown();
    }
}

// Render Slider Duration Component
function renderSliderDurationComponent(container, question) {
    const currentValue = state.answers[question.id] || question.default;

    const html = `
        <div class="max-w-2xl mx-auto">
            <div class="flex justify-between text-xs text-white/70 mb-6 font-semibold uppercase tracking-wider">
                <span>${question.labels.left}</span>
                <span>${question.labels.right}</span>
            </div>
            
            <div class="slider-container relative">
                <div id="slider-tooltip-${question.id}" class="slider-tooltip">
                    <span id="slider-value-text-${question.id}">${currentValue}</span> ${question.unit}
                </div>
                
                <input 
                    type="range" 
                    id="slider-input-${question.id}"
                    min="${question.min}" 
                    max="${question.max}" 
                    value="${currentValue}"
                    oninput="updateSliderDuration(${question.id}, this.value, ${question.min}, ${question.max}, '${question.unit}')"
                    class="custom-slider w-full">
            </div>
        </div>
    `;
    container.innerHTML = html;

    // Initialize tooltip position
    // Small timeout to ensure DOM is rendered
    setTimeout(() => {
        updateSliderDuration(question.id, currentValue, question.min, question.max, question.unit);
    }, 0);

    // Auto-enable next
    enableChevronDown();
}

// Render Beneficiary Component
function renderBeneficiaryComponent(container, question) {
    const html = `
        <div class="max-w-2xl mx-auto">
            <div class="flex justify-center gap-4 mb-12">
                ${question.options.map(opt => `
                    <button 
                        onclick="selectBeneficiary('${opt.id}')" 
                        data-option-id="${opt.id}"
                        class="pill-button ${opt.id === 'child' ? 'active' : ''}">
                        ${opt.label}
                    </button>
                `).join('')}
            </div>
            
            <div id="follow-up-question" class="mb-8">
                <div class="info-icon">i</div>
                <h3 class="text-xl text-white mb-6 text-center">
                    ${question.followUp.title}
                </h3>
                <div class="space-y-4 max-w-lg mx-auto">
                    ${question.followUp.options.map(opt => `
                        <label class="flex items-start gap-3 text-white cursor-pointer hover:text-white/80 transition-colors">
                            <div onclick="selectRadio('${opt.id}')" data-radio-id="${opt.id}" class="custom-radio mt-1"></div>
                            <span>${opt.label}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <button class="text-white/60 text-sm underline hover:text-white transition-colors">
                ${question.customerLink}
            </button>
        </div>
    `;
    container.innerHTML = html;
}

// Render Registration Component
function renderRegistrationComponent(container, question) {
    const html = `
        <form onsubmit="submitForm(event)" class="max-w-md mx-auto">
            <div class="flex gap-4 mb-4">
                ${question.fields.slice(0, 2).map(field => `
                    <input 
                        type="${field.type}" 
                        name="${field.name}"
                        placeholder="${field.label}"
                        required="${field.required}"
                        class="w-1/2 p-4 bg-transparent border border-white/50 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors">
                `).join('')}
            </div>
            
            <input 
                type="email" 
                name="email"
                placeholder="E-Mail-Adresse"
                required
                class="w-full p-4 mb-6 bg-transparent border border-white/50 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors">
            
            <label class="flex items-start gap-3 text-white/70 text-sm cursor-pointer mb-8">
                <input type="checkbox" required class="mt-1 w-5 h-5 rounded">
                <span>${question.privacyText}</span>
            </label>
            
            <button 
                type="submit"
                class="w-full px-12 py-4 rounded-full text-lg font-bold uppercase tracking-wider bg-white text-[#00365a] hover:scale-105 shadow-xl transition-all duration-300">
                ${question.submitText}
            </button>
        </form>
    `;
    container.innerHTML = html;
}


// Select Option  
function selectOption(optionId) {
    const question = QUESTIONS[state.currentStep];
    state.answers[question.id] = optionId;

    // Update button UI
    document.querySelectorAll('[data-option-id]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.optionId === optionId) {
            btn.classList.add('active');
        }
    });

    enableChevronDown();
}

// Select Number
function selectNumber(questionId, number) {
    state.answers[questionId] = number;

    // Update number UI
    document.querySelectorAll('[data-number]').forEach(circle => {
        circle.classList.remove('active');
        if (parseInt(circle.dataset.number) === number) {
            circle.classList.add('active');
        }
    });

    enableChevronDown();
}

// Select Step Number (for step indicator)
function selectStepNumber(questionId, number) {
    state.answers[questionId] = number;

    // Update step indicator UI
    document.querySelectorAll('[data-step-number]').forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.stepNumber) === number) {
            step.classList.add('active');
        }
    });

    enableChevronDown();
}

// Update Slider (Generic)
function updateSlider(questionId, value) {
    state.answers[questionId] = parseInt(value);
    const valueEl = document.getElementById('slider-value');
    if (valueEl) valueEl.textContent = value;
    enableChevronDown();
}

// Update Slider Duration with Floating Tooltip
function updateSliderDuration(questionId, value, min, max, unit) {
    state.answers[questionId] = parseInt(value);

    // Update Tooltip Text
    const textEl = document.getElementById(`slider-value-text-${questionId}`);
    if (textEl) {
        textEl.textContent = value;
    }

    // Update Tooltip Position
    const tooltip = document.getElementById(`slider-tooltip-${questionId}`);
    const input = document.getElementById(`slider-input-${questionId}`);

    if (tooltip && input) {
        const percent = (value - min) / (max - min);
        // Adjust for thumb width (approx 32px)
        // 0% -> left shift ~16px, 100% -> right shift ~16px
        // Simplified calculation for centering over thumb
        // const thumbIsWidth = 32; 

        // Simple percentage approach
        const newLeft = `calc(${percent * 100}% + (${16 - percent * 32}px))`;
        tooltip.style.left = newLeft;
    }

    enableChevronDown();
}

// Select Radio
function selectRadio(radioId) {
    document.querySelectorAll('[data-radio-id]').forEach(radio => {
        radio.classList.remove('checked');
        if (radio.dataset.radioId === radioId) {
            radio.classList.add('checked');
        }
    });
    enableChevronDown();
}

// Submit Form
function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    state.answers.registration = Object.fromEntries(formData);

    showSuccessScreen();
}

// Show Success Screen
function showSuccessScreen() {
    questionContainer.classList.add('fade-out');
    chevronUp.classList.add('hidden');
    chevronDown.classList.add('hidden');
    progressCounter.classList.add('hidden');

    setTimeout(() => {
        questionContainer.classList.add('hidden');
        successScreen.classList.remove('hidden');
        successScreen.classList.add('fade-in');

        successScreen.innerHTML = `
            <h1 class="text-4xl font-light text-white mb-6">Vielen Dank!</h1>
            <p class="text-xl text-white/80 mb-10">
                Wir haben Ihre Anfrage erhalten. Ihre persönliche Anlagestrategie wird erstellt.
            </p>
            <div class="p-8 bg-white/10 rounded-lg backdrop-blur-sm text-left mx-auto max-w-md space-y-2 text-sm text-white">
                <p><strong>Email:</strong> ${state.answers.registration.email}</p>
                <button 
                    onclick="location.reload()"
                    class="mt-6 w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    Neu starten
                </button>
            </div>
        `;
    }, 300);
}

// Navigation Functions
function nextQuestion() {
    if (state.currentStep < QUESTIONS.length - 1) {
        state.currentStep++;
        questionContainer.classList.add('fade-out');

        setTimeout(() => {
            questionContainer.classList.remove('fade-out');
            questionContainer.classList.add('fade-in');
            renderQuestion(state.currentStep);
            updateNavigationButtons();
            disableChevronDown();
        }, 300);
    }
}

function previousQuestion() {
    if (state.currentStep > 0) {
        state.currentStep--;
        questionContainer.classList.add('fade-out');

        setTimeout(() => {
            questionContainer.classList.remove('fade-out');
            questionContainer.classList.add('fade-in');
            renderQuestion(state.currentStep);
            updateNavigationButtons();
        }, 300);
    }
}

// Update Navigation Buttons
function updateNavigationButtons() {
    if (state.currentStep > 0) {
        chevronUp.classList.remove('hidden');
    } else {
        chevronUp.classList.add('hidden');
    }

    // Check if current question is answered
    const question = QUESTIONS[state.currentStep];
    if (state.answers[question.id]) {
        enableChevronDown();
    }
}

function enableChevronDown() {
    chevronDown.classList.remove('hidden', 'opacity-30', 'pointer-events-none');
    chevronDown.classList.add('opacity-100');
}

function disableChevronDown() {
    chevronDown.classList.add('opacity-30', 'pointer-events-none');
}

// Update Progress Counter
function updateProgressCounter() {
    document.getElementById('current-step').textContent = state.currentStep + 1;
    document.getElementById('total-steps').textContent = QUESTIONS.length;
}

// Setup Event Listeners
function setupEventListeners() {
    chevronUp.addEventListener('click', previousQuestion);
    chevronDown.addEventListener('click', nextQuestion);
}

// Utility function for info modals
function showInfo(questionId) {
    alert('Information about question ' + questionId);
}

function showCustomAmount() {
    alert('Custom amount input feature');
}

function selectBeneficiary(id) {
    selectOption(id);
}
