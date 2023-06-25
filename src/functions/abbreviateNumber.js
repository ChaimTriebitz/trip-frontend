export function abbreviateNumber(number) {
   if (number >= 1000 && number < 1000000) return (number / 1000).toFixed(0).replace(/\.?0+$/, '') + ' k'
   else if (number >= 1000000 && number < 1000000000) return (number / 1000000).toFixed(1).replace(/\.?0+$/, '') + ' M'
   else if (number >= 1000000000 && number < 1000000000000) return (number / 1000000000).toFixed(2).replace(/\.?0+$/, '') + ' B'
   else return Number(number).toString()
}
