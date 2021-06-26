const { run } = require('./lib/context.js');

const Command = {
  TEST: 'r.test(s);',
  EXEC: 'r.exec(s);',
  SEARCH: 's.search(r)',
  MATCH_ALL: 's.matchAll(r)'
};

module.exports.test = function test() {
  return run(Command.TEST, ...arguments);
};

module.exports.exec = function exec() {
  return run(Command.EXEC, ...arguments);
};

module.exports.search = function search(string, regexp, timeout) {
  return run(Command.SEARCH, regexp, string, timeout);
};

module.exports.matchAll = function matchAll(string, regexp, timeout) {
  return run(Command.MATCH_ALL, regexp, string, timeout);
};
