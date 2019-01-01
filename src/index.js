/**
 * ScriptBoy
 *
 * 2019
 */
const test = ["I work!", "I really work!"];
const ensureBabelWorks = () => {
  const [phrase1, phrase2] = test;
  console.log(`${phrase1} ${phrase2}`);
};

ensureBabelWorks();