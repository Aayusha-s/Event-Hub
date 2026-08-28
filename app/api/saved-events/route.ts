import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { listSavedEvents, toggleSavedEvent } from "@/services/attendee/attendee.service";
import { HttpError } from "@/utils/api/httpError";
const fail=(e:unknown)=>NextResponse.json({success:false,error:{message:e instanceof HttpError?e.message:"Unable to process saved events."}},{status:e instanceof HttpError?e.statusCode:500});
export async function GET(r:Request){try{const s=await requireRole(["attendee","organizer","vendor","ticket_checker","admin"]),q=new URL(r.url).searchParams,page=Math.max(1,Number(q.get("page")??1)),pageSize=Math.min(50,Math.max(1,Number(q.get("pageSize")??12))),free=q.get("free");return NextResponse.json({success:true,data:await listSavedEvents(new Types.ObjectId(s.user.id),page,pageSize,q.get("q")?.trim()||undefined,q.get("category")?.trim()||undefined,q.get("date")||undefined,q.get("time")||undefined,free === null ? undefined : free === "true")})}catch(e){return fail(e)}}
export async function POST(r:Request){try{const s=await requireRole(["attendee","organizer","vendor","ticket_checker","admin"]);const {eventId}=await r.json();if(!Types.ObjectId.isValid(eventId))throw new HttpError(400,"eventId is invalid.","VALIDATION_ERROR");return NextResponse.json({success:true,data:await toggleSavedEvent(new Types.ObjectId(s.user.id),new Types.ObjectId(eventId))})}catch(e){return fail(e)}}
