'use client';

import MainForm from '@src/components/common/MainForm';
import { Form, Input } from '@src/components/ui';

const AddCourseForm = () => {
  return (
    <MainForm>
      <div className="space-y-12">
        <div className="pb-6">
          <h2 className="text-base/7 font-semibold text-gray-900">Add New Course</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-1">
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Course name" />
              <div className="mt-2">
                <Form.Field component={Input} name="name" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Description" />
              <div className="mt-2">
                <Form.Field component={Input} name="description" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Duration" />
              <div className="mt-2">
                <Form.Field component={Input} name="duration" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Teacher" />
              <div className="mt-2">
                <Form.Field component={Input} name="teacher" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Price" />
              <div className="mt-2">
                <Form.Field component={Input} name="price" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Country" />
              <div className="mt-2">
                <Form.Field component={Input} name="title" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Form.SubmitButton className="w-full sm:w-auto">Add Course</Form.SubmitButton>
      </div>
    </MainForm>
  );
};

export default AddCourseForm;
