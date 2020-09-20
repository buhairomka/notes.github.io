const button_plus = document.getElementById('plus');
const button_minus = document.getElementById('minus');
const button_edit = document.getElementById('edit');
const textarea = document.getElementById('textarea');
let selected = null;
let notes = [];


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
    let arrayOfIndexes = [].slice.call(arguments, 1);  // (1)
    return arr.filter(function (item, index) {         // (2)
        return arrayOfIndexes.indexOf(index) === -1;      // (3)
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
    const lishka = document.createElement('li');
    lishka.classList.add('active');
    const id = Date.now();
    selected = id;
    lishka.innerHTML = 'New note';
    lishka.setAttribute('id', id)
    const note = new Note(id, 'New note', '', true, new Date().toLocaleString());
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
    notes.forEach((elem) => {
        if (elem.isSelected === true) {
            elem.text = (textarea.value);
        }
    })
});