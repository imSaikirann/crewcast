import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const redis = getRedis()
export async function GET(
  req: NextRequest
) {
  try {

  

 
    const cached = await redis.get(cacheKeys.jobs);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

   
    const jobs = await prisma.recruiterForm.findMany({
      select: {
        id: true,
        publicId:true,
        title:true,
        techStack:true,
        description:true,
        salaryMax:true,
        salaryMin:true,
        experience:true,
        location:true,
        roleType:true,
        workMode:true,
      },
    });

    if (!jobs) {
      return NextResponse.json({ error: "jobs not found" }, { status: 404 });
    }




    await redis.setex(cacheKeys.jobs, 30, JSON.stringify(jobs)); 

    return NextResponse.json(jobs);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
