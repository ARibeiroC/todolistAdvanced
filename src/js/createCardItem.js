function createElementHtml(element) {
    return document.createElement(element)
}

function addClass(element, nameClass) {
    return element.classList.add(`${nameClass}`)
}

function removeClass(element, nameClass){
    return element.classList.remove(nameClass)
}

function removeAttribute(element, nameAttribute){
    return element.removeAttribute(nameAttribute)
}

function showElementInHtml(elementParent, elementChild){
    elementParent.appendChild(elementChild)
}

function createElementCardParent (element, parenteElementHtml, nameClass1, nameClass2, nameAttributeSet, valueAttribute) {    
    addClass(element, nameClass1)
    addClass(element, nameClass2)
    element.setAttribute(nameAttributeSet, `${valueAttribute}`)
    showElementInHtml(parenteElementHtml, element)
}

function createElementsOfCardParent(element, parenteElementHtml, nameClass = undefined, innerText = undefined, nameAttributeSet = undefined, valueAttribute = undefined) {
    
    if (nameClass !== undefined){
        addClass(element, nameClass)
    } else {
        removeClass(element, nameClass)
    }

    if (innerText !== undefined){
        element.innerHTML = innerText
    }

    if (nameAttributeSet !== undefined){
        element.setAttribute(nameAttributeSet, `doneBtn${valueAttribute}`)
    } else {
        removeAttribute(element, nameAttributeSet)
    }

    showElementInHtml(parenteElementHtml, element)
}

// function createButtonTask(
//     // createElementCardParent()
// )

export { createElementHtml, addClass, showElementInHtml, createElementCardParent, createElementsOfCardParent}

