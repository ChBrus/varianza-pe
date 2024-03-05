export function getVarianza(serieNum) {
    let prom = getProm(serieNum), varianzaCuadrada = 0

    // Varianza cuadrada
    serieNum.forEach(num => {
        const tempRest = num - prom,
            tempCuadrado = Math.pow(tempRest, 2)

        varianzaCuadrada += tempCuadrado
    })

    return varianzaCuadrada
}

export function getProm(serieNum) {
    const cantNums = serieNum.length
    let prom = 0

    // Promediar
    let tempProm = 0
    serieNum.forEach((num, numIdx) => {
        tempProm += num

        if (numIdx === (serieNum.length - 1)) {
            prom = tempProm / cantNums
        }
    })

    return prom
}

export const getPoweredNum = (num, cantidadDeVeces) => Math.pow(num, 2) * cantidadDeVeces