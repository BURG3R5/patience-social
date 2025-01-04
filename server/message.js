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

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    content: String,
    author: String,
    timestamp: { type: Date, default: Date.now },
    timeSinceLastMessage: Number,
    medianPatience: Number,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;