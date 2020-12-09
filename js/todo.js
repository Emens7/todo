

function dateHu() {

    const weekdays = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
    
    const d = new Date()
    
    const dayString = weekdays[d.getDay()];

    const dateString = `${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}. ${dayString}`;

    return dateString;
}
document.querySelector('.date').innerHTML = dateHu();

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

            }
            
            arrElements();
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

        const arrElements = () => {
            let todoList = JSON.parse(localStorage.getItem("elemek"));
            document.querySelector('.xSpan').innerHTML = todoList.length;
        } 
    

        document.querySelector(".list").addEventListener('click', function (event) {

            if (event.target && event.target.classList.contains("checked")) {
                const aktualisCheckBox = event.target;

               alert("Checked! Index: " + aktualisCheckBox.dataset.index);

            }
            
        });

       document.querySelector('.Clear').addEventListener('click', () => {
            localStorage.setItem('elemek', '[]');
            elemekMegjelenitese();
            arrElements();
        });
         

    
    
    
