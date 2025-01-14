import { useState } from 'react';
import { Close } from '@mui/icons-material';

function ListInput({ onAdd, onCancel }) {
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      onAdd({
        id: Date.now(),
        name: listName.trim(),
        tasks: []
      });
      setListName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="list-input-form">
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="List name"
        autoFocus
      />
      <div className="list-input-buttons">
        <button type="submit" className="add-button">
          Add List
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          <Close />
        </button>
      </div>
    </form>
  );
}

export default ListInput; 