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

import express from 'express';
import Message from './message.js';
import { broadcastMessage } from './app.js';

const router = express.Router();

const maxLength = 45;

function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z0-9\s.,!?]/g, '').substring(0, maxLength);
}

function calculateMedian(values) {
    if (values.length === 0) return 0;

    values.sort((a, b) => a - b);

    const half = Math.floor(values.length / 2);
    if (values.length % 2) return values[half];
    return (values[half - 1] + values[half]) / 2.0;
}

router.post('/messages', async (req, res) => {
    var { content, author, timeSinceLastMessage } = req.body;

    content = sanitizeInput(content);
    author = sanitizeInput(author);

    const messages = await Message.find().sort({ timestamp: 1 });
    const patienceTimes = messages.map(message => message.timeSinceLastMessage);
    const medianPatience = calculateMedian([...patienceTimes, timeSinceLastMessage]);

    const message = new Message({ content, author, timeSinceLastMessage, medianPatience });
    await message.save();

    broadcastMessage({ content, author, timestamp: message.timestamp, timeSinceLastMessage, medianPatience });

    res.sendStatus(200);
});

router.get('/messages', async (_, res) => {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
});

export default router;