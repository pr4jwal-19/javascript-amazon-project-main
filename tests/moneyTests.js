import { formatCurrency } from '../scripts/util/money.js';

console.log('Test suite for formatCurrency function');
console.log('----------------------------------');

console.log('Testing formatCurrency function...');
if(formatCurrency(1295) === '12.95'){
    console.log('Test passed!');
}else{
    console.log('Test failed!');
}

console.log('Testing formatCurrency function with 0...');
if(formatCurrency(0) === '0.00'){
    console.log('Test passed!');
}else{
    console.log('Test failed!');
}

console.log('Testing formatCurrency function to check the rounding off to nearest integer...');
if(formatCurrency(2000.5) === '20.01'){
    console.log('Test passed!');
}else{
    console.log('Test failed!');
}

console.log('Testing formatCurrency function to check the rounding off to nearest integer...');
if(formatCurrency(2000.4) === '20.00'){
    console.log('Test passed!');
}else{
    console.log('Test failed!');
}