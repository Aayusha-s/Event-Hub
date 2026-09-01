import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { requireRole } from "@/middleware/auth/requireRole";
import { getReviews, getReviewSummary, upsertReview } from "@/services/attendee/attendee.service";
import { HttpError } from "@/utils/api/httpError";
type C={params:Promise<{id:string}>}; const id=async(c:C)=>{const {id}=await c.params;if(!Types.ObjectId.isValid(id))throw new HttpError(400,"Event id is invalid.","VALIDATION_ERROR");return new Types.ObjectId(id)}; const fail=(e:unknown)=>NextResponse.json({success:false,error:{message:e instanceof HttpError?e.message:"Unable to process reviews."}},{status:e instanceof HttpError?e.statusCode:500});
export async function GET(_:Request,c:C){try{const event=await id(c);return NextResponse.json({success:true,data:{items:await getReviews(event),summary:await getReviewSummary(event)}})}catch(e){return fail(e)}}
export async function POST(r:Request,c:C){try{const s=await requireRole(["attendee","organizer","vendor","ticket_checker","admin"]);const body=await r.json();const rating=Number(body.rating);const text=typeof body.text==="string"?body.text.trim():"";if(!Number.isInteger(rating)||rating<1||rating>5||!text)throw new HttpError(400,"A rating from 1 to 5 and review text are required.","VALIDATION_ERROR");return NextResponse.json({success:true,data:await upsertReview(new Types.ObjectId(s.user.id),await id(c),rating,text)})}catch(e){return fail(e)}}
