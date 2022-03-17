/**
 * @jest-environment jsdom
 */
const createUserNode = require('./index.js');

// Write a test case to verify the creation of userNode
function createUserNodeTest(){
  const result = Object.assign(document.createElement('li'), {
    id: '1',
    classList: ['list-group-item list-group-item-action'],
    innerHTML: 'Leanne Graham'
  });

  result.setAttribute('title', 'Email: Sincere@april.biz\nUsername: Bret');
  result.setAttribute('data-email', 'Sincere@april.biz');
  result.setAttribute('data-username', 'Bret');

  // using toBeTruthy to ensure a value is true in a boolean context
  test('create user node with given values', () => {
    expect(result.isEqualNode(createUserNode(1, 'Leanne Graham', 'Sincere@april.biz', 'Bret'))).toBeTruthy()
  })
}

createUserNodeTest();
