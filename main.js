const numberList = document.getElementById('numberList'),
  calculate = document.getElementById('calculate'),
  nVecesVarianza = document.getElementById('var-por-n-veces'),
  varianza = document.getElementById('var'),
  promedio = document.getElementById('prom'),
  desviacion = document.getElementById('desv'),
  numeros = document.getElementById('n-num')

function getVarianza(serieNum) {
    let prom = getProm(serieNum), varianzaCuadrada = 0

    // Varianza cuadrada
    serieNum.forEach(num => {
        const tempRest = num - prom,
            tempCuadrado = Math.pow(tempRest, 2)

        varianzaCuadrada += tempCuadrado
    })

    return varianzaCuadrada
}

function getProm(serieNum) {
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

const getPoweredNum = (num, cantidadDeVeces) => Math.pow(num, 2) * cantidadDeVeces

numberList.addEventListener('input', event => {
    const regex = /^[0-9,]*$/g;

    if (!regex.test(event.target.value)) {
        let eventData = {
            targetSplit: event.target.value.split(''),
            childs: event.target.value.split('').length
        }

        event.target.value.split('').forEach((letter, index) => {
            if (index === 0) event.target.value = '';

            if (index < eventData.childs - 1) event.target.value += letter
        })
    }
})

calculate.addEventListener('click', () => {
  const numbers = numberList.value.split(',').map(element => parseInt(element))

  nVecesVarianza.innerText = getVarianza(numbers).toFixed(2);
  varianza.innerText = (getVarianza(numbers) / numbers.length).toFixed(2);
  promedio.innerText = getProm(numbers).toFixed(2);
  desviacion.innerText = Math.sqrt(getVarianza(numbers) / numbers.length).toFixed(3);
  numeros.innerText = numbers.length
})