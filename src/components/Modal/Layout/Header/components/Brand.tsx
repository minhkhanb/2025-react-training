import Image from 'next/image';
import React from 'react';

const Brand = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="https://cdn3d.iconscout.com/3d/premium/thumb/todo-list-3d-icon-download-in-png-blend-fbx-gltf-file-formats--task-to-do-plan-daily-planner-pack-miscellaneous-icons-8168038.png?f=webp"
        alt="Todo Icon"
        width={40}
        height={40}
      />
      <span className="text-xl font-medium">Todolist</span>
    </div>
  );
};

export default Brand;
