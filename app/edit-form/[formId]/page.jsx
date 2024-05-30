"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RWebShare } from "react-web-share";

const EditForm = ({ params }) => {
  // params return form ID

  // current user
  const { user } = useUser();

  // Save Data Use which stores array
  const [jsonForm, setJsonForm] = useState([]);

  // to redirect on previous screen
  const router = useRouter();

  // set Updated info
  const [updateTrigger, setUpdateTrigger] = useState();

  // store record
  const [record, setRecord] = useState([]);

  // theme
  const [selectedTheme, setSelectedTheme] = useState("light");

  // formBackground
  const [selectedBackground, setSelectedBackground] = useState();
  
  // Style
  const [selectedStyle, setSelectedStyle] = useState();

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  // get form data
  const GetFormData = async () => {
    // select data from db based on id and user
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    // console.log(result);

    // update jsonForm hook -- parse json
    setJsonForm(JSON.parse(result[0].jsonform));
    setRecord(result[0]);
    setSelectedTheme(result[0].theme);
    setSelectedBackground(result[0].background);
    setSelectedStyle(JSON.parse(result[0].style))
    // console.log(JSON.parse(result[0].jsonform));
  };

  // EDIT
  // onFieldUpdate --> change value according to index
  // changing label and placeholder

  useEffect(() => {
    if (updateTrigger) {
      // update json values
      setJsonForm(jsonForm);

      // reflect changes in DB
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value, index) => {
    jsonForm.fields[index].label = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    // console.log(jsonForm);
    setUpdateTrigger(Date.now());
  };

  // Store Changes in DB
  const updateJsonFormInDb = async () => {
    const result = await db
      .update(JsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms.id });

    toast("Updated Successfully");
    // console.log(result);
  };

  // DELETE
  const deleteField = (indexToRemove) => {
    const result = jsonForm.fields.filter(
      (item, index) => index != indexToRemove
    );
    // console.log(result);

    jsonForm.fields = result;
    setUpdateTrigger(Date.now);
    toast("Deleted Successfully");
  };

  // FOR THEME
  const updateControllerFields = async (value, columnName) => {
    const result = await db
      .update(JsonForms)
      .set({
        [columnName] : value
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms.id });

    toast('Updated Successfully');
    console.log(result);
  };

  return (
    <div className="p-10">

    <div className="md:flex items-center justify-between">
      <h2
        onClick={() => router.back()}
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-semibold transition-all"
      >
        <ArrowLeft /> Back
      </h2>

{/* Controls */}
      <div className="flex items-center justify-between gap-2 mb-4">
      <Link href={'/aiform/'+record?.id} target='_blank'>
      <Button variant='outline' className='flex items-center gap-2'><SquareArrowOutUpRight className="h-5 w-5"/> Live Preview</Button>
      </Link>
       
        {/* Web share */}
      <RWebShare
        data={{
          text: jsonForm?.formHeading + "Build your form in seconds using AI Builder",
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+record?.id,
          title: jsonForm?.formTitle,
        }}
        disableNative={true}
        onClick={() => console.log("shared successfully!")}
      >
        <Button
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-950 "
        >
          <Share2 className="h-5 w-5" /> Share
        </Button>
      </RWebShare>

      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Controller */}
        <div className="p-5 border rounded-lg shadow-lg">
          <Controller

// Theme
            selectedTheme={(value) => {
              // to reflect in DB
              updateControllerFields(value, "theme");
              // set theme
              setSelectedTheme(value);
            }}

// Background
            selectedBackground={(value) => {
              updateControllerFields(value, "background");
            setSelectedBackground(value)}
            }
// Style
            selectedStyle={(value) => {
              setSelectedStyle(value);
              updateControllerFields(value, 'style')
            }}

// Sign in
            setSignInEnabled={(value)=> {
              updateControllerFields(value, "enabledSignIn");
            }}
          />
        </div>

        {/* Form */}
        <div
          className="md:col-span-2 p-5 border rounded-lg w-full flex justify-center items-center"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            selectedStyle={selectedStyle}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)}
            formId = {record?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
