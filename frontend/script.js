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

import { fetchMessages } from './message.js';
import { startTicker } from './ticker.js';
import { displayTooltips } from './form.js';
import stringToColor from 'string-to-color';
import './form.js';
import './websocket.js';

export const placeholders = [
    "something amazing :O",
    "something funny :D",
    "something random :P",
    "something cool B)",
    "something weird :/",
    "something nice :)",
    "something awful :(",
    "something boring :|",
];

window.onload = function () {
    document.getElementById("username-input").style.color = stringToColor("anonymous");
    startTicker();
    fetchMessages();
    displayTooltips();
};
