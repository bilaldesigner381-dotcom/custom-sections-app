import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function loader() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Database connection successful',
      time: result[0].current_time 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}