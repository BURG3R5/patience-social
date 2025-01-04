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

import { readableTime } from './utils.js';

let tickerInterval;
let tickerSeconds = 0;
let medianPatience = 1;

export function startTicker() {
    const ticker = document.getElementById('ticker');
    tickerSeconds = 0;
    tickerInterval = setInterval(() => {
        tickerSeconds++;
        ticker.textContent = `${readableTime(tickerSeconds * 1000)}`;
        ticker.style.color = getColorBasedOnMedian(tickerSeconds * 1000, medianPatience);
    }, 1000);
}

export function stopTicker() {
    clearInterval(tickerInterval);
}

export function setMedianPatience(median) {
    medianPatience = median;
}

function getColorBasedOnMedian(time, median) {
    const ratio = Math.min(time / median, 1);
    const red = Math.floor(255 * (1 - ratio));
    const green = Math.floor(255 * ratio);
    return `rgb(${red},${green},0)`;
}