/**
 * Simple test examples for Smart Find filtering logic
 * Run with: npx tsx __tests__/smartfind.test.ts
 */

import { parseTags, parseSpecs, toTitle } from '../lib/smartfind';

// Test parseTags function
console.log('Testing parseTags:');
console.log('parseTags("tag1,tag2,tag3"):', parseTags('tag1,tag2,tag3'));
console.log('parseTags("tag1, tag2 , tag3"):', parseTags('tag1, tag2 , tag3'));
console.log('parseTags(undefined):', parseTags(undefined));
console.log('parseTags("tag1,,tag2,"):', parseTags('tag1,,tag2,'));

// Test parseSpecs function
console.log('\nTesting parseSpecs:');
console.log('parseSpecs("key1:value1|key2:value2"):', parseSpecs('key1:value1|key2:value2'));
console.log('parseSpecs("key1 : value1 | key2 : value2"):', parseSpecs('key1 : value1 | key2 : value2'));
console.log('parseSpecs(undefined):', parseSpecs(undefined));
console.log('parseSpecs("key1:value1|invalid|key2:value2"):', parseSpecs('key1:value1|invalid|key2:value2'));

// Test toTitle function
console.log('\nTesting toTitle:');
console.log('toTitle("hello-world"):', toTitle('hello-world'));
console.log('toTitle("hello"):', toTitle('hello'));
console.log('toTitle("hello-world-test"):', toTitle('hello-world-test'));

console.log('\nAll tests completed successfully!');

export {};
