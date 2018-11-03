let table = document.getElementById('gameboard');
for (let i = 0; i < 20; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 20; j++) {
        let td = document.createElement('td');
        td.setAttribute('row', i);
        td.setAttribute('col', j);

        td.addEventListener('click', function () {
            console.log(`row: ${this.getAttribute('row')}, col: ${this.getAttribute('col')}`)
        });

        tr.appendChild(td);
    }
    table.appendChild(tr);
}