'use client';

import MainForm from '@src/components/common/MainForm';
import { Form, Input } from '@src/components/ui';

interface Option {
  label: string;
  value: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  duration: Option[];
  price: number;
  status: string;
}

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
                <Form.Field component={Input} name="name" placeholder="Course name" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Description" />
              <div className="mt-2">
                <Form.Field
                  component={Input.TextArea}
                  name="description"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Duration" />
              <div className="mt-2">
                <Form.Field
                  component={Input.Dropdown}
                  name="duration"
                  options={[
                    { value: '5mins', label: '5 Minutes' },
                    { value: '10mins', label: '10 Minutes' },
                    { value: '15mins', label: '15 Minutes' },
                  ]}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Instructor" />
              <div className="mt-2">
                <Form.Field component={Input} name="instructor" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Price" />
              <div className="mt-2">
                <Form.Field type="number" component={Input} name="price" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Form.FieldLabel title="Status" />
              <div className="mt-2">
                <Form.Field
                  component={Input.Dropdown}
                  name="status"
                  options={[
                    { value: 'published', label: 'Published' },
                    { value: 'draft', label: 'Draft' },
                  ]}
                  onChange={evt => console.log('PDebug Selected country:', evt)}
                />
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
