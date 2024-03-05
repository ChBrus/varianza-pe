export function getDataJSON(numText) {
    const numArray = numText.split(', ').map(num => {return parseInt(num)})

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

    return {
        R: rango,
        K: intervalo,
        A: amplitud,
        Table: table
    }
}