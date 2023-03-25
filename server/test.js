var moment = require('moment'); // require

// Current date
datenow = moment()


//Add five minutes to the current date
datePulsFivemin = moment().add(5, 'm')

//subtract five minutes to the current date
dateSubractFivemin = moment().subtract(5, 'm') //Add a .format() if need of UTC format

console.log(moment()) //Moment<2022-12-10T19:36:09+05:30>
console.log(datePulsFivemin.format()) //2022-12-10T19:41:09+05:30
console.log(dateSubractFivemin.format()) //2022-12-10T19:31:09+05:30
// TO compare the date
console.log(moment().isBefore(datePulsFivemin.format())) //true
console.log(moment().isBefore(dateSubractFivemin.format())) //false
