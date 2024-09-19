const myCategorie = document.querySelector("#Categorie");
const myStatus = document.querySelector("#Status");
const messageArea = document.querySelector("#message");
const inputDate = document.querySelector("#date");
const title = document.querySelector("#title");
const bouton = document.querySelector("#button");
const buttonUpdate = document.querySelector("#buttonUpdate");
const Tbody = document.querySelector("#Tbody");
const cardVue = document.querySelector("#cardVue");
const tbodyVue = document.querySelector("#tbodyVue");
const eye = document.querySelector(".eye");
const paraDescript = document.querySelector("#paraDescript");
const myChart = document.querySelector("#myChart");
const afficheDescription = document.querySelector(".afficheDescription");

let idTache = 1;
function sauvegardeLocalStorage() {
  // ************************************* Recuperation de mes valeur ******************
  const myCategorieValue = myCategorie.value;
  const myStatusValue = myStatus.value;
  const messageAreaValue = messageArea.value;
  const inputDateValue = inputDate.value;
  const titleValue = title.value;
  // ******* initialisation dun tableau dans le localStorage pour stocké mes taches ****
  const getTache = JSON.parse(localStorage.getItem("tacheItem")) || [];
  // ****************************************** Definition d'une tache *****************
  const nouvelTache = {
    categorie: myCategorieValue,
    status: myStatusValue,
    message: messageAreaValue,
    date: inputDateValue,
    titre: titleValue,
    id: idTache,
  };
  // ******************************************* Ajout des tache dans le tableau *******
  getTache.push(nouvelTache);
  // Update de mon tableau
  localStorage.setItem("tacheItem", JSON.stringify(getTache));
}

// ********************************************* Affichage de mes tache sur le DOM*******
function AjoutDestache() {
  Tbody.innerHTML = "";
  // Recuperation *************************
  let MesTache = JSON.parse(localStorage.getItem("tacheItem")) || [];
  MesTache.forEach((element, index) => {
    let ligne = document.createElement("tr");
    if (element.id % 2 === 0) {
      ligne.classList.add("couleur");
    }
    ligne.setAttribute("data-id", element.id);
    ligne.innerHTML = `
    <td class="whitespace-nowrap px-6 py-4 font-medium">
                                          ${index + 1}
                                        </td>
                                        <td  class="whitespace-nowrap px-6 py-4">${
                                          element.date
                                        }</td>
                                        <td onclick="Description(${index})" class="whitespace-nowrap px-6 py-4">${
                                          element.titre
                                        }</td>
                                        <td class="whitespace-nowrap px-6 py-4">${
                                          element.categorie
                                        }</td>
                                        <td class="whitespace-nowrap px-6 py-4 ">
                                            <span class="pen">
                                                <i class="fa-solid fa-pen" onclick="modification(${index})"></i>
                                            </span>
                                            <span class="eye">
                                                <i class="fa-regular fa-eye" onclick="vues(${index})"></i>
                                            </span>
                                            <span class="trash" onclick="suppression(${index})">
                                                <i class="fa-solid fa-trash"></i>
                                            </span>
                                        </td> `;
    Tbody.appendChild(ligne);
  });
}
AjoutDestache();

// **************************************** Description *************************************
function Description(index) {
  let MesTache = JSON.parse(localStorage.getItem("tacheItem")) || [];
  let ShowDescription = MesTache[index];
  paraDescript.textContent= ShowDescription.message;
   
}
// **************************************** Modification ************************************
function modification(index) {
  bouton.style.display = "none";
  buttonUpdate.style.display = "block";
  let MesTache = JSON.parse(localStorage.getItem("tacheItem")) || [];
  myCategorie.value = MesTache[index].categorie;
  title.value = MesTache[index].titre;
  inputDate.value = MesTache[index].date;
  messageArea.value = MesTache[index].message;
  myStatus.value = MesTache[index].status;

  buttonUpdate.addEventListener("click", () => {
    buttonUpdate.style.display = "none";
    bouton.style.display = "block";
    MesTache[index].categorie = myCategorie.value;
    MesTache[index].titre = title.value;
    MesTache[index].date = inputDate.value;
    MesTache[index].message = messageArea.value;
    MesTache[index].status = myStatus.value;
    localStorage.setItem("tacheItem", JSON.stringify(MesTache));
    AjoutDestache();
    viderLinput();
  });
}
// **************************************** Vues ********************************************
function vues(index) {
  // cardVue.style.display = "block";
  cardVue.classList.toggle("cardVues");
  let MesTache = JSON.parse(localStorage.getItem("tacheItem")) || [];
  let taskToShow = MesTache[index];
  tbodyVue.innerHTML = `<tr><td> Date : ${taskToShow.date}</td></tr>
                        <tr><td>Titre : ${taskToShow.titre}</td></tr>
                        <tr><td>Categorie : ${taskToShow.categorie}</td></tr>
                        <tr><td>Categorie : ${taskToShow.status}</td></tr>                      
                        `;
}
// ************************************* Suppression ************************************
function suppression(index) {
  let MesTache = JSON.parse(localStorage.getItem("tacheItem")) || [];
  MesTache.splice(index, 1);
  localStorage.setItem("tacheItem", JSON.stringify(MesTache));
  AjoutDestache();
}
// *********************************** Chargement de page ******************************
window.addEventListener("load", () => {
  const lastId = parseFloat(localStorage.getItem("lastTache")) || 0;
  idTache = lastId === 0 ? 1 : lastId;
  AjoutDestache();
});

// ********************************* Vider les inputs apres ajout de tache ************
function viderLinput() {
  myCategorie.value = "";
  title.value = "";
  inputDate.value = "";
  messageArea.value = "";
  myStatus.value = "";
}
// ******************************** Gestion des erreur *******************************
bouton.addEventListener("click", () => {
  if (myCategorie.value === "") {
    alert("categorie is required");
  } else if (title.value === "") {
    alert("title is required");
  } else if (inputDate.value === "") {
    alert("Date is required");
  } else if (messageArea.value === "") {
    alert("Description is required");
  } else if (myStatus.value === "") {
    alert("Statut is required");
  } else {
    sauvegardeLocalStorage();
    idTache++;
    localStorage.setItem("lastTache", idTache);
    AjoutDestache();
    MesDonnéDelaChart();
    creatChart()
    viderLinput();
    
  }
});

// ************************************** chart *********************************
if(!localStorage.getItem('nouveau')){localStorage.setItem("nouveau",0)}
if(!localStorage.getItem('encours')){localStorage.setItem("encours",0)}
if(!localStorage.getItem('Terminer')){localStorage.setItem("Terminer",0)}
let nouveau = JSON.parse(localStorage.getItem('nouveau'));
let encours = JSON.parse(localStorage.getItem('encours'));;
let Terminer = JSON.parse(localStorage.getItem('Terminer'));;

function MesDonnéDelaChart() {
  if (myStatus.value === 'Nouveau') {
    nouveau++
    console.log(nouveau);
    localStorage.setItem('nouveau',JSON.stringify(nouveau))
  }else if (myStatus.value === 'En cours') {
    encours++
    console.log(encours);
    localStorage.setItem('encours',JSON.stringify(encours))
  }else if (myStatus.value === 'Terminer') {
   Terminer++
   console.log(Terminer);
   localStorage.setItem('Terminer',JSON.stringify(Terminer))
  }  
}

let chartjs;
const ctx = document.getElementById('myChart');
function creatChart() {
if (chartjs) {
  chartjs.destroy()
}
chartjs = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Nouveau', 'En cours', 'Terminer'],
    datasets: [{
      label: '# of Votes',
      data: [nouveau, encours,Terminer],
      borderWidth: 1,
      backgroundColor:['green', 'blue','black'],
    }]
  },
  options: {
    cutout: '02%',   
  }
});
chartjs.update()
}
creatChart();
