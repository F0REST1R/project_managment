const cards = [
	"Эффективное управление проектами",
	"Контроль выполнения задач в реальном времени",
	"Решение для небольших команд",
	"Безопасное хранение информации",
	"Современный и удобный интерфейс"
]

const track = document.querySelector(".carousel__track")
let centerIndex = 2
let pendingUserData = null
let pendingRole = null

function renderCards(){
	track.innerHTML = ""
	const leftIndex = (centerIndex - 1 + cards.length) % cards.length
	const rightIndex = (centerIndex + 1) % cards.length
	const visible = [cards[leftIndex], cards[centerIndex], cards[rightIndex]]

	visible.forEach((text, index)=>{
		const div = document.createElement("div")
		div.classList.add("card")
		if(index === 1){
			div.classList.add("card--active")
		}
		div.innerText = text
		track.appendChild(div)
	})
}

function rotateCards(){
	centerIndex = (centerIndex + 1) % cards.length
	renderCards()
}

renderCards()
setInterval(rotateCards, 5000)

const form = document.getElementById("authForm")
const signupTab = document.getElementById("signupTab")
const loginTab = document.getElementById("loginTab")
const signupForm = document.getElementById("signupForm")
const loginForm = document.getElementById("loginForm")
const formTitle = document.getElementById("formTitle")
const submitBtn = document.getElementById("submitBtn")
const formError = document.getElementById("formError")
const switchLink=document.getElementById("switchLink")
const switchText=document.getElementById("switchText")

switchLink.addEventListener("click",()=>{
        if(
            signupForm.style.display!=="none"
        ){
            showLogin()
        }else{
            showSignup()
        }
    }
)

// Modal elements
const managerModal = document.getElementById("managerModal")
const inviteCodeModal = document.getElementById("inviteCodeModal")
const employeeInviteModal = document.getElementById("employeeInviteModal")
const companyNameModal = document.getElementById("companyNameModal")

function showSignup() {
	signupTab.classList.add("tab--active")
	loginTab.classList.remove("tab--active")

	signupForm.style.display = "block"
	loginForm.style.display = "none"

	formTitle.innerText = "Создание учетной записи"
	submitBtn.innerText = "Зарегестрироваться"

	switchText.innerHTML = `
		У Вас есть аккаунт?
		<span id="switchLink">Вход</span>
	`

	document.getElementById("switchLink").onclick = () => {
		showLogin()
	}

	hideError()
}

function showLogin(){
	loginTab.classList.add("tab--active")
	signupTab.classList.remove("tab--active")

	signupForm.style.display="none"
	loginForm.style.display="block"

	formTitle.innerText="Добро пожаловать!"
	submitBtn.innerText="Вход"

	switchText.innerHTML=`
		Нет аккаунта?
		<span id="switchLink">Зарегестрироваться</span>
	`

	document.getElementById(
		"switchLink"
	).onclick=showSignup

	hideError()
}

function showError(message){

    formError.innerText=
    message

    formError.classList.add(
        "active"
    )

}

function hideError(){

    formError.innerText=""

    formError.classList.remove(
        "active"
    )

}

function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify({
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role,
        email: userData.email
    }));
}

function saveCompanyData(companyName) {
    localStorage.setItem('companyData', JSON.stringify({
        name: companyName,
        created_at: new Date().toISOString()
    }));
}



signupTab.onclick = showSignup
loginTab.onclick = showLogin

function isValidEmail(email){
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return regex.test(email)
}

// Modal helper functions
function showModal(modal) {
    if (modal) {
        modal.classList.add("active")
        document.body.style.overflow = "hidden"
    }
}

function hideModal(modal) {
    if (modal) {
        modal.classList.remove("active")
        document.body.style.overflow = ""
    }
}

function hideAllModals() {
    hideModal(managerModal)
    hideModal(inviteCodeModal)
    hideModal(employeeInviteModal)
    hideModal(companyNameModal)
}

function redirectToDashboard() {
    window.location.href = "../pages/dashboard/index.html"
}

// Setup modal event listeners
function setupModals() {
    // Manager modals
    const createCompanyBtn = document.getElementById("createCompanyBtn")
    const joinCompanyBtn = document.getElementById("joinCompanyBtn")
    const backToOptionsBtn = document.getElementById("backToOptionsBtn")
    const submitInviteBtn = document.getElementById("submitInviteBtn")
    const submitEmployeeInviteBtn = document.getElementById("submitEmployeeInviteBtn")
    const backToManagerModalBtn = document.getElementById("backToManagerModalBtn")
    const createCompanySubmitBtn = document.getElementById("createCompanySubmitBtn")
    
    if (createCompanyBtn) {
        createCompanyBtn.onclick = () => {
            hideModal(managerModal)
            showModal(companyNameModal)
        }
    }
    
    if (joinCompanyBtn) {
        joinCompanyBtn.onclick = () => {
            hideModal(managerModal)
            showModal(inviteCodeModal)
        }
    }
    
    if (backToOptionsBtn) {
        backToOptionsBtn.onclick = () => {
            hideModal(inviteCodeModal)
            showModal(managerModal)
        }
    }
    
    if (backToManagerModalBtn) {
        backToManagerModalBtn.onclick = () => {
            hideModal(companyNameModal)
            showModal(managerModal)
            // Clear company name input
            const companyNameInput = document.getElementById("companyName")
            if (companyNameInput) companyNameInput.value = ""
            // Remove error styling
            companyNameInput?.classList.remove("error")
            const errorMsg = document.querySelector(".company-name-error")
            if (errorMsg) errorMsg.remove()
        }
    }
    
    if (createCompanySubmitBtn) {
        createCompanySubmitBtn.onclick = () => {
            const companyName = document.getElementById("companyName")?.value.trim()
            
            // Remove existing error message
            const existingError = document.querySelector(".company-name-error")
            if (existingError) existingError.remove()
            
            // Validate company name
            if (!companyName) {
                const input = document.getElementById("companyName")
                input.classList.add("error")
                
                const errorDiv = document.createElement("div")
                errorDiv.className = "company-name-error"
                errorDiv.style.cssText = `
                    color: #ff6b6b;
                    font-size: 12px;
                    text-align: center;
                    margin-top: 8px;
                    padding: 6px;
                    background: rgba(255, 107, 107, 0.1);
                    border-radius: 12px;
                `
                errorDiv.innerText = "Please enter a company name"
                input.parentNode.appendChild(errorDiv)
                
                setTimeout(() => {
                    input.classList.remove("error")
                }, 2000)
                return
            }
            
            if (companyName.length < 2) {
                const input = document.getElementById("companyName")
                input.classList.add("error")
                
                const errorDiv = document.createElement("div")
                errorDiv.className = "company-name-error"
                errorDiv.style.cssText = `
                    color: #ff6b6b;
                    font-size: 12px;
                    text-align: center;
                    margin-top: 8px;
                    padding: 6px;
                    background: rgba(255, 107, 107, 0.1);
                    border-radius: 12px;
                `
                errorDiv.innerText = "Company name must be at least 2 characters"
                input.parentNode.appendChild(errorDiv)
                
                setTimeout(() => {
                    input.classList.remove("error")
                }, 2000)
                return
            }
            
            // Save company name and redirect
            saveCompanyData(companyName)
            hideModal(companyNameModal)
            redirectToDashboard()
        }
    }
    
    if (submitInviteBtn) {
        submitInviteBtn.onclick = () => {
            const code = document.getElementById("inviteCode")?.value
            if (code && code.length >= 10) {
                hideModal(inviteCodeModal)
                redirectToDashboard()
            } else {
                const input = document.getElementById("inviteCode")
                if (input) {
                    input.style.borderColor = "#ef4444"
                    setTimeout(() => {
                        input.style.borderColor = ""
                    }, 2000)
                }
            }
        }
    }
    
    if (submitEmployeeInviteBtn) {
        submitEmployeeInviteBtn.onclick = () => {
            const code = document.getElementById("employeeInviteCode")?.value
            if (code && code.length >= 10) {
                hideModal(employeeInviteModal)
                redirectToDashboard()
            } else {
                const input = document.getElementById("employeeInviteCode")
                if (input) {
                    input.style.borderColor = "#ef4444"
                    setTimeout(() => {
                        input.style.borderColor = ""
                    }, 2000)
                }
            }
        }
    }
}

// Close modals on escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        hideAllModals()
        document.body.style.overflow = ""
    }
})

// Close modals when clicking outside
document.addEventListener("click", (e) => {
    if (e.target.classList && e.target.classList.contains("modal-overlay")) {
        hideModal(e.target)
        document.body.style.overflow = ""
    }
})

form.addEventListener("submit", async (event)=>{
	event.preventDefault()

	if(signupForm.style.display !== "none"){
		const firstName = document.getElementById("firstName").value
		const lastName = document.getElementById("lastName").value
		const email = document.getElementById("signupEmail").value
		const password = document.getElementById("signupPassword").value
		const confirm = document.getElementById("confirmPassword").value
		const role = document.querySelector('input[name="role"]:checked')?.value

		if(!firstName || !lastName){
            showError(
                "Please enter your first and last name"
                )
			return
		}

		if(!isValidEmail(email)){
            showError(
                "Invalid email address"
            )
			return
		}

		if(password.length < 6){
            showError(
                "Password must be at least 6 characters"
            )
			return
		}

		if(password !== confirm){
            showError(
                "Passwords do not match"
            )
			return
		}

		if(!role){
            showError(
                "Please select a role"
            )
			return
		}

		try{
			const response = await fetch("http://localhost:8080/api/auth/register", {
				method: "POST",
				headers:{
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					first_name: firstName,
					last_name: lastName,
					email: email,
					password: password,
					role: role
				})
			})

            if(response.ok){

                hideError()

                showLogin()

                document.getElementById("loginEmail").value = email
                document.getElementById("loginPassword").value = ""

                showNotification(
                    "Account created successfully! Please log in.",
                    "success"
                )

                return
            }else{

                const error = await response.text()

                if(error.toLowerCase().includes("exists")){

                    showLogin()

                    document.getElementById("loginEmail").value = email

                    showError(
                        "Account already exists. Please log in."
                    )

                }else{

                    showError(error)

                }
            }
		}catch(err){
            showError(
                "Server connection error"
            )
		}
	}else{
		const email = document.getElementById("loginEmail").value
		const password = document.getElementById("loginPassword").value

		try{
			const response = await fetch("http://localhost:8080/api/auth/login", {
				method:"POST",
				headers:{
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			})

			if (!response.ok) {
                showError(
                    "Invalid credentials"
                )
				return
			}

			const data = await response.json()
			localStorage.setItem("token", data.token)

			if (data.user) {
				saveUserData(data.user);
			}

			window.location.href = "../pages/dashboard/index.html"

		}catch(err){
            showError(
                "Server connection error"
            )
		}
	}
})

// Auto-format invitation code input
function setupCodeFormatting() {
    const codeInputs = [document.getElementById("inviteCode"), document.getElementById("employeeInviteCode")]
    
    codeInputs.forEach(input => {
        if (input) {
            input.addEventListener("input", (e) => {
                let value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
                if (value.length > 4 && value.length <= 8) {
                    value = value.slice(0, 4) + "-" + value.slice(4)
                } else if (value.length > 8) {
                    value = value.slice(0, 4) + "-" + value.slice(4, 8) + "-" + value.slice(8, 12)
                }
                e.target.value = value.slice(0, 14)
            })
        }
    })
}

setupCodeFormatting()