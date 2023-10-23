import { Modal } from 'antd'
import { useState } from 'react';
import { Character } from '../lib/types';


export default function ExportModal( props: { isVisible: boolean, setVisible: (v: boolean) => void, character: Character }) {

  const { isVisible, setVisible, character } = props;

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleExport = () => {
    setLoading(true);

    const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${character.name} - ${character.title}.json`
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    document.body.removeChild(a);

    setLoading(false);
    setVisible(false);
  }
  
  return (
    <Modal
      title="Export Character"
      open={isVisible}
      onOk={handleExport}
      confirmLoading={isLoading}
      onCancel={() => setVisible(false)}
    >
      <img alt={character?.name} style={{ height: 75, padding: 10 }} src={character?.icon} />{character?.name} - {character?.title}
      <p>You are about to export the selected character. Do you wish to continue?</p>
    </Modal>
  );
}