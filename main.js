const button_plus = document.getElementById('plus');
const button_minus = document.getElementById('minus');
const textarea = document.getElementById('textarea');
let selected = null;
let notes = [];

window.onbeforeunload = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}
window.onload = () => {

    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'))
        console.log(notes)
        notes.forEach((elem) => {

            const lishka = document.createElement('li');
            lishka.innerHTML = elem.name+'<br>';
            lishka.setAttribute('class','');
            lishka.setAttribute('id',elem.id);
            let ulka = document.getElementById('ulka');
            ulka.appendChild(lishka);
        })
        selected = null;
    }
    if (location.hash != ''){
        selected=location.hash.slice(1);
        let listLi = document.querySelectorAll('li')
        listLi.forEach((elem) => {
            if (elem.id == location.hash.slice(1)){
                elem.setAttribute('class','active')
                notes.forEach((elem)=>{
                    if (elem.id == location.hash.slice(1)){
                        textarea.value = elem.text
                    }
                })
            }
        })

    }
}

class Note {
    constructor(id, name, text, isSelected, date) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.isSelected = isSelected;
        this.date = date;
    }
}


function remove(arr, indexes) {
    let arrayOfIndexes = [].slice.call(arguments, 1);
    return arr.filter(function (item, index) {
        return arrayOfIndexes.indexOf(index) === -1;
    });
}


window.onclick = function (event) {
    if (event.target.tagName === 'LI') {
        console.log('eto li')
        let listLi = document.querySelectorAll('li')
        listLi.forEach((elem) => {
            if (elem.id != event.target.id) {
                elem.setAttribute('class', '');
            } else {
                elem.setAttribute('class', 'active');
                selected = event.target.id;
                location.hash=event.target.id
            }

        })
        notes.forEach((elem) => {
            if (elem.id != event.target.id) {
                elem.isSelected = false;
            } else {
                elem.isSelected = true;
                textarea.value = elem.text
            }
        })

    }
}


button_plus.addEventListener('click', () => {
    textarea.value = ''
    const lishka = document.createElement('li');
    lishka.classList.add('active');
    const id = Date.now();
    location.hash=id
    let date = new Date().toLocaleString()
    selected = id;
    lishka.innerHTML = 'New note'+'<br>'+date;
    lishka.setAttribute('id', id)
    const note = new Note(id, 'New note', '', true, date);
    notes.unshift(note);
    let ulka = document.getElementById('ulka');
    ulka.prepend(lishka);
    notes.forEach((elem) => {
        if (elem.id !== id) {
            elem.isSelected = false
        } else {
            elem.isSelected = true
        }
    });
    let listLi = document.querySelectorAll('li');

    listLi.forEach((elem) => {
        if (elem.id != id) {
            elem.setAttribute('class', '');
        } else elem.setAttribute('class', 'active');
    });
});

button_minus.addEventListener('click', () => {
    for (let i = 0; i < notes.length; i++) {
        if (selected != null) {
            if (notes[i].id == selected) {
                notes = remove(notes, i);
                document.getElementById(selected).remove();
                selected = null;
                textarea.value = '';
            }
        }

    }
});

textarea.addEventListener('input', () => {
    let date = new Date().toLocaleString()
    notes.forEach((elem) => {
        if (elem.isSelected === true) {
            elem.text = (textarea.value);
            elem.date = date
            elem.name = textarea.value.slice(0, 25)+'<br>'+ date
        }
    })
    let listLi = document.querySelectorAll('li');
    listLi.forEach((elem) => {
        if (elem.className === 'active') {
            elem.innerHTML = textarea.value.slice(0, 25)+'<br>'+ date;
        }
    })

})
