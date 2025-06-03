'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { getTriggerBg } from '../../utils/getTriggerBg';
import { WarningOutlined } from '@ant-design/icons';

export default function PrioritySelect({
  value,
  onChange,
  error,
}: {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}) {
  return (
    <Select
      value={value ?? ''}
      onValueChange={val => {
        if (val === 'low' || val === 'medium' || val === 'high') {
          onChange?.(val);
        }
      }}
    >
      <label className="mx-1 text-sm font-semibold text-gray-800"> Task Priority</label>
      <SelectTrigger
        style={{ outline: 'none!important' }}
        className={`mx-1 my-2 w-full px-4 py-6 text-sm placeholder-gray-400 transition-colors duration-200 ${getTriggerBg(
          value
        )} focus-visible:ring-0 focus-visible:ring-offset-0`}
      >
        <SelectValue placeholder="Select Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-gray-600">Choose a level</SelectLabel>
          <SelectItem
            value="low"
            className="bg-green-50 text-green-700 transition-colors hover:bg-green-200 focus:bg-green-300"
          >
            🟢 Low
          </SelectItem>
          <SelectItem
            value="medium"
            className="bg-yellow-50 text-yellow-700 transition-colors hover:bg-yellow-200 focus:bg-yellow-300"
          >
            🟡 Medium
          </SelectItem>
          <SelectItem
            value="high"
            className="bg-red-50 text-red-700 transition-colors hover:bg-red-200 focus:bg-red-300"
          >
            🔴 High
          </SelectItem>
        </SelectGroup>
      </SelectContent>
      {error && (
        <p className="flex items-center text-xs font-medium text-red-500">
          <WarningOutlined className="pr-1" />
          {error}
        </p>
      )}
    </Select>
  );
}
