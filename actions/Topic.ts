"use server"

import { TopicFormData } from "@/components/NewTopicForm";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function createNewTopic(data:TopicFormData){
    try {
        const newTopicCreated = await db.topic.create({
          data: {
            title: data.title,
            explanation: data.explanation,
            slug: data.slug,
            image: data.image,
            codeSections: {
              create: data.codeSections.map((section) => ({
                title: section.title,
                location: section.location,
                code: section.code,
              })),
            },
          },
          include: {
            codeSections: true, // Ensure code sections are returned
          },
        });
    
 revalidatePath("/")


  return newTopicCreated
  
 } catch (error) {
  console.log(error)
 }
}



