import { Form, Progress, Typography } from 'antd'
import { Character } from '../lib/types';

export default function CharacterProfileBase( props: { character: Character }) {
  const { character } = props;

  const { Title, Paragraph } = Typography;
  
  return (
    <>
      <Title level={4}>Base Attributes</Title>
      <Paragraph>
        <Form.Item key="strength" label={`Strength (${character.base.strength}/5)`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.base.strength / 5 * 100} showInfo={false} />
        </Form.Item>
        <Form.Item key="dexterity" label={`Dexterity (${character.base.dexterity}/5)`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.base.dexterity / 5 * 100} showInfo={false} />
        </Form.Item>
        <Form.Item key="mind" label={`Mind (${character.base.mind}/5)`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.base.mind / 5 * 100} showInfo={false} />
        </Form.Item>
        <Form.Item key="presence" label={`Presence (${character.base.presence}/5)`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.base.presence / 5 * 100} showInfo={false} />
        </Form.Item>
      </Paragraph>
    </>
  );
}