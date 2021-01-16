import * as view from '../output/view.js'

QUnit.module("view");

QUnit.test('add two numbers', assert => {
    view.onStartButtonClicked((1, 2) => {
        
    })
    assert.dom('#startSnake').hasEven(view.onStartButtonClicked(() => console.log("trie")), "123");
});
