document.addEventListener("DOMContentLoaded", function () {
        loadHTML("modal.html", "modalContainer");
        loadHTML("toast.html", "toastContainer");
        loadHTML("login.html", "loginContainer");
    });
    
    function loadHTML(url, containerId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => console.error(`Error al cargar ${url}:`, error));
    }
    
    function saveIncident() {
        const title = document.querySelector("#incidentForm input").value;
        const description = document.querySelector("#incidentForm textarea").value;
        
        if (title.trim() === "" || description.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
    
        const incident = {
            title,
            description,
            date: new Date().toLocaleString()
        };
    
        addIncidentToList(incident);
        showToast();
        document.getElementById("incidentForm").reset();
        bootstrap.Modal.getInstance(document.getElementById("incidentModal")).hide();
    }
    
    function addIncidentToList(incident) {
        const list = document.getElementById("incidentsList");
        const incidentElement = document.createElement("div");
        incidentElement.classList.add("col-md-4");
        incidentElement.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${incident.title}</h5>
                    <p class="card-text">${incident.description}</p>
                    <p class="text-muted small">${incident.date}</p>
                </div>
            </div>
        `;
        list.appendChild(incidentElement);
    }
    
    function showToast() {
        const toastElement = document.getElementById("successToast");
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
    
    function login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        fetch("users.json")
            .then(response => response.json())
            .then(data => {
                const user = data.users.find(user => user.username === username && user.password === password);
                
                if (user) {
                    window.location.href = "c24-56-n-webapp-main/index.html";
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            })
            .catch(error => console.error("Error al cargar usuarios:", error));
    }
    
    
    
    