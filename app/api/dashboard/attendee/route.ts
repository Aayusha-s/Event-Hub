import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { getAttendeeDashboard } from "@/services/attendee/attendee.service";
import { HttpError } from "@/utils/api/httpError";
export async function GET(){try{const s=await requireRole(["attendee","organizer","vendor","ticket_checker","admin"]);return NextResponse.json({success:true,data:await getAttendeeDashboard(new Types.ObjectId(s.user.id))})}catch(e){return NextResponse.json({success:false,error:{message:e instanceof HttpError?e.message:"Unable to load dashboard."}},{status:e instanceof HttpError?e.statusCode:500})}}
