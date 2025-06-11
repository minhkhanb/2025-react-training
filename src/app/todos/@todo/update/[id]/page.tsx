import UpdateTodo from '@/src/section/Todos/components/UpdateTodo';

const UpdateTodoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <UpdateTodo id={id} />;
};

export default UpdateTodoPage;
