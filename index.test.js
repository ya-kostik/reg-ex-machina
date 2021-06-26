/* global describe test expect */

const { exec, test: testVM, search, matchAll } = require('./');

const RegExpr = {
  SIMPLE: /(a+)(b*)?/,
  SEARCH: /(a+)/,
  EVIL: /(a|a)+$/,
  MATCH_ALL: /a/g
};

const EVIL_STRING = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!';
const TIMED_OUT_ERROR = 'timed out';
const CUSTOM_TIMEOUT = 20;

describe('reg-ex-machina', () => {
  test('simple test', () => {
    expect(testVM(RegExpr.SIMPLE, 'aaaab')).toBe(true);
    expect(testVM(RegExpr.SIMPLE, 'ab')).toBe(true);
    expect(testVM(RegExpr.SIMPLE, 'a')).toBe(true);
    expect(testVM(RegExpr.SIMPLE, 'cccggg')).toBe(false);
    expect(testVM(RegExpr.SIMPLE, 'hahahaha')).toBe(RegExpr.SIMPLE.test('hahahaha'));
    expect(testVM(RegExpr.SIMPLE, 'hahahaha')).toBe(RegExpr.SIMPLE.test('hahahaha'));
  });

  test('simple exec', () => {
    const string = 'aaaab';
    expect(exec(RegExpr.SIMPLE, string)).toEqual(RegExpr.SIMPLE.exec(string));
  });

  test('simple search', () => {
    expect(search('caaaab', RegExpr.SEARCH)).toBe(1);
  });

  test('simple match all', () => {
    expect(matchAll(EVIL_STRING, RegExpr.MATCH_ALL).next).toBeDefined();
  });

  test('evil test', () => {
    expect(() => testVM(RegExpr.EVIL, EVIL_STRING)).toThrow(TIMED_OUT_ERROR);
  });

  test('evil exec', () => {
    expect(() => exec(RegExpr.EVIL, EVIL_STRING)).toThrow(TIMED_OUT_ERROR);
  });

  test('evil search', () => {
    expect(() => search(EVIL_STRING, RegExpr.EVIL)).toThrow(TIMED_OUT_ERROR);
  });

  test('evil test with custom timeout', () => {
    expect(() => testVM(RegExpr.EVIL, EVIL_STRING, CUSTOM_TIMEOUT)).toThrow(TIMED_OUT_ERROR);
  });

  test('evil exec with custom timeout', () => {
    expect(() => exec(RegExpr.EVIL, EVIL_STRING, CUSTOM_TIMEOUT)).toThrow(TIMED_OUT_ERROR);
  });

  test('evil search with custom timeout', () => {
    expect(() => search(EVIL_STRING, RegExpr.EVIL, CUSTOM_TIMEOUT)).toThrow(TIMED_OUT_ERROR);
  });
});
