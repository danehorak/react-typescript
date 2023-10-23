import { Form, Progress, Typography } from 'antd'
import { Character } from '../lib/types';

export default function CharacterProfileBase( props: { character: Character }) {
  const { character } = props;

  const { Title, Paragraph } = Typography;
  
  return (
    <>
      <Title level={4}>Combat Attributes</Title>
      <Paragraph>
        <Form.Item key="vitality" label={`Vitality (${character.combat.vitality}/8)`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.combat.vitality / 8 * 100} showInfo={false} />
        </Form.Item>
        <Form.Item key="evasion" label={`Evasion (${character.combat.evasion}/15)`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.combat.evasion / 15 * 100} showInfo={false} />
        </Form.Item>
        <Form.Item key="armor" label={`Armor (${character.combat.arnor}/15)`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.combat.arnor / 15 * 100} showInfo={false} />
        </Form.Item>
        <Form.Item key="alacrity" label={`Alacrity (${character.combat.alacrity}/10)`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.combat.alacrity / 10 * 100} showInfo={false} />
        </Form.Item>
        <Form.Item key="tenacity" label={`Tenacity (${character.combat.tenacity})/6`} labelCol={{ span: 4}} style={{ margin: 0 }}>
          <Progress percent={character.combat.tenacity / 6 * 100} showInfo={false} />
        </Form.Item>
      </Paragraph>
    </>
  );
}