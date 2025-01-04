/**
 * Patience Social is a unique forum that rewards patience.
 * Copyright (C) 2025 Aditya Rajput & other contributors

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the third version of the GNU Affero General
 * Public License as published by the Free Software Foundation.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import { readableTime, readableTimestamp, randomChoice } from './utils.js';
import stringToColor from 'string-to-color';
import { placeholders } from './script.js';


let lastMessageTime = Date.now();

function getColorBasedOnMedian(time, median) {
    const ratio = Math.min(time / median, 1);
    const red = Math.floor(255 * (1 - ratio));
    const green = Math.floor(255 * ratio);
    return `rgb(${red},${green},0)`;
}

export function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const authorElement = document.createElement('span');
    authorElement.classList.add('message-author');
    authorElement.textContent = message.author;
    authorElement.style.color = stringToColor(message.author);

    const patienceElement = document.createElement('span');
    patienceElement.classList.add('message-patience');
    patienceElement.textContent = readableTime(message.timeSinceLastMessage);
    patienceElement.style.color = getColorBasedOnMedian(message.timeSinceLastMessage, message.medianPatience);

    const waitedText = document.createElement('span');
    waitedText.textContent = ' waited ';
    waitedText.style.color = 'grey';

    const toSayText = document.createElement('span');
    toSayText.textContent = ' to say: ';
    toSayText.style.color = 'grey';

    const contentElement = document.createElement('span');
    contentElement.textContent = message.content;
    contentElement.style.color = 'black';

    const timestampElement = document.createElement('small');
    timestampElement.classList.add('message-timestamp');
    timestampElement.textContent = readableTimestamp(message.timestamp);

    const messageLHSElement = document.createElement('div');
    messageLHSElement.classList.add('message-content');
    messageLHSElement.appendChild(authorElement);
    messageLHSElement.appendChild(waitedText);
    messageLHSElement.appendChild(patienceElement);
    messageLHSElement.appendChild(toSayText);
    messageLHSElement.appendChild(contentElement);

    messageElement.appendChild(messageLHSElement);
    messageElement.appendChild(timestampElement);

    const bottomAlign = document.getElementById('bottom-align');
    const messageDisplay = document.getElementById('message-display');
    bottomAlign.appendChild(messageElement);
    messageDisplay.scrollTop = bottomAlign.scrollHeight;

    const currentTime = new Date().getTime();
    const messageTime = new Date(message.timestamp).getTime();
    const remainingTime = messageTime + message.timeSinceLastMessage - currentTime;

    if (remainingTime > 0) {
        setTimeout(() => {
            bottomAlign.removeChild(messageElement);
        }, remainingTime);
    } else {
        bottomAlign.removeChild(messageElement);
    }
}

export async function fetchMessages() {
    const response = await fetch('/api/messages');
    const messages = await response.json();

    const messageDisplay = document.getElementById('bottom-align');
    messageDisplay.innerHTML = '';

    messages.forEach(displayMessage);
}

export async function submitMessage() {
    const messageInput = document.getElementById('message-input');
    const usernameInput = document.getElementById('username-input');
    const message = messageInput.textContent.trim();
    const username = usernameInput.textContent.trim() || 'anonymous';

    if (!message) {
        return false;
    }

    messageInput.textContent = randomChoice(placeholders);
    messageInput.style.color = "grey";

    const currentTime = new Date();
    let timeSinceLastMessage = currentTime - lastMessageTime;
    lastMessageTime = currentTime;

    await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message, author: username, timeSinceLastMessage }),
    });

    return true;
}