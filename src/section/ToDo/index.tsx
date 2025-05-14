import AddTodoDrawer from '@src/section/ToDo/components/AddTodoDrawer';
import EditTodoDrawer from '@src/section/ToDo/components/EditTodoDrawer';
import ConfirmDeleteModal from '@src/section/ToDo/components/ConfirmDeleteModal';

const ToDo = () => {
  return (
    <div>
      {/*<div>Section Header</div>*/}
      {/*<div>Section search filter, button add</div>*/}

      {/*<div>Section list</div>*/}

      {/*<div>Section modal</div>*/}
      <AddTodoDrawer />
      <EditTodoDrawer />
      <ConfirmDeleteModal />
    </div>
  );
};

export default ToDo;
