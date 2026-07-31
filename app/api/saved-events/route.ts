import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { getSavedEvents, toggleSavedEvent } from "@/services/attendee/attendee.service";
import { HttpError } from "@/utils/api/httpError";
const fail=(e:unknown)=>NextResponse.json({success:false,error:{message:e instanceof HttpError?e.message:"Unable to process saved events."}},{status:e instanceof HttpError?e.statusCode:500});
export async function GET(){try{const s=await requireRole(["attendee","organizer","vendor","ticket_checker","admin"]);return NextResponse.json({success:true,data:{items:await getSavedEvents(new Types.ObjectId(s.user.id))}})}catch(e){return fail(e)}}
export async function POST(r:Request){try{const s=await requireRole(["attendee","organizer","vendor","ticket_checker","admin"]);const {eventId}=await r.json();if(!Types.ObjectId.isValid(eventId))throw new HttpError(400,"eventId is invalid.","VALIDATION_ERROR");return NextResponse.json({success:true,data:await toggleSavedEvent(new Types.ObjectId(s.user.id),new Types.ObjectId(eventId))})}catch(e){return fail(e)}}
