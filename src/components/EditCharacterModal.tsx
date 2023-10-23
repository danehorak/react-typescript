import { Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Slider, message } from 'antd'
import { useEffect, useState } from 'react';
import {  useDeleteCharacter, useUpdateCharacter } from '../queries';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Character } from '../lib/types';


export default function EditCharacterModal( props: { isVisible: boolean, setVisible: (v: boolean) => void, character: Character }) {

  const { isVisible, setVisible, character } = props;

  const { TextArea } = Input;

  const { mutate: updateCharacter } = useUpdateCharacter();
  const { mutate: deleteCharacter } = useDeleteCharacter();

  const [isLoading, setLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  
  const [name, setName] = useState<string>(character.name);
  const [title, setTitle] = useState<string>(character.title);
  const [description, setDescription] = useState<string>(character.description);
  const [strength, setStrength] = useState<number>(character.base.strength);
  const [dexterity, setDexterity] = useState<number>(character.base.dexterity);
  const [mind, setMind] = useState<number>(character.base.mind);
  const [presence, setPresence] = useState<number>(character.base.presence);
  const [damage, setDamage] = useState<number>(character.damage);

  useEffect(() => {
    setName(character.name);
    setTitle(character.title);
    setDescription(character.description);
    setStrength(character.base.strength);
    setDexterity(character.base.dexterity);
    setMind(character.base.mind);
    setPresence(character.base.presence);
    setDamage(character.damage);
  }, [character.base.dexterity, character.base.mind, character.base.presence, character.base.strength, character.damage, character.description, character.id, character.name, character.title])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (event.target.name) {
      case 'name': setName(event.target.value); break;
      case 'title': setTitle(event.target.value); break;
      case 'description': setDescription(event.target.value); break;
    }
  }

  const handleOk = async () => {
    setLoading(true);
    await persistData({
      success: () => {
        setVisible(false);
        setLoading(false);
      },
      failure: () => {
        setLoading(false);
      }
    });    
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    await deleteCharacter(
      character,
      {
        onSuccess: () => {
          setVisible(false);
          setDeleteLoading(false);
        },
        onError: () => {
          setDeleteLoading(false);
          message.error('Failed to delete Character!');
        }
      }
    );
  }

  const persistData = async (callbacks: { success?: () => void, failure?: () => void }) => {
    const { success, failure } = callbacks;

    const noNegative = (num: number) => {
      return num >= 0 ? num : 0;
    }

    const handleSuccess = () => {
      success && success();
      message.success(`Character saved`);
    }

    const handleFailure = () => {
      failure && failure();
      message.error('Failed to update Character!');
    }

    await updateCharacter(
      {
        ...character,
        name,
        title,
        description,
        base: {
          strength,
          dexterity,
          mind,
          presence
        },
        combat: {
          vitality: noNegative(strength ? 3 + strength - damage : 0),
          evasion: dexterity ? 10 + dexterity : 0,
          arnor: dexterity ? 10 + dexterity : 0,
          alacrity: dexterity || mind ? dexterity + mind : 0,
          tenacity: presence ? 1 + presence : 0,
          power: 0
        },
        skills: {
          fighting: character.skills.fighting > character.base.strength ? character.base.strength : character.skills.fighting,
          thievery: character.skills.thievery > character.base.dexterity ? character.base.dexterity : character.skills.thievery,
          stealth: character.skills.stealth > character.base.dexterity ? character.base.dexterity : character.skills.stealth,
          archery: character.skills.archery > character.base.dexterity ? character.base.dexterity : character.skills.archery,
          learned: character.skills.learned > character.base.mind ? character.base.mind : character.skills.learned,
          survival: character.skills.survival > character.base.mind ? character.base.mind : character.skills.survival,
          perception: character.skills.perception > character.base.mind ? character.base.mind : character.skills.perception,
          apothecary: character.skills.apothecary > character.base.mind ? character.base.mind : character.skills.apothecary,
          intimidation: character.skills.intimidation > character.base.presence ? character.base.presence : character.skills.intimidation,
          performance: character.skills.performance > character.base.presence ? character.base.presence : character.skills.performance,
          manipulation: character.skills.manipulation > character.base.presence ? character.base.presence : character.skills.manipulation,
          insight: character.skills.insight > character.base.presence ? character.base.presence : character.skills.insight,
          power: character.skills.power > character.base.presence ? character.base.presence : character.skills.power,
        },
        damage
      },
      {
        onSuccess: handleSuccess,
        onError: handleFailure
      }
    )
  }

  return (
    <Modal
      width="75%"
      title="Edit Character"
      open={isVisible}
      confirmLoading={isLoading}
      onCancel={() => setVisible(false)}
      footer={
        <Row>
          <Col>
            <Popconfirm onConfirm={handleDelete} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
              <Button disabled={isLoading} key="delete" title="Delete" danger={true} type="primary" loading={isDeleteLoading}>Delete</Button>
            </Popconfirm>
          </Col>
          <Col flex={150}>
            <Button disabled={isLoading || isDeleteLoading} key="cancel" type="default" title="Cancel" onClick={handleCancel}>Cancel</Button>
            <Button disabled={isDeleteLoading} key="ok" title="OK" type="primary" onClick={handleOk} loading={isLoading}>OK</Button>
          </Col>
        </Row>
      }
    >
      <Card type="inner" title="Identity">
        <Form.Item label='Name' labelCol={{ span: 4}}>
          <Input name='name' value={name} onChange={handleTextChange}/>
        </Form.Item>
        <Form.Item label='Title' labelCol={{ span: 4}}>
          <Input name='title' value={title} onChange={handleTextChange}/>
        </Form.Item>
        <Form.Item label='Description' labelCol={{ span: 4}}>
          <TextArea rows={4} name='description' value={description} onChange={handleTextChange}/>
        </Form.Item>
      </Card>
      
      <Card type="inner" title="Base Attributes">
        <Form.Item key="strength" label="Strength" labelCol={{ span: 4}}>
          <Slider min={0} max={5} onChange={setStrength} value={strength}/>
        </Form.Item>
        <Form.Item key="dexterity" label="Dexterity" labelCol={{ span: 4}}>
          <Slider min={0} max={5} onChange={setDexterity} value={dexterity}/>
        </Form.Item>
        <Form.Item key="mind" label="Mind" labelCol={{ span: 4}}>
          <Slider min={0} max={5} onChange={setMind} value={mind}/>
        </Form.Item>
        <Form.Item key="presence" label="Presence" labelCol={{ span: 4}}>
          <Slider min={0} max={5} onChange={setPresence} value={presence}/>
        </Form.Item>
      </Card>

      <Card type="inner" title="Damage">
        <Form.Item key="damage" label="Damage Taken" labelCol={{ span: 4}}>
          <Slider min={0} max={5} onChange={setDamage} value={damage}/>
        </Form.Item>
      </Card>
    </Modal>
  );
}