// Global array to work with
let gameArray = [];
let operationHistory = [];

// DOM elements
const arrayContainer = document.getElementById('array-container');
const arrayLength = document.getElementById('array-length');
const indexRange = document.getElementById('index-range');
const learningMessage = document.getElementById('learning-message');
const messageText = document.getElementById('message-text');
const historyContainer = document.getElementById('history-container');

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    updateArrayDisplay();
    showLearningMessage("Welcome to the Array Learning Game! 🎉 Arrays are ordered collections of elements. Start by adding some elements to see how arrays work.");
});

// Update the array display
function updateArrayDisplay() {
    arrayContainer.innerHTML = '';
    
    if (gameArray.length === 0) {
        arrayContainer.innerHTML = '<p style="color: #6c757d; font-style: italic;">Array is empty. Add some elements to get started!</p>';
    } else {
        gameArray.forEach((element, index) => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'array-element';
            elementDiv.textContent = element;
            elementDiv.setAttribute('data-index', index);
            arrayContainer.appendChild(elementDiv);
        });
    }
    
    arrayLength.textContent = gameArray.length;
    indexRange.textContent = gameArray.length > 0 ? `0 to ${gameArray.length - 1}` : '0 to -1';
}

// Show learning message
function showLearningMessage(message) {
    messageText.textContent = message;
    learningMessage.style.display = 'block';
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        learningMessage.style.display = 'none';
    }, 8000);
}

// Add operation to history
function addToHistory(operation, details) {
    const timestamp = new Date().toLocaleTimeString();
    const historyItem = {
        operation: operation,
        details: details,
        timestamp: timestamp,
        arrayState: [...gameArray]
    };
    
    operationHistory.unshift(historyItem);
    
    // Keep only last 20 operations
    if (operationHistory.length > 20) {
        operationHistory.pop();
    }
    
    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    historyContainer.innerHTML = '';
    
    operationHistory.forEach(item => {
        const historyDiv = document.createElement('div');
        historyDiv.className = 'history-item';
        historyDiv.innerHTML = `
            <strong>${item.operation}</strong> - ${item.details}
            <br><small>${item.timestamp} | Array: [${item.arrayState.join(', ')}]</small>
        `;
        historyContainer.appendChild(historyDiv);
    });
}

// Add element to end of array
function addElement() {
    const input = document.getElementById('element-input');
    const value = input.value.trim();
    
    if (value === '') {
        showLearningMessage("⚠️ Please enter a value to add to the array!");
        return;
    }
    
    gameArray.push(value);
    updateArrayDisplay();
    addToHistory('Add Element', `Added "${value}" to end of array`);
    
    showLearningMessage(`✅ Added "${value}" to the end of the array! This demonstrates the push() method. Arrays maintain order, so new elements are always added at the end. The array length increases by 1.`);
    
    input.value = '';
    highlightLastElement();
}

// Add element to beginning of array
function addElementAtBeginning() {
    const input = document.getElementById('element-input');
    const value = input.value.trim();
    
    if (value === '') {
        showLearningMessage("⚠️ Please enter a value to add to the beginning of the array!");
        return;
    }
    
    gameArray.unshift(value);
    updateArrayDisplay();
    addToHistory('Add to Beginning', `Added "${value}" to beginning of array`);
    
    showLearningMessage(`✅ Added "${value}" to the beginning! This uses unshift() method. All existing elements shift right by 1 position. This operation has O(n) time complexity because all elements must move.`);
    
    input.value = '';
    highlightFirstElement();
}

// Insert element at specific index
function insertElement() {
    const input = document.getElementById('element-input');
    const indexInput = document.getElementById('insert-index');
    const value = input.value.trim();
    const index = parseInt(indexInput.value);
    
    if (value === '') {
        showLearningMessage("⚠️ Please enter a value to insert!");
        return;
    }
    
    if (isNaN(index) || index < 0 || index > gameArray.length) {
        showLearningMessage(`⚠️ Invalid index! Please enter a number between 0 and ${gameArray.length}`);
        return;
    }
    
    gameArray.splice(index, 0, value);
    updateArrayDisplay();
    addToHistory('Insert Element', `Inserted "${value}" at index ${index}`);
    
    showLearningMessage(`✅ Inserted "${value}" at index ${index}! The splice() method can insert elements at any position. Elements from the insertion point onwards shift right. This operation has O(n) complexity.`);
    
    input.value = '';
    indexInput.value = '';
    highlightElementAtIndex(index);
}

// Remove last element
function removeLast() {
    if (gameArray.length === 0) {
        showLearningMessage("⚠️ Array is empty! There's nothing to remove.");
        return;
    }
    
    const removedElement = gameArray.pop();
    updateArrayDisplay();
    addToHistory('Remove Last', `Removed "${removedElement}" from end of array`);
    
    showLearningMessage(`✅ Removed "${removedElement}" from the end! The pop() method removes and returns the last element. This is very efficient (O(1)) because no other elements need to move.`);
}

// Remove first element
function removeFirst() {
    if (gameArray.length === 0) {
        showLearningMessage("⚠️ Array is empty! There's nothing to remove.");
        return;
    }
    
    const removedElement = gameArray.shift();
    updateArrayDisplay();
    addToHistory('Remove First', `Removed "${removedElement}" from beginning of array`);
    
    showLearningMessage(`✅ Removed "${removedElement}" from the beginning! The shift() method removes the first element. All remaining elements shift left by 1 position. This has O(n) complexity.`);
}

// Remove element at specific index
function removeAtIndex() {
    const indexInput = document.getElementById('remove-index');
    const index = parseInt(indexInput.value);
    
    if (isNaN(index) || index < 0 || index >= gameArray.length) {
        showLearningMessage(`⚠️ Invalid index! Please enter a number between 0 and ${gameArray.length - 1}`);
        return;
    }
    
    const removedElement = gameArray.splice(index, 1)[0];
    updateArrayDisplay();
    addToHistory('Remove at Index', `Removed "${removedElement}" from index ${index}`);
    
    showLearningMessage(`✅ Removed "${removedElement}" from index ${index}! The splice() method can remove elements from any position. Elements after the removal point shift left. This has O(n) complexity.`);
    
    indexInput.value = '';
}

// Reverse array
function reverseArray() {
    if (gameArray.length === 0) {
        showLearningMessage("⚠️ Array is empty! There's nothing to reverse.");
        return;
    }
    
    gameArray.reverse();
    updateArrayDisplay();
    addToHistory('Reverse Array', 'Reversed the order of all elements');
    
    showLearningMessage(`✅ Array reversed! The reverse() method changes the order of elements in-place. First becomes last, last becomes first. This operation has O(n) complexity.`);
    
    // Highlight all elements briefly
    highlightAllElements();
}

// Sort array
function sortArray() {
    if (gameArray.length === 0) {
        showLearningMessage("⚠️ Array is empty! There's nothing to sort.");
        return;
    }
    
    gameArray.sort();
    updateArrayDisplay();
    addToHistory('Sort Array', 'Sorted array in ascending order');
    
    showLearningMessage(`✅ Array sorted! The sort() method arranges elements in ascending order. For strings, it uses alphabetical order. For numbers, it converts to strings first (be careful!). This has O(n log n) complexity.`);
    
    highlightAllElements();
}

// Clear array
function clearArray() {
    if (gameArray.length === 0) {
        showLearningMessage("⚠️ Array is already empty!");
        return;
    }
    
    const previousLength = gameArray.length;
    gameArray = [];
    updateArrayDisplay();
    addToHistory('Clear Array', `Cleared all ${previousLength} elements`);
    
    showLearningMessage(`✅ Array cleared! All ${previousLength} elements removed. The array length is now 0. This is very efficient (O(1)) as it just resets the array reference.`);
}

// Shuffle array
function shuffleArray() {
    if (gameArray.length === 0) {
        showLearningMessage("⚠️ Array is empty! There's nothing to shuffle.");
        return;
    }
    
    // Fisher-Yates shuffle algorithm
    for (let i = gameArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameArray[i], gameArray[j]] = [gameArray[j], gameArray[i]];
    }
    
    updateArrayDisplay();
    addToHistory('Shuffle Array', 'Randomly shuffled array elements');
    
    showLearningMessage(`✅ Array shuffled! Used the Fisher-Yates algorithm for unbiased shuffling. Each element has equal probability of ending up in any position. This has O(n) complexity.`);
    
    highlightAllElements();
}

// Search for element
function searchElement() {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim();
    
    if (searchValue === '') {
        showLearningMessage("⚠️ Please enter a value to search for!");
        return;
    }
    
    if (gameArray.length === 0) {
        showLearningMessage("⚠️ Array is empty! There's nothing to search.");
        return;
    }
    
    const index = gameArray.indexOf(searchValue);
    
    if (index === -1) {
        showLearningMessage(`❌ Element "${searchValue}" not found in the array! The indexOf() method returns -1 when an element is not present.`);
    } else {
        showLearningMessage(`✅ Found "${searchValue}" at index ${index}! The indexOf() method performs linear search from left to right. It returns the first occurrence found. This has O(n) complexity.`);
        highlightElementAtIndex(index);
    }
    
    searchInput.value = '';
}

// Access element at index
function accessElement() {
    const accessInput = document.getElementById('access-index');
    const index = parseInt(accessInput.value);
    
    if (isNaN(index) || index < 0 || index >= gameArray.length) {
        showLearningMessage(`⚠️ Invalid index! Please enter a number between 0 and ${gameArray.length - 1}`);
        return;
    }
    
    const element = gameArray[index];
    addToHistory('Access Element', `Accessed element "${element}" at index ${index}`);
    
    showLearningMessage(`✅ Accessed element "${element}" at index ${index}! Array access using bracket notation [${index}] is very fast (O(1)) because arrays provide direct memory access to any position.`);
    
    accessInput.value = '';
    highlightElementAtIndex(index);
}

// Highlight functions
function highlightLastElement() {
    if (gameArray.length > 0) {
        const elements = arrayContainer.querySelectorAll('.array-element');
        const lastElement = elements[elements.length - 1];
        lastElement.classList.add('highlight');
        setTimeout(() => lastElement.classList.remove('highlight'), 500);
    }
}

function highlightFirstElement() {
    if (gameArray.length > 0) {
        const elements = arrayContainer.querySelectorAll('.array-element');
        const firstElement = elements[0];
        firstElement.classList.add('highlight');
        setTimeout(() => firstElement.classList.remove('highlight'), 500);
    }
}

function highlightElementAtIndex(index) {
    if (index >= 0 && index < gameArray.length) {
        const elements = arrayContainer.querySelectorAll('.array-element');
        const element = elements[index];
        element.classList.add('highlight');
        setTimeout(() => element.classList.remove('highlight'), 500);
    }
}

function highlightAllElements() {
    const elements = arrayContainer.querySelectorAll('.array-element');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('highlight');
            setTimeout(() => element.classList.remove('highlight'), 500);
        }, index * 100);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'element-input') {
            addElement();
        } else if (activeElement.id === 'search-input') {
            searchElement();
        }
    }
});

// Add some sample data for demonstration
function addSampleData() {
    if (gameArray.length === 0) {
        const sampleData = ['Apple', 'Banana', 'Cherry', 'Date'];
        gameArray.push(...sampleData);
        updateArrayDisplay();
        addToHistory('Add Sample Data', 'Added sample fruits to demonstrate array operations');
        showLearningMessage("🍎 Added sample data! Now you can try all the array operations. Arrays can store any type of data - strings, numbers, objects, or even other arrays!");
    }
}

// Add a button to add sample data (optional)
setTimeout(() => {
    if (gameArray.length === 0) {
        const sampleButton = document.createElement('button');
        sampleButton.textContent = '🎯 Add Sample Data';
        sampleButton.style.cssText = 'background: #17a2b8; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;';
//         sampleButton.onclick = addSampleData;
//         arrayContainer.appendChild(sampleButton);
//     }
}, 2000);
