import { Schema, model } from "mongoose";
import { IVisitorSession } from "./visitor.interface";

const pageVisitSchema = new Schema(
  {
    page: { type: String, required: true },
    title: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { _id: false }
);

export const visitorSessionSchema = new Schema<IVisitorSession>(
  {
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
  },
  {
    timestamps: true
  }
);

export const VisitorSession = model<IVisitorSession>("VisitorSession", visitorSessionSchema);
