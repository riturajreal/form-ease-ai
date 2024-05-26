"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import FormUi from "../_components/FormUi";

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
    console.log(JSON.parse(result[0].jsonform));
  };

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
  const updateJsonFormInDb = async()=> {
    const result = await db.update(JsonForms)
    .set({
      jsonform:jsonForm
    }).where(and (eq(JsonForms.id, record.id )
    , eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)));

    console.log(result);
  }

  return (
    <div className="p-10">
      <h2
        onClick={() => router.back()}
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-semibold transition-all"
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Controller */}
        <div className="p-5 border rounded-lg shadow-md">Controller</div>

        {/* Form */}
        <div className="md:col-span-2  p-5 h-screen border rounded-lg flex items-center justify-center">
          <FormUi jsonForm={jsonForm} onFieldUpdate={onFieldUpdate} />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
