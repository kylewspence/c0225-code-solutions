import { FaTrash } from 'react-icons/fa';

export function TrashCan({
  onDropPokemon,
}: {
  onDropPokemon: (id: number) => void;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const idStr = e.dataTransfer.getData('text/plain');
    const id = parseInt(idStr, 10);
    onDropPokemon(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="trash-can" onDrop={handleDrop} onDragOver={handleDragOver}>
      <FaTrash size={32} />
    </div>
  );
}
