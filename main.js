import { numberList, calculate, nVecesVarianza, varianza, promedio, desviacion, numeros } from './js/consts.js';
import { getVarianza, getProm } from './js/varianza.js';
import { getDataJSON } from './js/tablaFrecuencia.js';

calculate.addEventListener('click',
() => {
    const numbers = numberList.value.split(',').map(element => parseInt(element))

    nVecesVarianza.innerText = getVarianza(numbers).toFixed(2)
    varianza.innerText = (getVarianza(numbers) / numbers.length).toFixed(2)
    promedio.innerText = getProm(numbers).toFixed(2)
    desviacion.innerText = Math.sqrt(getVarianza(numbers) / numbers.length).toFixed(3)
    numeros.innerText = numbers.length

    console.log(getDataJSON(numberList.value))
})