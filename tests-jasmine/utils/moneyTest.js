import { formatCurrency } from '../../scripts/util/money.js';

describe('test suite: formatCurrency', () => {
    it('Converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('Works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('Rounding off to nearest integer', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
    it('Rounding off to nearest integer', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });
});
