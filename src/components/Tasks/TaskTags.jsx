import { useState } from 'react';
import { LocalOffer } from '@mui/icons-material';

function TaskTags({ tags, onAddTag, onRemoveTag }) {
  const [showInput, setShowInput] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag('');
      setShowInput(false);
    }
  };

  return (
    <div className="task-tags">
      {tags.map(tag => (
        <span key={tag} className="tag">
          <LocalOffer fontSize="small" />
          {tag}
          <button onClick={() => onRemoveTag(tag)}>&times;</button>
        </span>
      ))}
      
      {showInput ? (
        <form onSubmit={handleAddTag} className="tag-input-form">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag..."
            autoFocus
          />
        </form>
      ) : (
        <button className="add-tag-button" onClick={() => setShowInput(true)}>
          + Add Tag
        </button>
      )}
    </div>
  );
}

export default TaskTags; 