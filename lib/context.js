const vm = require('vm');

const DEFAULT_TIMEOUT = 5;

const contexts = Object.create(null);

function create(regexp) {
  return vm.createContext({ r: regexp });
}

function get(name, regexp) {
  if (!contexts[name]) contexts[name] = new WeakMap();

  let context = contexts[name].get(regexp);

  if (!context) {
    context = create(regexp);
    contexts[name].set(regexp, context);
  }

  return context;
}

function run(command, regexp, string, timeout = DEFAULT_TIMEOUT) {
  const context = get(command, regexp);

  context.s = string;
  const result = vm.runInContext(command, context, { timeout });
  context.s = null;

  return result;
}

module.exports = {
  create, get, run
};
