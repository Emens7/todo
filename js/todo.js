// Dátum

function dateHu() {

    const weekdays = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
    
    const d = new Date()
    
    const dayString = weekdays[d.getDay()];

    const dateString = `${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}. ${dayString}`;

    return dateString;
}

document.querySelector('.date').innerHTML = dateHu();

// Hozzáad

        const hozzaadGomb = document.querySelector('.buttonAdd');
        const szovegDoboz = document.querySelector(".todo");
        const lista = document.querySelector(".list");

        hozzaadGomb.addEventListener('click', (event) => {

            if(szovegDoboz.value.trim() !== '') {

                storageHozzaadas(szovegDoboz.value);
                elemekMegjelenitese();
                arrElements();
                szovegDoboz.value = "";
            }
        });

        //dom event delegation
        document.querySelector(".list").addEventListener('click', function (event) {

            if (event.target && event.target.classList.contains("gomb-torles")) {
                const aktualisGomb = event.target;

                storageTorles(aktualisGomb.dataset.index);

                elemekMegjelenitese();
                arrElements();
                
            }
            
        });

        const storageHozzaadas = (szoveg) => {
            let elemek = [];

            if (localStorage.getItem("elemek") !== null) {
                elemek = JSON.parse(localStorage.getItem("elemek"));
            }

            elemek.push(szovegDoboz.value);

            localStorage.setItem("elemek", JSON.stringify(elemek));
        };

        const storageTorles = (index) => {

            const elemek = JSON.parse(localStorage.getItem("elemek"));
            elemek.splice(index, 1);
            localStorage.setItem("elemek", JSON.stringify(elemek));

        };

       
        const ujElem = (szoveg, index) => {

            const template = `
            <div class="card mb-2">
                <div class="card-body">
                    
                <h2><input data-index="${index}" class="checked" type="checkbox" value="false">${szoveg}</h2>
                <button data-index="${index}" class="danger gomb-torles"><i class="fas fa-2x fa-trash-alt"></i></button>

                </div>
            
            </div>
            `;

            lista.innerHTML = template + lista.innerHTML;

        };

        const elemekMegjelenitese = () => {

            lista.innerHTML = "";

            if (localStorage.getItem("elemek") !== null) {
                const elemek = JSON.parse(localStorage.getItem("elemek"));
                
                elemek.forEach((elem, index) => {
                    ujElem(elem, index);
                });
            } 

        }

        //Oldal betöltésekor
        window.addEventListener('DOMContentLoaded', (event) => {

            elemekMegjelenitese();
            arrElements();
        });

        //Számláló elvégzendő feladatok

        const arrElements = () => {
            let todoList = JSON.parse(localStorage.getItem("elemek"));
            document.querySelector('.xSpan').innerHTML = todoList.length;
        } 

        // CheckedList
    

        document.querySelector(".list").addEventListener('click', function (event) {

            if (event.target && event.target.classList.contains("checked")) {
                
                setTimeout( () => {
                    const aktualisCheckBox = event.target;

                    const checkelemek = JSON.parse(localStorage.getItem("elemek"));
    
                    const arrKey = aktualisCheckBox.dataset.index;
    
                    const valueCheck = checkelemek[arrKey];
                
                 
                    checkHozzaadas(valueCheck);
                    storageCElemekTorles(arrKey);
                    elemekMegjelenitese();
                    arrElements();
                }, 1000) 
              
            }
            
        });

        // checkelemek localStorage létrehozása

       const checkHozzaadas = (szoveg) => {

            let checkelemek = [];

            if (localStorage.getItem("checkelemek") !== null) {
                checkelemek = JSON.parse(localStorage.getItem("checkelemek"));
            }

            checkelemek.push(szoveg);

            localStorage.setItem("checkelemek", JSON.stringify(checkelemek));

        };

        // Törlés az elemek localStorage-ból

        const storageCElemekTorles = (index) => {

            const elemek = JSON.parse(localStorage.getItem("elemek"));
            elemek.splice(index, 1);
            localStorage.setItem("elemek", JSON.stringify(elemek));

        };

        // Checked lista megjelenítése eltávolítása
        const checkedLists = document.querySelector('.Hide');
        const checkedListsMap = document.querySelector('.checked__list');

        const showHide = checkedLists.addEventListener('click', (event) => {
            if(checkedListsMap.style.display === '') {
                checkedListsMap.style.display = 'none';
                
            } else {
                checkedListsMap.style.display = '';
            }
         }
            )
        

        checkedLists.addEventListener('click', () => {
            elemekMegjelenitese();
            checkedemekMegjelenitese()
        });

        const checkedemekMegjelenitese = () => {

            checkedListsMap.innerHTML = "";

            if (localStorage.getItem("checkelemek") !== null) {

                const checkelemek = JSON.parse(localStorage.getItem("checkelemek"));
                
                checkelemek.forEach((elem, index) => {
                    checkElem(elem, index);
                });
            } 
        }   

        const checkElem = (szoveg, index) => {

            const template2 = `
            <div class="card">
                <div class="card-body">
                    
                <h2><input data-index="${index}" class="checked" type="checkbox" checked="checked" value="false">${szoveg}</h2>
                <button data-index="${index}" class="danger gomb-torles2"><i class="fas fa-2x fa-trash-alt"></i></button>

                </div>
            
            </div>
            `;

            checkedListsMap.innerHTML = template2 + checkedListsMap.innerHTML;

        }

        //checkelem törlés

        const checkDelete = document.querySelector('.checked__list');
        checkDelete.addEventListener('click', function (event) {

            if (event.target && event.target.classList.contains("gomb-torles2")) {
                const aktualisGomb = event.target;

                storageTorles2(aktualisGomb.dataset.index);
                checkedemekMegjelenitese()
                arrElements();
            }
            
           
        });

        const storageTorles2 = (index) => {
            const checkelemek = JSON.parse(localStorage.getItem("checkelemek"));
            checkelemek.splice(index, 1);
            localStorage.setItem("checkelemek", JSON.stringify(checkelemek));
        }


        // Teljes törlés

       document.querySelector('.Clear').addEventListener('click', () => {
            localStorage.setItem('elemek', '[]');
            localStorage.setItem('checkelemek', '[]');

            elemekMegjelenitese();
            arrElements();
            checkedemekMegjelenitese();
            storageCElemekTorles(arrKey);
            
        });
