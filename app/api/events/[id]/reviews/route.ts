import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { getReviews, getReviewSummary, upsertReview } from "@/services/attendee/attendee.service";
import { HttpError } from "@/utils/api/httpError";
type C={params:Promise<{id:string}>}; const id=async(c:C)=>{const {id}=await c.params;if(!Types.ObjectId.isValid(id))throw new HttpError(400,"Event id is invalid.","VALIDATION_ERROR");return new Types.ObjectId(id)}; const fail=(e:unknown)=>NextResponse.json({success:false,error:{message:e instanceof HttpError?e.message:"Unable to process reviews."}},{status:e instanceof HttpError?e.statusCode:500});
export async function GET(_:Request,c:C){try{const event=await id(c);return NextResponse.json({success:true,data:{items:await getReviews(event),summary:await getReviewSummary(event)}})}catch(e){return fail(e)}}
export async function POST(r:Request,c:C){try{const s=await requireRole(["attendee","organizer","vendor","ticket_checker","admin"]);const body=await r.json();if(!Number.isInteger(body.rating)||body.rating<1||body.rating>5||typeof body.text!=="string")throw new HttpError(400,"A rating from 1 to 5 and review text are required.","VALIDATION_ERROR");return NextResponse.json({success:true,data:await upsertReview(new Types.ObjectId(s.user.id),await id(c),body.rating,body.text.trim())})}catch(e){return fail(e)}}
