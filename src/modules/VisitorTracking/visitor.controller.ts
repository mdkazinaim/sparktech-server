import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { visitorService } from "./visitor.service";

const saveHeartbeat = catchAsync(async (req, res) => {
  const result = await visitorService.saveHeartbeat(req, req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Heartbeat logged successfully",
    data: result
  });
});

const getVisitorStats = catchAsync(async (req, res) => {
  const result = await visitorService.getVisitorStats(req);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Visitor statistics fetched successfully",
    data: result
  });
});

export const visitorController = {
  saveHeartbeat,
  getVisitorStats
};
