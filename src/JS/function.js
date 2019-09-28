export function createNode(tag, tagClass){
    const element = document.createElement(tag);
    element.classList.add(tagClass);
    return element;
}