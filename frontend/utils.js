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

export function readableTime(t) {
    const timeInSeconds = t / 1000;

    if (timeInSeconds < 1) return `${Math.floor(timeInSeconds * 1000)} milliseconds`;
    if (timeInSeconds < 60) return `${Math.floor(timeInSeconds)} seconds`;
    if (timeInSeconds < 3600) return `${Math.floor(timeInSeconds / 60)} minutes`;
    if (timeInSeconds < 86400) return `${Math.floor(timeInSeconds / 3600)} hours`;
    return `${Math.floor(timeInSeconds / 86400)} days`;
}

export function readableTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const isSameDay = date.toDateString() === now.toDateString();
    const isSameYear = date.getFullYear() === now.getFullYear();

    if (isSameDay) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isSameYear) {
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    } else {
        return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
    }
}

export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}
