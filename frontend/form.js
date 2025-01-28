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

import { submitMessage } from './message.js';
import { placeholders } from './script.js';
import { startTicker, stopTicker } from './ticker.js';
import stringToColor from 'string-to-color';
import { randomChoice } from './utils.js';

const maxLength = 45;

function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z0-9\s.,!?]/g, '').substring(0, maxLength);
}

document.getElementById("submit-button").onclick = async function (event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username-input');
    const messageInput = document.getElementById('message-input');
    if (placeholders.indexOf(messageInput.textContent) !== -1) {
        messageInput.style.border = "2px solid red";
        return;
    }

    usernameInput.textContent = sanitizeInput(usernameInput.textContent.trim());
    messageInput.textContent = sanitizeInput(messageInput.textContent.trim());

    const success = await submitMessage();
    if (!success) {
        messageInput.style.border = "2px solid red";
    } else {
        messageInput.style.border = "";
        stopTicker();
        startTicker();
    }
};

document.getElementById("username-input").oninput = function (e) {
    e.target.style.color = stringToColor(e.target.textContent);
}

document.getElementById("username-input").onfocusout = function (e) {
    if (e.target.textContent === "") {
        e.target.textContent = "anonymous";
        e.target.style.color = stringToColor("anonymous");
    }
}

document.getElementById("message-input").onfocus = function (e) {
    if (placeholders.indexOf(e.target.textContent) !== -1) {
        e.target.textContent = "";
        e.target.style.color = "#ffffff";
        e.target.style.border = "";
    }
}

document.getElementById("message-input").onfocusout = function (e) {
    if (e.target.textContent === "") {
        e.target.textContent = randomChoice(placeholders);
        e.target.style.color = "#ffffff";
    }
}

document.getElementById("username-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

document.getElementById("message-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
            document.getElementById("submit-button").click();
        }
    }

    if (placeholders.indexOf(e.target.textContent) !== -1) {
        e.target.textContent = "";
        e.target.style.color = "#ffffff";
        e.target.style.border = "";
    }
});

export function displayTooltips() {
    $('[data-toggle="tooltip"]').tooltip();

    $('#username-input').tooltip('show');
    $('#message-input').tooltip('show');
    $('#submit-button').tooltip('show');
    $('#ticker').tooltip('show');

    setTimeout(() => {
        $('#username-input').tooltip('dispose');
        $('#message-input').tooltip('dispose');
        $('#submit-button').tooltip('dispose');
        $('#ticker').tooltip('dispose');
    }, 10000);
}