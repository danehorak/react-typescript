import { Avatar, Button, Col, Input, Row, Segmented } from 'antd'
import { Character } from '../lib/types';
import { useRef } from 'react';


export default function CharacterSelector( props: { characters: Character[], filter: string, onSelect: (c: Character) => void }) {

  const { characters, filter, onSelect } = props;

  // Filtered Characters
  const filtered = characters.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));

  // Scroll Characters (left/right)
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = (amount: number) => () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollBy({
        left: amount,
        behavior: 'smooth'
      })
    }
  }
  
  // Character List
  const characterList = filtered.map((item: Character) => ({
    value: item.id,
    icon: (
      <div onClick={() => onSelect(item)}>
        <Avatar size={64} src={item.icon} />
        <div>{item.name}</div>
      </div>
      )
  }));

  return (
    <Row>
      <Col flex="5%"><Button style={{ height: '100%' }} onClick={handleScroll(-300)}>&lt;</Button></Col>
      <Col flex="90%" style={{ overflowX: 'scroll'}} ref={scrollRef}><Segmented options={characterList}/></Col>
      <Col flex="5%" style={{ textAlign: 'right'}}><Button style={{ height: '100%' }} onClick={handleScroll(300)}>&gt;</Button></Col>
    </Row>
  );
}