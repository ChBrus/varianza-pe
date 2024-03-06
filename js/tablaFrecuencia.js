import { tableFrecuency } from './consts.js'

export function getDataJSON(numText) {
    const numArray = numText.split(',').map(num => {return parseInt(num)})

    const tempArray = []
    for(let i = 0; i < 10; i++) {
        tempArray.push(numArray.slice((numArray.length / 10) * (i), (numArray.length / 10) * (i + 1)))
    }

    console.log(tempArray)

    const numArraySort = numArray.sort(),
        length = numArray.length

    let rango = numArraySort[length - 1] - numArraySort[0]

    let intervalo = (1 + 3.322 * Math.log10(numArray.length))

    let amplitud = rango / intervalo

    rango = Math.ceil(rango)
    intervalo = Math.ceil(intervalo)
    amplitud = Math.ceil(amplitud)

    const table = [[], [], [], [], []]

    // Primera columna
    let tempLimites = numArraySort[0]
    for(let i = 0; i < intervalo; i++) {
        let limiteI = tempLimites,
            limiteS = limiteI + amplitud

        table[0].push([limiteI, limiteS])
        
        tempLimites = limiteS
    }

    // Segunda columna
    for(let i = 0; i < intervalo; i++) {
        let promedioLimites = (table[0][i][0] + table[0][i][1]) / 2

        table[1].push(promedioLimites)
    }

    // Tercera columna
    for(let i = 0; i < intervalo; i++) {
        const limiteI = table[0][i][0]

        let tempRepetidosEntreRango = 0
        for(let j = 0; j < amplitud + (i === intervalo - 1 ? 1 : 0); j++) {
            const num = limiteI + j,
                numRepetidos = numArray.filter(element => element === num)

            tempRepetidosEntreRango += numRepetidos.length
        }

        table[2].push(tempRepetidosEntreRango)
    }

    // Cuarta columna
    for(let i = 0; i < intervalo; i++) {
        const fracc = table[2][i] / length

        table[3].push(fracc.toFixed(4))
    }

    // Quinta columna
    let tempCol5 = table[2][0]
    for(let i = 0; i < intervalo; i++) {
        const sumCol3Col5 = (i > 0 ? table[2][i] + tempCol5 : tempCol5)

        table[4].push(sumCol3Col5)
        tempCol5 = sumCol3Col5
    }

    buildTableFrecuency(table)

    return {
        R: rango,
        K: intervalo,
        A: amplitud,
        Table: table
    }
}

export function buildTableFrecuency(tableData) {
    const table = document.createElement('table'),
        thead = document.createElement('thead'),
        tbody = document.createElement('tbody'),
        trTemplate = document.createElement('tr'),
        thTemplate = document.createElement('th'),
        tdTemplate = document.createElement('td'),
        tableColumns = tableData.length,
        columnsHeader = [
            'Clases',
            'x',
            'f',
            'fr',
            'F'
        ]

    table.classList.add('table')
    table.classList.add('table-success')
    thTemplate.setAttribute('scope', 'col')

    // Table head
    let trHead = trTemplate.cloneNode()

    for(let i = 0; i < tableColumns; i++) {
        const th = thTemplate.cloneNode()

        th.textContent = columnsHeader[i]

        trHead.appendChild(th)
    }
    thead.appendChild(trHead)

    // Table body
    for(let i = 0; i < tableData[0].length; i++) {
        const tr = trTemplate.cloneNode()

        for(let j = 0; j < tableColumns; j++) {
            const td = tdTemplate.cloneNode();

            if (j === 0) {
                td.setAttribute('scope', 'row')

                td.textContent = `[${tableData[j][i][0]} -> ${tableData[j][i][1]}` + (i === tableData[0].length - 1 ? ']' : ')')
            } else td.textContent = tableData[j][i]

            tr.appendChild(td)
        }

        tbody.appendChild(tr);
    }

    // Joining body & head to table
    table.append(tbody, thead)
    tableFrecuency.appendChild(table)
}