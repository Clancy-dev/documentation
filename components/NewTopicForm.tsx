"use client"

import { useState, useEffect } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadButton } from "@/utils/uploadthing"
import toast from "react-hot-toast"
import FilePathInput from "./FileInputPath"
import { createNewTopic, updateTopic } from "@/actions/Topic"
import { CodeSection, Topic } from "@prisma/client"

export type TopicFormData = {
  title: string
  explanation: string
  slug: string
  explanationTab: string
  previewTab: string
  image: string
  codeSections: {
    title: string
    location: string
    code: string
    language: "react" | "css"
  }[]
}

const QuillEditor = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
    theme: "snow",
  })
//s
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML)
      })
    }
  }, [quill, onChange])

  useEffect(() => {
    if (quill && value && quill.root.innerHTML !== value) {
      quill.root.innerHTML = value
    }
  }, [quill, value])  // Re-run the effect when the explanation value changes

  return <div ref={quillRef} />
}

export default function NewTopicForm({oldData}:{oldData?:Topic| CodeSection| null}) {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("/empty.png")
  const [selectedSections, setSelectedSections] = useState<string[]>(["all"])
  const [explanation, setExplanation] = useState<string>("") // Store explanation persistently
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TopicFormData>({
    defaultValues: {
    title: "",
    explanation: "",
    slug: "",
    explanationTab: "explanationTab",
    previewTab: "previewTab",
    image: "/empty.png",
    codeSections: [{ title: "", location: "", code: "", language: "react" }],
      ...(oldData) // Merge oldData if available
    },
  })

  

  const { fields, append, remove } = useFieldArray({
    control,
    name: "codeSections",
  })

  const steps = ["Basic Info", "Code Sections", "Preview Image"]

  const getVisibleSteps = () => steps

  const onSubmit = async (data: TopicFormData) => {
    data.slug = data.title.toLowerCase().split(" ").join("-")
    data.image = imageUrl
    const id = oldData?.id
    //update
    if (oldData) {
      try {
          setLoading(true);
          const updatedTopic = await updateTopic({
              title: data.title,
              explanation: data.explanation, 
              slug: data.slug,
              image: data.image,
              explanationTab: data.explanationTab,
              previewTab: data.previewTab,
              codeSections: [...data.codeSections], // Ensure previous data persists 
          }, id as string);
          router.push("/");
          router.refresh();  
          console.log("Updated Topic:", updatedTopic); 
          toast.success("Concept updated Successfully!"); 
          return
  
      } catch (error) {
          console.error(error);
          toast.error("Failed to update.");
      } finally {
          setLoading(false);
      }
  }
  

    //create
    try {
      setLoading(true)
      await createNewTopic(data);
      console.log(data);
      router.push("/");
      toast.success("Concept created successfully.");
      return; 
    } catch (error) {
      console.error(error)
      toast.error("Failed to create the concept.");
    } finally {
      setLoading(false)
    }
  }

  // Helper to determine if we should show the submit button
  const shouldShowSubmit = () => {
    return activeStep === steps.length - 1
  }

  // Simplified helper to check if we can submit
  const canSubmit = () => true
  useEffect(() => {
    if (oldData) {
      if ('explanation' in oldData && 'image' in oldData) {
        // If oldData is a Topic
        setValue("explanation", oldData.explanation); // Set explanation
        setValue("image", oldData.image || "/empty.png"); // Set image URL
        setImageUrl(oldData.image || "/empty.png"); // Set imageUrl state
      } else if ('code' in oldData && 'location' in oldData) {
        // If oldData is a CodeSection, set only the relevant fields
        // e.g., set codeSection-specific data here if necessary
      }

      if ("codeSections" in oldData && Array.isArray(oldData.codeSections)) {
        // Ensure codeSections exist before setting them
        setValue("codeSections", oldData.codeSections);
      }
    }
  }, [oldData, setValue]);
  

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-2">New Concept</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Tabs
            defaultValue={getVisibleSteps()[activeStep]}
            value={getVisibleSteps()[activeStep]}
            onValueChange={(value) => setActiveStep(getVisibleSteps().indexOf(value))}
          >
            <TabsList
              className="grid w-full"
              style={{ gridTemplateColumns: `repeat(${getVisibleSteps().length}, 1fr)` }}
            >
              {getVisibleSteps().map((step, index) => (
                <TabsTrigger key={step} value={step} disabled={index > activeStep}>
                  Step {index + 1}: {step}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="Basic Info">
              <div className="space-y-4">
                {/* Hidden input */}
                <Input type="hidden" {...register("explanationTab")} />
                <div>
                  <Label htmlFor="title">Title of Your Concept</Label>
                  <Input id="title" {...register("title", { required: "Title is required" })} />
                  {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="explanation">Detailed Explanation of Your Concept</Label>
                  <Controller
                    name="explanation"
                    control={control}
                    rules={{ required: "Explanation is required" }}
                    render={({ field }) => <QuillEditor  onChange={(val) => { setExplanation(val); field.onChange(val) }} value={field.value || explanation} />}
                    />
                  {errors.explanation && <p className="text-red-500">{errors.explanation.message}</p>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Code Sections">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-2 p-4 border rounded">
                    <Label htmlFor={`codeSections.${index}.title`}>Name of Your Code file</Label>
                    <Input {...register(`codeSections.${index}.title` as const, { required: "Title is required" })}
                      placeholder="eg. Counter.tsx" 
                    />

                    <Label htmlFor={`codeSections.${index}.location`}>Location of Your Code file</Label>
                    <Controller
                      name={`codeSections.${index}.location` as const}
                      control={control}
                      rules={{ required: "Location is required" }}
                      render={({ field }) => <FilePathInput value={field.value} onChange={field.onChange} />}
                    />

                    <div className="mt-2">
                      <Label htmlFor={`codeSections.${index}.language`}>Language</Label>
                      <select
                        {...register(`codeSections.${index}.language` as const)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="react">React</option>
                        <option value="css">CSS</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor={`codeSections.${index}.code`}>Code</Label>
                      <Controller
                        name={`codeSections.${index}.code` as const}
                        control={control}
                        rules={{ required: "Code is required" }}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            className="w-full min-h-[200px] p-2 border rounded font-mono text-sm"
                            placeholder="Enter your code here..."
                          />
                        )}
                      />
                    </div>

                    <Button type="button" onClick={() => remove(index)} variant="destructive">
                      Remove Code file
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => append({ title: "", location: "", code: "", language: "react" })}>
                  Add Another Code file
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="Preview Image">
              {/* Hidden input */}
              <Input type="hidden" {...register("previewTab")} />
              <div className="space-y-2">
                <Label htmlFor="preview" className="text-black font-semibold">
                  Preview Image
                </Label>
                <div className="w-full min-h-[40vh] bg-slate-200 rounded-[10px]">
                  <div className="w-full h-[30vh] flex items-center justify-center">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      width={512}
                      height={512}
                      alt="Preview image"
                      className="max-h-[100%] max-w-[30%]"
                    />
                  </div>
                  <div className="w-full min-h-[15vh] flex items-center justify-center">
                    <UploadButton
                      endpoint="singleImageUploader"
                      onClientUploadComplete={(res) => {
                        console.log("Files: ", res)
                        setImageUrl(res[0].url)
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`)
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {/* Show Next button if not on last step */}
              {activeStep < steps.length - 1 && (
                <Button type="button" onClick={() => setActiveStep((prev) => prev + 1)}>
                  Next
                </Button>
              )}

              {/* Show Submit button on last step */}
              {activeStep === steps.length - 1 && (
                <Button type="submit" disabled={loading} variant="default">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                    {oldData ? "Updating Concept..." : "Creating Concept..."}
                  </div>
                ) : (
                  oldData ? "Update Concept" : "Create Concept"
                )}
              </Button>   
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

