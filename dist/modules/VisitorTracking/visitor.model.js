"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorSession = exports.visitorSessionSchema = void 0;
const mongoose_1 = require("mongoose");
const pageVisitSchema = new mongoose_1.Schema({
    page: { type: String, required: true },
    title: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { _id: false });
exports.visitorSessionSchema = new mongoose_1.Schema({
    sessionToken: { type: String, required: true, index: true },
    ip: { type: String },
    country: { type: String, default: "Unknown" },
    countryCode: { type: String, default: "UN" },
    city: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    userAgent: { type: String },
    referrer: { type: String },
    isReturning: { type: Boolean, default: false },
    activePage: { type: String },
    activePageTitle: { type: String },
    pagesVisited: [pageVisitSchema],
    duration: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now, index: true }
}, {
    timestamps: true
});
exports.VisitorSession = (0, mongoose_1.model)("VisitorSession", exports.visitorSessionSchema);
