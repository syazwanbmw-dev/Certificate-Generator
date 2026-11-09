import test from 'node:test';
import assert from 'node:assert/strict';
import { maxTextWidthPercent } from '../assets/js/utils.js';

test('teks di tengah dapat 90% lebar (100 - 2x5% ruang tepi)', () => {
    assert.equal(maxTextWidthPercent(50), 90);
});

test('guna jarak ke tepi TERDEKAT, kiri atau kanan', () => {
    assert.equal(maxTextWidthPercent(30), 50); // 2*30 - 10
    assert.equal(maxTextWidthPercent(70), 50); // 2*30 - 10 (simetri)
});

test('hampir tepi tidak jadi sifar/negatif — ada lantai 10%', () => {
    assert.equal(maxTextWidthPercent(0), 10);
    assert.equal(maxTextWidthPercent(100), 10);
    assert.equal(maxTextWidthPercent(5), 10);
});

test('nilai bukan nombor jatuh balik ke 90 (tengah), bukan NaN', () => {
    assert.equal(maxTextWidthPercent(undefined), 90);
    assert.equal(maxTextWidthPercent('abc'), 90);
});
