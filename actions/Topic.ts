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
            explanationTab:data.explanationTab,
            previewTab:data.previewTab,
            codeSections: {
              create: data.codeSections.map((section) => ({
                title: section.title,
                location: section.location,
                code: section.code,
                language:section.language
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


export async function fetchTopics(){
    try {
      const fetchedTopics = await db.topic.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          codeSections: true, // Include related codeSections
        },
      });
  
      return fetchedTopics;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw new Error("Failed to fetch topics");
      
    }
  }


  export async function fetchSingleTopic(slug:string){
    try {
    const singleTopic = await db.topic.findUnique({
      where:{
        slug
      },
      include: {
        codeSections: true, // Include related codeSections
      },
    }) 
    return singleTopic 
    } catch (error) {
     console.log(error) 
    }
  }

  export async function updateTopic(data: TopicFormData, id: string) {
    try {
        const updatedTopic = await db.topic.update({
            where: { id },
            data: {
                title: data.title,
                explanation: data.explanation,
                slug: data.slug,
                image: data.image,
                explanationTab: data.explanationTab,
                previewTab: data.previewTab,

                codeSections: {
                    updateMany: data.codeSections.map((section) => ({
                        where: { id },
                        data: {
                            title: section.title,
                            code: section.code,
                            language: section.language,
                            location: section.location
                        },
                    })),
                   
                },
            },
            include: {
                codeSections: true, // Ensures we return the updated topic with its code sections
            },
        });

        revalidatePath("/");

        return updatedTopic; 
    } catch (error) {
        console.error("Update Error:", error);
        throw new Error("Failed to update topic");
    }
}

