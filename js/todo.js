

function dateHu() {

    const weekdays = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
    
    const d = new Date()
    
    const dayString = weekdays[d.getDay()];

    const dateString = `${d.getFullYear()}. ${d.getMonth()}. ${d.getDay()}. ${dayString}`;

    return dateString;
}
document.querySelector('.date').innerHTML = dateHu();