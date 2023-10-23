import { useEffect, useState } from 'react';
import { Col, Layout, Row} from 'antd'
import { useGetCharacters } from "../queries";
import Search from './Search'
import ImportExportMenu from './ImportExportMenu';
import { Character } from '../lib/types';
import CharacterSelector from './CharacterSelector';
import UnselectedProfile from './UnselectedProfile';
import CharacterProfile from './CharacterProfile';


export default function App() {
  // AntD SubComponents
  const { Header, Content } = Layout;

  // All Characters in DB
  const { data: characters } = useGetCharacters();

  // Selected Character
  const [character, setCharacter] = useState<Character | null>(null);

  // If data changes in db, trigger change in selected character
  useEffect(() => {
    if (characters && characters.length && character !== null) {
      const found = characters.find(it => it.id === character.id);
      setCharacter(found || null)
    }
  }, [character, characters])
  
  // Search Text
  const [searchText, setSearchText] = useState('');
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  }

  return (
    <Layout>
      <Header style={{ color: '#FFF'}}>
        <Row wrap={false}>
          <Col flex="auto"><h1>Game Character Editor</h1></Col>
          <Col>
            <Search setSearchText={handleSearchTextChange} />
          </Col>
          <Col style={{ marginLeft: 10, marginRight: -40 }}>
            <ImportExportMenu character={character}/>
          </Col>
        </Row>
      </Header>
      
      <Content style={{ padding: 20 }}>
        <CharacterSelector characters={characters || []} filter={searchText} onSelect={setCharacter}/>
        { character === null && <UnselectedProfile /> }
        { character !== null && <CharacterProfile character={character} /> }
      </Content>
    </Layout>      
  );
}

