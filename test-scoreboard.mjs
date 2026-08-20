// node test-scoreboard.mjs
import assert from 'node:assert/strict';
import { validTeams, cleanTeams } from './valid-teams.mjs';

assert.ok(validTeams([]));
assert.ok(validTeams([{ name: 'Nandi', score: 0 }]));

assert.ok(!validTeams('nope'));
assert.ok(!validTeams([null]));
assert.ok(!validTeams([{ name: '  ', score: 1 }]));           // blank name
assert.ok(!validTeams([{ name: 'x'.repeat(61), score: 1 }]));  // too long
assert.ok(!validTeams([{ name: 'Nandi', score: 'ten' }]));      // non-number
assert.ok(!validTeams([{ name: 'Nandi', score: NaN }]));
assert.ok(!validTeams(Array.from({ length: 101 }, () => ({ name: 'a', score: 0 }))));

assert.deepEqual(cleanTeams([{ name: ' Nandi ', score: 3.9 }]), [{ name: 'Nandi', score: 3 }]);

console.log('ok');
