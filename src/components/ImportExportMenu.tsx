import { Button, Dropdown, MenuProps } from 'antd'
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ImportModal from './ImportModal';
import ExportModal from './ExportModal';
import { Character } from '../lib/types';


export default function ImportExportMenu( props: { character: Character | null }) {

  const { character } = props;

  const [importIsVisible, setImportIsVisible] = useState<boolean>(false);
  const [exportIsVisible, setExportIsVisible] = useState<boolean>(false);

  const items: MenuProps['items'] = [
    {
      key: 0,
      label: 'Import',
      onClick: () => setImportIsVisible(true)
    },
    {
      key: 1,
      label: 'Export',
      onClick: () => setExportIsVisible(true),
      disabled: character === null
    }
  ]
  
  return (
    <>
      <Dropdown trigger={['click']} menu={{ items }}>
        <Button type="default" size="large" icon={<MenuOutlined />} />
      </Dropdown>
      <ImportModal isVisible={importIsVisible} setVisible={setImportIsVisible} />
      { character && <ExportModal isVisible={exportIsVisible} setVisible={setExportIsVisible} character={character}/>}
    </>
  );
}