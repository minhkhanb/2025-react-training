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

export default function PrioritySelect({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
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
    </Select>
  );
}
